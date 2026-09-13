// Disposable saved-journey fixture against the full production app; never uses a user's browser profile.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { build } = require('esbuild');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const output = path.resolve(__dirname, '../tmp/route-gameplay-audit');
const url =
  process.env.PHASER_TEST_URL || 'http://127.0.0.1:4206/projects/frontier-trading-company';

(async () => {
  await fs.mkdir(output, { recursive: true });
  const fixtureBundle = await build({
    stdin: {
      contents: `import { frontierTradingConfig as config } from './src/app/projects/frontier-trading/frontier-trading.config';
      window.fixtureRoute = config.routes[0]; window.fixtureEvent = config.events.find(event => !event.mathChallenge);
      window.fixtureSkippedEvent = config.events.find(event => event.id !== window.fixtureEvent.id);`,
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
  try {
    await page.goto(url);
    await page.getByRole('button', { name: 'Start Project', exact: false }).click();
    await page.getByRole('textbox', { name: /Company name/ }).fill('Trail Test Company');
    await page.getByRole('button', { name: 'Start trading game', exact: false }).click();
    await page.locator('.phaser-active canvas').waitFor();
    await page.addScriptTag({ content: fixtureBundle.outputFiles[0].text });
    await page.evaluate(() => {
      const key = Object.keys(localStorage).find((key) =>
        key.startsWith('forge:simulation-decision:'),
      );
      const state = JSON.parse(localStorage.getItem(key));
      const route = window.fixtureRoute;
      localStorage.setItem(
        key,
        JSON.stringify({
          ...state,
          status: 'active',
          lastView: 'route',
          activeTravel: {
            routeId: route.id,
            progressDays: 0,
            eventIds: [window.fixtureSkippedEvent.id, window.fixtureEvent.id],
            resolvedEventIds: [window.fixtureSkippedEvent.id],
          },
          routeHistory: [
            {
              id: 'browser-journey',
              routeId: route.id,
              dayStarted: state.currentDay,
              rationale: 'Disposable gameplay verification fixture',
              knownInfoSnapshot: route,
              eventIdsTriggered: [window.fixtureEvent.id],
            },
          ],
        }),
      );
    });
    await page.reload();
    await page.locator('.phaser-active canvas').waitFor();
    assert.match(await page.locator('.journey-milestone').innerText(), /Wagons ready/);
    await page.screenshot({ path: path.join(output, 'departure.png'), fullPage: true });
    await page.getByRole('button', { name: /Travel next day/ }).click();
    await page.waitForTimeout(2300);
    assert.equal((await saved()).activeTravel.progressDays, 1);
    assert.equal(await page.locator('.journey-checkpoints .reached').count(), 2);
    await page.screenshot({ path: path.join(output, 'checkpoint.png'), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    const mobileAction = await page.getByRole('button', { name: /Travel next day/ }).boundingBox();
    const mobilePanel = await page.locator('.travel-card').boundingBox();
    assert.ok(
      mobileAction.y >= mobilePanel.y &&
        mobileAction.y + mobileAction.height <= mobilePanel.y + mobilePanel.height,
      'The next-day action stays visible in the mobile journey sheet',
    );
    assert.ok(
      mobileAction.y >= 0 && mobileAction.y + mobileAction.height <= 844,
      'The active journey action appears before the long economy panel and fits on the phone screen',
    );
    await page.screenshot({ path: path.join(output, 'mobile-checkpoint.png'), fullPage: true });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
      false,
    );
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.getByRole('button', { name: /Travel next day/ }).click();
    await page.locator('.decision-banner').waitFor();
    assert.match(await page.locator('.decision-banner').innerText(), /checkpoint 2 of 3/);
    assert.equal((await saved()).activeTravel.progressDays, 2);
    await page.screenshot({ path: path.join(output, 'event.png'), fullPage: true });
    await page.locator('.choice-grid button:not([disabled])').first().click();
    await page
      .locator('textarea')
      .first()
      .fill('This choice protects our supplies and gives us time to reach the market.');
    await page.getByRole('button', { name: 'Check my choice', exact: true }).click();
    await page.getByRole('button', { name: 'Confirm decision', exact: true }).click();
    await page.locator('.consequence-backdrop').waitFor();
    const resolved = await saved();
    assert.equal(resolved.pendingEventId, undefined);
    assert.equal(resolved.eventHistory.length, 1);
    await page.screenshot({ path: path.join(output, 'recorded-outcome.png'), fullPage: true });
    await page.locator('.consequence-backdrop').waitFor({ state: 'detached' });
    await page.getByRole('button', { name: 'Continue on the map', exact: true }).click();
    await page.locator('.phaser-active canvas').waitFor();
    assert.equal(await page.locator('.journey-outcome').count(), 1);
    await page.locator('.map-options summary').click();
    await page.getByRole('button', { name: 'Basic map', exact: true }).click();
    await page.locator('app-phaser-route-canvas').waitFor({ state: 'detached' });
    assert.match(await page.locator('.wagon-marker').getAttribute('transform'), /^translate\(/);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('.map-options summary').click();
    await page.getByRole('button', { name: /Travel next day/ }).click();
    await page.locator('.map-arrival').waitFor();
    assert.equal((await saved()).activeTravel, undefined);
    assert.equal((await saved()).currentLocationId, 'fort-bridger');
    await page.screenshot({ path: path.join(output, 'basic-arrival.png'), fullPage: true });
    await page.reload();
    await page.locator('.phaser-active canvas').waitFor();
    await page.locator('.map-arrival').waitFor();
    await page.screenshot({ path: path.join(output, 'restored-arrival.png'), fullPage: true });
    assert.deepEqual(errors, []);
    console.log(
      'PASS: production saved departure, travel, checkpoints, event handoff, confirmed outcome, mobile, basic-map arrival and reload; no page errors.',
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
