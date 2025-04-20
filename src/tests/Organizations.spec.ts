import { Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { Dashboardpage } from "../pages/dashboardPage";
import { faker } from "@faker-js/faker";

let loginPage: LoginPage;
let dashboardPage: Dashboardpage;
let orgName: string;

// test.describe.only("Dashboard testing", () => {

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new Dashboardpage(page);
  
    await loginPage.navigateToLogin();
    
    await loginPage.login("boadmin@rodradar.com", "Abcd1234");

});
  test("Enter Organizations page", async () => {
    // await loginPage.navigateToLogin();
    // await loginPage.login("boadmin@rodradar.com", "Abcd1234");
    await dashboardPage.navigateAndVerify('Organizations','organizations/bucket-manufacture')
});

  test("Search for a Bucket Manufacture", async ({ page }) => {
  // await loginPage.navigateToLogin();
  // await loginPage.login("boadmin@rodradar.com", "Abcd1234");
  await dashboardPage.navigateAndVerify('Organizations','organizations/bucket-manufacture')



})

  test("Search for a Bucket Manufacture2", async ({ page }) => {
    // await loginPage.navigateToLogin();
    // await loginPage.login("boadmin@rodradar.com", "Abcd1234");
    await dashboardPage.navigateAndVerify('Organizations','organizations/bucket-manufacture')

    const randomRow = Math.floor(Math.random() * 10) + 1
    await page.locator('//input[@id="SearchBox-label"]')
})

  test("Add new organization", async ({ page }) => {
    await dashboardPage.navigateAndVerify('Organizations','organizations/bucket-manufacture')
    
    // Click add new organization button
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Add bucket manufacture' }).click();
    
    // Generate and store organization details
    orgName = faker.company.name();
    const cleanName = orgName.replace(/[^a-zA-Z\s]/g, '');
    const phoneNumber = faker.phone.number();
    
    // Fill organization details
    await page.getByRole('textbox', { name: 'Bucket Manufacture Name' }).fill(cleanName);
    await page.getByRole('textbox', { name: 'Phone Number' }).fill(phoneNumber);
    
    // Save the organization
    await page.getByRole('button', { name: 'Save' }).click();
    
    // Verify organization was added
    await expect(page.locator(`text=${cleanName}`)).toBeVisible();
  });

  test.only("Filter organizations by status", async ({ page }) => {
    await dashboardPage.navigateAndVerify('Organizations','organizations/bucket-manufacture')
    
    // בחירת סטטוס מסוים מהפילטר
    await page.locator('select[name="status"]').selectOption('active');
    
    // אימות שכל הארגונים המוצגים הם פעילים
    const organizations = page.locator('table tbody tr');
    const count = await organizations.count();
    
    for (let i = 0; i < count; i++) {
      const statusCell = organizations.nth(i).locator('td:last-child');
      await expect(statusCell).toHaveText('Active');
    }
  });

  test("Edit an existing organization", async ({ page }) => {
    await dashboardPage.navigateAndVerify('Organizations','organizations/bucket-manufacture');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Wait for the table to be visible
    await page.waitForSelector('table', { state: 'visible' });
    
    const cleanOriginalName = orgName.replace(/[^a-zA-Z\s]/g, '');
    const updatedName = `Updated ${cleanOriginalName}`;
    const updatedPhone = faker.phone.number();
    
    // Find and click the row with the original organization name
    await page.locator(`tr:has-text("${cleanOriginalName}")`).click();
    
    // Check if edit button is enabled and click it
    const editButton = page.getByRole('button', { name: 'Edit bucket manufacture' });
    await expect(editButton).toBeEnabled();
    await editButton.click();
    
    // Wait for input fields to be editable
    await page.waitForSelector('input[name="name"]', { state: 'visible' });
    
    // Edit organization details
    await page.getByRole('textbox', { name: 'Bucket Manufacture Name' }).fill(updatedName);
    await page.getByRole('textbox', { name: 'Phone Number' }).fill(updatedPhone);
    
    // Save changes
    await page.getByRole('button', { name: 'Save' }).click();
    
    // Wait for save operation to complete
    await page.waitForLoadState('networkidle');
    
    // Verify changes in the table
    const updatedRow = page.locator('tr').filter({ hasText: updatedName });
    await expect(updatedRow).toBeVisible();
    await expect(updatedRow).toContainText(updatedName);
  });

  test("Delete an organization", async ({ page }) => {
    await dashboardPage.navigateAndVerify('Organizations','organizations/bucket-manufacture');
    
    // Select an existing organization
    await page.locator('text=Updated Organization').click();
    
    // Delete the organization
    await page.locator('button:has-text("Delete")').click();
    
    // Confirm deletion
    await page.locator('button:has-text("Confirm")').click();
    
    // Verify deletion
    await expect(page.locator('text=Updated Organization')).not.toBeVisible();
  });

  test("Export organizations data", async ({ page }) => {
    await dashboardPage.navigateAndVerify('Organizations','organizations/bucket-manufacture');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Click on Export Data button
    const exportButton = page.getByRole('button', { name: 'Export Data' });
    await expect(exportButton).toBeEnabled();
    await exportButton.click();
    
    // Wait for the download to start
    const downloadPromise = page.waitForEvent('download');
    await downloadPromise;
    
    // Verify download started
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.csv');
  });
// })
