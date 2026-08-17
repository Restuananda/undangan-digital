import type { Guest } from '../types/wedding';

/**
 * Guest URLs look like /undangan/budi-santoso
 * The slug is read straight from the pathname so the app works
 * as a static export with no server-side routing required.
 */
export function getSlugFromPath(pathname: string = window.location.pathname): string | null {
  const match = pathname.match(/\/undangan\/([^/]+)/i);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]).toLowerCase();
  } catch {
    return match[1].toLowerCase();
  }
}

export async function resolveGuest(slug: string | null): Promise<Guest | null> {
  if (!slug) return null;
  try {
    const res = await fetch('/guests.json');
    if (!res.ok) return null;
    const guests: Guest[] = await res.json();
    return guests.find((g) => g.slug.toLowerCase() === slug) ?? null;
  } catch {
    return null;
  }
}

export const DEFAULT_GUEST_LABEL = 'Guest';
