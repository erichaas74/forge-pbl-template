const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
  const output = path.resolve(__dirname, '../tmp/intro-media');
  await fs.mkdir(output, { recursive: true });
  try {
    for (const name of ['revolutionary-war-newsroom demo', 'revolutionary-war-socal-media', 'revolutionary-war-splitscree-selfies']) {
      await page.goto('http://127.0.0.1:4200/history-live/' + encodeURIComponent(name) + '.mp4');
      const info = await page.locator('video').evaluate(async video => {
        if (video.readyState < 1) await new Promise(resolve => video.addEventListener('loadedmetadata', resolve, { once: true }));
        video.pause();
        return { duration: video.duration, width: video.videoWidth, height: video.videoHeight };
      });
      console.log(JSON.stringify({ name, ...info }));
      for (const fraction of [0.15, 0.5, 0.85]) {
        await page.locator('video').evaluate(async (video, time) => {
          await new Promise(resolve => { video.addEventListener('seeked', resolve, { once: true }); video.currentTime = time; });
        }, info.duration * fraction);
        await page.screenshot({ path: path.join(output, name + '-' + fraction + '.png') });
      }
    }
  } finally { await browser.close(); }
})();
