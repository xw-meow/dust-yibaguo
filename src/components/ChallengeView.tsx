import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { categoryVisuals } from '../data/theme';
import type { Category, ChallengeQuestion } from '../data/types';
import { recordChallenge } from '../store/progress';
import { CHALLENGE_LENGTH, LETTERS, sample } from '../lib/utils';
import { CardContent } from './CardContent';
import { SwipeDeck } from './SwipeDeck';
import {
  IconCheckCircle,
  IconCrown,
  IconFlag,
  IconPlay,
  IconRefresh,
  IconTrophy,
  IconXCircle,
} from './Icons';

interface AnswerRecord {
  choice: number;
  correct: boolean;
}

interface ChallengeViewProps {
  category: Category;
  active: boolean;
}

function longestStreak(records: AnswerRecord[]): number {
  let best = 0;
  let current = 0;
  records.forEach((record) => {
    if (record.correct) {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 0;
    }
  });
  return best;
}

type ResultTier = 'perfect' | 'great' | 'pass' | 'retry';

interface ResultCopy {
  label: string;
  headline: string;
  subline: string;
  icon: ReactNode;
}

const RESULT_COPY: Record<ResultTier, ResultCopy> = {
  perfect: {
    label: '满分车神',
    headline: '十题全对，建议直接出道。',
    subline: '教练看了沉默，题库看了流泪。',
    icon: <IconCrown size={14} />,
  },
  great: {
    label: '准车神',
    headline: '离封神只差一个路口。',
    subline: '手感在线，下一轮把那两题也收了。',
    icon: <IconTrophy size={14} />,
  },
  pass: {
    label: '压线车手',
    headline: '过线了，但先别飘。',
    subline: '错题回炉一下，下一轮把分数拉满。',
    icon: <IconFlag size={14} />,
  },
  retry: {
    label: '回炉选手',
    headline: '翻车不丢人，怕的是不补课。',
    subline: '回卡片补两个盲区，下一轮直接翻盘。',
    icon: <IconRefresh size={14} />,
  },
};

function resultTierFor(score: number, total: number): ResultTier {
  const ratio = total > 0 ? score / total : 0;
  if (ratio === 1) return 'perfect';
  if (ratio >= 0.8) return 'great';
  if (ratio >= 0.6) return 'pass';
  return 'retry';
}

