// import { test, expect } from '../fixtures/login.fixture';

// test("creating package with valid credentials", async ({ page, loginPage }) => {

//     // Correct way to wait for network idle on the current page
//     await page.waitForLoadState('networkidle');
//     await page.locator('#b3-Sales_Billing2').getByText('Sales & Billing').click();
//     await page.locator('.columns-item').filter({hasText: 'Package Management'})

// });

import { test, expect } from '../fixtures/login.fixture';
import packageCreation from '../data/packageCreation.json';

test('creating package with valid credentials', async ({ page, loginPage }) => {
    test.setTimeout(180_000);

    const worker = process.env.TEST_WORKER_INDEX ?? 'w0';
    const packageName = `${packageCreation.packageDefaults.namePrefix}${Date.now()}-${worker}`;

    await page.getByText('Sales & Billing', { exact: true }).click();
    const packageManagementLink = page.getByRole('link', { name: 'Package Management' });
    await expect(packageManagementLink).toBeVisible();
    await packageManagementLink.click({ force: true });

    const addPackageButton = page.getByRole('button', { name: 'Add Package' });
    await expect(addPackageButton).toBeVisible({ timeout: 30_000 });
    await addPackageButton.click();

    await page.getByRole('textbox', { name: 'Package Name*' }).fill(packageName);

    await page.getByRole('combobox', { name: 'Select one or more options' }).click();
    await page
        .getByRole('option', {
            name: packageCreation.packageDefaults.salesPartner,
            exact: true,
        })
        .click();

    const moduleGrid = page.getByRole('grid');
    const checkboxes = moduleGrid.getByRole('checkbox');
    const checkboxCount = await checkboxes.count();
    expect(checkboxCount).toBeGreaterThan(0);
    for (let index = 0; index < checkboxCount; index += 1) {
        await checkboxes.nth(index).check();
    }

    const unitPriceInputs = moduleGrid.getByPlaceholder('Enter Unit Price');
    const unitPriceInputCount = await unitPriceInputs.count();
    expect(unitPriceInputCount).toBeGreaterThan(0);
    for (let index = 0; index < unitPriceInputCount; index += 1) {
        const input = unitPriceInputs.nth(index);
        await expect(input).toBeEnabled();
        await input.fill(String(packageCreation.packageDefaults.unitPricePerModule));
    }

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page).toHaveURL(/\/PackageList/, { timeout: 60_000 });
    await expect(page.getByRole('gridcell', { name: packageName })).toBeVisible({
        timeout: 60_000,
    });
});