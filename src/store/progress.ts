import { useSyncExternalStore } from 'react';
import { categories, categoryMap } from '../data/index';
import type { Achievement, AchievementMetric, Category, CategoryId } from '../data/types';
import { masteredCardIds } from '../lib/mastery';
import type { CardRecord } from '../lib/mastery';
import { pushUnlocks } from './unlockQueue';

export const STORAGE_KEY = 'yibaguo.progress.v2';

export interface CategoryStats {
  /** 每张卡在挑战模式中的作答记录，用于判定掌握程度 */
  cardRecords: Record<string, CardRecord>;
  /** 由 cardRecords 推导：满 10 次作答且全对的卡片 id */
  mastered: string[];
  /** 已永久解锁的成就 id（成就一旦点亮不会因为取消掌握而熄灭） */
  achievements: string[];
  challengeCount: number;
  perfectCount: number;
  bestScore: number;
  maxStreak: number;
  totalCorrect: number;
  lastPlayedAt: number | null;
}

export interface ProgressState {
  version: 1;
  categories: Record<CategoryId, CategoryStats>;
}

function emptyStats(): CategoryStats {
  return {
    cardRecords: {},
    mastered: [],
    achievements: [],
    challengeCount: 0,
    perfectCount: 0,
    bestScore: 0,
    maxStreak: 0,
    totalCorrect: 0,
    lastPlayedAt: null,
  };
}

function emptyState(): ProgressState {
  return {
    version: 1,
    categories: {
      deduction: emptyStats(),
      fine: emptyStats(),
      abbr: emptyStats(),
      speed: emptyStats(),
      license: emptyStats(),
    },
  };
}

function toNonNegativeInt(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

export function metricValue(metric: AchievementMetric, stats: CategoryStats): number {
  switch (metric) {
    case 'mastered':
      return stats.mastered.length;
    case 'challenge':
      return stats.challengeCount;
    case 'perfect':
      return stats.perfectCount;
    case 'correct':
      return stats.totalCorrect;
  }
}

function qualifiedAchievementIds(category: Category, stats: CategoryStats): string[] {
  return category.achievements
    .filter((achievement) => metricValue(achievement.metric, stats) >= achievement.target)
    .map((achievement) => achievement.id);
}

function sanitizeStats(category: Category, raw: unknown): CategoryStats {
  const stats = emptyStats();
  if (!raw || typeof raw !== 'object') return stats;
  const candidate = raw as Partial<CategoryStats>;

  const validCardIds = new Set(category.cards.map((card) => card.id));
  if (candidate.cardRecords && typeof candidate.cardRecords === 'object') {
    Object.entries(candidate.cardRecords as Record<string, unknown>).forEach(([cardId, value]) => {
      if (!validCardIds.has(cardId) || !value || typeof value !== 'object') return;
      const raw = value as Record<string, unknown>;
      const attempts = toNonNegativeInt(raw.attempts);
      if (attempts === 0) return;
      const correct = Math.min(attempts, toNonNegativeInt(raw.correct));
      stats.cardRecords[cardId] = { attempts, correct };
    });
  }
  stats.mastered = masteredCardIds(category.cards, stats.cardRecords);

  stats.challengeCount = toNonNegativeInt(candidate.challengeCount);
  stats.perfectCount = toNonNegativeInt(candidate.perfectCount);
  stats.bestScore = Math.min(10, toNonNegativeInt(candidate.bestScore));
  stats.maxStreak = Math.min(10, toNonNegativeInt(candidate.maxStreak));
  stats.totalCorrect = toNonNegativeInt(candidate.totalCorrect);
  stats.lastPlayedAt =
    typeof candidate.lastPlayedAt === 'number' && Number.isFinite(candidate.lastPlayedAt)
      ? candidate.lastPlayedAt
      : null;

  const validAchievementIds = new Set(category.achievements.map((achievement) => achievement.id));
  const savedAchievements = Array.isArray(candidate.achievements)
    ? candidate.achievements.filter(
        (id): id is string => typeof id === 'string' && validAchievementIds.has(id),
      )
    : [];
  stats.achievements = [
    ...new Set([...savedAchievements, ...qualifiedAchievementIds(category, stats)]),
  ];
  return stats;
}

function loadState(): ProgressState {
  const base = emptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return base;
    const savedCategories = (parsed as { categories?: unknown }).categories;
    if (!savedCategories || typeof savedCategories !== 'object') return base;
    categories.forEach((category) => {
      base.categories[category.id] = sanitizeStats(
        category,
        (savedCategories as Record<string, unknown>)[category.id],
      );
    });
  } catch {
    return base;
  }
  return base;
}

