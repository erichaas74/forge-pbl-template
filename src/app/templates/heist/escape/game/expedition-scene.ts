import * as Phaser from 'phaser';
import type { EscapeMission } from '../domain/escape.models';
import type { WorldPoint } from '../domain/expedition.models';
import { ExpeditionActors } from './expedition-actors';
import { ExpeditionMechanisms } from './expedition-mechanisms';
import type {
  ExpeditionSceneCallbacks,
  ExpeditionSceneHandle,
  ExpeditionSceneSnapshot,
} from './expedition-scene.models';

export function mountExpeditionScene(
  parent: HTMLElement,
  mission: EscapeMission,
  snapshot: () => ExpeditionSceneSnapshot,
  callbacks: ExpeditionSceneCallbacks,
): ExpeditionSceneHandle {
  const world = mission.world!;
  let destroyed = false;
  class RescueScene extends Phaser.Scene {
    private actors?: ExpeditionActors;
    private fx!: Phaser.GameObjects.Graphics;
    private guide!: Phaser.GameObjects.Graphics;
    private lightCones!: Phaser.GameObjects.Graphics;
    private lookout!: Phaser.GameObjects.Image;
    private shade!: Phaser.GameObjects.Rectangle;
    private dawn!: Phaser.GameObjects.Rectangle;
    private keys: Record<string, Phaser.Input.Keyboard.Key> = {};
    private markers: {
      root: Phaser.GameObjects.Container;
      ring: Phaser.GameObjects.Arc;
      label: Phaser.GameObjects.Text;
      number: Phaser.GameObjects.Text;
    }[] = [];
    private seconds = 0;
    private ready = false;
    private failed = false;
    private overviewMode = false;
    private previousCelebration = 0;
    private celebrationTime = -100;
    private lastPhase = '';
    private boat!: Phaser.GameObjects.Container;
    preload(): void {
      this.load.image('escape-world', mission.environment);
      this.load.image('escape-characters', world.characters);
      this.load.image('escape-animals', world.animalAtlas);
      this.load.image('escape-mechanisms', world.mechanismAtlas);
      if (world.boat) this.load.image('escape-boat', world.boat);
      this.load.on('loaderror', () => {
        this.failed = true;
        callbacks.failed('Some castle artwork could not load. Reload the game to try again.');
      });
    }
    create(): void {
      if (this.failed) return;
      for (const [key, columns, rows] of [
        ['escape-characters', 4, 4],
        ['escape-animals', 4, 3],
        ['escape-mechanisms', 2, 2],
      ] as const) {
        const texture = this.textures.get(key),
          image = texture.getSourceImage();
        if (key === 'escape-animals' && world.animalFrames) {
          world.animalFrames.forEach(([x, y, w, h], index) =>
            texture.add(
              index,
              0,
              Math.round(x * image.width),
              Math.round(y * image.height),
              Math.round(w * image.width),
              Math.round(h * image.height),
            ),
          );
          continue;
        }
        for (let row = 0; row < rows; row++)
          for (let col = 0; col < columns; col++) {
            const x = Math.round((col * image.width) / columns),
              y = Math.round((row * image.height) / rows);
            texture.add(
              row * columns + col,
              0,
              x,
              y,
              Math.round(((col + 1) * image.width) / columns) - x,
              Math.round(((row + 1) * image.height) / rows) - y,
            );
          }
      }
      const props = this.textures.get('escape-mechanisms'),
        source = props.getSourceImage();
      props.add(
        'cage-front',
        0,
        0,
        Math.round(source.height * 0.79),
        Math.round(source.width / 2),
        Math.floor(source.height * 0.21),
      );
      this.add
        .image(0, 0, 'escape-world')
        .setOrigin(0)
        .setDisplaySize(world.width, world.height)
        .setDepth(-100);
      this.makeLightTexture();
      for (const [i, point] of world.lanterns.entries()) {
        const light = this.add
          .image(point.x, point.y, 'escape-lamp')
          .setDisplaySize(120, 120)
          .setBlendMode(Phaser.BlendModes.ADD)
          .setAlpha(0.42)
          .setDepth(1500);
        if (!snapshot().reducedMotion)
          this.tweens.add({
            targets: light,
            alpha: { from: 0.3, to: 0.5 },
            duration: 650 + i * 37,
            yoyo: true,
            repeat: -1,
          });
      }
      this.guide = this.add.graphics().setDepth(4);
      this.lightCones = this.add.graphics().setDepth(7);
      this.actors = new ExpeditionActors(this, mission);
      this.lookout = this.add
        .image(world.patrol[0].x, world.patrol[0].y, 'escape-characters', 9)
        .setOrigin(0.5, 0.9)
        .setDisplaySize(75, 75);
      this.fx = this.add.graphics().setDepth(1700);
      this.markers = mission.steps.map((step, i) => {
        const x = (step.x / 100) * world.width,
          y = (step.y / 100) * world.height;
        const root = this.add.container(x, y - 88).setDepth(2000);
        const ring = this.add.circle(0, 0, 18, 0x183e43, 0.94).setStrokeStyle(2, 0xbeb681);
        const number = this.add
          .text(0, 0, String(i + 1), { fontFamily: 'Georgia', fontSize: '18px', color: '#fff0c4' })
          .setOrigin(0.5);
        const label = this.add
          .text(0, -35, step.place.toUpperCase(), {
            fontFamily: 'Arial',
            fontSize: '12px',
            color: '#ffebba',
            backgroundColor: '#102d35d9',
            padding: { x: 8, y: 6 },
          })
          .setOrigin(0.5);
        const hit = this.add
          .rectangle(0, 0, 105, 82, 0xffffff, 0.001)
          .setInteractive({ useHandCursor: true });
        hit.on('pointerdown', () => callbacks.input({ type: 'interact', stepId: step.id }));
        root.add([ring, number, label, hit]);
        return { root, ring, label, number };
      });
      this.boat = this.makeBoat();
      this.shade = this.add
        .rectangle(0, 0, 1, 1, 0x061820, 0.25)
        .setOrigin(0)
        .setScrollFactor(0)
        .setDepth(4000)
        .setVisible(false);
      this.dawn = this.add
        .rectangle(0, 0, 1, 1, 0xf8b76b, 0.1)
        .setOrigin(0)
        .setScrollFactor(0)
        .setDepth(1800)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setVisible(false);
      this.keys =
        (this.input.keyboard?.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT', false) as Record<
          string,
          Phaser.Input.Keyboard.Key
        >) ?? {};
      this.input.keyboard?.on('keydown-E', () => {
        if (!this.typing()) callbacks.interact();
      });
      this.input.on(
        'pointerdown',
        (pointer: Phaser.Input.Pointer, objects: Phaser.GameObjects.GameObject[]) => {
          if (objects.length || snapshot().phase !== 'explore') return;
          const point = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
          callbacks.input({ type: 'walk', destination: { x: point.x, y: point.y } });
        },
      );
      this.cameras.main.setBounds(0, 0, world.width, world.height);
      this.scale.on('resize', () => this.resize());
      this.resize();
      this.ready = true;
      this.scene.launch('rescue-closeups');
      callbacks.ready();
    }
    override update(_time: number, milliseconds: number): void {
      if (!this.ready || destroyed) return;
      const dt = Math.min(milliseconds / 1000, 0.05);
      const movingKeys = !this.typing();
      const down = (name: string) => (movingKeys && this.keys[name]?.isDown ? 1 : 0);
      callbacks.frame(dt, {
        x: down('D') + down('RIGHT') - down('A') - down('LEFT'),
        y: down('S') + down('DOWN') - down('W') - down('UP'),
      });
      const s = snapshot();
      if (!s.paused && !document.hidden) this.seconds += dt;
      this.actors?.update(s, this.seconds, s.paused || document.hidden ? 0 : dt);
      if (s.paused || s.reducedMotion || document.hidden) this.tweens.pauseAll();
      else this.tweens.resumeAll();
      this.updateLookout(s);
      this.updateMarkers(s);
      this.drawAtmosphere(s);
      this.shade.setVisible(s.phase === 'puzzle' && this.scale.width >= 900);
      this.dawn.setVisible(s.phase === 'complete');
      if (s.celebration !== this.previousCelebration) {
        this.previousCelebration = s.celebration;
        this.celebrationTime = this.seconds;
      }
      if (this.lastPhase !== s.phase) {
        if (s.phase === 'explore') this.overviewMode = false;
        this.lastPhase = s.phase;
      }
      this.updateCamera(s);
      const end = mission.steps.at(-1)!;
      this.boat.setVisible(s.phase === 'complete');
      if (s.phase === 'complete') {
        this.boat.x =
          (end.x / 100) * world.width -
          14 -
          (s.reducedMotion ? 0 : Math.min(150, (this.seconds - this.celebrationTime) * 12));
        this.boat.y = (end.y / 100) * world.height + 35;
      }
    }
    private typing(): boolean {
      return (
        document.hidden ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName ?? '')
      );
    }
    private updateCamera(s: ExpeditionSceneSnapshot): void {
      const c = this.cameras.main,
        w = this.scale.width,
        h = this.scale.height;
      let zoom = Math.max(w / 1320, h / 810),
        target: WorldPoint = s.players.find((p) => p.id === s.localPlayerId)!.position;
      if (s.phase === 'opening') {
        zoom = Math.max(w / world.width, h / world.height);
        target = { x: world.width / 2, y: world.height * 0.53 };
      } else if (this.overviewMode || s.phase === 'journal') {
        zoom = Math.min(w / world.width, h / world.height);
        target = { x: world.width / 2, y: world.height / 2 };
      } else if (s.phase === 'puzzle' || s.phase === 'celebrate' || s.phase === 'complete') {
        zoom = Math.max(w / 1320, h / 810);
        target = {
          x: target.x + (w >= 900 ? 200 / zoom : 0),
          y: target.y + (w < 900 ? 160 / zoom : 0),
        };
      }
      const ease = s.reducedMotion ? 1 : 0.065;
      c.setZoom(Phaser.Math.Linear(c.zoom, zoom, ease));
      const cx = c.midPoint.x,
        cy = c.midPoint.y;
      c.centerOn(Phaser.Math.Linear(cx, target.x, ease), Phaser.Math.Linear(cy, target.y, ease));
    }
    private updateMarkers(s: ExpeditionSceneSnapshot): void {
      this.guide.clear();
      if (s.phase === 'explore') {
        this.guide.lineStyle(3, 0xe6ca80, 0.45);
        const points = [s.players[0].position, ...s.route];
        for (let i = 1; i < points.length; i++)
          this.guide.lineBetween(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
      }
      this.markers.forEach((marker, i) => {
        const done = s.solved.has(mission.steps[i].id),
          current = i === s.currentIndex && s.phase !== 'opening';
        marker.root.setVisible(s.phase !== 'puzzle' && s.phase !== 'complete');
        marker.label.setVisible(current || this.overviewMode);
        marker.ring
          .setFillStyle(done ? 0x466b4f : current ? 0xb78338 : 0x183e43, 0.94)
          .setStrokeStyle(current ? 3 : 1, current ? 0xffe2a2 : 0x899987);
        marker.number.setText(done ? '✓' : String(i + 1));
        marker.root.setAlpha(i > s.currentIndex ? 0.6 : 1);
        marker.root.y =
          (mission.steps[i].y / 100) * world.height -
          88 +
          (current && !s.reducedMotion ? Math.sin(this.seconds * 2.5) * 4 : 0);
        if (current && s.phase === 'explore') {
          const point = {
            x: (mission.steps[i].x / 100) * world.width,
            y: (mission.steps[i].y / 100) * world.height,
          };
          const radius = 26 + (s.reducedMotion ? 0 : (this.seconds * 14) % 20);
          this.guide.lineStyle(2, 0xffd17a, 0.8);
          this.guide.strokeEllipse(point.x, point.y + 5, radius * 2, radius * 0.7);
        }
      });
    }
    private updateLookout(s: ExpeditionSceneSnapshot): void {
      const route = world.patrol,
        t = this.seconds / 5,
        index = Math.floor(t) % route.length,
        a = route[index],
        b = route[(index + 1) % route.length],
        f = t % 1;
      const x = Phaser.Math.Linear(a.x, b.x, f),
        y = Phaser.Math.Linear(a.y, b.y, f),
        angle = Math.atan2(b.y - a.y, b.x - a.x);
      const direction = ((Math.round(angle / (Math.PI / 2)) % 4) + 4) % 4;
      this.lookout
        .setPosition(x, y)
        .setFrame(8 + direction + (s.reducedMotion ? 0 : Math.floor(this.seconds * 5) % 2) * 4)
        .setDepth(y + 40);
      const g = this.lightCones;
      g.clear();
      g.fillStyle(0xffdba0, 0.13);
      g.beginPath();
      g.moveTo(x, y - 5);
      for (let i = 0; i <= 16; i++) {
        const ray = angle - 0.4 + (i / 16) * 0.8;
        g.lineTo(x + Math.cos(ray) * 150, y + Math.sin(ray) * 150);
      }
      g.closePath();
      g.fillPath();
    }
    private drawAtmosphere(s: ExpeditionSceneSnapshot): void {
      const g = this.fx;
      g.clear();
      const t = s.reducedMotion ? 0 : this.seconds;
      for (let i = 0; i < 34; i++) {
        const x = 200 + ((i * 139) % 1070) + Math.sin(t * 0.18 + i) * 30,
          y = 230 + ((i * 83) % 630) + Math.cos(t * 0.25 + i * 0.9) * 14;
        g.fillStyle(0xf3e5a6, 0.15 + Math.max(0, Math.sin(t * 1.4 + i)) * 0.55);
        g.fillCircle(x, y, i % 3 === 0 ? 2 : 1);
      }
      world.water.forEach((point, i) => {
        const phase = (t * 0.3 + i * 0.21) % 1;
        g.lineStyle(1.5, 0xc8f8e9, (1 - phase) * 0.27);
        g.strokeEllipse(point.x, point.y, 14 + phase * 60, 5 + phase * 22);
      });
      const age = this.seconds - this.celebrationTime;
      if (age < 2.5 && !s.reducedMotion) {
        const step = mission.steps[Math.min(s.currentIndex, mission.steps.length - 1)],
          x = (step.x / 100) * world.width,
          y = (step.y / 100) * world.height;
        for (let i = 0; i < 25; i++) {
          const angle = (i / 25) * Math.PI * 2,
            radius = age * (25 + (i % 5) * 14);
          g.fillStyle(i % 2 ? 0xffdb91 : 0x8ce0c3, Math.max(0, 1 - age / 2.5));
          g.fillCircle(
            x + Math.cos(angle) * radius,
            y - 40 + Math.sin(angle) * radius * 0.6 - age * 13,
            2 + (i % 2),
          );
        }
      }
    }
    private makeLightTexture(): void {
      const texture = this.textures.createCanvas('escape-lamp', 128, 128)!;
      const ctx = texture.getContext(),
        gradient = ctx.createRadialGradient(64, 64, 1, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255,204,111,.8)');
      gradient.addColorStop(0.3, 'rgba(254,174,76,.2)');
      gradient.addColorStop(1, 'rgba(255,165,64,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      texture.refresh();
    }
    private makeBoat(): Phaser.GameObjects.Container {
      const root = this.add.container(0, 0).setDepth(1600),
        g = this.add.graphics();
      g.fillStyle(0x143e46, 0.45);
      g.fillEllipse(6, 16, 131, 47);
      g.fillStyle(0x9b7044);
      g.fillEllipse(0, 0, 125, 61);
      g.fillStyle(0x493d2c);
      g.fillEllipse(0, -3, 101, 41);
      g.lineStyle(4, 0xc09863);
      g.strokeEllipse(0, 0, 122, 58);
      g.lineBetween(-23, -23, -23, 20);
      g.lineBetween(22, -22, 22, 20);
      root.add(g);
      if (world.boat) {
        g.clear().fillStyle(0x143e46, .3).fillEllipse(3, 13, 137, 45);
        root.add(this.add.image(0, 0, 'escape-boat').setDisplaySize(158, 105));
      }
      mission.animals.forEach((animal, i) =>
        root.add(
          this.add
            .image(-28 + i * 28, -7, 'escape-animals', world.animalRows[animal.id] * 4 + 2)
            .setDisplaySize(31, 35),
        ),
      );
      return root.setVisible(false);
    }
    private resize(): void {
      this.shade?.setSize(this.scale.width, this.scale.height);
      this.dawn?.setSize(this.scale.width, this.scale.height);
    }
    overview(): void {
      this.overviewMode = true;
    }
    follow(): void {
      this.overviewMode = false;
    }
  }
  // A separate, unzoomed Phaser scene gives close-ups their own camera and input space.
  class MechanismScene extends Phaser.Scene {
    private mechanisms?: ExpeditionMechanisms;
    create(): void { this.mechanisms = new ExpeditionMechanisms(this, mission, callbacks.input); }
    override update(): void { this.mechanisms?.update(snapshot()); }
  }
  const scene = new RescueScene('rescue-expedition');
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: Math.max(1, parent.clientWidth),
    height: Math.max(1, parent.clientHeight),
    backgroundColor: '#091c24',
    scene: [scene, new MechanismScene('rescue-closeups')],
    banner: false,
    audio: { noAudio: true },
    fps: { target: 60 },
    scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH },
    render: { antialias: true },
    callbacks: {
      postBoot: (game) => {
        game.canvas.setAttribute('tabindex', '0');
        game.canvas.setAttribute(
          'aria-label',
          'Castle rescue game. Use WASD or arrow keys to walk. Press E to inspect the gold objective. Accessible puzzle controls are beside the game.',
        );
      },
    },
  });
  const resize = new ResizeObserver(() => {
    if (!destroyed && game.isBooted && parent.clientWidth && parent.clientHeight)
      game.scale.setParentSize(parent.clientWidth, parent.clientHeight);
  });
  resize.observe(parent);
  return {
    destroy: () => {
      destroyed = true;
      resize.disconnect();
      game.destroy(true);
    },
    overview: () => scene.overview(),
    follow: () => scene.follow(),
    focus: () => game.canvas?.focus(),
  };
}
