/** 一张学习卡的答题记录，用于按挑战表现判定掌握程度。 */
export interface CardRecord {
  attempts: number;
  correct: number;
}

export type MasteryLevel = 'new' | 'learning' | 'familiar' | 'mastered';

/** 判定一张卡前需要的最少作答次数。 */
export const MASTERY_MIN_ATTEMPTS = 10;

export interface CardMastery {
  /** 卡面材质等级：未达标也用 new，文案区分「新卡 / 待判定 / 待加强」 */
  level: MasteryLevel;
  label: string;
  attempts: number;
  correct: number;
  /** 0-100 的整数正确率 */
  accuracy: number;
  /** 距离判定还差几次作答，已开始判定则为 0 */
  remaining: number;
}

/**
 * 判定规则（用户设定）：
 * - 一张卡作答满 10 次后开始判定；
 * - 正确率 ≥60% 为「了解」，≥80% 为「熟悉」，100% 为「掌握」；
 * - 不足 10 次显示「新卡 / 待判定」，满 10 次但正确率不足 60% 显示「待加强」。
 */
export function cardMastery(record?: CardRecord): CardMastery {
  const attempts = Math.max(0, Math.floor(record?.attempts ?? 0));
  const correct = Math.max(0, Math.min(attempts, Math.floor(record?.correct ?? 0)));
  const accuracy = attempts > 0 ? correct / attempts : 0;
  const remaining = Math.max(0, MASTERY_MIN_ATTEMPTS - attempts);

  let level: MasteryLevel = 'new';
  if (attempts >= MASTERY_MIN_ATTEMPTS) {
    if (correct === attempts) level = 'mastered';
    else if (accuracy >= 0.8) level = 'familiar';
    else if (accuracy >= 0.6) level = 'learning';
  }

  let label: string;
  if (attempts < MASTERY_MIN_ATTEMPTS) {
    label = attempts > 0 ? '待判定' : '新卡';
  } else {
    label =
      level === 'mastered'
        ? '掌握'
        : level === 'familiar'
          ? '熟悉'
          : level === 'learning'
            ? '了解'
            : '待加强';
  }

  return {
    level,
    label,
    attempts,
    correct,
    accuracy: Math.round(accuracy * 100),
    remaining,
  };
}

/** 从答题记录中挑出达到「掌握」（满 10 次且全对）的卡片 id。 */
export function masteredCardIds(
  cards: ReadonlyArray<{ id: string }>,
  records: Record<string, CardRecord>,
): string[] {
  return cards
    .filter((card) => cardMastery(records[card.id]).level === 'mastered')
    .map((card) => card.id);
}
