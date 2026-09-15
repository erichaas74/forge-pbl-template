import * as Phaser from 'phaser';
import type { MachineChallenge, MachineInput, StageAnswer } from './machine.models';
export interface MachineView {
  readonly stages?: readonly StageAnswer[];
  readonly freelySelectStages?: boolean;
  readonly active: number;
  readonly answer: StageAnswer;
  readonly selected: number | null;
  readonly testing: boolean;
  readonly trial: number;
  readonly passed: boolean;
  readonly completed: boolean;
  readonly paused: boolean;
  readonly reducedMotion: boolean;
}
export interface MachineCallbacks {
  stage?(index: number): void;
  input(i: MachineInput): void;
  select(index: number): void;
  ready(): void;
  failed(): void;
  settled(value: boolean): void;
  finished(): void;
  engage?(): void;
  replay?(): void;
  pause?(): void;
}
export interface MachineRenderer {
  draw(view: MachineView, dt: number, time: number): void;
  destroy(): void;
  settled(): boolean;
}
export class MachineSurface {
  readonly g: Phaser.GameObjects.Graphics;
  private labels = new Map<string, Phaser.GameObjects.Text>();
  private zones = new Map<string, Phaser.GameObjects.Zone>();
  private actions = new Map<string, { click: () => void; drag?: (x: number, y: number) => void }>();
  private ghost: Phaser.GameObjects.Graphics;
  dragging: { key: string; x: number; y: number } | null = null;
  constructor(
    readonly scene: Phaser.Scene,
    readonly d: MachineChallenge,
    readonly snapshot: () => MachineView,
    readonly cb: MachineCallbacks,
  ) {
    this.g = scene.add.graphics().setDepth(3);
    this.ghost = scene.add.graphics().setDepth(30);
  }
  text(key: string, x: number, y: number, value: string, size = 18, color = '#f0dfb7'): void {
    let t = this.labels.get(key);
    if (!t) {
      t = this.scene.add
        .text(x, y, value, {
          fontFamily: 'Trebuchet MS',
          fontSize: `${size}px`,
          color,
          align: 'center',
          stroke: '#102b30',
          strokeThickness: 3,
        })
        .setOrigin(0.5)
        .setDepth(12);
      this.labels.set(key, t);
    }
    t.setPosition(x, y).setText(value).setColor(color).setFontSize(size);
  }
  zone(
    key: string,
    x: number,
    y: number,
    w: number,
    h: number,
    click: () => void,
    drag?: (x: number, y: number) => void,
  ): void {
    this.actions.set(key, { click, drag });
    let zone = this.zones.get(key);
    if (!zone) {
      zone = this.scene.add.zone(x, y, w, h).setDepth(15).setInteractive({ useHandCursor: true });
      let moved = false;
      zone.on('pointerdown', () => {
        moved = false;
      });
      zone.on('pointerup', () => {
        const s = this.snapshot();
        if (!moved && !s.paused && !s.testing && !s.completed) this.actions.get(key)?.click();
      });
      if (drag) {
        this.scene.input.setDraggable(zone);
        zone.on('dragstart', () => {
          moved = true;
        });
        zone.on('drag', (_p: Phaser.Input.Pointer, px: number, py: number) => {
          const s = this.snapshot();
          if (!s.paused && !s.testing && !s.completed) {
            zone!.setPosition(px, py);
            this.dragging = { key, x: px, y: py };
            this.ghost.clear().lineStyle(3, 0xffdc93).strokeCircle(px, py, 32);
            this.ghost.fillStyle(0xffdb91, 0.16).fillCircle(px, py, 30);
          }
        });
        zone.on('dragend', (p: Phaser.Input.Pointer) => {
          this.ghost.clear();
          this.dragging = null;
          const s = this.snapshot();
          if (!s.paused && !s.testing && !s.completed) {
            const q = p.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;
            this.actions.get(key)?.drag?.(q.x, q.y);
          }
        });
      }
      this.zones.set(key, zone);
    }
    zone.setPosition(x, y).setSize(w, h);
    if (zone.input) zone.input.hitArea.setTo(0, 0, w, h);
  }
  bar(x1: number, y1: number, x2: number, y2: number, width = 7, color = 0xba9558): void {
    const g = this.g;
    g.lineStyle(width + 5, 0x051315, 0.65).lineBetween(x1 + 3, y1 + 4, x2 + 3, y2 + 4);
    g.lineStyle(width, color).lineBetween(x1, y1, x2, y2);
    g.lineStyle(Math.max(1, width * 0.2), 0xf5dfac, 0.65).lineBetween(
      x1 - 1,
      y1 - 1,
      x2 - 1,
      y2 - 1,
    );
  }
  bolt(x: number, y: number, r = 8): void {
    this.g.fillStyle(0x283b3e).fillCircle(x + 2, y + 3, r);
    this.g.fillStyle(0xc4ac74).fillCircle(x, y, r);
    this.g.lineStyle(2, 0x4f533f).lineBetween(x - r * 0.45, y, x + r * 0.45, y);
  }
  plate(key: string, x: number, y: number, text: string, width = 220): void {
    this.g.fillStyle(0x06181d, 0.9).fillRoundedRect(x - width / 2, y - 22, width, 44, 6);
    this.g.lineStyle(1, 0xa88a55).strokeRoundedRect(x - width / 2, y - 22, width, 44, 6);
    this.text(key, x, y, text, 16);
  }
  destroy(): void {
    this.ghost.destroy();
    this.g.destroy();
    this.labels.forEach((t) => t.destroy());
    this.zones.forEach((z) => z.destroy());
  }
}
export const round = (v: number): string => Number(v.toFixed(3)).toString();
