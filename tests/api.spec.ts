import { test, expect } from "@playwright/test";
import LoginPage from "../pom/pages/LoginPage";;

test.use({ storageState: 'storageState.json' });

test('API tests', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.signInWithCredentials("kateeegold+5@gmail.com", "Kate123321")
    await expect(page).toHaveURL("http://localhost:3000/");
    page.on('request', request => console.log('Запит:',
        request.method(), request.url()));
    page.on('response', response => console.log('Відповідь:',
        response.status(), response.url()));
})

test('Get token', async ({ request }) => {
    const token = 'ba720e7e63f8cef6e3fb951188176d2cbb55f1ce';


    const response = await request.get('/api/v1/user/actions/runners/registration-token', {
        headers: {
            accept: 'application/json',
            Authorization: `token ${token}`
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Registration token response:', body);

    expect(body).toHaveProperty('token');
})

test('Get current authenticated user', async ({ request }) => {
  const token = 'ba720e7e63f8cef6e3fb951188176d2cbb55f1ce';

  const response = await request.get('/api/v1/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/json',
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log('Authenticated user:', body);

  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('login');
  expect(body).toHaveProperty('email');
});

test('Get users settings', async ({ request }) => {
  const token = 'ba720e7e63f8cef6e3fb951188176d2cbb55f1ce';

  const response = await request.get('/api/v1/user/settings', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/json',
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log('Authenticated user:', body);
expect(body).toHaveProperty('full_name');
});


test('Update user settings', async ({ request }) => {
  const token = 'ba720e7e63f8cef6e3fb951188176d2cbb55f1ce';

  const response = await request.patch('/api/v1/user/settings', {
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      full_name: 'Kate QA',
      language: 'en-US',
      website: 'https://google.com'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log('Updated settings:', body);

  expect(body.full_name).toBe('Kate QA');
  expect(body.language).toBe('en-US');
  expect(body.website).toBe('https://google.com');
});

test('Create repo', async ({ request }) => {
  const token = 'ba720e7e63f8cef6e3fb951188176d2cbb55f1ce';

 const repoName = `autotest-repo-${Date.now()}`; 

  const response = await request.post('/api/v1/user/repos', {
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      name: repoName,
      description: 'Repo created via Playwright test',
      private: false,
      auto_init: true 
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  console.log('Repository created:', body);

  expect(body.name).toBe(repoName);
  expect(body.private).toBe(false);
  expect(body.description).toBe('Repo created via Playwright test');
});

