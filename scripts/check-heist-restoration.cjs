const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const mission = require('../public/projects/shadow-gallery/versions/2.0.0/project.json');
const out = path.resolve(__dirname, '../../output/heist-restoration');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const server = await require('./serve-heist-preview.cjs')(0), browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, reducedMotion: 'reduce', acceptDownloads: true });
  const page = await context.newPage(), errors = []; page.on('pageerror', e => errors.push(e.message));
  const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const button = name => page.getByRole('button', { name, exact: true });
  const nav = name => page.locator('.journey').getByRole('button', { name: new RegExp(name) });
  try {
    await page.goto(`http://127.0.0.1:${server.address().port}/projects/shadow-gallery`);
    await button('Start the first painting →').waitFor({ timeout: 90000 });
    assert.equal(await page.locator('.work-card').count(), 16);
    await page.screenshot({ path: path.join(out, 'collection-desktop.png'), fullPage: true });
    await nav('The final heist').click().then(settle); assert.match(await page.locator('.locked-panel').innerText(), /16 paintings/);
    await button('Restore the next painting →').click().then(settle);
    const editor = page.locator('app-restoration-editor');
    await editor.getByRole('button', { name: 'Inspect The added object', exact: true }).click().then(settle);
    await editor.getByRole('button', { name: /Lift out the added object/ }).click().then(settle);
    assert.equal(await editor.locator('.frame [data-region="detail"] img').count(), 0);
    const note = 'I removed the European horses because the reference places their introduction after contact.';
    await editor.getByLabel('Explain your decision').fill(note);
    await button('Enter story portal →').click().then(settle);
    const story = page.locator('.story-dialog'); await story.getByRole('button', { name: '← Return to my painting', exact: true }).waitFor();
    await page.screenshot({ path: path.join(out, 'story-portal.png') });
    await story.locator('.viewpoints button').filter({ hasText: 'Sit & listen' }).click().then(settle);
    await story.locator('.story-chapters button').first().waitFor();
    await story.getByRole('button', { name: '← Return to my painting', exact: true }).click().then(settle);
    assert.equal(await editor.getByLabel('Explain your decision').inputValue(), note);
    await page.reload(); await editor.getByLabel('Explain your decision').waitFor(); assert.equal(await editor.getByLabel('Explain your decision').inputValue(), note);
    assert.equal(await editor.locator('.frame [data-region="detail"] img').count(), 0);
    await editor.getByRole('button', { name: 'Undo repair', exact: true }).click().then(settle);
    assert.equal(await editor.locator('.frame [data-region="detail"] img').count(), 1);
    await editor.getByRole('button', { name: /Lift out the added object/ }).click().then(settle);
    await editor.getByLabel('Which reference helps you decide?').selectOption('first-contact').then(settle);
    await editor.getByLabel('How does this source relate to the original claim?').selectOption('contradicts').then(settle);
    await editor.getByLabel('Explain your decision').fill(note);
    await editor.getByRole('button', { name: 'Check my restoration', exact: true }).click().then(settle);
    await editor.getByText('This reconstruction needs another look. Use the detail feedback to revise.', { exact: true }).waitFor();
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.screenshot({ path: path.join(out, 'studio-mobile.png'), fullPage: true });
    await page.setViewportSize({ width: 1440, height: 1100 });
    console.log('Verified portal return, reload, image removal, undo, wrong evidence, and mobile layout.');
    for (let index = 0; index < mission.works.length; index++) {
      const work = mission.works[index];
      if (index) { await nav('Restore the collection').click().then(settle); await button('Open ' + work.title).click().then(settle); }
      for (const r of work.regions) {
        await editor.getByRole('button', { name: 'Inspect ' + r.title, exact: true }).click().then(settle);
        const a = r.answers[0], option = r.options.find(o => o.id === a.optionId);
        await editor.locator('.repair-option').filter({ has: page.locator('strong', { hasText: option.label }) }).click().then(settle);
        await editor.getByLabel('Which reference helps you decide?').selectOption(a.evidenceId).then(settle);
        await editor.getByLabel('How does this source relate to the original claim?').selectOption(a.relationship).then(settle);
        await editor.getByLabel('Explain your decision').fill(`I ${option.tool === 'keep' ? 'preserved' : 'corrected'} this detail because the reference establishes the place and time. ${r.claim}`);
        await editor.getByRole('button', { name: 'Save explanation', exact: true }).click().then(settle);
      }
      await editor.getByRole('button', { name: 'Check my restoration', exact: true }).click().then(settle);
      await editor.getByText('✓ Evidence check passed', { exact: true }).waitFor();
      if (index === 0) {
        await editor.getByRole('button', { name: 'Compare before / after', exact: true }).click().then(settle);
        assert.equal(await editor.locator('.comparison figure').count(), 2);
        assert.equal(await editor.locator('.comparison figure').nth(0).locator('[data-region="detail"] img').count(), 1);
        assert.equal(await editor.locator('.comparison figure').nth(1).locator('[data-region="detail"] img').count(), 0);
        await page.screenshot({ path: path.join(out, 'before-after-desktop.png'), fullPage: true });
        const download = page.waitForEvent('download'); await button('Download before / after').click().then(settle); const file = await download; await file.saveAs(path.join(out, file.suggestedFilename()));
        assert.ok(fs.statSync(path.join(out, file.suggestedFilename())).size > 10000);
      }
      console.log(`Restored ${index + 1}/16: ${work.title}`);
    }
    await nav('Your living ledger').click().then(settle); assert.equal(await page.locator('.ledger-list article').count(), 16);
    await page.getByLabel('Your museum label').fill('Our sources changed the date, origin and community attributions. We preserved supported details and would seek additional community perspectives.');
    await button('Save museum label').click().then(settle);
    await page.screenshot({ path: path.join(out, 'living-ledger.png'), fullPage: true });
    await nav('The final heist').click().then(settle); await button('Begin the final heist →').click().then(settle);
    const lock = page.locator('app-academic-lock');
    for (const id of mission.finalLockIds) {
      const definition = mission.sourceGallery.locks.find(l => l.id === id);
      await lock.getByRole('heading', { name: definition.title, exact: true }).waitFor();
      if (definition.type === 'combo') {
        await lock.getByRole('spinbutton').fill(String(definition.target));
        for (const [index, digit] of [...String(definition.target)].entries()) for (let n = 0; n < Number(digit); n++) await lock.getByRole('button', { name: 'Increase digit ' + (index + 1), exact: true }).click().then(settle);
        await button('Open references').click().then(settle); await page.locator('.research-dialog').getByRole('button', { name: '← Return to my work', exact: true }).click().then(settle); assert.equal(await lock.getByRole('spinbutton').inputValue(), '1492');
      } else if (definition.type === 'rotation') {
        await lock.getByRole('spinbutton').fill(String(definition.target)); await lock.getByRole('slider').fill(String(definition.target));
      } else if (definition.type === 'sorting') {
        for (const item of definition.items) { await lock.locator('.sort-items button').filter({ has: page.locator('strong', { hasText: new RegExp('^' + item.label + '$') }) }).click().then(settle); await lock.locator('.sort-zones button').filter({ hasText: definition.zones.find(z => z.id === definition.matches[item.id]).label }).click().then(settle); }
      } else if (definition.type === 'lever') {
        await lock.getByRole('button', { name: definition.items.find(i => i.id === definition.solution[0]).label, exact: true }).click().then(settle);
      } else if (definition.type === 'cargo') {
        await lock.getByRole('spinbutton').fill(String(definition.capacity)); for (const id of definition.requiredItems) await lock.locator('.cargo-items button').filter({ hasText: definition.items.find(i => i.id === id).label }).click().then(settle);
      }
      await lock.getByRole('button', { name: /Operate mechanism/ }).click().then(settle);
      console.log('Passed mechanism: ' + id);
    }
    await button('Recover the collection →').click().then(settle); await page.getByRole('heading', { name: 'Recovery complete.', exact: true }).waitFor();
    await page.screenshot({ path: path.join(out, 'recovery-complete.png'), fullPage: true });
    await nav('Your living ledger').click().then(settle);
    const ledgerDownload = page.waitForEvent('download'); await button('Download evidence ledger').click().then(settle); const ledgerFile = await ledgerDownload; await ledgerFile.saveAs(path.join(out, ledgerFile.suggestedFilename()));
    const ledger = JSON.parse(fs.readFileSync(path.join(out, ledgerFile.suggestedFilename()), 'utf8'));
    assert.equal(ledger.complete, true); assert.equal(ledger.works.filter(w => w.verified).length, 16); assert.equal(ledger.finalHeist.solvedLocks.length, 5); assert.ok(ledger.museumLabel.length > 40);
    const exhibitionDownload = page.waitForEvent('download', { timeout: 120000 }); await button('Download illustrated exhibition').click().then(settle); const exhibition = await exhibitionDownload; await exhibition.saveAs(path.join(out, exhibition.suggestedFilename()));
    const html = fs.readFileSync(path.join(out, exhibition.suggestedFilename()), 'utf8'); assert.equal((html.match(/data:image\/png/g) || []).length, 32); assert.ok(html.includes('Our sources changed'));
    await page.reload(); await page.getByRole('heading', { name: 'Recovery complete.', exact: true }).waitFor();
    assert.deepEqual(errors, []);
    fs.writeFileSync(path.join(out, 'verification.json'), JSON.stringify({ works: 16, regions: 32, mechanisms: 5, portalReturn: true, reload: true, imageRemovalAndUndo: true, pngExport: true, exhibitionImages: 32, viewport: '390px and 1440px', pageErrors: errors }, null, 2));
    console.log('PASS: complete restoration-to-heist flow, ledger, PNG and illustrated exhibition downloads.');
  } catch (error) { await page.screenshot({ path: path.join(out, 'failure.png'), fullPage: true }); fs.writeFileSync(path.join(out, 'failure-state.json'), JSON.stringify(await page.evaluate(() => Object.fromEntries(Object.entries(localStorage).filter(([k]) => k.startsWith('forge:heist:restoration:')))), null, 2)); console.error(error, errors); process.exitCode = 1; }
  finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
})();

