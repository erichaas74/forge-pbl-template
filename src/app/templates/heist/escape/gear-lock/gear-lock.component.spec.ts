import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
vi.mock('phaser', () => ({}));
import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { GEAR_SCENE_LOADER, GearLockComponent } from './gear-lock.component';
import type { GearLockDefinition } from './gear-lock.domain';
import type { GearSceneCallbacks, MountGearScene } from './gear-lock.scene';

describe('Independent gear workshop', () => {
  let callbacks: GearSceneCallbacks;
  const destroy = vi.fn();
  const mount: MountGearScene = (_h, _d, _s, cb) => {
    callbacks = cb;
    cb.ready();
    return { destroy };
  };
  async function create() {
    TestBed.configureTestingModule({
      imports: [GearLockComponent],
      providers: [
        { provide: GEAR_SCENE_LOADER, useValue: async () => ({ mountGearScene: mount }) },
      ],
    });
    const f = TestBed.createComponent(GearLockComponent);
    f.componentRef.setInput('definition', data.steps[3].puzzle.lock as GearLockDefinition);
    f.componentInstance.changed.subscribe((a) => f.componentRef.setInput('answer', a));
    f.detectChanges();
    await f.whenStable();
    f.detectChanges();
    return f;
  }
  it('routes drag and non-drag controls through the same inventory commands', async () => {
    const f = await create(),
      c = f.componentInstance;
    callbacks.place(2, 0);
    c.select(1);
    c.placeSelected(1);
    c.crank(2);
    f.detectChanges();
    expect(c.positions()).toEqual([2, 1, 3]);
    c.controls.set(true);
    f.detectChanges();
    expect(f.nativeElement.textContent).toContain('Place on A');
    c.select(2);
    c.placeSelected(-1);
    f.detectChanges();
    expect(c.positions()).toEqual([-1, 1, 3]);
    c.reset();
    f.detectChanges();
    expect(c.positions()).toEqual([-1, -1, 1]);
    f.destroy();
    expect(destroy).toHaveBeenCalled();
  });
  it('finishes the release before awarding, freezes while paused, and replays without duplicate awards', async () => {
    const f = await create(),
      c = f.componentInstance,
      solved = vi.fn();
    c.solved.subscribe(solved);
    c.test();
    expect(c.running()).toBe(false);
    callbacks.place(2, 0);
    callbacks.place(1, 1);
    c.test();
    callbacks.finished();
    expect(solved).not.toHaveBeenCalled();
    expect(c.notice()).toContain('stops short');
    c.crank(2);
    c.test();
    expect(c.running()).toBe(true);
    expect(solved).not.toHaveBeenCalled();
    c.place(3, 0);
    expect(c.positions()[0]).toBe(2);
    f.componentRef.setInput('paused', true);
    f.detectChanges();
    callbacks.finished();
    expect(c.running()).toBe(true);
    f.componentRef.setInput('paused', false);
    f.detectChanges();
    callbacks.finished();
    expect(solved).toHaveBeenCalledOnce();
    f.componentRef.setInput('completed', true);
    f.detectChanges();
    c.replay();
    callbacks.finished();
    expect(solved).toHaveBeenCalledOnce();
  });
  it('keeps the mathematical controls usable when rendering fails', async () => {
    const f = await create(),
      c = f.componentInstance,
      solved = vi.fn();
    c.solved.subscribe(solved);
    callbacks.failed();
    callbacks.place(2, 0);
    callbacks.place(1, 1);
    c.crank(2);
    c.test();
    f.detectChanges();
    expect(c.error()).toBe(true);
    expect(c.controls()).toBe(true);
    expect(solved).toHaveBeenCalledOnce();
  });
  it('routes the diorama crank through one preview trial and replays without a trial or rescue award', async () => {
    const f = await create(), c = f.componentInstance, tested = vi.fn(), solved = vi.fn(), pause = vi.fn();
    f.componentRef.setInput('authoringPreview', true);
    c.tested.subscribe(tested); c.solved.subscribe(solved); c.pauseRequested.subscribe(pause);
    callbacks.place(2,0); callbacks.place(1,1); callbacks.crank?.(2); callbacks.test?.();
    expect(c.running()).toBe(true); expect(tested).toHaveBeenCalledOnce();
    callbacks.finished(); callbacks.replay?.(); callbacks.finished();
    expect(tested).toHaveBeenCalledOnce(); expect(solved).not.toHaveBeenCalled();
    callbacks.pause?.(); expect(pause).toHaveBeenCalledOnce();
    callbacks.reset?.(); expect(c.positions()).toEqual([-1,-1,1]);
  });
});
