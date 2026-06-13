import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: 0,
  // Self-contained: `npx playwright test` builds and serves on 127.0.0.1 (matching baseURL),
  // so it works standalone. `npm run test:e2e` pre-starts the same preview, which this reuses.
  // (astro dev binds IPv6 localhost only, which baseURL 127.0.0.1 cannot reach — hence preview.)
  webServer: {
    command: 'npm run build && npm run preview:hosted',
    url: 'http://127.0.0.1:4321',
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 1024 },
      },
    },
    {
      name: 'tablet-chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 1024, height: 1366 },
        isMobile: false,
        hasTouch: true,
      },
    },
    {
      name: 'mobile-chromium',
      use: {
        ...devices['Pixel 7'],
        browserName: 'chromium',
      },
    },
  ],
});
