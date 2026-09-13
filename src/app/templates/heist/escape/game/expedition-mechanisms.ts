import * as Phaser from 'phaser';
import type { EscapeMission } from '../domain/escape.models';
import type { ExpeditionInput } from '../domain/expedition.models';
import type { ExpeditionSceneSnapshot } from './expedition-scene.models';

/** Painted, interactive close-ups share the exact same draft as accessible HTML controls. */
export class ExpeditionMechanisms {
  private readonly root: Phaser.GameObjects.Container;
  private readonly live: Phaser.GameObjects.Graphics;
  private labels: Phaser.GameObjects.Text[] = [];
  private counters: {
    id: string;
    sprite: Phaser.GameObjects.Image;
    ring: Phaser.GameObjects.Ellipse;
  }[] = [];
  private index = -1;
  private signature = '';
  constructor(
    private readonly scene: Phaser.Scene,
    private readonly mission: EscapeMission,
    private readonly input: (value: ExpeditionInput) => void,
  ) {
    this.root = scene.add.container(0, 0).setScrollFactor(0).setDepth(5000);
    this.live = scene.add.graphics().setScrollFactor(0).setDepth(5001);
  }
  update(s: ExpeditionSceneSnapshot): void {
    const visible = s.phase === 'puzzle' && !['balance-lock', 'gear-lock'].includes(this.mission.steps[s.currentIndex].puzzle.type) && this.scene.scale.width >= 900;
    this.root.setVisible(visible);
    this.live.setVisible(visible);
    if (!visible) return;
    const x = (this.scene.scale.width - 450) / 2,
      y = this.scene.scale.height / 2 + 15;
    // Cancel the world camera's zoom while keeping this close-up fixed to the screen.
    const zoom = this.scene.cameras.main.zoom,
      w = this.scene.scale.width,
      h = this.scene.scale.height;
    const px = (x - w / 2) / zoom + w / 2,
      py = (y - h / 2) / zoom + h / 2;
    this.root.setPosition(px, py).setScale(1 / zoom);
    this.live.setPosition(px, py).setScale(1 / zoom);
    if (this.index !== s.currentIndex) {
      this.index = s.currentIndex;
      this.build();
      this.signature = '';
    }
    const signature = JSON.stringify(s.draft);
    if (signature === this.signature) return;
    this.signature = signature;
    const p = this.mission.steps[this.index].puzzle,
      g = this.live;
    g.clear();
    if (p.type === 'code') {
      this.labels.forEach((label, i) => label.setText(String(s.draft.digits[i])));
      this.counters.forEach((a) => a.ring.setVisible(s.draft.counted.includes(a.id)));
    }
    if (p.type === 'timing') {
      const start = (p.safeStart / p.cycle) * Math.PI * 2 - Math.PI / 2,
        end = (p.safeEnd / p.cycle) * Math.PI * 2 - Math.PI / 2;
      g.fillStyle(0x326654, 0.3);
      g.beginPath();
      g.moveTo(-8, -18);
      g.arc(-8, -18, 109, start, end);
      g.closePath();
      g.fillPath();
      const angle = (s.draft.departure / p.cycle) * Math.PI * 2 - Math.PI / 2;
      g.lineStyle(5, 0x362d1b);
      g.lineBetween(-8, -18, -8 + Math.cos(angle) * 95, -18 + Math.sin(angle) * 95);
      g.fillStyle(0xe8ba5d);
      g.fillCircle(-8, -18, 8);
      this.labels[0].setText(`${s.draft.departure} → ${s.draft.departure + p.crossing} seconds`);
    }
    if (p.type === 'balance') {
      const sum = s.draft.weights.reduce((total, i) => total + p.weights[i], 0);
      const tilt = Phaser.Math.Clamp((sum - p.target) * 4, -26, 26);
      g.lineStyle(9, 0x9e7850);
      g.lineBetween(-145, tilt - 15, 145, -tilt - 15);
      g.lineStyle(2, 0xb9a679);
      g.lineBetween(-125, tilt - 15, -125, tilt + 75);
      g.lineBetween(125, -tilt - 15, 125, -tilt + 75);
      for (const [x, yy] of [
        [-125, tilt],
        [125, -tilt],
      ]) {
        g.fillStyle(0x765131);
        g.fillRoundedRect(x - 55, yy + 70, 110, 18, 6);
        g.lineStyle(2, 0xcb9f5a);
        g.strokeRoundedRect(x - 55, yy + 70, 110, 18, 6);
      }
      s.draft.weights.forEach((index, order) => {
        g.fillStyle(0x8d9277);
        g.fillRoundedRect(
          92 + (order % 2) * 34,
          -tilt + 36 - Math.floor(order / 2) * 27,
          29,
          33,
          4,
        );
      });
      this.labels[0].setText(`${sum} kg on the counterweight`);
      this.labels[1].setText(
        s.draft.weights.map((i) => p.weights[i]).join(' + ') || 'Select weights',
      );
    }
    if (p.type === 'number') {
      this.labels[0].setText(`${s.draft.quantity ?? '?'} ${p.unit}`);
      const visual = p.visual;
      if (visual?.kind === 'length') {
        for (let i = 0; i < visual.count; i++) {
          const x = -165 + i * 55;
          g.fillStyle(0x9c7346);
          g.fillRoundedRect(x, -65, 49, 126, 5);
          g.lineStyle(2, 0xd8b877);
          g.strokeRoundedRect(x, -65, 49, 126, 5);
          g.lineStyle(1, 0x59402d);
          g.lineBetween(x + 9, -52, x + 13, 46);
          g.lineBetween(x + 32, -35, x + 29, 51);
        }
        this.labels[1].setText(`${visual.count} marked sections · ${visual.amount} cm each`);
      } else if (visual?.kind === 'capacity') {
        const trips = Math.min(6, Math.max(1, s.draft.quantity ?? 1));
        for (let i = 0; i < trips; i++) {
          const x = -175 + (i % 3) * 125,
            yy = -85 + Math.floor(i / 3) * 110;
          g.fillStyle(0x976a3e);
          g.fillEllipse(x + 50, yy + 35, 111, 75);
          g.fillStyle(0x3c352b);
          g.fillEllipse(x + 50, yy + 30, 88, 51);
          for (
            let n = 0;
            n < Math.min(visual.amount, Math.max(0, visual.count - i * visual.amount));
            n++
          ) {
            g.fillStyle(0xe4c389);
            g.fillCircle(x + 23 + (n % 3) * 25, yy + 18 + Math.floor(n / 3) * 20, 8);
          }
        }
        this.labels[1].setText(`${visual.count} passengers · ${visual.amount} spaces per trip`);
      } else {
        const count = visual?.count ?? 12,
          amount = visual?.amount ?? 1;
        for (let i = 0; i < count; i++) {
          const x = -150 + (i % 6) * 59,
            yy = -85 + Math.floor(i / 6) * 100;
          const selected =
            visual?.kind === 'fraction'
              ? i < (s.draft.quantity ?? 0)
              : i * amount < (s.draft.quantity ?? 0);
          g.fillStyle(selected ? 0x74bfb0 : 0x5d6557);
          g.fillEllipse(x, yy + 22, 42, 23);
          g.lineStyle(2, 0xcab383);
          g.strokeEllipse(x, yy + 22, 42, 23);
          if (visual?.kind === 'groups')
            for (
              let j = 0;
              j < Math.min(amount, Math.max(0, (s.draft.quantity ?? 0) - i * amount));
              j++
            ) {
              g.fillStyle(0xf0aa54);
              g.fillTriangle(x - 10 + j * 13, yy - 7, x + j * 13, yy - 7, x - 4 + j * 13, yy + 17);
            }
        }
        this.labels[1].setText(
          visual?.kind === 'fraction'
            ? `${count} animals · share into ${amount} equal groups`
            : `${count} trays · ${amount} for each animal`,
        );
      }
    }
  }
  private text(x: number, y: number, value: string, size = 18): Phaser.GameObjects.Text {
    const label = this.scene.add
      .text(x, y, value, {
        fontFamily: 'Georgia',
        fontSize: `${size}px`,
        color: '#f7e7ba',
        align: 'center',
        stroke: '#1d2928',
        strokeThickness: 3,
      })
      .setOrigin(0.5);
    this.root.add(label);
    return label;
  }
  private build(): void {
    this.root.removeAll(true);
    this.labels = [];
    this.counters = [];
    const p = this.mission.steps[this.index].puzzle;
    const shadow = this.scene.add.ellipse(0, 55, 490, 330, 0x03181f, 0.85);
    this.root.add(shadow);
    if (p.type === 'code') {
      const art = this.scene.add.image(0, 0, 'escape-mechanisms', 0).setDisplaySize(440, 375);
      this.root.add(art);
      p.labels.forEach((label, i) => {
        const x = p.labels.length === 3 ? -65 + i * 75 : -40 + i * 83;
        const text = this.text(x, 47, '0', 42);
        const hit = this.scene.add
          .rectangle(x, 47, 51, 101, 0xffffff, 0.001)
          .setInteractive({ useHandCursor: true });
        hit.on('pointerdown', () => this.input({ type: 'dial', index: i, change: 1 }));
        this.root.add(hit);
        this.labels.push(text);
        this.text(x, 107, label, 10);
      });
      this.text(0, 175, 'Click a dial to turn it', 13);
      if (p.countAnimals) {
        this.mission.animals.forEach((animal, row) => {
          const x0 = -190 + row * 140;
          for (let n = 0; n < animal.count; n++) {
            const x = x0 + (n % 3) * 42,
              y = -213 + Math.floor(n / 3) * 47;
            const ring = this.scene.add
              .ellipse(x, y + 5, 42, 38)
              .setStrokeStyle(3, 0xbbe991)
              .setVisible(false);
            const sprite = this.scene.add
              .image(x, y, 'escape-animals', this.mission.world!.animalRows[animal.id] * 4 + 2)
              .setDisplaySize(42, 48)
              .setInteractive({ useHandCursor: true });
            sprite.setScale(Math.min(42 / sprite.frame.width, 48 / sprite.frame.height));
            const id = `${animal.id}-${n}`;
            sprite.on('pointerdown', () => this.input({ type: 'count', id }));
            this.root.add([ring, sprite]);
            this.counters.push({ id, sprite, ring });
          }
        });
      }
    }
    if (p.type === 'timing') {
      this.root.add(this.scene.add.image(0, -20, 'escape-mechanisms', 1).setDisplaySize(380, 380));
      this.labels.push(this.text(0, 196, '0 → 10 seconds', 25));
      this.text(0, -234, 'WATCH THE WINDOW', 14);
    }
    if (p.type === 'balance') {
      const stand = this.scene.add
        .graphics()
        .fillStyle(0x795432)
        .fillTriangle(0, -15, -52, 170, 52, 170)
        .lineStyle(4, 0xd3ac6d)
        .lineBetween(0, -10, 0, 165);
      this.root.add(stand);
      this.root.add(this.scene.add.image(-125, 20, 'escape-mechanisms', 2).setDisplaySize(100, 88));
      this.labels.push(this.text(0, 209, '0 kg on the counterweight', 23));
      this.labels.push(this.text(0, -123, 'Select weights', 21));
      p.weights.forEach((weight, index) => {
        const x = -145 + index * 95;
        const button = this.scene.add
          .text(x, -191, `${weight} kg`, {
            fontFamily: 'Georgia',
            fontSize: '22px',
            color: '#f9e3b4',
            backgroundColor: '#344b48',
            padding: { x: 14, y: 12 },
          })
          .setOrigin(0.5)
          .setInteractive({ useHandCursor: true });
        button.on('pointerdown', () => this.input({ type: 'weight', index }));
        this.root.add(button);
      });
    }
    if (p.type === 'number') {
      this.labels.push(this.text(0, 178, '?', 35));
      this.labels.push(this.text(0, -162, '', 18));
      this.text(0, 227, 'Your calculation operates the mechanism', 13);
    }
    // Phaser hit testing reads each child's scroll factor, including children of containers.
    this.root.setScrollFactor(0, 0, true);
  }
}
