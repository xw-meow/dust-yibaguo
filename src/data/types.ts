/**
 * 共享数据类型。内容文件（deduction / fine / abbr / speed）与 UI 都依赖这里的结构。
 * 修改本文件前先通知 Lead —— 四个内容文件正在并行编写中。
 */

export type CategoryId = 'deduction' | 'fine' | 'abbr' | 'speed' | 'license';

/** 科目一的五个训练方向（顺序也是首页便当格与路线站点顺序）。 */
export type AchievementIcon =
  | 'route'
  | 'book'
  | 'bolt'
  | 'target'
  | 'crown'
  | 'flag'
  | 'shield'
  | 'spark'
  | 'gauge'
  | 'stamp';

/**
 * 成就的统计口径。UI 会用它从学习记录里算出当前进度：
 * mastered  = 已标记掌握的卡片数
 * challenge = 累计完成挑战次数
 * perfect   = 累计 10/10 满分次数
 * correct   = 累计答对题数
 */
export type AchievementMetric = 'mastered' | 'challenge' | 'perfect' | 'correct';

export interface Achievement {
  id: string;
  /** 成就名，2-10 字，例如「零扣分司机」 */
  title: string;
  /** 解锁条件的直白说明，4-26 字，例如「掌握全部 20 张卡片」 */
  desc: string;
  icon: AchievementIcon;
  metric: AchievementMetric;
  /** 达成所需数值，必须与 metric 口径一致 */
  target: number;
}

export interface LearningCard {
  /** 形如 dd-01 / fn-01 / ab-01 / sp-01 */
  id: string;
  /** 必须出现在所属分类的 groups 中 */
  group: string;
  /** 卡片标题，2-20 字 */
  title: string;
  /** 法规/规则原文（精炼版）。数字必须准确，20-220 字 */
  original: string;
  /** 法规出处（如《道路交通安全违法行为记分管理办法》第八条第（一）项） */
  source?: string;
  /** 辅助记忆（口诀/联想/对比），8-100 字 */
  memory: string;
}

export interface ChallengeQuestion {
  /** 形如 qdd-01 / qfn-01 / qab-01 / qsp-01 */
  id: string;
  /** 关联的学习卡片 id；答完翻面时展示这张原卡 */
  cardId: string;
  /** 必须出现在所属分类的 groups 中 */
  group: string;
  stem: string;
  options: [string, string, string, string];
  /** 正确选项下标 0-3 */
  answer: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface Category {
  id: CategoryId;
  /** 完整名称，例如「交规扣分」 */
  name: string;
  /** 2-4 字简称，例如「扣分」 */
  shortName: string;
  /** 大写英文眉题，例如「PENALTY POINTS」 */
  en: string;
  /** 一句话海报语，4-24 字 */
  tagline: string;
  /** 方向介绍，12-90 字 */
  intro: string;
  /** 3-6 个分组标签，顺序即 UI 中筛选项的顺序 */
  groups: string[];
  cards: LearningCard[];
  questions: ChallengeQuestion[];
  achievements: Achievement[];
}
