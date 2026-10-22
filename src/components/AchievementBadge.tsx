import { motion } from 'motion/react';
import type { Achievement } from '../data/types';
import { achievementProgress } from '../store/progress';
import type { CategoryStats } from '../store/progress';
import { AchievementGlyph, IconCheck, IconLock } from './Icons';

interface AchievementBadgeProps {
  achievement: Achievement;
  stats: CategoryStats;
  /** 同组内的序号，用于轻微的进场错峰 */
  index?: number;
}

export function AchievementBadge({ achievement, stats, index = 0 }: AchievementBadgeProps) {
  const progress = achievementProgress(stats, achievement);

  return (
    <motion.article
      className="ach-badge"
      data-unlocked={progress.unlocked}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, delay: Math.min(index * 0.03, 0.24) }}
    >
      <span className="ach-badge__medal">
        <AchievementGlyph name={achievement.icon} size={23} />
      </span>
      <div className="ach-badge__body">
        <h3>
          {achievement.title}
          {progress.unlocked && <IconCheck size={12} />}
        </h3>
        <p className="ach-badge__desc">{achievement.desc}</p>
        <div className="ach-badge__progress">
          <span className="ach-badge__bar">
            <i style={{ width: `${progress.ratio * 100}%` }} />
          </span>
          <span className="ach-badge__count">
            {progress.unlocked ? '已点亮' : `${progress.value}/${progress.target}`}
          </span>
        </div>
      </div>
      {!progress.unlocked && <IconLock size={13} className="ach-badge__lock" />}
    </motion.article>
  );
}
