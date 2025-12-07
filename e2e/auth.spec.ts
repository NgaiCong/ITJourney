import { test, expect } from '@playwright/test';

test('user can register', async ({ page }) => {
  await page.goto('/register');
  
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'Password123!');
  await page.fill('[name="name"]', 'Test User');
  
  // Assuming there is a submit button
  // await page.click('button[type="submit"]');
  
  // await expect(page).toHaveURL('/dashboard');
  // await expect(page.locator('text=Chào mừng')).toBeVisible();
});
