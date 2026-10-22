import { useEffect, useLayoutEffect } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { useRoute } from './lib/router';
import { SiteFooter } from './components/SiteFooter';
import { UnlockToasts } from './components/UnlockToasts';
import { HomePage } from './pages/HomePage';
import { AchievementsPage } from './pages/AchievementsPage';
import { TrainingPage } from './pages/TrainingPage';
import './styles/global.css';
import './styles/home.css';
import './styles/training.css';
import './styles/challenge.css';
import './styles/achievements.css';
import './styles/achievements-page.css';

function App() {
  const route = useRoute();
  const routeKey =
    route.page === 'home'
      ? 'home'
      : route.page === 'achievements'
        ? 'achievements'
        : `category-${route.categoryId}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [routeKey]);

  useLayoutEffect(() => {
    // 首页与分类页锁定为一屏，避免页面滚动带来的抖动；成就墙保留正常滚动。
    const lockPage = route.page !== 'achievements';
    document.body.classList.toggle('no-page-scroll', lockPage);
    return () => document.body.classList.remove('no-page-scroll');
  }, [route.page]);

  useEffect(() => {
    // 指针点击后隐藏 focus-visible 蓝框；键盘操作时恢复可见焦点。
    const root = document.documentElement;
    const markPointer = () => root.classList.add('pointer-input');
    const markKeyboard = () => root.classList.remove('pointer-input');
    window.addEventListener('pointerdown', markPointer, true);
    window.addEventListener('keydown', markKeyboard, true);
    return () => {
      window.removeEventListener('pointerdown', markPointer, true);
      window.removeEventListener('keydown', markKeyboard, true);
      root.classList.remove('pointer-input');
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="app-main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={routeKey}
            className="page-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            {route.page === 'home' ? (
              <HomePage />
            ) : route.page === 'achievements' ? (
              <AchievementsPage />
            ) : (
              <TrainingPage categoryId={route.categoryId} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      {route.page !== 'category' && <SiteFooter />}
      <UnlockToasts />
    </MotionConfig>
  );
}

export default App;
