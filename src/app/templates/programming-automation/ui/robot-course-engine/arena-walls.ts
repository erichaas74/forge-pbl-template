import type * as Phaser from 'phaser';

/** Four plain colored walls; the supplied bounds include their decorative thickness. */
export function drawArenaWalls(
  graphics: Phaser.GameObjects.Graphics,
  x: number, y: number, width: number, height: number, thickness: number,
): void {
  const innerHeight = Math.max(0, height - thickness * 2);
  graphics.fillStyle(0x548bd8).fillRect(x, y, width, thickness);
  graphics.fillStyle(0xe4b94f).fillRect(x, y + height - thickness, width, thickness);
  graphics.fillStyle(0x9470cd).fillRect(x, y + thickness, thickness, innerHeight);
  graphics.fillStyle(0xdf786b).fillRect(x + width - thickness, y + thickness, thickness, innerHeight);
  graphics.lineStyle(3, 0x132d35, 0.3)
    .strokeRect(x + thickness, y + thickness, width - thickness * 2, innerHeight);
}
