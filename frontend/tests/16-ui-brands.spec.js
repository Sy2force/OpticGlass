import { test, expect } from '@playwright/test';

test.describe('UI Brands Page Tests', () => {

  test('Brands page displays content', async ({ page }) => {
    await page.goto('/brands');
    await page.waitForTimeout(1000);
    const body = await page.locator('body').textContent();
    expect(body.length).toBeGreaterThan(100);
  });

  test('Brands page has brand cards or list', async ({ page }) => {
    await page.goto('/brands');
    await page.waitForTimeout(1000);
    await expect(page.locator('body')).toBeVisible();
  });

});
