import {test, expect} from '@playwright/test';

test.only("Child Window Handle", async({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const document_link = page.locator("[href='https://rahulshettyacademy.com/documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        document_link.click(),
    ]);
    
    console.log(await newPage.title());
    await expect(newPage).toHaveTitle("RS Academy");
})