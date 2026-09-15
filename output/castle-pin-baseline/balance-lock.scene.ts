import * as Phaser from 'phaser';
import {
  balanceReading,
  formatPiece,
  pieceMass,
  scaleOffset,
  type BalanceLockDefinition,
  type BalancePiece,
  type BalanceSide,
} from './balance-lock.domain';

export interface BalanceView {
  readonly active: number;
  readonly placements: readonly number[];
  readonly selected: number | null;
  readonly sealed: readonly number[];
  readonly completed: boolean;
  readonly reducedMotion: boolean;
  readonly paused: boolean;
  readonly attempt: number;
}
export interface BalanceSceneCallbacks {
  select(index: number): void;
  place(index: number, side: BalanceSide): void;
  ready(): void;
  failed(): void;
}
export interface BalanceSceneHandle {
  destroy(): void;
}
export type MountBalanceScene = typeof mountBalanceScene;

/** The scene renders mathematical state; pointer events emit placement intents only. */
export function mountBalanceScene(
  parent: HTMLElement,
  lock: BalanceLockDefinition,
  snapshot: () => BalanceView,
  callbacks: BalanceSceneCallbacks,
): BalanceSceneHandle {
  const palettes = {
    brass: ['#4d321d', '#c7994a', '#ffe3a0'],
    stone: ['#343e46', '#748b91', '#d2e2df'],
    laboratory: ['#153c49', '#50aabb', '#c3f6fa'],
  } as const;
  const colors = palettes[lock.skin];
  class Chamber extends Phaser.Scene {
    private mechanics!: Phaser.GameObjects.Graphics;
    private blocks: {
      root: Phaser.GameObjects.Container;
      piece: BalancePiece;
      index: number;
      fixedSide?: 1 | 2;
      width: number;
      height: number;
    }[] = [];
    private active = -1;
    private angle = 0;
    private velocity = 0;
    private dragging: Phaser.GameObjects.Container | null = null;
    private elapsed = 0;
    private release = 0;
    private pin = 0;
    private failed = false;
    private beam!: Phaser.GameObjects.Image;
    private hub!: Phaser.GameObjects.Image;
    private leftLabel!: Phaser.GameObjects.Text;
    private rightLabel!: Phaser.GameObjects.Text;
    private pinLabel!: Phaser.GameObjects.Text;
    private glow!: Phaser.GameObjects.Rectangle;
    private doors: Phaser.GameObjects.Image[] = [];
    preload(): void {
      this.load.image('chamber', lock.backdrop);
      if (lock.blockAtlas) this.load.image('painted-blocks', lock.blockAtlas);
      this.load.on('loaderror', () => {
        this.failed = true;
        callbacks.failed();
      });
    }
    create(): void {
      if (this.failed) return;
      const frame = () =>
        this.cameras.main.setSize(this.scale.width, this.scale.height).centerOn(720, 340);
      this.scale.on('resize', frame);
      this.events.once('shutdown', () => this.scale.off('resize', frame));
      frame();
      this.add.image(720, 340, 'chamber').setDisplaySize(1440, 810).setAlpha(0.75);
      this.add.rectangle(720, 340, 1440, 680, 0x071b25, 0.17);
      // The central vault is split into two painted leaves over a dark opening.
      const backdrop = this.textures.get('chamber'),
        source = backdrop.getSourceImage();
      this.add.rectangle(722, 142, 480, 420, 0x03141c);
      for (let i = 0; i < 2; i++) {
        const x = 0.335 + i * 0.167,
          w = 0.167;
        backdrop.add(
          `door-${i}`,
          0,
          Math.round(source.width * x),
          0,
          Math.round(source.width * w),
          Math.round(source.height * 0.52),
        );
        this.doors.push(
          this.add
            .image((x + w / 2) * 1440, 0.26 * 810 - 65, 'chamber', `door-${i}`)
            .setDisplaySize(w * 1440, 0.52 * 810)
            .setAlpha(0.7),
        );
      }
      this.glow = this.add
        .rectangle(720, 220, 16, 345, 0xb8ffe3, 0)
        .setBlendMode(Phaser.BlendModes.ADD);
      this.makeTextures();
      if (lock.blockAtlas) {
        const texture = this.textures.get('painted-blocks'),
          source = texture.getSourceImage();
        const cell = source.width / 3;
        // Standardized inner frame excludes transparent atlas padding; generated materials share the silhouette.
        for (let i = 0; i < 3; i++)
          texture.add(
            i,
            0,
            Math.round(i * cell + cell * 0.04),
            Math.round(source.height * 0.19),
            Math.round(cell * 0.92),
            Math.round(source.height * 0.57),
          );
      }
      this.add.image(720, 371, 'pillar').setDepth(2);
      this.add.image(720, 474, 'base').setDepth(3);
      this.mechanics = this.add.graphics().setDepth(4);
      this.beam = this.add.image(720, 165, 'beam').setDepth(6);
      this.hub = this.add.image(720, 165, 'hub').setDepth(8);
      this.add
        .text(720, 461, 'AEQUILIBRIUM', {
          fontFamily: 'Georgia',
          fontSize: '17px',
          color: '#b7ab86',
          letterSpacing: 5,
        })
        .setOrigin(0.5)
        .setDepth(5);
      this.leftLabel = this.label(425, 446, 'FIXED LOAD + YOUR BLOCKS', 15);
      this.rightLabel = this.label(1015, 446, 'BUILD AN EQUAL LOAD', 15);
      this.pinLabel = this.label(720, 265, 'RELEASE PIN', 12);
      this.label(720, 518, 'WEIGHT COLLECTION  /  DRAG TO EITHER PAN', 15);
      // Large pan targets also support selecting a block, then tapping a pan.
      for (const side of [1, 2] as const)
        this.add
          .zone(side === 1 ? 425 : 1015, 370, 330, 170)
          .setInteractive({ useHandCursor: true })
          .setDepth(9)
          .on('pointerdown', () => {
            const s = snapshot();
            if (s.selected !== null && !s.paused) callbacks.place(s.selected, side);
          });
      this.input.on(
        'dragstart',
        (_pointer: Phaser.Input.Pointer, object: Phaser.GameObjects.Container) => {
          const s = snapshot();
          if (s.paused || s.completed || s.sealed.includes(s.active)) return;
          this.dragging = object;
          object.setDepth(80);
          callbacks.select(Number(object.getData('index')));
        },
      );
      this.input.on(
        'drag',
        (
          _pointer: Phaser.Input.Pointer,
          object: Phaser.GameObjects.Container,
          x: number,
          y: number,
        ) => {
          if (this.dragging !== object || snapshot().paused) return;
          object.setPosition(Phaser.Math.Clamp(x, 40, 1400), Phaser.Math.Clamp(y, 80, 640));
        },
      );
      this.input.on(
        'dragend',
        (pointer: Phaser.Input.Pointer, object: Phaser.GameObjects.Container) => {
          if (this.dragging !== object) return;
          this.dragging = null;
          const s = snapshot();
          if (s.paused || s.completed) return;
          const p = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;
          const side: BalanceSide =
            p.y >= 220 && p.y < 485 && Math.abs(p.x - 425) < 175
              ? 1
              : p.y >= 220 && p.y < 485 && Math.abs(p.x - 1015) < 175
                ? 2
                : 0;
          callbacks.place(Number(object.getData('index')), side);
        },
      );
      callbacks.ready();
    }
    private label(x: number, y: number, text: string, size: number): Phaser.GameObjects.Text {
      return this.add
        .text(x, y, text, {
          fontFamily: 'Arial',
          fontSize: `${size}px`,
          color: '#f5e7bd',
          stroke: '#102831',
          strokeThickness: 4,
          align: 'center',
        })
        .setOrigin(0.5)
        .setDepth(20);
    }
    private texture(
      key: string,
      width: number,
      height: number,
      draw: (ctx: CanvasRenderingContext2D) => void,
    ): void {
      const t = this.textures.createCanvas(key, width, height)!;
      draw(t.getContext());
      t.refresh();
    }
    private metal(ctx: CanvasRenderingContext2D, w: number, h: number): void {
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      [colors[0], colors[1], colors[2], colors[1], colors[0]].forEach((c, i) =>
        gradient.addColorStop(i / 4, c),
      );
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = colors[2];
      ctx.lineWidth = 2;
      ctx.strokeRect(2, 2, w - 4, h - 4);
      ctx.strokeStyle = '#251f18';
      ctx.strokeRect(5, 5, w - 10, h - 10);
    }
    private makeTextures(): void {
      this.texture('beam', 640, 40, (ctx) => {
        this.metal(ctx, 640, 40);
        for (let x = 16; x < 640; x += 32) {
          ctx.fillStyle = '#352b20';
          ctx.beginPath();
          ctx.arc(x, 20, 3, 0, 7);
          ctx.fill();
        }
        ctx.fillStyle = '#eddb99';
        ctx.fillRect(20, 8, 600, 2);
      });
      this.texture('pillar', 86, 355, (ctx) => {
        this.metal(ctx, 86, 355);
        ctx.fillStyle = '#23363b';
        ctx.fillRect(30, 60, 26, 275);
        ctx.strokeStyle = colors[1];
        for (let y = 80; y < 330; y += 18) {
          ctx.beginPath();
          ctx.moveTo(33, y);
          ctx.lineTo(53, y);
          ctx.stroke();
        }
      });
      this.texture('base', 300, 55, (ctx) => {
        this.metal(ctx, 300, 55);
        ctx.fillStyle = '#223438';
        ctx.fillRect(21, 15, 258, 26);
      });
      this.texture('hub', 116, 116, (ctx) => {
        const g = ctx.createRadialGradient(46, 37, 3, 58, 58, 55);
        g.addColorStop(0, colors[2]);
        g.addColorStop(0.5, colors[1]);
        g.addColorStop(1, colors[0]);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(58, 58, 54, 0, 7);
        ctx.fill();
        ctx.strokeStyle = colors[2];
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.strokeStyle = colors[0];
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(58, 58, 34, 0, 7);
        ctx.stroke();
        ctx.fillStyle = '#20363c';
        ctx.fillRect(48, 34, 20, 48);
        ctx.fillStyle = '#ddce96';
        ctx.fillRect(54, 39, 8, 30);
      });
      this.texture('block', 180, 130, (ctx) => {
        ctx.fillStyle = colors[0];
        ctx.beginPath();
        ctx.moveTo(0, 18);
        ctx.lineTo(155, 18);
        ctx.lineTo(180, 0);
        ctx.lineTo(180, 108);
        ctx.lineTo(155, 130);
        ctx.lineTo(0, 130);
        ctx.closePath();
        ctx.fill();
        const g = ctx.createLinearGradient(0, 18, 160, 130);
        g.addColorStop(0, colors[2]);
        g.addColorStop(0.23, colors[1]);
        g.addColorStop(1, colors[0]);
        ctx.fillStyle = g;
        ctx.fillRect(0, 18, 155, 112);
        ctx.fillStyle = colors[2];
        ctx.beginPath();
        ctx.moveTo(0, 18);
        ctx.lineTo(24, 0);
        ctx.lineTo(180, 0);
        ctx.lineTo(155, 18);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = colors[2];
        ctx.lineWidth = 2;
        ctx.strokeRect(5, 24, 145, 100);
        ctx.globalAlpha = 0.13;
        for (let i = 0; i < 27; i++) {
          ctx.strokeStyle = i % 2 ? '#ffffff' : '#000000';
          ctx.beginPath();
          ctx.moveTo(8, 29 + i * 3.4);
          ctx.lineTo(149, 28 + i * 3.4);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      });
    }
    private rebuild(s: BalanceView): void {
      this.pin = 0;
      this.dragging = null;
      this.blocks.forEach((b) => b.root.destroy());
      this.blocks = [];
      this.active = s.active;
      const scale = lock.scales[s.active],
        offset = scaleOffset(lock, s.active);
      const largest = Math.max(...[...scale.left, ...scale.right, ...scale.pieces].map(pieceMass));
      const make = (piece: BalancePiece, index: number, fixedSide?: 1 | 2) => {
        // Both face dimensions scale by sqrt(mass), so visible face area tracks mass exactly.
        const width = 132 * Math.sqrt(pieceMass(piece) / largest),
          height = (width * 130) / 180;
        const root = this.add
          .container(0, 0)
          .setSize(Math.max(width, 58), Math.max(height, 50))
          .setDepth(12);
        const shadow = this.add.ellipse(3, height / 2 + 8, width + 12, 17, 0x000000, 0.32);
        const material = lock.skin === 'brass' ? 0 : lock.skin === 'stone' ? 1 : 2;
        root.add([
          shadow,
          lock.blockAtlas
            ? this.add.image(0, 0, 'painted-blocks', material).setDisplaySize(width, height)
            : this.add.image(0, 0, 'block').setDisplaySize(width, height),
        ]);
        root.add(
          this.add
            .text(-width * 0.035, height * 0.07, formatPiece(piece), {
              fontFamily: 'Georgia',
              fontSize: `${Math.min(30, Math.max(20, width * 0.29))}px`,
              fontStyle: 'bold',
              color: '#fff5cf',
              stroke: '#352819',
              strokeThickness: 4,
            })
            .setOrigin(0.5),
        );
        if (fixedSide)
          root.add(
            this.add
              .text(0, -height / 2 - 16, 'FIXED', {
                fontFamily: 'Arial',
                fontSize: '12px',
                color: '#bde3da',
                backgroundColor: '#17343c',
                padding: { x: 7, y: 3 },
              })
              .setOrigin(0.5),
          );
        else {
          root.setData('index', index).setInteractive({ useHandCursor: true });
          this.input.setDraggable(root);
          root.on('pointerdown', () => {
            const current = snapshot();
            if (!current.paused && !current.completed && !current.sealed.includes(current.active))
              callbacks.select(index);
          });
        }
        this.blocks.push({ root, piece, index, fixedSide, width, height });
      };
      scale.left.forEach((p) => make(p, -1, 1));
      scale.right.forEach((p) => make(p, -1, 2));
      scale.pieces.forEach((p, i) => make(p, offset + i));
    }
    override update(_time: number, delta: number): void {
      if (this.failed || !this.mechanics) return;
      const s = snapshot();
      if (this.active !== s.active) this.rebuild(s);
      const dt = Math.min(delta / 1000, 0.035),
        reading = balanceReading(lock, s.active, s.placements);
      const target = reading.balanced
        ? 0
        : Phaser.Math.Clamp(
            (reading.difference / Math.max(reading.left + reading.right, 0.1)) * 0.65,
            -0.2,
            0.2,
          );
      if (!s.paused) {
        this.elapsed += dt;
        if (s.reducedMotion) {
          this.angle = target;
          this.velocity = 0;
        } else {
          this.velocity += ((target - this.angle) * 22 - this.velocity * 5) * dt;
          this.angle += this.velocity * dt;
        }
        if (
          (s.sealed.includes(s.active) || s.completed) &&
          reading.balanced &&
          Math.abs(this.angle) < 0.005
        )
          this.pin = s.reducedMotion ? 1 : Math.min(1, this.pin + dt / 0.4);
        if (s.completed && this.pin === 1)
          this.release = s.reducedMotion ? 1 : Math.min(1, this.release + dt / 1.8);
      }
      const g = this.mechanics;
      g.clear();
      this.beam.setRotation(this.angle);
      this.hub.setRotation(this.angle * 0.4);
      const leftY = 165 - Math.sin(this.angle) * 294,
        rightY = 165 + Math.sin(this.angle) * 294;
      const panY = [0, leftY + 215, rightY + 215];
      for (const side of [1, 2] as const) {
        const x = side === 1 ? 425 : 1015,
          top = side === 1 ? leftY : rightY,
          y = panY[side];
        g.fillStyle(0x071d25, 0.4).fillEllipse(x + 12, 466, 285, 30);
        // Twin suspension chains remain vertical; the pans stay horizontal.
        for (const dx of [-126, 126]) {
          g.lineStyle(5, 0x423322).lineBetween(x, top, x + dx, y);
          g.lineStyle(2, 0xd5bd7f).lineBetween(x - 1, top, x + dx - 1, y);
          for (let t = 0.08; t < 1; t += 0.065) {
            g.lineStyle(1, 0xf5dda0, 0.75);
            g.strokeEllipse(x + dx * t, top + (y - top) * t, 5, 8);
          }
        }
        const highlight =
          this.dragging && Math.abs(this.dragging.x - x) < 175 && this.dragging.y < 485;
        g.fillStyle(highlight ? 0x8ce9c7 : 0xb39458, highlight ? 0.6 : 1).fillEllipse(
          x,
          y + 8,
          305,
          43,
        );
        g.fillStyle(0x382c21).fillEllipse(x, y, 304, 33);
        g.fillStyle(0x675433).fillEllipse(x, y - 3, 282, 26);
        g.lineStyle(3, highlight ? 0xc7ffe8 : 0xf2d99e).strokeEllipse(x, y, 304, 33);
        g.lineStyle(2, 0x92723f).strokeEllipse(x, y + 9, 293, 31);
      }
      // A mechanical slider above the beam makes exact alignment visible.
      const aligned = reading.balanced && Math.abs(this.angle) < 0.005;
      g.fillStyle(0x0b2931).fillRoundedRect(635, 80, 170, 26, 8);
      g.lineStyle(2, 0xbca36d).strokeRoundedRect(635, 80, 170, 26, 8);
      g.fillStyle(0x82e6c0, 0.3).fillRect(714, 81, 12, 24);
      g.fillStyle(aligned ? 0xaffcce : 0xffd990).fillRoundedRect(
        715 + this.angle * 360,
        75,
        10,
        37,
        3,
      );
      g.lineStyle(1, 0xb1b696).lineBetween(720, 111, 720, 126);
      const sealed = (s.sealed.includes(s.active) || s.completed) && this.pin >= 0.999;
      const jitter =
        !s.reducedMotion && !s.paused && s.attempt > 0 && !reading.balanced
          ? Math.sin(this.elapsed * 30) * Math.max(0, 0.02 - Math.abs(target)) * 70
          : 0;
      g.fillStyle(0x162b2e).fillRoundedRect(662, 290, 116, 33, 5);
      g.lineStyle(2, 0xc4ae77).strokeRoundedRect(662, 290, 116, 33, 5);
      g.fillStyle(0x08181e).fillRect(742, 296, 22, 20);
      g.fillStyle(sealed ? 0xa0f5c9 : 0xbca066).fillRoundedRect(
        670 + this.pin * 42,
        299 + this.angle * 90 + jitter,
        50,
        13,
        4,
      );
      this.pinLabel
        .setText(sealed ? 'SEAL RELEASED' : aligned ? 'PIN ALIGNED' : 'PIN OFFSET')
        .setColor(sealed || aligned ? '#b4f6d7' : '#e4c996');
      this.leftLabel.setY(panY[1] + 43);
      this.rightLabel.setY(panY[2] + 43);
      const counts = [0, 0, 0];
      for (const b of this.blocks) {
        const side = b.fixedSide ?? s.placements[b.index] ?? 0,
          slot = counts[side]++;
        let x: number, y: number;
        if (side === 0) {
          const local = b.index - scaleOffset(lock, s.active),
            total = lock.scales[s.active].pieces.length;
          x = 720 + (local - (total - 1) / 2) * Math.min(164, 1080 / total);
          y = 604 - b.height / 2;
          g.fillStyle(0x0b1d23, 0.55).fillRoundedRect(x - 69, 547, 138, 78, 8);
          g.lineStyle(1, 0xbda56b, 0.5).strokeRoundedRect(x - 69, 547, 138, 78, 8);
        } else {
          const members = this.blocks.filter(
            (other) => (other.fixedSide ?? s.placements[other.index] ?? 0) === side,
          ).length;
          x = (side === 1 ? 425 : 1015) + ((slot % 3) - (Math.min(members, 3) - 1) / 2) * 83;
          y = panY[side] - 11 - b.height / 2 - Math.floor(slot / 3) * 69;
        }
        if (b.root !== this.dragging) b.root.setPosition(x, y).setDepth(12 + (side ? slot : 0));
        if (!b.fixedSide && b.root.input) b.root.input.enabled = !s.paused && !sealed;
        if (b.index === s.selected && !b.fixedSide && !sealed) {
          g.lineStyle(2, 0xa4f9dd);
          g.strokeRoundedRect(
            b.root.x - b.width / 2 - 8,
            b.root.y - b.height / 2 - 8,
            b.width + 16,
            b.height + 16,
            7,
          );
        }
      }
      // Three master bolts light independently; chains pull taut as the vault releases.
      for (let i = 0; i < lock.scales.length; i++) {
        const x = 720 + (i - (lock.scales.length - 1) / 2) * 41,
          on = s.sealed.includes(i) || s.completed;
        g.fillStyle(on ? 0x9cf7c8 : 0x223e43).fillCircle(x, 40, 12);
        g.lineStyle(2, 0xc9b376).strokeCircle(x, 40, 12);
      }
      if (this.release) {
        this.doors.forEach((door, i) =>
          door.setX((0.335 + i * 0.167 + 0.167 / 2) * 1440 + (i ? 1 : -1) * this.release * 155),
        );
        this.glow.setAlpha(this.release * 0.65).setScale(1 + this.release * 12, 1);
        for (let i = 0; i < 18; i++) {
          const a = i * 2.399,
            r = (this.release * 190 + i * 13) % 245;
          g.fillStyle(0xc9ffe4, (1 - this.release * 0.6) * 0.8).fillCircle(
            720 + Math.cos(a) * r,
            160 + Math.sin(a) * r * 0.6,
            2,
          );
        }
      }
    }
  }
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: parent.clientWidth <= 600 ? 1000 : 1440,
    height: 680,
    backgroundColor: '#0b2029',
    scene: [Chamber],
    banner: false,
    audio: { noAudio: true },
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    render: { antialias: true },
    callbacks: {
      postBoot: (g) => {
        g.canvas.setAttribute(
          'aria-label',
          'Interactive balance scale. Drag weights onto either pan, or use the block controls below.',
        );
        g.canvas.setAttribute('role', 'img');
      },
    },
  });
  const resize = new ResizeObserver(() => {
    const width = parent.clientWidth <= 600 ? 1000 : 1440;
    if (game.scale.width !== width) game.scale.setGameSize(width, 680);
    game.scale.refresh();
  });
  resize.observe(parent);
  return {
    destroy: () => {
      resize.disconnect();
      game.destroy(true);
    },
  };
}
