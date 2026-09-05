/** Art slots for the reaction bench. */
import type { ArtSlot } from './lab-kit/art-slot';

export type ApparatusPart = 'reservoir' | 'tube' | 'valve' | 'beaker' | 'balance' | 'vial';

export const apparatusArt: Record<ApparatusPart, ArtSlot> = {
  beaker: {
    src: '/bench-art/beaker.webp',
    blend: 'screen',
    aspect: 0.728,
    displayPx: { width: 144, height: 198 },
    exportPx: { width: 432, height: 594 },
    // Measured off the plate: interior bore, stopper underside to inner base.
    well: { top: 26.9, right: 26.4, bottom: 18.8, left: 25.8 },
    note: 'Empty borosilicate vessel with its stopper seated, thick base, graduation marks at 2/4/6. No liquid, no contact shadow.',
  },
  vial: {
    src: '/bench-art/vial.webp',
    blend: 'screen',
    aspect: 0.417,
    displayPx: { width: 40, height: 96 },
    exportPx: { width: 120, height: 288 },
    well: { top: 26.8, right: 25.9, bottom: 13, left: 25.6 },
    note: 'Empty capped glass vial, upright, blank label band. No powder — it is tinted per specimen at runtime.',
  },
  balance: {
    src: '/bench-art/balance.webp',
    blend: 'normal',
    aspect: 1.777,
    displayPx: { width: 128, height: 73 },
    exportPx: { width: 384, height: 220 },
    note: 'Digital balance chassis with an empty pan. Display glass present but blanked — the reading is drawn.',
  },
  reservoir: {
    src: '/bench-art/reservoir.webp',
    blend: 'screen',
    aspect: 2.199,
    displayPx: { width: 120, height: 54 },
    exportPx: { width: 360, height: 164 },
    well: { top: 19.5, right: 13.4, bottom: 29.1, left: 13.3 },
    note: 'Reservoir vessel, empty interior with a visible chamber. No liquid — the level is drawn and drops as it is drawn off.',
  },
  valve: {
    src: '/bench-art/valve.webp',
    blend: 'normal',
    aspect: 1.777,
    displayPx: { width: 34, height: 19 },
    exportPx: { width: 160, height: 88 },
    note: 'Stopcock body only. Omit the handle entirely — it is drawn so it can rotate 90 degrees.',
  },
  tube: {
    src: '/bench-art/tube.webp',
    blend: 'screen',
    aspect: 0.226,
    displayPx: { width: 14, height: 30 },
    exportPx: { width: 327, height: 1448 },
    well: { top: 0, right: 26, bottom: 0, left: 26 },
    note: 'Clear tube segment, seamless top and bottom so it tiles vertically. Interior transparent — the flow is drawn.',
  },
};
