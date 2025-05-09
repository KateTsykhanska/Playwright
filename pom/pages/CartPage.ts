import { Locator, Page, expect } from "@playwright/test";

export default class CartPage {
    private readonly page: Page;
    private readonly addToCartButton: Locator;
    private readonly cartIcon: Locator;
    private readonly cartBadge: Locator;
    private readonly productName: Locator;
    private readonly removeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartIcon = page.locator('//a[@class="shopping_cart_link"]');
        this.cartBadge = page.locator('//span[@class="shopping_cart_badge"]');
        this.productName = page.locator('//div[@class="inventory_item_name"]');
        this.removeButton = page.locator('//button[@class="btn btn_secondary btn_small cart_button"]')
    }
    async addToCart() {
        this.addToCartButton.click();
    }

    async cartBadgeNumber(productsNumber: string) {
        await this.cartBadge.waitFor({ state: 'visible' });
        await expect(this.cartBadge).toHaveText(productsNumber);
    }
    async openCart() {

        await this.cartIcon.click();
    }
    async productCheck() {
        await expect(this.productName).toHaveText("Sauce Labs Backpack");
    }
    async removeProduct() {
        this.removeButton.click();
        await this.cartBadge.waitFor({state: "hidden"});
        await this.productName.waitFor({state: "hidden"})
    }
}