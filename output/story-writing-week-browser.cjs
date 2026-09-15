const { spawn } = require('node:child_process');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const dir = path.join(__dirname, 'story-writing-week-browser');
const base = 'http://127.0.0.1:4399/projects/survival-island-story-lab';
const pending = new Map(); let seq = 0; let sessionId; let bytes = '';
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-background-networking', '--disable-extensions', '--remote-debugging-pipe',
  '--user-data-dir=' + path.join(dir, 'profile'), 'about:blank',
], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'] });
chrome.stderr.on('data', () => {});
const errors = [];
chrome.stdio[4].on('data', chunk => {
  bytes += chunk.toString();
  let split;
  while ((split = bytes.indexOf('\0')) >= 0) {
    const raw = bytes.slice(0, split); bytes = bytes.slice(split + 1);
    if (!raw) continue;
    const message = JSON.parse(raw);
    const waiter = pending.get(message.id);
    if (waiter) { pending.delete(message.id); clearTimeout(waiter.timer); message.error ? waiter.reject(new Error(JSON.stringify(message.error))) : waiter.resolve(message.result); }
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text + ' ' + (message.params.exceptionDetails.exception?.description || ''));
  }
});
function send(method, params = {}, target = sessionId) {
  const id = ++seq;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { pending.delete(id); reject(new Error('CDP timeout: ' + method)); }, 30000);
    pending.set(id, { resolve, reject, timer });
    chrome.stdio[3].write(JSON.stringify({ id, method, params, ...(target ? { sessionId: target } : {}) }) + '\0');
  });
}
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
async function until(expression) {
  for (let i = 0; i < 160; i++) { if (await evaluate(expression)) return; await sleep(150); }
  throw new Error('DOM condition timed out: ' + expression);
}
async function navigate(number) {
  await send('Page.navigate', { url: base + '/lessons?lesson=' + number });
  await until("!!document.querySelector('app-narrative-week-workspace .active-surface')");
}
async function screenshot(name) {
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await fs.writeFile(path.join(dir, name + '.png'), Buffer.from(shot.data, 'base64'));
}
async function clickText(text) {
  await evaluate(`(() => { const b = [...document.querySelectorAll('app-narrative-week-workspace button')].find(b => b.textContent.trim() === ${JSON.stringify(text)}); if (!b) throw new Error('Button missing'); b.click(); })()`);
  await sleep(120);
}
async function metrics() {
  return evaluate(`(() => { const w = document.querySelector('.week-workspace'); const i = w.querySelector('.interactive').getBoundingClientRect(); const p = w.querySelector('.planning').getBoundingClientRect(); return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, activityWidth: i.width, planningWidth: p.width, planningTop: p.top, activityTop: i.top, primaryTop: w.querySelector('.primary')?.getBoundingClientRect().top, text: w.innerText }; })()`);
}
(async () => {
  await fs.mkdir(dir, { recursive: true });
  const target = await send('Target.createTarget', { url: 'about:blank' }, undefined);
  sessionId = (await send('Target.attachToTarget', { targetId: target.targetId, flatten: true }, undefined)).sessionId;
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false });
  const report = { sessions: [], layouts: [], errors };
  const tools = ['Scene writer', 'Scene writer', 'Branch map', 'Play story', 'Compare & revise', 'Play story', 'Scene writer', 'Play story'];
  for (let number = 1; number <= 8; number++) {
    await navigate(number);
    const current = await evaluate("({week: document.querySelector('.week-workspace').dataset.week, tool: document.querySelector('.tool-bar .active').textContent.trim(), title: document.querySelector('.session-bar h2').textContent, storageKeys: Object.keys(localStorage)})");
    assert.equal(current.week, String(Math.ceil(number / 2))); assert.equal(current.tool, tools[number - 1]);
    assert.ok(!(await evaluate("!!document.querySelector('app-narrative-week-workspace form, app-narrative-week-workspace input[type=checkbox]')")));
    report.sessions.push(current);
    if ([1,3,5,8].includes(number)) await screenshot('laptop-session-' + number);
  }
  await navigate(1);
  await evaluate("(() => { const t = document.querySelector('textarea[aria-label=\"Your scene\"]'); t.value = ''; t.dispatchEvent(new Event('input', {bubbles:true})); })()");
  const links = await evaluate("[...document.querySelectorAll('app-project-lesson-nav a')].map(a=>({href:a.getAttribute('href'),text:a.textContent.trim()}))");
  report.lessonLinks = links;
  async function switchLesson(number) {
    const href = '/projects/survival-island-story-lab/lessons?lesson=' + number;
    await evaluate(`(() => { const a = [...document.querySelectorAll('app-project-lesson-nav a')].find(a => a.getAttribute('href') === ${JSON.stringify(href)}); if(!a) throw new Error('Lesson link missing'); a.click(); })()`);
    await until(`document.querySelector('.session-bar h2')?.textContent === ${JSON.stringify(report.sessions[number-1].title)}`);
  }
  await switchLesson(2); await switchLesson(1);
  assert.equal(await evaluate("document.querySelector('textarea[aria-label=\"Your scene\"]').value"), '');
  report.emptyDraftRetained = true;
  await send('Page.reload'); await until("document.querySelector('textarea[aria-label=\"Your scene\"]')?.value.startsWith('Salt scratched')");
  assert.ok((await evaluate("document.querySelector('textarea').value")).startsWith('Salt scratched'));
  report.reloadRestoresSample = true;
  for (const [width,height,name] of [[1366,768,'laptop'],[820,1180,'tablet'],[390,844,'phone']]) {
    await send('Emulation.setDeviceMetricsOverride', { width,height,deviceScaleFactor:1,mobile:false });
    await navigate(5); await screenshot(name + '-revision');
    const layout = await metrics(); assert.ok(layout.scrollWidth <= width, name + ' horizontal overflow');
    const heading = await evaluate("({top: document.querySelector('.mission-header').getBoundingClientRect().top, navBottom: document.querySelector('app-project-lesson-nav').getBoundingClientRect().bottom})");
    assert.ok(heading.top >= heading.navBottom, name + ' story heading hidden by navigation');
    report.layouts.push({name,...layout,text:undefined});
    await evaluate("document.querySelector('.plan-card summary').focus()");
    await send('Page.bringToFront');
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key:'Enter', code:'Enter', text:'\r', windowsVirtualKeyCode:13 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key:'Enter', code:'Enter', windowsVirtualKeyCode:13 });
    assert.equal(await evaluate("document.querySelector('.plan-card').open"), false);
    report.layouts.at(-1).keyboardCollapse = true;
  }
  await navigate(8);
  await clickText('1 Climb the tower with the red cloth →').catch(async () => {
    await evaluate("document.querySelector('.reader-choices button').click()");
  });
  await until("document.querySelector('.reader h2')?.textContent === 'The missing rung'");
  await evaluate("document.querySelector('.reader-choices button').click()"); await sleep(150);
  await evaluate("document.querySelector('.reader-choices button').click()");
  await until("document.querySelector('.ending')?.textContent === 'End of this path'");
  report.finalPathPlayed = true;
  await screenshot('phone-final-ending');
  await send('Page.navigate', { url: base + '/final-demo' });
  await until("document.body.innerText.includes('Story') || document.body.innerText.includes('story')");
  await sleep(1000);
  report.finalExample = await evaluate("({title: document.title, text: document.body.innerText.slice(0,1200), weeklyWorkspace: !!document.querySelector('app-narrative-week-workspace')})");
  assert.equal(report.finalExample.weeklyWorkspace, false);
  await fs.writeFile(path.join(dir,'report.json'), JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  assert.deepEqual(errors, []);
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => {
  await send('Browser.close', {}, undefined).catch(() => {}); chrome.kill();
});
