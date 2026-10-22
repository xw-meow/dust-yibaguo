import { useEffect, useState } from 'react';
import type { CategoryId } from '../data/types';

const CATEGORY_IDS = ['deduction', 'fine', 'abbr', 'speed', 'license'] as const;

export type Route =
  | { page: 'home' }
  | { page: 'achievements' }
  | { page: 'category'; categoryId: CategoryId };

export function isCategoryId(value: string): value is CategoryId {
  return (CATEGORY_IDS as readonly string[]).includes(value);
}

export function parseRoute(hash: string = window.location.hash): Route {
  const clean = hash.replace(/^#/, '').replace(/^\/+|\/+$/g, '');
  const segments = clean.split('/').filter(Boolean);
  if (segments[0] === 'achievements') {
    return { page: 'achievements' };
  }
  if (segments[0] === 'c' && segments[1] && isCategoryId(segments[1])) {
    return { page: 'category', categoryId: segments[1] };
  }
  return { page: 'home' };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

export function navigateHome(): void {
  if (window.location.hash === '#/' || window.location.hash === '') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  window.location.hash = '/';
}

export function navigateAchievements(): void {
  window.location.hash = '/achievements';
}

export function navigateCategory(categoryId: CategoryId): void {
  window.location.hash = `/c/${categoryId}`;
}
