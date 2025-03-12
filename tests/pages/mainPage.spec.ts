import { test, expect } from '../fixtures/mainPage';
import { MainPage } from '../models/MainPage';

test.describe('main page tests', () => {
  test('check visibility of navs elements', async ({ mainPage }) => {
    await mainPage.checkElementsVisibility();
  });

  test('check names of navs elements', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test('check href attributes of navs elements', async ({ mainPage }) => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('check light mode switch', async ({ mainPage }) => {
    await test.step('light mode icon switch click', async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step('check attribute value change', async () => {
      await mainPage.checkThemeDataAttributeValue();
    });
  });

  test(`check light theme mode style`, async ({ mainPage }) => {
    await test.step('set light mode', async () => {
      await mainPage.setLightMode();
    });
    await test.step('check screenshot with active light mode', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`check dark theme mode style`, async ({ mainPage }) => {
    await test.step('set dark mode', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('check screenshot with active dark mode', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
