import type { LearningCard } from '../data/types';
import { HighlightText } from './HighlightText';
import { IconMarker } from './Icons';

/** 学习卡与挑战翻面共用的正文：原文 + 法规出处 + 辅助记忆。 */
export function CardContent({ card }: { card: LearningCard }) {
  return (
    <>
      <section className="card-content__law" aria-label="法规原文">
        <span className="card-content__label">原文</span>
        <p className="card-content__original">
          <HighlightText text={card.original} />
        </p>
        {card.source && <p className="card-content__source">法规出处 · {card.source}</p>}
      </section>

      <section className="card-content__memory" aria-label="辅助记忆">
        <span className="card-content__label">
          <IconMarker size={12} />
          辅助记忆
        </span>
        <p>
          <HighlightText text={card.memory} variant="memory" />
        </p>
      </section>
    </>
  );
}
