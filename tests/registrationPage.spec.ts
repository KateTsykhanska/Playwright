import { test, Page, expect } from '@playwright/test';
import RegistrationPage from '../pom/pages/RegistrationPage';
import LoginPage from '../pom/pages/LoginPage';

test.describe('Repository Creation', () => {
    let registrationPage: RegistrationPage;
    let loginPage: LoginPage;

    const randomPrefix = Date.now();
    const username = `User_${randomPrefix}`;
    const email = `kateeegold+QaAuto_user${randomPrefix}@gmail.com`
    const password = 'Password123!';

    test.beforeAll(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        loginPage = new LoginPage(page);
    })

    test('Successful registration', async ({ page }: { page: Page }) => {
        await registrationPage.registerWithCredentials(username, email, password);
        await registrationPage.verifySuccessMessage("Account was successfully created. Welcome!");
    })
    test("Registered username registration", async ({ page }: { page: Page }) => {
        await registrationPage.registerWithCredentials("KateTest123", email, password);
        await registrationPage.registerWithCredentials("KateTest123", email, password);
        await registrationPage.verifyErrorMessage("The username is already taken.");
    })
    test("Registered email registration", async ({ page }: { page: Page }) => {
        await registrationPage.registerWithCredentials(username, "kate@gmail.com", password);
        await registrationPage.registerWithCredentials(username, "kate@gmail.com", password);
        await registrationPage.verifyErrorMessage("The email address is already used.")
    })
    test('Empty username', async ({ page }: { page: Page }) => {
        await registrationPage.registerWithCredentials("", email, password);
        await registrationPage.verifyErrorMessageForFieldIsShown('userName');
    })
    test('Empty email', async ({ page }: { page: Page }) => {
        await registrationPage.registerWithCredentials(username, "", password);
        await registrationPage.verifyErrorMessageForFieldIsShown('email');
    })
    test("Empty password", async ({ page }: { page: Page }) => {
        await registrationPage.registerWithCredentials(username, email, "");
        await registrationPage.verifyErrorMessageForFieldIsShown('password')
    })
})