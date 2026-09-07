// Exercise the real scene/controller with CPU Three.js geometry and a stub GPU.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '../public/simulations/solar-monument');
const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {
  url: 'https://solar-test.example/', runScripts: 'outside-only', pretendToBeVisual: true,
});
const w = dom.window;
w.structuredClone = structuredClone;
const frames = [];
w.requestAnimationFrame = callback => frames.push(callback);
w.HTMLElement.prototype.getBoundingClientRect = () => ({ width: 800, height: 600, left: 0, top: 0 });
const context2d = new Proxy({
  measureText: () => ({ width: 60 }),
  createLinearGradient: () => ({ addColorStop() {} }),
  createRadialGradient: () => ({ addColorStop() {} }),
}, { get: (target, key) => target[key] ?? (() => {}) });
w.HTMLCanvasElement.prototype.getContext = () => context2d;
for (const file of ['vendor/three.min.js', 'vendor/suncalc.js', 'vendor/luxon.min.js', 'vendor/tz.js', 'seasons.js', 'geometry.js', 'solar-day.js', 'monument-camera.js', 'optics.js', 'monument-surfaces.js', 'optics-renderer.js', 'sky-model.js', 'sun-demonstration.js', 'earth-explanation.js', 'season-review.js', 'sundial-lab.js']) w.eval(fs.readFileSync(path.join(root, file), 'utf8'));
let renderedScene;
let renderCount = 0;
let renderedBlocks = [];
let renderedCamera;
w.THREE.WebGLRenderer = class {
  shadowMap = {};
  setPixelRatio() {}
  setSize() {}
  setScissorTest() {}
  setScissor() {}
  setViewport() {}
  render(scene, camera) {
    renderedCamera = camera;
    renderedScene = scene; renderCount++;
    renderedBlocks = [];
    scene.traverse(object => { if (object.name.startsWith('design-block:')) renderedBlocks.push(object.name); });
  }
};
const controls = {};
const globe = new Proxy({}, { get: (_, key) => key === 'controls' ? () => controls : () => globe });
w.Globe = () => () => globe;
const replies = [];
w.postMessage = payload => replies.push(payload);
w.eval(fs.readFileSync(path.join(root, 'game.js'), 'utf8'));
const design = { blocks: [{ id: 'asymmetric', x: .4, y: 0, z: -.3, width: .2, height: 1, depth: .6, rotation: 30 }], targets: [] };
function send(payload) {
  w.dispatchEvent(new w.MessageEvent('message', { origin: w.location.origin, source: w, data: { channel: 'forge.design-simulation.v1', ...payload } }));
}
send({ type: 'design', design });
frames.shift()();
const block = renderedScene.children.flatMap(child => child.children).find(mesh => mesh.geometry?.type === 'BoxGeometry');
assert.ok(block, 'The supplied physical block must be rendered.');
renderedScene.updateMatrixWorld(true);
const before = block.matrixWorld.elements.slice();
const court = renderedScene.getObjectByName('carved-stone-court');
assert.ok(court, 'The stone court must receive the measured shadows.');
const courtPoint = new w.THREE.Vector3().fromBufferAttribute(court.geometry.attributes.position, 0).applyMatrix4(court.matrixWorld);
assert.ok(Math.abs(courtPoint.y) < 1e-10, 'Carving must preserve the y=0 measurement plane.');
const grid = renderedScene.children.find(child => child.isGridHelper || child.type === 'GridHelper');
assert.equal(grid.visible, false);
w.document.getElementById('gridToggle').click();
assert.equal(grid.visible, true);
assert.match(w.document.getElementById('sceneLabel').textContent, /1 square = 1 metre/);
w.document.getElementById('gridToggle').click();
assert.equal(grid.visible, false);
for (let i = 0; i < 120; i++) frames.shift()();
renderedScene.updateMatrixWorld(true);
assert.deepEqual(block.matrixWorld.elements, before, 'Animation must never rotate a measured monument.');
w.document.getElementById('cameraBearing').value = '145';
w.document.getElementById('cameraBearing').dispatchEvent(new w.Event('input'));
renderedScene.updateMatrixWorld(true);
assert.deepEqual(block.matrixWorld.elements, before, 'Camera orbit must not change the design.');
frames.shift()();
let previousRenders = renderCount;
const replacement = { ...design, blocks: [{ ...design.blocks[0], id: 'new-sample' }] };
send({ type: 'design', design: replacement });
frames.shift()();
assert.equal(renderCount, previousRenders + 1, 'Choosing a sample must refresh the canvas without moving the camera.');
assert.deepEqual(renderedBlocks, ['design-block:new-sample']);
previousRenders = renderCount;
send({ type: 'restore', capture: { design, settings: { latitude: 38.83, longitude: -104.82, localDate: '2026-12-21', minutes: 720 } } });
frames.shift()();
assert.equal(renderCount, previousRenders + 1, 'Changing the date must refresh the monument while the sky guide is closed.');
assert.deepEqual(renderedBlocks, ['design-block:asymmetric']);
for (const id of ['topView', 'angleView', 'skyView']) w.document.getElementById(id).click();
send({ type: 'restore', capture: { design, settings: { latitude: 38.83, longitude: -104.82, localDate: '2026-06-21', minutes: 782 } } });
send({ type: 'capture', id: 'trial-sky', design });
const capture = replies.find(reply => reply.type === 'capture').capture;
assert.equal(capture.settings.modelVersion, 'solar-optics-2.0');
assert.equal(capture.settings.utcInstant, '2026-06-21T19:02:00.000Z');
const position = w.SunCalc.getPosition(new w.Date(capture.settings.utcInstant), 38.83, -104.82);
const direction = w.SolarGeometry.sunDirection(position.altitude * 180 / Math.PI, position.azimuth * 180 / Math.PI + 180);
const light = renderedScene.children.find(child => child.isDirectionalLight);
const normal = light.position.clone().normalize();
for (const axis of ['x', 'y', 'z']) assert.ok(Math.abs(normal[axis] - direction[axis]) < 1e-10, 'Lighting and evidence use the same Sun direction.');
send({ type: 'restore', capture: { design, settings: { latitude: 38.83, longitude: -104.82, localDate: '2026-06-21', minutes: 0 } } });
assert.equal(light.intensity, 0, 'There is no direct solar illumination at night.');
send({ type: 'review', id: 'review-one', design, checks: [] });
const review = replies.find(reply => reply.type === 'review');
assert.equal(review.captures.length, 4);
assert.ok(review.captures.every(capture => capture.settings.outcome === 'unconfigured'));
send({ type: 'restore', capture: review.captures[1] });
assert.equal(w.document.getElementById('dateInput').value, '2026-06-21');
assert.ok(w.document.getElementById('shadowInfo').textContent.includes('74.6'));
assert.ok(w.document.getElementById('labControls').hidden, 'Guides start closed so the canvas gets the full width.');
w.document.getElementById('controlsToggle').click();
assert.equal(w.document.getElementById('labControls').hidden, false);
w.document.getElementById('closeControls').click();
assert.ok(w.document.getElementById('labControls').hidden);
// A deterministic clock verifies the complete day without a real-time wait.
let now = 0, tick;
w.performance.now = () => now;
w.setInterval = fn => { tick = fn; return 1; };
w.clearInterval = () => { tick = undefined; };
const slider = w.document.getElementById('daySlider'), play = w.document.getElementById('playBtn');
w.document.getElementById('angleView').click();
w.document.getElementById('noonBtn').click(); frames.shift()();
const noonCamera = renderedCamera.position.clone();
play.click();
assert.ok(Math.abs(Number(slider.value) - Number(slider.min)) < .001, 'Play starts at sunrise.');
now += 500; tick(); frames.shift()();
assert.ok(renderedCamera.position.equals(noonCamera), 'The daily cycle preserves the frame so movement is in the light.');
play.click(); const paused = Number(slider.value);
assert.equal(tick, undefined);
assert.match(play.textContent, /Resume/);
play.click();
assert.ok(Math.abs(Number(slider.value) - paused) < .001, 'Resume does not restart at sunrise.');
w.document.getElementById('daySpeed').value = '2';
for (let i = 0; i < 100 && tick; i++) { now += 500; tick(); }
assert.equal(tick, undefined, 'Playback stops at sunset.');
assert.ok(Math.abs(Number(slider.value) - Number(slider.max)) < .001);
assert.match(play.textContent, /Replay/);
w.document.getElementById('noonBtn').click();
for (const id of ['marchBtn', 'juneBtn', 'septBtn', 'decBtn']) {
  w.document.getElementById(id).click();
  send({ type: 'capture', id, design });
  const c = replies.find(r => r.type === 'capture' && r.capture.id === id).capture;
  const expected = w.SolarDay.observe(c.settings);
  assert.ok(Math.abs(new w.Date(c.settings.utcInstant) - expected.date) < 2, 'Season shortcuts preserve solar noon exactly.');
}
send({ type: 'presentation', active: true });
send({ type: 'review', id: 'stable-camera', design, checks: [] });
const four = replies.find(r => r.type === 'review' && r.id === 'stable-camera').captures;
const positions = four.map(capture => { send({ type: 'restore', capture }); frames.shift()(); return renderedCamera.position.clone(); });
assert.ok(positions.every(p => p.distanceTo(positions[0]) < 1e-10), 'Final seasons share one camera frame.');
send({ type: 'nearby', capture: four[0], offset: -7 });
assert.equal(w.document.getElementById('dateInput').value, '2026-03-13');
w.document.getElementById('zoomIn').click(); frames.shift()();
assert.ok(renderedCamera.position.distanceTo(positions[0]) > .01, 'Zoom controls move the real rendered camera.');
send({ type: 'presentation', active: false });
send({ type: 'restore', capture: { design, settings: { latitude: 89, longitude: 0, localDate: '2026-12-21', minutes: 720 } } });
assert.ok(play.disabled && slider.disabled, 'A polar night cannot play a nonexistent sunrise-to-sunset cycle.');
send({ type: 'restore', capture: { design, settings: { latitude: 64.15, longitude: -21.94, localDate: '2026-06-15', minutes: 720 } } });
w.document.getElementById('dayEnd').click();
send({ type: 'capture', id: 'after-midnight', design });
const late = replies.find(r => r.type === 'capture' && r.capture.id === 'after-midnight').capture;
assert.ok(late.settings.minutes > 1440);
assert.match(late.settings.utcInstant, /^2026-06-16T00:/);
send({ type: 'restore', capture: late });
assert.match(w.document.getElementById('dayClock').textContent, /\+1 day/);
// The first four lessons use a separate, measured post and persist edits through the host.
let practice = w.SundialLab.build({ blocks: [], targets: [] }, 60);
send({ type: 'restore', capture: { design: practice, settings: { latitude: 38.83, longitude: -104.82, localDate: '2026-06-21', minutes: 720 } } });
send({ type: 'lesson', activity: 'sundial-build' });
assert.ok(!w.document.getElementById('sundialTools').hidden && w.document.getElementById('earthToggle').hidden);
assert.ok(w.document.querySelector('.season-grid').hidden, 'The first lesson focuses on one day.');
w.document.getElementById('postHeight').value = '80'; w.document.getElementById('buildSundial').click();
let edit = replies.findLast(r => r.type === 'design-change');
assert.equal(edit.design.blocks[0].height, .8); assert.equal(edit.activity, 'sundial-build');
practice = edit.design; send({ type: 'design', design: practice });
w.document.getElementById('dialMorning').click(); w.document.getElementById('markDial').click();
practice = replies.findLast(r => r.type === 'design-change').design;
assert.equal(practice.targets[0].label, '9:00 AM');
send({ type: 'design', design: practice });
const marks = JSON.stringify(practice.targets);
send({ type: 'lesson', activity: 'sundial-seasons' });
assert.equal(w.document.getElementById('dateInput').value, '2026-12-21');
assert.ok(w.document.getElementById('earthGuide').hidden && w.document.getElementById('markDial').hidden);
send({ type: 'capture', id: 'season-surprise', design: practice });
assert.equal(JSON.stringify(replies.find(r => r.type === 'capture' && r.capture.id === 'season-surprise').capture.design.targets), marks);
send({ type: 'lesson', activity: 'sundial-tilt' });
assert.equal(w.document.getElementById('earthGuide').hidden, false, 'The tilt explanation comes after the observation prompt.');
send({ type: 'lesson', activity: 'sundial-calendar' });
for (const id of ['marchBtn', 'juneBtn', 'septBtn', 'decBtn']) {
  w.document.getElementById(id).click(); w.document.getElementById('markDial').click();
  practice = replies.findLast(r => r.type === 'design-change').design; send({ type: 'design', design: practice });
}
assert.equal(practice.targets.length, 5);
assert.equal(JSON.stringify(practice.targets.slice(0, 1)), marks);
send({ type: 'capture', id: 'dial-december', design: practice });
const dialCapture = replies.find(r => r.type === 'capture' && r.capture.id === 'dial-december').capture;
assert.equal(dialCapture.measurements.find(m => m.label.includes('December solstice')).value, '0.0 cm from the shadow tip', 'Practice evidence measures tip alignment, not whether some part of a long shadow covers a mark.');
w.document.getElementById('dialWeekBefore').click(); assert.equal(w.document.getElementById('dateInput').value, '2026-12-14');
w.document.getElementById('dialWeekAfter').click(); assert.equal(w.document.getElementById('dateInput').value, '2026-12-28');
send({ type: 'view-policy', readOnly: true });
const editsBefore = replies.filter(r => r.type === 'design-change').length;
w.document.getElementById('markDial').click();
assert.equal(replies.filter(r => r.type === 'design-change').length, editsBefore);
send({ type: 'view-policy', readOnly: false }); send({ type: 'design', design }); send({ type: 'lesson', activity: 'monument' });
assert.ok(w.document.getElementById('sundialTools').hidden && !w.document.getElementById('buildMode').hidden);
// Consolidated header commands call the same measured controls; no duplicate astronomy state.
send({ type: 'hosted-chrome', active: true });
assert.ok(w.document.body.classList.contains('hosted-chrome'));
const ui = () => replies.findLast(r => r.type === 'toolbar-state').state;
send({ type: 'toolbar-action', action: 'dialMorning' }); assert.equal(ui().minutes, 540);
send({ type: 'toolbar-action', action: 'minutes', value: 99999 }); assert.equal(ui().minutes, 540);
send({ type: 'toolbar-action', action: 'dec' }); assert.equal(ui().date, 'Dec 21, 2026');
send({ type: 'toolbar-action', action: 'noonBtn' }); assert.equal(ui().noon, true);
send({ type: 'toolbar-action', action: 'playBtn' }); assert.match(ui().play, /Pause/);
send({ type: 'toolbar-action', action: 'playBtn' }); assert.match(ui().play, /Resume/);
send({ type: 'design', design: practice }); send({ type: 'lesson', activity: 'sundial-build' });
send({ type: 'toolbar-action', action: 'post', value: 110 });
assert.equal(replies.findLast(r => r.type === 'design-change').design.blocks[0].height, 1.1);
send({ type: 'lesson', activity: 'sundial-tilt' });
assert.equal(w.document.getElementById('earthGuide').hidden, true, 'Embedded directions and Earth explanation open only when requested.');
w.HTMLElement.prototype.scrollIntoView = () => {};
send({ type: 'toolbar-action', action: 'earthToggle' }); assert.equal(w.document.getElementById('earthGuide').hidden, false);
send({ type: 'presentation', active: true }); const protectedMinutes = ui().minutes;
send({ type: 'toolbar-action', action: 'minutes', value: 600 }); assert.equal(ui().minutes, protectedMinutes, 'Manual header actions cannot desynchronize a final review.');
send({ type: 'view-policy', readOnly: true }); const beforeProtectedEdit = replies.filter(r => r.type === 'design-change').length;
send({ type: 'toolbar-action', action: 'post', value: 150 }); assert.equal(replies.filter(r => r.type === 'design-change').length, beforeProtectedEdit);
dom.window.close();
console.log('Solar scene: fixed geometry, independent camera, views, shared lighting, night, seasonal review/replay and guide drawer passed.');
