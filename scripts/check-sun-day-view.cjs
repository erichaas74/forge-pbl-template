const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = {};
context.window = context;
vm.createContext(context);
for (const file of ['vendor/suncalc.js', 'vendor/luxon.min.js', 'solar-day.js', 'sun-day-view.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../public/simulations/solar-monument', file), 'utf8'), context);
}
const V = context.SunDayView;
const colorado = { latitude: 38.83, longitude: -104.82, zone: 'America/Denver', localDate: '2026-06-21' };
const summer = V.dayModel(colorado);
const winter = V.dayModel({ ...colorado, localDate: '2026-12-21' });
assert.equal(summer.kind, 'normal');
assert.ok(summer.noon.altitude > winter.noon.altitude);
assert.ok(summer.end - summer.start > winter.end - winter.start);
assert.match(summer.sunrise.direction, /^NE/);
assert.match(summer.sunset.direction, /^NW/);
assert.match(winter.sunrise.direction, /^SE/);
assert.match(winter.sunset.direction, /^SW/);
assert.equal(summer.samples[0].x, 44);
assert.equal(summer.samples.at(-1).x, 476);
for (const m of [summer, winter]) {
  for (const sample of m.samples) {
    const actual = context.SunCalc.getPosition(new Date(sample.instant), m.settings.latitude, m.settings.longitude);
    assert.ok(Math.abs(sample.altitude - actual.altitude * 180 / Math.PI) < 1e-10);
    assert.ok(Number.isFinite(sample.x) && Number.isFinite(sample.y));
  }
  const atNoon = V.current(m, new Date(m.noon.instant));
  assert.ok(Math.abs(atNoon.x - m.noon.x) < 1e-8);
  assert.ok(Math.abs(atNoon.y - m.noon.y) < 1e-8);
  assert.equal(V.current(m, new Date(m.start - 3600000)).inRange, false);
  assert.equal(V.current(m, new Date(m.end + 3600000)).inRange, false);
}
// Opposite hemisphere: seasonal heights reverse, noon Sun is in the north.
const south = { latitude: -33.87, longitude: 151.21, zone: 'Australia/Sydney' };
const southJune = V.dayModel({ ...south, localDate: '2026-06-21' });
const southDec = V.dayModel({ ...south, localDate: '2026-12-21' });
assert.ok(southDec.noon.altitude > southJune.noon.altitude);
assert.match(southJune.noon.direction, /^N ·/);
// Local times remain in the requested zone across DST and the date line.
for (const settings of [
  { ...colorado, localDate: '2026-03-08' },
  { ...colorado, localDate: '2026-11-01' },
  { latitude: 1.87, longitude: -157.43, zone: 'Pacific/Kiritimati', localDate: '2026-06-21' },
]) {
  const m = V.dayModel(settings);
  const local = context.luxon.DateTime.fromMillis(m.start, { zone: settings.zone });
  assert.equal(local.toISODate(), settings.localDate);
  assert.equal(m.sunrise.time, local.toFormat('h:mm a'));
  assert.ok(m.samples.every((p, i) => !i || p.instant > m.samples[i - 1].instant));
}
for (const [date, kind] of [['2026-06-21', 'polar-day'], ['2026-12-21', 'polar-night']]) {
  const m = V.dayModel({ latitude: 78.22, longitude: 15.65, zone: 'Arctic/Longyearbyen', localDate: date });
  assert.equal(m.kind, kind);
  assert.equal(m.sunrise, null);
  assert.equal(m.sunset, null);
  assert.ok(m.samples.every(p => Number.isFinite(p.x) && Number.isFinite(p.y)));
}
console.log('Sun day view: seasonal directions/heights, shared current position, DST, date line, night and polar-day/night cases passed.');
