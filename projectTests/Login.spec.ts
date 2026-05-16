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
    

    //Payment Option Page
    const CVV_field = page.locator(".form__cc div input").nth(1);
    const Name_on_card_field = page.locator(".form__cc div input").nth(2);
    const apply_coupon_field = page.locator(".form__cc div input").nth(3);
    const apply_coupon_button = page.locator("button[type='Submit']");
    const coupon_applied_message = page.locator("//p[contains(text(),'Coupon')]");
    const select_country = page.locator("input[placeholder='Select Country']");

    await CVV_field.fill("123");
    await Name_on_card_field.fill("Test Hero");
    await apply_coupon_field.fill("rahulshettyacademy");
    await apply_coupon_button.click();
    await expect(coupon_applied_message).toBeVisible();
    await expect(coupon_applied_message).toContainText("* Coupon Applied");
    await select_country.pressSequentially("india",{delay:500});
    await page.keyboard.press("ArrowDown"  ,{delay:1000});
    await page.keyboard.press("ArrowDown"  ,{delay:1000})
    await page.keyboard.press("Enter");

    //Clicking on the Place Order Button
    const place_order_button = page.locator("div.actions a");
    await place_order_button.click();
    await page.waitForLoadState("networkidle");

    //Verify the order is placed successfully
    const order_confirmation_message = page.locator("h1");
    await expect(order_confirmation_message).toBeVisible();
    await expect(order_confirmation_message).toHaveText(" Thankyou for the order. ");

    //Fetching the orderID
    const rawOrderIds = await page.locator(".em-spacer-1 label.ng-star-inserted").allTextContents();
    const my_order_ids = rawOrderIds.map(text => text.replace(/\|/g, "").trim());
  
    //Click on Order History and verify the order is present in the order history page
    const order_history_button = page.locator("button[routerlink='/dashboard/myorders']");
    const order_id= page.locator("label.ng-star-inserted");
    await order_history_button.click();
    await page.waitForLoadState("networkidle");

    //Validate the order is present in the order history page

    await page.waitForTimeout(2000);
    const order_history_id = await page.locator("tbody tr th").allTextContents();
    for(const id of my_order_ids){
        expect(order_history_id).toContain(id);
    }

    console.log("Order id verified in the order history page");

    
})