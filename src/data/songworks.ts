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
    description: 'Distribute out to Spotify, iHeartRadio, and the other streaming platforms, then anchor each release with a YouTube video.',
  },
];

export const songworksChannels: SongworksChannel[] = [
  {
    name: 'YouTube',
    href: contact.youtubeChannelUrl,
    description: 'The primary public channel — videos and listening links, with new releases as they land.',
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/3GJseKRcXOYA9EFTcDcEXt',
    description: 'Stream the releases on Spotify, and follow the artist to catch the next one.',
  },
  {
    name: 'iHeartRadio',
    href: 'https://www.iheart.com/artist/timetoady-50145098/',
    description: 'Listen to the catalog on iHeartRadio.',
  },
];

export const songworksFeaturedMedia: SongworksFeaturedMedia = {
  title: 'Our Fortress',
  youtubeId: 'ybot7wbZ5xk',
  summary:
    'The latest release — press play, then follow wherever you listen for what comes next.',
  publishedOn: 'March 25, 2026',
  fallbackUrl: 'https://www.youtube.com/watch?v=ybot7wbZ5xk',
};
