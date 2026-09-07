import type { EngineeringSnapshot } from '../../templates/engineering-design/domain/engineering-design.models';
import { calendarMonumentConfig } from './calendar-monument.config';
/** Fictional exhibit. Rounded textbook reference angles, not a claimed outdoor experiment. */
export const calendarMonumentSample: EngineeringSnapshot = {
  schemaVersion: '1.0',
  revision: 1,
  design: {
    ...calendarMonumentConfig.starterDesign,
    targets: [
      { id: 'june', label: 'June solstice', x: 0, z: -0.28 },
      { id: 'equinox', label: 'Equinoxes', x: 0, z: -0.8 },
      { id: 'december', label: 'December solstice', x: 0, z: -1.9 },
    ],
  },
  research: {
    seasons:
      'Earth’s tilted axis changes how high the Sun appears. June solar-noon shadows are shorter here in Colorado Springs.',
    moon: 'Moon phases repeat in about 29.5 days. A lunar phase calendar measures a different pattern from this solar monument.',
  },
  prediction:
    'At solar noon, the shadow will point approximately north and reach farther in December.',
  exhibit:
    'The Three-Marker Tower\n\nI used ten 10 cm cubes to make a tower 1 metre tall. I aligned a level base to true north at Colorado Springs (38.83° N, 104.82° W). My markers are about 0.28 m, 0.80 m, and 1.90 m north of the tower’s centre.\n\nEarth’s tilt changes the Sun’s height through the year. A lower Sun makes a longer shadow. The March and September equinoxes share an approximate marker, so this monument alone cannot tell spring from fall.\n\nRevision: I changed my plan from four separate markers to three. A broad marker can be reached on several nearby dates, especially near a solstice. I would check the final positions in the simulation, then measure a real outdoor shadow at the same place and time.\n\nThe Moon’s illuminated shape repeats in about a month. It could support a different calendar, but its position needs its own dated observations. Sources: NASA Space Place, NASA Moon Phases, and the US Naval Observatory.\n\nThis fictional example uses rounded reference calculations. It does not claim an outdoor test was performed.',
  trials: [
    { date: '2026-03-20', minutes: 788, altitude: '51.17', length: '0.80' },
    { date: '2026-06-21', minutes: 782, altitude: '74.61', length: '0.28' },
    { date: '2026-09-22', minutes: 773, altitude: '51.17', length: '0.80' },
    { date: '2026-12-21', minutes: 718, altitude: '27.73', length: '1.90' },
  ].map((row, i) => ({
    id: `sample-${i}`,
    pluginId: 'simulation.solar-monument',
    capturedAt: '2026-09-07T12:00:00Z',
    design: structuredClone(calendarMonumentConfig.starterDesign),
    settings: {
      latitude: 38.83,
      longitude: -104.82,
      localDate: row.date,
      minutes: row.minutes,
      zone: 'America/Denver',
    },
    prediction: 'A lower Sun should give the same tower a longer shadow.',
    measurements: [
      { label: 'Seasonal reference date', value: row.date },
      { label: 'Approximate solar-noon altitude', value: `${row.altitude}°` },
      { label: 'Height-only shadow reference', value: `${row.length} m` },
    ],
  })),
  events: [],
};
