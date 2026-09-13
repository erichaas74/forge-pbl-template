// Exercise the real Phaser renderer with disposable snapshots, without a backend or app login.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { build } = require('esbuild');
const assert = require('node:assert/strict');
const path = require('node:path');

(async () => {
  const bundle = await build({
    stdin: {
      contents: `
        import * as Phaser from 'phaser';
        import { createRouteCanvas } from './src/app/templates/simulation-decision/ui/map/phaser-route-renderer';
        const boot = Phaser.Game.prototype.boot;
        Phaser.Game.prototype.boot = function () { window.testGame = this; return boot.call(this); };
        window.createRouteCanvas = createRouteCanvas;
      `,
      resolveDir: path.resolve(__dirname, '..'),
      loader: 'ts',
    },
    bundle: true,
    write: false,
    format: 'iife',
    platform: 'browser',
  });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    await page.route('http://renderer.test/**', (route) =>
      route.fulfill({
        contentType: 'text/html',
        body: '<div id="host"></div>',
      }),
    );
    await page.goto('http://renderer.test/');
    await page.addScriptTag({ content: bundle.outputFiles[0].text });
    await page.evaluate(() => {
      window.events = { ready: 0, failed: 0 };
      window.viewport = {
        width: 1000,
        height: 800,
        stretch: true,
        view: { x: 50, y: 40, zoom: 1 },
      };
      window.snapshot = {
        scenery: true,
        motion: true,
        selectedRouteId: 'trail',
        previewRouteId: '',
        currentLocationId: 'origin',
        companyPosition: { x: 10, y: 20 },
        travel: { routeId: 'trail', progress: 0.5 },
        trails: [
          {
            id: 'trail',
            state: 'traveling',
            compared: false,
            days: 3,
            toLocationId: 'destination',
            points: [],
          },
        ],
      };
      window.controller = window.createRouteCanvas(
        document.querySelector('#host'),
        window.snapshot,
        window.viewport,
        {
          ready: () => window.events.ready++,
          failed: () => window.events.failed++,
          previewEnded: () => {},
        },
      );
      window.apply = (changes) => {
        window.snapshot = { ...window.snapshot, ...changes };
        window.controller.update(window.snapshot, window.viewport);
      };
    });
    await page.waitForFunction(() => window.events.ready === 1);
    const lateGeometry = await page.evaluate(() => {
      window.scene = window.testGame.scene.getScene('route-world');
      window.apply({
        companyPosition: { x: 50, y: 40 },
        trails: window.snapshot.trails.map((trail) => ({
          ...trail,
          points: [
            { x: 10, y: 20 },
            { x: 90, y: 60 },
          ],
        })),
      });
      return {
        x: window.scene.wagon.x,
        y: window.scene.wagon.y,
        moving: !!window.scene.movingRoute,
      };
    });
    assert.deepEqual(
      lateGeometry,
      { x: 500, y: 400, moving: false },
      'Late geometry restores the saved position',
    );

    const continuity = await page.evaluate(() => {
      window.apply({
        travel: { routeId: 'trail', progress: 0.75 },
        companyPosition: { x: 70, y: 50 },
      });
      const start = window.scene.wagon.x;
      // Advance the real tween's displayed progress deterministically before a newer saved day arrives.
      window.scene.progress.value = 0.6;
      window.scene.update(500);
      const before = window.scene.wagon.x;
      window.apply({
        travel: { routeId: 'trail', progress: 0.9 },
        companyPosition: { x: 82, y: 56 },
      });
      const after = window.scene.wagon.x;
      window.apply({ motion: false });
      return {
        start,
        before,
        after,
        stoppedX: window.scene.wagon.x,
        moving: !!window.scene.movingRoute,
      };
    });
    assert.equal(
      continuity.start,
      500,
      'A saved advance starts at the previous displayed position',
    );
    assert.equal(continuity.before, continuity.after, 'Rapid updates must not jump ahead');
    assert.equal(
      continuity.stoppedX,
      820,
      'Reduced motion immediately uses the authoritative position',
    );
    assert.equal(continuity.moving, false);

    const retained = await page.evaluate(() => {
      const label = window.scene.checkpointLabels[0];
      window.apply({ scenery: false, previewRouteId: 'trail' });
      const sameLabel = label === window.scene.checkpointLabels[0];
      window.viewport = {
        ...window.viewport,
        width: 1366,
        height: 768,
        view: { x: 60, y: 40, zoom: 2 },
      };
      window.controller.update(window.snapshot, window.viewport);
      return {
        sameLabel,
        sceneCount: window.testGame.scene.scenes.length,
        canvases: document.querySelectorAll('canvas').length,
      };
    });
    assert.deepEqual(
      retained,
      { sameLabel: true, sceneCount: 1, canvases: 1 },
      'Visual updates and resize retain the scene and route labels',
    );

    await page.evaluate(() => {
      window.apply({
        motion: true,
        travel: undefined,
        currentLocationId: 'destination',
        companyPosition: { x: 90, y: 60 },
        trails: window.snapshot.trails.map((trail) => ({ ...trail, state: 'completed' })),
      });
    });
    await page.waitForFunction(() => !window.scene.movingRoute);
    assert.equal(
      await page.evaluate(() => window.scene.wagon.x),
      900,
      'Confirmed arrival ends at the destination',
    );

    await page.evaluate(() => {
      window.apply({
        motion: true,
        travel: undefined,
        cue: undefined,
        currentLocationId: 'origin',
        companyPosition: { x: 10, y: 20 },
        trails: window.snapshot.trails.map((trail) => ({ ...trail, state: 'available' })),
      });
      window.cue = {
        id: 'journey:departure',
        journeyId: 'journey',
        routeId: 'trail',
        kind: 'departure',
        label: 'DEPARTURE',
        progress: 0,
      };
      window.apply({
        travel: { routeId: 'trail', progress: 0 },
        cue: window.cue,
        trails: window.snapshot.trails.map((trail) => ({ ...trail, state: 'traveling' })),
      });
    });
    const departure = await page.evaluate(() => ({
      x: window.scene.wagon.x,
      moving: !!window.scene.movingRoute,
      label: window.scene.milestoneText.text,
      burst: window.scene.burstStarted !== undefined,
    }));
    assert.deepEqual(
      departure,
      { x: 100, moving: false, label: 'DEPARTURE', burst: true },
      'Departure celebrates at the origin without manufacturing a travel day',
    );

    await page.evaluate(() => {
      window.apply({
        travel: { routeId: 'trail', progress: 1 / 3 },
        companyPosition: { x: 110 / 3, y: 100 / 3 },
        cue: {
          ...window.cue,
          id: 'journey:checkpoint:1',
          kind: 'checkpoint',
          label: 'CHECKPOINT 1',
          progress: 1 / 3,
        },
      });
      window.confirmed = JSON.stringify(window.snapshot);
    });
    await page.waitForFunction(() => !window.scene.movingRoute);
    assert.equal(await page.evaluate(() => window.scene.milestoneText.text), 'CHECKPOINT 1');
    assert.equal(await page.evaluate(() => window.scene.checkpointLabels[0].text), '✓');
    assert.equal(
      await page.evaluate(() => JSON.stringify(window.snapshot) === window.confirmed),
      true,
      'Tween completion never changes the confirmed snapshot',
    );
    const eventStop = await page.evaluate(() => {
      window.apply({
        cue: {
          ...window.cue,
          id: 'journey:event',
          kind: 'event',
          label: 'TRAIL EVENT',
          progress: 1 / 3,
        },
      });
      const moving = !!window.scene.movingRoute;
      const label = window.scene.milestoneText.text;
      window.apply({ motion: false });
      return {
        moving,
        label,
        burst: window.scene.burstStarted !== undefined,
        visible: window.scene.milestone.visible,
      };
    });
    assert.deepEqual(
      eventStop,
      { moving: false, label: 'TRAIL EVENT', burst: false, visible: true },
      'An event stops the wagon; reduced motion keeps the event sign and clears the burst',
    );
    await page.evaluate(() => {
      window.apply({
        motion: true,
        travel: undefined,
        currentLocationId: 'destination',
        companyPosition: { x: 90, y: 60 },
        cue: {
          ...window.cue,
          id: 'journey:arrival',
          kind: 'arrival',
          label: 'ARRIVED',
          progress: 1,
        },
        trails: window.snapshot.trails.map((trail) => ({ ...trail, state: 'completed' })),
      });
    });
    await page.waitForFunction(() => !window.scene.movingRoute);
    assert.equal(await page.evaluate(() => window.scene.milestoneText.text), 'ARRIVED');
    assert.equal(await page.evaluate(() => window.scene.wagon.x), 900);

    const freight = await page.evaluate(() => {
      window.apply({
        world: {
          tick: 0,
          running: true,
          conditions: [],
          freight: [
            { id: 'freight', name: 'Freight wagon', routeId: 'trail', progress: 0, deliveries: 0 },
          ],
        },
      });
      const wagon = window.scene.fleet.get('freight').wagon;
      const start = wagon.x;
      window.apply({
        world: {
          ...window.snapshot.world,
          tick: 1,
          freight: [{ ...window.snapshot.world.freight[0], progress: 0.5 }],
        },
      });
      const moving = window.scene.fleet.get('freight').tween.isPlaying();
      const sameWagon = wagon === window.scene.fleet.get('freight').wagon;
      window.apply({ world: { ...window.snapshot.world, running: false } });
      const paused = window.scene.fleet.get('freight');
      const pausedX = paused.wagon.x;
      const pausedTween = paused.tween.isPlaying();
      window.apply({
        motion: false,
        world: {
          ...window.snapshot.world,
          running: true,
          tick: 2,
          conditions: [
            { id: 'storm', kind: 'winter-storm', locations: [{ x: 90, y: 60 }] },
            { id: 'flood', kind: 'flood', locations: [{ x: 50, y: 40 }] },
            { id: 'raid', kind: 'conflict', locations: [{ x: 10, y: 20 }] },
          ],
          freight: [{ ...window.snapshot.world.freight[0], progress: 1, deliveries: 1 }],
        },
      });
      window.scene.update(3000);
      const arrivedX = wagon.x;
      window.apply({
        world: {
          ...window.snapshot.world,
          tick: 3,
          freight: [{ ...window.snapshot.world.freight[0], progress: 0.5 }],
        },
      });
      const returnX = wagon.x;
      window.freightConfirmed = JSON.stringify(window.snapshot);
      window.scene.update(5000);
      const immutable = JSON.stringify(window.snapshot) === window.freightConfirmed;
      window.apply({ world: undefined });
      return {
        start,
        moving,
        sameWagon,
        pausedX,
        pausedTween,
        arrivedX,
        returnX,
        immutable,
        remaining: window.scene.fleet.size,
      };
    });
    assert.deepEqual(
      freight,
      {
        start: 100,
        moving: true,
        sameWagon: true,
        pausedX: 500,
        pausedTween: false,
        arrivedX: 900,
        returnX: 500,
        immutable: true,
        remaining: 0,
      },
      'Freight follows confirmed progress, pauses, returns, preserves runtime state and disposes removed wagons',
    );

    const townArt = await page.evaluate(() => {
      window.apply({
        towns: [
          { id: 'fort', kind: 'fort', x: 10, y: 20 },
          { id: 'crossing', kind: 'crossing', x: 90, y: 60 },
        ],
      });
      const fort = window.scene.towns.get('fort').art;
      window.apply({ scenery: false });
      const retained = fort === window.scene.towns.get('fort').art;
      const position = { x: fort.x, y: fort.y };
      window.apply({ towns: [{ id: 'fort', kind: 'camp', x: 20, y: 30 }] });
      return {
        retained,
        position,
        replaced: fort !== window.scene.towns.get('fort').art,
        count: window.scene.towns.size,
      };
    });
    assert.deepEqual(
      townArt,
      { retained: true, position: { x: 100, y: 200 }, replaced: true, count: 1 },
      'Phaser towns retain their art across updates and replace or dispose changed definitions',
    );

    const loader = await page.evaluate(() => {
      // Keep loading pending so obsolete and active failures can be delivered in a known order.
      window.scene.load.start = () => window.scene.load;
      window.apply({ backgroundAsset: '/old.webp' });
      window.apply({ backgroundAsset: '/current.webp' });
      window.scene.load.emit('loaderror', { key: 'landscape:/old.webp' });
      const staleFailures = window.events.failed;
      window.apply({ backgroundAsset: undefined });
      const readyAfterRemoval = window.events.ready;
      const listenersAfterRemoval = window.scene.load.listenerCount('loaderror');
      window.apply({ backgroundAsset: '/required.webp' });
      window.scene.load.emit('loaderror', { key: 'landscape:/required.webp' });
      return {
        staleFailures,
        readyAfterRemoval,
        listenersAfterRemoval,
        activeFailures: window.events.failed,
      };
    });
    assert.deepEqual(loader, {
      staleFailures: 0,
      readyAfterRemoval: 2,
      listenersAfterRemoval: 0,
      activeFailures: 1,
    });
    const fitted = await page.evaluate(() => {
      const art = document.createElement('canvas');
      art.width = 200;
      art.height = 100;
      window.scene.textures.addCanvas('landscape:/wide.webp', art);
      window.apply({ backgroundAsset: '/wide.webp' });
      window.controller.update(window.snapshot, {
        width: 1200,
        height: 400,
        stretch: false,
        view: { x: 50, y: 40, zoom: 1 },
      });
      return {
        width: window.scene.background.displayWidth,
        height: window.scene.background.displayHeight,
        zoomX: window.scene.cameras.main.zoomX,
        zoomY: window.scene.cameras.main.zoomY,
      };
    });
    assert.deepEqual(
      fitted,
      { width: 1000, height: 500, zoomX: 0.5, zoomY: 0.5 },
      'Artwork and the camera preserve proportions',
    );
    await page.evaluate(() => window.controller.destroy());
    await page.waitForFunction(() => !document.querySelector('canvas'));
    assert.deepEqual(errors, []);
    console.log(
      'PASS: real Phaser travel and cues, moving/paused/returning freight, weather overlays, immutable snapshots, reduced motion, retained objects, resize, background races and disposal.',
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
