import { useState } from 'react';
import type { Category } from '../data/types';
import type { CategoryStats } from '../store/progress';
import { cardMastery } from '../lib/mastery';
import { SwipeDeck } from './SwipeDeck';
import { StudyCard } from './StudyCard';

interface LearnViewProps {
  category: Category;
  stats: CategoryStats;
  active: boolean;
}

const ALL_GROUPS = '全部';

export function LearnView({ category, stats, active }: LearnViewProps) {
  const [group, setGroup] = useState(ALL_GROUPS);
  const [index, setIndex] = useState(0);

  const filteredCards =
    group === ALL_GROUPS ? category.cards : category.cards.filter((card) => card.group === group);
  const safeIndex = Math.min(index, filteredCards.length - 1);
  const card = filteredCards[safeIndex] ?? category.cards[0];
  const mastery = cardMastery(stats.cardRecords[card.id]);
  const number = category.cards.findIndex((item) => item.id === card.id) + 1;

  const countByGroup = new Map<string, number>();
  category.cards.forEach((item) => {
    countByGroup.set(item.group, (countByGroup.get(item.group) ?? 0) + 1);
  });

  function selectGroup(next: string) {
    setGroup(next);
    setIndex(0);
  }

  return (
    <div className="learn-panel">
      <div className="learn-filters" role="group" aria-label="按分组筛选卡片">
        <button
          type="button"
          className="learn-filter"
          aria-pressed={group === ALL_GROUPS}
          onClick={() => selectGroup(ALL_GROUPS)}
        >
          全部
          <span>{category.cards.length}</span>
        </button>
        {category.groups.map((item) => (
          <button
            key={item}
            type="button"
            className="learn-filter"
            aria-pressed={group === item}
            onClick={() => selectGroup(item)}
          >
            {item}
            <span>{countByGroup.get(item) ?? 0}</span>
          </button>
        ))}
      </div>

      <SwipeDeck
        currentKey={card.id}
        index={safeIndex}
        total={filteredCards.length}
        onNavigate={setIndex}
        label={`${category.name}学习卡片`}
        active={active}
      >
        <StudyCard
          category={category}
          card={card}
          number={number}
          total={category.cards.length}
          mastery={mastery}
        />
      </SwipeDeck>
    </div>
  );
}
