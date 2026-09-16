import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/competition-show/broadcast/broadcast.models.ts
var midnightBroadcast = {
  id: "midnight-gold",
  label: "Midnight / Gold",
  palette: {
    background: "#050b18",
    metal: "#243145",
    accent: "#edc875",
    secondary: "#65bde8",
    text: "#f8f4e9",
    teamColors: ["#73cafa", "#e8b862", "#ac99f2", "#77d5b4", "#e993a5", "#8eaef8", "#dac284", "#8ac6c0"]
  },
  assets: {},
  camera: { moveMs: 1500, revealMs: 850, fieldOfView: 39 },
  materials: { floorRoughness: 0.18, podiumMetalness: 0.72 }
};
var polarBroadcast = __spreadProps(__spreadValues({}, midnightBroadcast), {
  id: "polar-silver",
  label: "Polar / Silver",
  palette: __spreadProps(__spreadValues({}, midnightBroadcast.palette), { background: "#07161c", metal: "#426070", accent: "#bceef8", secondary: "#85e9c4" }),
  materials: { floorRoughness: 0.35, podiumMetalness: 0.9 }
});
function stationPositions(count) {
  const columns = Math.min(8, count);
  return Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / columns);
    const rowCount = Math.min(columns, count - row * columns);
    const x = (i % columns - (rowCount - 1) / 2) * 3.1;
    return { x, y: row * 1.6, z: 2.4 - row * 4 + Math.abs(x) * 0.1 };
  });
}
function studioCamera(shot, count, teamIndex, fov = 39) {
  const stations = stationPositions(Math.max(2, count));
  const station = stations[Math.max(0, Math.min(stations.length - 1, teamIndex))];
  const distance = Math.max(20, Math.min(8, count) * 3.5);
  const shots = {
    wide: { position: [1.2, 6.7, distance], target: [0, 3.6, -0.8], fov },
    matchup: { position: [-1, 5.2, Math.max(18, count * 3.2)], target: [0, 2.4, 1], fov },
    question: { position: [0, 5.5, 8.5], target: [0, 5.6, -6.5], fov: 42 },
    team: { position: [station.x + 1.6, station.y + 3.5, station.z + 7.4], target: [station.x, station.y + 1.6, station.z], fov: 34 },
    winner: { position: [station.x - 1.3, station.y + 3.4, station.z + 8.1], target: [station.x, station.y + 1.7, station.z], fov: 34 }
  };
  return shots[shot];
}
function validAssetUrl(value) {
  return typeof value === "string" && /^\/(?!\/)[a-zA-Z0-9_./%-]+$/.test(value) && !value.includes("..");
}
function validateBroadcast(value) {
  const fail = () => {
    throw new Error("INVALID_BROADCAST: Check the studio palette, asset paths, materials, and camera settings.");
  };
  if (!value || typeof value.id !== "string" || typeof value.label !== "string" || !value.palette || !value.assets || !value.camera || !value.materials) fail();
  const color = (v) => typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v);
  if (![value.palette.background, value.palette.metal, value.palette.accent, value.palette.secondary, value.palette.text].every(color) || !Array.isArray(value.palette.teamColors) || !value.palette.teamColors.length || !value.palette.teamColors.every(color)) fail();
  if (![...Object.values(value.assets), ...Object.values(value.teamEmblems ?? {}), ...Object.values(value.sounds ?? {})].every(validAssetUrl)) fail();
  if (!Number.isFinite(value.camera.moveMs) || value.camera.moveMs < 0 || value.camera.moveMs > 5e3 || !Number.isFinite(value.camera.revealMs) || value.camera.revealMs < 0 || value.camera.revealMs > 3e3 || !Number.isFinite(value.camera.fieldOfView) || value.camera.fieldOfView < 30 || value.camera.fieldOfView > 55 || ![value.materials.floorRoughness, value.materials.podiumMetalness].every((v) => Number.isFinite(v) && v >= 0 && v <= 1)) fail();
}

export {
  midnightBroadcast,
  polarBroadcast,
  stationPositions,
  studioCamera,
  validAssetUrl,
  validateBroadcast
};
//# debugId=2f5235ff-8d88-55d1-ba1b-136e4f6b70f2
//# sourceMappingURL=chunk-IIEET437.js.map
