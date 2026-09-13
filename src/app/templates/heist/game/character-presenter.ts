import * as Phaser from 'phaser';
import type { Mission } from '../domain/heist.models';
import { location } from '../domain/heist.timeline';
import { patrolPosition } from '../domain/heist.patrol';
import { spriteFrame, teamPresentation, type MapSnapshot } from './presentation-state';

export class CharacterPresenter {
  readonly root: Phaser.GameObjects.Container;
  private readonly body?: Phaser.GameObjects.Image;
  private readonly companion?: Phaser.GameObjects.Image;
  private readonly cart?: Phaser.GameObjects.Image;
  private readonly crate?: Phaser.GameObjects.Image;
  private readonly target?: Phaser.GameObjects.Image;
  private readonly guards: Phaser.GameObjects.Container[];
  private readonly caption: Phaser.GameObjects.Text;
  constructor(private readonly scene: Phaser.Scene, private readonly mission: Mission, art: boolean) {
    this.root = scene.add.container(0, 0);
    this.root.add(scene.add.ellipse(0, 2, 28, 12, 0x101d20, 0.4));
    if (art) {
      this.cart = scene.add.image(-27, -4, 'props', 0).setDisplaySize(43, 43);
      this.companion = scene.add.image(-21, 0, 'characters', 0).setDisplaySize(41, 41).setOrigin(0.5, 0.92);
      this.body = scene.add.image(0, 0, 'characters', 0).setDisplaySize(43, 43).setOrigin(0.5, 0.92);
      this.crate = scene.add.image(-10, -12, 'props', 3).setDisplaySize(23, 23);
      this.root.add([this.cart, this.companion, this.body, this.crate]);
      const target = location(mission, mission.target.location);
      this.target = scene.add.image(target.x + 22, target.y - 5, 'props', 3).setDisplaySize(32, 32).setDepth(target.y);
    } else this.root.add(scene.add.circle(0, -7, 11, 0xf3d285).setStrokeStyle(3, 0x25382f));
    this.caption = scene.add.text(0, 13, '', { fontFamily: 'Arial', fontSize: '10px', color: '#fff1ca', backgroundColor: '#172e2de6', padding: { x: 5, y: 3 } }).setOrigin(0.5, 0);
    this.root.add(this.caption);
    this.guards = mission.guards.map(() => {
      const root = scene.add.container(0, 0);
      root.add(scene.add.ellipse(0, 2, 22, 9, 0x101d20, 0.3));
      root.add(art ? scene.add.image(0, 0, 'characters', 8).setDisplaySize(39, 39).setOrigin(0.5, 0.92) : scene.add.circle(0, -7, 8, 0xe09d86));
      return root;
    });
  }
  update(s: MapSnapshot): void {
    const team = teamPresentation(this.mission, s);
    this.root.setPosition(team.point.x, team.point.y).setDepth(team.point.y + 1);
    const walking = team.moving && !s.reducedMotion;
    this.body?.setFrame(spriteFrame(team.facing, walking, s.time));
    this.companion?.setFrame(spriteFrame(team.facing, walking, s.time + 0.2)).setVisible(team.pose === 'carry');
    this.crate?.setVisible(team.pose === 'carry');
    this.cart?.setVisible(team.pose !== 'carry' && team.pose !== 'extracted')
      .setFrame(team.pose === 'empty' || team.pose === 'pickup' ? 0 : team.pose === 'broken' || team.pose === 'repair' ? 2 : 1)
      .setFlipX(Math.cos(team.facing) < 0).setPosition(Math.cos(team.facing) < 0 ? 28 : -28, -3);
    this.target?.setVisible(team.pose === 'empty' || team.pose === 'pickup');
    const poseLabels = this.mission.guidance
      ? { empty: 'YOUR TEAM', pickup: 'PICKING UP BOOKS', loaded: 'BOOKS ON BOARD', broken: 'WHEEL BROKEN', carry: 'CARRYING TOGETHER', repair: 'FIXING THE WHEEL', extracted: 'BOOKS SAFE' }
      : { empty: 'RECOVERY TEAM', pickup: 'SECURING ARCHIVE', loaded: `${this.mission.target.mass} kg · LOADED`, broken: 'AXLE DAMAGED', carry: 'TEAM CARRY', repair: 'REPAIRING CART', extracted: 'ARCHIVE SAFE' };
    this.caption.setText(poseLabels[team.pose]);
    this.mission.guards.forEach((guard, i) => {
      const p = patrolPosition(guard, s.time), root = this.guards[i];
      root.setPosition(p.x, p.y).setDepth(p.y);
      const body = root.list[1];
      if (body instanceof Phaser.GameObjects.Image) body.setFrame(spriteFrame(p.facing, !p.waiting && !s.reducedMotion, s.time, true));
    });
  }
}
