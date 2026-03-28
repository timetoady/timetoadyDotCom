import { expect, test } from '@playwright/test';

const routes = [
  { path: '/', heading: /Apps and songs, one independent studio/i },
  { path: '/codeworks/', heading: /Developer identity, support routes/i },
  { path: '/codeworks/apps/', heading: /Practical support entries/i },
  { path: '/codeworks/apps/android-apps/', heading: /timetoady Android Apps/i },
  { path: '/codeworks/support/', heading: /Email-first support/i },
  { path: '/codeworks/privacy/', heading: /Privacy information for timetoady Codeworks/i },
  { path: '/songworks/', heading: /A release practice built from lyrics to finished distribution/i },
];

test('core routes render expected page headings', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(route.heading);
  }
});

test('homepage exposes primary navigation and venture links', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('timetoady').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore Codeworks' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Visit Songworks' }).first()).toBeVisible();
});

test('android app support page exposes support and privacy actions', async ({ page }) => {
  await page.goto('/codeworks/apps/android-apps/');

  await expect(page.getByRole('link', { name: 'Email support' })).toHaveAttribute(
    'href',
    'mailto:support@timetoady.com',
  );
  await expect(page.getByRole('link', { name: 'Privacy policy' }).first()).toHaveAttribute(
    'href',
    '/codeworks/privacy/',
  );
  await expect(page.getByText(/Link will be added when a public listing is live/i)).toBeVisible();
});

test('privacy page exposes jump links for document sections', async ({ page }) => {
  await page.goto('/codeworks/privacy/');

  await expect(page.getByRole('link', { name: 'Website data handling' })).toHaveAttribute(
    'href',
    '#website-data',
  );
  await expect(page.getByRole('link', { name: 'Support communications' })).toHaveAttribute(
    'href',
    '#support-communications',
  );
});

test('songworks exposes a privacy-enhanced featured youtube embed', async ({ page }) => {
  await page.goto('/songworks/');

  const featuredFrame = page.locator('iframe[title*="timetoady"]').first();
  await expect(featuredFrame).toBeVisible();
  await expect(featuredFrame).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/ybot7wbZ5xk/);
});

test('theme toggle persists the selected theme', async ({ page }) => {
  await page.goto('/');

  const menuButton = page.getByRole('button', { name: /navigation menu/i });
  if (await menuButton.isVisible()) {
    await menuButton.click();
  }

  const initialTheme = await page.evaluate(() => document.documentElement.dataset.theme ?? null);
  await page.getByRole('button', { name: /Toggle theme/i }).first().click();

  const toggledTheme = await page.evaluate(() => document.documentElement.dataset.theme ?? null);
  expect(toggledTheme).toBeTruthy();
  expect(toggledTheme).not.toBe(initialTheme);
  expect(await page.evaluate(() => localStorage.getItem('timetoady-theme'))).toBe(toggledTheme);

  await page.reload();
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset.theme ?? null))
    .toBe(toggledTheme);
});

test('mobile navigation collapses into a menu button', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'));

  await page.goto('/');

  const menuButton = page.getByRole('button', { name: /navigation menu/i });
  await expect(menuButton).toBeVisible();

  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('[data-mobile-menu] a', { hasText: 'Codeworks' })).toBeVisible();
  await expect(page.locator('[data-mobile-menu] a', { hasText: 'Songworks' })).toBeVisible();
});
