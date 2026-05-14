import {test, expect} from '@playwright/test';

test("Special Locators", async({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    const name_input = page.locator("div.form-group input[name='name']");
    const email_input = page.locator("div.form-group input[name='email']");
    const password = page.getByPlaceholder("Password");
    const first_checkbox = page.getByLabel("Check me out if you Love IceCreams!");
    const gender_dropdown = page.getByLabel("Gender");
    const employement_status_employed = page.getByLabel("Employed");
    const employement_status_student = page.getByLabel("Student");
    
    await name_input.fill("Test User");
    await email_input.fill("k@test.com");
    await password.fill("Welcome@123");
    await first_checkbox.check();
    await gender_dropdown.selectOption("Female");
    await employement_status_employed.check();

    await page.getByRole("button", {name: "Submit"}).click();
    
    await page.getByRole("link", {name: "Shop"}).click();
    await page.waitForTimeout(2000);
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();
    
})
