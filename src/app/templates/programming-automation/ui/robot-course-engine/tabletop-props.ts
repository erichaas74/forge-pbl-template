import type * as Phaser from 'phaser';

/** All props are native vector graphics. Dimensions share the course's centimeter projection. */
export function drawCrate(
  g: Phaser.GameObjects.Graphics,
  x: number,
  y: number,
  size: number,
): void {
  g.fillStyle(0x28251f, 0.22).fillRect(x + 4, y + 6, size, size);
  g.fillStyle(0x87613b).fillRect(x, y, size, size);
  g.lineStyle(1.5, 0x463b2e).strokeRect(x, y, size, size);
  for (let i = 1; i < 4; i++) {
    g.lineStyle(1, 0x473725, 0.6).lineBetween(
      x + (size * i) / 4,
      y + 3,
      x + (size * i) / 4,
      y + size - 3,
    );
  }
  g.lineStyle(4, 0xb28a55).strokeRect(x + 3, y + 3, size - 6, size - 6);
  g.lineStyle(4, 0xb28a55).lineBetween(x + 5, y + size - 5, x + size - 5, y + 5);
  for (const dx of [3, size - 3])
    for (const dy of [3, size - 3]) g.fillStyle(0x484338).fillCircle(x + dx, y + dy, 1);
}

export function drawSteelBlock(
  g: Phaser.GameObjects.Graphics,
  x: number,
  y: number,
  width: number,
  height: number,
  moving = false,
): void {
  g.fillStyle(0x20211e, 0.24).fillRoundedRect(x + 4, y + 6, width, height, 3);
  g.fillStyle(0x494c46).fillRoundedRect(x, y, width, height, 3);
  g.lineStyle(2, 0x343832).strokeRoundedRect(x, y, width, height, 3);
  g.fillStyle(0x63675f).fillRect(x + 5, y + 5, width - 10, height - 10);
  g.lineStyle(1, 0x888b7c).strokeRect(x + 5, y + 5, width - 10, height - 10);
  if (moving) {
    g.fillStyle(0xd0ac55).fillRect(x + 3, y + height - 9, width - 6, 6);
    for (let i = 5; i < width - 7; i += 10)
      g.fillStyle(0x363c36).fillTriangle(
        x + i,
        y + height - 9,
        x + i + 5,
        y + height - 9,
        x + i,
        y + height - 3,
      );
  }
  for (const dx of [3, width - 3])
    for (const dy of [3, height - 3]) {
      g.fillStyle(0x302f28).fillCircle(x + dx, y + dy, 2);
      g.lineStyle(1, 0xa59a78).strokeCircle(x + dx, y + dy, 2);
    }
}

/** Robot origin faces north. Tread phase comes from recorded distance/time, so scrubbing is exact. */
export function drawTabletopRobot(
  g: Phaser.GameObjects.Graphics,
  radius: number,
  phase: number,
  patrol = false,
  carrying = false,
): void {
  g.clear();
  const r = radius;
  g.fillStyle(0x282d2a, 0.24).fillEllipse(2, 4, r * 2.3, r * 2.1);
  for (const side of [-1, 1]) {
    const x = side * r * 0.78 - r * 0.18;
    g.fillStyle(0x2d3431).fillRoundedRect(x, -r * 0.68, r * 0.36, r * 1.4, 3);
    g.lineStyle(0.8, 0x737871).strokeRoundedRect(x, -r * 0.68, r * 0.36, r * 1.4, 3);
    for (let i = 0; i < 6; i++) {
      const y = -r * 0.58 + ((i + (phase % 1)) / 6) * r * 1.16;
      g.lineStyle(1.2, 0x525c55).lineBetween(x + 1, y, x + r * 0.36 - 1, y);
    }
  }
  g.fillStyle(0x292f2b).fillRoundedRect(-r * 0.7, -r * 0.84, r * 1.4, r * 1.7, 4);
  g.fillStyle(patrol ? 0xca7960 : 0xdce0d7).fillRoundedRect(
    -r * 0.6,
    -r * 0.8,
    r * 1.2,
    r * 1.52,
    3,
  );
  g.lineStyle(1, 0x9dada4).strokeRoundedRect(-r * 0.6, -r * 0.8, r * 1.2, r * 1.52, 3);
  g.fillStyle(0x626f67).fillRoundedRect(-r * 0.4, -r * 0.4, r * 0.8, r * 0.86, 2);
  g.lineStyle(1, 0x3a4641).strokeRoundedRect(-r * 0.4, -r * 0.4, r * 0.8, r * 0.86, 2);
  g.fillStyle(0x293d41).fillCircle(0, 0, r * 0.22);
  g.fillStyle(patrol ? 0xf8d384 : 0x62bfdd).fillCircle(0, 0, r * 0.13);
  g.fillStyle(0x343e38).fillRoundedRect(-r * 0.23, -r, r * 0.46, r * 0.28, 2);
  g.fillStyle(patrol ? 0xffd278 : 0x9bdddf).fillRect(-r * 0.13, -r * 0.94, r * 0.26, r * 0.08);
  for (const x of [-0.47, 0.47])
    for (const y of [-0.65, 0.55]) {
      g.fillStyle(0x46564d).fillCircle(r * x, r * y, 1.1);
    }
  if (carrying) drawCrate(g, -r * 0.3, r * 0.1, r * 0.6);
}
