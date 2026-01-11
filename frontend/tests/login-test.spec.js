import { test, expect } from '@playwright/test';

test.describe('Login Flow Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('Admin login redirects to admin dashboard', async ({ page }) => {
    await page.goto('/auth?mode=login');
    
    // Click Sign In tab to make sure we're on login form
    await page.click('button:has-text("Sign In")');
    await page.waitForTimeout(500);
    
    // Fill login form
    await page.fill('input[name="email"]', 'admin@opticglass.com');
    await page.fill('input[name="password"]', 'Admin123!');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Wait for redirect to admin
    await page.waitForURL('**/admin**', { timeout: 10000 });
    expect(page.url()).toContain('/admin');
  });

  test('User login redirects to user dashboard', async ({ page }) => {
    await page.goto('/auth?mode=login');
    
    // Click Sign In tab
    await page.click('button:has-text("Sign In")');
    await page.waitForTimeout(500);
    
    // Fill login form
    await page.fill('input[name="email"]', 'shay@gmail.com');
    await page.fill('input[name="password"]', 'Test1234!');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Wait for redirect to user dashboard
    await page.waitForURL('**/user/dashboard**', { timeout: 10000 });
    expect(page.url()).toContain('/user/dashboard');
  });

});
