/**
 * 校验合并后的「交规扣分」分类：
 * - 55 张卡（50 条记分行为 + 5 条规则），original / source / group 与官方原文逐字一致
 * - 55 道题与卡片一一对应，结构合法、答案分布合理
 * - 成就 target 与 55 张卡的口径一致
 *
 * 用法：npx tsx scripts/validate-deduction.ts
 */
import { deduction } from '../src/data/deduction';
import { canonicalEntries } from './deduction-source';

const errors: string[] = [];
const warnings: string[] = [];
const expected = canonicalEntries();
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

// 卡片与法条逐字比对
if (deduction.cards.length !== expected.length) {
  errors.push(`卡片总数：应为 ${expected.length}，当前 ${deduction.cards.length}`);
}
deduction.cards.forEach((card, index) => {
  const entry = expected[index];
  if (!entry) return;
  const where = `卡片 ${entry.cardId}`;
  if (card.id !== entry.cardId) errors.push(`${where}：id 应为 ${entry.cardId}，当前 ${card.id}`);
  if (card.group !== entry.group) {
    errors.push(`${where}：group 应为「${entry.group}」，当前「${card.group}」`);
  }
  if (card.original !== entry.original) {
    errors.push(`${where}：original 与法条原文不一致\n  期望：${entry.original}\n  当前：${card.original}`);
  }
  if (card.source !== entry.source) {
    errors.push(`${where}：source 应为「${entry.source}」，当前「${card.source ?? ''}」`);
  }
  checkText(`${where} 标题`, card.title, 2, 20);
  checkText(`${where} 辅助记忆`, card.memory, 8, 100);
});

// 分组数量
const groupCounts = new Map<string, number>();
deduction.cards.forEach((card) => {
  groupCounts.set(card.group, (groupCounts.get(card.group) ?? 0) + 1);
});
const expectedGroupCounts = new Map<string, number>();
expected.forEach((entry) => {
  expectedGroupCounts.set(entry.group, (expectedGroupCounts.get(entry.group) ?? 0) + 1);
});
expectedGroupCounts.forEach((count, group) => {
  if ((groupCounts.get(group) ?? 0) !== count) {
    errors.push(`分组「${group}」卡片数：应为 ${count}，当前 ${groupCounts.get(group) ?? 0}`);
  }
});

// 题目
if (deduction.questions.length !== expected.length) {
  errors.push(`题目总数：应为 ${expected.length}，当前 ${deduction.questions.length}`);
}
const stems = new Set<string>();
const optionCounts = [0, 0, 0, 0];
deduction.questions.forEach((question, index) => {
  const entry = expected[index];
  if (!entry) return;
  const where = `题目 ${entry.questionId}`;
  if (question.id !== entry.questionId) {
    errors.push(`${where}：id 应为 ${entry.questionId}，当前 ${question.id}`);
  }
  if (question.group !== entry.group) {
    errors.push(`${where}：group 应为「${entry.group}」，当前「${question.group}」`);
  }
  checkText(`${where} 题干`, question.stem, 8, 100);
  checkText(`${where} 解析`, question.explanation, 12, 160);
  if (!Array.isArray(question.options) || question.options.length !== 4) {
    errors.push(`${where}：必须有且只有 4 个选项`);
    return;
  }
  const options = new Set(question.options);
  if (options.size !== 4) errors.push(`${where}：选项重复`);
  question.options.forEach((option, optionIndex) => {
    checkText(`${where} 选项 ${'ABCD'[optionIndex]}`, option, 1, 50);
  });
  if (typeof question.answer !== 'number' || question.answer < 0 || question.answer > 3) {
    errors.push(`${where}：answer 必须为 0-3`);
  } else {
    optionCounts[question.answer] += 1;
  }
  if (stems.has(question.stem)) errors.push(`${where}：题干重复`);
  stems.add(question.stem);
});
optionCounts.forEach((count, optionIndex) => {
  if (count < 2) warnings.push(`正确项 ${'ABCD'[optionIndex]} 只有 ${count} 题，建议打散`);
  if (count > deduction.questions.length * 0.5) {
    errors.push(`正确项 ${'ABCD'[optionIndex]} 占比过高（${count} 题）`);
  }
});

// 成就
const achievementTargets = new Map<string, number>();
deduction.achievements.forEach((achievement) => {
  const key = `${achievement.metric}:${achievement.target}`;
  achievementTargets.set(key, (achievementTargets.get(key) ?? 0) + 1);
});
const requiredTargets = new Map<string, number>([
  ['mastered:1', 1],
  [`mastered:${Math.ceil(deduction.cards.length / 2)}`, 1],
  [`mastered:${deduction.cards.length}`, 1],
  ['challenge:1', 1],
  ['perfect:1', 1],
  ['correct:30', 1],
]);
requiredTargets.forEach((count, key) => {
  if ((achievementTargets.get(key) ?? 0) !== count) {
    errors.push(`成就指标缺少 ${key}`);
  }
});
if (deduction.achievements.length !== 6) errors.push('成就必须恰好 6 个');

// 元数据
if (charLen(deduction.intro) < 12 || charLen(deduction.intro) > 90) {
  errors.push(`intro 长度 ${charLen(deduction.intro)}，要求 12-90`);
}
if (!deduction.intro.includes('50') || !deduction.intro.includes('5')) {
  warnings.push('intro 没有体现「50 条记分行为 + 5 条规则」，建议说明');
}

console.log('\n—— 交规扣分完整校验 ——');
console.log(`法条条目：${expected.length}（50 条记分行为 + ${expected.length - 50} 条规则）`);
console.log(
  `卡片 ${deduction.cards.length}/${expected.length} · 题目 ${deduction.questions.length}/${expected.length} · 成就 ${deduction.achievements.length}/6`,
);
console.log(
  `分组：${[...groupCounts.entries()].map(([group, count]) => `${group} ${count}`).join(' / ')}`,
);
console.log(`答案分布：A/B/C/D = ${optionCounts.join('/')}`);

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
