import * as Phaser from 'phaser';
import {
  gearMotion,
  releaseFrame,
  type GearLockDefinition,
  type ReleaseModule,
} from './gear-lock.domain';
import { createGearTexture, gearRadius, plate } from './gear-lock.art';
import { GearReleaseRig } from './gear-release.scene';

export interface GearView {
  readonly answer: readonly number[];
  readonly selected: number | null;
  readonly running: boolean;
  readonly runId: number;
  readonly passed: boolean;
  readonly completed: boolean;
  readonly paused: boolean;
  readonly reducedMotion: boolean;
}
export interface GearSceneCallbacks {
  select(index: number): void;
  place(index: number, socket: -1 | 0 | 1): void;
  ready(): void;
  failed(): void;
  beat(module: ReleaseModule): void;
  finished(): void;
}
export interface GearSceneHandle {
  destroy(): void;
}
export type MountGearScene = typeof mountGearScene;

/** Independent Phaser scene. Emits bounded input; never awards animals or writes saves. */
export function mountGearScene(
  parent: HTMLElement,
  lock: GearLockDefinition,
  snapshot: () => GearView,
  callbacks: GearSceneCallbacks,
): GearSceneHandle {
  class Workshop extends Phaser.Scene {
    private rig!: GearReleaseRig;
    private lines!: Phaser.GameObjects.Graphics;
    private glow!: Phaser.GameObjects.Graphics;
    private driver!: Phaser.GameObjects.Image;
    private pinion!: Phaser.GameObjects.Image;
    private cogs: {
      root: Phaser.GameObjects.Container;
      wheel: Phaser.GameObjects.Image;
      label: Phaser.GameObjects.Text;
      index: number;
    }[] = [];
    private labels: Phaser.GameObjects.Text[] = [];
    private aLabel!: Phaser.GameObjects.Text;
    private bLabel!: Phaser.GameObjects.Text;
    private readout!: Phaser.GameObjects.Text;
    private run = -1;
    private elapsed = 0;
    private active: ReleaseModule | null = null;
    private done = false;
    private dragging: number | null = null;
    private axleA = 430;
    private axleB = 590;
    private failed = false;
    preload(): void {
      this.load.image('gear-workshop', lock.backdrop);
      this.load.on('loaderror', () => {
        this.failed = true;
        callbacks.failed();
      });
    }
    create(): void {
      if (this.failed) return;
      this.add.image(720, 340, 'gear-workshop').setDisplaySize(1440, 680);
      this.add.rectangle(720, 340, 1440, 680, 0x04171d, 0.12);
      this.lines = this.add.graphics().setDepth(2);
      this.glow = this.add.graphics().setDepth(20);
      this.rig = new GearReleaseRig(this, lock.release);
      plate(this, 398, 98, 'COMPOUND DRIVE TRAIN', 410);
      plate(this, 898, 98, 'THE RELEASE RUN', 260);
      plate(this, 1235, 478, 'PEN RELEASE', 180);
      plate(this, 710, 649, 'COG TRAY  /  DRAG TO AN AXLE', 400);
      this.driver = this.gear(250, 270, lock.driverTeeth, false).setDepth(5);
      this.add
        .text(250, 270, `${lock.driverTeeth}`, {
          fontFamily: 'Georgia',
          fontSize: '27px',
          color: '#fff1c9',
        })
        .setOrigin(0.5)
        .setDepth(7);
      plate(this, 245, 385, 'FIXED DRIVE', 160);
      this.pinion = this.gear(430, 270, lock.pinionTeeth, true).setDepth(12);
      this.aLabel = this.add
        .text(400, 410, 'A  /  EMPTY', {
          fontFamily: 'Trebuchet MS',
          fontSize: '19px',
          color: '#f6d58d',
        })
        .setOrigin(0.5)
        .setDepth(16);
      this.bLabel = this.add
        .text(622, 360, 'B  /  EMPTY', {
          fontFamily: 'Trebuchet MS',
          fontSize: '19px',
          color: '#a4e5de',
        })
        .setOrigin(0.5)
        .setDepth(16);
      this.add
        .text(437, 158, `${lock.pinionTeeth}-TOOTH PINION\nShares axle A`, {
          fontFamily: 'Trebuchet MS',
          fontSize: '16px',
          align: 'center',
          color: '#9dd9d4',
          stroke: '#10292a',
          strokeThickness: 4,
        })
        .setOrigin(0.5)
        .setDepth(16);
      this.readout = this.add
        .text(470, 461, 'Fit both cogs to connect the drive.', {
          fontFamily: 'Trebuchet MS',
          fontSize: '17px',
          align: 'center',
          color: '#d3e7df',
        })
        .setOrigin(0.5)
        .setDepth(16);
      lock.gears.forEach((gear, index) => {
        const wheel = this.gear(0, 0, gear.teeth, false);
        const label = this.add
          .text(0, 0, `${gear.teeth}`, {
            fontFamily: 'Georgia',
            fontSize: '32px',
            color: '#fff4d5',
            stroke: '#223133',
            strokeThickness: 3,
          })
          .setOrigin(0.5);
        const root = this.add
          .container(0, 0, [wheel, label])
          .setDepth(10)
          .setSize(gearRadius(gear.teeth) * 2.3, gearRadius(gear.teeth) * 2.3);
        root.setInteractive({ useHandCursor: true });
        this.input.setDraggable(root);
        root.on('pointerdown', () => {
          const s = snapshot();
          if (!s.running && !s.completed && !s.paused) callbacks.select(index);
        });
        this.cogs.push({ root, wheel, label, index });
        this.labels.push(
          this.add
            .text(200 + index * 185, 620, '', {
              fontFamily: 'Trebuchet MS',
              fontSize: '14px',
              color: '#d2c4a5',
            })
            .setOrigin(0.5)
            .setDepth(15),
        );
      });
      for (const socket of [0, 1] as const) {
        const zone = this.add
          .zone(socket === 0 ? 430 : 590, 270, 140, 170)
          .setDepth(3)
          .setInteractive({ useHandCursor: true });
        zone.on('pointerdown', () => {
          const s = snapshot();
          if (s.selected !== null && !s.running && !s.completed && !s.paused)
            callbacks.place(s.selected, socket);
        });
      }
      this.input.on('dragstart', (_p: Phaser.Input.Pointer, root: Phaser.GameObjects.Container) => {
        const s = snapshot(),
          cog = this.cogs.find((c) => c.root === root);
        if (!cog || s.running || s.completed || s.paused) return;
        this.dragging = cog.index;
        root.setDepth(30).setScale(0.85);
        callbacks.select(cog.index);
      });
      this.input.on('drag', (p: Phaser.Input.Pointer, root: Phaser.GameObjects.Container) => {
        if (this.dragging === null || snapshot().paused) return;
        const point = p.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;
        root.setPosition(point.x, point.y);
      });
      this.input.on('dragend', (p: Phaser.Input.Pointer, root: Phaser.GameObjects.Container) => {
        const index = this.dragging;
        this.dragging = null;
        root.setDepth(10);
        if (index === null || snapshot().paused || snapshot().running || snapshot().completed)
          return;
        const point = p.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;
        const da = Math.hypot(point.x - this.axleA, point.y - 270),
          db = Math.hypot(point.x - this.axleB, point.y - 270);
        callbacks.place(index, Math.min(da, db) < 145 ? (da < db ? 0 : 1) : -1);
      });
      callbacks.ready();
    }
    private gear(x: number, y: number, teeth: number, silver: boolean): Phaser.GameObjects.Image {
      // Texture pitch radius is 174px. Every cog uses the same world-space tooth pitch.
      const size = (gearRadius(teeth) * 400) / 174;
      return this.add
        .image(x, y, createGearTexture(this, teeth, silver))
        .setDisplaySize(size, size);
    }
    override update(_time: number, delta: number): void {
      if (this.failed || !this.lines) return;
      const s = snapshot();
      if (s.runId !== this.run) {
        this.run = s.runId;
        this.elapsed = 0;
        this.done = false;
        this.active = null;
      }
      if (s.running && !s.paused && !document.hidden) this.elapsed += Math.min(delta, 50) / 1000;
      if (s.running && s.reducedMotion && !s.paused) this.elapsed = 100;
      const frame = releaseFrame(lock.release, this.elapsed);
      if (s.running && s.passed && frame.active !== this.active) {
        this.active = frame.active;
        callbacks.beat(frame.active);
      }
      if (
        s.running &&
        !s.paused &&
        !this.done &&
        (s.passed ? frame.complete : this.elapsed >= 3.2)
      ) {
        this.done = true;
        callbacks.finished();
      }
      const trial = s.running ? Math.min(1, this.elapsed / 3.2) : this.run > 0 ? 1 : 0;
      const motion = gearMotion(lock, s.answer, trial * s.answer[2]);
      const ar = lock.gears[s.answer[0]],
        br = lock.gears[s.answer[1]];
      this.axleA = ar ? 250 + gearRadius(lock.driverTeeth) + gearRadius(ar.teeth) : 430;
      this.axleB =
        ar && br
          ? this.axleA + gearRadius(lock.pinionTeeth) + gearRadius(br.teeth)
          : this.axleA + 160;
      this.driver.setRotation(motion.drive * Math.PI * 2);
      this.pinion
        .setPosition(this.axleA, 270)
        .setRotation(motion.axle * Math.PI * 2 + 0.1)
        .setVisible(!!ar);
      this.aLabel.setText(`A  /  ${ar ? ar.teeth + ' TEETH' : 'EMPTY'}`);
      this.bLabel
        .setText(`B  /  ${br ? br.teeth + ' TEETH' : 'EMPTY'}`)
        .setX(Math.max(605, this.axleB));
      this.readout.setText(
        s.running || this.run > 0 || s.completed
          ? `Drive ${motion.drive.toFixed(1)} turns  /  A ${Math.abs(motion.axle).toFixed(2)}  /  B ${motion.output.toFixed(2)}`
          : 'Fit both cogs. Calculate the crank turns.',
      );
      const g = this.lines;
      g.clear();
      g.lineStyle(17, 0x08191b, 0.8).lineBetween(333, 280, 730, 280);
      g.lineStyle(3, 0x77674b).lineBetween(333, 271, 730, 271).lineBetween(333, 286, 730, 286);
      for (const [x, n] of [
        [this.axleA, 0],
        [this.axleB, 1],
      ]) {
        g.lineStyle(2, n === 0 ? 0xc1a365 : 0x6bb1ae, 0.65).strokeCircle(x, 270, 58);
        g.lineStyle(1, 0xc2d3c0, 0.6)
          .lineBetween(x - 72, 270, x + 72, 270)
          .lineBetween(x, 198, x, 342);
        g.fillStyle(0x90a6a4).fillCircle(x, 270, 7);
      }
      g.lineStyle(2, 0x6eadaa, 0.7).lineBetween(437, 180, this.axleA, 234);
      this.cogs.forEach((c) => {
        const actualSlot = s.answer[0] === c.index ? 0 : s.answer[1] === c.index ? 1 : -1;
        if (this.dragging !== c.index) {
          c.root.setPosition(
            actualSlot === 0 ? this.axleA : actualSlot === 1 ? this.axleB : 200 + c.index * 185,
            actualSlot >= 0 ? 270 : 560,
          );
          c.root.setScale(actualSlot >= 0 ? 1 : 0.55).setDepth(actualSlot === 0 ? 6 : 10);
          c.wheel.setRotation(
            actualSlot === 0
              ? motion.axle * Math.PI * 2 + 0.08
              : actualSlot === 1
                ? motion.output * Math.PI * 2 + 0.08
                : 0,
          );
          c.label.setVisible(actualSlot !== 0);
        }
        this.labels[c.index].setText(
          actualSlot === 0
            ? 'ON AXLE A'
            : actualSlot === 1
              ? 'ON AXLE B'
              : `${lock.gears[c.index].teeth} TEETH`,
        );
        this.labels[c.index].setAlpha(actualSlot >= 0 ? 0.55 : 1);
      });
      this.glow.clear();
      if (s.selected !== null && !s.running && !s.completed) {
        const root = this.cogs[s.selected].root;
        this.glow
          .lineStyle(3, 0xffdc8b, 0.9)
          .strokeCircle(root.x, root.y, gearRadius(lock.gears[s.selected].teeth) * root.scaleX + 9);
      }
      const releaseElapsed = s.running && s.passed ? this.elapsed : s.completed ? 100 : 0;
      this.rig.draw(releaseElapsed, this.axleB, 270, motion.output);
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
          'Clockwork gear puzzle and release machine. Use cog controls for keyboard operation.',
        );
      },
    },
  });
  const resize = new ResizeObserver(() => {
    game.scale.setParentSize(parent.clientWidth, parent.clientHeight);
  });
  resize.observe(parent);
  return {
    destroy: () => {
      resize.disconnect();
      game.destroy(true);
    },
  };
}
