/**
 * 合并后校验「准驾车型」分类：28 卡 / 28 题、原文与法规一致、成就口径正确。
 * 用法：npx tsx scripts/validate-license.ts
 */
import { license } from '../src/data/license';
import { licenseEntries } from './license-source';

const errors: string[] = [];
const warnings: string[] = [];
const expected = licenseEntries();
const charLen = (value: unknown): number => (typeof value === 'string' ? [...value].length : 0);

function checkText(where: string, value: unknown, min: number, max: number): void {
  if (typeof value !== 'string') {
    errors.push(`${where}：必须是字符串`);
    return;
  }
  if (/[\n\r]/.test(value)) errors.push(`${where}：不能包含换行`);
  const length = charLen(value);
  if (length < min || length > max) errors.push(`${where}：长度 ${length}，要求 ${min}-${max} 字`);
}

if (license.cards.length !== expected.length) {
  errors.push(`卡片总数：应为 ${expected.length}，当前 ${license.cards.length}`);
}
license.cards.forEach((card, index) => {
  const entry = expected[index];
  if (!entry) return;
  const where = `卡片 ${entry.cardId}`;
  if (card.id !== entry.cardId) errors.push(`${where}：id 应为 ${entry.cardId}`);
  if (card.group !== entry.group) errors.push(`${where}：group 应为「${entry.group}」`);
  if (card.original !== entry.original) {
    errors.push(`${where}：original 与 canonical 不一致\n  期望：${entry.original}\n  当前：${card.original}`);
  }
  if (card.source !== entry.source) {
    errors.push(`${where}：source 应为「${entry.source}」`);
  }
  checkText(`${where} 标题`, card.title, 2, 20);
  checkText(`${where} 辅助记忆`, card.memory, 8, 100);
});

if (license.questions.length !== expected.length) {
  errors.push(`题目总数：应为 ${expected.length}，当前 ${license.questions.length}`);
}
const stems = new Set<string>();
const optionCounts = [0, 0, 0, 0];
license.questions.forEach((question, index) => {
  const entry = expected[index];
  if (!entry) return;
  const where = `题目 ${entry.questionId}`;
  if (question.id !== entry.questionId) errors.push(`${where}：id 应为 ${entry.questionId}`);
  if (question.group !== entry.group) errors.push(`${where}：group 应为「${entry.group}」`);
  checkText(`${where} 题干`, question.stem, 8, 100);
  checkText(`${where} 解析`, question.explanation, 12, 160);
  if (!Array.isArray(question.options) || question.options.length !== 4) {
    errors.push(`${where}：必须有且只有 4 个选项`);
    return;
  }
  if (new Set(question.options).size !== 4) errors.push(`${where}：选项重复`);
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
  if (count < 2) warnings.push(`正确项 ${'ABCD'[optionIndex]} 只有 ${count} 题，建议打散`);
  if (count > license.questions.length * 0.5) {
    errors.push(`正确项 ${'ABCD'[optionIndex]} 占比过高`);
  }
});

const targets = new Map<string, number>();
license.achievements.forEach((achievement) => {
  const key = `${achievement.metric}:${achievement.target}`;
  targets.set(key, (targets.get(key) ?? 0) + 1);
});
[
  ['mastered:1', 1],
  [`mastered:${Math.ceil(license.cards.length / 2)}`, 1],
  [`mastered:${license.cards.length}`, 1],
  ['challenge:1', 1],
  ['perfect:1', 1],
  ['correct:30', 1],
].forEach(([key, count]) => {
  if ((targets.get(String(key)) ?? 0) !== Number(count)) errors.push(`成就指标缺少 ${key}`);
});
if (license.achievements.length !== 6) errors.push('成就必须恰好 6 个');
if (charLen(license.intro) < 12 || charLen(license.intro) > 90) {
  errors.push(`intro 长度 ${charLen(license.intro)}，要求 12-90`);
}

console.log('\n—— 准驾车型完整校验 ——');
console.log(
  `卡片 ${license.cards.length}/${expected.length} · 题目 ${license.questions.length}/${expected.length} · 成就 ${license.achievements.length}/6`,
);
console.log(`答案分布：A/B/C/D = ${optionCounts.join('/')}`);
console.log(
  `分组：${[...new Set(license.cards.map((card) => card.group))]
    .map((group) => `${group} ${license.cards.filter((card) => card.group === group).length}`)
    .join(' / ')}`,
);

if (warnings.length > 0) {
  console.log('\n提示：');
  warnings.forEach((warning) => console.log(`  ! ${warning}`));
}
if (errors.length > 0) {
  console.log(`\n错误（${errors.length}）：`);
  errors.forEach((error) => console.log(`  ✗ ${error}`));
  console.log('\n校验未通过。\n');
  process.exit(1);
}
console.log('\n完整校验通过。\n');
