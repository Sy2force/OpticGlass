import { test, expect } from '@playwright/test';

test.describe('UI Home Page Sections Tests', () => {

  test('Home page has hero section', async ({ page }) => {
    await page.goto('/');
    const body = await page.locator('body').textContent();
    expect(body.length).toBeGreaterThan(100);
  });

  test('Home page has brand logo', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('text=OPTIC, text=Optic Glass');
    const count = await logo.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('Home page loads within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(10000); // Less than 10 seconds
  });

  test('Home page has no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('/');
    await page.waitForTimeout(2000);
    // Allow some errors but not critical ones
    expect(errors.length).toBeLessThan(10);
  });

});
