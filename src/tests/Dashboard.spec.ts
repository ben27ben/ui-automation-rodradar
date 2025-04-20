import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { Dashboardpage } from "../pages/dashboardPage";
import { ok } from "assert";
import exp from "constants";

test.describe("Dashboard Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: Dashboardpage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new Dashboardpage(page);

    await loginPage.navigateToLogin();
    await loginPage.login("boadmin@rodradar.com", "Abcd1234");
  });

  test("Dashboard should be visible after login", async ({ page }) => {
    const isOnDashboard = await dashboardPage.isOnDashboard();
    const isWidgetVisible = await dashboardPage.isWidgetVisible(
      "QuestionMarkIcon"
    );
    expect(isOnDashboard).toBe(true);
    console.log("First var is Succesful");
    expect(isWidgetVisible).toBe(true);
    console.log("Second var is Succesful");
    console.log("---->" + "" + isOnDashboard, isWidgetVisible + " " + "answer");
    expect(dashboardPage.isWidgetVisible).toBeTruthy();
  });

  test("Entering the general and Performance tab", async ({ page }) => {
    await loginPage.waitForSelector(
      '//span[contains(text(), "Bo Admin")]',
      10000
    );
    await dashboardPage.navigateAndVerify("Dashboards", "dashboard/view");

    const secondTitle = await page.locator("text=General");
    await expect(secondTitle).toContainText("General");
    expect(page).toHaveURL("https://bo-dev.rodradar.com/dashboard/view");
    // dashboardPage.clickAllInteractiveElements()
    // console.log(dashboardPage.clickAllInteractiveElements()+' '+"ran and it's ok")
    await page.click('//span[contains(text(), "Performance")]');

    const thirdTitle = page.locator("text = Performance");
    //*[@id="2"]/section/div[1]/header/div/div/h2
    await expect(thirdTitle).toContainText("Performance");
    expect(page).toHaveURL("https://bo-dev.rodradar.com/dashboard/performance");
  });

  test("Verify menu link titles", async () => {
    await loginPage.waitForSelector(
      '//span[contains(text(), "Bo Admin")]',
      10000
    );
    await dashboardPage.checkLinksAndTitles([
      { text: "Dashboard", expectedTitle: "Bo Admin" },
      { text: "Organizations", expectedTitle: "Organizations" },
      { text: "Users", expectedTitle: "Users" },
      { text: "Units", expectedTitle: "Units" },
      { text: "Scans", expectedTitle: "Scans" },
      { text: "Errors Log", expectedTitle: "Errors Log" },
      { text: "Inventory", expectedTitle: "Inventory" },
      { text: "Versions", expectedTitle: "Versions" },
      { text: "Reports", expectedTitle: "Reports" },
      { text: "Trainings", expectedTitle: "Trainings" },
      { text: "Alerts", expectedTitle: "Alerts" },
      { text: "Support Calls", expectedTitle: "Support Calls" },
    ]);
    console.log("---->Test was completed");
  });

  test("Create new bucket", async ({ page }) => {
    await loginPage.waitForSelector(
      '//span[contains(text(), "Bo Admin")]',
      10000
    );
    console.log("dashboard?");

    await page.getByText("Organizations").click();
    await page.click('button[label= "');
    await page.pause();
  });
});
