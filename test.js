import { test, expect, chromium } from '@playwright/test';

test.describe('Google Search', () => {
  let browser;
  let page;

  test.beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('https://www.google.com');
  });

  test.afterEach(async () => {
    await browser.close();
  });

  test('should display search results', async () => {

    await page.fill('input[name="q"]', 'Playwright testing');
    await page.press('input[name="q"]', 'Enter');

  
    await page.waitForSelector('h3');

  
    const searchResults = await page.$$('h3');
    expect(searchResults.length).toBeGreaterThan(0);
  });

  test('should show relevant search results', async () => {
    
    await page.fill('input[name="q"]', 'Playwright testing');
    await page.press('input[name="q"]', 'Enter');

   
    await page.waitForSelector('h3');

    
    const firstSearchResult = await page.$('h3');
    const firstSearchResultText = await firstSearchResult.innerText();
    expect(firstSearchResultText.toLowerCase()).toContain('playwright');
  });

  test('should display search suggestions', async () => {
    
    await page.fill('input[name="q"]', 'Playwright');

   
    await page.waitForSelector('ul[role="listbox"]');

    
    const searchSuggestions = await page.$$('ul[role="listbox"] li');
    expect(searchSuggestions.length).toBeGreaterThan(0);
  });

  test('should display search results for different queries', async () => {
    const queries = ['Playwright testing', 'OpenAI GPT', 'Software Development'];

    for (const query of queries) {
   
      await page.fill('input[name="q"]', query);
      await page.press('input[name="q"]', 'Enter');

      await page.waitForSelector('h3');

      
      const searchResults = await page.$$('h3');
      expect(searchResults.length).toBeGreaterThan(0);
    }
  });

  test('should click on search suggestion and redirect to results', async () => {
    
    await page.fill('input[name="q"]', 'Playwright');

   
    await page.waitForSelector('ul[role="listbox"]');

    
    await page.click('ul[role="listbox"] li:first-child');

    
    await page.waitForSelector('h3');

   
    const searchResults = await page.$$('h3');
    expect(searchResults.length).toBeGreaterThan(0);
  });

  test('should handle empty search query gracefully', async () => {
  
    await page.fill('input[name="q"]', '');
    await page.press('input[name="q"]', 'Enter');

   
    await page.waitForSelector('ul[role="listbox"]');

   
    const searchSuggestions = await page.$$('ul[role="listbox"] li');
    expect(searchSuggestions.length).toBeGreaterThan(0);
  });
});
