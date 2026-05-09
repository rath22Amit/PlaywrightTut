import {test, expect} from '@playwright/test';

test("Trying to Login with Invalid credentials", async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username_field = page.locator("#username");
    const password_field = page.locator("[name='password']");
    const signIn_button = page.locator("#signInBtn");
    const error_message = page.locator("[style*='block']");

    await username_field.fill("amitRath");
    await password_field.fill("abc123");
    await signIn_button.click();
    await error_message.isVisible();
    console.log(await error_message.textContent()); 
    await expect(error_message).toContainText("Incorrect username/password.");  

}
)