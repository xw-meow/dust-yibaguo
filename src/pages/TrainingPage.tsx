import { useCallback, useState } from 'react';
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { categoryMap } from '../data/index';
import { categoryVisuals } from '../data/theme';
import type { CategoryId } from '../data/types';
import { useProgress } from '../store/progress';
import { navigateHome } from '../lib/router';
import { LearnView } from '../components/LearnView';
import { ChallengeView } from '../components/ChallengeView';
import { AchievementsView } from '../components/AchievementsView';
import { CategoryGlyph, IconArrowLeft, IconBolt, IconBookOpen, IconTrophy } from '../components/Icons';

type TrainingView = 'learn' | 'challenge' | 'achievements';

const TABS = [
  { id: 'learn', label: '学习模式', Icon: IconBookOpen },
  { id: 'challenge', label: '挑战模式', Icon: IconBolt },
  { id: 'achievements', label: '成就', Icon: IconTrophy },
] as const;

interface TrainingPageProps {
  categoryId: CategoryId;
}

export function TrainingPage({ categoryId }: TrainingPageProps) {
  const [view, setView] = useState<TrainingView>('learn');
  const [visited, setVisited] = useState<Record<TrainingView, boolean>>({
    learn: true,
    challenge: false,
    achievements: false,
  });
  const progress = useProgress();
  const category = categoryMap[categoryId];
  const stats = progress.categories[categoryId];
  const visuals = categoryVisuals[categoryId];
  const themeStyle = {
    '--cat-accent': visuals.accent,
    '--cat-tint': visuals.tint,
    '--cat-deep': visuals.deep,
  } as CSSProperties;

  const selectView = useCallback((next: TrainingView) => {
    setView(next);
    setVisited((previous) =>
      previous[next] ? previous : { ...previous, [next]: true },
    );
  }, []);

  function handleTabKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, current: TrainingView) {
    const currentIndex = TABS.findIndex((tab) => tab.id === current);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % TABS.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = TABS.length - 1;
    else return;

    event.preventDefault();
    const next = TABS[nextIndex];
    selectView(next.id);
    window.requestAnimationFrame(() => {
      document.getElementById(`tab-${next.id}`)?.focus();
    });
  }

  return (
    <div className="training" style={themeStyle}>
      <header className="training-head">
        <button
          type="button"
          className="training-back"
          onClick={navigateHome}
          aria-label="返回首页"
        >
          <IconArrowLeft size={18} />
        </button>
        <h1>{category.name}</h1>
        <span className="training-glyph" aria-hidden="true">
          <CategoryGlyph categoryId={category.id} size={20} />
        </span>
      </header>

      <div className="mode-tabs" role="tablist" aria-label="切换学习内容">
        {TABS.map((tab) => {
          const Icon = tab.Icon;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              className="mode-tab"
              aria-selected={view === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={view === tab.id ? 0 : -1}
              onClick={() => selectView(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div id="training-panels" className="training-panels">
        <div
          id="panel-learn"
          role="tabpanel"
          aria-labelledby="tab-learn"
          className="training-panel"
          hidden={view !== 'learn'}
        >
          {visited.learn && (
            <LearnView category={category} stats={stats} active={view === 'learn'} />
          )}
        </div>

        <div
          id="panel-challenge"
          role="tabpanel"
          aria-labelledby="tab-challenge"
          className="training-panel"
          hidden={view !== 'challenge'}
        >
          {visited.challenge && (
            <ChallengeView category={category} active={view === 'challenge'} />
          )}
        </div>

        <div
          id="panel-achievements"
          role="tabpanel"
          aria-labelledby="tab-achievements"
          className="training-panel"
          hidden={view !== 'achievements'}
        >
          {visited.achievements && <AchievementsView category={category} stats={stats} />}
        </div>
      </div>
    </div>
  );
}
