import { test, expect } from '@playwright/test';
import { fillMandatoryFields, createItemsForTab } from '../utils/helpers';
import { allure } from 'allure-playwright';
import { LoginPage } from '../pages/loginPage';

let loginPage: LoginPage;


test('Inventory item creation', async ({ page }) => {
  // Login
  await page.goto('https://bo-dev.rodradar.com');
  await page.fill('input[type="email"],input[name="email"]', 'boadmin@rodradar.com');
  await page.fill('input[type="password"],input[name="password"]', 'Abcd1234');
  await page.click('button[type="submit"],button:has-text("Login"),button:has-text("Sign In")');

  // Wait for a known element after login (sidebar Inventory link)
  await page.waitForSelector('a[href="/inventory"]', { timeout: 15000 });

  // Go directly to the Inventory Items page
  await page.goto('https://bo-dev.rodradar.com/inventory/items');
  await createItemsForTab(page, 'inventory');
}); 
test.only('Inventory assembly creation', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.login('boadmin@rodradar.com', 'Abcd1234');
  await page.waitForSelector('a[href="/inventory"]', { timeout: 15000 });
  await page.goto('https://bo-dev.rodradar.com/inventory/items');
  const assemblyTab = page.locator('(//div[@class="css-196jhrr"])[2]');
  await assemblyTab.waitFor({ timeout: 15000 });
  await assemblyTab.click();
  await page.getByRole('button', { name: 'Add assembly' }).click();;
  await page.locator('section').filter({ hasText: 'Manufacture P/N *Manufacture' }).getByRole('button').click();
  await page.getByRole('option', { name: 'ROD-A100-' }).click();
  await page.locator('//div[contains(@class, "MuiOutlinedInput-input") and contains(@class, "css-1oni2mo")]').click();
  await page.locator('//li[(@data-value="1")]').click();

});