const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), ts = require('typescript');
const root = path.resolve(__dirname, '..'), dir = 'src/app/projects/calendar-monument/';
function moduleData(file) { const context = { exports: {} }; vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, context); return context.exports; }
const { solsticeGatesDesign: design, solsticeGatesStarter: starter, solsticeGateSite: settings, solsticeGatesChecks: checks, solsticeGateSun: expectedSun } = moduleData(dir + 'calendar-monument.solstice-gates.ts');
const { isBlockDesign } = moduleData('src/app/shared/engineering/block-design.ts');
const w = { structuredClone }; w.window = w; vm.createContext(w);
for (const f of ['vendor/suncalc.js', 'vendor/luxon.min.js', 'geometry.js', 'solar-day.js', 'monument-camera.js', 'optics.js', 'seasons.js', 'season-review.js']) vm.runInContext(fs.readFileSync(path.join(root, 'public/simulations/solar-monument', f), 'utf8'), w);
assert.ok(isBlockDesign(design)); assert.ok(w.SolarOptics.validDesign(design)); assert.ok(isBlockDesign(starter)); assert.equal(design.blocks.length, 3);
for (const bad of [{ y: -1 }, { y: NaN }, { y: 16 }, { normal: [0, 0, 0] }, { normal: [1, 1, 0] }, { normal: [1, 0, Infinity] }]) {
  const changed = { ...design, targets: [{ ...design.targets[0], ...bad }] };
  assert.equal(isBlockDesign(changed), false); assert.equal(w.SolarOptics.validDesign(changed), false);
}
const rows = w.SolarReview.evaluate({ id: 'solstice-gates-example', settings, design, checks });
assert.ok(rows.every(r => r.settings.outcome === 'met'), JSON.stringify(rows.map(r => r.settings)));
for (const [index, season, other] of [[1, 'summer', 3], [3, 'winter', 1]]) {
  const row = rows[index], p = w.SunCalc.getPosition(new Date(row.settings.utcInstant), settings.latitude, settings.longitude);
  const bearing = (p.azimuth * 180 / Math.PI + 540) % 360, altitude = p.altitude * 180 / Math.PI;
  assert.ok(Math.abs(bearing - expectedSun[season].bearing) < 1e-6); assert.ok(Math.abs(altitude - expectedSun[season].altitude) < 1e-6);
  const direction = w.SolarGeometry.sunDirection(altitude, bearing), target = design.targets.find(t => t.id === season + '-carving');
  const window = design.blocks.find(b => b.id === season + '-window');
  assert.equal(window.aperture.axis, 'z'); assert.equal(window.aperture.insert, 'open');
  assert.equal(w.SolarOptics.trace(design, target, direction).value, 'sunlight');
  const centre = { x: window.x, y: window.y + window.height / 2, z: window.z };
  const origin = { x: centre.x + direction.x * 2, y: centre.y + direction.y * 2, z: centre.z + direction.z * 2 };
  const travel = { x: -direction.x, y: -direction.y, z: -direction.z };
  const ray = w.SolarOptics.inspect(design, origin, travel, 7);
  assert.equal(ray.id, 'receiving-pillar', 'Light must traverse the full bore and land on the central pillar.');
  assert.ok(Math.hypot(ray.hit.x - target.x, ray.hit.y - target.y, ray.hit.z - target.z) < .00002, 'The light lands on the engraved mark.');
  const sealed = { ...design, blocks: design.blocks.map(b => b.id === window.id ? { ...b, aperture: undefined } : b) };
  assert.equal(w.SolarOptics.trace(sealed, target, direction).value, 'shadow');
  assert.equal(w.SolarOptics.inspect(sealed, origin, travel, 7).id, window.id);
  const vertical = { ...design, blocks: design.blocks.map(b => b.id === window.id ? { ...b, aperture: { ...b.aperture, axis: 'y' } } : b) };
  assert.equal(w.SolarOptics.trace(vertical, target, direction).value, 'shadow', 'Roof-directed holes do not perform this alignment.');
  const moved = { ...design, blocks: design.blocks.map(b => b.id === window.id ? { ...b, z: b.z + .4 } : b) };
  assert.equal(w.SolarOptics.trace(moved, target, direction).value, 'shadow', 'Moving the window away must make the mark miss.');
  const q = w.SunCalc.getPosition(new Date(rows[other].settings.utcInstant), settings.latitude, settings.longitude);
  assert.equal(w.SolarOptics.trace(design, target, w.SolarGeometry.sunDirection(q.altitude * 180 / Math.PI, q.azimuth * 180 / Math.PI + 180)).value, 'shadow', 'The opposite solstice must miss this carving.');
  assert.equal(w.SolarOptics.trace(design, { ...target, y: target.y + .2 }, direction).value, 'shadow', 'A real bounded patch, not a whole illuminated pillar.');
}
const THREE = require('../public/simulations/solar-monument/vendor/three.min.js');
for (const f of ['calendar-markers.js', 'sun-demonstration.js']) vm.runInContext(fs.readFileSync(path.join(root, 'public/simulations/solar-monument', f), 'utf8'), w);
const scene = new THREE.Scene(), guide = w.createSunDemonstration(THREE, scene);
for (const [index, season] of [[1, 'summer'], [3, 'winter']]) {
  const target = design.targets.find(t => t.id === season + '-carving'), stone = w.CalendarMarkers.stone(THREE, target, index);
  const normal = new THREE.Vector3(0, 1, 0).applyQuaternion(stone.quaternion);
  assert.ok(normal.distanceTo(new THREE.Vector3(1, 0, 0)) < 1e-8, 'The engraving faces sideways on the pillar.');
  assert.equal(stone.position.y, target.y);
  const p = w.SunCalc.getPosition(new Date(rows[index].settings.utcInstant), settings.latitude, settings.longitude);
  const direction = w.SolarGeometry.sunDirection(p.altitude * 180 / Math.PI, p.azimuth * 180 / Math.PI + 180);
  const result = guide.update(design, direction, 'target:' + target.id, true);
  assert.ok(result.caption.includes('Sunlight reaches ' + target.label), result.caption);
  const line = scene.getObjectByName('sun-demonstration').children.find(c => c.isLine);
  const points = line.geometry.attributes.position;
  const endpoint = new THREE.Vector3().fromBufferAttribute(points, points.count - 1);
  assert.ok(endpoint.distanceTo(new THREE.Vector3(target.x, target.y, target.z)) < 1e-4, 'The visible guide terminates on the measured elevated surface.');
}
guide.dispose();
const startingRows = w.SolarReview.evaluate({ id: 'starter', settings, design: starter, checks });
assert.equal(startingRows[1].settings.outcome, 'missed'); assert.equal(startingRows[3].settings.outcome, 'met');
const references = Array.from(rows, ({ settings, measurements }) => ({ settings, measurements }));
const referencePath = dir + 'calendar-monument.solstice-observations.ts';
if (process.argv.includes('--write-references')) fs.writeFileSync(path.join(root, referencePath), '/** Generated by node scripts/check-solstice-gates.cjs --write-references. */\nexport const solsticeObservations = ' + JSON.stringify(references, null, 2) + ' as const;\n');
assert.equal(JSON.stringify(moduleData(referencePath).solsticeObservations), JSON.stringify(references));
console.log('Solstice alignment: three stones, two horizontal bores, exact pillar hits, sealed/vertical/moved/opposite-season controls, bounded patches, starter challenge and four reproducible observations passed.');
