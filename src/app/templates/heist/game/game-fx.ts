import * as Phaser from 'phaser';
import type { Mission } from '../domain/heist.models';
import { location, position } from '../domain/heist.timeline';
import { PresentationEvents, type MapSnapshot } from './presentation-state';

/** Cursor-driven feedback is deterministic and cannot advance or mutate the engine. */
export class GameFX {
  private readonly events = new PresentationEvents();
  private readonly ink: Phaser.GameObjects.Graphics;
  private pulse?: { time: number; x: number; y: number; color: number };
  private lastTime = 0;
  constructor(scene: Phaser.Scene, private readonly mission: Mission) { this.ink = scene.add.graphics().setDepth(1800); }
  update(s: MapSnapshot): void {
    if (s.time < this.lastTime || s.time - this.lastTime > 1.1) this.pulse = undefined;
    this.lastTime = s.time;
    for (const event of this.events.consume(s.time, s.events)) {
      if (['TARGET_SECURED', 'CRISIS', 'CRISIS_RESOLVED', 'NEAR_MISS', 'DETECTED', 'FAILED', 'EXTRACTED', 'MATH_CHECK'].includes(event.type)) {
        const p = position(this.mission, s.actions, s.time);
        this.pulse = { time: s.time, ...p, color: ['CRISIS', 'DETECTED', 'FAILED', 'NEAR_MISS'].includes(event.type) ? 0xee9a78 : 0x9fe5ca };
      }
    }
    const g = this.ink; g.clear();
    if (this.pulse && !s.reducedMotion) {
      const age = s.time - this.pulse.time;
      if (age >= 0 && age < 2) { g.lineStyle(3, this.pulse.color, 1 - age / 2); g.strokeCircle(this.pulse.x, this.pulse.y, 16 + age * 25); }
    }
    const selected = location(this.mission, s.selected);
    g.lineStyle(2, 0xffe8a2, 0.85); g.strokeCircle(selected.x, selected.y, 19);
    if (s.measureStart) { g.lineStyle(2, 0x98ffe0); g.strokeCircle(s.measureStart.x, s.measureStart.y, 8); }
  }
}
