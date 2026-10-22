import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { categories } from '../data/index';
import { categoryVisuals } from '../data/theme';
import { totalUnlockedAchievements, useProgress } from '../store/progress';
import { percent } from '../lib/utils';
import { navigateHome } from '../lib/router';
import { AchievementBadge } from '../components/AchievementBadge';
import { CategoryGlyph, IconArrowLeft, IconTrophy } from '../components/Icons';

const totalAchievements = categories.reduce(
  (sum, category) => sum + category.achievements.length,
  0,
);

export function AchievementsPage() {
  const progress = useProgress();
  const unlocked = totalUnlockedAchievements(progress);
  const overall = percent(unlocked, totalAchievements);

  return (
    <div className="ach-page">
      <header className="ach-page__bar">
        <button
          type="button"
          className="ach-page__back"
          onClick={navigateHome}
          aria-label="返回首页"
        >
          <IconArrowLeft size={18} />
        </button>
        <h1>成就</h1>
        <span
          className="ach-page__total"
          aria-label={`已点亮 ${unlocked} / ${totalAchievements} 枚成就`}
        >
          <IconTrophy size={15} />
          <b>{unlocked}</b>
          <i>/ {totalAchievements}</i>
        </span>
      </header>

      <motion.section
        className="ach-wall-summary"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        aria-label="成就总进度"
      >
        <div className="ach-wall-summary__top">
          <span>已点亮成就</span>
          <IconTrophy size={17} />
        </div>
        <p className="ach-wall-summary__value">
          {unlocked}
          <span> / {totalAchievements}</span>
        </p>
        <div className="ach-wall-summary__bar" aria-hidden="true">
          <i style={{ width: `${overall}%` }} />
        </div>
      </motion.section>

      <div className="ach-wall-groups">
        {categories.map((category, groupIndex) => {
          const stats = progress.categories[category.id];
          const visuals = categoryVisuals[category.id];
          const groupStyle = {
            '--cat-accent': visuals.accent,
            '--cat-tint': visuals.tint,
            '--cat-deep': visuals.deep,
          } as CSSProperties;

          return (
            <motion.section
              key={category.id}
              className="ach-wall-group"
              style={groupStyle}
              data-theme={category.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.06 + groupIndex * 0.05 }}
              aria-labelledby={`ach-group-${category.id}`}
            >
              <header className="ach-wall-group__head">
                <span className="ach-wall-group__glyph" aria-hidden="true">
                  <CategoryGlyph categoryId={category.id} size={17} />
                </span>
                <h2 id={`ach-group-${category.id}`}>{category.name}</h2>
                <span className="ach-wall-group__count">
                  <b>{stats.achievements.length}</b>
                  <i> / {category.achievements.length}</i>
                </span>
              </header>

              <div className="ach-grid ach-wall-group__grid">
                {category.achievements.map((achievement, index) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievement={achievement}
                    stats={stats}
                    index={index}
                  />
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
