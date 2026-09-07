const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const ids = [
  'mystery-substance',
  'frontier-trading-company',
  'objects-that-changed-us',
  'history-live-revolutionary-war',
  'the-fate-of-the-republic',
  'race-around-the-world',
];
(async () => {
  const out = path.resolve(__dirname, '../tmp/showcase-audit');
  await fs.mkdir(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage(),
    errors = [],
    mutations = [],
    report = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (!['GET', 'HEAD'].includes(request.method()))
      mutations.push(request.method() + ' ' + request.url());
  });
  await page.goto('http://127.0.0.1:4200/projects');
  await page.evaluate(() => {
    localStorage.setItem('showcase-audit-existing-student', 'keep this draft');
    sessionStorage.setItem('showcase-audit-existing-session', 'keep this session');
  });
  const snapshot = () =>
    page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }));
  const before = await snapshot();
  try {
    for (const id of ids) {
      await page.goto('http://127.0.0.1:4200/projects/' + id + '/final-demo');
      await page.locator('.native-presentation > *').first().waitFor({ timeout: 30000 });
      assert.equal(await page.locator('.load-state[role=alert]').count(), 0);
      await page.waitForFunction(() =>
        [...document.querySelectorAll('.native-presentation img')].every((image) => image.complete),
      );
      const broken = await page
        .locator('.native-presentation img')
        .evaluateAll((images) =>
          images.filter((image) => !image.naturalWidth).map((image) => image.src),
        );
      assert.deepEqual(broken, [], id + ' images');
      assert.equal(
        await page.locator('textarea:not([readonly]),input:not([disabled])').count(),
        0,
        id + ' editable controls',
      );
      await page.screenshot({ path: path.join(out, id + '-desktop.png'), fullPage: true });
      await page.getByRole('button', { name: 'See the learning behind it' }).click();
      await page.locator('#teacher-review').waitFor();
      assert.equal(
        await page.locator('#teacher-review h2').evaluate((el) => document.activeElement === el),
        true,
      );
      await page.getByRole('button', { name: 'Close teacher guide' }).click();
      if (id === 'mystery-substance') {
        await page.getByRole('button', { name: 'Preview', exact: true }).first().click();
        await page.locator('.evidence-preview table').waitFor();
        assert.match(await page.locator('.evidence-preview').innerText(), /Conductivity/);
        await page.getByRole('button', { name: 'Uncertain', exact: true }).click();
        await page.waitForFunction(
          () => document.querySelectorAll('.final-evidence-picker label').length === 1,
        );
      } else if (id === 'frontier-trading-company') {
        for (const label of ['Plan', 'Math', 'Revise', 'Defend'])
          await page
            .locator('app-simulation-final-showcase nav')
            .getByRole('button', { name: new RegExp(label) })
            .click();
        assert.match(await page.locator('.defense-slide').innerText(), /Prepared claims/i);
      } else if (id === 'objects-that-changed-us') {
        for (let i = 0; i < 4; i++) {
          await page.locator('.accessible-list button').nth(i).click();
          await page.waitForFunction(() => [...document.querySelectorAll('.object-portrait img')].every(image => image.complete && image.naturalWidth > 0));
          assert.ok((await page.locator('.curator').first().innerText()).length > 300);
        }
        await page.getByRole('button', { name: 'Teacher view', exact: true }).click();
        await page.locator('.curator.revision').waitFor();
      } else if (id === 'history-live-revolutionary-war') {
        for (let i = 1; i <= 3; i++)
          await page.getByRole('button', { name: 'Scene ' + i, exact: true }).click();
        await page.getByRole('button', { name: 'Play evidence scenes', exact: true }).click();
        await page.getByRole('button', { name: 'Pause scenes', exact: true }).click();
        await page.getByText('Producer review history · fictional sample', { exact: true }).click();
        assert.match(await page.locator('.sample-record').innerText(), /Who does/);
      } else if (id === 'the-fate-of-the-republic') {
        const entries = page.locator('.entry-link');
        await entries.nth(5).click();
        await page.getByRole('button', { name: 'Reveal class judgment', exact: true }).click();
        for (let i = 0; i < 6; i++) await page.locator('.reveal-seal').click();
        assert.match(await page.locator('.verdict-results').innerText(), /58%/);
        assert.equal(await page.locator('.ballot-chamber').count(), 0);
        await page.getByRole('button', { name: 'Replay the arguments', exact: true }).click();
      } else {
        for (let i = 0; i < 5; i++) await page.locator('.scene-editor button').nth(i).click();
        await page.getByText('Inspect the exact source paragraphs', { exact: true }).click();
        assert.match(await page.locator('.captain-record').innerText(), /Community|community/);
        await page.locator('.scene-editor button').nth(3).click();
        await page
          .getByText('See the first response, feedback, and revision', { exact: true })
          .click();
        assert.match(await page.locator('.captain-record').innerText(), /Safer for whom/);
      }
      assert.deepEqual(await snapshot(), before, id + ' changed student storage');
      await page.getByRole('button', { name: 'Restart sample' }).click();
      await page.locator('.native-presentation > *').first().waitFor();
      assert.deepEqual(await snapshot(), before, id + ' restart changed storage');
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(
        () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
      );
      await page.locator('.showcase-exit').waitFor();
      await page.screenshot({ path: path.join(out, id + '-mobile.png'), fullPage: true });
      const overflow = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      assert.equal(overflow.scroll, overflow.width, id + ' mobile page overflow');
      report.push({ project: id, overflow, brokenImages: broken.length });
      await page.setViewportSize({ width: 1440, height: 1000 });
    }
    assert.deepEqual(errors, [], 'Browser exceptions');
    assert.deepEqual(mutations, [], 'Network mutations');
    await fs.writeFile(
      path.join(out, 'results.json'),
      JSON.stringify({ report, errors, mutations }, null, 2),
    );
    console.log(JSON.stringify({ report, errors, mutations }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
