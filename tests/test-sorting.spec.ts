import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';

let inventoryPage;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.login('standard_user', 'secret_sauce');
  inventoryPage = new InventoryPage(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('sorting prices low to high', async ({ page }) => {
  await inventoryPage.sortByPriceAscending();
  const prices = await inventoryPage.getAllPrices();
  const sortedPrices = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sortedPrices);
});

test('sorting prices high to low', async ({ page }) => {
  await inventoryPage.sortByPriceDescending();
  const prices = await inventoryPage.getAllPrices();
  const sortedPrices = [...prices].sort((a, b) => b - a);

  expect(prices).toEqual(sortedPrices);
});

test('sorting names from a to z', async ({ page }) => {
  await inventoryPage.sortByNameAscending();
  const names = await inventoryPage.getAllNames();
  const sortedNames = [...names].sort((a, b) => a - b);

  expect(names).toEqual(sortedNames);
});

test('sorting names from z to a', async ({ page }) => {
  await inventoryPage.sortByNameDescending();
  const names = await inventoryPage.getAllNames();
  const sortedNames = [...names].sort((a, b) => b - a);

  expect(names).toEqual(sortedNames);
});