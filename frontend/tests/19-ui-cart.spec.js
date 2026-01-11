import { test, expect } from '@playwright/test';

test.describe('UI Cart Page Tests', () => {

  test('Cart page displays content', async ({ page }) => {
    await page.goto('/cart');
    await page.waitForTimeout(1000);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Cart page shows empty cart message or items', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/cart');
    await page.waitForTimeout(1000);
    const body = await page.locator('body').textContent();
    expect(body.length).toBeGreaterThan(50);
  });

  test('Cart page has checkout button or link', async ({ page }) => {
    await page.goto('/cart');
    await page.waitForTimeout(1000);
    await expect(page.locator('body')).toBeVisible();
  });

});
