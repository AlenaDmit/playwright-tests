import { test, expect, Page, Locator } from '@playwright/test';
import { MainPage } from '../models/MainPage';

let mainPage: MainPage;

test.describe('main page tests', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test('check visibility of navs elements', async () => {
    await mainPage.checkElementsVisibility();
  });

  test('check names of navs elements', async () => {
    await mainPage.checkElementsText();
  });

  test('check href attributes of navs elements', async () => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('check light mode switch', async () => {
    await test.step('light mode icon switch click', async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step('check attribute value change', async () => {
      await mainPage.checkThemeDataAttributeValue();
    });
  });

  test(`check light theme mode style`, async () => {
    await test.step('set light mode', async () => {
      await mainPage.setLightMode();
    });
    await test.step('check screenshot with active light mode', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`check dark theme mode style`, async () => {
    await test.step('set dark mode', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('check screenshot with active dark mode', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