export function ChallengeView({ category, active }: ChallengeViewProps) {
  const [phase, setPhase] = useState<'idle' | 'playing'>('idle');
  const [deck, setDeck] = useState<ChallengeQuestion[]>([]);
  const [viewIndex, setViewIndex] = useState(0);
  const [records, setRecords] = useState<Record<string, AnswerRecord>>({});
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const [confirmAbandon, setConfirmAbandon] = useState(false);

  const recordedRef = useRef(false);
  const revealScrollRef = useRef<HTMLDivElement>(null);
  const firstOptionRef = useRef<HTMLButtonElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const focusFirstRef = useRef(false);

  const visuals = categoryVisuals[category.id];
  const cardMap = new Map(category.cards.map((card) => [card.id, card]));
  const question = deck[viewIndex];
  const record = question ? records[question.id] : undefined;
  const original = question ? (cardMap.get(question.cardId) ?? category.cards[0]) : null;
  const onResult = done && viewIndex >= deck.length;
  const totalCards = deck.length + (done ? 1 : 0);

  const answeredCount = deck.reduce((total, item) => total + (records[item.id] ? 1 : 0), 0);
  const score = deck.reduce((total, item) => total + (records[item.id]?.correct ? 1 : 0), 0);
  const accuracy = deck.length > 0 ? Math.round((score / deck.length) * 100) : 0;
  const tier = resultTierFor(score, deck.length);
  const copy = RESULT_COPY[tier];

  useEffect(() => {
    if (
      recordedRef.current ||
      phase !== 'playing' ||
      deck.length === 0 ||
      answeredCount < deck.length
    ) {
      return;
    }
    recordedRef.current = true;
    const ordered = deck
      .map((item) => records[item.id])
      .filter((item): item is AnswerRecord => Boolean(item));
    recordChallenge(category.id, {
      score: ordered.filter((item) => item.correct).length,
      maxStreak: longestStreak(ordered),
      answers: deck.map((item) => ({
        cardId: item.cardId,
        correct: records[item.id]?.correct ?? false,
      })),
    });
    setDone(true);
  }, [answeredCount, category.id, deck, phase, records]);

  const answer = useCallback(
    (current: ChallengeQuestion, choice: number) => {
      if (records[current.id]) return;
      setRecords((previous) => ({
        ...previous,
        [current.id]: { choice, correct: choice === current.answer },
      }));
      setFlipped(true);
      window.setTimeout(() => revealScrollRef.current?.focus(), 80);
    },
    [records],
  );

  useEffect(() => {
    if (!active || phase !== 'playing') return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (!/^[1-4]$/.test(event.key)) return;
      const current = deck[viewIndex];
      if (!current || records[current.id]) return;
      event.preventDefault();
      answer(current, Number(event.key) - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, answer, deck, viewIndex, phase, records]);

  useEffect(() => {
    if (phase === 'playing' && focusFirstRef.current) {
      focusFirstRef.current = false;
      window.requestAnimationFrame(() => firstOptionRef.current?.focus());
    }
  }, [phase, deck]);

  useEffect(() => {
    if (!onResult || !active) return;
    document.body.classList.add('challenge-result-open');
    return () => {
      document.body.classList.remove('challenge-result-open');
    };
  }, [active, onResult]);

  function goTo(nextIndex: number) {
    const nextQuestion = deck[nextIndex];
    setViewIndex(nextIndex);
    setFlipped(Boolean(nextQuestion && records[nextQuestion.id]));
  }

  function startRound(shouldFocusFirst = false) {
    recordedRef.current = false;
    focusFirstRef.current = shouldFocusFirst;
    setDeck(sample(category.questions, CHALLENGE_LENGTH));
    setViewIndex(0);
    setRecords({});
    setFlipped(false);
    setDone(false);
    setConfirmAbandon(false);
    setPhase('playing');
  }

  function abandonRound() {
    setPhase('idle');
    setDeck([]);
    setRecords({});
    setFlipped(false);
    setDone(false);
    setConfirmAbandon(false);
    window.requestAnimationFrame(() => startButtonRef.current?.focus());
  }

  if (phase === 'idle') {
    return (
      <div className="challenge-panel">
        <div className="challenge-start">
          <span className="challenge-start__watermark" aria-hidden="true">
            {visuals.watermark}
          </span>
          <span className="challenge-start__eyebrow">{CHALLENGE_LENGTH} 题一轮 · 随机抽题</span>
          <button
            ref={startButtonRef}
            type="button"
            className="challenge-start__btn"
            onClick={(event) => startRound(event.detail === 0)}
          >
            <IconPlay size={17} />
            开始挑战
          </button>
        </div>
      </div>
    );
  }

  if (!onResult && (!question || !original)) {
    return <p className="challenge-empty">题库准备中，请稍后再来。</p>;
  }

  const resultCorrect = record?.correct ?? false;

  return (
    <div className="challenge-panel">
      <p className="sr-only" aria-live="polite">
        {onResult
          ? `本轮完成，得分 ${score} / ${deck.length}，正确率 ${accuracy}%。`
          : record
            ? `${resultCorrect ? '回答正确' : '回答错误'}，正确答案是 ${LETTERS[question!.answer]}。已翻面展示原卡，点按卡片可翻回选项。`
            : ''}
      </p>

      <SwipeDeck
        currentKey={onResult ? `${category.id}-result` : question!.id}
        index={viewIndex}
        total={totalCards}
        onNavigate={goTo}
        label={`${category.name}挑战，共 ${totalCards} 张卡片`}
        active={active}
        footer={
          <div className="challenge-meta">
            <div className="challenge-dots" aria-hidden="true">
              {deck.map((item, dotIndex) => {
                const answered = Boolean(records[item.id]);
                const state =
                  dotIndex === viewIndex
                    ? answered
                      ? 'current-answered'
                      : 'current'
                    : answered
                      ? 'answered'
                      : 'idle';
                return <span key={item.id} className="challenge-dot" data-state={state} />;
              })}
              {done && (
                <span
                  className="challenge-dot challenge-dot--result"
                  data-state={onResult ? 'current' : 'idle'}
                />
              )}
            </div>

            {onResult ? null : done ? (
              <button
                type="button"
                className="challenge-result-link"
                onClick={() => goTo(deck.length)}
              >
                查看成绩
              </button>
            ) : confirmAbandon ? (
              <span className="challenge-abandon__confirm" role="group" aria-label="确认放弃本轮">
                <span>放弃本轮？</span>
                <button type="button" className="challenge-abandon__yes" onClick={abandonRound}>
                  确认放弃
                </button>
                <button
                  type="button"
                  className="challenge-abandon__no"
                  onClick={() => setConfirmAbandon(false)}
                >
                  继续答题
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="challenge-abandon"
                onClick={() => setConfirmAbandon(true)}
              >
                放弃本次
              </button>
            )}
          </div>
        }
      >
        {onResult ? (
          <div className="challenge-result" data-tier={tier} role="group" aria-label="本轮挑战成绩">
            <div className="result-deco" aria-hidden="true">
              <span className="result-blob result-blob--1" />
              <span className="result-blob result-blob--2" />
              <span className="result-spark result-spark--1" />
              <span className="result-spark result-spark--2" />
              <span className="result-spark result-spark--3" />
              <span className="result-confetti">
                {Array.from({ length: 9 }, (_, index) => (
                  <i key={index} />
                ))}
              </span>
            </div>

            <span className="challenge-result__badge">
              {copy.icon}
              {copy.label}
            </span>

            <div className="challenge-result__orb">
              <span className="challenge-result__ring" aria-hidden="true" />
              <span className="challenge-result__score">
                {score}
                <em> / {deck.length}</em>
              </span>
            </div>

            <p className="challenge-result__accuracy">正确率 {accuracy}%</p>
            <h2 className="challenge-result__headline">{copy.headline}</h2>
            <p className="challenge-result__subline">{copy.subline}</p>

            <button
              type="button"
              className="challenge-result__again"
              onClick={(event) => startRound(event.detail === 0)}
            >
              <IconRefresh size={16} />
              再来一次
            </button>
            <p className="challenge-result__hint">右滑回看最后一题</p>
          </div>
        ) : (
          <div
            className="flip-card"
            data-flipped={flipped}
            onClick={(event) => {
              if (!record) return;
              if ((event.target as HTMLElement).closest('button, a')) return;
              setFlipped((value) => !value);
            }}
          >
            <div className="flip-card__inner">
              <div
                className="flip-face flip-face--front card-surface"
                aria-hidden={flipped ? true : undefined}
                inert={flipped ? true : undefined}
              >
                <header className="challenge-card__head">
                  <span className="challenge-card__kind">单选题</span>
                  <span className="challenge-card__no">
                    第 {viewIndex + 1} / {deck.length} 题
                  </span>
                </header>

                <div
                  className="challenge-card__scroll"
                  tabIndex={0}
                  aria-label="题目与选项，可上下滚动"
                >
                  <h2 id={`challenge-stem-${question!.id}`} className="challenge-card__stem">
                    {question!.stem}
                  </h2>

                  <div
                    className="challenge-options"
                    role="group"
                    aria-labelledby={`challenge-stem-${question!.id}`}
                  >
                    {question!.options.map((option, optionIndex) => {
                      const picked = record?.choice === optionIndex;
                      const pickedCorrect = picked && record?.correct === true;
                      const showAnswer =
                        Boolean(record) &&
                        record?.correct === false &&
                        optionIndex === question!.answer;
                      const tag = picked
                        ? pickedCorrect
                          ? '你选的 · 正确'
                          : '你选的'
                        : showAnswer
                          ? '正确答案'
                          : null;

                      return (
                        <button
                          key={option}
                          ref={optionIndex === 0 ? firstOptionRef : undefined}
                          type="button"
                          className="challenge-option"
                          data-picked={picked ? (pickedCorrect ? 'correct' : 'wrong') : undefined}
                          data-answer={showAnswer ? 'true' : undefined}
                          aria-disabled={record ? true : undefined}
                          tabIndex={record ? -1 : undefined}
                          onClick={() => {
                            if (record) {
                              setFlipped(true);
                              return;
                            }
                            answer(question!, optionIndex);
                          }}
                        >
                          <span className="challenge-option__letter">{LETTERS[optionIndex]}</span>
                          <span className="challenge-option__text">{option}</span>
                          {tag && (
                            <span
                              className="challenge-option__tag"
                              data-kind={picked ? 'picked' : 'answer'}
                            >
                              {tag}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <footer className="challenge-card__foot">
                  <span>{record ? `你选了 ${LETTERS[record.choice]}` : '4 选 1'}</span>
                  {record ? (
                    <button
                      type="button"
                      className="challenge-card__flip"
                      onClick={() => setFlipped(true)}
                    >
                      看原卡
                    </button>
                  ) : (
                    <span>答完翻面看原卡</span>
                  )}
                </footer>
              </div>

              <div
                className="flip-face flip-face--back card-surface"
                data-result={resultCorrect ? 'correct' : 'wrong'}
                aria-hidden={flipped ? undefined : true}
                inert={flipped ? undefined : true}
              >
                <span
                  className="result-mark"
                  data-result={resultCorrect ? 'correct' : 'wrong'}
                  aria-hidden="true"
                >
                  {resultCorrect ? <IconCheckCircle size={230} /> : <IconXCircle size={230} />}
                </span>

                <header className="reveal-card__head">
                  <span className="reveal-badge" data-correct={resultCorrect}>
                    {resultCorrect ? (
                      <>
                        <IconCheckCircle size={15} />
                        回答正确
                      </>
                    ) : (
                      <>
                        <IconXCircle size={15} />
                        回答错误
                      </>
                    )}
                  </span>
                  <span className="reveal-card__tag">原卡 · {original!.group}</span>
                </header>

                <h2 className="reveal-card__title">{original!.title}</h2>

                <div
                  ref={revealScrollRef}
                  className="reveal-card__scroll"
                  tabIndex={0}
                  aria-label="原卡正文，可上下滚动"
                >
                  <CardContent card={original!} />
                </div>

                <footer className="reveal-card__foot">
                  <span>
                    正确答案 {LETTERS[question!.answer]}
                    {record && !record.correct && ` · 你选了 ${LETTERS[record.choice]}`}
                  </span>
                  <button
                    type="button"
                    className="reveal-card__flip"
                    onClick={() => setFlipped(false)}
                  >
                    看选项
                  </button>
                </footer>
              </div>
            </div>
          </div>
        )}
      </SwipeDeck>
    </div>
  );
}
