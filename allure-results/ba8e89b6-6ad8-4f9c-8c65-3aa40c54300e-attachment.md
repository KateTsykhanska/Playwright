# Test info

- Name: Successful login
- Location: /Users/user/Desktop/HW17/tests/setup/storageState.spec.ts:5:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/user/login
Call log:
  - navigating to "http://localhost:3000/user/login", waiting until "load"

    at LoginPage.openPage (/Users/user/Desktop/HW17/pom/pages/LoginPage.ts:18:25)
    at LoginPage.signInWithCredentials (/Users/user/Desktop/HW17/pom/pages/LoginPage.ts:33:20)
    at /Users/user/Desktop/HW17/tests/setup/storageState.spec.ts:8:19
```

# Page snapshot

```yaml
- heading "This site can’t be reached" [level=1]
- paragraph:
  - strong: localhost
  - text: refused to connect.
- paragraph: "Try:"
- list:
  - listitem: Checking the connection
  - listitem:
    - link "Checking the proxy and the firewall":
      - /url: "#buttons"
- text: ERR_CONNECTION_REFUSED
- button "Reload"
- button "Details"
```

# Test source

```ts
   1 | import { Locator, Page } from "@playwright/test";
   2 |
   3 |
   4 | export default class LoginPage {
   5 |     private readonly page: Page;
   6 |     private readonly userNameField: Locator;
   7 |     private readonly passwordField: Locator;
   8 |     private readonly signInButton: Locator;
   9 |
  10 |     constructor(page: Page) {
  11 |         this.page = page;
  12 |         this.userNameField = this.page.locator('//input[@id="user_name"]');
  13 |         this.passwordField = this.page.locator('//input[@id="password"]');
  14 |         this.signInButton = this.page.locator('//button[contains(@class, "primary")]');
  15 |     }
  16 |
  17 |     async openPage() {
> 18 |         await this.page.goto('/user/login');
     |                         ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/user/login
  19 |     }
  20 |     async enterUserName(userName: string) {
  21 |         await this.userNameField.fill(userName);
  22 |     }
  23 |
  24 |     async enterPassword(password: string) {
  25 |         await this.passwordField.fill(password);
  26 |     }
  27 |
  28 |     async clickSignInButton() {
  29 |         await this.signInButton.click();
  30 |     }
  31 |
  32 |     async signInWithCredentials(userName: string, password: string) {
  33 |         await this.openPage();
  34 |         await this.enterUserName(userName);
  35 |         await this.enterPassword(password);
  36 |         await this.clickSignInButton();
  37 |     }
  38 | }
  39 |
```