import { Locator, Page, expect } from "@playwright/test";

export default class LoginPage {
    private readonly page: Page;
    private readonly userNameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameField = page.locator("//input[@data-test='username']");
        this.passwordField = page.locator('//input[@id="password"]');
        this.loginButton = page.locator('//input[@class="submit-button btn_action"]');
        this.errorMessage = page.locator('//h3[@data-test="error"]');
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
    async verifyErrorMessage(expectedText: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedText);
    }
    async login(username: string, password: string) {
        await this.openPage();
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
      }
}

