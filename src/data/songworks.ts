import { contact } from './contact';
import type { SongworksChannel, SongworksFeaturedMedia, SongworksProcessStep } from './schema';

export const songworksSummary = {
  title: 'timetoady Songworks',
  summary:
    'A songwriting and release practice built around original lyrics, AI-assisted composition, mastering, and consistent public publishing.',
  description:
    'Songworks turns a lyric into a finished release through one repeatable solo workflow — write, compose, master, publish. Here is what the project is, how the songs get made, and where to follow along.',
};

export const songworksProcess: SongworksProcessStep[] = [
  {
    title: 'Write',
    description: 'Develop original lyrics and shape the emotional or narrative direction of the song.',
  },
  {
    title: 'Compose',
    description: 'Use Suno to turn the lyric and style direction into a working song draft.',
  },
  {
    title: 'Master',
    description: 'Polish the audio for a cleaner final release and more consistent playback across platforms.',
  },
  {
    title: 'Release',
    description: 'Publish through DistroKid and pair the release with YouTube presence for discoverability.',
  },
];

export const songworksChannels: SongworksChannel[] = [
  {
    name: 'YouTube channel',
    href: contact.youtubeChannelUrl,
    description: 'Primary public channel for videos and listening links.',
  },
  {
    name: 'DistroKid distribution',
    href: 'https://distrokid.com/',
    description: 'Distribution partner used to move finished releases onto streaming platforms.',
  },
  {
    name: 'Future release catalog',
    href: '/songworks/',
    description: 'This site will eventually grow into a home base for release pages and listening paths.',
  },
];

export const songworksFeaturedMedia: SongworksFeaturedMedia = {
  title: 'Our Fortress',
  youtubeId: 'ybot7wbZ5xk',
  summary:
    'Featured from the timetoady YouTube channel as the current public listening anchor for Songworks.',
  publishedOn: 'March 25, 2026',
  fallbackUrl: 'https://www.youtube.com/watch?v=ybot7wbZ5xk',
};
