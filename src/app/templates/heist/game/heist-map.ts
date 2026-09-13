import * as Phaser from 'phaser';
import type { Mission, Point } from '../domain/heist.models';
import { location, routeChallenges, verified } from '../domain/heist.timeline';
import { blockedSight, patrolPosition } from '../domain/heist.patrol';
import { SceneArt } from './scene-art';
import { CharacterPresenter } from './character-presenter';
import { CameraDirector } from './camera-director';
import { GameFX } from './game-fx';
import type { MapSnapshot } from './presentation-state';
export type { MapSnapshot } from './presentation-state';
export interface HeistMap { destroy(): void; zoom(amount: number): void; pan(x: number, y: number): void; home(): void; focus?(point: Point): void }
export function mountHeistMap(parent: HTMLElement, mission: Mission, snapshot: () => MapSnapshot, select: (point: Point) => void, ready: (warning?: string) => void, failed: (message: string) => void, compatibility = false): HeistMap {
  let destroyed = false;
  class MissionScene extends Phaser.Scene {
    private ink!: Phaser.GameObjects.Graphics;
    private readonly art = new SceneArt(this, mission);
    private characters!: CharacterPresenter;
    director?: CameraDirector;
    private fx!: GameFX;
    private gateLabel!: Phaser.GameObjects.Text;
    private measureLabel!: Phaser.GameObjects.Text;
    private down?: { x: number; y: number };
    private previousFrame = '';
    constructor() { super('heist-mission'); }
    preload(): void {
      this.art.preload();
    }
    create(): void {
      if (destroyed) return;
      if (!this.textures.exists('mission-map')) { failed('The mission map could not load. Reload the project to retry.'); return; }
      this.art.create();
      this.ink = this.add.graphics().setDepth(1200);
      for (const n of mission.locations) {
        this.add.text(n.x, n.y + 27, n.name.toUpperCase(), { fontFamily: 'Arial', fontSize: '11px', color: '#fff2ce', backgroundColor: '#152c2bdd', padding: { x: 6, y: 4 } }).setOrigin(0.5, 0).setDepth(1600);
      }
      this.characters = new CharacterPresenter(this, mission, this.art.available);
      this.fx = new GameFX(this, mission);
      this.director = new CameraDirector(this, mission); this.director.resize();
      const gate = location(mission, mission.gate.location);
      this.gateLabel = this.add.text(gate.x, gate.y - 34, '', { fontSize: '10px', color: '#e8f3d0', backgroundColor: '#172c2bee', padding: { x: 5, y: 4 } }).setOrigin(0.5).setDepth(1600);
      this.measureLabel = this.add.text(0, 0, '', { fontSize: '12px', color: '#b8ffe8', backgroundColor: '#142d2cf0', padding: { x: 7, y: 5 } }).setOrigin(0.5).setDepth(1800);
      this.scale.on('resize', () => this.director?.resize());
      this.input.mouse?.disableContextMenu();
      this.input.on('pointerdown', (p: Phaser.Input.Pointer) => { this.down = { x: p.x, y: p.y }; });
      this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
        if (p.isDown && this.down && snapshot().tool === 'Pan') {
          this.director?.pan(-(p.x - p.prevPosition.x) / this.cameras.main.zoom, -(p.y - p.prevPosition.y) / this.cameras.main.zoom);
        }
      });
      this.input.on('pointerup', (p: Phaser.Input.Pointer) => {
        if (this.down && Math.hypot(p.x - this.down.x, p.y - this.down.y) < 8 && snapshot().tool !== 'Pan') {
          const world = this.cameras.main.getWorldPoint(p.x, p.y); select({ x: world.x, y: world.y });
        }
        this.down = undefined;
      });
      this.input.on('wheel', (_p: Phaser.Input.Pointer, _objects: Phaser.GameObjects.GameObject[], _dx: number, dy: number) => this.zoom(dy > 0 ? -0.1 : 0.1));
      ready(mission.presentation && !this.art.available ? 'Some artwork could not load. The accessible field map is available; reload to retry the artwork.' : undefined);
    }
    zoom(amount: number): void { this.director?.zoom(amount); }
    override update(): void {

      if (!this.ink || destroyed) return;
      const s = snapshot(), g = this.ink;
      this.director?.update(s, this.characters.root);
      const frame = `${s.time}:${s.revision}:${s.security}:${s.tool}:${s.selected}:${s.reducedMotion}:${s.events.length}:${s.measureStart?.x}:${s.measureStart?.y}`;
      if (frame === this.previousFrame) return;
      this.previousFrame = frame;
      this.characters.update(s); this.fx.update(s);
      g.clear();
      for (const route of mission.routes) {
        const a = location(mission, route.from), b = location(mission, route.to);
        g.lineStyle(2, route.blocked ? 0xb46d59 : 0xffe7a8, route.blocked ? 0.2 : 0.4); g.lineBetween(a.x, a.y, b.x, b.y);
      }
      const checks = routeChallenges(mission, s.plan);
      s.actions.filter(a => a.type === 'MOVE').forEach(a => {
        const from = location(mission, a.from), to = location(mission, a.to);
        const valid = checks.filter(c => c.id.endsWith(`-${a.segment}`)).every(c => verified(c, s.plan));
        const active = s.executing && s.time >= a.start && s.time < a.end;
        g.lineStyle(active ? 7 : 4, valid ? 0xf1cb79 : 0xb7bdb0, 0.95);
        if (valid) g.lineBetween(from.x, from.y, to.x, to.y);
        else for (let t = 0; t < 1; t += 0.08) g.lineBetween(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t, from.x + (to.x - from.x) * Math.min(1, t + 0.045), from.y + (to.y - from.y) * Math.min(1, t + 0.045));
        const angle = Math.atan2(to.y - from.y, to.x - from.x), x = (from.x + to.x) / 2, y = (from.y + to.y) / 2;
        g.lineBetween(x, y, x - 10 * Math.cos(angle - 0.5), y - 10 * Math.sin(angle - 0.5)); g.lineBetween(x, y, x - 10 * Math.cos(angle + 0.5), y - 10 * Math.sin(angle + 0.5));
      });
      mission.locations.forEach(n => { g.lineStyle(2, s.plan.nodes.includes(n.id) ? 0xffe8a0 : 0xd8ddd0, 0.8); g.strokeCircle(n.x, n.y, 11); });
      for (const guard of mission.guards) {
        const p = patrolPosition(guard, s.time);
        if (s.security) {
          g.lineStyle(1, 0xe9a18a, 0.6);
          guard.points.forEach((a, i) => { const b = guard.points[(i + 1) % guard.points.length]; g.lineBetween(a.x, a.y, b.x, b.y); });
          const spread = guard.angle * Math.PI / 360;
          g.fillStyle(0xee9473, 0.24); g.beginPath(); g.moveTo(p.x, p.y);
          for (let ray = 0; ray <= 16; ray++) {
            const angle = p.facing - spread + 2 * spread * ray / 16;
            let low = 0, high = guard.range;
            for (let step = 0; step < 7; step++) { const r = (low + high) / 2; if (blockedSight(p, { x: p.x + Math.cos(angle) * r, y: p.y + Math.sin(angle) * r }, mission.walls)) high = r; else low = r; }
            g.lineTo(p.x + Math.cos(angle) * low, p.y + Math.sin(angle) * low);
          }
          g.closePath(); g.fillPath();
        }
      }
      if (s.measurement) {
        const { from, to } = s.measurement;
        g.lineStyle(3, 0xa6e3d6); g.lineBetween(from.x, from.y, to.x, to.y); g.strokeCircle(from.x, from.y, 6); g.strokeCircle(to.x, to.y, 6);
        this.measureLabel.setPosition((from.x + to.x) / 2, (from.y + to.y) / 2 - 18).setText(`${s.measurement.cm.toFixed(2)} cm · 1 cm = ${mission.map.metersPerCm} m`);
      }
      this.measureLabel.setVisible(!!s.measurement);
      const gate = location(mission, mission.gate.location);
      const open = s.time % mission.gate.cycle < mission.gate.openSeconds;
      if (!open) { g.lineStyle(6, 0xeaa089); g.lineBetween(gate.x - 16, gate.y - 12, gate.x + 16, gate.y + 12); g.lineBetween(gate.x - 16, gate.y + 12, gate.x + 16, gate.y - 12); }
      const phase = s.time % mission.gate.cycle;
      this.gateLabel.setText(mission.gate.openSeconds === mission.gate.cycle ? 'GATE OPEN' : `${open ? 'GATE OPEN' : 'GATE CLOSED'} · ${Math.ceil((open ? mission.gate.openSeconds : mission.gate.cycle) - phase)} s`);
    }
  }
  const scene = new MissionScene();
  const game = new Phaser.Game({ type: compatibility ? Phaser.CANVAS : Phaser.AUTO, parent, width: parent.clientWidth, height: parent.clientHeight, backgroundColor: '#102421', scene, banner: false, audio: { noAudio: true }, fps: { target: 30 }, scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH }, render: { antialias: true } });
  // Opening the drawer changes the host without a window resize event.
  const observer = new ResizeObserver(() => {
    const width = parent.clientWidth, height = parent.clientHeight;
    if (!destroyed && game.isBooted && width > 0 && height > 0 && (game.scale.width !== width || game.scale.height !== height)) game.scale.setParentSize(width, height);
  });
  observer.observe(parent);
  return {
    destroy: () => { destroyed = true; observer.disconnect(); game.destroy(true); },
    zoom: amount => scene.zoom(amount),
    pan: (x, y) => scene.director?.pan(x, y),
    home: () => scene.director?.overview(),
    focus: point => scene.director?.focus(point, snapshot().reducedMotion),
  };
}
