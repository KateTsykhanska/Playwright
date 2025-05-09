import { Locator, Page, expect } from "@playwright/test";

export default class InventoryPage {
    private readonly page: Page;
    private readonly titleText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleText = page.locator('//span[@class="title"]')
    }
    async title(title: string) {
        await expect(this.titleText).toBeVisible();
        await expect(this.titleText).toHaveText(title);
    }
}