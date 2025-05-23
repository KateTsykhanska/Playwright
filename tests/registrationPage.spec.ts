import { test, Page } from '@playwright/test';
import RegistrationPage from '../pom/pages/RegistrationPage';

test('Successful registration', async ({ page }: { page: Page }) => {
    let regisrationPage = new RegistrationPage(page);
    await regisrationPage.registerWithCredentials("KateeTest123", "kateeegold+test123@gmail.com", "Kate123321");
    await regisrationPage.verifySuccessMessage("Account was successfully created. Welcome!");
})
test("Registered username registration", async ({ page }: { page: Page }) => {
    let regisrationPage = new RegistrationPage(page);
    await regisrationPage.registerWithCredentials("KateTest123", "kateeegold+test1@gmail.com", "Kate123321");
    await regisrationPage.verifyErrorMessage("The username is already taken.");
})
test("Registered email registration", async ({ page }: { page: Page }) => {
    let regisrationPage = new RegistrationPage(page);
    await regisrationPage.registerWithCredentials("KateTest12345", "kateeegold+test123@gmail.com", "Kate123321");
    await regisrationPage.verifyErrorMessage("The email address is already used.")
})
test('Empty username', async ({ page }: { page: Page }) => {
    let regisrationPage = new RegistrationPage(page);
    await regisrationPage.registerWithCredentials("", "kateeegold+test@gmail.com", "kdshkjsd");
    await regisrationPage.verifyErrorMessageForFieldIsShown('userName');
})
test('Empty email', async ({ page }: { page: Page }) => {
    let regisrationPage = new RegistrationPage(page);
    await regisrationPage.registerWithCredentials("jnkjn", "", "kdshkjsd");
    await regisrationPage.verifyErrorMessageForFieldIsShown('email');
})
test("Empty password", async ({ page }: { page: Page }) => {
    let regisrationPage = new RegistrationPage(page);
    await regisrationPage.registerWithCredentials("Katee113", "kateeegold+test@gmail.com", "");
    await regisrationPage.verifyErrorMessageForFieldIsShown('password')
})