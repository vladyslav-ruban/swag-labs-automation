import { expect, type Locator, type Page } from '@playwright/test';
import { getAllNames } from './utils/product-list-utils';

const url = process.env.URL ?? "";

export class InventoryPage {
    private readonly pageUrl = `${url}/inventory.html`;

    private readonly page: Page;
    private readonly sortDropdown: Locator;
    private readonly cartLink: Locator;

    private readonly activeOptionSelector: string = 'xpath=//span[@class="select_container"]/span[@class="active_option"]';
    private readonly priceSelector: string = '.inventory_item_price';
    private readonly nameSelector: string = '.inventory_item_name';
    private readonly productCardSelector: string = `xpath=//div[@class="inventory_item"]`;
    private readonly addToCartButtonSelector: string = 'xpath=//button[contains(@data-test,"add-to-cart")]';

    constructor(page: Page) {
        this.page = page;
        page.waitForURL(this.pageUrl);
        this.sortDropdown = page.locator('[data-test="product_sort_container"]');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async goTo() {
        await this.page.goto(this.pageUrl);
    }

    async sortByPriceAscending() {
        await this.sortDropdown.selectOption('lohi');
        const activeOption = this.page.locator(this.activeOptionSelector);

        expect(await activeOption.textContent()).toEqual("Price (low to high)");
    }

    async sortByPriceDescending() {
        await this.sortDropdown.selectOption('hilo');
        const activeOption = this.page.locator(this.activeOptionSelector);

        expect(await activeOption.textContent()).toEqual("Price (high to low)");
    }

    async getAllPrices(): Promise<number[]> {
        const priceElements = await this.page.$$(this.priceSelector);
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
        const activeOption = this.page.locator(this.activeOptionSelector);

        expect(await activeOption.textContent()).toEqual("Name (A to Z)");
    }

    async sortByNameDescending() {
        await this.sortDropdown.selectOption('za');
        const activeOption = this.page.locator(this.activeOptionSelector);

        expect(await activeOption.textContent()).toEqual("Name (Z to A)");
    }

    async getAllNames(): Promise<string[]> {
        return await getAllNames(this.page, this.nameSelector);
    }

    async addProductToCart(productName: string): Promise<void> {
        const productNameSelectorPart = `[.//div[@class="inventory_item_name"][.="${productName}"]]`;
        const productCard = this.page.locator(`${this.productCardSelector}${productNameSelectorPart}`);
        const addToCartButton = productCard.locator(this.addToCartButtonSelector);

        await addToCartButton.click();
    }

    async getShoppingCartBadgeValue(): Promise<string | null> {
        const badge = this.page.locator('.shopping_cart_badge');
        return await badge.textContent();
    }

    async openCart() {
        await this.cartLink.click();
    }
}