import { expect, type Locator, type Page, ElementHandle } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        page.waitForURL('https://www.saucedemo.com/inventory.html');
        this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    }

    async goTo() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async sortProductsLowToHigh() {
        await this.sortDropdown.selectOption('lohi');
        const activeOption = this.page.locator('xpath=//span[@class="select_container"]/span[@class="active_option"]');

        expect(await activeOption.textContent()).toEqual("Price (low to high)");
    }

    async sortProductsHighToLow() {
        await this.sortDropdown.selectOption('hilo');
        const activeOption = this.page.locator('xpath=//span[@class="select_container"]/span[@class="active_option"]');

        expect(await activeOption.textContent()).toEqual("Price (high to low)");
    }

    async getAllProductPrices(): Promise<number[]> {
        const pricesElements = await this.page.$$('.inventory_item_price');
        const prices: number[] = [];

        for (const priceElement of pricesElements) {
            if (priceElement) {
                const priceText = await priceElement.textContent();
                if (priceText) {
                    const price = parseFloat(priceText.replace('$', ''));
                    prices.push(price);
                }
            }
        }

        return prices;
    }






}