const puppeteer = require('puppeteer');
const APP = `http://localhost:${process.env.PORT || 3000}/`;

describe('Client-side integration tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
  });

  afterAll(() => {
    browser.close();
  });

  describe('Initial display', () => {
    it('loads successfully with a login button', async () => {
      await page.goto(APP);
      await page.waitForSelector('button');
      const text = await page.$eval('button', (el) => el.innerHTML);
      expect(text).toMatch(/[log*in]/i);
    });
  });

});