/** Semantic keys keep replacement artwork independent of course and simulation data. */
export const GAME_ASSETS = {
  WORKSHOP: { key: 'workshop-environment', url: 'assets/game/environment/workshop-panorama-v1.webp' },
  ROBOT_PLAYER: { key: 'courier-player', url: 'assets/game/robot/courier-v1.webp' },
} as const;

export const SCENE_DEPTH = {
  background: 0, environment: 10, surface: 20, objects: 30,
  shadow: 39, player: 40, foreground: 50, effects: 60, hud: 100,
} as const;
