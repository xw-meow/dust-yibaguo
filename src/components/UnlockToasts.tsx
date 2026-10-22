import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { categoryMap } from '../data/index';
import { dismissUnlock, useUnlockQueue } from '../store/unlockQueue';
import type { UnlockNotice } from '../store/unlockQueue';
import { AchievementGlyph, IconClose } from './Icons';

function UnlockToast({ notice }: { notice: UnlockNotice }) {
  useEffect(() => {
    const timer = window.setTimeout(() => dismissUnlock(notice.key), 5000);
    return () => window.clearTimeout(timer);
  }, [notice.key]);

  const category = categoryMap[notice.categoryId];

  return (
    <motion.div
      className="unlock-toast"
      role="status"
      initial={{ opacity: 0, y: 22, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
    >
      <span className="unlock-toast__medal">
        <AchievementGlyph name={notice.achievement.icon} size={20} />
      </span>
      <span className="unlock-toast__body">
        <span className="unlock-toast__label">ACHIEVEMENT UNLOCKED</span>
        <span className="unlock-toast__title">{notice.achievement.title}</span>
        <span className="unlock-toast__cat">
          {category.name} · {notice.achievement.desc}
        </span>
      </span>
      <button
        type="button"
        className="unlock-toast__close"
        onClick={() => dismissUnlock(notice.key)}
        aria-label="关闭成就提示"
      >
        <IconClose size={13} />
      </button>
    </motion.div>
  );
}

export function UnlockToasts() {
  const notices = useUnlockQueue();
  const current = notices[0];

  return (
    <div className="unlock-toasts">
      <AnimatePresence>
        {current && <UnlockToast key={current.key} notice={current} />}
      </AnimatePresence>
    </div>
  );
}
