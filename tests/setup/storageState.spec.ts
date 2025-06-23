import { chromium, expect, test, Page } from "@playwright/test";
import LoginPage from "../../pom/pages/LoginPage";
import RegistrationPage from "../../pom/pages/RegistrationPage";


test('Successful login', async ({ page }: { page: Page }) => {
  let loginPage: LoginPage;
  let registrationPage : RegistrationPage;
  loginPage = new LoginPage(page);
  registrationPage = new RegistrationPage(page);
  await registrationPage.registerWithCredentials("KateTest+5", "kateeegold+5@gmail.com", "Kate123321");
  await loginPage.signInWithCredentials("kateeegold+5@gmail.com", "Kate123321");
  await page.context().storageState({ path: 'storageState.json' })
});