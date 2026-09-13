const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = {}; context.window = context; vm.createContext(context);
for (const file of ['vendor/three.min.js', 'vendor/suncalc.js', 'vendor/luxon.min.js', 'seasons.js', 'geometry.js', 'solar-day.js', 'center-sunrise.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../public/simulations/solar-monument', file), 'utf8'), context);
}
const V = context.CenterSunrise;
const settings = { latitude: 38.83, longitude: -104.82, zone: 'America/Denver', localDate: '2026-06-21' };
const june = V.model(settings), december = V.model({ ...settings, localDate: '2026-12-21' });
assert.ok(june.sunrise.bearing > 58 && june.sunrise.bearing < 60);
assert.ok(december.sunrise.bearing > 120 && december.sunrise.bearing < 122);
assert.equal(JSON.stringify(june.references), JSON.stringify(december.references), 'Reference pins stay fixed as the selected date changes.');
for (const ref of june.references) {
  const d = context.SolarDay.day({ ...settings, localDate: ref.localDate });
  const p = context.SunCalc.getPosition(d.at(d.start), settings.latitude, settings.longitude);
  assert.ok(Math.abs(ref.bearing - (p.azimuth * 180 / Math.PI + 540) % 360) < 1e-8);
}
const options = { eyeHeight: .7, heading: 90, pitch: 3, zoom: 1 };
const camera = new context.THREE.PerspectiveCamera(42, 1.6, .01, 2500);
V.aim(camera, options); camera.updateMatrixWorld(true);
assert.equal(camera.position.x, 0); assert.equal(camera.position.y, .7); assert.equal(camera.position.z, 0);
const atBearing = bearing => { const d = context.SolarGeometry.sunDirection(0, bearing); return new context.THREE.Vector3(d.x * 480, .7, d.z * 480).project(camera); };
assert.ok(atBearing(june.sunrise.bearing).x < 0 && atBearing(december.sunrise.bearing).x > 0, 'June rises left of east and December to the right.');
assert.ok(Math.abs(atBearing(90).x) < 1e-8);
for (const aspect of [.5, 1, 2.5]) {
  camera.aspect = aspect;
  V.aim(camera, { ...options, heading: 140, pitch: 8, eyeHeight: 2, zoom: 2 });
  assert.equal(camera.position.x, 0); assert.equal(camera.position.z, 0); assert.equal(camera.position.y, 2);
  assert.ok(camera.fov >= 25 && camera.fov <= 100);
  V.aim(camera, { ...options, zoom: .8 });
  assert.ok(camera.fov >= 25 && camera.fov <= 100);
}
for (const date of ['2026-03-08', '2026-11-01']) {
  const m = V.model({ ...settings, localDate: date });
  assert.equal(m.at(10) - m.at(0), 600000);
  assert.equal(context.luxon.DateTime.fromJSDate(m.at(10), { zone: settings.zone }).toISODate(), date);
}
const southern = V.model({ latitude: -33.87, longitude: 151.21, zone: 'Australia/Sydney', localDate: '2026-12-21' });
assert.ok(southern.references.find(r => r.month === 5).bearing < 90);
assert.ok(southern.references.find(r => r.month === 11).bearing > 90);
for (const [localDate, kind] of [['2026-06-21', 'polar-day'], ['2026-12-21', 'polar-night']]) {
  const m = V.model({ latitude: 78.22, longitude: 15.65, zone: 'Arctic/Longyearbyen', localDate });
  assert.equal(m.sunrise, null); assert.equal(m.day.kind, kind);
  assert.equal(m.at(10).valueOf(), m.day.at(m.day.noon).valueOf());
  assert.equal(m.references.find(r => r.month === 5).bearing, null);
  assert.equal(m.references.find(r => r.month === 11).bearing, null);
}
console.log('Center sunrise: seasonal bearings, fixed origin, perspective, hemisphere, DST and polar cases passed.');
