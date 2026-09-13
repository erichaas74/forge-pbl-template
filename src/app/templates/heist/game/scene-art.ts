import * as Phaser from 'phaser';
import type { Mission } from '../domain/heist.models';

/** Texture loading and world layers; no gameplay decisions. */
export class SceneArt {
  available = false;
  constructor(private readonly scene: Phaser.Scene, private readonly mission: Mission) {}
  preload(): void {
    this.scene.load.svg('mission-map', this.mission.map.image, { width: this.mission.map.width, height: this.mission.map.height });
    const art = this.mission.presentation;
    if (art) for (const key of ['ground', 'buildings', 'characters', 'props'] as const) this.scene.load.image(key, art[key]);
  }
  create(): void {
    const s = this.scene, m = this.mission, art = m.presentation;
    this.available = !!art && ['ground', 'buildings', 'characters', 'props'].every(k => s.textures.exists(k));
    if (!art || !this.available) { s.add.image(0, 0, 'mission-map').setOrigin(0).setDepth(-100); return; }
    art.groundSlices.forEach((slice, i) => {
      s.textures.get('ground').add(`slice-${i}`, 0, ...slice.source);
      const [x, y, w, h] = slice.destination;
      s.add.image(x, y, 'ground', `slice-${i}`).setOrigin(0).setDisplaySize(w, h).setTint(0xd5dbcf).setDepth(-100);
    });
    art.buildingFrames.forEach((r, i) => s.textures.get('buildings').add(i, 0, r.x, r.y, r.width, r.height));
    for (const [key, columns] of [['characters', 4], ['props', 2]] as const) {
      const texture = s.textures.get(key), source = texture.getSourceImage();
      for (let row = 0; row < columns; row++) for (let col = 0; col < columns; col++) {
        const x = Math.round(col * source.width / columns), y = Math.round(row * source.height / columns);
        texture.add(row * columns + col, 0, x, y, Math.round((col + 1) * source.width / columns) - x, Math.round((row + 1) * source.height / columns) - y);
      }
    }
    m.walls.forEach((wall, i) => {
      s.add.image(wall.x + wall.width / 2, wall.y + wall.height / 2, 'buildings', art.wallFrames[i] ?? 0)
        .setDisplaySize(wall.width, wall.height).setDepth(wall.y + wall.height);
    });
    art.landmarks?.forEach(r => s.add.image(r.x + r.width / 2, r.y + r.height / 2, 'buildings', r.frame).setDisplaySize(r.width, r.height).setDepth(r.y + r.height));
  }
}
