import type * as Phaser from 'phaser';
import { workshopStatus } from './workshop-presentation';
import type { RobotCourseView } from './robot-course-view';
import { SCENE_DEPTH } from './scene-assets';

/** A second camera keeps the compact HUD stable while the world camera frames events. */
export class GameHUD {
  readonly layer: Phaser.GameObjects.Container;
  private readonly bar: Phaser.GameObjects.Graphics;
  private readonly title: Phaser.GameObjects.Text;
  private readonly objective: Phaser.GameObjects.Text;
  private readonly status: Phaser.GameObjects.Text;
  private readonly telemetry: Phaser.GameObjects.Text;
  private readonly result: Phaser.GameObjects.Text;
  constructor(scene: Phaser.Scene) {
    const text = (size: number, color: string) => scene.add.text(0, 0, '', {
      fontFamily: 'monospace', fontSize: `${size}px`, color,
    });
    this.bar = scene.add.graphics();
    this.title = text(14, '#fff0cc');
    this.objective = text(11, '#bed3cb');
    this.status = text(10, '#b8ead0').setOrigin(1, 0);
    this.telemetry = text(11, '#e3e9d9');
    this.result = text(11, '#ffe0a4').setOrigin(1, 0);
    this.layer = scene.add.container(0, 0, [this.bar, this.title, this.objective, this.status, this.telemetry, this.result]).setDepth(SCENE_DEPTH.hud);
  }
  update(view: RobotCourseView, width: number, height: number): void {
    const status = workshopStatus(view), pose = view.sample ?? view.course.startPose;
    const compact = width < 580;
    this.bar.clear().fillStyle(0x152b2b).fillRect(0, 0, width, 64).fillRect(0, height - 44, width, 44);
    this.bar.lineStyle(1, 0x728578, 0.5).lineBetween(0, 63, width, 63).lineBetween(0, height - 44, width, height - 44);
    this.title.setText('PRECISION / TEST BAY').setPosition(16, 12);
    this.objective.setText(`Park the robot center on the amber crosshair.`).setPosition(16, 36).setFontSize(compact ? 10 : 11);
    this.status.setText(status.label).setPosition(width - 16, 14).setVisible(!compact);
    this.telemetry.setText(compact
      ? `${(view.sample?.timeMs ?? 0) / 1000}s   TO TARGET ${status.distance.toFixed(1)} cm`
      : `X ${pose.xCm.toFixed(1)}  Y ${pose.yCm.toFixed(1)} cm   /   ${pose.headingDeg.toFixed(0)}°   /   ${((view.sample?.timeMs ?? 0) / 1000).toFixed(1)}s`)
      .setPosition(16, height - 28);
    this.result.setText(status.finished
      ? `${status.success ? '✓ PARKED' : 'REVISE'}  /  ${status.score ?? 0} PTS`
      : `TO TARGET  ${status.distance.toFixed(1)} cm`).setPosition(width - 16, height - 28).setVisible(!compact);
    if (compact && status.finished) this.objective.setText(`${status.label} / ${status.score ?? 0} PTS`);
  }
}
