import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

const userName = process.env.STANDARD_USER as string;
const password = process.env.USER_PASSWORD as string;

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test("User can Logout from the app", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.onLoginPage().fillInLoginForm(userName, password);
    await pm.onLoginPage().loginButton.click();
    await pm.onNavigationPage().openSideMenu();
    await pm.onNavigationPage().logOutMenuOption.click();
    await expect(
        pm.onLoginPage().loginButton,
        "Expect Login button to be visible after logout")
        .toBeVisible();
});

test("User can navigate to About page", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.onLoginPage().fillInLoginForm(userName, password);
    await pm.onLoginPage().loginButton.click();
    await pm.navigateTo().openAboutPage();

    // Verify the current URL 
    expect(page.url()).toBe(pm.onNavigationPage().aboutRedirectUrl);
});

test("Navigation bar is accessible throughout the app", async ({ page }) => {
    //array of pages to visit in app
    const pagesToVisit = [
        '/inventory.html',
        '/cart.html',
        '/checkout-step-one.html',
        '/checkout-step-two.html',
        '/checkout-complete.html',
        'inventory-item.html?id=1'
    ];
    const pm = new PageManager(page);
    await pm.onLoginPage().fillInLoginForm(userName, password);
    await pm.onLoginPage().loginButton.click();

    for (const pageUrl of pagesToVisit) {
        await page.goto(pageUrl);
        // Verify the burger menu button is visible on all pages
        await expect(
            pm.onNavigationPage().sideMenuBurgerBtn,
            `Expect sidemenu button to be visible on ${pageUrl} page`)
            .toBeVisible();
    }
});
