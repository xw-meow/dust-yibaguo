/**
 * 打印「驾考等级/准驾车型」某个分区的法规原文与期望 id / group / source。
 * 用法：npx tsx scripts/print-license-source.ts partA
 */
import { PART_RANGES, partEntries } from './license-source';
import type { PartName } from './license-source';

const part = process.argv[2] as PartName;

if (!part || !(part in PART_RANGES)) {
  console.error(`用法：npx tsx scripts/print-license-source.ts <${Object.keys(PART_RANGES).join('|')}>`);
  process.exit(2);
}

const entries = partEntries(part);
console.log(`分区：${part}（${PART_RANGES[part].name}） · ${entries.length} 条\n`);

entries.forEach((entry) => {
  console.log(`#${String(entry.order).padStart(2, '0')}  cardId=${entry.cardId}  questionId=${entry.questionId}`);
  console.log(`group: ${entry.group}`);
  console.log(`titleHint: ${entry.titleHint}`);
  console.log(`source: ${entry.source}`);
  console.log(`original: ${entry.original}`);
  console.log('');
});
