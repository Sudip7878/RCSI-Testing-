import { test, expect } from '../fixtures/login.fixture';

test("creating package with valid credentials", async ({ page, loginPage }) => {

    // Correct way to wait for network idle on the current page
    await page.waitForLoadState('networkidle');
    await page.locator('#b3-Sales_Billing2').getByText('Sales & Billing').click();
    await page.locator('.columns-item').filter({hasText: 'Package Management'})

});
