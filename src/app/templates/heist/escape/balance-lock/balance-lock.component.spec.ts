import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
vi.mock('phaser', () => ({}));
import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { BALANCE_SCENE_LOADER, BalanceLockComponent } from './balance-lock.component';
import { emptyBalance, type BalanceLockDefinition } from './balance-lock.domain';
import type { BalanceSceneCallbacks, MountBalanceScene } from './balance-lock.scene';

describe('Balance lock workshop controls', () => {
  const lock = data.steps[0].puzzle.lock as BalanceLockDefinition;
  let callbacks: BalanceSceneCallbacks;
  const destroy = vi.fn();
  const mount: MountBalanceScene = (_host, _lock, _state, cb) => {
    callbacks = cb;
    cb.ready();
    return { destroy };
  };
  async function create() {
    TestBed.configureTestingModule({
      imports: [BalanceLockComponent],
      providers: [
        { provide: BALANCE_SCENE_LOADER, useValue: async () => ({ mountBalanceScene: mount }) },
      ],
    });
    const fixture = TestBed.createComponent(BalanceLockComponent);
    fixture.componentRef.setInput('definition', lock);
    fixture.componentRef.setInput('placements', emptyBalance(lock));
    fixture.componentInstance.moved.subscribe(({ index, side }) => {
      fixture.componentRef.setInput(
        'placements',
        fixture.componentInstance.positions().map((p, i) => (i === index ? side : p)),
      );
    });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }
  it('uses identical placement commands for dragging and keyboard/tap selection', async () => {
    const f = await create(),
      c = f.componentInstance;
    callbacks.place(0, 2);
    c.select(1);
    c.placeSelected(2);
    f.detectChanges();
    expect(c.reading().balanced).toBe(true);
    expect(c.positions().slice(0, 2)).toEqual([2, 2]);
    c.controls.set(true);
    f.detectChanges();
    expect(f.nativeElement.textContent).toContain('Place on right pan');
    expect(f.nativeElement.textContent).toContain('3/4 = 1/2 + 1/4');
    c.select(0);
    c.placeSelected(0);
    f.detectChanges();
    expect(c.reading().balanced).toBe(false);
    c.resetScale();
    f.detectChanges();
    expect(c.positions()).toEqual(emptyBalance(lock));
    f.destroy();
    expect(destroy).toHaveBeenCalled();
  });
  it('releases all seals before completing, preserves other scales, and respects pause', async () => {
    const f = await create(),
      c = f.componentInstance,
      solved = vi.fn();
    c.solved.subscribe(solved);
    c.engage();
    expect(c.sealed()).toHaveLength(0);
    expect(c.notice()).toContain('heavier');
    for (const [scale, indices] of [
      [0, [0, 1]],
      [1, [5, 6, 7]],
      [2, [10, 11]],
    ] as const) {
      c.changeScale(scale);
      for (const index of indices) c.place(index, 2);
      f.detectChanges();
      c.engage();
      expect(c.sealed()).toContain(scale);
      if (scale < 2) expect(solved).not.toHaveBeenCalled();
    }
    expect(solved).toHaveBeenCalledOnce();
    c.resetScale();
    f.detectChanges();
    expect(c.sealed()).toEqual([0, 1]);
    expect(c.positions()[0]).toBe(2);
    f.componentRef.setInput('paused', true);
    f.detectChanges();
    c.select(10);
    c.place(10, 2);
    c.changeScale(0);
    expect(c.positions()[10]).toBe(0);
    expect(c.active()).toBe(2);
  });
});
