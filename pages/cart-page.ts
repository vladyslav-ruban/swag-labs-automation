import { expect, type Locator, type Page } from '@playwright/test';
import { getAllNames } from './utils/product-list-utils';

const url = process.env.URL ?? "";

export class CartPage {
    private readonly pageUrl = `${url}/cart.html`;

    private readonly page: Page;

    private readonly nameSelector: string = '.inventory_item_name';

    constructor(page: Page) {
        this.page = page;
        page.waitForURL(this.pageUrl);
    }

    async getAllNames(): Promise<string[]> {
        return await getAllNames(this.page, this.nameSelector);
    }
}