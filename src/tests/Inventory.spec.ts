import { test, expect } from '@playwright/test';
import { fillMandatoryFields, createItemsForTab } from '../utils/helpers';
import { allure } from 'allure-playwright';

test.only('Inventory item creation automation', async ({ page }) => {
  // Login
  await page.goto('https://bo-dev.rodradar.com');
  await page.fill('input[type="email"],input[name="email"]', 'boadmin@rodradar.com');
  await page.fill('input[type="password"],input[name="password"]', 'Abcd1234');
  await page.click('button[type="submit"],button:has-text("Login"),button:has-text("Sign In")');

  // Wait for a known element after login (sidebar Inventory link)
  await page.waitForSelector('a[href="/inventory"]', { timeout: 15000 });

  // Go directly to the Inventory Items page
  await page.goto('https://bo-dev.rodradar.com/inventory/items');

  // Check for select[name="itemType"] option
  // const itemTypeOptions = await page.$$('select[name="itemType"] option');
  // console.log('Number of itemType options:', itemTypeOptions.length);

  // // Check required fields
  // const requiredInputs = await page.$$('input[required], select[required], textarea[required], [aria-required="true"]');
  // console.log('Number of required fields:', requiredInputs.length);
  // for (const input of requiredInputs) {
  //   const tag = await input.evaluate((el: HTMLElement) => el.tagName.toLowerCase());
  //   console.log('Required field tag:', tag);
  // }
  // await page.pause();

  // Inventory
  await createItemsForTab(page, 'inventory');
}); 