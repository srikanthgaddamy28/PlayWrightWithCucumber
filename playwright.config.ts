import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,
  workers: 1,
  reporter: [['html'], ['junit', { outputFile: 'results.xml' }]],
  projects: [
      {
        name: 'chromium',
        use: {
          ...devices['Desktop Chrome'],
          video: 'on',
          screenshot: 'on',
        },
      },
      {
        name: 'firefox',
        use: {
          ...devices['Desktop Firefox'],
          video: 'on',
          screenshot: 'on',
        },
      },
      {
        name: 'webkit',
        use: {
          ...devices['Desktop Safari'],
          video: 'on',
          screenshot: 'on',
        },
      },
    // Example: BrowserStack grid integration
    ...(process.env.BROWSERSTACK_WS_ENDPOINT ? [{
      name: 'browserstack',
      use: {
        browserName: 'chromium' as const,
        connectOptions: {
          wsEndpoint: process.env.BROWSERSTACK_WS_ENDPOINT,
        },
      },
    }] : []),
    // For Sauce Labs or Selenium Grid, add similar project objects here
  ],
});
