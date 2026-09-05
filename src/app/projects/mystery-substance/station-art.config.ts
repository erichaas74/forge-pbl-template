/** Art slots for the Properties Lab, Conservation and Restoration stations. */
import type { ArtSlot } from './lab-kit/art-slot';

export type StationPart =
  | 'magnifier'
  | 'waterCup'
  | 'probe'
  | 'lamp'
  | 'scanBed'
  | 'chamber'
  | 'padBalance'
  | 'shelf'
  | 'labelSheet';

export const stationArt: Record<StationPart, ArtSlot> = {
  magnifier: {
    blend: 'normal',
    aspect: 1.0,
    displayPx: { width: 176, height: 176 },
    exportPx: { width: 528, height: 528 },
    // The lens interior is the well; the specimen field is drawn inside it.
    well: { top: 12, right: 12, bottom: 12, left: 12 },
    note: 'Round bench magnifier seen straight down, chrome ring, empty clear lens. Cut out.',
  },
  waterCup: {
    blend: 'screen',
    aspect: 0.82,
    displayPx: { width: 132, height: 161 },
    exportPx: { width: 396, height: 483 },
    well: { top: 16, right: 14, bottom: 9, left: 14 },
    note: 'Empty straight-sided glass beaker on black. No water, no graduations, no stopper.',
  },
  probe: {
    blend: 'normal',
    aspect: 0.3,
    displayPx: { width: 44, height: 147 },
    exportPx: { width: 132, height: 440 },
    note: 'Conductivity probe: black handle, two parallel steel electrodes at the tip, vertical. Cut out.',
  },
  lamp: {
    blend: 'normal',
    aspect: 0.72,
    displayPx: { width: 58, height: 81 },
    exportPx: { width: 174, height: 242 },
    note: 'Small indicator bulb in a brass holder, filament visible, switched OFF. Glow is drawn.',
  },
  scanBed: {
    blend: 'normal',
    aspect: 1.6,
    displayPx: { width: 208, height: 130 },
    exportPx: { width: 624, height: 390 },
    well: { top: 18, right: 10, bottom: 14, left: 10 },
    note: 'Non-contact scanner bed: dark matte tray with a recessed sample well, empty. Cut out.',
  },
  chamber: {
    blend: 'screen',
    aspect: 1.05,
    displayPx: { width: 210, height: 200 },
    exportPx: { width: 630, height: 600 },
    well: { top: 14, right: 11, bottom: 12, left: 11 },
    note: 'Square glass reaction chamber with a hinged lid, empty. Lid open and closed variants if possible.',
  },
  padBalance: {
    blend: 'normal',
    aspect: 1.9,
    displayPx: { width: 190, height: 100 },
    exportPx: { width: 570, height: 300 },
    note: 'Flat platform balance from the front, wide pan, display blanked. Cut out.',
  },
  shelf: {
    blend: 'normal',
    aspect: 2.4,
    displayPx: { width: 480, height: 200 },
    exportPx: { width: 1440, height: 600 },
    note: 'Empty laboratory shelf unit, four bays, pale wood or steel, front on. Cut out.',
  },
  labelSheet: {
    blend: 'normal',
    aspect: 2.6,
    displayPx: { width: 130, height: 50 },
    exportPx: { width: 390, height: 150 },
    note: 'Single blank adhesive label, slightly curled corner, no writing. Cut out.',
  },
};
