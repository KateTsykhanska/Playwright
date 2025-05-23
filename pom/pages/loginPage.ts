import { Locator, Page } from "@playwright/test";


export default class LoginPage {
    private readonly page: Page;
    private readonly userNameField: Locator;
    private readonly passwordField: Locator;
    private readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameField = this.page.locator('//input[@id="user_name"]');
        this.passwordField = this.page.locator('//input[@id="password"]');
        this.signInButton = this.page.locator('//button[contains(@class, "primary")]');
    }

    async openPage() {
        await this.page.goto('/user/login');
    }
    async enterUserName(userName: string) {
        await this.userNameField.fill(userName);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async signInWithCredentials(userName: string, password: string) {
        await this.openPage();
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickSignInButton();
    }
}
