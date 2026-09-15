/* Proves every weekly level can be solved in the real solar model, and that the unsolved starts do not win. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');

const cache = new Map();
function load(file) {
  const absolute = path.resolve(root, file);
  if (cache.has(absolute)) return cache.get(absolute).exports;
  const module = { exports: {} };
  cache.set(absolute, module);
  const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const localRequire = (request) => {
    if (!request.startsWith('.')) throw new Error('Unexpected package import: ' + request);
    return load(path.join(path.dirname(absolute), request) + '.ts');
  };
  new Function('module', 'exports', 'require', code)(module, module.exports, localRequire);
  return module.exports;
}

const context = { structuredClone };
context.window = context;
vm.createContext(context);
for (const file of ['vendor/suncalc.js', 'vendor/luxon.min.js', 'geometry.js', 'solar-day.js', 'optics.js', 'sundial-lab.js', 'quest-levels.js'])
  vm.runInContext(fs.readFileSync(path.join(root, 'public/simulations/solar-monument', file), 'utf8'), context);
const Q = context.SolarQuests;
const { DateTime } = context.luxon;
const site = { latitude: 38.83, longitude: -104.82, zone: 'America/Denver' };

const project = 'src/app/projects/calendar-monument/';
const { calendarMonumentWeeks: weeks } = load(project + 'calendar-monument.weeks.ts');
const models = load('src/app/templates/engineering-design/domain/engineering-preview.models.ts');
const gates = load(project + 'calendar-monument.solstice-gates.ts');
const circle = load(project + 'calendar-monument.solar-calendar.ts');
const samples = load(project + 'calendar-monument.design-samples.ts').calendarMonumentDesignSamples;
assert.equal(models.isEngineeringPreviewWeeks(weeks), true, 'Weeks with quests pass template validation.');

const quests = weeks.flatMap((week) => week.sessions.map((session) => session.quest));
assert.equal(quests.length, 8);
assert.ok(quests.every((q) => q && Q.valid(q)), 'Every session has a valid simulation quest.');
assert.equal(new Set(quests.map((q) => q.id)).size, 8);
for (const q of quests)
  assert.ok(!['story', 'hint', 'keepHint', 'timeHint'].some((key) => key in q) && !('text' in q.reveal), `${q.id}: explanations and hints are left to the tutor.`);
assert.deepEqual(
  quests.map((q) => JSON.stringify(q.tools ?? [])),
  ['["post"]', '["post"]', '["build"]', '[]', '[]', '["build"]', '["markers"]', '["markers"]'],
  'Each level shows only the tools its solve needs.',
);
const [gemClock, seasonLine, summerBeam, winterWindow, rainbowPetals, winterGallery, calendarStones, yearOfLight] = quests;
assert.equal(Q.valid({ ...gemClock, marks: [{ ...gemClock.marks[0], symbol: 'glitter' }] }), false);
assert.ok(!('gems' in gemClock) && !('gems' in seasonLine), 'Shadow levels use carved symbols, not gems.');
assert.equal(Q.valid({ ...summerBeam, reveal: { ...summerBeam.reveal, style: 'year' } }), false);
assert.equal(Q.valid({ ...gemClock, tools: ['play'] }), false, 'Unknown level tools are rejected.');

function observe(design, localDate, rule, minutes) {
  const settings = { ...site, localDate };
  const observed = context.SolarDay.observe(settings, rule, minutes);
  assert.ok(observed, `${localDate} ${rule} ${minutes}`);
  const p = context.SunCalc.getPosition(observed.date, site.latitude, site.longitude);
  const sun = context.SolarGeometry.sunDirection((p.altitude * 180) / Math.PI, ((p.azimuth * 180) / Math.PI + 540) % 360);
  return { design, settings: { ...settings, minutes: observed.minutes }, sun, sundial: false };
}
const at = (q, design, moments, memory = Q.createMemory()) => {
  let result;
  for (const [localDate, rule, minutes] of moments) result = Q.evaluate(q, observe(design, localDate, rule, minutes), memory);
  return result;
};
function playDay(q, design, localDate, step, memory = Q.createMemory()) {
  const day = context.SolarDay.day({ ...site, localDate });
  let result;
  for (let m = day.start + 0.5; m <= Math.min(day.end, 1439); m += step) result = Q.evaluate(q, observe(design, localDate, 'clock', m), memory);
  return result;
}
const post = (height) => ({ blocks: [{ id: 'practice-post', x: 0, y: 0, z: 0, width: 0.08, depth: 0.08, height, rotation: 0 }], targets: [] });
const iso = (start, days) => DateTime.fromISO(start, { zone: 'utc' }).plus({ days }).toISODate();

// Level 1: the height puzzle. Real playback advances about 1.6 minutes per frame at normal speed.
assert.equal(playDay(gemClock, post(0.6), '2026-06-21', 1).complete, false, 'A 60 cm post never wakes the gems.');
assert.equal(playDay(gemClock, post(0.8), '2026-06-21', 1.6).complete, true, 'Playing the day with an 80 cm post wakes all three.');
assert.equal(playDay(gemClock, post(0.78), '2026-06-21', 1.6).complete, true, 'Slider rounding within 3 cm still works.');
assert.equal(at(gemClock, post(0.8), [['2026-06-21', 'clock', 540], ['2026-06-21', 'noon'], ['2026-06-21', 'clock', 900]]).complete, true);

// Carved medallions sit exactly on the model's shadow tips and never overlap.
const tipAt = (localDate, rule, minutes) => {
  const moment = observe(post(0.8), localDate, rule, minutes);
  return context.SundialLab.tip(moment.design, moment.sun);
};
const apart = (marks) =>
  marks.every((a, i) => marks.every((b, j) => i >= j || Math.hypot(a.x - b.x, a.z - b.z) >= (a.size + b.size) / 2 - 0.005));
for (const m of gemClock.marks) {
  const tip = tipAt('2026-06-21', m.rule ?? 'clock', m.minutes);
  assert.ok(Math.hypot(tip.x - m.x, tip.z - m.z) < 0.01, `${m.id} sits on its shadow tip.`);
}
for (const m of seasonLine.marks.filter((m) => m.date)) {
  const tip = tipAt(m.date, 'noon');
  assert.ok(Math.hypot(tip.x - m.x, tip.z - m.z) < 0.01, `${m.id} sits on its noon shadow tip.`);
}
assert.ok(apart(gemClock.marks) && apart(seasonLine.marks), 'Carved medallions do not overlap.');
assert.equal(gemClock.marks.length, 8);
assert.deepEqual(gemClock.marks.filter((m) => m.required !== false).map((m) => m.symbol), ['rabbit', 'sun', 'fox']);
{
  const decorative = at(gemClock, post(0.8), [['2026-06-21', 'clock', 480], ['2026-06-21', 'clock', 600]]);
  assert.equal(decorative.progress.length, 3, 'Only the rabbit, sun and fox count toward the win.');
  assert.equal(decorative.progress.some((p) => p.done), false, 'Decorative hour animals do not count.');
}

// Level 2: the noon season line and the two-date mystery symbol.
assert.equal(at(seasonLine, post(0.8), [['2026-06-21', 'noon'], ['2026-03-20', 'noon'], ['2026-12-21', 'noon']]).complete, false);
assert.equal(at(seasonLine, post(0.8), [['2026-06-21', 'noon'], ['2026-03-20', 'noon'], ['2026-11-03', 'noon'], ['2026-12-21', 'noon']]).complete, true);
const amethystMonths = new Set();
for (let i = 0; i < 365; i++) {
  const day = iso('2026-01-01', i);
  const progress = at(seasonLine, post(0.8), [[day, 'noon']]).progress;
  if (progress.find((p) => p.id === 'mystery-owl').done) amethystMonths.add(Number(day.slice(5, 7)));
  assert.ok(!at(seasonLine, post(0.6), [[day, 'noon']]).progress.some((p) => p.done), 'Gems are carved for the 80 cm post only.');
}
assert.deepEqual([...amethystMonths].sort((a, b) => a - b), [2, 10, 11], 'The mystery gem wakes in early February and around early November.');

// Level 3: the misplaced summer window cannot be solved by removing or bypassing stones.
assert.equal(playDay(summerBeam, gates.solsticeGatesStarter, '2026-06-21', 2).complete, false, 'The starter never lights the summer gem.');
assert.equal(at(summerBeam, gates.solsticeGatesDesign, [['2026-06-21', 'morning']]).complete, true, 'The aligned window wins.');
const without = (design, id) => ({ ...design, blocks: design.blocks.filter((b) => b.id !== id) });
assert.equal(playDay(summerBeam, without(gates.solsticeGatesStarter, 'summer-window'), '2026-06-21', 2).complete, false, 'Deleting the window is not a solution.');
const movedPillar = { ...gates.solsticeGatesDesign, blocks: gates.solsticeGatesDesign.blocks.map((b) => (b.id === 'receiving-pillar' ? { ...b, x: 0 } : b)) };
assert.equal(at(summerBeam, movedPillar, [['2026-06-21', 'morning']]).complete, false, 'The pillar must stay in place.');
assert.equal(at(summerBeam, gates.solsticeGatesDesign, [['2026-06-20', 'morning']]).complete, false, 'The gem wakes only on June 21.');
const directLight = at(summerBeam, gates.solsticeGatesStarter, [['2026-06-21', 'clock', 540]]);
assert.equal(directLight.complete, false, 'Direct 9 AM sunlight over the misplaced window is not the beam.');
assert.equal(Q.valid({ ...summerBeam, gems: [{ ...summerBeam.gems[0], within: undefined }] }), false, 'A timed gem needs its time window.');

// Level 4: find both edges of the continuous winter window by stepping days.
const glows = (day) => {
  const q = { ...summerBeam, id: 'probe', gems: [{ ...winterWindow.gems[0], date: undefined, rule: undefined, window: undefined }] };
  return at(q, gates.solsticeGatesStarter, [[day, 'morning']]).progress[0].done;
};
let first = 0, last = 0;
while (glows(iso('2026-12-21', first - 1))) first--;
while (glows(iso('2026-12-21', last + 1))) last++;
const run = last - first + 1;
assert.ok(first >= -30 && last <= 30, 'Both edges lie inside the stepping window.');
assert.ok(run >= 30 && run <= 40, `The winter window lasts about five weeks (${run} mornings).`);
const memory = Q.createMemory();
assert.equal(at(winterWindow, gates.solsticeGatesStarter, [['2026-12-21', 'morning']], memory).complete, false);
for (let d = -1; d >= first - 1; d--) at(winterWindow, gates.solsticeGatesStarter, [[iso('2026-12-21', d), 'clock', 720]], memory);
let edge = at(winterWindow, gates.solsticeGatesStarter, [[iso('2026-12-21', first - 1), 'clock', 720]], memory);
assert.deepEqual(Array.from(edge.progress, (p) => p.done), [true, true, false], 'Stepping back past the first morning finds the first edge.');
for (let d = 1; d <= last + 1; d += 7) at(winterWindow, gates.solsticeGatesStarter, [[iso('2026-12-21', d), 'morning']], memory);
at(winterWindow, gates.solsticeGatesStarter, [[iso('2026-12-21', last), 'morning'], [iso('2026-12-21', last + 1), 'morning']], memory);
edge = at(winterWindow, gates.solsticeGatesStarter, [[iso('2026-12-21', last + 1), 'morning']], memory);
assert.equal(edge.complete, true, 'Both edges found completes the level.');
const farMemory = Q.createMemory();
at(winterWindow, gates.solsticeGatesStarter, [['2026-12-21', 'morning'], ['2026-11-01', 'morning'], ['2026-11-02', 'morning'], ['2027-02-01', 'morning']], farMemory);
assert.equal(at(winterWindow, gates.solsticeGatesStarter, [['2026-12-21', 'morning']], farMemory).complete, false, 'Unrelated far-away dates are not edges.');

// Level 5: a timing puzzle. The crystal hides the sapphire petal until early afternoon.
const colors = samples.find((s) => s.id === 'color-windows').design;
const petalMinutes = [];
for (let m = 600; m <= 1080; m += 5) if (at(rainbowPetals, colors, [['2026-03-20', 'clock', m]]).complete) petalMinutes.push(m);
assert.ok(petalMinutes.length >= 6 && petalMinutes[0] >= 790 && petalMinutes[petalMinutes.length - 1] <= 880, `Petal window ${petalMinutes[0]}–${petalMinutes.at(-1)} minutes.`);
assert.equal(at(rainbowPetals, colors, [['2026-03-20', 'noon']]).complete, false);
assert.equal(at(rainbowPetals, colors, [['2026-03-20', 'clock', 780]]).progress.find((p) => p.id === 'sapphire-petal').done, false, 'At 1 PM the crystal shadow hides the sapphire petal.');
assert.equal(at(rainbowPetals, colors, [['2026-03-21', 'clock', 840]]).complete, false, 'Only March 20 counts.');

// Level 6: swap the colored inserts (or the window stones) to fix the gallery.
assert.equal(playDay(winterGallery, colors, '2026-12-21', 2).complete, false, 'The original gallery never matches.');
const swapColor = (b) => (!b.aperture ? b : b.aperture.color === 'red' ? { ...b, aperture: { ...b.aperture, color: 'amber' } } : b.aperture.color === 'amber' ? { ...b, aperture: { ...b.aperture, color: 'red' } } : b);
const swapped = { ...colors, blocks: colors.blocks.map(swapColor) };
assert.equal(at(winterGallery, swapped, [['2026-12-21', 'noon']]).complete, true, 'Swapping the colored inserts fixes the gallery at noon.');
assert.ok(Math.abs(winterGallery.gems[1].z - -1.522) < 0.001);

// Levels 7 and 8: learner-carved calendar stones, tested at each seasonal noon.
const stone = (id, x, z) => ({ id, label: id, x, z });
const blue = stone('sunstone-blue', 0.005, 0.46), amber = stone('sunstone-amber', -1.296, 0.314), ruby = stone('sunstone-ruby', 1.309, -1.378);
const withStones = (...targets) => ({ ...circle.solarCalendarStarter, targets });
assert.equal(at(calendarStones, withStones(), [['2026-03-20', 'noon']]).complete, false);
assert.equal(at(calendarStones, withStones(blue), [['2026-03-20', 'noon']]).complete, false);
assert.equal(at(calendarStones, withStones(stone('wrong', 0.4, 0.46), amber), [['2026-03-20', 'noon']]).complete, false, 'A stone 40 cm off does not count.');
assert.equal(at(calendarStones, withStones(blue, amber), [['2026-03-20', 'noon']]).complete, true);
assert.equal(at(yearOfLight, withStones(blue, amber), [['2026-06-21', 'noon']]).complete, false, 'The year needs a December stone.');
const year = at(yearOfLight, withStones(blue, amber, ruby), [['2026-06-21', 'noon']]);
assert.equal(year.complete, true, 'Four seasons light three learner stones.');
assert.equal(year.points['equinox-sapphire'].id, year.points['september-sapphire'].id, 'Both equinoxes share one blue stone.');

// Sticky completion: winning once is not undone by moving the Sun afterwards.
const sticky = Q.createMemory();
at(summerBeam, gates.solsticeGatesDesign, [['2026-06-21', 'morning']], sticky);
assert.equal(at(summerBeam, gates.solsticeGatesDesign, [['2026-06-21', 'noon']], sticky).complete, true);

console.log(`Solar quests: 8 levels solvable in the model; wrong heights, deleted stones, wrong dates and times, far-away edges and misplaced stones do not win (winter window ${run} mornings, petals ${petalMinutes[0]}–${petalMinutes.at(-1)} min).`);
