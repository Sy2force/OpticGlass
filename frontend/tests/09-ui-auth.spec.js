import { test, expect } from '@playwright/test';

test.describe('UI Authentication Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('Auth page has Sign In and Sign Up tabs', async ({ page }) => {
    await page.goto('/auth');
    await expect(page.locator('button:has-text("Sign In")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Sign Up")').first()).toBeVisible();
  });

  test('Sign In form has email and password fields', async ({ page }) => {
    await page.goto('/auth');
    await page.click('button:has-text("Sign In")');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('Sign Up form has all required fields', async ({ page }) => {
    await page.goto('/auth');
    // Default is Sign Up
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

});
