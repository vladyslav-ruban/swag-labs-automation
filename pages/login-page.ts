import { type Locator, type Page } from '@playwright/test';

const url = process.env.URL ?? "";

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        page.waitForURL(url);
        this.usernameField = page.locator('[data-test="username"]');
        this.passwordField = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    async goTo() {
        await this.page.goto(url);
    }

    async login(username: string, password: string) {
        await this.usernameField.click();
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}