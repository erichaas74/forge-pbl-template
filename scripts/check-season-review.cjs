const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '../public/simulations/solar-monument');
const sandbox = { structuredClone, console };
sandbox.window = sandbox;
const context = vm.createContext(sandbox);
for (const file of ['vendor/suncalc.js', 'vendor/luxon.min.js', 'geometry.js', 'optics.js', 'seasons.js', 'season-review.js']) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
const design = { blocks: [{ id: 'tower', x: 0, y: 0, z: 0, width: .1, depth: .1, height: 1, rotation: 0 }], targets: [{ id: 'marker', label: 'North marker', x: 0, z: -.8 }] };
const checks = ['march', 'june', 'sept', 'dec'].map(scenarioId => ({ scenarioId, targetId: 'marker', expectedValue: 'shadow' }));
const settings = { latitude: 38.83, longitude: -104.82, zone: 'America/Denver', localDate: '2026-09-07' };
const evaluate = (changes = {}) => context.SolarReview.evaluate({ id: 'test', design, checks, settings, ...changes });
const results = evaluate();
// A colored aperture changes the evidence, not just the picture.
const optical = {
  blocks: [{ id: 'window', x: 0, y: .6, z: 0, width: .8, height: .8, depth: .06, rotation: 0,
    aperture: { axis: 'z', diameter: .48, insert: 'glass', color: 'red' } }],
  targets: [{ id: 'marker', label: 'Color marker', x: 0, z: -.8 }],
};
const colored = evaluate({ design: optical, checks: checks.map(check => ({ ...check, expectedValue: 'red light' })) });
assert.equal(colored[0].settings.actualValue, 'red light');
assert.equal(colored[0].settings.outcome, 'met');
assert.equal(colored[1].settings.outcome, 'missed');
assert.equal(colored[3].settings.outcome, 'missed');
assert.ok(colored.every(result => result.settings.modelVersion === 'solar-optics-2.0'));
assert.equal(evaluate({ design: { ...optical, blocks: [{ ...optical.blocks[0], aperture: undefined }] }, checks: checks.map(check => ({ ...check, expectedValue: 'red light' })) })[0].settings.actualValue, 'shadow');
assert.equal(colored[0].design.blocks[0].aperture.color, 'red');
assert.equal(results.length, 4);
assert.deepEqual(Array.from(results, result => result.settings.scenarioId), ['march', 'june', 'sept', 'dec']);
assert.equal(results[1].settings.outcome, 'missed');
assert.equal(results[3].settings.outcome, 'met');
assert.equal(results[2].settings.localDate, '2026-09-22');
assert.ok(evaluate({ checks: [] }).every(result => result.settings.outcome === 'unconfigured'));
assert.ok(evaluate({ design: { ...design, targets: [] } }).every(result => result.settings.outcome === 'unconfigured'));
assert.ok(evaluate({ design: { ...design, blocks: [] } }).every(result => result.settings.outcome === 'unavailable'));
const sunlight = evaluate({ checks: checks.map(check => ({ ...check, expectedValue: 'sunlight' })) });
assert.equal(sunlight[1].settings.outcome, 'met');
assert.equal(sunlight[3].settings.outcome, 'missed');
assert.equal(evaluate({ settings: { ...settings, latitude: 89 } })[3].settings.outcome, 'unavailable');
for (const site of [settings, { ...settings, latitude: 51.51, longitude: -.13, zone: 'Europe/London' }, { ...settings, latitude: 35.68, longitude: 139.76, zone: 'Asia/Tokyo' }]) {
  for (const result of evaluate({ settings: site })) {
    const actualDate = context.luxon.DateTime.fromISO(result.settings.utcInstant).setZone(site.zone).toISODate();
    assert.equal(actualDate, result.settings.localDate, 'Event date and solar-noon instant must belong to the same local day.');
  }
}
const small = structuredClone(design); small.blocks[0].height = .1;
assert.equal(evaluate({ design: small })[3].settings.outcome, 'missed');
assert.equal(results[3].design.blocks[0].height, 1, 'Earlier comparisons preserve their design.');
assert.throws(() => evaluate({ settings: { ...settings, localDate: '2040-01-01' } }));
console.log('Seasonal review: four events, pass/miss, sunlight, missing/deleted targets, empty blocks, polar night, local-day precision, revised designs and unsupported years passed.');
