import { test, expect } from '@playwright/test';

test.describe('Public Pages Tests', () => {

  test('Home page loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Optic Glass/);
  });

  test('Home page has navigation menu', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('Glasses page loads', async ({ page }) => {
    await page.goto('/glasses');
    await expect(page.locator('body')).toBeVisible();
  });

  test('Sunglasses page loads', async ({ page }) => {
    await page.goto('/sunglasses');
    await expect(page.locator('body')).toBeVisible();
  });

  test('Contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('body')).toBeVisible();
  });

  test('About page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('body')).toBeVisible();
  });

  test('Brands page loads', async ({ page }) => {
    await page.goto('/brands');
    await expect(page.locator('body')).toBeVisible();
  });

  test('FAQ page loads', async ({ page }) => {
    await page.goto('/faq');
    await expect(page.locator('body')).toBeVisible();
  });

  test('Auth page loads', async ({ page }) => {
    await page.goto('/auth');
    await expect(page.locator('body')).toBeVisible();
  });

  test('Cart page loads', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.locator('body')).toBeVisible();
  });

});
