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
for (const file of ['vendor/three.min.js', 'vendor/suncalc.js', 'vendor/luxon.min.js', 'vendor/tz.js', 'seasons.js', 'geometry.js', 'optics.js', 'monument-surfaces.js', 'optics-renderer.js', 'sky-model.js', 'season-review.js']) w.eval(fs.readFileSync(path.join(root, file), 'utf8'));
let renderedScene;
let renderCount = 0;
let renderedBlocks = [];
w.THREE.WebGLRenderer = class {
  shadowMap = {};
  setPixelRatio() {}
  setSize() {}
  render(scene) {
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
dom.window.close();
console.log('Solar scene: fixed geometry, independent camera, views, shared lighting, night, seasonal review/replay and guide drawer passed.');
