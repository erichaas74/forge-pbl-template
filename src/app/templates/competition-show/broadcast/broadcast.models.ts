export type BroadcastShot = 'wide' | 'matchup' | 'question' | 'team' | 'winner';
export type BroadcastCue = 'entrance' | 'question' | 'score' | 'champion';
export type CueStep = 'idle' | 'dim' | 'travel' | 'reveal' | 'hold';
export interface BroadcastAssets {
  backdrop?: string; floor?: string; podium?: string; questionScreen?: string;
  bracketBackdrop?: string; winnerBackdrop?: string; showLogo?: string;
}
/** Presentation-only extension. All URLs are same-origin project assets. */
export interface BroadcastConfig {
  id: string; label: string;
  palette: { background: string; metal: string; accent: string; secondary: string; text: string; teamColors: string[] };
  assets: BroadcastAssets;
  teamEmblems?: Record<string, string>;
  sounds?: Partial<Record<BroadcastCue | 'musicBed', string>>;
  camera: { moveMs: number; revealMs: number; fieldOfView: number };
  materials: { floorRoughness: number; podiumMetalness: number };
}
export interface StudioTeam { id: string; name: string; score: number; seed: number; color: string; emblem?: string; }
export interface StudioView {
  title: string; phase: string; roundTitle: string; prompt: string; seconds: number;
  teams: StudioTeam[]; winnerId: string | null; firstBuzzId: string | null;
  shot: BroadcastShot; teamId: string | null; cue: BroadcastCue | null; step: CueStep;
}
export interface CameraPose { position: [number, number, number]; target: [number, number, number]; fov: number; }
export interface StationPosition { x: number; y: number; z: number; }

export const midnightBroadcast: BroadcastConfig = {
  id: 'midnight-gold', label: 'Midnight / Gold',
  palette: { background: '#050b18', metal: '#243145', accent: '#edc875', secondary: '#65bde8', text: '#f8f4e9',
    teamColors: ['#73cafa', '#e8b862', '#ac99f2', '#77d5b4', '#e993a5', '#8eaef8', '#dac284', '#8ac6c0'] },
  assets: {}, camera: { moveMs: 1500, revealMs: 850, fieldOfView: 39 },
  materials: { floorRoughness: 0.18, podiumMetalness: 0.72 },
};
export const polarBroadcast: BroadcastConfig = {
  ...midnightBroadcast, id: 'polar-silver', label: 'Polar / Silver',
  palette: { ...midnightBroadcast.palette, background: '#07161c', metal: '#426070', accent: '#bceef8', secondary: '#85e9c4' },
  materials: { floorRoughness: 0.35, podiumMetalness: 0.9 },
};

export function stationPositions(count: number): StationPosition[] {
  const columns = Math.min(8, count);
  return Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / columns); const rowCount = Math.min(columns, count - row * columns);
    const x = (i % columns - (rowCount - 1) / 2) * 3.1;
    return { x, y: row * 1.6, z: 2.4 - row * 4 + Math.abs(x) * 0.10 };
  });
}
/** Camera targets derive from the physical stations, never from a project's artwork. */
export function studioCamera(shot: BroadcastShot, count: number, teamIndex: number, fov = 39): CameraPose {
  const stations = stationPositions(Math.max(2, count));
  const station = stations[Math.max(0, Math.min(stations.length - 1, teamIndex))];
  const distance = Math.max(20, Math.min(8, count) * 3.5);
  const shots: Record<BroadcastShot, CameraPose> = {
    wide: { position: [1.2, 6.7, distance], target: [0, 3.6, -0.8], fov },
    matchup: { position: [-1, 5.2, Math.max(18, count * 3.2)], target: [0, 2.4, 1], fov },
    question: { position: [0, 5.5, 8.5], target: [0, 5.6, -6.5], fov: 42 },
    team: { position: [station.x + 1.6, station.y + 3.5, station.z + 7.4], target: [station.x, station.y + 1.6, station.z], fov: 34 },
    winner: { position: [station.x - 1.3, station.y + 3.4, station.z + 8.1], target: [station.x, station.y + 1.7, station.z], fov: 34 },
  };
  return shots[shot];
}
export function validAssetUrl(value: unknown): value is string {
  return typeof value === 'string' && /^\/(?!\/)[a-zA-Z0-9_./%-]+$/.test(value) && !value.includes('..');
}
export function validateBroadcast(value: BroadcastConfig): void {
  const fail = () => { throw new Error('INVALID_BROADCAST: Check the studio palette, asset paths, materials, and camera settings.'); };
  if (!value || typeof value.id !== 'string' || typeof value.label !== 'string' || !value.palette || !value.assets || !value.camera || !value.materials) fail();
  const color = (v: unknown) => typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v);
  if (![value.palette.background, value.palette.metal, value.palette.accent, value.palette.secondary, value.palette.text].every(color) ||
    !Array.isArray(value.palette.teamColors) || !value.palette.teamColors.length || !value.palette.teamColors.every(color)) fail();
  if (![...Object.values(value.assets), ...Object.values(value.teamEmblems ?? {}), ...Object.values(value.sounds ?? {})].every(validAssetUrl)) fail();
  if (!Number.isFinite(value.camera.moveMs) || value.camera.moveMs < 0 || value.camera.moveMs > 5000 ||
    !Number.isFinite(value.camera.revealMs) || value.camera.revealMs < 0 || value.camera.revealMs > 3000 ||
    !Number.isFinite(value.camera.fieldOfView) || value.camera.fieldOfView < 30 || value.camera.fieldOfView > 55 ||
    ![value.materials.floorRoughness, value.materials.podiumMetalness].every(v => Number.isFinite(v) && v >= 0 && v <= 1)) fail();
}
