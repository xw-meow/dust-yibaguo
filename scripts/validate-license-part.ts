/**
 * 校验「准驾车型」单个分区（partA 车型 / partB 规则）。
 * 用法：npx tsx scripts/validate-license-part.ts partA
 */
import type { ChallengeQuestion, LearningCard } from '../src/data/types';
import type { PartName } from './license-source';
import { PART_RANGES, partEntries } from './license-source';

const errors: string[] = [];
const warnings: string[] = [];
const charLen = (value: unknown): number => (typeof value === 'string' ? [...value].length : 0);

function checkText(where: string, value: unknown, min: number, max: number): void {
  if (typeof value !== 'string') {
    errors.push(`${where}：必须是字符串`);
    return;
  }
  if (value !== value.trim()) errors.push(`${where}：不能有首尾空格`);
  if (/[\n\r]/.test(value)) errors.push(`${where}：不能包含换行`);
  if (/\*\*|```|<\/?[a-z]/i.test(value)) errors.push(`${where}：不能包含 Markdown / HTML`);
  const length = charLen(value);
  if (length < min || length > max) errors.push(`${where}：长度 ${length}，要求 ${min}-${max} 字`);
}

const part = process.argv[2] as PartName;
if (!part || !(part in PART_RANGES)) {
  console.error(
    `用法：npx tsx scripts/validate-license-part.ts <${Object.keys(PART_RANGES).join('|')}>`,
  );
  process.exit(2);
}

const PART_FILES = { partA: 'classes', partB: 'rules' } as const;
const expected = partEntries(part);
const module = (await import(`../src/data/license-parts/${PART_FILES[part]}.ts`)) as {
  cards?: LearningCard[];
  questions?: ChallengeQuestion[];
};
const cards = module.cards ?? [];
const questions = module.questions ?? [];

if (cards.length !== expected.length) {
  errors.push(`卡片数量：应为 ${expected.length}，当前 ${cards.length}`);
}
if (questions.length !== expected.length) {
  errors.push(`题目数量：应为 ${expected.length}（每张卡 1 题），当前 ${questions.length}`);
}

const titles = new Set<string>();
const memories = new Set<string>();
const stems = new Set<string>();
const optionCounts = [0, 0, 0, 0];

cards.forEach((card, index) => {
  const entry = expected[index];
  if (!entry) return;
  const where = `卡片 ${entry.cardId}`;
  if (card.id !== entry.cardId) errors.push(`${where}：id 应为 ${entry.cardId}，当前 ${card.id}`);
  if (card.group !== entry.group) {
    errors.push(`${where}：group 应为「${entry.group}」，当前「${card.group}」`);
  }
  if (card.original !== entry.original) {
    errors.push(
      `${where}：original 必须与 canonical 逐字一致。\n  期望：${entry.original}\n  当前：${card.original}`,
    );
  }
  if (card.source !== entry.source) {
    errors.push(`${where}：source 应为「${entry.source}」，当前「${card.source ?? ''}」`);
  }
  checkText(`${where} 标题`, card.title, 2, 20);
  checkText(`${where} 辅助记忆`, card.memory, 8, 100);
  if (titles.has(card.title)) errors.push(`${where}：标题重复「${card.title}」`);
  if (memories.has(card.memory)) errors.push(`${where}：辅助记忆重复`);
  titles.add(card.title);
  memories.add(card.memory);
  if (card.original === card.memory) errors.push(`${where}：辅助记忆不能照抄原文`);
});

questions.forEach((question, index) => {
  const entry = expected[index];
  if (!entry) return;
  const where = `题目 ${entry.questionId}`;
  if (question.id !== entry.questionId) {
    errors.push(`${where}：id 应为 ${entry.questionId}，当前 ${question.id}`);
  }
  if (question.group !== entry.group) {
    errors.push(`${where}：group 应与对应卡片一致（${entry.group}），当前「${question.group}」`);
  }
  checkText(`${where} 题干`, question.stem, 8, 100);
  checkText(`${where} 解析`, question.explanation, 12, 160);
  if (!Array.isArray(question.options) || question.options.length !== 4) {
    errors.push(`${where}：必须有且只有 4 个选项`);
    return;
  }
  const optionSet = new Set<string>();
  question.options.forEach((option, optionIndex) => {
    checkText(`${where} 选项 ${'ABCD'[optionIndex]}`, option, 1, 50);
    if (optionSet.has(option)) errors.push(`${where}：选项重复`);
    optionSet.add(option);
  });
  if (
    typeof question.answer !== 'number' ||
    !Number.isInteger(question.answer) ||
    question.answer < 0 ||
    question.answer > 3
  ) {
    errors.push(`${where}：answer 必须是 0-3 的整数`);
  } else {
    optionCounts[question.answer] += 1;
  }
  if (stems.has(question.stem)) errors.push(`${where}：题干重复`);
  stems.add(question.stem);
});

optionCounts.forEach((count, optionIndex) => {
  const letter = 'ABCD'[optionIndex];
  if (count === 0) warnings.push(`${part}：正确项 ${letter} 一题都没有，建议打散答案`);
  if (count > questions.length * 0.6) {
    errors.push(`${part}：正确项 ${letter} 占比过高（${count}/${questions.length}），请打散`);
  }
});

console.log(`\n—— ${part}（${PART_RANGES[part].name}）——`);
expected.forEach((entry, index) => {
  const card = cards[index];
  const ok = card?.original === entry.original && card?.source === entry.source;
  console.log(`${ok ? '✓' : '·'} ${entry.cardId} [${entry.group}] ${entry.original.slice(0, 16)}…`);
});

if (warnings.length > 0) {
  console.log(`\n提示（${warnings.length}）：`);
  warnings.forEach((warning) => console.log(`  ! ${warning}`));
}
if (errors.length > 0) {
  console.log(`\n错误（${errors.length}）：`);
  errors.forEach((error) => console.log(`  ✗ ${error}`));
  console.log('\n校验未通过。\n');
  process.exit(1);
}
console.log(
  `\n校验通过：${part} 卡片 ${cards.length}/${expected.length}，题目 ${questions.length}/${expected.length}。\n`,
);
