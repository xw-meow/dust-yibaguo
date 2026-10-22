import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface CanonicalSourceItem {
  label: string;
  text: string;
}

export interface CanonicalArticle {
  points: number;
  article: string;
  intro: string;
  source: string;
  items: string[];
}

export interface CanonicalRule {
  key: string;
  article: string;
  titleHint: string;
  text: string;
  source: string;
}

export interface CanonicalSource {
  law: string;
  documentNumber: string;
  publishedDate: string;
  effectiveDate: string;
  status: string;
  officialSource: string;
  gazetteSource: string;
  totalScoreItems: number;
  articles: CanonicalArticle[];
  rules: CanonicalRule[];
}

export interface CanonicalEntry {
  order: number;
  cardId: string;
  questionId: string;
  group: string;
  kind: 'item' | 'rule';
  points: number | null;
  article: string;
  label: string | null;
  original: string;
  /** 卡片 source 的期望值 */
  source: string;
  titleHint?: string;
}

export const PART_RANGES = {
  partA: { from: 1, to: 14, name: '12分 + 9分' },
  partB: { from: 15, to: 25, name: '6分' },
  partC: { from: 26, to: 40, name: '3分' },
  partD: { from: 41, to: 55, name: '1分 + 记分规则' },
} as const;

export type PartName = keyof typeof PART_RANGES;

export function sourcePath(): string {
  return resolve(process.cwd(), 'docs/sources/score-points-163.json');
}

export function readCanonical(): CanonicalSource {
  return JSON.parse(readFileSync(sourcePath(), 'utf8')) as CanonicalSource;
}

const labelPattern = /^（[一二三四五六七八九十]+）/;

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function canonicalEntries(): CanonicalEntry[] {
  const canonical = readCanonical();
  const entries: CanonicalEntry[] = [];
  let order = 0;

  canonical.articles.forEach((article) => {
    article.items.forEach((text) => {
      order += 1;
      const labelMatch = text.match(labelPattern);
      const label = labelMatch ? labelMatch[0] : '';
      entries.push({
        order,
        cardId: `dd-${pad(order)}`,
        questionId: `qdd-${pad(order)}`,
        group: `${article.points}分`,
        kind: 'item',
        points: article.points,
        article: article.article,
        label,
        original: text,
        source: `${canonical.law}${article.article}第${label}项`,
      });
    });
  });

  canonical.rules.forEach((rule) => {
    order += 1;
    entries.push({
      order,
      cardId: `dd-${pad(order)}`,
      questionId: `qdd-${pad(order)}`,
      group: '记分规则',
      kind: 'rule',
      points: null,
      article: rule.article,
      label: null,
      original: rule.text,
      source: `${canonical.law}${rule.article}`,
      titleHint: rule.titleHint,
    });
  });

  return entries;
}

export function partEntries(part: PartName): CanonicalEntry[] {
  const range = PART_RANGES[part];
  return canonicalEntries().filter((entry) => entry.order >= range.from && entry.order <= range.to);
}
