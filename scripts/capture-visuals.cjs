const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureTentative() {
  const outputDir = path.resolve('C:/Users/Mihir/.gemini/antigravity/brain/80c5bd8f-577d-40a7-ae44-5aa9466d2481/tentative_screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  console.log('Launching Chrome to verify tentative project in pure monochrome aesthetic...');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  console.log('Navigating to http://localhost:5174...');
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle2', timeout: 25000 });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Navbar & Authentic Nothin Landing
  console.log('1. Capturing Navbar & Nothin Landing...');
  await page.screenshot({ path: path.join(outputDir, '01_navbar_and_nothin_landing.png') });

  // 2. Hero 2-Slide Perspective Carousel (Slide 1: Who We Are)
  console.log('2. Capturing Hero Carousel (Who We Are)...');
  await page.evaluate(() => {
    document.getElementById('carousel-hero')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '02_hero_carousel_who_we_are.png') });

  // 3. Hero Carousel Slide 2 (What We Are Doing)
  console.log('3. Capturing Hero Carousel (What We Are Doing)...');
  await page.evaluate(() => {
    const nextBtn = document.querySelector('button[aria-label="Next slide"]');
    if (nextBtn) nextBtn.click();
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(outputDir, '03_hero_carousel_what_we_are_doing.png') });

  // 4. Powerful Features: Cipher.tv 360° Circular Orbital Constellation
  console.log('4. Capturing Cipher.tv 360° Circular Gallery...');
  await page.evaluate(() => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, '04_cipher_circular_gallery.png') });

  // 5. Cipher Gallery Hover Dimming Effect
  console.log('5. Capturing Cipher Gallery Hover Dimming Effect...');
  const cardHandle = await page.$('#features img');
  if (cardHandle) {
    const box = await cardHandle.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise(r => setTimeout(r, 600));
    }
  }
  await page.screenshot({ path: path.join(outputDir, '05_cipher_gallery_hover_focus.png') });

  // 6. How It Works (01-04 Steps with arrows)
  console.log('6. Capturing How It Works Steps...');
  await page.evaluate(() => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '06_how_it_works_steps.png') });

  // 7. Testimonials Gallery
  console.log('7. Capturing Testimonials Gallery...');
  await page.evaluate(() => {
    document.getElementById('testimonials')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '07_testimonials_gallery.png') });

  // 8. FAQ Accordion (with open state)
  console.log('8. Capturing FAQ Section...');
  await page.evaluate(() => {
    document.getElementById('faq')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '08_faq_accordion.png') });

  // 9. Newsletter & Footer
  console.log('9. Capturing Newsletter & Footer...');
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '09_newsletter_and_footer.png') });

  await browser.close();
  console.log('Monochrome visual capture complete in:', outputDir);
}

captureTentative().catch(err => {
  console.error('Visual capture failed:', err);
});
