import { test as base, expect } from '@playwright/test';
import LoginPage from '../page/LoginPage';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.login();
        await use(loginPage);

        // Expect to be redirected to the dashboard
        await expect(page).toHaveURL('https://rcsi-tst.avotech.com/');

        // Expect a welcome message to be visible
        await expect(page.getByText('Welcome to RCSI Platform')).toBeVisible();
    },
});

export { expect };
