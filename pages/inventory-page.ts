import { expect, type Locator, type Page, ElementHandle } from '@playwright/test';

export class InventoryPage {
    private readonly page: Page;
    private readonly sortDropdown: Locator;

    private readonly pageUrl = 'https://www.saucedemo.com/inventory.html';
    private readonly activeOptionLocator: string = 'xpath=//span[@class="select_container"]/span[@class="active_option"]';

    constructor(page: Page) {
        this.page = page;
        page.waitForURL(this.pageUrl);
        this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    }

    async goTo() {
        await this.page.goto(this.pageUrl);
    }

    async sortByPriceAscending() {
        await this.sortDropdown.selectOption('lohi');
        const activeOption = this.page.locator(this.activeOptionLocator);

        expect(await activeOption.textContent()).toEqual("Price (low to high)");
    }

    async sortByPriceDescending() {
        await this.sortDropdown.selectOption('hilo');
        const activeOption = this.page.locator(this.activeOptionLocator);

        expect(await activeOption.textContent()).toEqual("Price (high to low)");
    }

    async getAllPrices(): Promise<number[]> {
        const priceElements = await this.page.$$('.inventory_item_price');
        const prices: number[] = [];

        for (const priceElement of priceElements) {
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

    async sortByNameAscending() {
        await this.sortDropdown.selectOption('az');
        const activeOption = this.page.locator(this.activeOptionLocator);

        expect(await activeOption.textContent()).toEqual("Name (A to Z)");
    }

    async sortByNameDescending() {
        await this.sortDropdown.selectOption('za');
        const activeOption = this.page.locator(this.activeOptionLocator);

        expect(await activeOption.textContent()).toEqual("Name (Z to A)");
    }

    async getAllNames(): Promise<string[]> {
        const nameElements = await this.page.$$('.inventory_item_name');
        const names: string[] = [];

        for (const nameElement of nameElements) {
            if (nameElement) {
                const nameText = await nameElement.textContent();
                if (nameText) {
                    names.push(nameText);
                }
            }
        }

        return names;
    }
}