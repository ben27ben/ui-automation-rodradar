import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { Dashboardpage } from "../pages/dashboardPage";
import { users } from "../utils/users";

test.describe.skip("First tests DEV", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  // users.forEach(({ username, password}) => {
  //     test(`Login with ${username}`, async ({ page }) => {
  //       await loginPage.login(username, password);
  //       const isLoggedIn = await loginPage.isLoggedIn();
  //       expect(isLoggedIn).toBe(true);
  //     });
  //   });
  // });

  test("Login test @login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login("boadmin@rodradar.com", "Abcd1234");

    // const dashboardPage = await page.isVisible('Dashboards');
    await expect(page.getByText("Dashboards", { exact: true })).toBeVisible({
      timeout: 10000,
    });
    console.log("-----> locator was found");
    // page.close()
  });

  test("Wrong password @login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login("ben_tech2@yopmail.com", "aaaaaadf");

    const errorMessage = page.getByText("Incorrect email address/password");
    await expect(errorMessage).toBeVisible();

    const dashboardPage = await page.isVisible("Dashboards");
    expect(dashboardPage).toBeFalsy();
    console.log("------> Login failed");
    // page.close()
  });

  test("Enter Dashboard @dashboard", async ({ page }) => {
    await loginPage.navigateToLogin();
    await loginPage.login("boadmin@rodradar.com", "Abcd1234");
    await loginPage.waitForSelector(
      '//span[contains(text(), "Bo Admin")]',
      7000
    );
    const dashLocator = await page.locator('//span[contains(text(), "Bo Admin")]')
    // const isLoggedIn = await dashboardPage.isLoggedIn("Bo Admin");
    expect(dashLocator).toBeVisible();
    console.log("----> user name is" + " " + dashLocator);
  });
});
