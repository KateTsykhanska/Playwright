import { Locator, Page, expect } from "@playwright/test";

export default class LoginPage {
    private readonly page: Page;
    private readonly userNameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;
    private readonly titleText: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameField = page.locator("//input[@data-test='username']");
        this.passwordField = page.locator('//input[@id="password"]');
        this.loginButton = page.locator('//input[@class="submit-button btn_action"]');
        this.errorMessage = page.locator('//h3[@data-test="error"]');
        this.titleText = page.locator('//span[@class="title"]')
    }
    async openPage() {
        await this.page.goto('/');
    }
    async enterUserName(username: string) {
        await this.userNameField.fill(username);
    }
    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }
    async title(title: string) {
        await expect(this.titleText).toBeVisible();
        await expect(this.titleText).toHaveText('Products');
    }
    async errorMessageEmptyPassword(expectedText: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText('Epic sadface: Password is required');
    }
    async errorMessageEmptyUsername(expectedText: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText('Epic sadface: Username is required');
    }
    async errorMessageWrongUsername(expectedText: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    }
    async errorMessageLockedUser(expectedText: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    }
    async errorMessageErrorUser(expectedText: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    }

    async login(username: string, password: string) {
        await this.openPage();
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
      }
}

