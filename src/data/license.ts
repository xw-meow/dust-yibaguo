import type { Category } from './types';
import { cards as classCards, questions as classQuestions } from './license-parts/classes';
import { cards as ruleCards, questions as ruleQuestions } from './license-parts/rules';

/**
 * 驾考等级 / 准驾车型 —— 依据公安部令第 172 号修改后的
 * 《机动车驾驶证申领和使用规定》（2025-01-01 起施行）。
 * 17 个准驾车型 + 年龄、增驾、实习期、准驾不符规则；共 28 卡 / 28 题。
 * 规范见 docs/LICENSE_EXPANSION_BRIEF.md，原文基准见 docs/sources/license-classes-172.json。
 */
export const license: Category = {
  id: 'license',
  name: '准驾车型',
  shortName: '车型',
  en: 'LICENSE CLASSES',
  tagline: 'A1 到 P，对号入座。',
  intro:
    '按《机动车驾驶证申领和使用规定》整理 17 个准驾车型代号、准驾车辆与可开车型，另附年龄、增驾、实习期和准驾不符规则；原文出自法规及附件 1。',
  groups: ['A类 · 大客牵引', 'B类 · 中客大货', 'C类 · 小型汽车', '摩托车 · 其他', '准驾规则'],
  cards: [...classCards, ...ruleCards],
  questions: [...classQuestions, ...ruleQuestions],
  achievements: [
    {
      id: 'lic-a1',
      title: '驾照起步',
      desc: '掌握第 1 张车型卡片',
      icon: 'book',
      metric: 'mastered',
      target: 1,
    },
    {
      id: 'lic-a2',
      title: '半程车感',
      desc: '掌握 14 张卡片，进度过半',
      icon: 'route',
      metric: 'mastered',
      target: 14,
    },
    {
      id: 'lic-a3',
      title: '全车型通关',
      desc: '掌握全部 28 张卡片',
      icon: 'crown',
      metric: 'mastered',
      target: 28,
    },
    {
      id: 'lic-a4',
      title: '首考通过',
      desc: '完成第 1 次 10 题挑战',
      icon: 'flag',
      metric: 'challenge',
      target: 1,
    },
    {
      id: 'lic-a5',
      title: '满分车神',
      desc: '挑战拿到 10/10 满分',
      icon: 'target',
      metric: 'perfect',
      target: 1,
    },
    {
      id: 'lic-a6',
      title: '车型活字典',
      desc: '累计答对 30 道题',
      icon: 'stamp',
      metric: 'correct',
      target: 30,
    },
  ],
};
