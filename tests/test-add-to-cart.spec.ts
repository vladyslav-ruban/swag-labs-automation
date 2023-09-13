import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';

const username = process.env.USERNAME ?? "";
const password = process.env.PASSWORD ?? "";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login(username, password);
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('add single product to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    const cartValue = await inventoryPage.getShoppingCartBadgeValue();
    expect(cartValue).toEqual("1");

    await inventoryPage.openCart();
    let cartPage = new CartPage(page);
    expect(await cartPage.getAllNames()).toEqual(["Sauce Labs Backpack"]);
});

test('add multiple products to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    let cartValue = await inventoryPage.getShoppingCartBadgeValue();
    expect(cartValue).toEqual("1");

    await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    cartValue = await inventoryPage.getShoppingCartBadgeValue();
    expect(cartValue).toEqual("2");

    await inventoryPage.addProductToCart("Sauce Labs Fleece Jacket");
    cartValue = await inventoryPage.getShoppingCartBadgeValue();
    expect(cartValue).toEqual("3");

    await inventoryPage.openCart();
    let cartPage = new CartPage(page);
    expect(await cartPage.getAllNames()).toEqual(["Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Fleece Jacket"]);
});