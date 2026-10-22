/**
 * 内容数据校验器。
 * 用法：
 *   npx tsx scripts/validate-data.ts            # 校验全部四个分类
 *   npx tsx scripts/validate-data.ts deduction  # 只校验一个分类
 */
import type { Category, CategoryId } from '../src/data/types';

type Id = CategoryId;

/** 按需加载，避免并行写文件时某个分类的临时语法错误影响其他分类校验。 */
const LOADERS: Record<Id, () => Promise<Category>> = {
  deduction: async () => (await import('../src/data/deduction')).deduction,
  fine: async () => (await import('../src/data/fine')).fine,
  abbr: async () => (await import('../src/data/abbr')).abbr,
  speed: async () => (await import('../src/data/speed')).speed,
  license: async () => (await import('../src/data/license')).license,
};

interface Expected {
  prefix: string;
  qPrefix: string;
  groupList: string[];
  minCards: number;
  minQuestions: number;
  requireDigitInOriginal: boolean;
}

const EXPECTED: Record<Id, Expected> = {
  deduction: {
    prefix: 'dd',
    qPrefix: 'qdd',
    groupList: ['12分', '9分', '6分', '3分', '1分', '记分规则'],
    minCards: 55,
    minQuestions: 55,
    requireDigitInOriginal: false,
  },
  fine: {
    prefix: 'fn',
    qPrefix: 'qfn',
    groupList: ['通行与停车', '无证与逃逸', '牌证与车辆', '酒驾与醉驾', '营运与超载'],
    minCards: 18,
    minQuestions: 22,
    requireDigitInOriginal: true,
  },
  abbr: {
    prefix: 'ab',
    qPrefix: 'qab',
    groupList: ['制动与稳定', '驾驶辅助', '感知与预警', '车身与网联'],
    minCards: 20,
    minQuestions: 24,
    requireDigitInOriginal: false,
  },
  speed: {
    prefix: 'sp',
    qPrefix: 'qsp',
    groupList: ['高速公路', '普通道路', '恶劣天气', '安全距离'],
    minCards: 18,
    minQuestions: 22,
    requireDigitInOriginal: true,
  },
  license: {
    prefix: 'lic',
    qPrefix: 'qlic',
    groupList: ['A类 · 大客牵引', 'B类 · 中客大货', 'C类 · 小型汽车', '摩托车 · 其他', '准驾规则'],
    minCards: 28,
    minQuestions: 28,
    requireDigitInOriginal: false,
  },
};

const ICONS = new Set([
  'route',
  'book',
  'bolt',
  'target',
  'crown',
  'flag',
  'shield',
  'spark',
  'gauge',
  'stamp',
]);
const METRICS = new Set(['mastered', 'challenge', 'perfect', 'correct']);

const errors: string[] = [];
const warnings: string[] = [];

const charLen = (value: unknown): number => (typeof value === 'string' ? [...value].length : 0);

