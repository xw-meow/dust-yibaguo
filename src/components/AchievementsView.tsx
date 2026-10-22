import { motion } from 'motion/react';
import type { Category } from '../data/types';
import type { CategoryStats } from '../store/progress';
import { percent } from '../lib/utils';
import { AchievementBadge } from './AchievementBadge';
import { IconTrophy } from './Icons';

interface AchievementsViewProps {
  category: Category;
  stats: CategoryStats;
}

export function AchievementsView({ category, stats }: AchievementsViewProps) {
  const total = category.achievements.length;
  const unlocked = stats.achievements.length;

  return (
    <div
      className="achievements-panel"
      tabIndex={0}
      aria-label="本方向成就列表，可上下滚动"
    >
      <motion.section
        className="ach-tab-summary"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
        aria-label={`本方向已点亮 ${unlocked} / ${total} 枚成就`}
      >
        <h2 className="ach-tab-summary__head">
          <span>本方向成就</span>
          <IconTrophy size={17} />
        </h2>
        <p className="ach-tab-summary__value">
          {unlocked}
          <span> / {total}</span>
        </p>
        <div
          className="ach-tab-summary__bar"
          role="progressbar"
          aria-label="本方向成就进度"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={unlocked}
        >
          <i style={{ width: `${percent(unlocked, total)}%` }} />
        </div>
      </motion.section>

      <div className="ach-grid ach-tab-grid">
        {category.achievements.map((achievement, index) => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            stats={stats}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
