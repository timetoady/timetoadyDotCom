import type { LinkItem } from './schema';

export const siteConfig = {
  name: 'timetoady',
  domain: 'https://timetoady.com',
  title: 'timetoady | Codeworks and Songworks',
  description:
    'timetoady is the solo studio of Adam Andreason — a software engineer building Android apps, games, and AI tooling under Codeworks, with original music under Songworks.',
  tagline: 'Independent software and songcraft from a solo studio.',
} as const;

export const navItems: LinkItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Codeworks', href: '/codeworks/' },
  { label: 'Songworks', href: '/songworks/' },
  { label: 'Support', href: '/codeworks/support/' },
];

// homeHighlights renders in the "What you can count on" panel on the home page.
export const homeHighlights = [
  'One studio behind both the apps and the songs — not a faceless publisher account.',
  'Every app gets a real support page and a privacy policy you can actually find.',
  'A working developer reads the inbox and answers it.',
] as const;

export function toAbsoluteUrl(pathname: string) {
  return new URL(pathname, siteConfig.domain).toString();
}
