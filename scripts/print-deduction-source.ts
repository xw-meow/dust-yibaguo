/**
 * 打印某个分区的法规原文与期望 id / group / source，供内容负责人在写 part 文件时逐字复制。
 * 用法：npx tsx scripts/print-deduction-source.ts partA
 */
import { PART_RANGES, partEntries, readCanonical } from './deduction-source';
import type { PartName } from './deduction-source';

const part = process.argv[2] as PartName;

if (!part || !(part in PART_RANGES)) {
  console.error(`用法：npx tsx scripts/print-deduction-source.ts <${Object.keys(PART_RANGES).join('|')}>`);
  process.exit(2);
}

const canonical = readCanonical();
const entries = partEntries(part);

console.log(`法规：${canonical.law}（${canonical.documentNumber}，${canonical.effectiveDate} 施行）`);
console.log(`分区：${part}（${PART_RANGES[part].name}） · ${entries.length} 条\n`);

entries.forEach((entry) => {
  console.log(`#${String(entry.order).padStart(2, '0')}  cardId=${entry.cardId}  questionId=${entry.questionId}`);
  console.log(`group: ${entry.group}${entry.kind === 'rule' ? '  （规则卡）' : ''}`);
  if (entry.titleHint) console.log(`titleHint: ${entry.titleHint}`);
  console.log(`source: ${entry.source}`);
  console.log(`original: ${entry.original}`);
  console.log('');
});
