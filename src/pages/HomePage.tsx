import { useCallback, useState } from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { categories } from '../data/index';
import { categoryVisuals } from '../data/theme';
import type { Category } from '../data/types';
import type { CategoryStats } from '../store/progress';
import {
  resetAll,
  totalMastered,
  totalUnlockedAchievements,
  useProgress,
} from '../store/progress';
import { percent } from '../lib/utils';
import { navigateAchievements, navigateCategory } from '../lib/router';
import { BrandMark, IconArrowRight, IconTrash, IconTrophy } from '../components/Icons';
import { ResetProgressDialog } from '../components/ResetProgressDialog';

const totalCards = categories.reduce((sum, category) => sum + category.cards.length, 0);
const totalAchievements = categories.reduce(
  (sum, category) => sum + category.achievements.length,
  0,
);

const pageVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.02 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.44, ease: 'easeOut' } },
};

const bentoVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.44, ease: 'easeOut', staggerChildren: 0.055, delayChildren: 0.04 },
  },
};

interface CategoryTileProps {
  category: Category;
  stats: CategoryStats;
  wide: boolean;
}

function CategoryTile({ category, stats, wide }: CategoryTileProps) {
  const mastered = stats.mastered.length;
  const visuals = categoryVisuals[category.id];

  return (
    <motion.a
      href={`#/c/${category.id}`}
      className={`cat-tile${wide ? ' cat-tile--wide' : ''}`}
      data-theme={category.id}
      variants={itemVariants}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      onClick={(event) => {
        event.preventDefault();
        navigateCategory(category.id);
      }}
    >
      <div className="cat-tile__top">
        <h3>{category.name}</h3>
        <span className="cat-tile__arrow" aria-hidden="true">
          <IconArrowRight size={14} />
        </span>
      </div>

      <span className="cat-tile__mark" aria-hidden="true">
        {visuals.watermark}
      </span>

      <div className="cat-tile__meta">
        <span className="cat-tile__count">
          已掌握 <b>{mastered}</b> / {category.cards.length}
        </span>
        <span className="cat-tile__bar" aria-hidden="true">
          <i style={{ width: `${percent(mastered, category.cards.length)}%` }} />
        </span>
      </div>
    </motion.a>
  );
}

export function HomePage() {
  const progress = useProgress();
  const [resetOpen, setResetOpen] = useState(false);
  const mastered = totalMastered(progress);
  const overall = percent(mastered, totalCards);
  const unlocked = totalUnlockedAchievements(progress);
  const closeResetDialog = useCallback(() => setResetOpen(false), []);
  const segmentLabel = categories
    .map(
      (category) =>
        `${category.shortName} ${progress.categories[category.id].mastered.length}/${category.cards.length}`,
    )
    .join('，');

  return (
    <>
      <div className="home">
        <motion.div
          className="home__inner"
          variants={pageVariants}
          initial="hidden"
          animate="show"
        >
          <motion.header className="home-head" variants={itemVariants}>
            <div className="home-brand">
              <span className="home-brand__mark">
                <BrandMark size={42} />
              </span>
              <div className="home-brand__text">
                <h1>一把过</h1>
                <span className="home-brand__plate">科目一</span>
              </div>
            </div>

            <div className="home-head__actions">
              <a
                className="ach-entry"
                href="#/achievements"
                aria-label={`成就：已点亮 ${unlocked} / ${totalAchievements}`}
                onClick={(event) => {
                  event.preventDefault();
                  navigateAchievements();
                }}
              >
                <span className="ach-entry__medal" aria-hidden="true">
                  <IconTrophy size={17} />
                </span>
                <span className="ach-entry__text">
                  <small>成就</small>
                  <b>
                    {unlocked}
                    <i> / {totalAchievements}</i>
                  </b>
                </span>
              </a>
              <button
                type="button"
                className="home-reset"
                aria-label="清空全部学习进度"
                title="清空全部学习进度"
                onClick={() => setResetOpen(true)}
              >
                <IconTrash size={15} />
              </button>
            </div>
          </motion.header>

          <motion.section className="dash" variants={itemVariants} aria-label="总掌握进度">
            <div className="dash__top">
              <span className="dash__label">掌握进度</span>
              <span className="dash__total">
                <b>{mastered}</b> / {totalCards} 张
              </span>
            </div>

            <p className="dash__pct">
              {overall}
              <span>%</span>
            </p>

            <div
              className="dash__segs"
              role="img"
              aria-label={`各方向掌握进度：${segmentLabel}`}
            >
              {categories.map((category) => {
                const categoryMastered = progress.categories[category.id].mastered.length;
                return (
                  <span className="dash__seg" key={category.id}>
                    <span className="dash__seg-track">
                      <i
                        style={{
                          width: `${percent(categoryMastered, category.cards.length)}%`,
                          background: categoryVisuals[category.id].meter,
                        }}
                      />
                    </span>
                    <span className="dash__seg-label" aria-hidden="true">
                      {category.shortName}
                    </span>
                  </span>
                );
              })}
            </div>
          </motion.section>

          <motion.section className="bento" variants={bentoVariants} aria-label="训练方向">
            {categories.map((category, index) => (
              <CategoryTile
                key={category.id}
                category={category}
                stats={progress.categories[category.id]}
                wide={index === 0}
              />
            ))}
          </motion.section>
        </motion.div>
      </div>

      <ResetProgressDialog
        open={resetOpen}
        onCancel={closeResetDialog}
        onConfirm={() => {
          resetAll();
          setResetOpen(false);
        }}
      />
    </>
  );
}
