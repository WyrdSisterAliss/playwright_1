import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';
import { TestDataHelper } from '../utils/TestDataHelper';


const userName = process.env.STANDARD_USER as string;
const password = process.env.USER_PASSWORD as string;

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('Login Functionality', () => {

    test('login with valid credentials', async ({ page }) => {
        const pm = new PageManager(page);
        //filling the form and click login button
        await pm.onLoginPage().fillInLoginForm(userName, password);
        await pm.onLoginPage().loginButton.click();
        //validate the logout button is visible in side menu
        await pm.onNavigationPage().openSideMenu();
        await expect(
            pm.onNavigationPage().logOutMenuOption,
            "Expect Logout option to be visible in side menu after login")
            .toBeVisible();
    });

    test('login with invalid credentials', async ({ page }) => {
        const pm = new PageManager(page);
        const helper = new TestDataHelper();
        //generate random email and password
        const userName = helper.getRandomUsername();
        const password = helper.getRandomValidPassword(10);
        //filling the form and click login button
        await pm.onLoginPage().fillInLoginForm(userName, password);
        await pm.onLoginPage().loginButton.click();
        //Assert the error container is visible
        const errorMessage = pm.onLoginPage().errorMessageInvalidCredentials;
        const errorMessageContainer = await pm.onLoginPage().errorMessageContainer.textContent();
        await expect(
            pm.onLoginPage().errorMessageContainer,
            "Expect error is visible after Login with invalid credentials")
            .toBeVisible();
        //Verify the error message
        expect(
            errorMessage,
            "Expect to have right error message for this case").
            toBe(errorMessage);
    });

    test('locked out user cannot login', async ({ page }) => {
        const pm = new PageManager(page);
        //filling the form and click login button
        const lockedOutUserUsername = process.env.LOCKED_OUT_USER as string;
        await pm.onLoginPage().fillInLoginForm(lockedOutUserUsername, password);
        await pm.onLoginPage().loginButton.click();
        //validate error message
        const expectedErrorMessage = pm.onLoginPage().errorMessageLockedOutUser;
        const errorMessage = await pm.onLoginPage().errorMessageContainer.textContent();
        expect(
            errorMessage,
            "Expect to have right error message for this case").
            toBe(expectedErrorMessage);
    });
});

test.describe('Login Form Validation', () => {
    const helper = new TestDataHelper();
    // Test data for form validation
    const testData = [
        {
            usecase: "Invalid password",
            username: process.env.STANDARD_USER as string,
            password: helper.getRandomValidPassword(3),
            expectedErrorMessage: "Epic sadface: Username and password do not match any user in this service"
        },
        {
            usecase: "Invalid username",
            username: helper.getRandomUsername(),
            password: process.env.USER_PASSWORD as string,
            expectedErrorMessage: "Epic sadface: Username and password do not match any user in this service"
        },
        {
            usecase: "Empty password field",
            username: process.env.STANDARD_USER as string,
            password: "",
            expectedErrorMessage: "Epic sadface: Password is required"
        },
        {
            usecase: "Empty username field",
            username: "",
            password: process.env.USER_PASSWORD as string,
            expectedErrorMessage: "Epic sadface: Username is required"
        },
        {
            usecase: "Both fields empty",
            username: "",
            password: "",
            expectedErrorMessage: "Epic sadface: Username is required"
        },
    ];

    for (const { usecase, username, password, expectedErrorMessage } of testData) {
        test(`Case: ${usecase} should display correct error message.`,
            async ({ page }) => {
                const pm = new PageManager(page);
                //Enter username and password from testData object
                await pm.onLoginPage().fillInLoginForm(username, password);
                //Login button click
                await pm.onLoginPage().loginButton.click();
                //Assert the error message for each case
                const errorMessage = await pm.onLoginPage().errorMessageContainer.textContent();
                expect(
                    errorMessage,
                    "Expect to have right error message for this case").
                    toBe(expectedErrorMessage);
            });
    }
});
