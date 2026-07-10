import type { VentureEntry } from './schema';

export const ventures: VentureEntry[] = [
  {
    slug: 'codeworks',
    name: 'timetoady Codeworks',
    eyebrow: 'Developer presence',
    headline: 'The developer behind the apps, plus the support and privacy pages that back them.',
    summary:
      'Codeworks is the software side of timetoady. It tells you who built the app on your phone, where to get help, and where the privacy policy lives — straight from the developer.',
    href: '/codeworks/',
    accent: 'codeworks',
    bullets: [
      'Developer identity for Play Store visitors',
      'A page for each app, with support and privacy links',
      'Email-first support',
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
      'Original lyrics on every track',
      'Channel links for listeners and collaborators',
      'New singles as they land',
    ],
    ctaLabel: 'Visit Songworks',
  },
];
