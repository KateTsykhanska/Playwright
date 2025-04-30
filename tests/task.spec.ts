import { test, expect } from '@playwright/test';

test('Successfull login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const userName = page.locator("//input[@data-test='username']");
  const password = page.locator('//input[@id="password"]');
  const login = page.locator('//input[@class="submit-button btn_action"]');

  await userName.fill('standard_user');
  await password.fill('secret_sauce');
  await login.click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
}
)

test('Authorisation without username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const userName = page.locator("//input[@data-test='username']");
  const password = page.locator('//input[@id="password"]');
  const login = page.locator('//input[@class="submit-button btn_action"]');
  const errorMessage = page.locator('//h3[@data-test="error"]');

  await password.fill('secret_sauce');
  await login.click();

  await expect(errorMessage).toHaveText('Epic sadface: Username is required')
})

test('Authorisation without password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const userName = page.locator("//input[@data-test='username']");
  const password = page.locator('//input[@id="password"]');
  const login = page.locator('//input[@class="submit-button btn_action"]');
  const errorMessage = page.locator('//h3[@data-test="error"]');

  await userName.fill('standard_user');
  await login.click();

  await expect(errorMessage).toHaveText('Epic sadface: Password is required')
})

test('Authorisation with wrong password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const userName = page.locator("//input[@data-test='username']");
  const password = page.locator('//input[@id="password"]');
  const login = page.locator('//input[@class="submit-button btn_action"]');
  const errorMessage = page.locator('//h3[@data-test="error"]');

  await userName.fill('standard_user');
  await password.fill('secret_sauce123');
  await login.click();
  await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
})

test('Authorisation locked user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const userName = page.locator("//input[@data-test='username']");
  const password = page.locator('//input[@id="password"]');
  const login = page.locator('//input[@class="submit-button btn_action"]');
  const errorMessage = page.locator('//h3[@data-test="error"]');

  await userName.fill('locked_out_user');
  await password.fill('secret_sauce');
  await login.click();
  await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
})

test('Authorisation error user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const userName = page.locator("//input[@data-test='username']");
  const password = page.locator('//input[@id="password"]');
  const login = page.locator('//input[@class="submit-button btn_action"]');
  const errorMessage = page.locator('//h3[@data-test="error"]');

  await userName.fill('erroruser');
  await password.fill('secret_sauce');
  await login.click();
  await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
})