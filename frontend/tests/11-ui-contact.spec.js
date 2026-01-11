import { test, expect } from '@playwright/test';

test.describe('UI Contact Tests', () => {

  test('Contact page has form fields', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForTimeout(1000);
    const inputs = page.locator('input');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Contact page has submit button', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForTimeout(1000);
    const submitBtn = page.locator('button[type="submit"]');
    const count = await submitBtn.count();
    expect(count).toBeGreaterThan(0);
  });

});
