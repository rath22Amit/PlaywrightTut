import {test, expect} from '@playwright/test';
import config from '../ownconfig.config';

test("UI Controls", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Login Page
    const username_field = page.locator("#username");
    const password_field = page.locator("[name='password']");
    const role_drowpdown = page.locator("select.form-control");
    const admin_role_radio_button = page.locator("span.checkmark").first();
    const user_role_radio_button = page.locator("span.checkmark").nth(1);
    const signIn_button = page.locator("#signInBtn");
    //UI Popup
    const ui_popup = page.locator(".modal-body");
    const ui_popup_text = page.locator(".modal-body p");
    const ui_popup_okBtn = page.locator("#okayBtn");
    const ui_popup_cancelBtn = page.locator("#cancelBtn");
    const document_link = page.locator("[href*='techsmarthire.com']");

    await expect(document_link).toHaveAttribute("class", "blinkingText");

    await username_field.fill("rahulshettyacademy");
    await password_field.fill("Learning@830$3mK2");
    await user_role_radio_button.click();
    await expect(user_role_radio_button).toBeChecked();
    await ui_popup.isVisible();
    await expect(ui_popup_text).toContainText("You will be limited to only fewer functionalities of the app. Proceed?")
    await ui_popup_okBtn.click();
    await role_drowpdown.selectOption("consult");
    await expect(role_drowpdown).toHaveValue("consult");

    await signIn_button.click();
    
    await expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop");

})
