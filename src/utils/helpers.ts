import { faker } from "@faker-js/faker";
import { param } from "jquery";
import { Locator, Page } from "playwright";

export const randomString = (length: number): string => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export async function waitForElement(
  locator: Locator,
  timeout: number = 5000
): Promise<void> {
  await locator.waitFor({ state: "visible", timeout });
}

// Utility to fill all required fields in the add item dialog
export async function fillMandatoryFields(page: Page) {
  // Find all required fields (assuming they have aria-required or required attribute)
  const requiredInputs = await page.$$('input[required], select[required], textarea[required], [aria-required="true"]');
  for (const input of requiredInputs) {
    const tag = await input.evaluate((el: HTMLElement) => el.tagName.toLowerCase());
    if (tag === 'input' || tag === 'textarea') {
      await input.fill('test'); // Insert a generic value
    } else if (tag === 'select') {
      const options = await input.$$('option');
      if (options.length > 1) {
        await input.selectOption({ index: 1 }); // Select the first non-default option
      }
    }
  }
}

// Helper to create items for a given tab (now expects to be on the correct page)
export async function createItemsForTab(page: Page, itemName: string) {
  // Find the plus (+) button by aria-label
  const addItemButton = page.locator('button[aria-label="Add item"]');
  
  // Wait for and click the add item button
  await addItemButton.waitFor({ state: 'visible', timeout: 10000 });
  await addItemButton.click();

  // Wait for the dialog to be fully loaded and the item type div to be visible
  const dropdownTrigger = page.locator('//div[contains(@class, "css-1oni2mo")]', { hasText: '' });
  await dropdownTrigger.waitFor({ state: 'visible', timeout: 10000 });
  await dropdownTrigger.click();

  // Wait for the listbox ul to be visible
  const listboxUl = page.locator('//ul[@role="listbox"]');
  await listboxUl.waitFor({ state: 'visible', timeout: 10000 });

  // Create a list of item locators
  const itemLocators = [
    await listboxUl.locator('li[data-value="DigitalCard"]'),
    await listboxUl.locator('li[data-value="Bucket"]'),
    await listboxUl.locator('li[data-value="RFCard"]'),
    await listboxUl.locator('li[data-value="Antenna"]'),
    await listboxUl.locator('li[data-value="Tablet"]'),
    await listboxUl.locator('li[data-value="PlatformKit"]'),
    await listboxUl.locator('li[data-value="MiniPC"]'),
    await listboxUl.locator('li[data-value="SystemCard"]'),
  ];

  // Only process items 0, 1, and 3
  const indicesToProcess = [0, 1, 3];
  for (const i of indicesToProcess) {
    const option = itemLocators[i];
    try {
      const optionText = await option.textContent();
      console.log(`Selecting item type: ${optionText}`);
      await option.click();
      await page.waitForTimeout(1000);

      // Fill Manufacture S/N
      const snSelector = '//input[@name="manufactureSerialNumber"]';
      if (await page.locator(snSelector).isVisible()) {
        await page.fill(snSelector, faker.string.alphanumeric(6));
        console.log(`Filled Manufacture S/N for ${optionText}`);
      }
      // Fill Manufacture P/N
      const pnSelector = page.locator('(//div[contains(@tabindex, "0") and contains(@class, "css-1oni2mo")])[2]');
      await pnSelector.click();
      if (await pnSelector.isVisible()) {
        const pnInput = page.locator('(//li[contains(@class, "MuiButtonBase-root") and contains(@class, "MuiMenuItem-gutters")])[2]');
        await pnInput.click();
        console.log(`Filled Manufacture P/N for ${optionText}`);
      }
      // Handle Manufacture Date (date picker)
      const dateBtnSelector = 'button[aria-label="Choose date"]';
      if (await page.locator(dateBtnSelector).isVisible()) {
        await page.click(dateBtnSelector);
        await page.waitForTimeout(500);
        const dateCell = page.locator('button[aria-current="date"]');
        if (await dateCell.isVisible()) {
          await dateCell.click();
          console.log(`Selected a date for ${optionText}`);
        }  
      }
      const addButton = page.locator('//button[@type="submit"]');
      await page.waitForTimeout(500);
      await addButton.click();

      // If there are more options, reopen the add item window and the dropdown listbox
      if (i !== indicesToProcess[indicesToProcess.length - 1]) {
        await addItemButton.click();
        await dropdownTrigger.waitFor({ state: 'visible', timeout: 10000 });
        await dropdownTrigger.click();
        await listboxUl.waitFor({ state: 'visible', timeout: 10000 });
      }
    } catch (e) {
      console.error(`Error processing option /${itemLocators.length}:`, e);
      // Try to close the dialog if it's stuck
      try {
        const closeButton = page.locator('button[aria-label="Close"]');
        if (await closeButton.isVisible()) {
          await closeButton.click();
        }
      } catch (closeError) {
        console.error('Failed to close dialog:', closeError);
      }
      if (i !== indicesToProcess[indicesToProcess.length - 1]) {
        const cancelBtn = await page.locator('//button[@text = "Cancel"]')
        await cancelBtn.click();
        await addItemButton.click();
        await dropdownTrigger.waitFor({ state: 'visible', timeout: 10000 });
        await dropdownTrigger.click();
        await listboxUl.waitFor({ state: 'visible', timeout: 10000 });
      }
      continue;
    }
  }
}

// just stuff that can be usefull
//create a locator with id
// const firstName:Locator = page.locator('id=input-firstName')
//create a locator with class
//  const firstName:Locator = page.locator('.input-firstName')
//  nameExist = await firstName.isEnabled()

//create a locator with text
//  const header:Locator = page.locator('text=Header Name')
// const headerExisted = await header.isEnabled()

//create a locator with css
//const email:Locator = page.locator('input#input-email')
//const telephone:Locator = page.locator('input[name="telephone"]')
//const checkbox:Locator = page.locator('input[type="checkbox"]')


//create a locator with xpath
// const element = page.locator('xpath=//button')

//Prevents the script from exiting(closing)
// await new Promise(() => {})