function checkText(
  cat: Id,
  where: string,
  value: unknown,
  min: number,
  max: number,
  { allowEmpty = false } = {},
): void {
  if (typeof value !== 'string') {
    errors.push(`${cat} · ${where}：必须是字符串`);
    return;
  }
  if (!allowEmpty && value.trim() === '') {
    errors.push(`${cat} · ${where}：不能为空`);
    return;
  }
  if (value !== value.trim()) errors.push(`${cat} · ${where}：不能有首尾空格`);
  if (/[\n\r]/.test(value)) errors.push(`${cat} · ${where}：不能包含换行`);
  if (/\*\*|```|<\/?[a-z]/i.test(value)) {
    errors.push(`${cat} · ${where}：不能包含 Markdown / HTML`);
  }
  const length = charLen(value);
  if (length < min || length > max) {
    errors.push(`${cat} · ${where}：长度 ${length}，要求 ${min}-${max} 字`);
  }
}

function validateCategory(category: Category, expected: Expected): void {
  const cat = category.id;
  const where = (suffix: string) => `${cat}.${suffix}`;

  if (!EXPECTED[cat]) {
    errors.push(`未知分类 id：${cat}`);
    return;
  }

  if (category.name.trim() === '') errors.push(`${where('name')}：不能为空`);
  if (charLen(category.shortName) < 2 || charLen(category.shortName) > 4) {
    errors.push(`${where('shortName')}：要求 2-4 字`);
  }
  if (!/^[A-Z][A-Z &/'-]*$/.test(category.en)) {
    errors.push(`${where('en')}：要求大写英文眉题`);
  }
  checkText(cat, 'tagline', category.tagline, 4, 24);
  checkText(cat, 'intro', category.intro, 12, 90);

  // groups
  if (!Array.isArray(category.groups)) {
    errors.push(`${where('groups')}：必须是数组`);
  } else {
    const actual = category.groups.join('|');
    const wanted = expected.groupList.join('|');
    if (actual !== wanted) {
      errors.push(
        `${where('groups')}：分组必须精确为 [${expected.groupList.join('、')}]，当前为 [${category.groups.join('、')}]`,
      );
    }
  }
  const groupSet = new Set(category.groups ?? []);

  // cards
  if (!Array.isArray(category.cards)) {
    errors.push(`${where('cards')}：必须是数组`);
    return;
  }
  if (category.cards.length < expected.minCards) {
    errors.push(`${where('cards')}：需要至少 ${expected.minCards} 张，当前 ${category.cards.length} 张`);
  }
  if (category.cards.length > expected.minCards + 2) {
    warnings.push(`${cat}：卡片数 ${category.cards.length} 超过建议值 ${expected.minCards}，注意成就 target 需同步`);
  }

  const cardIds = new Set<string>();
  const cardTitles = new Set<string>();
  const cardOriginals = new Set<string>();
  const groupOrder: string[] = [];

  category.cards.forEach((card, index) => {
    const id = `${expected.prefix}-${String(index + 1).padStart(2, '0')}`;
    if (card.id !== id) errors.push(`卡 ${index + 1}：id 应为 ${id}，当前 ${card.id}`);
    if (cardIds.has(card.id)) errors.push(`卡 ${card.id}：id 重复`);
    cardIds.add(card.id);

    if (!groupSet.has(card.group)) errors.push(`卡 ${card.id}：group「${card.group}」不在 groups 中`);
    if (groupOrder.at(-1) !== card.group) groupOrder.push(card.group);

    checkText(cat, `卡 ${card.id} 标题`, card.title, 2, 20);
    checkText(cat, `卡 ${card.id} 原文`, card.original, cat === 'deduction' ? 8 : 20, 220);
    checkText(cat, `卡 ${card.id} 辅助记忆`, card.memory, 8, 100);

    if (expected.requireDigitInOriginal && !/\d/.test(card.original)) {
      warnings.push(`卡 ${card.id}：原文没有数字，确认是否漏掉题眼`);
    }
    if (cardTitles.has(card.title)) errors.push(`卡 ${card.id}：标题重复「${card.title}」`);
    if (cardOriginals.has(card.original)) errors.push(`卡 ${card.id}：原文重复`);
    cardTitles.add(card.title);
    cardOriginals.add(card.original);
    if (card.original === card.memory) errors.push(`卡 ${card.id}：辅助记忆不能照抄原文`);
  });

  // 卡片应尽量按分组连续排列
  const seenGroup = new Set<string>();
  for (const group of groupOrder) {
    if (seenGroup.has(group)) {
      warnings.push(`${cat}：分组「${group}」的卡片没有连续排列，影响阅读顺序`);
    }
    seenGroup.add(group);
  }

  // questions
  if (!Array.isArray(category.questions)) {
    errors.push(`${where('questions')}：必须是数组`);
    return;
  }
  if (category.questions.length < expected.minQuestions) {
    errors.push(
      `${where('questions')}：需要至少 ${expected.minQuestions} 题，当前 ${category.questions.length} 题`,
    );
  }
  const questionIds = new Set<string>();
  const stems = new Set<string>();
  const answerCounts = [0, 0, 0, 0];
  const questionGroups = new Set<string>();

  category.questions.forEach((question, index) => {
    const id = `${expected.qPrefix}-${String(index + 1).padStart(2, '0')}`;
    if (question.id !== id) errors.push(`题 ${index + 1}：id 应为 ${id}，当前 ${question.id}`);
    if (questionIds.has(question.id)) errors.push(`题 ${question.id}：id 重复`);
    questionIds.add(question.id);

    if (typeof question.cardId !== 'string' || !cardIds.has(question.cardId)) {
      errors.push(`题 ${question.id}：cardId「${String(question.cardId)}」不对应本方向任何卡片`);
    }

    if (!groupSet.has(question.group)) {
      errors.push(`题 ${question.id}：group「${question.group}」不在 groups 中`);
    }
    questionGroups.add(question.group);

    checkText(cat, `题 ${question.id} 题干`, question.stem, 8, 100);
    checkText(cat, `题 ${question.id} 解析`, question.explanation, 12, 160);

    if (!Array.isArray(question.options) || question.options.length !== 4) {
      errors.push(`题 ${question.id}：必须有且只有 4 个选项`);
      return;
    }
    const optionSet = new Set<string>();
    question.options.forEach((option, optionIndex) => {
      checkText(cat, `题 ${question.id} 选项 ${'ABCD'[optionIndex]}`, option, 1, 50);
      if (optionSet.has(option)) errors.push(`题 ${question.id}：选项重复`);
      optionSet.add(option);
    });
    if (
      typeof question.answer !== 'number' ||
      !Number.isInteger(question.answer) ||
      question.answer < 0 ||
      question.answer > 3
    ) {
      errors.push(`题 ${question.id}：answer 必须是 0-3 的整数`);
    } else {
      answerCounts[question.answer] += 1;
    }

    if (stems.has(question.stem)) errors.push(`题 ${question.id}：题干重复`);
    stems.add(question.stem);
  });

  if (category.questions.length > 0) {
    answerCounts.forEach((count, optionIndex) => {
      if (count < 2) {
        warnings.push(`${cat}：正确项 ${'ABCD'[optionIndex]} 只有 ${count} 题，建议打散答案`);
      }
      if (count > category.questions.length * 0.5) {
        errors.push(`${cat}：正确项 ${'ABCD'[optionIndex]} 占比过高（${count} 题），请打散答案`);
      }
    });
    if (questionGroups.size < groupSet.size) {
      warnings.push(`${cat}：有分组没有对应题目，题库覆盖不完整`);
    }
  }

  // achievements
  if (!Array.isArray(category.achievements)) {
    errors.push(`${where('achievements')}：必须是数组`);
    return;
  }
  if (category.achievements.length !== 6) {
    errors.push(`${where('achievements')}：必须恰好 6 个成就，当前 ${category.achievements.length} 个`);
  }

  const baseTargets = [
    { metric: 'mastered', target: 1 },
    { metric: 'mastered', target: Math.ceil(category.cards.length / 2) },
    { metric: 'mastered', target: category.cards.length },
    { metric: 'challenge', target: 1 },
    { metric: 'perfect', target: 1 },
    { metric: 'correct', target: 30 },
  ];
  const expectedKeyCount = new Map<string, number>();
  baseTargets.forEach((item) => {
    const key = `${item.metric}:${item.target}`;
    expectedKeyCount.set(key, (expectedKeyCount.get(key) ?? 0) + 1);
  });

  const achievementTitles = new Set<string>();
  const achievementIcons = new Set<string>();
  const actualKeyCount = new Map<string, number>();

  category.achievements.forEach((achievement, index) => {
    const id = `${expected.prefix}-a${index + 1}`;
    if (achievement.id !== id) errors.push(`成就 ${index + 1}：id 应为 ${id}，当前 ${achievement.id}`);
    checkText(cat, `成就 ${id} 标题`, achievement.title, 2, 10);
    checkText(cat, `成就 ${id} 描述`, achievement.desc, 4, 26);
    if (!ICONS.has(achievement.icon)) errors.push(`成就 ${id}：icon「${achievement.icon}」不合法`);
    if (achievementIcons.has(achievement.icon)) errors.push(`成就 ${id}：icon 与同分类其他成就重复`);
    achievementIcons.add(achievement.icon);
    if (!METRICS.has(achievement.metric)) errors.push(`成就 ${id}：metric 不合法`);
    if (!Number.isInteger(achievement.target) || achievement.target <= 0) {
      errors.push(`成就 ${id}：target 必须是正整数`);
    }
    if (achievementTitles.has(achievement.title)) errors.push(`成就 ${id}：标题重复`);
    achievementTitles.add(achievement.title);

    const key = `${achievement.metric}:${achievement.target}`;
    actualKeyCount.set(key, (actualKeyCount.get(key) ?? 0) + 1);
  });

  expectedKeyCount.forEach((count, key) => {
    if ((actualKeyCount.get(key) ?? 0) !== count) {
      errors.push(
        `${cat}：成就指标缺少 ${key}（要求 ×${count}，当前 ×${actualKeyCount.get(key) ?? 0}）`,
      );
    }
  });
  actualKeyCount.forEach((count, key) => {
    if (!expectedKeyCount.has(key)) errors.push(`${cat}：成就指标多出 ${key}`);
  });
}

const filter = process.argv[2];
const ids = Object.keys(LOADERS) as Id[];

if (filter && !ids.includes(filter as Id)) {
  console.error(`未知分类「${filter}」，可选：${ids.join(' / ')}`);
  process.exit(2);
}

const selected = await Promise.all(
  (filter ? [filter as Id] : ids).map(async (id) => {
    try {
      return await LOADERS[id]();
    } catch (error) {
      errors.push(`${id}：数据文件加载失败（可能是语法错误）— ${(error as Error).message}`);
      return null;
    }
  }),
).then((items) => items.filter((item): item is Category => item !== null));

selected.forEach((category) => {
  validateCategory(category, EXPECTED[category.id]);
});

console.log('\n—— 内容校验 ——');
selected.forEach((category) => {
  const expected = EXPECTED[category.id];
  const status =
    category.cards.length >= expected.minCards && category.questions.length >= expected.minQuestions
      ? '✓'
      : '·';
  console.log(
    `${status} ${category.id.padEnd(10)} ${category.name}  ` +
      `卡片 ${category.cards.length}/${expected.minCards}  ` +
      `题目 ${category.questions.length}/${expected.minQuestions}  ` +
      `成就 ${category.achievements.length}/6  ` +
      `分组 ${category.groups.length}`,
  );
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

console.log(`\n校验通过，全部达标。${warnings.length > 0 ? '（有提示，可选优化）' : ''}\n`);
