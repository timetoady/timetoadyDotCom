import type { LinkItem } from './schema';

export const siteConfig = {
  name: 'timetoady',
  domain: 'https://timetoady.com',
  title: 'timetoady | Codeworks and Songworks',
  description:
    'timetoady is the solo studio of front-end developer Adam Andreason: Android apps and games under Codeworks, original music under Songworks, with real support and privacy pages behind every release.',
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

// homeHighlights renders in the "What you can count on" panel on the home page.
export const homeHighlights = [
  'One studio behind both the apps and the songs — not a faceless publisher account.',
  'Every app gets a real support page and a privacy policy you can actually find.',
  'A working developer reads the inbox and answers it.',
] as const;

// NOTE: trustSignals is not yet rendered by any page — wire in or delete.
export const trustSignals = [
  'Built and maintained by a professional front-end developer.',
  'Support and privacy pages live at stable, linkable URLs for Play Store listings.',
  'Software and music stay on separate tracks, under one honest name.',
] as const;

export function toAbsoluteUrl(pathname: string) {
  return new URL(pathname, siteConfig.domain).toString();
}
