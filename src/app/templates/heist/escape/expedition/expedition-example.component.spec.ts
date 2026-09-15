import { TestBed } from '@angular/core/testing';
import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { requireEscapeMission } from '../domain/escape.validation';
import { ESCAPE_MISSION, EscapeRuntime } from '../runtime/escape-runtime';
import { expeditionTour, traceTourLeg } from '../domain/expedition-tour';
import { ExpeditionNavigation, worldDistance } from '../domain/expedition.navigation';
import { ExpeditionExampleComponent } from './expedition-example.component';

const mission = requireEscapeMission(data);
describe('Expedition route example', () => {
  it('uses walkable paths from the spawn to all eight authored lock locations', () => {
    const legs = expeditionTour(mission),
      world = mission.world!;
    const navigation = new ExpeditionNavigation(world, world.spawn, true);
    expect(legs).toHaveLength(8);
    expect(legs[0].points[0]).toEqual(world.spawn);
    legs.forEach((leg, i) => {
      const step = mission.steps[i];
      expect(leg.points.at(-1)).toMatchObject({
        x: (step.x * world.width) / 100,
        y: (step.y * world.height) / 100,
      });
      if (i) expect(leg.points[0]).toEqual(legs[i - 1].points.at(-1));
      for (let n = 0; n <= 100; n++)
        expect(navigation.walkable(traceTourLeg(leg, n / 100).at(-1)!)).toBe(true);
      expect(worldDistance(traceTourLeg(leg, 0).at(-1)!, leg.points[0])).toBe(0);
      expect(traceTourLeg(leg, 1).at(-1)).toEqual(leg.points.at(-1));
    });
  });
  it('animates each stop, supports pause/replay and reduced motion, and has no practice runtime', () => {
    TestBed.configureTestingModule({ providers: [{ provide: ESCAPE_MISSION, useValue: mission }] });
    const fixture = TestBed.createComponent(ExpeditionExampleComponent),
      c = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.debugElement.injector.get(EscapeRuntime, null)).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.stops button')).toHaveLength(8);
    c.playing.set(true);
    c.advance(1.5);
    expect(c.arrived()).toBe(false);
    expect(c.position()).not.toEqual(c.legs[0].points[0]);
    c.playing.set(false);
    c.advance(1);
    expect(c.elapsed()).toBe(1.5);
    c.playing.set(true);
    c.advance(1.5);
    expect(c.arrived()).toBe(true);
    c.advance(1.5);
    expect(c.index()).toBe(1);
    for (let i = 1; i < 8; i++) c.advance(4.5);
    expect(c.finished()).toBe(true);
    expect(c.index()).toBe(7);
    expect(c.playing()).toBe(false);
    c.reducedMotion.set(true);
    c.replay();
    expect(c.playing()).toBe(false);
    expect(c.arrived()).toBe(true);
    c.select(5);
    expect(c.position()).toEqual(c.legs[5].points.at(-1));
    fixture.destroy();
  });
});
