import { test, expect } from '@playwright/test';

test.describe('UI Footer Tests', () => {

  test('Footer is present on home page', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('Footer has contact information', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    const text = await footer.textContent();
    expect(text.length).toBeGreaterThan(50);
  });

});