let state: ProgressState = loadState();
const listeners = new Set<() => void>();

function persist(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // 隐私模式下 localStorage 可能不可用，内存里的进度仍然有效。
  }
}

function emit(): void {
  listeners.forEach((listener) => listener());
}

function commitCategory(categoryId: CategoryId, nextStats: CategoryStats): Achievement[] {
  const category = categoryMap[categoryId];
  const before = state.categories[categoryId];
  const unlockedIds = qualifiedAchievementIds(category, nextStats);
  const newIds = unlockedIds.filter((id) => !before.achievements.includes(id));
  const mergedIds = [...new Set([...before.achievements, ...unlockedIds])];
  state = {
    ...state,
    categories: { ...state.categories, [categoryId]: { ...nextStats, achievements: mergedIds } },
  };
  persist();
  emit();

  const newAchievements = category.achievements.filter((achievement) =>
    newIds.includes(achievement.id),
  );
  if (newAchievements.length > 0) pushUnlocks(categoryId, newAchievements);
  return newAchievements;
}

export interface RoundAnswer {
  cardId: string;
  correct: boolean;
}

/**
 * 一轮 10 题全部答完后统一入库：
 * - 按题目关联的 cardId 累计该卡的作答次数 / 正确次数；
 * - 重新推导 mastered（满 10 次且全对），据此点亮掌握类成就；
 * - 同时记录挑战次数、满分次数、最长连对与累计答对数。
 * 中途放弃不会调用此函数，因此不会留下未完成轮次的记录。
 */
export function recordChallenge(
  categoryId: CategoryId,
  result: { score: number; maxStreak: number; answers: RoundAnswer[] },
): Achievement[] {
  const category = categoryMap[categoryId];
  const current = state.categories[categoryId];
  const validCardIds = new Set(category.cards.map((card) => card.id));
  const cardRecords: Record<string, CardRecord> = { ...current.cardRecords };

  result.answers.forEach((answer) => {
    if (!validCardIds.has(answer.cardId)) return;
    const previous = cardRecords[answer.cardId] ?? { attempts: 0, correct: 0 };
    cardRecords[answer.cardId] = {
      attempts: previous.attempts + 1,
      correct: previous.correct + (answer.correct ? 1 : 0),
    };
  });

  const score = Math.max(0, Math.min(10, Math.round(result.score)));
  const nextStats: CategoryStats = {
    ...current,
    cardRecords,
    mastered: masteredCardIds(category.cards, cardRecords),
    challengeCount: current.challengeCount + 1,
    perfectCount: current.perfectCount + (score === 10 ? 1 : 0),
    bestScore: Math.max(current.bestScore, score),
    maxStreak: Math.max(current.maxStreak, Math.max(0, Math.min(10, result.maxStreak))),
    totalCorrect: current.totalCorrect + score,
    lastPlayedAt: Date.now(),
  };
  return commitCategory(categoryId, nextStats);
}

export function resetCategory(categoryId: CategoryId): void {
  state = { ...state, categories: { ...state.categories, [categoryId]: emptyStats() } };
  persist();
  emit();
}

export function resetAll(): void {
  state = emptyState();
  persist();
  emit();
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    () => state,
    () => state,
  );
}

export function isAchievementUnlocked(stats: CategoryStats, achievement: Achievement): boolean {
  return stats.achievements.includes(achievement.id);
}

export interface AchievementProgress {
  achievement: Achievement;
  value: number;
  target: number;
  ratio: number;
  unlocked: boolean;
}

export function achievementProgress(
  stats: CategoryStats,
  achievement: Achievement,
): AchievementProgress {
  const rawValue = metricValue(achievement.metric, stats);
  return {
    achievement,
    value: Math.min(rawValue, achievement.target),
    target: achievement.target,
    ratio: achievement.target > 0 ? Math.min(1, rawValue / achievement.target) : 1,
    unlocked: isAchievementUnlocked(stats, achievement),
  };
}

export function nextLockedAchievement(
  category: Category,
  stats: CategoryStats,
): AchievementProgress | null {
  const candidates = category.achievements
    .filter((achievement) => !isAchievementUnlocked(stats, achievement))
    .map((achievement) => achievementProgress(stats, achievement))
    .sort((a, b) => b.ratio - a.ratio);
  return candidates[0] ?? null;
}

export function totalMastered(progress: ProgressState): number {
  return categories.reduce((sum, category) => sum + progress.categories[category.id].mastered.length, 0);
}

export function totalUnlockedAchievements(progress: ProgressState): number {
  return categories.reduce(
    (sum, category) => sum + progress.categories[category.id].achievements.length,
    0,
  );
}
