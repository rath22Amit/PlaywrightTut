import {test, expect} from '@playwright/test';
import config from '../ownconfig.config';

test("First playwright Test", async ({browser}) => {
    
    // Create a new browser context and page
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the desired URL
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //get the title of the page
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    
} )



