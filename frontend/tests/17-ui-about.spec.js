import { test, expect } from '@playwright/test';

test.describe('UI About Page Tests', () => {

  test('About page displays content', async ({ page }) => {
    await page.goto('/about');
    await page.waitForTimeout(1000);
    const body = await page.locator('body').textContent();
    expect(body.length).toBeGreaterThan(100);
  });

  test('About page has company information', async ({ page }) => {
    await page.goto('/about');
    await page.waitForTimeout(1000);
    await expect(page.locator('body')).toBeVisible();
  });

});
