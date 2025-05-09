import { test, expect } from '@playwright/test';
import LoginPage from '../pom/pages/loginPage';


test('Successfull login', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.openPage();
    await loginPage.enterUserName('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await loginPage.title('Products');
})

test('Authorisation without password', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.openPage();
    await loginPage.enterUserName('standard_user');
    await loginPage.clickLoginButton();
    await loginPage.errorMessageEmptyPassword('');
})

test('Authorisation without username', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.openPage();
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    await loginPage.errorMessageEmptyUsername('');
})

test('Authorisation with wrong password', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.openPage();
    await loginPage.enterUserName('standard_user')
    await loginPage.enterPassword('secret_sauce123');
    await loginPage.clickLoginButton();
    await loginPage.errorMessageWrongUsername('');
})

test('Authorisation locked user', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.openPage();
    await loginPage.enterUserName('locked_out_user')
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    await loginPage.errorMessageLockedUser('');
})

test('Authorisation error user', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.openPage();
    await loginPage.enterUserName('erroruser')
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    await loginPage.errorMessageErrorUser('');
})




