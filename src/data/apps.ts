import { contact } from './contact';
import type { AppEntry } from './schema';

export const apps: AppEntry[] = [
  {
    slug: 'android-apps',
    name: 'timetoady Android Apps',
    status: 'Support hub',
    shortDescription:
      'Umbrella support and privacy entry for current and upcoming Android apps published under timetoady Codeworks.',
    longDescription:
      'This is the shared support landing point for timetoady Codeworks Android apps. Whichever app sent you here, this is where to reach the developer for help and find the privacy policy that applies. As more apps go live, each one gets its own page.',
    playStoreUrl: null,
    supportEmail: contact.supportEmail,
    privacyPolicyUrl: '/codeworks/privacy/',
    supportPath: '/codeworks/support/',
    platforms: ['Google Play', 'Android'],
    faq: [
      {
        question: 'Where should I ask for help?',
        answer:
          'Use the support email listed on this page and include the app name, device model, Android version, and a short description of the issue.',
      },
      {
        question: 'Where can I find the privacy policy?',
        answer:
          'The main privacy policy for timetoady Codeworks is published at the site-level privacy page and should be linked from all relevant app listings.',
      },
      {
        question: 'Will future apps get dedicated pages?',
        answer:
          'Yes. This route is the shared support entry point for launch, and dedicated app pages can be added as new Play Store releases go live.',
      },
    ],
    supportNotes: [
      'Support requests should include the app name or listing name if available.',
      'Feature requests and bug reports are both accepted through the same support channel.',
      'Response times may vary around release periods, but email remains the primary contact method.',
    ],
  },
];

export function getAppBySlug(slug: string) {
  return apps.find((app) => app.slug === slug);
}
