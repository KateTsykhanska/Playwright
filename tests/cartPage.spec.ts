import { test, expect } from '@playwright/test';
import CartPage from '../pom/pages/CartPage';
import LoginPage from '../pom/pages/loginPage';

test.beforeEach(async ({ page }) => {
  let loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');
});

test('Adding to cart', async ({ page }) => {
  let cartPage = new CartPage(page);
  await cartPage.addToCart();
  await cartPage.cartBadgeNumber("1");
  await cartPage.openCart();
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
  await cartPage.productCheck();
})

test('Removing a product', async ({ page }) => {
  let cartPage = new CartPage(page);
  await cartPage.addToCart();
  await cartPage.cartBadgeNumber("1");
  await cartPage.openCart();
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
  await cartPage.productCheck();
  await cartPage.removeProduct();
})