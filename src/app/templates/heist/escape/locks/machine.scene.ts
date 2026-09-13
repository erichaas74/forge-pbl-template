import * as Phaser from 'phaser';
import type { MachineDefinition, MachineKind } from './machine.models';
import {
  MachineSurface,
  type MachineCallbacks,
  type MachineRenderer,
  type MachineView,
} from './machine-surface';
import { fractionRenderer, timingRenderer } from './render-fraction-timing';
import { volumeRenderer, mixingRenderer } from './render-liquids';
import { coordinateRenderer, reflectionRenderer, cableRenderer } from './render-spatial';

export interface MachineSceneHandle {
  destroy(): void;
}
export type MountMachineScene = typeof mountMachineScene;
const renderers: Record<MachineKind, (surface: MachineSurface) => MachineRenderer> = {
  'fraction-gear': (s) => fractionRenderer(s, s.d as Parameters<typeof fractionRenderer>[1]),
  'timing-wheels': (s) => timingRenderer(s, s.d as Parameters<typeof timingRenderer>[1]),
  volume: (s) => volumeRenderer(s, s.d as Parameters<typeof volumeRenderer>[1]),
  mixing: (s) => mixingRenderer(s, s.d as Parameters<typeof mixingRenderer>[1]),
  coordinate: (s) => coordinateRenderer(s, s.d as Parameters<typeof coordinateRenderer>[1]),
  reflection: (s) => reflectionRenderer(s, s.d as Parameters<typeof reflectionRenderer>[1]),
  cable: (s) => cableRenderer(s, s.d as Parameters<typeof cableRenderer>[1]),
};

