import { test, expect, Page, Locator } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo link',
    text: 'Playwright',
    attribute: { type: 'href', value: '/' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    attribute: { type: 'href', value: '/docs/intro' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'Api link',
    text: 'API',
    attribute: { type: 'href', value: '/docs/api/class-playwright' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
    text: 'Community',
    attribute: { type: 'href', value: '/community/welcome' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'Github icon',
    attribute: { type: 'href', value: 'https://github.com/microsoft/playwright' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord icon',
    attribute: { type: 'href', value: 'https://aka.ms/playwright/discord' },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Switch mode icon',
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
    name: 'Search icon',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('heading', { name: 'Playwright enables reliable' }),
    name: 'Heading',
    text: 'Playwright enables reliable end-to-end testing for modern web apps.',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
    name: 'Get started button',
    text: 'Get started',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
];

test.describe('main page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('check visibility of navs elements', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`check ${name} visibility`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test('check names of navs elements', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`check ${name} name`, async () => {
          await expect.soft(locator(page)).toContainText(text);
        });
      }
    });
  });

  test('check href attributes of navs elements', async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`check attribute ${attribute.type} ${name} of navs`, async () => {
          await expect
            .soft(locator(page))
            .toHaveAttribute(`${attribute.type}`, `${attribute.value}`);
        });
      }
    });
  });

  test('check light mode switch', async ({ page }) => {
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});
