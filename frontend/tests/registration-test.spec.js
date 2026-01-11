import { test, expect } from '@playwright/test';

test.describe('Registration & Login Flow Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('New user can register and access user dashboard', async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@example.com`;
    
    await page.goto('/auth');
    
    // Default is Sign Up form - fill it
    await page.fill('input[name="firstName"]', 'Nouveau');
    await page.fill('input[name="lastName"]', 'Utilisateur');
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', 'Test1234!');
    
    // Submit registration
    await page.click('button[type="submit"]');
    
    // Wait for redirect to user dashboard
    await page.waitForURL('**/user/dashboard**', { timeout: 10000 });
    expect(page.url()).toContain('/user/dashboard');
  });

  test('Admin shayaco@gmail.com can login and access admin dashboard', async ({ page }) => {
    await page.goto('/auth?mode=login');
    
    await page.click('button:has-text("Sign In")');
    await page.waitForTimeout(500);
    
    await page.fill('input[name="email"]', 'shayaco@gmail.com');
    await page.fill('input[name="password"]', 'Qwerty2121@');
    
    await page.click('button[type="submit"]');
    
    await page.waitForURL('**/admin**', { timeout: 10000 });
    expect(page.url()).toContain('/admin');
  });

  test('User shay@gmail.com can login and access user dashboard', async ({ page }) => {
    await page.goto('/auth?mode=login');
    
    await page.click('button:has-text("Sign In")');
    await page.waitForTimeout(500);
    
    await page.fill('input[name="email"]', 'shay@gmail.com');
    await page.fill('input[name="password"]', 'Test1234!');
    
    await page.click('button[type="submit"]');
    
    await page.waitForURL('**/user/dashboard**', { timeout: 10000 });
    expect(page.url()).toContain('/user/dashboard');
  });

});
