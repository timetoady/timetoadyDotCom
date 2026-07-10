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
      'Support for timetoady Codeworks Android apps, including RomajiOverlay — an accessibility overlay that adds romaji to Japanese text. RomajiOverlay runs fully on-device and collects no personal data. Whichever app sent you here, this is where to reach the developer and find the privacy policy that applies.',
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
    ],
    supportNotes: [
      'Include the app name and, if you have it, the Play Store listing name.',
      'Add your device model and Android version.',
      'Screenshots or reproduction steps help if the issue is visual.',
    ],
  },
];

export function getAppBySlug(slug: string) {
  return apps.find((app) => app.slug === slug);
}
