import { test, expect } from '@playwright/test';

test.describe('Protected Routes Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('Cart is accessible without login', async ({ page }) => {
    await page.goto('/cart');
    expect(page.url()).toContain('/cart');
  });

  test('Checkout redirects to auth when not logged in', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForURL('**/auth**', { timeout: 5000 });
    expect(page.url()).toContain('/auth');
  });

  test('User dashboard redirects to auth when not logged in', async ({ page }) => {
    await page.goto('/user/dashboard');
    await page.waitForURL('**/auth**', { timeout: 5000 });
    expect(page.url()).toContain('/auth');
  });

  test('Admin page redirects to auth when not logged in', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForURL('**/auth**', { timeout: 5000 });
    expect(page.url()).toContain('/auth');
  });

  test('Profile page redirects to auth when not logged in', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForURL('**/auth**', { timeout: 5000 });
    expect(page.url()).toContain('/auth');
  });

  test('Orders page redirects to auth when not logged in', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForURL('**/auth**', { timeout: 5000 });
    expect(page.url()).toContain('/auth');
  });

  test('Favorites page redirects to auth when not logged in', async ({ page }) => {
    await page.goto('/favorites');
    await page.waitForURL('**/auth**', { timeout: 5000 });
    expect(page.url()).toContain('/auth');
  });

});
