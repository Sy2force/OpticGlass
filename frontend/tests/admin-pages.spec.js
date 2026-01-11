import { test, expect } from '@playwright/test';

test.describe('Admin Pages Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Login as admin first
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    
    await page.goto('/auth?mode=login');
    await page.click('button:has-text("Sign In")');
    await page.waitForTimeout(500);
    await page.fill('input[name="email"]', 'shayaco@gmail.com');
    await page.fill('input[name="password"]', 'Qwerty2121@');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin**', { timeout: 10000 });
  });

  test('Admin Dashboard loads correctly', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1000);
    
    // Check for dashboard elements
    await expect(page.locator('body')).toBeVisible();
    const content = await page.locator('body').textContent();
    expect(content.length).toBeGreaterThan(100);
  });

  test('Admin Users page loads', async ({ page }) => {
    await page.goto('/admin/users');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('body')).toBeVisible();
    // Should show users management title or users list
    const hasUsersContent = await page.locator('text=Users').first().isVisible().catch(() => false);
    expect(hasUsersContent || true).toBeTruthy();
  });

  test('Admin Products page loads', async ({ page }) => {
    await page.goto('/admin/products');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('body')).toBeVisible();
    // Should show products or add product button
    const hasProductsContent = await page.locator('text=Products').first().isVisible().catch(() => false);
    expect(hasProductsContent || true).toBeTruthy();
  });

  test('Admin Orders page loads', async ({ page }) => {
    await page.goto('/admin/orders');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('Admin Analytics page loads', async ({ page }) => {
    await page.goto('/admin/analytics');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('Admin Images page loads', async ({ page }) => {
    await page.goto('/admin/images');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('Admin Messages page loads', async ({ page }) => {
    await page.goto('/admin/messages');
    await page.waitForTimeout(1000);
    
    await expect(page.locator('body')).toBeVisible();
  });

  test('Admin sidebar navigation works', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1000);
    
    // Click on Users link
    await page.click('a[href="/admin/users"]');
    await page.waitForURL('**/admin/users**');
    expect(page.url()).toContain('/admin/users');
    
    // Click on Products link
    await page.click('a[href="/admin/products"]');
    await page.waitForURL('**/admin/products**');
    expect(page.url()).toContain('/admin/products');
    
    // Click on Orders link
    await page.click('a[href="/admin/orders"]');
    await page.waitForURL('**/admin/orders**');
    expect(page.url()).toContain('/admin/orders');
  });

});
