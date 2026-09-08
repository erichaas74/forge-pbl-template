import type { EngineeringSnapshot } from '../../templates/engineering-design/domain/engineering-design.models';
import { solarCalendarChecks, solarCalendarDesign } from './calendar-monument.solar-calendar';
import { solarCalendarObservations } from './calendar-monument.sample-observations';
import type { BlockDesign } from '../../shared/engineering/block-design';

const sampleDesign: BlockDesign = {
  ...solarCalendarDesign,
  targets: solarCalendarDesign.targets.map((target) => {
    const row = solarCalendarObservations.find((row) => row.settings.targetId === target.id)!;
    const measurement = (label: string) =>
      Number.parseFloat(row.measurements.find((m) => m.label === label)!.value);
    return {
      ...target,
      settings: {
        markerKind: 'calendar-' + row.settings.scenarioId,
        utcInstant: row.settings.utcInstant,
        zone: row.settings.zone,
        latitude: row.settings.latitude,
        longitude: row.settings.longitude,
        sunAltitude: measurement('Sun altitude'),
        sunAzimuth: measurement('Sun direction'),
        light: row.settings.actualValue,
      },
    };
  }),
};

/** Fictional student exhibit, with reference observations from the actual simulation. */
export const calendarMonumentSample: EngineeringSnapshot = {
  schemaVersion: '1.0',
  revision: 1,
  design: sampleDesign,
  learningStepId: 'sun-monument',
  research: {
    seasons:
      'Earth’s tilted axis changes the Sun’s path. At Colorado Springs, lower December sunlight travels farther north after passing through our roof openings.',
    calendar:
      'Stonehenge inspired our standing stones and lintels. Its documented solstice alignments use the horizon; our original design uses jeweled roof openings and local solar noon.',
    'colored-light':
      'A light ray must pass through the full depth of a hole. Our colored jewels act as filters. Moving the Sun moves the colored patches across the floor.',
    moon: 'Moon phases repeat in about 29.5 days. They could support a different calendar, but this monument tests the Sun’s yearly pattern.',
  },
  checks: solarCalendarChecks,
  prediction:
    'At Colorado Springs solar noon, amber light will reach the June marker, blue light will reach the shared equinox marker, and ruby-red light will reach the December marker.',
  exhibit: [
    'The Jewel Circle Solar Calendar',
    'Our final project is a solar calendar made from eight stone gates around a faceted bronze crystal. Its two-step pedestal gives us a central sculpture whose bright and shaded faces change with the Sun. Four taller standing stones have round windows: two open, one emerald and one violet. We made all 34 blocks with the same measured building parts available in the lab.',
    'Each inner gate has two 1 m posts and a lintel. Three lintels have vertical cylindrical holes filled with amber, blue and ruby-colored jewels. The blue hole is 18 cm wide; the other two are 32 cm wide. The lintels are 8 cm thick. These three roof openings do the calendar work. The outer windows add light and shadow patterns; the blueprint lists every dimension and coordinate.',
    'We chose Colorado Springs (38.83° N, 104.82° W), a level base and true north. We test every special date at local solar noon, which is not always 12:00 on a clock. The same fixed model makes amber light reach the June marker, blue light reach the equinox marker, and red light reach the December marker.',
    'Earth’s tilt changes the sunlight angle. Lower sunlight travels farther across the ground after passing through the same opening. March and September share a blue marker because their Sun paths are similar. The calendar alone cannot tell those two dates apart.',
    'Revision: a wide blue opening also lit the equinox marker a week before and after. Narrowing it to 18 cm made those nearby tests miss while both equinox tests still matched. The solstice markers still match a week before and after. This is a seasonal calendar, not a device that proves one exact day.',
    'The jewels are our modern design idea. Stonehenge inspired the stone circle; this is not a historical reconstruction. Its solstice alignments frame summer sunrise and winter sunset, while our calendar is calibrated for solar noon at a different site.',
    'Our four evidence records are computed simulation observations, not outdoor measurements. A classroom version must use matching dimensions and orientation, or a consistent scale for every part. We would check the physical model on an available day at the matching place and time before claiming its accuracy.',
    'Sources: NASA Space Place for seasons, NASA Moon Phases, English Heritage for Stonehenge, and the bundled Sun model and seasonal event table for these simulated tests.',
  ].join('\n\n'),
  trials: solarCalendarObservations.map((row, i) => ({
    id: `solar-calendar-example-${i}`,
    pluginId: 'simulation.solar-monument',
    capturedAt: '2026-09-07T12:00:00Z',
    design: structuredClone(sampleDesign),
    settings: { ...row.settings },
    prediction: 'The selected jewel’s colored light should reach its seasonal ground marker.',
    measurements: row.measurements,
  })),
  events: [],
};