export function mountMachineScene(
  parent: HTMLElement,
  definition: MachineDefinition,
  snapshot: () => MachineView,
  callbacks: MachineCallbacks,
): MachineSceneHandle {
  class Workshop extends Phaser.Scene {
    private surface?: MachineSurface;
    private mechanism?: MachineRenderer;
    private active = -1;
    private trial = -1;
    private elapsed = 0;
    private clock = 0;
    private settled = true;
    private done = false;
    private rig!: Phaser.GameObjects.Graphics;
    private label!: Phaser.GameObjects.Text;
    preload(): void {
      this.load.image('workshop', definition.backdrop);
      this.load.on('loaderror', () => callbacks.failed());
    }
    create(): void {
      if (this.textures.exists('workshop'))
        this.add.image(720, 340, 'workshop').setDisplaySize(1440, 680);
      this.add.rectangle(720, 340, 1440, 680, 0x03161c, 0.44);
      const panel = this.add.graphics();
      panel.fillStyle(0x071f25, 0.78).fillRoundedRect(120, 85, 955, 570, 24);
      panel.lineStyle(2, 0x9e8759, 0.6).strokeRoundedRect(120, 85, 955, 570, 24);
      this.add.text(155, 106, 'PRECISION WORKSHOP  /  CASTLE ENGINEERING', {
        fontFamily: 'Trebuchet MS',
        fontSize: '15px',
        color: '#c6b38d',
        letterSpacing: 3,
      });
      this.rig = this.add.graphics().setDepth(5);
      this.label = this.add
        .text(1248, 596, 'RELEASE LOCKED', {
          fontFamily: 'Trebuchet MS',
          fontSize: '17px',
          color: '#e9d2a1',
        })
        .setOrigin(0.5)
        .setDepth(12);
      this.input.dragDistanceThreshold = 7;
      this.events.once('shutdown', () => {
        this.mechanism?.destroy();
      });
      callbacks.ready();
    }
    override update(_time: number, milliseconds: number): void {
      const v = snapshot();
      const dt = v.paused || document.hidden ? 0 : Math.min(milliseconds / 1000, 0.05);
      this.clock += dt;
      if (v.active !== this.active) {
        this.mechanism?.destroy();
        this.active = v.active;
        this.surface = new MachineSurface(this, definition.stages[v.active], snapshot, callbacks);
        this.mechanism = renderers[this.surface.d.kind](this.surface);
        this.trial = -1;
        this.elapsed = 0;
      }
      if (v.trial !== this.trial) {
        this.trial = v.trial;
        this.elapsed = 0;
        this.done = false;
      }
      if (v.testing) this.elapsed += dt * (v.reducedMotion ? 8 : 1);
      this.mechanism!.draw(v, dt, this.clock);
      const settled = this.mechanism!.settled();
      if (settled !== this.settled) {
        this.settled = settled;
        callbacks.settled(settled);
      }
      const release = v.testing ? (v.passed ? this.elapsed : 0) : v.completed ? 5 : 0;
      this.drawRelease(release, v.testing && !v.passed ? Math.sin(this.elapsed * 35) * 3 : 0);
      if (
        v.testing &&
        !v.paused &&
        !document.hidden &&
        !this.done &&
        this.elapsed >= (v.passed ? 4.6 : 1.3)
      ) {
        this.done = true;
        callbacks.finished();
      }
    }
    private drawRelease(t: number, shake: number): void {
      const g = this.rig;
      g.clear();
      const clamp = Phaser.Math.Clamp;
      const pin = clamp(t / 0.8, 0, 1),
        weight = clamp((t - 1) / 1.3, 0, 1),
        gate = clamp((t - 2.4) / 1.7, 0, 1);
      g.fillStyle(0x031317, 0.94).fillRoundedRect(1120, 155, 260, 390, 22);
      g.lineStyle(9, 0x8d754d).strokeRoundedRect(1120, 155, 260, 390, 22);
      g.fillStyle(0x56dab4, 0.05 + gate * 0.2).fillRect(1137, 178, 226, 348);
      // Pins retract, a counterweight descends and the linked grille rises.
      g.lineStyle(13, 0xe1bc72).lineBetween(1080, 280 + shake, 1150 - pin * 65, 280 + shake);
      g.lineStyle(3, 0xbda66d).lineBetween(1150, 205, 1350, 205);
      g.lineBetween(1350, 205, 1350, 320 + weight * 145);
      g.fillStyle(0xb19255).fillRoundedRect(1330, 315 + weight * 145, 40, 54, 6);
      g.lineStyle(6, 0xc2a26b).strokeCircle(1350, 205, 19);
      g.lineStyle(3, 0x556367).strokeCircle(1350, 205, 9);
      const bottom = 524 - gate * 332;
      g.lineStyle(13, 0x142b30);
      for (let x = 1152; x <= 1312; x += 32) g.lineBetween(x + 3, 188, x + 3, bottom);
      g.lineStyle(8, 0x9da690);
      for (let x = 1152; x <= 1312; x += 32) g.lineBetween(x, 188, x, bottom);
      g.lineStyle(11, 0xb49d69).lineBetween(1140, bottom, 1326, bottom);
      for (let i = 0; i < 3; i++) {
        g.fillStyle(t > i * 1.2 + 0.3 ? 0x6ce8b8 : 0x293f40).fillCircle(1200 + i * 40, 565, 8);
      }
      this.label.setText(
        gate === 1 ? 'PASSAGE RELEASED' : t > 0 ? 'MECHANISM ENGAGING' : 'RELEASE LOCKED',
      );
    }
  }
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 1440,
    height: 680,
    backgroundColor: '#06151b',
    scene: [Workshop],
    banner: false,
    audio: { noAudio: true },
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    render: { antialias: true },
    callbacks: {
      postBoot: (g) => {
        g.canvas.setAttribute('role', 'img');
        g.canvas.setAttribute(
          'aria-label',
          'Interactive mechanical math workshop. Matching keyboard controls are available below.',
        );
      },
    },
  });
  const resize = new ResizeObserver(() =>
    game.scale.setParentSize(parent.clientWidth, parent.clientHeight),
  );
  resize.observe(parent);
  return {
    destroy: () => {
      resize.disconnect();
      game.destroy(true);
    },
  };
}
