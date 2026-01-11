import { test, expect } from '@playwright/test';

test.describe('UI CTA & Buttons Tests', () => {

  test('Home page has CTA buttons', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('button, a[href]');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(5);
  });

  test('Home page has Shop Now or similar CTA', async ({ page }) => {
    await page.goto('/');
    const body = await page.locator('body').textContent();
    const hasCTA = body.includes('Shop') || body.includes('Collection') || body.includes('Discover') || body.includes('View');
    expect(hasCTA).toBeTruthy();
  });

  test('Glasses page has filter buttons', async ({ page }) => {
    await page.goto('/glasses');
    await page.waitForTimeout(1000);
    const buttons = page.locator('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Auth page Sign In button is clickable', async ({ page }) => {
    await page.goto('/auth');
    const signInBtn = page.locator('button:has-text("Sign In")').first();
    await expect(signInBtn).toBeEnabled();
  });

  test('Auth page Sign Up button is clickable', async ({ page }) => {
    await page.goto('/auth');
    const signUpBtn = page.locator('button:has-text("Sign Up")').first();
    await expect(signUpBtn).toBeEnabled();
  });

  test('Contact page submit button exists', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForTimeout(1000);
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn.first()).toBeVisible();
  });

  test('Navigation links are clickable', async ({ page }) => {
    await page.goto('/');
    const navLinks = page.locator('nav a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(3);
  });

});
