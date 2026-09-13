// Use an installed Playwright package: PLAYWRIGHT_MODULE=/path/to/playwright-core.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const previewUrl = (process.env.TIME_REPAIR_PREVIEW_URL || 'http://127.0.0.1:4202') + '/projects/exploration-time-repair';

(async () => {
  const output = path.resolve(__dirname, '../tmp/time-repair-browser');
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.TIME_REPAIR_CHROMIUM
      ? { executablePath: process.env.TIME_REPAIR_CHROMIUM }
      : {}),
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1050 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(new URL('/projects', previewUrl).href);
    await page.locator('a[href="/projects/exploration-time-repair"]').click();
    await page.getByRole('heading', { name: 'Timeline Control Room' }).waitFor();
    await page.locator('.portal img').evaluate((img) => img.decode());
    assert.equal(
      await page.getByRole('button', { name: 'Time jump · locked', exact: true }).isDisabled(),
      true,
    );
    await page.screenshot({ path: path.join(output, 'control-room.png'), fullPage: true });
    await page.getByRole('button', { name: 'Investigate the anomaly' }).click();
    const explanation =
      'The Andean origin and the dated sixteenth-century cultivation record contradict potatoes in a European market in 1490. Removing that cargo restores a later transfer while leaving the exact first arrival uncertain.';
    for (const title of ['A crop with Andean roots', 'Follow the dated record']) {
      await page.getByRole('button', { name: new RegExp(title) }).click();
      await page.getByRole('button', { name: '+ Collect evidence card' }).click();
      await page.getByLabel('What does it prove?').fill(explanation);
      await page.getByRole('button', { name: 'Save evidence connection' }).click();
    }
    await page.screenshot({ path: path.join(output, 'archive.png'), fullPage: true });
    await page.getByRole('button', { name: '02 · Defend the repair' }).click();
    await page.getByLabel('Classify the anomaly').selectOption('Chronology error');
    await page.getByLabel('Your claim', { exact: true }).fill(explanation);
    await page.getByLabel('Cause → consequence').fill(explanation);
    await page.getByRole('radio', { name: /The 1490 European cargo is too early/ }).check();
    await page.getByLabel('Defend your source conclusion').fill(explanation);
    await page.getByRole('button', { name: 'Request repair authorization' }).click();
    await page.getByRole('button', { name: 'Enter time-jump scene' }).click();
    await page.getByRole('button', { name: 'Inspect Flagged cargo', exact: true }).click();
    await page.screenshot({ path: path.join(output, 'scene.png'), fullPage: true });
    await page.getByRole('radio', { name: /Remove the premature cargo/ }).check();
    await page.getByRole('button', { name: 'Apply repair · 1 charge' }).click();
    await page.locator('.object-art[src$="cargo-restored.svg"]').waitFor();
    assert.match(await page.locator('.object-art').getAttribute('src'), /cargo-restored.svg$/);
    await page.screenshot({ path: path.join(output, 'scene-restored.png'), fullPage: true });
    await page.getByRole('button', { name: 'Follow the ripple' }).click();
    await page.getByLabel('Source to cite').selectOption('dated-cultivation');
    await page.getByLabel('Your explanation', { exact: true }).fill(explanation);
    await page.getByRole('button', { name: 'Record verification' }).click();
    await page.locator('.verified-banner').waitFor();
    assert.equal(await page.locator('.stability-ring strong').innerText(), '100%');
    await page.screenshot({ path: path.join(output, 'ripple.png'), fullPage: true });
    await page.getByRole('button', { name: 'View your case file' }).click();
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Export case file · JSON' }).click();
    const downloaded = await download;
    const exported = JSON.parse(await fs.readFile(await downloaded.path(), 'utf8'));
    assert.equal(exported.repairLog['early-cargo'].verification.explanation, explanation);
    assert.equal(exported.remainingCharges, 2);
    await page.getByRole('button', { name: 'Close repair log' }).click();
    await page.reload();
    await page.getByRole('button', { name: 'Open restored timeline case file' }).waitFor();
    assert.equal(await page.locator('.stability-ring strong').innerText(), '100%');
    assert.deepEqual(errors, []);

    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      reducedMotion: 'reduce',
    });
    const narrow = await mobile.newPage();
    await narrow.goto(previewUrl);
    await narrow.getByRole('button', { name: 'Investigate the anomaly' }).waitFor();
    assert.equal(
      await narrow.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      true,
    );
    await narrow.screenshot({ path: path.join(output, 'mobile.png'), fullPage: true });
    await narrow.getByRole('button', { name: 'Investigate the anomaly' }).click();
    assert.equal(
      await narrow.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      true,
    );
    await narrow.screenshot({ path: path.join(output, 'mobile-archive.png'), fullPage: true });
    await fs.writeFile(
      path.join(output, 'results.json'),
      JSON.stringify(
        {
          passed: [
            'desktop complete journey',
            'charge count',
            'case file export',
            'reload preservation',
            'mobile control room and archive width',
            'no page errors',
          ],
          screenshots: output,
        },
        null,
        2,
      ),
    );
    console.log(
      'PASS: desktop repair loop, export, reload, mobile width, and page error checks. Screenshots: ' +
        output,
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
