const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '../public/simulations/solar-monument');
const context = vm.createContext({ window: {}, console });
for (const file of ['geometry.js', 'seasons.js', 'vendor/suncalc.js', 'vendor/luxon.min.js']) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
const { sunDirection, blockShadow, contains, skySegments } = context.window.SolarGeometry;
const block = { id: 'one', x: 0, y: 0, z: 0, width: .1, height: 1, depth: .1, rotation: 0 };
const close = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} vs ${expected}`);
// A 1 m block under a 45° southern Sun reaches 1.05 m north, including its half-width.
const south45 = blockShadow(block, sunDirection(45, 180));
close(Math.min(...south45.map(p => p.z)), -1.05);
assert.ok(contains(south45, { x: 0, z: -.9 }));
assert.ok(!contains(south45, { x: .1, z: -.9 }));
// East Sun casts west. Overhead light retains the exact footprint, including rotation.
const east = blockShadow(block, sunDirection(45, 90));
close(Math.min(...east.map(p => p.x)), -1.05);
const overhead = blockShadow({ ...block, width: .4, rotation: 90 }, sunDirection(90, 0));
close(Math.max(...overhead.map(p => p.x)), .05);
close(Math.max(...overhead.map(p => p.z)), .2);
assert.equal(blockShadow(block, sunDirection(-5, 180)).length, 0);
close(Math.min(...blockShadow(block, sunDirection(.1, 180)).map(p => p.z)), -.05 - 1 / Math.tan(.1 * Math.PI / 180), 1e-6);
// An elevated lintel casts a separate patch. Ground between its feet and patch stays sunlit.
const lintel = blockShadow({ ...block, y: 2, width: 2, height: .2 }, sunDirection(45, 180));
assert.ok(!contains(lintel, { x: 0, z: -.5 }));
assert.ok(contains(lintel, { x: 0, z: -2.1 }));
// Two scaled monuments have the same angles, with proportionally scaled shadows.
const scaled = blockShadow({ ...block, width: .2, height: 2, depth: .2 }, sunDirection(45, 180));
close(Math.min(...scaled.map(p => p.z)), -2.1);
// Independent seasonal altitude relation at latitude 38.83°: 90 - latitude + declination.
for (const [date, declination] of [['2026-03-20', 0], ['2026-06-21', 23.44], ['2026-12-21', -23.44]]) {
  const noon = context.window.SunCalc.getTimes(new Date(`${date}T19:00:00Z`), 38.83, -104.82).solarNoon;
  const altitude = context.window.SunCalc.getPosition(noon, 38.83, -104.82).altitude * 180 / Math.PI;
  close(altitude, 90 - 38.83 + declination, .35);
}
// The September 2026 equinox falls on different calendar dates in Denver and London.
const equinox = context.luxon.DateTime.fromISO(context.window.SOLAR_SEASONS[2026][8]);
assert.equal(equinox.setZone('America/Denver').toISODate(), '2026-09-22');
assert.equal(equinox.setZone('Europe/London').toISODate(), '2026-09-23');
for (const events of Object.values(context.window.SOLAR_SEASONS)) assert.equal(Object.keys(events).length, 4);
// A below-horizon interval must not become a straight line from sunset to sunrise.
const clipped = skySegments([
  { altitudeDeg: 15, compassDeg: 260 }, { altitudeDeg: -5, compassDeg: 275 },
  { altitudeDeg: -5, compassDeg: 85 }, { altitudeDeg: 15, compassDeg: 100 },
]);
assert.equal(clipped.length, 4);
close(clipped[1].y, 0); close(clipped[2].y, 0);
for (const point of clipped) { assert.ok(point.y >= 0); close(Math.hypot(point.x, point.y, point.z), 1); }
assert.equal(skySegments([{ altitudeDeg: -10, compassDeg: 90 }, { altitudeDeg: -20, compassDeg: 180 }]).length, 0);
// Solstice order reverses in the Southern Hemisphere; the scene must use actual bearings.
for (const latitude of [38.83, -34.60]) {
  const altitudes = ['2026-06-21', '2026-12-21'].map(date => {
    const noon = context.window.SunCalc.getTimes(new Date(`${date}T12:00:00Z`), latitude, 0).solarNoon;
    return context.window.SunCalc.getPosition(noon, latitude, 0).altitude;
  });
  assert.equal(altitudes[0] > altitudes[1], latitude > 0);
}
for (const file of ['game.js', 'sky-model.js', 'season-review.js']) new vm.Script(fs.readFileSync(path.join(root, file), 'utf8'));
console.log('Solar monument: shadow geometry, sky horizon clipping, hemisphere seasons, event dates, and script syntax passed.');
