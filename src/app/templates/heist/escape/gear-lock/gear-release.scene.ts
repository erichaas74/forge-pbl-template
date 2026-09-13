import * as Phaser from 'phaser';
import { releaseFrame, type ReleaseModule } from './gear-lock.domain';

/** A connected presentation rig: named motion/gravity/impact/reveal modules share one timeline. */
export class GearReleaseRig {
  private readonly g: Phaser.GameObjects.Graphics;
  constructor(
    private readonly scene: Phaser.Scene,
    private readonly modules: readonly ReleaseModule[],
  ) {
    this.g = scene.add.graphics().setDepth(8);
  }
  draw(elapsed: number, outputX: number, outputY: number, drumTurns: number): void {
    const p = releaseFrame(this.modules, elapsed).progress,
      g = this.g;
    g.clear();
    const line = (x1: number, y1: number, x2: number, y2: number, width = 5, color = 0xb39159) => {
      g.lineStyle(width + 3, 0x071317, 0.8).lineBetween(x1 + 2, y1 + 3, x2 + 2, y2 + 3);
      g.lineStyle(width, color).lineBetween(x1, y1, x2, y2);
      g.lineStyle(1, 0xfce2a0, 0.55).lineBetween(x1 - 1, y1 - 1, x2 - 1, y2 - 1);
    };
    // Belt takes motion from B to a remote drum. Open belt preserves its rotation direction.
    line(outputX, outputY - 28, 780, 190, 5, 0x74614a);
    line(outputX, outputY + 28, 780, 250, 5, 0x74614a);
    g.fillStyle(0x30281e).fillCircle(780, 220, 34);
    g.lineStyle(5, 0xc6a065).strokeCircle(780, 220, 31);
    const a = drumTurns * Math.PI * 2;
    line(780, 220, 780 + 24 * Math.sin(a), 220 - 24 * Math.cos(a), 4);
    g.fillStyle(0xf9d48e).fillCircle(780, 220, 6);
    // Drum peg raises the catch, feeding the steel ball onto the downhill double rail.
    line(811, 225 - p.drive * 28, 825, 225 - p.drive * 28, 5, 0x72bcb6);
    line(811, 240, 928, 288, 6);
    line(928, 288, 885, 321, 6);
    line(885, 321, 991, 354, 6);
    line(811, 252, 928, 300, 3);
    line(928, 300, 885, 333, 3);
    line(885, 333, 991, 366, 3);
    const route = [
      [817, 231],
      [925, 279],
      [884, 312],
      [990, 345],
    ];
    const along = Math.min(2.999, p.ball * 3),
      i = Math.floor(along),
      u = along - i;
    const bx = route[i][0] + (route[i + 1][0] - route[i][0]) * u,
      by = route[i][1] + (route[i + 1][1] - route[i][1]) * u;
    g.fillStyle(0x000000, 0.4).fillEllipse(bx + 3, by + 8, 23, 8);
    g.fillStyle(0x718486).fillCircle(bx, by, 10);
    g.fillStyle(0xcde3db).fillCircle(bx - 2, by - 3, 7);
    g.fillStyle(0xffffff).fillCircle(bx - 4, by - 5, 2);
    // Pendulum hammer contacts the peg before the counterweight can move.
    const hammerAngle = -0.85 + Math.sin((p.hammer * Math.PI) / 2) * 1.6;
    const hx = 1002 + Math.sin(hammerAngle) * 60,
      hy = 294 + Math.cos(hammerAngle) * 60;
    line(1002, 294, hx, hy, 9, 0x846244);
    g.fillStyle(0xc19e64).fillCircle(1002, 294, 8);
    g.fillStyle(0x172d31).fillRoundedRect(hx - 15, hy - 7, 38, 24, 4);
    g.fillStyle(0x607a7e).fillRoundedRect(hx - 19, hy - 12, 38, 24, 4);
    g.lineStyle(2, 0xbbd0c5).strokeRoundedRect(hx - 19, hy - 12, 38, 24, 4);
    g.fillStyle(0xc0d1c6, 0.65).fillRect(hx - 15, hy - 9, 30, 3);
    line(1040 + p.hammer * 30, 351, 1060 + p.hammer * 30, 351, 7, 0xe5bd75);
    // A falling weight pulls the cord to the first domino.
    const wy = 272 + p.weight * 124;
    line(1062, 156, 1062, wy, 2, 0xc1b38e);
    line(1062, wy, 1080, wy, 2, 0xc1b38e);
    g.lineStyle(4, 0xc5a572).strokeCircle(1080, 156, 18);
    line(1098, 156, 1110, 410, 2, 0xc1b38e);
    g.fillStyle(0x0d171b, 0.5).fillRoundedRect(1059, wy + 6, 45, 56, 5);
    g.fillStyle(0x80623a).fillRoundedRect(1055, wy, 45, 56, 5);
    g.lineStyle(2, 0xd7b876).strokeRoundedRect(1055, wy, 45, 56, 5);
    g.fillStyle(0xe0bf7d, 0.45).fillRect(1058, wy + 4, 38, 5);
    g.fillStyle(0x3f3425).fillRect(1094, wy + 9, 4, 43);
    for (const x of [1062, 1093])
      for (const y of [wy + 7, wy + 48]) g.fillStyle(0xdac28d).fillCircle(x, y, 2);
    line(1063, wy + 12, 1091, wy + 12, 2, 0xe1c48b);
    line(1110, 418, 1275, 418, 7);
    for (let n = 0; n < 6; n++) {
      const fall = Math.max(0, Math.min(1, p.domino * 7 - n)),
        angle = fall * 1.35,
        x = 1113 + n * 26;
      line(
        x,
        414,
        x + Math.sin(angle) * 39,
        414 - Math.cos(angle) * 39,
        9,
        n % 2 ? 0x8aaeb0 : 0xd5ac67,
      );
    }
    // Final domino releases the overhead catch; portcullis retracts into its stone housing.
    const gateY = 455 - p.gate * 165;
    line(1276, 405, 1294 + p.domino * 20, 405, 5, 0xc1a36c);
    if (gateY > 299)
      for (let n = 0; n < 7; n++) line(1161 + n * 25, 299, 1161 + n * 25, gateY, 8, 0x6f8281);
    for (const y of [gateY - 125, gateY - 25]) if (y > 299) line(1156, y, 1317, y, 10, 0xb69b6b);
    // Dark header occludes the rising bars, giving the lift actual depth.
    g.fillStyle(0x132324).fillRoundedRect(1143, 264, 186, 35, 7);
    g.lineStyle(2, 0x8b7953).strokeRoundedRect(1143, 264, 186, 35, 7);
    if (p.gate > 0) {
      g.fillStyle(0xffd786, p.gate * 0.13).fillTriangle(1190, 345, 1120, 470, 1340, 470);
      for (let n = 0; n < 18; n++) {
        const k = (p.gate + n * 0.061) % 1;
        g.fillStyle(0xffe6aa, (1 - k) * 0.8).fillCircle(
          1150 + ((n * 47) % 170),
          470 - k * 150,
          1.5,
        );
      }
    }
  }
}
