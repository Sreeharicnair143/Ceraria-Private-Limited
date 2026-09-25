const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to standard desktop
  await page.setViewport({ width: 1280, height: 1000 });
  
  // Bypass auth guard by injecting token BEFORE navigation
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('sys_auth_token', 'fake-token-for-puppeteer');
  });
  
  // Load the local HTML file
  await page.goto('file://D:/Projects/CERARIA PRIVATE LIMITED/public/management-portal-v9-x72.html', { waitUntil: 'domcontentloaded' });
  
  // Wait for the button to exist
  await page.waitForSelector('#add-product-btn', { timeout: 5000 });
  
  // Click 'Add New Product' to open modal
  await page.click('#add-product-btn');
  
  // Wait a second for modal to animate
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Take screenshot of the modal
  await page.screenshot({ path: 'D:/Projects/CERARIA PRIVATE LIMITED/modal_screenshot_fixed.png' });
  
  await browser.close();
  console.log('Screenshot saved to modal_screenshot_fixed.png');
})();
