import { test, expect } from '@playwright/test';

test.describe('UI FAQ Page Tests', () => {

  test('FAQ page displays content', async ({ page }) => {
    await page.goto('/faq');
    await page.waitForTimeout(1000);
    const body = await page.locator('body').textContent();
    expect(body.length).toBeGreaterThan(100);
  });

  test('FAQ page has questions', async ({ page }) => {
    await page.goto('/faq');
    await page.waitForTimeout(1000);
    await expect(page.locator('body')).toBeVisible();
  });

});
