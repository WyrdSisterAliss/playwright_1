/**
 * Class for managing page objects
 */
import { Page } from '@playwright/test';
import { NavigationPage } from './NavigationPage';
import { LoginPage } from './LoginPage';


export class PageManager {
    private readonly page: Page;

    readonly navigationPage: NavigationPage;
    readonly loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.navigationPage = new NavigationPage(page);
    }

    /**
     * Returns navigation page object to call for naviagateTo methods
     * @returns {NavigationPage} returns the NavigationPage object
     * @example
     * const pm = new PageManager(page)
     * pm.onLoginPage().fillInLoginForm(userName, password);
     */
    navigateTo(): NavigationPage {
        return this.navigationPage;
    }

    /**
     * Returns LoginPage object to work with Login page
     * @returns {LoginPage} returns the LoginPage object
     */
    onLoginPage(): LoginPage {
        return this.loginPage;
    }

    /**
     * Returns NavigationPage object to work with Login page
     * @returns {NavigationPage} returns the NavigationPage object
     */
    onNavigationPage(): NavigationPage {
        return this.navigationPage;
    }
}
