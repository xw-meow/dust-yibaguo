import { abbr } from './abbr';
import { deduction } from './deduction';
import { fine } from './fine';
import { license } from './license';
import { speed } from './speed';
import type { Category, CategoryId } from './types';

export const categories: Category[] = [deduction, fine, abbr, speed, license];

export const categoryMap: Record<CategoryId, Category> = {
  deduction,
  fine,
  abbr,
  speed,
  license,
};

export const totalCardCount = categories.reduce((sum, category) => sum + category.cards.length, 0);

export const totalAchievementCount = categories.reduce(
  (sum, category) => sum + category.achievements.length,
  0,
);

export * from './types';
