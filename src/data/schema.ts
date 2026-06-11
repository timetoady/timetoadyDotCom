export type ThemeName = 'default' | 'codeworks' | 'songworks';

export interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface VentureEntry {
  slug: 'codeworks' | 'songworks';
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  href: string;
  accent: ThemeName;
  bullets: string[];
  ctaLabel: string;
}

export interface AppEntry {
  slug: string;
  name: string;
  status: string;
  shortDescription: string;
  longDescription: string;
  playStoreUrl: string | null;
  supportEmail: string;
  privacyPolicyUrl: string;
  supportPath: string;
  platforms: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  supportNotes: string[];
}

export interface ProjectEntry {
  name: string;
  category: string;
  description: string;
  tech: string[];
  href: string;
  hrefLabel: string;
  accent?: ThemeName;
}

export interface SongworksChannel {
  name: string;
  href: string;
  description: string;
}

export interface SongworksProcessStep {
  title: string;
  description: string;
}

export interface SongworksFeaturedMedia {
  title: string;
  youtubeId: string;
  summary: string;
  publishedOn: string;
  fallbackUrl: string;
}
