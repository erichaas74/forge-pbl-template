const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE ||
    'playwright',
);
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const output = path.resolve(__dirname, '../tmp/launch-audit');
const projects = [
  ['frontier-trading-company', 'frontier-first-trade', 3],
  ['objects-that-changed-us', 'museum-object-spotlight', 2],
  ['history-live-revolutionary-war', 'newsroom-breaking-assignment', 4],
  ['the-fate-of-the-republic', 'senate-seat-invitation', 2],
  ['race-around-the-world', 'voyage-first-command', 2],
];
(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1360, height: 960 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const report = [];
  const receipt = (id) =>
    page.evaluate(
      (id) =>
        Object.values(localStorage)
          .map((value) => {
            try {
              return JSON.parse(value);
            } catch {
              return null;
            }
          })
          .find((value) => value?.draft?.teaser?.teaserId === id)?.draft.teaser,
      id,
    );
  try {
    for (const [project, teaserId, count] of projects) {
      await page.goto('http://127.0.0.1:4200/projects/' + project);
      await page.locator('.choice-deck').waitFor();
      await page.waitForFunction(() => [...document.images].every((image) => image.complete));
      assert.deepEqual(
        await page
          .locator('app-decision-scene img')
          .evaluateAll((images) =>
            images.filter((image) => !image.naturalWidth).map((image) => image.src),
          ),
        [],
      );
      await page.screenshot({ path: path.join(output, project + '-opening.png'), fullPage: true });
      const media = [];
      async function playClip() {
        const video = page.locator('app-opening-media video');
        if (!(await video.count())) return;
        assert.equal(await video.evaluate((video) => video.paused), true);
        await page.getByRole('button', { name: 'Play short scene', exact: false }).click();
        await page.waitForFunction(
          () => document.querySelector('app-opening-media video')?.currentTime > 0.5,
        );
        media.push(
          await video.evaluate((video) => ({
            source: video.getAttribute('src'),
            duration: video.duration,
            width: video.videoWidth,
            captionTracks: video.textTracks.length,
          })),
        );
        await page.getByRole('button', { name: 'Pause scene', exact: false }).click();
      }
      await playClip();
      if (project === 'the-fate-of-the-republic') {
        await page.getByRole('button', { name: 'Play voices', exact: true }).click();
        await page.locator('.dialogue.speaking').waitFor();
        await page.getByRole('button', { name: 'Mute voices', exact: true }).click();
      }
      for (let i = 0; i < count; i++) {
        await page.locator('.scene-choice').nth(i).focus();
        await page.keyboard.press('Enter');
        await page.locator('.reveal-layout').waitFor();
        assert.ok((await page.locator('.evidence-slip').innerText()).length > 30);
        assert.equal(await page.locator('.scene-choice').count(), 0);
        await playClip();
        if (i === 0)
          await page.screenshot({
            path: path.join(output, project + '-reveal.png'),
            fullPage: true,
          });
        await page.locator('.reveal-layout .primary-action').click();
        await page.locator('.mission-layout').waitFor();
        assert.equal(await page.locator('.mission-steps li').count(), 3);
        if (i < count - 1)
          await page.getByRole('button', { name: 'Replay scene', exact: true }).click();
      }
      await page.locator('.mission-layout .primary-action').click();
      await page.waitForFunction(() => !document.querySelector('app-decision-scene'));
      const saved = await receipt(teaserId);
      assert.equal(saved.eventType, 'projectIntro.teaserCompleted');
      assert.ok(saved.choiceId);
      assert.equal(saved.observations.length, 1);
      await page.reload();
      await page.getByRole('button', { name: /^Replay / }).click();
      await page.locator('.scene-choice').first().click();
      await page.locator('.reveal-layout .primary-action').click();
      await page.locator('.mission-layout .primary-action').click();
      await page.waitForFunction(() => !document.querySelector('app-decision-scene'));
      assert.deepEqual(await receipt(teaserId), saved);
      await page.locator('.demo-link').click();
      await page.waitForURL('**/final-demo');
      assert.deepEqual(await receipt(teaserId), saved);
      report.push({
        project,
        branches: count,
        media,
        savedChoice: saved.choiceId,
        replayPreservesReceipt: true,
        teacherDemoReadOnly: true,
      });
      console.log(project + ': branches, media, saving, reload, replay, teacher demo PASS');
    }
    const phone = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'reduce',
    });
    const mobile = await phone.newPage();
    for (const [project] of projects) {
      await mobile.goto('http://127.0.0.1:4200/projects/' + project);
      await mobile.locator('.choice-deck').waitFor();
      assert.equal(
        await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        true,
        project + ' mobile overflow',
      );
      await mobile.screenshot({ path: path.join(output, project + '-mobile.png'), fullPage: true });
    }
    await phone.close();
    assert.deepEqual(errors, []);
    await fs.writeFile(
      path.join(output, 'results.json'),
      JSON.stringify(
        { report, mobile: '390px, reduced motion, all five passed', pageErrors: errors },
        null,
        2,
      ),
    );
    console.log('All five mobile layouts PASS. No page errors.');
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
