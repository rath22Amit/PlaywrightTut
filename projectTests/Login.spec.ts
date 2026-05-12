import {test,expect} from '@playwright/test';

test("End To End Test for E-commerce site", async({browser}) =>{
    const context = await browser.newContext();
    const page= await context.newPage();

    const username_field = page.locator("#userEmail");
    const password_field = page.locator("#userPassword");
    const loginButton = page.locator("#login");

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await username_field.fill("testhero07@gmail.com");
    await password_field.fill("Welcome@123");
    await loginButton.click(); 

    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");

    const product_title = page.locator(".container .row div.card h5 b");
    const product_names= await product_title.allTextContents();
    console.log(product_names);

    expect(product_names).toContain("ZARA COAT 3");

    //Adding the product to the cart
    const addToCart_button_ZARACOAT3 =page.locator(".container .row div.card").filter({ hasText: "ZARA COAT 3" }).locator("button:last-child");
    const addToCart_button_iPhone = page.locator(".container .row div.card").filter({ hasText: "IPHONE 13 PRO" }).locator("button:last-child");
    const addToCard_button_AdidasOriginals = page.locator(".container .row div.card").filter({ hasText: "ADIDAS ORIGINAL" }).locator("button:last-child");

    await addToCart_button_ZARACOAT3.click();
    await addToCart_button_iPhone.click();
   
    await page.waitForLoadState("networkidle");

    //Go to the cart page
    const cartButton = page.locator("button[routerlink='/dashboard/cart']");
    await cartButton.click();
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/cart");
    await page.waitForSelector(".cartSection h3");

    //Verify the product is added to the cart
    const cartProduct_title = page.locator(".cartSection h3");
    const cartProduct_title_count = await cartProduct_title.count();
    console.log(cartProduct_title_count);

    const cartProduct_names = await cartProduct_title.allTextContents();
    console.log(cartProduct_names);
    expect(cartProduct_names).toContain("ZARA COAT 3");
    expect(cartProduct_names).toContain("iphone 13 pro");

    //Go to the Checkout Page
    const checkoutButton = page.locator("div.subtotal button");
    await checkoutButton.click();
    await page.waitForLoadState("networkidle");

    const payment_method = page.locator("div.payment__types");
    await expect(payment_method).toBeVisible();
    await page.pause();

})