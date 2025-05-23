import { Locator, Page, expect } from "@playwright/test";

export default class RegistrationPage {
    private readonly page: Page;
    private readonly registrationButton: Locator;
    private readonly userNameField: Locator;
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly repeatPasswordField: Locator;
    private readonly registrationSubmitButton: Locator;
    private readonly successMessage: Locator;
    private readonly errorMessage: Locator;
    private readonly logoutIcon: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registrationButton = page.locator('//a[@href="/user/sign_up"]');
        this.userNameField = page.locator("//input[@id='user_name']");
        this.emailField = page.locator("//input[@id='email']");
        this.passwordField = page.locator("//input[@id='password']");
        this.repeatPasswordField = page.locator("//input[@id='retype']");
        this.registrationSubmitButton = page.locator("//button[@class='ui primary button tw-w-full']")
        this.successMessage = page.locator("//div[@class='ui positive message flash-message flash-success']");
        this.errorMessage = page.locator("//div[@class='ui negative message flash-message flash-error']");
        this.logoutIcon = page.locator("//div[@aria-label='Profile and Settings…']");
        this.logoutLink = page.locator("//div[@class='ui dropdown jump item tw-mx-0 tw-pr-2 active visible']");
    }
    async registerWithCredentials(username: string, email: string, password: string) {
        await this.page.goto('/');
        await this.registrationButton.click();
        await this.userNameField.fill(username);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.repeatPasswordField.fill(password);
        await this.registrationSubmitButton.click();
    }
    async logOut() {
        await this.logoutIcon.click();
        await this.logoutLink.click();
    }
    async verifySuccessMessage(message: string) {
        await expect(this.successMessage).toBeVisible;
        await expect(this.successMessage).toHaveText(message);
    }
    async verifyErrorMessage(error: string) {
        await expect(this.errorMessage).toHaveText(error);
    }
    async verifyErrorMessageForFieldIsShown(fieldName: string) {
        let elementToCheck: Locator;

        if (fieldName === 'userName') {
            elementToCheck = this.userNameField;
        } else if (fieldName === 'email') {
            elementToCheck = this.emailField;
        } else if (fieldName === 'password') {
            elementToCheck = this.passwordField;
        } else {
            throw new Error(`Unknown field name: ${fieldName}`);
        }

        const validationMessage = await elementToCheck.evaluate(
            (el) => (el as HTMLInputElement).validationMessage
        );
        expect(validationMessage).not.toBe('');
    }
}

