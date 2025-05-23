import LoginPage from "../pom/pages/LoginPage";
import { test, Page } from '@playwright/test';


test('Successful login', async ({ page }: { page: Page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.signInWithCredentials("kateeegold+5@gmail.com", "Kate123321")
})