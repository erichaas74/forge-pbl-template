import { visibleEvidence } from './crisis-engine';
import type { CrisisConfig, CrisisEvidence, CrisisState, CrisisWorkstation } from './crisis.models';

/** Preview the desk's released signals without changing the active role or revealing future reports. */
export function workstationReports(
  config: CrisisConfig,
  state: CrisisState,
  station: CrisisWorkstation,
): readonly CrisisEvidence[] {
  const ids = new Set(
    station.roleIds.flatMap((roleId) =>
      visibleEvidence(config, { ...state, roleId }).map((report) => report.id),
    ),
  );
  return config.evidence.filter((report) => ids.has(report.id)).sort((a, b) => b.minute - a.minute);
}
