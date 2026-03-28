import type { VentureEntry } from './schema';

export const ventures: VentureEntry[] = [
  {
    slug: 'codeworks',
    name: 'timetoady Codeworks',
    eyebrow: 'Developer presence',
    headline: 'App support, studio identity, and stable policy pages.',
    summary:
      'Codeworks is the software-facing side of timetoady. It exists to support current and future Play Store apps with trustworthy support, privacy, and product context.',
    href: '/codeworks/',
    accent: 'codeworks',
    bullets: [
      'Developer identity for Play Store visitors',
      'App portfolio scaffolding with room for future releases',
      'Email-first support and policy coverage',
    ],
    ctaLabel: 'Explore Codeworks',
  },
  {
    slug: 'songworks',
    name: 'timetoady Songworks',
    eyebrow: 'Music venture',
    headline: 'Original lyric-led releases distributed to streaming and YouTube.',
    summary:
      'Songworks is the music branch of the studio, combining original lyrics, AI-assisted composition, mastering, and distribution through DistroKid and YouTube.',
    href: '/songworks/',
    accent: 'songworks',
    bullets: [
      'Clear creative process from lyric writing to release',
      'Channel links for listeners and collaborators',
      'Lightweight launch scope with room for a future catalog',
    ],
    ctaLabel: 'Visit Songworks',
  },
];
