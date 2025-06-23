# Test info

- Name: Successful login
- Location: /Users/user/Desktop/HW17/tests/setup/storageState.spec.ts:5:5

# Error details

```
Error: browser._newContextForReuse: Error reading storage state from storageState.json:
ENOENT: no such file or directory, open 'storageState.json'
```

# Test source

```ts
   1 | import { chromium, expect, test, Page } from "@playwright/test";
   2 | import LoginPage from "../../pom/pages/LoginPage";
   3 |
   4 |
>  5 | test('Successful login', async ({ page }: { page: Page }) => {
     |     ^ Error: browser._newContextForReuse: Error reading storage state from storageState.json:
   6 |
   7 |   let loginPage: LoginPage;
   8 |   loginPage = new LoginPage(page);
   9 |   await loginPage.signInWithCredentials("kateeegold+5@gmail.com", "Kate123321");
  10 |   await expect(page).toHaveURL("http://localhost:3000/");
  11 |
  12 |   await page.context().storageState({ path: 'storageState.json' })
  13 | });
```