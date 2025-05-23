import { test, Page, expect } from '@playwright/test';
import LoginPage from '../pom/pages/LoginPage';
import RepoCreating from '../pom/pages/RepoCreating';


test('New repo successfull creating', async ({ page }: { page: Page }) => {
    let loginPage = new LoginPage(page);
    let newRepoPage = new RepoCreating(page);
    await loginPage.signInWithCredentials("kateeegold+5@gmail.com", "Kate123321")
    await newRepoPage.newRepoIconAndLink();
    const repoName = "New_repo0";
    await newRepoPage.repoNameFieldFill(repoName);
    await newRepoPage.descriptionFill("It's a description of the new repo")
    await newRepoPage.gitIgnoreFill();
    await newRepoPage.licenseFill();
    await newRepoPage.savingAsTemplate();
    await newRepoPage.repoCreating();
    await expect(page).toHaveURL(`http://localhost:3000/Kate123555/${repoName}`);
    await expect(page.locator(`h1#user-content-${repoName.toLowerCase()}`)).toContainText(repoName);
})
test('New repo creating with registered before repo name', async ({ page }: { page: Page }) => {
    let loginPage = new LoginPage(page);
    let newRepoPage = new RepoCreating(page);
    await loginPage.signInWithCredentials("kateeegold+5@gmail.com", "Kate123321")
    await newRepoPage.newRepoIconAndLink();
    await newRepoPage.repoNameFieldFill("New_repo0");
    await newRepoPage.repoCreating();
    await newRepoPage.verifyRepoNameValidation("Название репозитория уже используется.");
})
test('New repo creating with invalid repo name', async ({ page }: { page: Page }) => {
    let loginPage = new LoginPage(page);
    let newRepoPage = new RepoCreating(page);
    await loginPage.signInWithCredentials("kateeegold+5@gmail.com", "Kate123321")
    await newRepoPage.newRepoIconAndLink();
    await newRepoPage.repoNameFieldFill("New# world");
    await newRepoPage.repoCreating();
    await newRepoPage.verifyRepoNameValidation("Название репозитория должен содержать только буквенно-цифровые символы, тире ('-'), подчеркивания ('_') и точки ('.').");
})