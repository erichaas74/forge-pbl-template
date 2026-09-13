import type { EngineeringSnapshot } from '../../templates/engineering-design/domain/engineering-design.models';
import type { BlockDesign } from '../../shared/engineering/block-design';
import { solsticeGatesDesign, solsticeGatesChecks } from './calendar-monument.solstice-gates';
import { solsticeObservations } from './calendar-monument.solstice-observations';

const design: BlockDesign = {
  ...solsticeGatesDesign,
  targets: solsticeGatesDesign.targets.map((target) => {
    const row = solsticeObservations.find((r) => r.settings.targetId === target.id);
    if (!row) return target;
    const value = (label: string) =>
      Number.parseFloat(row.measurements.find((m) => m.label === label)!.value);
    return {
      ...target,
      settings: {
        markerKind: 'calendar-' + row.settings.scenarioId,
        utcInstant: row.settings.utcInstant,
        zone: row.settings.zone,
        latitude: row.settings.latitude,
        longitude: row.settings.longitude,
        sunAltitude: value('Sun altitude'),
        sunAzimuth: value('Sun direction'),
        light: row.settings.actualValue,
      },
    };
  }),
};
export const solsticeGatesSample: EngineeringSnapshot = {
  schemaVersion: '1.0',
  revision: 2,
  learningStepId: 'sun-monument',
  design,
  checks: solsticeGatesChecks,
  research: {
    seasons:
      'Earth’s tilt and yearly orbit change where the morning Sun appears. Summer and winter morning light arrive from different directions at Colorado Springs.',
    calendar:
      'A fixed mark on a receiving pillar gives us a repeatable test. Move the window until its light patch reaches the mark, then keep the stonework fixed when comparing seasons.',
    'colored-light':
      'The empty circular holes run horizontally through the upright stones. Sunlight must clear the full tunnel and travel across the court to reach the central pillar.',
    moon: 'The Moon’s monthly cycle is different from the Sun’s yearly pattern.',
  },
  prediction:
    'Thirty minutes after sunrise, the summer window illuminates the summer carving in June; the winter window illuminates the winter carving in December. The opposite mark stays in shadow.',
  exhibit: [
    'Solstice Windows — aim a hole at a mark',
    'Our monument has just three stones: two upright window stones and a receiving pillar beside the center. Each empty round hole faces sideways through its stone. A small patch of real simulated sunlight passes through the hole and lands on an engraved guide on the pillar’s east face.',
    'Choose June solstice or December solstice. These tests use 30 minutes after sunrise at Colorado Springs, 2026. The summer window points toward a morning bearing of 63.29° from true north; the winter window points toward 124.91°. These are morning directions, not the exact horizon-rise bearings. Compare the lit carving with the other carving, which stays in shadow.',
    'Turn on Ray guide, then open Markers and choose a carving to follow incoming sunlight to that fixed point. Turn Ray guide off to inspect the actual light patch inside its ring. The ring is an engraved reference guide; it does not emit light or affect the ray calculation.',
    'Starting challenge: load Align the solstice window from Sample models. The summer window starts 40 cm too far south; the winter alignment is a working comparison. Select June and Morning light. Keep the pillar and its marks fixed, then move only the summer window until its patch reaches the summer carving. Check December after your change. Save before and after evidence.',
    'Both window stones measure 140 × 160 × 25 cm, with an 18 cm horizontal bore centered 80 cm above the base. Their bore centers are 3 m horizontally from the matching pillar marks. The central pillar is 30 × 120 × 80 cm. Its east face is at X −35 cm; its summer and winter marks are 20 cm north and south of the middle, about 56.64 and 57.53 cm high. The slight drop from hole to mark follows the Sun’s elevation.',
    'March and September records check unfiltered morning sunlight at the open observation point. They are comparison baselines, not additional solstice-hole alignments. Tests also seal each hole, turn it vertically, shift a window, and check the opposite solstice. Every changed geometry must produce new evidence.',
    'For a model at one tenth scale, use two 14 × 16 × 2.5 cm window stones with 1.8 cm holes, and a 3 × 12 × 8 cm receiving pillar. Scale the 30 cm gap, all coordinates and the mark heights together; keep the same angles. A card screen with a punched hole is useful for an initial light-alignment experiment.',
    'These are computed observations using parallel sunlight on a level base. Nearby dates can also align, particularly close to a solstice. The marks identify a seasonal pattern, not one unique day. Physical construction and outdoor measurements still need to be tested.',
  ].join('\n\n'),
  // Open the finished exhibit on its main summer alignment.
  trials: [
    solsticeObservations[1],
    solsticeObservations[3],
    solsticeObservations[0],
    solsticeObservations[2],
  ].map((row, i) => ({
    id: `solstice-gates-example-${i}`,
    pluginId: 'simulation.solar-monument',
    capturedAt: '2026-09-12T12:00:00Z',
    design: structuredClone(design),
    settings: { ...row.settings },
    prediction:
      row.settings.scenarioId === 'june'
        ? 'The summer carving receives light through the summer window.'
        : row.settings.scenarioId === 'dec'
          ? 'The winter carving receives light through the winter window.'
          : 'The open center receives morning sunlight.',
    measurements: row.measurements,
  })),
  events: [],
};
