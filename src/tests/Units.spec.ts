import { test, expect } from '@playwright/test';

// Helper function to generate a unique unit name
function generateUnitName() {
  return `AutoTestUnit_${Date.now()}`;
}

test.describe('Units Management', () => {
  test('should create and delete a unit', async ({ page }) => {
    const unitName = generateUnitName();

    // 1. Log in (replace with your actual login steps)
    await page.goto('YOUR_LOGIN_URL');
    await page.fill('input[name="username"]', 'YOUR_USERNAME');
    await page.fill('input[name="password"]', 'YOUR_PASSWORD');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // 2. Navigate to Units page
    await page.click('a[href="/devices"]:has-text("Units"), a:has-text("Units")');
    await page.waitForSelector('table');

    // 3. Click "Add Unit" button (update selector as needed)
    await page.click('button:has-text("Add Unit"), button[aria-label*="Add"]');

    // 4. Fill in unit details (update selectors as needed)
    await page.fill('input[name="unitName"]', unitName);
    // Add other required fields here
    await page.click('button:has-text("Create"), button[aria-label*="Create"]');

    // 5. Verify unit appears in the list
    await expect(page.locator(`tr:has(td:has-text('${unitName}'))`)).toBeVisible();

    // 6. Delete the unit
    await page.hover(`tr:has(td:has-text('${unitName}'))`);
    await page.click(`tr:has(td:has-text('${unitName}')) button[aria-label*='Delete']`);
    await page.click('button:has-text("Delete"), button[aria-label*="Delete"]'); // Confirm in dialog

    // 7. Verify unit is deleted
    await expect(page.locator(`tr:has(td:has-text('${unitName}'))`)).not.toBeVisible();
  });
}); 