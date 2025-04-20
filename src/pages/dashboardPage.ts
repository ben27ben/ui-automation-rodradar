import { Page, Locator } from "playwright";
import { expect } from "@playwright/test";
import { text } from "stream/consumers";
import { dashboardLocators } from "../locators/dashboardLocators";

export class Dashboardpage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isOnDashboard(): Promise<boolean> {
    const dashboardTitle = this.page.locator(dashboardLocators.dashboardTitle);
    await dashboardTitle.waitFor({ timeout: 7000 });
    return dashboardTitle.isVisible();
  }

  async isLoggedIn(userName: string): Promise<string | null> {
    const userElement = this.page.locator(dashboardLocators.boAdminText);
    if (await userElement.isVisible()) {
      return (await await userElement.textContent())?.trim() ?? null;
    }
    return null;
  }

  async isWidgetVisible(widgetName: string): Promise<boolean> {
    const widget = this.page.locator(`[data-testid = "${widgetName}"]`);
    return widget.isVisible();
  }

  async navigateAndVerify(buttontext: string, expectedEndPoint: string) {
    const buttonLocator = this.page.getByText(buttontext);
    await buttonLocator.click();
    // await expect(this.page).toHaveURL(expectedEndPoint);
    // await this.page.waitForSelector('h1', { state: 'visible', timeout: 10000 });
    // await expect(this.page.locator('h1')).toContainText('Bucket Manufactures', { timeout: 10000 });
  }

  async checkLinksAndTitles(links: { text: string; expectedTitle: string }[]) {
    await this.page.goto('https://bo-dev.rodradar.com/dashboard/view');

    for (const link of links) {
      const menuLink = this.page.locator(dashboardLocators.menuLinks[link.text.toLowerCase() as keyof typeof dashboardLocators.menuLinks]);
      await menuLink.click();
      await this.page.waitForLoadState("networkidle");
      const pageTitle = this.page.locator(
        `//span[text()="${link.expectedTitle}"]`
      ).nth(0);
      await expect(pageTitle).toBeVisible();
    }
  }

  async clickQuestionMarkIcon() {
    await this.page.locator(dashboardLocators.questionMarkIcon).click();
  }

  async clickTab(tabName: 'general' | 'performance') {
    await this.page.locator(dashboardLocators.tabs[tabName]).click();
  }

  async clickButton(buttonName: 'addNew' | 'save') {
    await this.page.locator(dashboardLocators.buttons[buttonName]).click();
  }
}
