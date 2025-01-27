/**
* Class for describing Login Page in app
 */
import { Page, Locator } from 'playwright';


export class LoginPage {
    readonly page: Page;
    //Login page elements
    readonly userNameInputField: Locator;
    readonly passwordInputField: Locator;
    readonly loginButton: Locator;
    //error messages
    readonly errorMessageContainer: Locator;
    readonly errorMessageInvalidCredentials: string;
    readonly errorMessageEmptyUsername: string;
    readonly errorMessageEmptyPassword: string;
    readonly errorMessageLockedOutUser: string;

    constructor(page: Page) {
        this.page = page;
        //Project page elements
        this.userNameInputField = this.page.locator('[data-test="username"]');
        this.passwordInputField = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.locator('[data-test="login-button"]');
        //error messages
        this.errorMessageContainer = this.page.locator('[data-test="error"]');
        //INVALID USERNAME and INVALID PASSWORD message
        this.errorMessageInvalidCredentials = "Epic sadface: Username and password do not match any user in this service";
        //EMPTY FIELDS MESSAGE:
        this.errorMessageEmptyUsername = "Epic sadface: Username is required";
        //EMPTY PASSWORD MESSAGE:
        this.errorMessageEmptyPassword = "Epic sadface: Password is required";
        //LOCKED OUT USER MESSAGE:
        this.errorMessageLockedOutUser = "Epic sadface: Sorry, this user has been locked out.";
    }

    /**
     * Fills in the login form with valid credentials
     * 
     */
    async fillInLoginForm(userName: string, password: string) {
        await this.userNameInputField.click();
        await this.userNameInputField.fill(userName);
        await this.passwordInputField.click();
        await this.passwordInputField.fill(password);
    }
}
