import { expect, test } from '@playwright/test';

// Regression coverage for the P0 UX fixes (see docs/working/timetoady-ux-improvements-requirements.md).

test('mobile menu overlays content without shifting the page (U2)', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'));

  await page.goto('/');
  const main = page.locator('#main-content');
  const before = await main.boundingBox();

  await page.getByRole('button', { name: /navigation menu/i }).click();
  await expect(page.locator('[data-mobile-menu]')).toBeVisible();
  await expect(page.locator('[data-mobile-scrim]')).toBeVisible();

  const after = await main.boundingBox();
  // The overlay drawer must not push page content down (was ~347px before the fix).
  expect(Math.abs((after?.y ?? 0) - (before?.y ?? 0))).toBeLessThan(2);
});

test('hero venture chips are hidden at narrow width to avoid overlap (U3)', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'));

  await page.goto('/');
  await expect(page.locator('.hero-tech__chip--left')).toBeHidden();
  await expect(page.locator('.hero-tech__chip--right')).toBeHidden();
});

test('codeworks feature banner stays landscape, never a tall slab (U1)', async ({ page }) => {
  await page.goto('/codeworks/');
  const img = page.locator('.banner-frame--wide img');
  await expect(img).toBeVisible();

  const box = await img.boundingBox();
  const ratio = (box?.width ?? 0) / (box?.height ?? 1);
  // Before the fix the image rendered ~2304px tall (ratio ~0.25). After: it either
  // fills its column on desktop (~1.15–1.4) or holds 16/9 when stacked (~1.79).
  expect(ratio).toBeGreaterThan(0.9);
  expect(box?.height ?? 9999).toBeLessThan(900);
});

test('mobile menu opens in place without scrolling the page (U2 follow-up)', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'));

  // Use a tall page so there is somewhere to scroll.
  await page.goto('/codeworks/');
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 600);
  });
  const before = await page.evaluate(() => window.scrollY);

  await page.getByRole('button', { name: /navigation menu/i }).click();
  await expect(page.locator('[data-mobile-menu]')).toBeVisible();

  const after = await page.evaluate(() => window.scrollY);
  expect(Math.abs(after - before)).toBeLessThan(2);

  // The fixed drawer is anchored in the viewport (just below the header), not at document top.
  const box = await page.locator('[data-mobile-menu]').boundingBox();
  expect(box?.y ?? -1).toBeGreaterThan(0);
  expect(box?.y ?? 9999).toBeLessThan(200);

  // The header must stay pinned at the top while the drawer is open (overflow:hidden
  // un-sticks position:sticky, which previously scrolled the header out of view).
  const header = await page.locator('.site-header').boundingBox();
  expect(Math.abs(header?.y ?? 999)).toBeLessThan(2);
});

// Relative luminance of a `rgb(...)`/`color(srgb ...)` string (WCAG formula).
function luminanceOf(color: string): number {
  const nums = color.match(/[\d.]+/g)?.map(Number) ?? [];
  let [r, g, b] = nums;
  // color(srgb r g b) reports 0–1; rgb() reports 0–255.
  if (color.startsWith('color(') || (r <= 1 && g <= 1 && b <= 1)) {
    [r, g, b] = [r * 255, g * 255, b * 255];
  }
  const lin = (c: number) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

test('light-theme accent label text stays dark for AA contrast (A1)', async ({ page }) => {
  for (const path of ['/', '/songworks/']) {
    await page.goto(path);
    await page.evaluate(() => (document.documentElement.dataset.theme = 'light'));
    const color = await page.locator('.eyebrow').first().evaluate((el) => getComputedStyle(el).color);
    // The dark inks are ~0.10–0.13 luminance; a regression to the bright accent
    // (#44d6ff ≈ 0.60, #ff8a6c ≈ 0.42) would fail AA on the light background.
    expect(luminanceOf(color)).toBeLessThan(0.25);
  }
});

test('prefers-reduced-motion disables the perpetual hero animation (A3)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  // The hero ring pulses indefinitely by default; under reduce it must be neutralised.
  const duration = await page
    .locator('.hero-tech__ring--outer')
    .evaluate((el) => getComputedStyle(el).animationDuration);
  expect(parseFloat(duration)).toBeLessThan(0.01); // ~0.001ms, vs 5.2s without the rule
});
