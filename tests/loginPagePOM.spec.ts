import { test, expect } from '@playwright/test';
import LoginPage from '../pom/pages/loginPage';
import InventoryPage from '../pom/pages/InventoryPage';

test('Successfull login', async ({ page }) => {
    let loginPage = new LoginPage(page);
    let inventoryPage = new InventoryPage(page);
    await loginPage.openPage();
    await loginPage.enterUserName('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await inventoryPage.title('Products');
})

test('Authorisation without password', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.openPage();
    await loginPage.enterUserName('standard_user');
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessage('Epic sadface: Password is required');
})

test('Authorisation without username', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.openPage();
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessage('Epic sadface: Username is required');
})

test('Authorisation with wrong password', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.openPage();
    await loginPage.enterUserName('standard_user')
    await loginPage.enterPassword('secret_sauce123');
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
})

test('Authorisation locked user', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.openPage();
    await loginPage.enterUserName('locked_out_user')
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
})

test('Authorisation error user', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.openPage();
    await loginPage.enterUserName('erroruser')
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
})




