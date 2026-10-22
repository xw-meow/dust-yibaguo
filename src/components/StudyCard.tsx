import { categoryVisuals } from '../data/theme';
import type { Category, LearningCard } from '../data/types';
import type { CardMastery } from '../lib/mastery';
import { MASTERY_MIN_ATTEMPTS } from '../lib/mastery';
import { CardContent } from './CardContent';

interface StudyCardProps {
  category: Category;
  card: LearningCard;
  number: number;
  total: number;
  mastery: CardMastery;
}

/** 竖版学习卡：按挑战记录显示不同材质，正文区可上下滚动。 */
export function StudyCard({ category, card, number, total, mastery }: StudyCardProps) {
  const visuals = categoryVisuals[category.id];
  const evaluated = mastery.attempts >= MASTERY_MIN_ATTEMPTS;

  return (
    <article
      className="study-card card-surface"
      data-watermark={visuals.watermark}
      data-level={mastery.level}
      aria-label={`${card.group}，${card.title}，${mastery.label}`}
    >
      <span className="card-wm" aria-hidden="true">
        {visuals.watermark}
      </span>

      <header className="study-card__head">
        <span className="study-card__group">{card.group}</span>
        <span className="study-card__no">CARD {String(number).padStart(2, '0')} / {total}</span>
      </header>

      <h2 className="study-card__title">{card.title}</h2>

      <div className="study-card__scroll" tabIndex={0} aria-label="卡片正文，可上下滚动">
        <CardContent card={card} />
      </div>

      <footer className="study-card__foot">
        <span className="study-level" data-level={mastery.level}>
          {mastery.label}
        </span>
        <span className="study-level__stats">
          {evaluated
            ? `作答 ${mastery.attempts} 次 · 正确率 ${mastery.accuracy}%`
            : mastery.attempts > 0
              ? `作答 ${mastery.attempts} / ${MASTERY_MIN_ATTEMPTS} 次`
              : `答满 ${MASTERY_MIN_ATTEMPTS} 次判定`}
        </span>
      </footer>
    </article>
  );
}
