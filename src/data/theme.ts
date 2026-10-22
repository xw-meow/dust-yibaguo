import type { CategoryId } from './types';

/**
 * 每个方向在 UI 上的专属视觉：巨型水印字、主色、浅色底、深色文字色。
 * 基础色板：主蓝 #2373F4 / 中蓝 #578EF5 / 青 #65D0F4 / 浅黄 #F2F7A0。
 */
export interface CategoryVisual {
  /** 卡片上的巨型水印字，来自这个科目的题眼 */
  watermark: string;
  /** 站内交互/装饰用的主色 */
  accent: string;
  /** 浅色底 */
  tint: string;
  /** 在浅底上可读的深色 */
  deep: string;
  /** 深色仪表盘上的进度段颜色（需与方向色卡呼应且足够亮） */
  meter: string;
}

export const categoryVisuals: Record<CategoryId, CategoryVisual> = {
  deduction: {
    watermark: '12',
    accent: '#2373F4',
    tint: '#E8F0FF',
    deep: '#1256C7',
    meter: '#578EF5',
  },
  fine: { watermark: '¥', accent: '#578EF5', tint: '#EAF1FF', deep: '#3F70D8', meter: '#8FB2FA' },
  abbr: { watermark: 'ABC', accent: '#65D0F4', tint: '#E6FAFF', deep: '#0E86A4', meter: '#65D0F4' },
  speed: { watermark: '120', accent: '#F2F7A0', tint: '#FBFDE3', deep: '#8A7A12', meter: '#F2F7A0' },
  license: {
    watermark: 'C1',
    accent: '#0A1E3A',
    tint: '#E9EEF8',
    deep: '#0A1E3A',
    meter: '#DCE7F6',
  },
};

export function stationNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

export function stationLabel(index: number): string {
  return `STATION ${stationNumber(index)}`;
}
