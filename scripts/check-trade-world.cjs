// Full production app in a disposable browser profile; no changes to the user's game.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { build } = require('esbuild');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const output = path.resolve(__dirname, '../tmp/trade-world-audit');
const url =
  process.env.PHASER_TEST_URL || 'http://127.0.0.1:4206/projects/frontier-trading-company';

(async () => {
  await fs.mkdir(output, { recursive: true });
  const bundle = await build({
    stdin: {
      contents: `import { frontierTradingConfig as config } from './src/app/projects/frontier-trading/frontier-trading.config';
      import { marketPrice, marketStockRemaining } from './src/app/templates/simulation-decision/domain/simulation-decision.engine';
      window.worldQuote = state => marketPrice(config, 'fort-laramie', 'dried-beans', 'sell', state);
      window.worldStock = state => marketStockRemaining(config, state, 'fort-laramie', 'dried-beans');`,
      resolveDir: path.resolve(__dirname, '..'),
      loader: 'ts',
    },
    bundle: true,
    write: false,
    format: 'iife',
  });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const saved = () =>
    page.evaluate(() => {
      const key = Object.keys(localStorage).find((key) =>
        key.startsWith('forge:simulation-decision:'),
      );
      return JSON.parse(localStorage.getItem(key));
    });
  const worldToggle = () => page.locator('.world-menu > summary').click();
  const money = (text) => Math.round(Number(text.replace(/[^\d.-]/g, '')) * 100);
  const advance = async () => {
    await page.getByRole('button', { name: /Travel next day/ }).click();
    await page.waitForTimeout(2300);
  };
  async function chooseRoute(id) {
    await page.locator(`[data-route-cost="${id}"]`).click();
    await page.getByRole('button', { name: 'Choose this town', exact: true }).click();
  }
  async function confirmDeparture() {
    const rows = await page.locator('.forecast-load li').allInnerTexts();
    const sales = rows.reduce(
      (total, text) =>
        total + Number(text.match(/^\s*(\d+)/)[1]) * money(text.slice(text.indexOf('$'))),
      0,
    );
    const costs = await page.locator('.forecast-knowns dd').allInnerTexts();
    await page.locator('[aria-describedby="sales-forecast-help"]').fill(String(sales / 100));
    await page.getByRole('button', { name: /Next math question/ }).click();
    await page
      .locator('[aria-describedby="profit-forecast-help"]')
      .fill(String((sales - costs.reduce((sum, text) => sum + money(text), 0)) / 100));
    await page
      .locator('.trip-card textarea')
      .fill('This road leaves enough money for our supplies.');
    await page.getByRole('button', { name: /Check my trip/ }).click();
    const before = await saved();
    await page.getByRole('button', { name: 'Confirm supplies & depart', exact: true }).click();
    assert.equal((await saved()).tradeWorld.tick, before.tradeWorld.tick + 1);
    await page.getByRole('button', { name: /Travel next day/ }).waitFor();
  }
  async function clearTrailDecisions() {
    // A quiet-leg fixture isolates freight timing. Actual checkpoint decisions and
    // their animation are covered separately by check-route-gameplay.cjs.
    await page.evaluate(() => {
      const key = Object.keys(localStorage).find((key) =>
        key.startsWith('forge:simulation-decision:'),
      );
      const state = JSON.parse(localStorage.getItem(key));
      state.activeTravel.eventIds = [];
      localStorage.setItem(key, JSON.stringify(state));
    });
    await page.reload();
    await page.locator('.phaser-active canvas').waitFor();
  }
  try {
    await page.goto(url);
    await page.getByRole('button', { name: 'Start Project', exact: false }).click();
    await page.getByRole('textbox', { name: /Company name/ }).fill('World Browser Test');
    await page.getByRole('button', { name: 'Start trading game', exact: false }).click();
    await page.locator('.phaser-active canvas').waitFor();
    assert.equal(
      await page
        .locator('.project-return-bar, .next-step, .map-card > header, .game-footer')
        .count(),
      0,
      'One project header replaces the stacked bars',
    );
    assert.equal(await page.locator('.unified-project-header').count(), 1);
    assert.equal(await page.locator('.unified-project-header .map-tools').count(), 1);
    const mapPanel = await page.locator('.map-card').boundingBox();
    const sidePanel = await page.locator('.route-sidebar').boundingBox();
    assert.ok(
      Math.abs(mapPanel.width / (mapPanel.width + sidePanel.width) - 0.7) < 0.015,
      'Desktop map occupies 70 percent beside the economy panel',
    );
    assert.ok(sidePanel.x >= mapPanel.x + mapPanel.width - 1);
    assert.match(await page.locator('.company-ledger').innerText(), /Supplies & profits/);
    assert.equal(await page.locator('[data-route-cost]').count(), 5);
    assert.equal(await page.locator('.freight-marker').count(), 4);
    const initial = await saved();
    assert.equal(initial.tradeWorld.tick, 0);
    await page.waitForTimeout(21000);
    assert.deepEqual(
      (await saved()).tradeWorld,
      initial.tradeWorld,
      'Visible idle time never advances a turn',
    );
    await worldToggle();
    assert.equal(
      await page.locator('.world-controls button').count(),
      0,
      'No manual world pulse bypass',
    );
    assert.match(await page.locator('.news-body').innerText(), /Each “Travel next day”/);
    await worldToggle();
    await chooseRoute('route-northern');
    await page
      .locator('.trip-card')
      .getByRole('button', { name: /Go to the shops/ })
      .click();
    const stallIds = await page
      .locator('[data-stall-id]')
      .evaluateAll((items) => items.slice(0, 2).map((item) => item.dataset.stallId));
    for (const id of stallIds) {
      await page.locator(`[data-stall-id="${id}"]`).click();
      await page.getByRole('button', { name: /Back to the street/ }).click();
    }
    for (const name of ['Flour', 'Salt']) {
      await page.locator(`[data-stall-id="${stallIds[0]}"]`).click();
      const card = page
        .locator('.price-overlay')
        .filter({ has: page.getByRole('heading', { name, exact: true }) });
      const each = money(await card.locator('.price-pair dd').first().innerText());
      await card.getByRole('button', { name: 'Buy', exact: true }).click();
      await page.getByRole('spinbutton', { name: 'Trade quantity' }).fill('2');
      await page.getByRole('button', { name: /Check the price/ }).click();
      await page
        .getByRole('spinbutton', { name: `Final total for ${name}` })
        .fill(String((each * 2) / 100));
      await page.getByRole('button', { name: 'Confirm buy or sell', exact: true }).click();
      await page.locator('.receipt').waitFor();
      await page.getByRole('button', { name: 'Keep shopping', exact: true }).click();
    }
    assert.deepEqual(
      (await saved()).tradeWorld,
      initial.tradeWorld,
      'Supplies and math do not run a world turn',
    );
    await page.locator('.next-action').click();
    await page.locator('.forecast-challenge').waitFor();
    await confirmDeparture();
    assert.equal((await saved()).tradeWorld.tick, 1);
    await page.screenshot({ path: path.join(output, 'confirmed-departure.png'), fullPage: true });
    await clearTrailDecisions();
    await page.addScriptTag({ content: bundle.outputFiles[0].text });
    await advance();
    const beforeDelivery = await saved();
    const priorQuote = await page.evaluate((state) => window.worldQuote(state), beforeDelivery);
    const priorStock = await page.evaluate((state) => window.worldStock(state), beforeDelivery);
    await advance();
    const delivered = await saved();
    assert.equal(delivered.tradeWorld.tick, 3);
    assert.equal(delivered.tradeWorld.shipments[0].deliveries, 1);
    assert.equal(delivered.tradeWorld.shipments[0].direction, 'return');
    const newQuote = await page.evaluate((state) => window.worldQuote(state), delivered);
    const newStock = await page.evaluate((state) => window.worldStock(state), delivered);
    assert.ok(newQuote < priorQuote, 'Freight lowers the affected live quote');
    assert.equal(newStock, priorStock + 6);
    await page.locator('#price-town').selectOption('fort-laramie');
    assert.ok(
      (await page.locator('.price-board').innerText()).includes(`$${(newQuote / 100).toFixed(2)}`),
      'Sidebar prices agree with the runtime quote',
    );
    assert.match(await page.locator('.world-brief').innerText(), /arrived/);
    await page.screenshot({ path: path.join(output, 'live-prices.png'), fullPage: true });
    assert.match(await page.locator('.world-brief').innerText(), /Prices held/);
    await advance();
    await page.locator('.map-arrival').waitFor();
    assert.equal((await saved()).tradeWorld.tick, 4);
    await chooseRoute('route-northern-return');
    await confirmDeparture();
    await clearTrailDecisions();
    await advance();
    await advance();
    const world = (await saved()).tradeWorld;
    assert.equal(world.tick, 7, 'Exactly one world update per confirmed departure or travel day');
    assert.deepEqual(
      new Set(
        world.history.filter((event) => event.kind !== 'shipment').map((event) => event.kind),
      ),
      new Set(['winter-storm', 'flood', 'conflict']),
    );
    assert.equal(world.shipments[0].deliveries, Math.floor(world.tick / 3));
    await page.screenshot({ path: path.join(output, 'phaser-world.png'), fullPage: true });
    await worldToggle();
    assert.match(await page.locator('.news-body').innerText(), /Native Trade Caravan/);
    await page.screenshot({ path: path.join(output, 'market-news.png'), fullPage: true });
    await worldToggle();
    await page.reload();
    await page.locator('.phaser-active canvas').waitFor();
    assert.deepEqual(
      (await saved()).tradeWorld,
      world,
      'Reload neither rerolls events nor duplicates deliveries',
    );
    await page.locator('.header-menu > summary').click();
    assert.match(
      await page.getByRole('link', { name: 'Final example', exact: true }).getAttribute('href'),
      /\/final-demo$/,
    );
    await page.getByRole('button', { name: 'Help and rules', exact: true }).click();
    await page.locator('.help-drawer').waitFor();
    await page.keyboard.press('Escape');
    await page.locator('.help-drawer').waitFor({ state: 'detached' });
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.header-menu').getAttribute('open'), null);
    await page.locator('.map-options summary').click();
    const beforeVisibility = await saved();
    await page.getByRole('button', { name: 'Weather overlays on', exact: true }).click();
    await page.getByRole('button', { name: 'Weather overlays off', exact: true }).click();
    await page.getByRole('button', { name: 'Landscape on', exact: true }).click();
    await page.getByRole('button', { name: 'Landscape off', exact: true }).click();
    assert.deepEqual(
      await saved(),
      beforeVisibility,
      'Artwork layer controls cannot change the simulation',
    );
    await page.getByRole('button', { name: 'Basic map', exact: true }).click();
    await page.locator('app-phaser-route-canvas').waitFor({ state: 'detached' });
    assert.equal(await page.locator('.freight-marker').count(), 4);
    assert.match(
      await page.locator('.freight-marker').first().getAttribute('transform'),
      /^translate\(/,
    );
    await page.locator('.map-options summary').click();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.screenshot({ path: path.join(output, 'mobile-basic-world.png'), fullPage: true });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
      false,
    );
    const map = await page.locator('.map-window').boundingBox();
    assert.ok(map.height > 220, 'Mobile leaves usable space for the map');
    await worldToggle();
    const news = await page.locator('.news-body').boundingBox();
    assert.ok(news.x >= 0 && news.x + news.width <= 391, 'Market news fits the phone');
    await page.screenshot({ path: path.join(output, 'mobile-news.png'), fullPage: true });
    assert.deepEqual(errors, []);
    console.log(
      'PASS: idle prices held, normal supplies and forecast flow, confirmed departure, one update per travel turn, price/stock delivery, all event kinds, return freight, reload, live map quotes, mobile news and SVG fallback; no page errors.',
    );
  } catch (error) {
    await page.screenshot({ path: path.join(output, 'failure.png'), fullPage: true });
    throw error;
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
