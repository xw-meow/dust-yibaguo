import { useSyncExternalStore } from 'react';
import type { Achievement, CategoryId } from '../data/types';

export interface UnlockNotice {
  key: string;
  categoryId: CategoryId;
  achievement: Achievement;
}

let notices: UnlockNotice[] = [];
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

export function pushUnlocks(categoryId: CategoryId, achievements: Achievement[]): void {
  if (achievements.length === 0) return;
  const stamp = Date.now();
  const next = achievements.map((achievement, index) => ({
    key: `${categoryId}:${achievement.id}:${stamp}:${index}`,
    categoryId,
    achievement,
  }));
  notices = [...notices, ...next].slice(-4);
  emit();
}

export function dismissUnlock(key: string): void {
  notices = notices.filter((notice) => notice.key !== key);
  emit();
}

export function useUnlockQueue(): UnlockNotice[] {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    () => notices,
    () => notices,
  );
}
