import type { VentureEntry } from './schema';

export const ventures: VentureEntry[] = [
  {
    slug: 'codeworks',
    name: 'timetoady Codeworks',
    eyebrow: 'Developer presence',
    headline: 'The developer behind the apps, plus the support and privacy pages that back them.',
    summary:
      'Codeworks is the software side of timetoady. It tells you who built the app on your phone, where to get help, and where the privacy policy lives — straight from the developer, no support-ticket maze.',
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
    headline: 'Original, lyric-led songs — written here, released to streaming and YouTube.',
    summary:
      'Songworks is the music side of the studio: original lyrics, AI-assisted composition, careful mastering, and releases out to Spotify, iHeartRadio, and YouTube. Words first, then the music to carry them.',
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
