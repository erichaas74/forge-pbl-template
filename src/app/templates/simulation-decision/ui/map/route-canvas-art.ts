import type * as Phaser from 'phaser';

/** Scene-owned artwork; these objects have no simulation state or input handlers. */
export function createTownArt(scene: Phaser.Scene, kind: string): Phaser.GameObjects.Container {
  const g = scene.add.graphics();
  g.fillStyle(0x172817, 0.35).fillEllipse(0, 24, 116, 36);
  g.fillStyle(0xc5ab70).fillEllipse(0, 14, 105, 42);
  function house(x: number, y: number, width: number, height: number, roof = 0x704530) {
    g.fillStyle(0x95613b).fillRect(x, y - height, width, height);
    g.fillStyle(0xd2a969).fillRect(x, y - height, width - 9, height);
    g.lineStyle(1, 0x795437, 0.6);
    for (let row = y - height + 6; row < y; row += 6) g.lineBetween(x, row, x + width - 9, row);
    g.fillStyle(roof).fillTriangle(
      x - 5,
      y - height,
      x + width / 2 - 3,
      y - height - 19,
      x + width + 4,
      y - height,
    );
    g.lineStyle(3, 0xc29b67).lineBetween(x - 5, y - height, x + width / 2 - 3, y - height - 19);
    g.fillStyle(0x3d3526).fillRect(x + width / 2 - 6, y - 17, 10, 17);
    g.fillStyle(0xf6d989).fillRect(x + 5, y - height + 9, 7, 8);
    g.lineStyle(1, 0x594127).strokeRect(x + 5, y - height + 9, 7, 8);
  }
  if (kind === 'fort') {
    house(-25, 5, 47, 30);
    g.fillStyle(0x92613d).fillRect(-48, 5, 96, 25);
    g.lineStyle(3, 0xc79c60);
    for (let x = -48; x <= 48; x += 7) g.lineBetween(x, 3, x, 30);
    g.fillStyle(0x3d3022).fillRoundedRect(-12, 11, 24, 20, 10);
    house(-51, 11, 22, 33, 0x4c4a36);
    house(29, 11, 22, 33, 0x4c4a36);
    g.lineStyle(2, 0x4c3324).lineBetween(-33, -38, -33, -70);
    g.fillStyle(0xd5b364).fillTriangle(-33, -69, -10, -64, -33, -58);
  } else if (kind === 'crossing') {
    g.lineStyle(16, 0x75b1b4, 0.9).lineBetween(-52, 15, 52, 15);
    g.lineStyle(25, 0xb18b53).lineBetween(-40, 6, 40, 6);
    g.lineStyle(2, 0x654c2e);
    for (let x = -40; x <= 40; x += 7) g.lineBetween(x, -6, x, 18);
    g.lineStyle(3, 0x68492e).lineBetween(-44, -9, 44, -9).lineBetween(-44, 20, 44, 20);
    house(-12, -18, 30, 23);
  } else if (kind === 'camp' || kind === 'pass') {
    for (const [x, y, size] of [
      [-25, 16, 30],
      [16, 23, 24],
      [12, -14, 21],
    ] as const) {
      g.fillStyle(0xe3d5a8).fillTriangle(x - size, y, x, y - size * 1.6, x + size, y);
      g.fillStyle(0xaca079).fillTriangle(x, y, x, y - size * 1.6, x + size, y);
      g.fillStyle(0x4d4832).fillTriangle(x - 7, y, x, y - 20, x + 7, y);
      g.lineStyle(2, 0x5d4e32).lineBetween(x, y - size * 1.6 - 6, x, y - size * 1.6);
    }
    g.fillStyle(0xe4a35a).fillCircle(-4, 28, 5);
    g.lineStyle(3, 0x714b2b).lineBetween(-12, 32, 5, 26).lineBetween(-10, 26, 5, 33);
  } else {
    house(-45, 14, 37, 27, 0x644d3a);
    house(-5, 4, 43, 39);
    house(21, 26, 30, 24, 0x576653);
    g.fillStyle(0xf1ddb1).fillRect(0, -30, 26, 9);
    g.lineStyle(1, 0x6e5439).strokeRect(0, -30, 26, 9);
    g.lineStyle(3, 0x9c7745).lineBetween(-48, 31, 15, 31);
    for (let x = -48; x < 15; x += 12) g.lineBetween(x, 24, x, 36);
  }
  // Crates and barrels keep each settlement visibly part of the trade network.
  g.fillStyle(0xb88244).fillRect(-45, 26, 11, 10).fillRect(-31, 29, 10, 9);
  g.lineStyle(1, 0x674829).strokeRect(-45, 26, 11, 10).lineBetween(-45, 26, -34, 36);
  return scene.add.container(0, 0, [g]);
}

export function createWagonArt(scene: Phaser.Scene, freight: boolean) {
  const g = scene.add.graphics();
  g.fillStyle(0x172219, 0.3).fillEllipse(16, 25, 125, 21);
  // Canvas bows, shaded cover, plank bed and a small draft team.
  g.fillStyle(0x765135).fillRoundedRect(-32, 2, 65, 20, 3);
  g.lineStyle(2, 0xb58a50);
  for (let y = 8; y < 22; y += 6) g.lineBetween(-31, y, 31, y);
  g.fillStyle(freight ? 0x7dbdb3 : 0xeee0b8).fillRoundedRect(-27, -37, 54, 47, 18);
  g.fillStyle(freight ? 0x4f8f86 : 0xc4b487).fillRoundedRect(12, -31, 15, 39, 10);
  g.lineStyle(2, 0x746547, 0.75).strokeRoundedRect(-27, -37, 54, 47, 18);
  for (const x of [-15, 0, 15]) g.lineBetween(x, -30, x, 7);
  g.lineStyle(2, 0x594631).lineBetween(-27, 7, 27, 7);
  g.fillStyle(freight ? 0x315e54 : 0xa25132).fillRect(-19, 10, 17, 7);
  g.lineStyle(3, 0x745739).lineBetween(30, 14, 62, 8);
  for (const [x, y] of [
    [64, 8],
    [70, -5],
  ] as const) {
    g.fillStyle(0x674d36)
      .fillEllipse(x, y, 27, 15)
      .fillEllipse(x + 14, y - 5, 11, 14);
    g.fillStyle(0x463a28).fillRect(x + 14, y - 15, 3, 8);
    g.lineStyle(3, 0x403424)
      .lineBetween(x - 6, y + 5, x - 9, y + 16)
      .lineBetween(x + 6, y + 5, x + 10, y + 16);
    g.lineStyle(2, 0xc9b889).lineBetween(x - 12, y - 3, x + 8, y + 1);
  }
  const container = scene.add.container(0, 0, [g]);
  const wheels = [-22, 21].map((x) => {
    const wheel = scene.add.graphics().setPosition(x, 23);
    wheel.fillStyle(0x453627).fillCircle(0, 0, 12);
    wheel.lineStyle(3, 0xbfa16c).strokeCircle(0, 0, 10);
    wheel.lineStyle(2, 0xd3b985);
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 4;
      wheel.lineBetween(
        -Math.cos(angle) * 9,
        -Math.sin(angle) * 9,
        Math.cos(angle) * 9,
        Math.sin(angle) * 9,
      );
    }
    wheel.fillStyle(0x69513a).fillCircle(0, 0, 3);
    container.add(wheel);
    return wheel;
  });
  return { container, wheels };
}
