const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const mission = require('../public/projects/shadow-gallery/versions/1.1.0/project.json');
const out = path.resolve(__dirname, '../../output/heist-gallery');
fs.mkdirSync(out, { recursive: true });
(async () => {
  // Serve an isolated production build; unrelated edits cannot reload this test mid-operation.
  const server = await require('./serve-heist-preview.cjs')(0);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, reducedMotion: 'reduce' });
  const page = await context.newPage(); const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  try {
    await page.goto(`http://127.0.0.1:${server.address().port}/projects/shadow-gallery`);
    await page.locator('.painting-controls button').first().waitFor({ timeout: 90000 });
    await page.waitForFunction(() => !document.querySelector('.painting-controls button')?.disabled, { timeout: 90000 });
    await page.screenshot({ path: path.join(out, 'gallery-desktop.png'), fullPage: true });
    console.log('Gallery loaded with all painting assets.');
    if (process.env.HEIST_SCREENSHOT_ONLY) return;
    const dialog = page.locator('dialog');
    if (process.env.HEIST_ENCOUNTER_ONLY) {
      await require('./check-heist-encounter.cjs')(page, mission, out);
      assert.deepEqual(errors, []); return;
    }
    await page.locator('.audit-tools button').click();
    await dialog.getByRole('heading', { name: 'Clue log & vault audit', exact: true }).waitFor();
    assert.match(await dialog.innerText(), /No clues inspected yet/);
    assert.equal(await dialog.locator('.clue-guide').evaluate(el => el.open), true);
    await page.screenshot({ path: path.join(out, 'vault-audit-start.png'), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth), true);
    await page.screenshot({ path: path.join(out, 'vault-audit-mobile.png'), fullPage: true });
    await dialog.getByRole('button', { name: 'Running clue list' }).click();
    assert.equal(await dialog.locator('#fraud-log-title').evaluate(el => document.activeElement === el), true);
    await page.setViewportSize({ width: 1440, height: 1100 });
    await dialog.getByRole('button', { name: 'Return to paintings' }).click();
    if (process.env.HEIST_FIRST_LOCK_ONLY) {
      await page.locator('.painting-controls button').nth(mission.chambers[0].paintings.findIndex(p => p.authentic)).click();
      await dialog.locator('.detail-studies button').first().click();
      await dialog.getByRole('button', { name: 'Choose the passage beneath this painting' }).click();
      const item = label => dialog.locator('.sort-items button').filter({ has: page.locator('strong', { hasText: new RegExp(`^${label}$`) }) });
      const destination = label => dialog.locator('.sort-zones button').filter({ hasText: label });
      const submit = dialog.getByRole('button', { name: 'Operate mechanism' });
      for (const label of ['Wheat', 'Potato', 'Maize', 'Horse']) await item(label).click();
      assert.match(await dialog.locator('.placement-status').innerText(), /0 of 4 placed/);
      assert.equal(await submit.isDisabled(), true);
      await item('Wheat').click(); await destination('Old World').click();
      await dialog.getByRole('button', { name: 'Open evidence & field notes' }).click();
      await dialog.locator('summary').filter({ hasText: 'Where the cargo began' }).click();
      await dialog.getByRole('button', { name: 'Return to the mechanism' }).click();
      assert.match(await dialog.locator('.placement-status').innerText(), /1 of 4 placed/);
      assert.match(await destination('Old World').innerText(), /Wheat/);
      for (const [label, zone] of [['Potato', 'Americas'], ['Maize', 'Americas'], ['Horse', 'Old World']]) {
        await item(label).click(); await destination(zone).click();
      }
      assert.match(await dialog.locator('.placement-status').innerText(), /4 of 4 placed/);
      assert.equal(await submit.isEnabled(), true);
      await page.setViewportSize({ width: 390, height: 844 });
      assert.equal(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth), true);
      await page.screenshot({ path: path.join(out, 'sorting-lock-mobile.png'), fullPage: true });
      await page.setViewportSize({ width: 1440, height: 1100 });
      await page.screenshot({ path: path.join(out, 'sorting-lock-ready.png'), fullPage: true });
      await submit.click();
      await dialog.locator('[data-lock-type="rotation"]').waitFor();
      await dialog.getByRole('spinbutton').fill('135');
      await dialog.getByRole('slider').evaluate(el => { el.value = '135'; el.dispatchEvent(new Event('input', { bubbles: true })); });
      await dialog.getByRole('button', { name: 'Open evidence & field notes' }).click();
      await dialog.getByRole('button', { name: 'Return to the mechanism' }).click();
      assert.equal(await dialog.getByRole('spinbutton').inputValue(), '135');
      assert.equal(await dialog.getByRole('slider').inputValue(), '135');
      await submit.click();
      await page.getByRole('button', { name: 'Enter next gallery' }).waitFor();
      assert.deepEqual(errors, []);
      console.log('PASS: object clicks alone remain incomplete; all four origin placements unlock; notebook retains placements and rotation; mobile lock fits; first passage opens.'); return;
    }
    if (process.env.HEIST_MOBILE_ONLY) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForFunction(() => !document.querySelector('.painting-controls button')?.disabled);
      await page.screenshot({ path: path.join(out, 'gallery-mobile.png'), fullPage: true });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.locator('.painting-controls button').first().click();
      await dialog.locator('.detail-studies button').first().click();
      await page.screenshot({ path: path.join(out, 'mobile-inspection.png'), fullPage: true });
      assert.equal(await dialog.getByRole('button', { name: 'Choose the passage beneath this painting' }).isEnabled(), true);
      assert.deepEqual(errors, []); console.log('PASS: mobile layout, painting inspection and no horizontal overflow.'); return;
    }
    const operate = async lock => {
      await dialog.locator('[data-lock-type]').waitFor();
      if (['rotation', 'combo', 'measurement'].includes(lock.type)) {
        await dialog.getByRole('spinbutton').fill(String(lock.target));
        if (lock.type === 'combo') {
          for (const [index, digit] of String(lock.target).padStart(lock.digits, '0').split('').entries())
            for (let i = 0; i < Number(digit); i++) await dialog.getByRole('button', { name: `Increase digit ${index + 1}`, exact: true }).click();
        } else {
          const slider = dialog.getByRole('slider'); await slider.focus(); await slider.press('Home'); await slider.press('ArrowRight');
          assert.equal(Number(await slider.inputValue()), lock.min + lock.step);
          // Verify the native keyboard step, then set the remaining range through its normal input event.
          await slider.evaluate((element, target) => { element.value = String(target); element.dispatchEvent(new Event('input', { bubbles: true })); }, lock.target);
        }
      } else if (lock.type === 'cargo') {
        await dialog.getByRole('spinbutton').fill(String(lock.capacity));
        for (const id of lock.requiredItems) await dialog.locator('.cargo-items button').filter({ hasText: lock.items.find(i => i.id === id).label }).click();
      } else if (lock.type === 'lever') {
        await dialog.locator('.levers button').filter({ hasText: lock.items.find(i => i.id === lock.solution[0]).label }).click();
      } else if (lock.type === 'timeline') {
        const order = lock.items.map(i => i.id);
        for (const [target, id] of lock.solution.entries()) {
          let index = order.indexOf(id);
          while (index > target) { await dialog.getByRole('button', { name: `Move ${lock.items.find(i => i.id === id).label} earlier`, exact: true }).click(); [order[index - 1], order[index]] = [order[index], order[index - 1]]; index--; }
        }
      } else if (lock.type === 'map-route') {
        for (const id of lock.solution) await dialog.locator('.route-map button').filter({ hasText: lock.items.find(i => i.id === id).label }).click();
      } else {
        for (const item of lock.items) {
          await dialog.locator('.sort-items button').filter({ hasText: item.label }).click();
          await dialog.locator('.sort-zones button').filter({ hasText: lock.zones.find(z => z.id === lock.matches[item.id]).label }).click();
        }
      }
      await dialog.getByRole('button', { name: 'Operate mechanism' }).click();
    };
    // Exercise a false classification, a reload while blocked, and the complete recovery path.
    await page.locator('.painting-controls button').first().click();
    assert.equal(await dialog.getByRole('button', { name: 'Choose the passage beneath this painting' }).isDisabled(), true);
    await dialog.locator('.detail-studies button').first().click();
    await dialog.getByRole('button', { name: 'Choose the passage beneath this painting' }).click();
    await dialog.getByRole('button', { name: 'Wrong timeline' }).click();
    await dialog.getByRole('button', { name: 'Confirm fraud analysis' }).click();
    await page.reload(); await page.getByRole('button', { name: 'Investigate fraud', exact: false }).click();
    await dialog.locator('.detail-studies button').first().click();
    await dialog.getByRole('button', { name: 'Wrong animal / plant' }).click();
    await dialog.getByRole('button', { name: 'Confirm fraud analysis' }).click();
    await page.screenshot({ path: path.join(out, 'fraud-recovery.png'), fullPage: true });
    await dialog.getByRole('button', { name: 'Review clues & audit steps' }).click();
    assert.match(await dialog.locator('.clue-entry').innerText(), /Fraud identified · repair pending/);
    await dialog.getByRole('button', { name: 'Continue current mechanism' }).click();
    await operate(mission.locks.find(l => l.id === mission.chambers[0].paintings[0].fraud.recoveryLockId));
    for (const chamber of mission.chambers) {
      const paintingIndex = chamber.paintings.findIndex(p => p.authentic);
      await page.locator('.painting-controls button').nth(paintingIndex).click();
      await dialog.locator('.detail-studies button').first().click();
      await dialog.getByRole('button', { name: 'Choose the passage beneath this painting' }).click();
      for (const id of chamber.lockIds) {
        const lock = mission.locks.find(l => l.id === id);
        if (chamber.layout === 'vault') {
          await dialog.getByRole('button', { name: 'Review clues & audit steps' }).click();
          assert.match(await dialog.locator('.mechanism-checklist [aria-current="step"]').innerText(), new RegExp(lock.title));
          assert.match(await dialog.locator('.clue-entry').first().innerText(), /Fraud sealed/);
          await page.screenshot({ path: path.join(out, `vault-audit-${id}.png`), fullPage: true });
          await dialog.getByRole('button', { name: 'Continue current mechanism' }).click();
        }
        if (lock.type === 'rotation' && chamber.id === 'shore') await page.screenshot({ path: path.join(out, 'compass-lock.png'), fullPage: true });
        await operate(lock);
      }
      await page.getByRole('button', { name: chamber.next ? 'Enter next gallery' : 'Recover the collection' }).click();
      console.log(`Cleared ${chamber.id}.`);
    }
    await dialog.getByRole('heading', { name: 'Historical Authentication Dossier' }).waitFor();
    for (let i = 0; i < mission.defensePrompts.length; i++) await dialog.locator('textarea').nth(i).fill(`The evidence in field note ${i + 1} helped me compare the claim with its historical setting.`);
    await dialog.getByRole('button', { name: 'Save defense', exact: true }).click();
    const downloadEvent = page.waitForEvent('download'); await dialog.getByRole('button', { name: 'Export evidence JSON' }).click();
    const download = await downloadEvent; const file = path.join(out, download.suggestedFilename()); await download.saveAs(file);
    const dossier = JSON.parse(fs.readFileSync(file, 'utf8'));
    assert.equal(dossier.complete, true); assert.equal(dossier.authenticPaintings.length, 8); assert.equal(dossier.frauds.length, 1); assert.equal(dossier.finalVault, true);
    assert.equal(dossier.clueLog.length, 9); assert.equal(dossier.clueLog[0].status, 'Fraud sealed');
    assert.equal(dossier.vaultAudit.steps.every(s => s.complete), true);
    assert.equal(dossier.vaultAudit.locks.every(l => l.complete), true);
    assert.equal(dossier.defense.every(d => d.response.length > 0), true);
    await page.screenshot({ path: path.join(out, 'completed-dossier.png'), fullPage: true });
    await dialog.getByRole('button', { name: 'Close workspace' }).click();
    await page.getByRole('button', { name: 'View replay' }).click();
    await dialog.getByRole('slider').focus(); await dialog.getByRole('slider').press('Home');
    await dialog.getByRole('button', { name: 'Close workspace' }).click();
    await page.reload(); await page.getByRole('button', { name: 'Open dossier' }).waitFor();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForFunction(() => !document.querySelector('.painting-controls button')?.disabled);
    await page.screenshot({ path: path.join(out, 'gallery-mobile.png'), fullPage: true });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.deepEqual(errors, []);
    console.log('PASS: real Phaser; fraud correction and reload; all 8 galleries; 17 passage locks; extraction; defense export; replay; mobile overflow.');
  } catch (error) {
    await page.screenshot({ path: path.join(out, 'failure.png'), fullPage: true });
    console.error((await page.locator('body').innerText()).slice(-5000));
    throw error;
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
