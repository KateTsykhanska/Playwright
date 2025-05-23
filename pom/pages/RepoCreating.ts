import { Locator, Page, expect } from "@playwright/test";

export default class RepoCreating {
    private readonly page: Page;
    private readonly newRepoIcon: Locator;
    private readonly newRepoLink: Locator;
    private readonly repoNameField: Locator;
    private readonly descriptionField: Locator;
    private readonly licenseDropdown: Locator;
    private readonly licenseAAL: Locator;
    private readonly gitIgnoreDropdown: Locator;
    private readonly gitIgnoreMacOS: Locator;
    private readonly templateSaveCheckbox: Locator;
    private readonly createButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newRepoIcon = page.locator("//div[@aria-controls='_aria_auto_id_0']")
        this.newRepoLink = page.locator("//a[@id='_aria_auto_id_1']");
        this.repoNameField = page.locator("//input[@id='repo_name']");
        this.descriptionField = page.locator("//textarea[@id='description']");
        this.licenseDropdown = page.locator("//input[@aria-controls='_aria_auto_id_292']");
        this.licenseAAL = page.locator("//div[@id='_aria_auto_id_297']");
        this.gitIgnoreDropdown = page.locator("//input[@aria-controls='_aria_auto_id_28']");
        this.gitIgnoreMacOS = page.locator("//div[@id='_aria_auto_id_290']");
        this.templateSaveCheckbox = page.locator("//input[@id='_aria_auto_id_9']");
        this.createButton = page.locator("//button[@class='ui primary button']");
        this.errorMessage = page.locator("//div[@class='ui negative message flash-message flash-error']");
    }
    async newRepoIconAndLink() {
        await this.newRepoIcon.click();
        await this.newRepoLink.click();
    }
    async repoNameFieldFill(repoName: string) {
        await this.repoNameField.fill(repoName);
    }
    async descriptionFill(description: string) {
        await this.descriptionField.fill(description);
    }
    async gitIgnoreFill() {
        await this.gitIgnoreDropdown.click();
        await this.gitIgnoreMacOS.click();
    }
    async licenseFill() {
        await this.licenseDropdown.click();
        await this.licenseAAL.click();
    }
    async savingAsTemplate() {
        await this.templateSaveCheckbox.click();
    }
    async repoCreating() {
        await this.createButton.click();
    }
    async verifyRepoNameValidation(error: string) {
        await expect(this.errorMessage).toHaveText(error);
    }
}