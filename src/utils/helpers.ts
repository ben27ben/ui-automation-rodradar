import { param } from "jquery";
import { Locator } from "playwright";

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

