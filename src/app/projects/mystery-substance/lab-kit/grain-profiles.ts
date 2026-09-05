/**
 * How each specimen behaves when poured, scooped or scanned.
 *
 * Particle size is one of the four discriminating observations in this
 * investigation, so these profiles are evidence as much as decoration: A is
 * coarse sparkling crystals, D is a fine clumping powder that throws dust.
 * Shared by every station that shows a specimen moving.
 */
export interface GrainProfile {
  count: number;
  minSize: number;
  maxSize: number;
  /** Bright specks on some grains — crystalline materials catch the light. */
  sparkle: boolean;
  /** Strength of the blurred dust cloud that trails the grains, 0–1. */
  dust: number;
  /** Fine powders fall as clumps rather than separate grains. */
  clump: boolean;
}

export const grainProfiles: Readonly<Record<string, GrainProfile>> = {
  // Coarse, clear-edged crystals.
  'vial-a': { count: 11, minSize: 3.2, maxSize: 5.4, sparkle: true, dust: 0.04, clump: false },
  // Smaller, sparkling crystals.
  'vial-b': { count: 14, minSize: 2.3, maxSize: 3.9, sparkle: true, dust: 0.08, clump: false },
  // Fine white powder.
  'vial-c': { count: 20, minSize: 1.4, maxSize: 2.5, sparkle: false, dust: 0.34, clump: false },
  // Very fine white powder.
  'vial-d': { count: 26, minSize: 0.9, maxSize: 1.9, sparkle: false, dust: 0.58, clump: true },
};

export const defaultGrainProfile: GrainProfile = {
  count: 16,
  minSize: 2,
  maxSize: 3.4,
  sparkle: false,
  dust: 0.2,
  clump: false,
};

export interface GrainSpec {
  id: number;
  size: number;
  offsetX: number;
  delayMs: number;
  spinDeg: number;
  sparkle: boolean;
}

/**
 * Builds a deterministic scatter for one profile. Index-derived rather than
 * random so a specimen pours the same way every time it is tested — the bench
 * is a measuring instrument, not a lava lamp.
 */
export function buildGrainSpecs(profile: GrainProfile, spread = 18): readonly GrainSpec[] {
  return Array.from({ length: profile.count }, (_, index) => {
    const ratio = ((index * 37) % 101) / 100;
    return {
      id: index,
      size: profile.minSize + (profile.maxSize - profile.minSize) * ratio,
      offsetX: Math.round((((index * 53) % spread) - spread / 2) * 10) / 10,
      delayMs: (index * 41) % 460,
      spinDeg: 140 + ((index * 67) % 180),
      sparkle: profile.sparkle && index % 3 === 0,
    };
  });
}
