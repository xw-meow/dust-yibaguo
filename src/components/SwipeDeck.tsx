import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { PanInfo, Variants } from 'motion/react';
import { clamp } from '../lib/utils';

const SWIPE_DISTANCE = 64;
const SWIPE_VELOCITY = 420;

const cardVariants: Variants = {
  enter: (direction: number) => ({ x: direction * 54, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.22, ease: 'easeOut' },
  },
  exit: (direction: number) => ({
    x: direction * -44,
    opacity: 0,
    transition: { duration: 0.14, ease: 'easeOut' },
  }),
};

interface SwipeDeckProps {
  /** 当前卡片的稳定标识，变化时触发切卡动画 */
  currentKey: string;
  index: number;
  total: number;
  onNavigate: (nextIndex: number) => void;
  label: string;
  /** 非激活的隐藏 tab 里不响应键盘 */
  active?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}

/** 左右滑动的一屏一张卡片容器；手机左右滑动、键盘方向键切卡。 */
export function SwipeDeck({
  currentKey,
  index,
  total,
  onNavigate,
  label,
  active = true,
  children,
  footer,
}: SwipeDeckProps) {
  const [direction, setDirection] = useState(1);
  const draggedRef = useRef(false);

  const go = useCallback(
    (delta: number) => {
      const next = clamp(index + delta, 0, total - 1);
      if (next === index) return;
      setDirection(delta);
      onNavigate(next);
    },
    [index, onNavigate, total],
  );

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      event.preventDefault();
      go(event.key === 'ArrowRight' ? 1 : -1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, go]);

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const distance = info.offset.x;
    const velocity = info.velocity.x;
    if (distance < -SWIPE_DISTANCE || velocity < -SWIPE_VELOCITY) {
      go(1);
    } else if (distance > SWIPE_DISTANCE || velocity > SWIPE_VELOCITY) {
      go(-1);
    }
    window.setTimeout(() => {
      draggedRef.current = false;
    }, 80);
  }

  return (
    <div className="deck" role="group" aria-roledescription="卡片轮播" aria-label={label}>
      <div className="deck__stage">
        <div className="deck__card-area">
          <div className="deck__ghost deck__ghost--2" aria-hidden="true" />
          <div className="deck__ghost deck__ghost--1" aria-hidden="true" />

          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentKey}
              className="deck__card"
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              dragDirectionLock
              onDragStart={() => {
                draggedRef.current = true;
              }}
              onDragEnd={handleDragEnd}
              onClickCapture={(event) => {
                if (draggedRef.current) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {footer}

      <p className="sr-only" aria-live="polite">
        第 {index + 1} 张，共 {total} 张
      </p>
    </div>
  );
}
