import type { LinkItem } from './schema';

export const siteConfig = {
  name: 'timetoady',
  domain: 'https://timetoady.com',
  title: 'timetoady | Codeworks and Songworks',
  description:
    'Independent software and song creation from timetoady, including Play Store-facing developer support pages and a growing music release project.',
  tagline: 'Independent software and songcraft from a solo studio.',
} as const;

export const navItems: LinkItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Codeworks', href: '/codeworks/' },
  { label: 'Apps', href: '/codeworks/apps/' },
  { label: 'Support', href: '/codeworks/support/' },
  { label: 'Privacy', href: '/codeworks/privacy/' },
  { label: 'Songworks', href: '/songworks/' },
];

export const homeHighlights = [
  'Static-first launch built for Bluehost shared hosting.',
  'Support, identity, and privacy pages designed for Play Store linking.',
  'Structured data layer that can later move into Supabase without changing the site shape.',
] as const;

export const trustSignals = [
  'Solo studio with separate code and music venture tracks.',
  'Public-facing support and policy pages available as stable HTML routes.',
  'Current assets optimized at build time through Astro image handling.',
] as const;

export function toAbsoluteUrl(pathname: string) {
  return new URL(pathname, siteConfig.domain).toString();
}
