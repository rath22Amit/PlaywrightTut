import {test, expect} from '@playwright/test';

test("Identifying Multiple Locators", async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Login Page
    const username_field = page.locator("#username");
    const password_field = page.locator("[name='password']");
    const signIn_button = page.locator("#signInBtn");

    await username_field.fill("rahulshettyacademy");
    await password_field.fill("Learning@830$3mK2");
    await signIn_button.click();
    await expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop");

    //Product Dashboard Page 
    const product_title= page.locator('.card-title a');
    const product_titles_count = await product_title.count();

    //Extracting all the details of the products and printing them in console
    for( let i=0; i<product_titles_count ; i++){
        console.log(await product_title.locator('nth ='+i ).textContent());
    }


})