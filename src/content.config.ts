import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Per-app privacy policies. Add one by dropping a Markdown file in
// src/content/privacy/<slug>.md — it auto-builds at /codeworks/privacy/<slug>/
// and auto-lists on the privacy index. The filename is the URL slug.
const privacy = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/privacy' }),
  schema: z.object({
    // App display name, e.g. "Indigo Blast".
    app: z.string(),
    // Date the policy last changed; shown on the page and drives sort order.
    lastUpdated: z.date(),
    // One-line summary used for the hero intro and the page meta description.
    summary: z.string(),
    // Optional public link for the app (store listing, site, or repo).
    appHref: z.string().url().optional(),
    // Optional per-app support address; defaults to contact.supportEmail.
    supportEmail: z.string().email().optional(),
  }),
});

export const collections = { privacy };
