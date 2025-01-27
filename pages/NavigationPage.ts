/**
 * Class for navigation through the app
 * This class contains methods to navigate to different pages
 */
import { Page, Locator } from '@playwright/test';

export class NavigationPage {

    private readonly page: Page;
    //side menu buttons
    readonly sideMenuBurgerBtn: Locator;
    readonly closeMenuBtn: Locator;
    //side menu options
    readonly logOutMenuOption: Locator;
    readonly aboutMenuOption: Locator;
    readonly aboutRedirectUrl: string;


    constructor(page: Page) {
        this.page = page;
        //side menu buttons
        this.sideMenuBurgerBtn = this.page.getByRole('button', { name: 'Open Menu' });
        this.closeMenuBtn = this.page.getByRole('button', { name: 'Close Menu' });
        this.logOutMenuOption = this.page.locator('[data-test="logout-sidebar-link"]');
        this.aboutMenuOption = this.page.locator('[data-test="about-sidebar-link"]');
        this.aboutRedirectUrl = 'https://saucelabs.com/';
    }

    /**
     * Opens side menu if it is not already open
     */
    async openSideMenu() {
        // Check if the side menu is already open by checking if the close menu button is visible
        const isMenuOpen = await this.closeMenuBtn.isVisible();
        if (!isMenuOpen) {
            await this.sideMenuBurgerBtn.click();
        }
    }

    /**
     * Closes side menu if it is not already closed
     */
    async closeSideMenu() {
        // Check if the side menu is open by checking if the close menu button is visible
        const isMenuOpen = await this.closeMenuBtn.isVisible();
        if (isMenuOpen) {
            await this.closeMenuBtn.click();
        }
    }

    /** 
     * Logs out from the app
     */
    async logOut() {
        await this.openSideMenu();
        await this.logOutMenuOption.click();
    }

    /**
     * Opens About page
     */
    async openAboutPage() {
        await this.openSideMenu();
        await this.aboutMenuOption.click();
    }
}
