import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { robotDeliveryConfig as config } from '../../../projects/robot-delivery/robot-delivery.config';
import { createRobotSampleState } from '../../../projects/robot-delivery/robot-delivery.sample';
import { RobotCourseComponent } from './robot-course.component';
import { PhaserRobotCourseComponent, ROBOT_COURSE_RENDERER } from './robot-course-engine/phaser-robot-course.component';

// jsdom has no real canvas; a stubbed adapter reports failure through the real output binding.
vi.mock('phaser', () => ({}));

describe('course graphics fallback', () => {
  afterEach(() => TestBed.resetTestingModule());
  it('shows every moving hazard and its recorded position if Phaser cannot render', async () => {
    await TestBed.configureTestingModule({
      imports: [RobotCourseComponent],
      providers: [
        {
          provide: ROBOT_COURSE_RENDERER,
          useValue: async () => ({ update: () => {}, destroy: () => {} }),
        },
      ],
    }).compileComponents();
    const trial = createRobotSampleState().trials.find((t) => t.challengeId === 'moving-gates')!;
    const fixture = TestBed.createComponent(RobotCourseComponent);
    fixture.componentRef.setInput(
      'course',
      config.courses.find((c) => c.id === 'gates')!,
    );
    fixture.componentRef.setInput('sample', trial.pathSamples.at(-1));
    fixture.detectChanges();
    // Simulate the adapter reporting canvas/context loss; verify the real parent output wiring.
    fixture.debugElement.query(By.directive(PhaserRobotCourseComponent)).componentInstance.status.emit('failed');
    await fixture.whenStable();
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(fixture.componentInstance.renderer()).toBe('map');
    expect(root.textContent).toContain('Game graphics are unavailable');
    expect(root.querySelector('svg')?.textContent).toContain('Scout patrol');
    expect(root.querySelector('svg')?.textContent).toContain('Sliding gate');
    expect(root.querySelectorAll('polyline[stroke-dasharray]')).toHaveLength(2);
    const first = fixture.componentInstance.actorStates()[0].pose;
    fixture.componentRef.setInput('sample', trial.pathSamples[0]);
    fixture.detectChanges();
    expect(fixture.componentInstance.actorStates()[0].pose).not.toEqual(first);
    expect(fixture.componentInstance.description()).toContain('Scout patrol at (100.0, 180.0)');
  });
});
