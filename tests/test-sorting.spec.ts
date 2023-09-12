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
  await inventoryPage.sortProductsLowToHigh();
  const prices = await inventoryPage.getAllProductPrices();
  const sortedPrices = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sortedPrices);
});

test('sorting prices high to low', async ({ page }) => {
  await inventoryPage.sortProductsHighToLow();
  const prices = await inventoryPage.getAllProductPrices();
  const sortedPrices = [...prices].sort((a, b) => b - a);

  expect(prices).toEqual(sortedPrices);
});

test('sorting names from a to z', async ({ page }) => {

});

test('sorting names from z to a', async ({ page }) => {
  
});