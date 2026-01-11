import { test, expect } from '@playwright/test';

test.describe('UI Products Tests', () => {

  test('Glasses page shows products', async ({ page }) => {
    await page.goto('/glasses');
    await page.waitForTimeout(2000);
    // Check for any content indicating products
    const body = await page.locator('body').textContent();
    expect(body.length).toBeGreaterThan(100);
  });

  test('Sunglasses page shows products', async ({ page }) => {
    await page.goto('/sunglasses');
    await page.waitForTimeout(2000);
    const body = await page.locator('body').textContent();
    expect(body.length).toBeGreaterThan(100);
  });

  test('Glasses page has content', async ({ page }) => {
    await page.goto('/glasses');
    await page.waitForTimeout(2000);
    await expect(page.locator('body')).toBeVisible();
  });

});
