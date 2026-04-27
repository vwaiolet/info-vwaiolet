import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.screenshot({ path: 'portfolio_screenshot.png', fullPage: true });
  console.log('Screenshot saved as portfolio_screenshot.png');
  await browser.close();
})();
