import * as Phaser from 'phaser';
import type { EscapeMission } from '../domain/escape.models';
import type { WorldPoint } from '../domain/expedition.models';
import type { ExpeditionSceneSnapshot } from './expedition-scene.models';

interface ActorArt {
  root: Phaser.GameObjects.Container;
  body: Phaser.GameObjects.Image;
  label: Phaser.GameObjects.Text;
}
interface AnimalArt {
  id: string;
  row: number;
  order: number;
  pen: WorldPoint;
  position: WorldPoint;
  body: Phaser.GameObjects.Image;
  shadow: Phaser.GameObjects.Ellipse;
  freed: boolean;
}
export class ExpeditionActors {
  private readonly players = new Map<string, ActorArt>();
  private readonly animals: AnimalArt[] = [];
  private readonly cages = new Map<
    string,
    { base: Phaser.GameObjects.Image; front: Phaser.GameObjects.Image }
  >();
  private readonly trail: WorldPoint[] = [];
  private lastLocal?: WorldPoint;
  private completeAt = 0;
  private firstFrame = true;
  constructor(
    private readonly scene: Phaser.Scene,
    private readonly mission: EscapeMission,
  ) {
    for (const group of mission.animals) {
      const step = mission.steps.find((s) => s.release.includes(group.id))!;
      const point = {
        x: (step.x / 100) * mission.world!.width,
        y: (step.y / 100) * mission.world!.height - 38,
      };
      const base = scene.add
        .image(point.x, point.y, 'escape-mechanisms', 2)
        .setDisplaySize(180, 158)
        .setOrigin(0.5, 0.68)
        .setDepth(point.y - 20);
      const front = scene.add
        .image(point.x, point.y + 6, 'escape-mechanisms', 'cage-front')
        .setDisplaySize(180, 158 * 0.42)
        .setOrigin(0.5, 0)
        .setDepth(point.y + 38);
      this.cages.set(group.id, { base, front });
      for (let n = 0; n < group.count; n++) {
        const x = point.x - 38 + (n % 3) * 36,
          y = point.y - 20 + Math.floor(n / 3) * 18;
        const row = mission.world!.animalRows[group.id];
        const shadow = scene.add.ellipse(x, y, 23, 9, 0x031b21, 0.38).setDepth(point.y);
        const body = scene.add
          .image(x, y, 'escape-animals', row * 4 + 2)
          .setDisplaySize(row === 2 ? 43 : 42, 51)
          .setOrigin(0.5, 0.82)
          .setDepth(point.y + 12 + n);
        this.animals.push({
          id: group.id,
          row,
          order: this.animals.length,
          pen: { x, y },
          position: { x, y },
          body,
          shadow,
          freed: false,
        });
      }
    }
  }
  get localTarget(): Phaser.GameObjects.Container | undefined {
    return this.players.values().next().value?.root;
  }
  update(s: ExpeditionSceneSnapshot, seconds: number, dt: number): void {
    if (s.phase === 'opening') {
      this.trail.length = 0;
      this.lastLocal = undefined;
      this.completeAt = 0;
    }
    for (const [id, art] of this.players)
      if (!s.players.some((p) => p.id === id)) {
        art.root.destroy(true);
        this.players.delete(id);
      }
    for (const player of s.players) {
      let art = this.players.get(player.id);
      if (!art) {
        const root = this.scene.add.container(player.position.x, player.position.y);
        const shadow = this.scene.add.ellipse(0, 1, 31, 12, 0x04161c, 0.5);
        const ring = this.scene.add.ellipse(0, 3, 37, 15).setStrokeStyle(2, player.color, 0.75);
        const body = this.scene.add
          .image(0, 0, 'escape-characters', 1)
          .setDisplaySize(86, 86)
          .setOrigin(0.5, 0.9);
        const label = this.scene.add
          .text(0, -78, player.name, {
            fontFamily: 'Arial',
            fontSize: '12px',
            color: '#e8ffef',
            backgroundColor: '#092c31c0',
            padding: { x: 6, y: 3 },
          })
          .setOrigin(0.5);
        root.add([shadow, ring, body, label]);
        art = { root, body, label };
        this.players.set(player.id, art);
      }
      const direction = ((Math.round(player.facing / (Math.PI / 2)) % 4) + 4) % 4;
      const stride = player.moving && !s.reducedMotion ? Math.floor(seconds * 7) % 2 : 0;
      art.body
        .setFrame(direction + stride * 4)
        .setY(player.moving && !s.reducedMotion ? Math.sin(seconds * 14) * 1.8 : 0);
      art.root.setPosition(player.position.x, player.position.y).setDepth(player.position.y + 50);
      art.label.setVisible(s.phase === 'explore');
      if (player.id === s.localPlayerId) {
        if (
          !this.lastLocal ||
          Phaser.Math.Distance.BetweenPoints(this.lastLocal, player.position) >= 5
        ) {
          this.trail.unshift({ ...player.position });
          this.trail.length = Math.min(350, this.trail.length);
          this.lastLocal = { ...player.position };
        }
      }
    }
    if (!s.released.size) {
      this.completeAt = 0;
      for (const animal of this.animals) animal.freed = false;
    }
    if (s.phase === 'complete' && !this.completeAt) this.completeAt = seconds;
    for (const animal of this.animals) {
      const freed = s.released.has(animal.id),
        cage = this.cages.get(animal.id)!;
      cage.base.setFrame(freed ? 3 : 2);
      cage.front.setVisible(!freed);
      let target = animal.pen;
      if (freed) {
        const order = this.animals.filter((a) => s.released.has(a.id)).indexOf(animal);
        target =
          this.trail[Math.min(this.trail.length - 1, (order + 1) * 7)] ?? s.players[0].position;
        target = {
          x: target.x + Math.sin(order * 2.4) * 14,
          y: target.y + Math.cos(order * 2.4) * 10,
        };
      }
      if (s.phase === 'complete') {
        const exit = this.mission.steps.at(-1)!;
        target = {
          x: (exit.x / 100) * this.mission.world!.width,
          y: (exit.y / 100) * this.mission.world!.height + 30,
        };
      }
      if (this.firstFrame && freed) animal.position = { ...target };
      const dx = target.x - animal.position.x,
        dy = target.y - animal.position.y,
        moving = freed && Math.hypot(dx, dy) > 5;
      const ease = Math.min(1, dt * (animal.freed ? 7 : 3));
      const x = freed ? animal.position.x + dx * ease : animal.pen.x;
      const y = freed ? animal.position.y + dy * ease : animal.pen.y;
      animal.position = { x, y };
      const hop = s.reducedMotion
        ? 0
        : moving
          ? Math.abs(Math.sin(seconds * (animal.row === 2 ? 9 : 12) + animal.order)) *
            (animal.row === 2 ? 12 : 7)
          : Math.sin(seconds * 2 + animal.order) * 0.7;
      const side = Math.abs(dx) > Math.abs(dy),
        frame =
          animal.row * 4 +
          (side && moving ? 0 : 2) +
          (moving && !s.reducedMotion ? Math.floor(seconds * 6 + animal.order) % 2 : 0);
      animal.body
        .setPosition(x, y - hop)
        .setFrame(frame)
        .setFlipX(side && dx < 0)
        .setDepth(freed ? y + 32 : animal.pen.y + 20);
      animal.body.setScale(Math.min(43 / animal.body.frame.width, 51 / animal.body.frame.height));
      animal.shadow
        .setPosition(x, y + 2)
        .setDepth(freed ? y + 1 : animal.pen.y)
        .setScale(moving ? 0.8 : 1);
      const alpha =
        s.phase === 'complete'
          ? Phaser.Math.Clamp(1 - (seconds - this.completeAt - animal.order * 0.18) / 1.8, 0, 1)
          : 1;
      animal.body.setAlpha(alpha);
      animal.shadow.setAlpha(alpha * 0.4);
      animal.freed = freed;
    }
    this.firstFrame = false;
  }
}
