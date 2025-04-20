import { PlaywrightTestConfig } from "playwright/test";
import { defineConfig } from "playwright/test";

export default defineConfig({
    testDir: 'src/tests',
    timeout: 20000,
    retries: 0,
    use: {
        headless: false,
        screenshot: 'off',
        video: 'off',
        baseURL: 'https://bo-dev.rodradar.com/',
    },
    projects:[
        {
            name: 'Chromium',
            use: {browserName: 'chromium'}
        }
    ]
})
//run the project on chrome
//npx playwright test --project=Chromium

//Create a report for the test run
//npx playwright test --project=Chromium --reporter=html
