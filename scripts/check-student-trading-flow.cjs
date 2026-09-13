// Walk the normal student UI in a fresh browser context. No state injection or backend writes.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const output = path.resolve(__dirname, '../tmp/student-trading-flow');
const url =
  process.env.PHASER_TEST_URL || 'http://127.0.0.1:4206/projects/frontier-trading-company';
const money = (text) => Math.round(Number(text.replace(/[^\d.-]/g, '')) * 100);

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    await page.goto(url);
    if (!process.env.PHASER_ISOLATED) {
      await page.getByRole('button', { name: 'Start Project', exact: false }).click();
      await page.getByRole('textbox', { name: /Company name/ }).fill('Fifth Grade Traders');
      await page.getByRole('button', { name: 'Start trading game', exact: false }).click();
    }
    await page.locator('.phaser-active canvas').waitFor({ timeout: 20000 });
    assert.equal(await page.locator('.project-tools > button').count(), 2);
    assert.equal(await page.locator('.unified-project-header').count(), 1);
    assert.equal(await page.locator('.town-market').count(), 0);
    await page.screenshot({ path: path.join(output, '01-map.png'), fullPage: true });
    await page.locator('[data-route-cost="route-northern"]').click();
    await page.getByRole('button', { name: 'Choose this town', exact: true }).click();
    assert.equal(await page.locator('.trip-card textarea').count(), 0);
    await page
      .locator('.trip-card')
      .getByRole('button', { name: 'Go to the shops', exact: false })
      .click();
    const stallIds = await page
      .locator('[data-stall-id]')
      .evaluateAll((items) => items.slice(0, 2).map((item) => item.dataset.stallId));
    for (const id of stallIds) {
      await page.locator(`[data-stall-id="${id}"]`).click();
      await page.getByRole('button', { name: 'Back to the street', exact: false }).click();
    }
    for (const name of ['Flour', 'Salt']) {
      await page.locator(`[data-stall-id="${stallIds[0]}"]`).click();
      const card = page
        .locator('.price-overlay')
        .filter({ has: page.getByRole('heading', { name, exact: true }) });
      const each = money(await card.locator('.price-pair dd').first().innerText());
      await card.getByRole('button', { name: 'Buy', exact: true }).click();
      await page.getByRole('spinbutton', { name: 'Trade quantity' }).fill('2');
      await page.getByRole('button', { name: 'Check the price', exact: false }).click();
      await page
        .getByRole('spinbutton', { name: `Final total for ${name}` })
        .fill(String((each * 2) / 100));
      await page.getByRole('button', { name: 'Confirm buy or sell', exact: true }).click();
      await page.locator('.receipt').waitFor();
      await page.getByRole('button', { name: 'Keep shopping', exact: true }).click();
    }
    await page.locator('.next-action').click();
    await page.locator('.trip-card.open .forecast-challenge').waitFor();
    await page.waitForFunction(
      () => document.activeElement?.getAttribute('aria-describedby') === 'sales-forecast-help',
    );
    assert.equal(await page.locator('.forecast-challenge input').count(), 1);
    await page.screenshot({ path: path.join(output, '02-trip-math.png'), fullPage: true });
    const rows = await page.locator('.forecast-load li').allInnerTexts();
    const sales = rows.reduce(
      (total, text) =>
        total + Number(text.match(/^\s*(\d+)/)[1]) * money(text.slice(text.indexOf('$'))),
      0,
    );
    const costs = await page.locator('.forecast-knowns dd').allInnerTexts();
    await page.locator('[aria-describedby="sales-forecast-help"]').fill(String(sales / 100));
    await page.getByRole('button', { name: 'Next math question', exact: false }).click();
    assert.equal(await page.locator('.forecast-challenge input').count(), 1);
    await page
      .locator('[aria-describedby="profit-forecast-help"]')
      .fill(String((sales - costs.reduce((sum, text) => sum + money(text), 0)) / 100));
    await page
      .locator('.trip-card textarea')
      .fill('I chose this town because the trip costs less money.');
    await page.getByRole('button', { name: 'Check my trip', exact: false }).click();
    await page.getByRole('button', { name: 'Confirm supplies & depart', exact: true }).click();
    await page.getByRole('button', { name: 'Travel next day', exact: false }).waitFor();
    await page.screenshot({ path: path.join(output, '03-travel.png'), fullPage: true });
    await page.getByRole('button', { name: 'Travel next day', exact: false }).click();
    await page.waitForFunction(
      () =>
        document.querySelector('.journey-progress')?.textContent.includes('1 of 3') ||
        !!document.querySelector('.event-layout'),
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(output, '04-mobile.png'), fullPage: true });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
      false,
    );
    assert.deepEqual(errors, []);
    console.log(
      'PASS: normal student launch, two primary pages, clear map, route-to-shopping guidance, two purchases, receipts, one-question math, departure and first travel day.',
    );
  } catch (error) {
    await page.screenshot({ path: path.join(output, 'failure.png'), fullPage: true });
    console.log((await page.locator('body').innerText()).slice(-6000));
    throw error;
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
