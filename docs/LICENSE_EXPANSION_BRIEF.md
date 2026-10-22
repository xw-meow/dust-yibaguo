# 新增「驾考等级 / 准驾车型」内容任务说明

> 首页新增第五个方向：**准驾车型（LICENSE CLASSES）**，覆盖 17 个准驾车型代号 + 年龄 / 增驾 / 实习期 / 准驾不符规则，共 **28 张卡 / 28 题 / 6 枚成就**。原文必须来自现行法规。

## 1. 法规版本（已核对）

- 主法规：《机动车驾驶证申领和使用规定》，按 **公安部令第 172 号**（2024-12-21 公布，**2025-01-01 施行**）修改后重新公布。
- 准驾车型代号表来自该规定 **附件 1《准驾车型及代号》**；172 号令修改的是年龄等条款，附件 1 按现行规定整理。
- 官方来源：
  - 172 号令全文：<https://www.gov.cn/gongbao/2025/issue_11866/202502/content_7004031.html>
  - 附件 1 原始 doc：<https://www.gov.cn/zhengce/2021-12/27/5712881/files/401f1df5428c4a988c6ac31c88cfd347.doc>
- 机读基准（唯一事实来源）：`docs/sources/license-classes-172.json`。**不要修改它**；如发现与官文不一致，报告 Lead。

## 2. 分区与文件

| 分区 | 负责文件 | 内容 | 卡片 id | 题目 id |
|---|---|---|---|---|
| partA | `src/data/license-parts/classes.ts` | 17 个准驾车型 | lic-01…lic-17 | qlic-01…qlic-17 |
| partB | `src/data/license-parts/rules.ts` | 年龄 / 增驾 / 实习期 / 准驾不符 11 条规则 | lic-18…lic-28 | qlic-18…qlic-28 |

最终由 `src/data/license.ts` 合并为 28 卡 / 28 题。

## 3. 文件结构

```ts
import type { ChallengeQuestion, LearningCard } from '../types';

export const cards: LearningCard[] = [
  {
    id: 'lic-01',
    group: 'A类 · 大客牵引',
    title: '大型客车 A1',
    original: '准驾车型：大型客车；代号：A1；准驾的车辆：大型载客汽车；准予驾驶的其他准驾车型：A3、B1、B2、C1、C2、C3、C4、M。',
    source: '《机动车驾驶证申领和使用规定》附件1《准驾车型及代号》',
    memory: 'A1 是客车里的最高档，往下 A3、B1、B2、C1-C4、M 都能开。',
  },
  // ...
];

export const questions: ChallengeQuestion[] = [
  {
    id: 'qlic-01',
    group: 'A类 · 大客牵引',
    stem: '准驾车型代号 A1 对应的准驾车辆是什么？',
    options: ['大型载客汽车', '重型牵引挂车', '城市公交车', '大型货车'],
    answer: 0,
    explanation: '附件 1 规定：A1 为大型客车，准驾车辆为大型载客汽车。易错点：A1 还能驾驶 A3、B1、B2、C1-C4、M，别把“准驾车辆”和“可开车型”混淆。',
  },
  // ...
];
```

## 4. 逐字原文规则（红线）

- 每张卡的 `original` 必须与脚本输出逐字一致：
  - 车型卡由 canonical 表格字段拼成固定句式：`准驾车型：…；代号：…；准驾的车辆：…；准予驾驶的其他准驾车型：…。`（无其他车型时写“无”）。
  - 规则卡是法规条文原文（172 号令修改后版本），不得改写、精简、改标点；年龄数字必须是 **19 / 20 / 22 / 63 / 70** 等现行数字，不能写旧的 60 岁上限。
- `source` 必须与脚本输出逐字一致。
- 获取你负责分区的全部字段（逐字复制）：

```bash
npx tsx scripts/print-license-source.ts partA   # 或 partB
```

- 只允许改自己的 part 文件；不要改 canonical JSON、`license.ts`、类型、UI、其他 part。

## 5. 标题与辅助记忆

- 车型卡标题直接写「中文名 + 代号」，如「重型牵引挂车 A2」「残疾人专用小型自动挡 C5」。
- 规则卡标题要具体，如「年龄条件（一）」「增驾 A2 年限」「准驾不符记 9 分」。
- 辅助记忆 8-100 字，必须是真的记忆抓手：代号/车型对照、包含关系、相近档位对比、数字口诀；不要照抄原文，不要引入未经核实的处罚金额/其他规则。
- 同一分区标题、辅助记忆不得重复；无 Markdown/emoji/换行/首尾空格。

## 6. 题目要求（一卡一题，顺序与 group 必须对应）

- 数量：车型 17 题、规则 11 题；每题 4 个不重复选项，正确答案确定无歧义，解析 12-160 字（依据 + 易错点）。
- 题型尽量多样：
  - 车型题：代号→车辆、车辆→代号、包含关系（如“B2 能开以下哪种车型”）、易混代号辨析（C1/C2/C5/C6、A1/A2/A3、B1/B2、D/E/F）；
  - 规则题：年龄区间、63/70 岁边界、增驾年限、实习期、准驾不符记分；
  - 归类/对照题。
- 正确项分布打散：每个分区 A/B/C/D 各至少 2 次，单一位置不超过 60%；不要全选同一字母。
- 干扰项必须明确错误；避免“以上都对/都不对”；题干不得依赖图片或上下文。

## 7. 自检

```bash
npx tsx scripts/validate-license-part.ts partA   # 换成自己的分区，必须通过
npx tsc --ignoreConfig --noEmit --strict --target ES2022 --module ESNext --moduleResolution Bundler --skipLibCheck src/data/types.ts src/data/license-parts/classes.ts
```

不要执行全量 build / validate-data（Lead 在并行合并与改 UI）。完成后更新共享任务为完成，并给 Lead 汇报：分区、卡片/题目数、答案分布、校验输出、存疑点。内容会进入正式题库给备考用户，宁可多核对一遍数字。
