import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface LicenseClass {
  code: string;
  name: string;
  vehicles: string;
  other: string;
  group: string;
  titleHint: string;
  source: string;
}

export interface LicenseRule {
  key: string;
  article: string;
  titleHint: string;
  text: string;
  source: string;
  group: string;
}

export interface LicenseSource {
  law: string;
  amendment: string;
  officialSource: string;
  attachmentSource: string;
  attachmentNote: string;
  classes: LicenseClass[];
  rules: LicenseRule[];
}

export interface LicenseEntry {
  order: number;
  cardId: string;
  questionId: string;
  group: string;
  kind: 'class' | 'rule';
  original: string;
  source: string;
  titleHint: string;
  code?: string;
}

export const PART_RANGES = {
  partA: { from: 1, to: 17, name: '17 个准驾车型' },
  partB: { from: 18, to: 28, name: '年龄 / 增驾 / 实习 / 准驾不符规则' },
} as const;

export type PartName = keyof typeof PART_RANGES;

export function licenseSourcePath(): string {
  return resolve(process.cwd(), 'docs/sources/license-classes-172.json');
}

export function readLicenseSource(): LicenseSource {
  return JSON.parse(readFileSync(licenseSourcePath(), 'utf8')) as LicenseSource;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function classCardOriginal(entry: LicenseClass): string {
  return `准驾车型：${entry.name}；代号：${entry.code}；准驾的车辆：${entry.vehicles}；准予驾驶的其他准驾车型：${entry.other || '无'}。`;
}

export function licenseEntries(): LicenseEntry[] {
  const source = readLicenseSource();
  const entries: LicenseEntry[] = [];
  let order = 0;

  source.classes.forEach((item) => {
    order += 1;
    entries.push({
      order,
      cardId: `lic-${pad(order)}`,
      questionId: `qlic-${pad(order)}`,
      group: item.group,
      kind: 'class',
      original: classCardOriginal(item),
      source: item.source,
      titleHint: item.titleHint,
      code: item.code,
    });
  });

  source.rules.forEach((item) => {
    order += 1;
    entries.push({
      order,
      cardId: `lic-${pad(order)}`,
      questionId: `qlic-${pad(order)}`,
      group: '准驾规则',
      kind: 'rule',
      original: item.text,
      source: item.source,
      titleHint: item.titleHint,
    });
  });

  return entries;
}

export function partEntries(part: PartName): LicenseEntry[] {
  const range = PART_RANGES[part];
  return licenseEntries().filter((entry) => entry.order >= range.from && entry.order <= range.to);
}
