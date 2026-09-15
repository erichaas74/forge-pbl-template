export interface LegacyMysteryStateProjection {
  savedEvidenceIds: string[];
  vialObservations: Record<string, string>;
}

const legacyProjectKey = 'pbl.mysterySubstance.state.v1';

const legacyEvidenceMap: Readonly<Record<string, string>> = {
  sample: 'evidence-inventory',
  photo: 'evidence-shelf-scene',
  temperature: 'evidence-temperature-log',
  label: 'evidence-label-list',
  witness: 'evidence-witness-note',
  solution: 'evidence-test-kit',
  conductivity: 'evidence-probe-calibration',
  'water-reference': 'evidence-water-reference',
  'indicator-key': 'evidence-indicator-key',
  'shelf-audit': 'evidence-shelf-audit',
};

export class LegacyMysteryStateAdapter {
  read(storage: Pick<Storage, 'getItem'> | undefined): LegacyMysteryStateProjection | undefined {
    const raw = storage?.getItem(legacyProjectKey);
    if (raw === null || raw === undefined) {
      return undefined;
    }

    try {
      const value: unknown = JSON.parse(raw);
      if (!isRecord(value)) {
        return undefined;
      }
      const savedClues = Array.isArray(value['savedClues'])
        ? value['savedClues'].filter((item): item is string => typeof item === 'string')
        : [];
      const vialObservations = isRecord(value['vialObservations'])
        ? Object.fromEntries(
            Object.entries(value['vialObservations']).filter(
              (entry): entry is [string, string] => typeof entry[1] === 'string',
            ),
          )
        : {};

      return {
        savedEvidenceIds: savedClues
          .map((id) => legacyEvidenceMap[id])
          .filter((id): id is string => id !== undefined),
        vialObservations,
      };
    } catch {
      return undefined;
    }
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
