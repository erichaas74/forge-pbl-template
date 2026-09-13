import type { Mission } from './heist.models';

/** Keep the pre-artwork serialization exactly compatible with existing local saves. */
export function gameplayFingerprint(mission: Mission): string {
  const { presentation: _artwork, ...gameplay } = mission;
  return JSON.stringify(gameplay);
}
