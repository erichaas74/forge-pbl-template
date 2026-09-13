// Run against a development server with PLAYWRIGHT_MODULE set if Playwright is not local.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const output = path.resolve(__dirname, '../tmp/phaser-atlas-audit');
const url =
  process.env.PHASER_TEST_URL || 'http://localhost:4200/projects/frontier-trading-company';

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    await page.goto(url);
    if (!process.env.PHASER_ISOLATED) {
      await page.getByRole('button', { name: 'Start Project', exact: false }).click();
      await page.getByRole('textbox', { name: /Company name/ }).fill('Canvas Test Company');
      await page.getByRole('button', { name: 'Start trading game', exact: false }).click();
    }
    await page.locator('.phaser-active canvas').waitFor({ timeout: 20000 });
    // Isolate renderer-only assertions from the independently ticking trade world.
    const pauseWorld = page.getByRole('button', { name: 'Pause world', exact: true });
    if (await page.locator('.world-menu').count()) {
      await page.locator('.world-menu > summary').click();
      if (await pauseWorld.count()) await pauseWorld.click();
      await page.locator('.world-menu > summary').click();
    }
    assert.equal(await page.locator('app-phaser-route-canvas canvas').count(), 1);
    const size = await page.locator('.map-window').boundingBox();
    const canvasSize = await page.locator('app-phaser-route-canvas canvas').boundingBox();
    assert.ok(Math.abs(size.width - canvasSize.width) < 2, 'Canvas fills the actual map width');
    assert.ok(Math.abs(size.height - canvasSize.height) < 2, 'Canvas fills the actual map height');
    assert.equal(await page.getByRole('button', { name: /^Zoom (in|out)$/ }).count(), 0);
    const checkProportions = async () => {
      const transform = await page.locator('.route-map').evaluate((svg) => {
        const matrix = svg.getScreenCTM();
        const rect = svg.getBoundingClientRect();
        return { x: matrix.a, y: matrix.d, width: rect.width, height: rect.height };
      });
      assert.ok(Math.abs(transform.x - transform.y) < 0.001, 'Map uses a uniform scale');
      return transform;
    };
    const initial = await checkProportions();
    assert.ok(
      initial.x * 100 <= initial.width + 1 && initial.y * 80 <= initial.height + 1,
      'The whole map fits inside its frame',
    );
    await page.screenshot({ path: path.join(output, 'desktop.png'), fullPage: true });
    console.log(
      'Canvas loaded. Visible controls: ' + (await page.locator('.map-tools').innerText()),
    );
    // Select a trail through its accessible cost marker, then close the detail panel to scout.
    const cost = page.locator('[data-route-cost]').first();
    await cost.focus();
    await page.keyboard.press('Enter');
    await page.locator('.route-prediction').waitFor();
    await page.getByRole('button', { name: 'Choose this town', exact: true }).click();
    await page.getByRole('button', { name: 'Close trip planner', exact: true }).click();
    await page.locator('.map-options summary').click();
    const scout = page.getByRole('button', { name: 'Scout trail', exact: true });
    const before = await page.evaluate(() => ({ ...localStorage }));
    await scout.click();
    await page.locator('.scout-notice').waitFor();
    await page.waitForTimeout(1100);
    await page.screenshot({ path: path.join(output, 'scouting.png'), fullPage: true });
    assert.deepEqual(
      await page.evaluate(() => ({ ...localStorage })),
      before,
      'Scouting must not persist state',
    );
    const stopScouting = page.getByRole('button', { name: 'Stop scouting' });
    if (await stopScouting.count()) await stopScouting.click();
    await page.getByRole('button', { name: 'Toggle map motion' }).click();
    await page.waitForFunction(() => document.querySelector('.scout-button')?.disabled);
    assert.equal(await scout.isDisabled(), true);
    await page.getByRole('button', { name: 'Toggle map motion' }).click();
    await page.getByRole('button', { name: 'Basic map', exact: true }).click();
    await page.locator('app-phaser-route-canvas').waitFor({ state: 'detached' });
    assert.equal(await page.locator('app-phaser-route-canvas').count(), 0);
    assert.ok(await page.locator('[data-map-stop][role="button"]').count());
    await page.getByRole('button', { name: 'Animated map', exact: true }).click();
    await page.locator('.phaser-active canvas').waitFor();
    await page.getByRole('button', { name: 'Fit all routes', exact: true }).click();
    await page.locator('.map-options summary').click();
    await page.locator('.route-map').focus();
    await page.keyboard.press('+');
    await page.waitForFunction(
      () => document.querySelector('.route-map')?.getAttribute('viewBox') === '10 8 80 64',
    );
    await page.getByRole('button', { name: 'Pan map right', exact: true }).click();
    await page.screenshot({ path: path.join(output, 'zoomed.png'), fullPage: true });
    const viewBeforeResize = await page.locator('.route-map').getAttribute('viewBox');
    await page.setViewportSize({ width: 1366, height: 768 });
    assert.equal(
      await page.locator('.route-map').getAttribute('viewBox'),
      viewBeforeResize,
      'Resize preserves the explored view',
    );
    const wheelPosition = await page.locator('.route-map').boundingBox();
    // Use the upper edge of the SVG, away from the market cards layered above it.
    await page.mouse.move(wheelPosition.x + wheelPosition.width / 2, wheelPosition.y + 8);
    await page.mouse.wheel(0, -100);
    await page.waitForFunction(
      (before) => document.querySelector('.route-map')?.getAttribute('viewBox') !== before,
      viewBeforeResize,
    );
    await checkProportions();
    await page.locator('.map-options summary').click();
    await page.getByRole('button', { name: 'Fit all routes', exact: true }).click();
    await page.locator('.map-options summary').click();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(350);
    await checkProportions();
    await page.screenshot({ path: path.join(output, 'mobile.png'), fullPage: true });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
      false,
    );
    await page.locator('.map-options summary').click();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.getByRole('button', { name: 'Motion off: device preference' }).waitFor();
    assert.equal(
      await page.getByRole('button', { name: 'Scout trail', exact: true }).isDisabled(),
      true,
    );
    assert.equal(
      await page.getByRole('button', { name: 'Motion off: device preference' }).isDisabled(),
      true,
    );
    if (process.env.PHASER_ISOLATED) {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.setViewportSize({ width: 1440, height: 1000 });
      // A saved-journey fixture tests real canvas travel without replaying the curriculum's math gates.
      // The unit suite separately proves route commitment, locks, and the event command boundary.
      await page.evaluate(() => {
        const runtime = window.ng.getComponent(
          document.querySelector('app-simulation-route-map'),
        ).runtime;
        const route = runtime.config.routes[0];
        runtime.state.update((state) => ({
          ...state,
          status: 'active',
          lastView: 'route',
          activeTravel: { routeId: route.id, progressDays: 0, eventIds: [], resolvedEventIds: [] },
          routeHistory: [
            {
              id: 'canvas-audit-journey',
              routeId: route.id,
              dayStarted: state.currentDay,
              rationale: 'Browser verification fixture',
              knownInfoSnapshot: route,
              eventIdsTriggered: [],
            },
          ],
        }));
      });
      await page.getByRole('button', { name: 'Travel next day', exact: false }).click();
      await page.waitForTimeout(450);
      await page.screenshot({ path: path.join(output, 'traveling.png'), fullPage: true });
      await page.waitForFunction(() =>
        document.querySelector('.journey-progress')?.textContent.includes('1 of 3'),
      );
      for (let i = 0; i < 2; i++) {
        await page.getByRole('button', { name: 'Travel next day', exact: false }).click();
      }
      await page.getByRole('button', { name: 'Sell your goods', exact: false }).waitFor();
      await page.waitForTimeout(1300);
      await page.screenshot({ path: path.join(output, 'arrived.png'), fullPage: true });
      const arrival = await page.evaluate(() => {
        const state = window.ng
          .getComponent(document.querySelector('app-simulation-route-map'))
          .runtime.state();
        return {
          active: state.activeTravel,
          location: state.currentLocationId,
          arrived: state.routeHistory[0].dayArrived,
        };
      });
      assert.equal(arrival.active, undefined);
      assert.equal(arrival.location, 'fort-bridger');
      assert.equal(arrival.arrived, 4);
    }
    assert.deepEqual(errors, []);
    console.log(
      'PASS: real Phaser canvas, route keyboard controls, scouting isolation, motion, basic-map fallback, remount, zoom, mobile resize, reduced motion; no page errors.',
    );
  } catch (error) {
    await page.screenshot({ path: path.join(output, 'failure.png'), fullPage: true });
    console.log((await page.locator('body').innerText()).slice(0, 6000));
    throw error;
  } finally {
    await fs.writeFile(path.join(output, 'page-errors.json'), JSON.stringify(errors, null, 2));
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
