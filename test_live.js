const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 1000 });
  
  await page.goto('https://ceraria.in/sys-auth-99', { waitUntil: 'networkidle0' });
  
  // Log in
  await page.type('#login-email', 'admin@ceraria.in');
  await page.type('#login-password', 'Ceraria@2026');
  await page.click('#login-submit-btn');
  
  // Wait for redirect and for the button to appear
  await page.waitForNavigation();
  await page.waitForSelector('#add-product-btn', { timeout: 5000 });
  
  // Click 'Add New Product' to open modal
  await page.click('#add-product-btn');
  
  // Wait a second for modal to animate
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Dump the DOM of the grid
  const html = await page.evaluate(() => {
    const grid = document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4.gap-4');
    return grid ? grid.outerHTML : 'GRID NOT FOUND';
  });
  
  console.log('HTML OF THE GRID:\n', html);
  
  await browser.close();
})();
