// Physical invariants: date resolution, Earth/local horizon agreement, and camera projection.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const THREE = require('../public/simulations/solar-monument/vendor/three.min.js');
const root = path.resolve(__dirname, '../public/simulations/solar-monument');
const context = vm.createContext({ console }); context.window = context;
for (const file of ['vendor/suncalc.js', 'vendor/luxon.min.js', 'geometry.js', 'solar-day.js', 'monument-camera.js']) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
const D = context.SolarDay, G = context.SolarGeometry, C = context.MonumentCamera;
const site = { latitude: 38.83, longitude: -104.82, zone: 'America/Denver', localDate: '2026-06-21' };
for (const localDate of ['2026-03-08', '2026-03-20', '2026-06-21', '2026-09-22', '2026-11-01', '2026-12-21']) {
  const settings = { ...site, localDate }, day = D.day(settings);
  assert.ok(day.start < day.noon && day.noon < day.end && day.end < 1440);
  const expected = context.SunCalc.getTimes(day.at(720), site.latitude, site.longitude);
  assert.ok(Math.abs(day.at(day.start) - expected.sunrise) < 2, 'Sunrise retains sub-minute precision, including DST dates.');
  assert.ok(Math.abs(day.at(day.end) - expected.sunset) < 2);
  assert.ok(Math.abs(D.observe(settings).date - expected.solarNoon) < 2);
  assert.ok(Math.abs(D.observe(settings, 'morning').date - expected.sunrise - 1800000) < 2);
  assert.ok(Math.abs(expected.sunset - D.observe(settings, 'evening').date - 1800000) < 2);
  assert.equal(D.observe(settings, 'clock', 571).minutes, 571);
  for (const minutes of [0, 370, 720, 1070, 1439]) for (const [lat, lon] of [[38.83, -104.82], [-33.9, 151.2], [0, 0], [70, -22]]) {
    const date = day.at(minutes), earth = D.earth(date, lat, lon);
    const altitude = context.SunCalc.getPosition(date, lat, lon).altitude;
    assert.ok(Math.abs(earth.altitude - altitude) < 1e-10, 'Earth site and local Sun use the same horizon angle.');
    assert.ok(Math.abs(earth.sun[1]) < 1e-9, 'Sun and Earth lie in the orbital plane.');
    assert.ok(Math.abs(Math.acos(earth.north[1]) * 180 / Math.PI - 23.4397) < 1e-10);
    assert.ok(Math.abs(earth.north[0]) < 1e-12 && earth.north[2] < 0, 'Axis direction stays fixed during both spin and orbit.');
  }
}
assert.equal(D.day({ ...site, latitude: 89, localDate: '2026-12-21' }).kind, 'polar-night');
assert.equal(D.day({ ...site, latitude: 89 }).kind, 'polar-day');
assert.equal(D.observe({ ...site, latitude: 89 }, 'morning'), null);
assert.equal(D.observe(site, 'clock', -1), null);
const lateSunset = D.day({ ...site, latitude: 64.15, longitude: -21.94, zone: 'Atlantic/Reykjavik', localDate: '2026-06-15' });
assert.ok(lateSunset.end > 1440 && lateSunset.start < lateSunset.end, 'A sunset after midnight must not reverse the day slider.');
assert.equal(context.luxon.DateTime.fromJSDate(lateSunset.at(lateSunset.end), { zone: 'Atlantic/Reykjavik' }).toISODate(), '2026-06-16');
const design = { blocks: [{ id: 'off-centre', x: 8, z: -7, y: 2, height: 5, width: 3, depth: .2, rotation: 37 }], targets: [{ x: -8, z: 7 }] };
for (const aspect of [.48, 1, 2.7]) for (const [bearing, elevation] of [[0, 5], [315, 50], [0, 89.999]]) {
  const frame = C.bounds(design, G.sunDirection(22, 190));
  const fit = C.fit(THREE, frame, bearing, elevation, aspect);
  const camera = new THREE.PerspectiveCamera(42, aspect, .01, 1000);
  camera.position.copy(fit.position); camera.lookAt(fit.centre); camera.updateMatrixWorld(true);
  for (const point of frame.points) {
    const projected = new THREE.Vector3(point.x, point.y, point.z).project(camera);
    assert.ok(Math.abs(projected.x) < 1 && Math.abs(projected.y) < 1 && projected.z < 1, 'Fit shows off-centre geometry, targets and bounded shadows in portrait and landscape.');
  }
  const zoomed = C.fit(THREE, frame, bearing, elevation, aspect, 2);
  assert.ok(zoomed.centre.equals(fit.centre));
  assert.ok(Math.abs(zoomed.position.distanceTo(fit.centre) * 2 - fit.position.distanceTo(fit.centre)) < 1e-9, 'Zoom approaches the scene centre, not world origin.');
}
assert.equal(C.bounds(design, G.sunDirection(1, 90)).clipped, true);
assert.equal(C.bounds(design, G.sunDirection(45, 90)).clipped, false);
console.log('Sun demonstration: exact sunrise/noon/sunset, DST, polar days, 120 Earth/local angle checks, fixed axis, and portrait/landscape camera projections passed.');
