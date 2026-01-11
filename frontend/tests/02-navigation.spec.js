import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {

  test('Navigation to glasses from home', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/glasses"]');
    await page.waitForURL('**/glasses**');
    expect(page.url()).toContain('/glasses');
  });

  test('Navigation to sunglasses from home', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/sunglasses"]');
    await page.waitForURL('**/sunglasses**');
    expect(page.url()).toContain('/sunglasses');
  });

  test('Navigation to contact from home', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/contact"]');
    await page.waitForURL('**/contact**');
    expect(page.url()).toContain('/contact');
  });

  test('Navigation to brands from home', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/brands"]');
    await page.waitForURL('**/brands**');
    expect(page.url()).toContain('/brands');
  });

  test('Logo links back to home', async ({ page }) => {
    await page.goto('/glasses');
    await page.click('a[href="/"]');
    await page.waitForURL(/\/$/);
  });

});
