import { contact } from './contact';
import type { AppEntry } from './schema';

export const apps: AppEntry[] = [
  {
    slug: 'android-apps',
    name: 'timetoady Android Apps',
    status: 'Support hub',
    shortDescription:
      'Support and privacy for RomajiOverlay and any other timetoady Codeworks Android apps.',
    longDescription:
      'This is the support landing point for timetoady Codeworks Android apps, including RomajiOverlay — an accessibility overlay that adds romaji to Japanese text. Whichever app sent you here, this is where to reach the developer for help and find the privacy policy that applies. RomajiOverlay runs fully on-device and collects no personal data.',
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
          'The privacy policy is published at /codeworks/privacy/ and is linked from each app listing. RomajiOverlay processes text on-device only and stores no personal data.',
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
