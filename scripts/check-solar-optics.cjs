const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const THREE = require('../public/simulations/solar-monument/vendor/three.min.js');
const root = path.resolve(__dirname, '../public/simulations/solar-monument');
const context = vm.createContext({ window: {}, console, structuredClone });
for (const file of ['geometry.js', 'optics.js', 'optics-renderer.js']) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
const { SolarGeometry: G, SolarOptics: O, createSolarOpticsRenderer } = context.window;
const renderer = createSolarOpticsRenderer(THREE);
const block = { id: 'window', x: 0, y: .5, z: 0, width: 1, height: 1, depth: .1, rotation: 0, aperture: { axis: 'z', diameter: .6, insert: 'glass', color: 'red' } };
const design = { blocks: [block], targets: [] };
const d = G.sunDirection(45, 180), point = { x: 0, z: -1 };
assert.equal(O.trace(design, point, d).value, 'red light');
assert.equal(O.trace({ ...design, blocks: [{ ...block, aperture: undefined }] }, point, d).value, 'shadow');
assert.equal(O.trace({ ...design, blocks: [{ ...block, aperture: { ...block.aperture, insert: 'open' } }] }, point, d).value, 'sunlight');
assert.equal(O.trace({ ...design, blocks: [{ ...block, depth: .8 }] }, point, d).value, 'shadow', 'A deep bore blocks a steep ray even when its centre lines up.');
assert.equal(O.trace(design, point, G.sunDirection(-1, 180)).value, 'unavailable');
const blocker = { id: 'blocker', x: 0, y: 0, z: -.5, width: .2, height: .8, depth: .1, rotation: 0 };
assert.equal(O.trace({ ...design, blocks: [block, blocker] }, point, d).value, 'shadow');
const blue = { ...block, id: 'blue', y: 1.5, z: 1, aperture: { ...block.aperture, color: 'blue' } };
const filtered = O.trace({ ...design, blocks: [block, blue] }, point, d);
assert.equal(filtered.value, 'mixed filters');
assert.ok(filtered.rgb.every((v, i) => Math.abs(v - O.colors.red[i] * O.colors.blue[i]) < 1e-12));
assert.equal(O.validDesign(design), true);
for (const aperture of [null, { ...block.aperture, diameter: 2 }, { ...block.aperture, color: '__proto__' }, { ...block.aperture, axis: 'bad' }]) assert.equal(O.validDesign({ ...design, blocks: [{ ...block, aperture }] }), false);
assert.equal(O.validDesign({ ...design, displayObject: { model: 'import-missing' } }), false);

// Independent Three triangle raycasts check rendered bores against analytic solids.
let comparisons = 0;
const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
for (const axis of ['x', 'y', 'z']) for (const rotation of [0, 37, 90]) {
  const b = { ...block, depth: .6, rotation, aperture: { ...block.aperture, axis, diameter: .4 } };
  const mesh = new THREE.Mesh(renderer.blockGeometry(b), material);
  mesh.position.set(b.x, b.y + b.height / 2, b.z); mesh.rotation.y = rotation * Math.PI / 180; mesh.updateMatrixWorld(true);
  for (const altitude of [15, 45, 75, 90]) for (const azimuth of [0, 65, 180, 270]) for (let j = -5; j <= 5; j++) {
    const direction = G.sunDirection(altitude, azimuth), origin = new THREE.Vector3(j * .173, .00001, -j * .239);
    const hits = new THREE.Raycaster(origin, new THREE.Vector3(direction.x, direction.y, direction.z)).intersectObject(mesh);
    const analytic = O.blockPass(origin, direction, b);
    assert.equal(!!hits.length, !analytic, `Bore ${axis}, rotation ${rotation}, altitude ${altitude}, azimuth ${azimuth}, sample ${j}`);
    comparisons++;
  }
  mesh.geometry.dispose();
}
for (const model of ['sphere', 'crystal', 'obelisk']) for (const rotation of [0, 37]) {
  const o = { model, material: 'limestone', x: .4, y: 0, z: -.2, width: .8, height: 1.2, rotation };
  const mesh = renderer.objectMesh(o); mesh.material.side = THREE.DoubleSide; mesh.updateMatrixWorld(true);
  for (const altitude of [20, 50, 80]) for (const azimuth of [30, 180, 280]) for (let j = -7; j <= 7; j++) {
    const dir = G.sunDirection(altitude, azimuth), origin = new THREE.Vector3(j * .217, .00001, -.57);
    const hits = new THREE.Raycaster(origin, new THREE.Vector3(dir.x, dir.y, dir.z)).intersectObject(mesh);
    assert.equal(!!hits.length, O.objectBlocks(origin, dir, o), `Object ${model}, rotation ${rotation}, sample ${j}`);
    comparisons++;
  }
  mesh.geometry.dispose(); mesh.material.dispose();
}
const object = { model: 'crystal', material: 'porcelain', x: 0, y: 0, z: -.7, width: .4, height: .65, rotation: 0 };
assert.match(O.objectReadings({ ...design, displayObject: object }, d), /red light/);
assert.equal(O.trace({ blocks: [], targets: [], displayObject: { ...object, model: 'sphere', z: -.5, height: .8, width: .8 } }, { x: 0, z: -.8 }, d).value, 'shadow');
renderer.setDesign({ ...design, displayObject: object }); renderer.setSun(d);
const shader = { vertexShader: THREE.ShaderLib.standard.vertexShader, fragmentShader: THREE.ShaderLib.standard.fragmentShader, uniforms: {} };
const litMaterial = renderer.material({ color: 0xffffff }); litMaterial.onBeforeCompile(shader);
assert.ok(shader.fragmentShader.includes('directLight.color *= solarTransmission();'));
assert.equal(shader.uniforms.solarCount.value, 1);
assert.ok(Math.abs(shader.uniforms.solarBlocks.value.image.data[12] - .86) < 1e-6);
assert.equal(shader.uniforms.solarSkipObject.value, false);
assert.equal(shader.uniforms.solarDirection.value.y, d.y);
renderer.dispose(); material.dispose(); litMaterial.dispose();
console.log(`Solar optics: ${comparisons} independent mesh-ray comparisons, bore depth, all axes/rotation, filters, blocking, night, object illumination and GPU bindings passed.`);
