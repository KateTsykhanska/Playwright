import { test, Page, expect } from '@playwright/test';
import LoginPage from '../pom/pages/LoginPage';
import RepoCreating from '../pom/pages/RepoCreating';
import RegistrationPage from '../pom/pages/RegistrationPage';


test.describe('Repository Creation', () => {
    let loginPage: LoginPage;
    let newRepoPage: RepoCreating;
    let registrationPage: RegistrationPage;

    const randomPrefix = Date.now();
    const username = `User_${randomPrefix}`;
    const email = `kateeegold+QaAuto_user${randomPrefix}@gmail.com`
    const password = 'Password123!';
    const repoName = `New_repo${randomPrefix}`;

    test.beforeAll(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        loginPage = new LoginPage(page);
        newRepoPage = new RepoCreating(page);

        await registrationPage.registerWithCredentials(username, email, password);
        await expect(page.locator('//span[@class="text truncated-item-container"]//span[@class="truncated-item-name"]')).toHaveText(`User_${randomPrefix}`);
    })
    test.beforeEach(async ({ page }) => {
        await loginPage.signInWithCredentials(username, password);
        await expect(page.locator('//span[@class="text truncated-item-container"]//span[@class="truncated-item-name"]')).toHaveText(username);
    })

    test('New repo successful creating', async ({ page }: { page: Page }) => {
        await newRepoPage.newRepoIconAndLink();
        await newRepoPage.repoNameFieldFill(repoName);
        await newRepoPage.descriptionFill("It's a description of the new repo")
        await newRepoPage.gitIgnoreFill();
        await newRepoPage.licenseFill();
        await newRepoPage.savingAsTemplate();
        await newRepoPage.repoCreating();
        await expect(page).toHaveURL(`http://localhost:3000/${username}/${repoName}`);
        await expect(page.locator(`h1#user-content-${repoName.toLowerCase()}`)).toContainText(repoName);
    })
    test('New repo creating with registered before repo name', async ({ page }: { page: Page }) => {
        await newRepoPage.newRepoIconAndLink();
        await newRepoPage.repoNameFieldFill(repoName);
        await newRepoPage.repoCreating();
        await newRepoPage.newRepoIconAndLink();
        await newRepoPage.repoNameFieldFill(repoName);
        await newRepoPage.repoCreating();
        await newRepoPage.verifyRepoNameValidation("The repository name is already used.");
    })
    test('New repo creating with invalid repo name', async ({ page }: { page: Page }) => {
        await newRepoPage.newRepoIconAndLink();
        await newRepoPage.repoNameFieldFill("New# world");
        await newRepoPage.repoCreating();
        await newRepoPage.verifyRepoNameValidation("Repository name should contain only alphanumeric, dash ('-'), underscore ('_') and dot ('.') characters.");
    })
})