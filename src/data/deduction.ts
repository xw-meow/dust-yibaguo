import type { Category } from './types';
import { cards as partACards, questions as partAQuestions } from './deduction-parts/partA';
import { cards as partBCards, questions as partBQuestions } from './deduction-parts/partB';
import { cards as partCCards, questions as partCQuestions } from './deduction-parts/partC';
import { cards as partDCards, questions as partDQuestions } from './deduction-parts/partD';

/**
 * 交规扣分 —— 依据公安部令第 163 号《道路交通安全违法行为记分管理办法》
 * （2022-04-01 起施行，现行有效）。
 *
 * 覆盖第八至十二条全部 50 条记分行为，另附 5 条记分规则；
 * 所有卡片 original 均为法规原文（逐字一致），见 docs/sources/score-points-163.json。
 * 内容规范见 docs/DEDUCTION_EXPANSION_BRIEF.md。
 */
export const deduction: Category = {
  id: 'deduction',
  name: '交规扣分',
  shortName: '扣分',
  en: 'PENALTY POINTS',
  tagline: '一次记几分，心里要有数。',
  intro:
    '依据现行《道路交通安全违法行为记分管理办法》逐条整理：12、9、6、3、1 分共 50 条记分行为，另附 5 条记分规则；卡片原文均为法规原文。',
  groups: ['12分', '9分', '6分', '3分', '1分', '记分规则'],
  cards: [...partACards, ...partBCards, ...partCCards, ...partDCards],
  questions: [
    ...partAQuestions,
    ...partBQuestions,
    ...partCQuestions,
    ...partDQuestions,
  ],
  achievements: [
    {
      id: 'dd-a1',
      title: '初次上路',
      desc: '掌握第 1 张卡片',
      icon: 'spark',
      metric: 'mastered',
      target: 1,
    },
    {
      id: 'dd-a2',
      title: '半本驾照',
      desc: '掌握 28 张卡片，进度过半',
      icon: 'book',
      metric: 'mastered',
      target: 28,
    },
    {
      id: 'dd-a3',
      title: '零扣分司机',
      desc: '掌握全部 55 张卡片',
      icon: 'crown',
      metric: 'mastered',
      target: 55,
    },
    {
      id: 'dd-a4',
      title: '首战开张',
      desc: '完成第 1 次 10 题挑战',
      icon: 'flag',
      metric: 'challenge',
      target: 1,
    },
    {
      id: 'dd-a5',
      title: '满分车手',
      desc: '挑战拿到 10/10 满分',
      icon: 'target',
      metric: 'perfect',
      target: 1,
    },
    {
      id: 'dd-a6',
      title: '法规熟手',
      desc: '累计答对 30 道题',
      icon: 'stamp',
      metric: 'correct',
      target: 30,
    },
  ],
};
