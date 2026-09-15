import type Phaser from 'phaser';
import type { KnowledgeAction, KnowledgeDefinition, KnowledgeState } from './knowledge.models';

export interface TownSceneHandle {
  refresh(state: KnowledgeState): void;
  destroy(): void;
}

/** Phaser owns the town, route movement and object feedback; Angular owns the saved model. */
export async function mountKnowledgeTown(
  host: HTMLElement,
  config: KnowledgeDefinition,
  initial: KnowledgeState,
  act: (action: KnowledgeAction) => void,
): Promise<TownSceneHandle> {
  const Phaser = (await import('phaser')).default;
  let current = initial;
  const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  class Town extends Phaser.Scene {
    private art?: Phaser.GameObjects.Graphics;
    private courier?: Phaser.GameObjects.Container;
    private cargo?: Phaser.GameObjects.Graphics;
    private objects: Phaser.GameObjects.GameObject[] = [];
    private lastPlace = '';
    private ready = false;
    create(): void {
      this.ready = true;
      this.paint();
    }
    refresh(): void {
      if (this.ready) this.paint();
    }
    private text(x: number, y: number, value: string, size = 18, color = '#f0dfb5'): void {
      this.objects.push(
        this.add.text(x, y, value, { fontFamily: 'Georgia', fontSize: size, color }).setOrigin(0.5),
      );
    }
    private click(x: number, y: number, w: number, h: number, action: KnowledgeAction): void {
      const zone = this.add.zone(x, y, w, h).setInteractive({ useHandCursor: true });
      const ring = this.add.rectangle(x, y, w, h, 0xd3eac7, 0).setStrokeStyle(3, 0xf6df9f, 0);
      zone.on('pointerover', () => ring.setStrokeStyle(3, 0xf6df9f, 0.9));
      zone.on('pointerout', () => ring.setStrokeStyle(3, 0xf6df9f, 0));
      zone.on('pointerdown', () => act(action));
      this.objects.push(zone, ring);
    }
    private book(g: Phaser.GameObjects.Graphics, x: number, y: number, scale = 1): void {
      g.fillStyle(0x3e3a2d).fillRect(x + 2, y + 4, 28 * scale, 34 * scale);
      g.fillStyle(0xe8d5a8).fillRect(x, y, 28 * scale, 34 * scale);
      g.lineStyle(2, 0x536650)
        .lineBetween(x + 6, y + 10, x + 22 * scale, y + 10)
        .lineBetween(x + 6, y + 17, x + 22 * scale, y + 17)
        .lineBetween(x + 6, y + 24, x + 18 * scale, y + 24);
    }
    private person(
      g: Phaser.GameObjects.Graphics,
      x: number,
      y: number,
      color: number,
      small = 1,
    ): void {
      g.fillStyle(0x172e30, 0.3).fillEllipse(x, y + 30 * small, 44 * small, 11 * small);
      g.lineStyle(8 * small, 0x4c4738)
        .lineBetween(x - 8 * small, y + 10 * small, x - 9 * small, y + 26 * small)
        .lineBetween(x + 8 * small, y + 10 * small, x + 9 * small, y + 26 * small);
      g.fillStyle(color).fillRoundedRect(
        x - 18 * small,
        y - 15 * small,
        36 * small,
        35 * small,
        7 * small,
      );
      g.fillStyle(0xd2a97d).fillCircle(x, y - 29 * small, 13 * small);
      g.fillStyle(0x5e5140).fillEllipse(x, y - 40 * small, 29 * small, 12 * small);
    }
    private paint(): void {
      this.art?.destroy();
      this.objects.forEach((o) => o.destroy());
      this.objects = [];
      const g = this.add.graphics().setDepth(-1);
      this.art = g;
      // The river divides the two districts; every permissible street is visibly connected.
      g.fillStyle(0x27483f).fillRect(0, 0, 1000, 660);
      g.fillStyle(0x3c5b47).fillPoints(
        [
          { x: 0, y: 0 },
          { x: 580, y: 0 },
          { x: 470, y: 660 },
          { x: 0, y: 660 },
        ].map((p) => new Phaser.Math.Vector2(p.x, p.y)),
        true,
      );
      g.fillStyle(0x274f56).fillPoints(
        [
          { x: 570, y: 0 },
          { x: 650, y: 0 },
          { x: 610, y: 230 },
          { x: 556, y: 433 },
          { x: 565, y: 660 },
          { x: 439, y: 660 },
          { x: 462, y: 410 },
          { x: 532, y: 200 },
        ].map((p) => new Phaser.Math.Vector2(p.x, p.y)),
        true,
      );
      for (let i = 0; i < 30; i++) {
        const y = i * 24;
        g.lineStyle(2, 0x8bac9c, 0.23).lineBetween(
          540 - Math.sin(i / 7) * 40,
          y,
          577 - Math.sin(i / 7) * 40,
          y - 3,
        );
      }
      for (let i = 0; i < 35; i++) {
        const x = (i * 233 + 25) % 1000,
          y = (i * 173 + 75) % 660;
        g.fillStyle(0x102f30, 0.13).fillEllipse(x, y, 35, 14);
      }
      for (const p of config.places!)
        for (const link of p.links) {
          const q = config.places!.find((v) => v.id === link)!;
          if (p.id > q.id) continue;
          g.lineStyle(33, 0x203a34, 0.5).lineBetween(p.x, p.y + 30, q.x, q.y + 30);
          g.lineStyle(24, 0xb7a279).lineBetween(p.x, p.y + 25, q.x, q.y + 25);
          g.lineStyle(2, 0xd6c39b, 0.55).lineBetween(p.x - 4, p.y + 20, q.x - 4, q.y + 20);
        }
      // Timber bridge is a place in the route graph, not a teleport control.
      g.fillStyle(0x8a714f).fillRect(447, 395, 116, 68);
      for (let x = 449; x < 560; x += 13) g.lineStyle(2, 0x5b503c).lineBetween(x, 397, x, 462);
      g.lineStyle(6, 0xc7ad76).lineBetween(446, 395, 563, 395).lineBetween(446, 461, 563, 461);
      for (const p of config.places!) {
        if (p.id !== 'bridge') {
          const x = p.x - 82,
            y = p.y - 114;
          g.fillStyle(0x142e2b, 0.45).fillEllipse(p.x + 20, p.y + 31, 225, 55);
          g.fillStyle(0xb7ad83).fillRect(x, y + 26, 158, 116);
          g.fillStyle(0x766c51).fillPoints(
            [
              { x: x + 158, y: y + 26 },
              { x: x + 188, y: y + 48 },
              { x: x + 188, y: y + 142 },
              { x: x + 158, y: y + 142 },
            ].map((p) => new Phaser.Math.Vector2(p.x, p.y)),
            true,
          );
          g.fillStyle(0x86614a).fillTriangle(x - 12, y + 28, x + 80, y - 39, x + 170, y + 28);
          g.fillStyle(0xa07b54).fillTriangle(x + 80, y - 39, x + 170, y + 28, x + 200, y + 49);
          g.lineStyle(6, 0x5c513b)
            .strokeRect(x, y + 26, 158, 116)
            .lineBetween(x + 78, y + 28, x + 78, y + 137)
            .lineBetween(x, y + 81, x + 158, y + 81);
          g.fillStyle(0x1d3a38).fillRect(x + 12, y + 43, 132, 78);
          g.fillStyle(0xab8958).fillRect(x + 6, y + 115, 146, 12);
          const supplied = (current.values['delivered-' + p.id] ?? 0) > 0;
          if (p.id === 'workshop') {
            g.lineStyle(7, 0xc5a46e)
              .strokeRect(x + 36, y + 48, 62, 60)
              .lineBetween(x + 66, y + 43, x + 66, y + 98)
              .lineBetween(x + 42, y + 98, x + 92, y + 98);
          } else {
            this.person(g, x + 111, y + 86, supplied ? 0x82ab93 : 0x74816a, 0.7);
            if (supplied) {
              this.book(g, x + 24, y + 82, 0.8);
              if (p.id === 'school')
                g.lineStyle(4, 0xddc78e).strokeTriangle(
                  x + 48,
                  y + 78,
                  x + 68,
                  y + 42,
                  x + 86,
                  y + 78,
                );
              else if (p.id === 'bookseller')
                for (let b = 0; b < 3; b++) this.book(g, x + 18 + b * 24, y + 54, 0.55);
              else {
                g.lineStyle(3, 0xd9c38e)
                  .lineBetween(x + 20, y + 59, x + 64, y + 59)
                  .lineBetween(x + 20, y + 71, x + 64, y + 71);
                this.book(g, x + 22, y + 38, 0.7);
              }
              g.fillStyle(0xe8d6a5, 0.13).fillEllipse(p.x, p.y - 27, 166, 115);
            } else {
              g.lineStyle(2, 0xc2ac80, 0.5).strokeRect(x + 24, y + 78, 31, 33);
            }
          }
          this.text(p.x, p.y - 126, p.name, 18);
        }
        const here = p.id === current.selected;
        g.lineStyle(here ? 4 : 2, here ? 0xa4e4c3 : 0xe5c992, here ? 1 : 0.6).strokeEllipse(
          p.x,
          p.y + 44,
          62,
          30,
        );
        this.click(p.x, p.y + 20, 158, 94, { type: 'move', target: p.id });
      }
      // The copy pile and carried copies are finite, visible objects.
      const workshop = config.places![0];
      for (let i = 0; i < current.values['stock']; i++)
        this.book(g, workshop.x - 122 + i * 9, workshop.y + 78 - i * 4, 0.85);
      this.text(workshop.x - 88, workshop.y + 135, 'Load', 18);
      this.click(workshop.x - 88, workshop.y + 98, 105, 89, { type: 'load' });
      const place = config.places!.find((p) => p.id === current.selected)!;
      if (!this.courier) {
        this.courier = this.add.container(place.x, place.y + 54).setDepth(4);
        const figure = this.add.graphics();
        this.person(figure, 0, 0, 0xc39261, 0.85);
        this.courier.add(figure);
        this.cargo = this.add.graphics();
        this.courier.add(this.cargo);
      }
      if (this.lastPlace !== place.id) {
        this.tweens.killTweensOf(this.courier);
        if (this.lastPlace && motion)
          this.tweens.add({
            targets: this.courier,
            x: place.x,
            y: place.y + 54,
            duration: 650,
            ease: 'Sine.easeInOut',
          });
        else this.courier.setPosition(place.x, place.y + 54);
        this.lastPlace = place.id;
      }
      this.cargo!.clear();
      for (let i = 0; i < current.values['bag']; i++) this.book(this.cargo!, 23 + i * 10, 3, 0.6);
      this.text(place.x, place.y + 126, 'Hand over', 16);
      this.click(place.x, place.y + 116, 126, 43, { type: 'deliver' });
      // Foreground gardens and walls frame the model without covering its streets.
      g.fillStyle(0x173c34).fillEllipse(57, 589, 220, 92).fillEllipse(892, 605, 312, 137);
      for (let i = 0; i < 12; i++) {
        const x = 15 + i * 84;
        g.fillStyle(0x64794c).fillEllipse(x, 637, 67, 55);
        g.fillStyle(0x203d30, 0.5).fillEllipse(x + 5, 650, 60, 21);
      }
    }
  }
  const scene = new Town('knowledge-town');
  const game = new Phaser.Game({
    type: Phaser.CANVAS,
    parent: host,
    width: 1000,
    height: 660,
    backgroundColor: '#27483f',
    scene: [scene],
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    render: { antialias: true },
    audio: { noAudio: true },
    banner: false,
  });
  return {
    refresh(state) {
      current = state;
      scene.refresh();
    },
    destroy() {
      game.destroy(true);
    },
  };
}
