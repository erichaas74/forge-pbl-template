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
  it('automatically releases only when all three scales balance simultaneously', async () => {
    const f = await create(),
      c = f.componentInstance,
      solved = vi.fn();
    c.solved.subscribe(solved);
    for (const [scale, indices] of [
      [0, [0, 1]],
      [1, [5, 6, 7]],
      [2, [10, 11]],
    ] as const) {
      c.changeScale(scale);
      indices.forEach((index) => c.place(index, 2));
      f.detectChanges();
      expect(c.sealed()).toHaveLength(scale + 1);
      expect(solved).toHaveBeenCalledTimes(scale === 2 ? 1 : 0);
    }
    expect(c.released()).toBe(true);
    f.detectChanges();
    c.engage();
    expect(solved).toHaveBeenCalledOnce();
    expect(f.nativeElement.textContent).not.toContain('Engage release pin');
  });
  it('releases and relocks the preview without awarding completion, and preserves other scales', async () => {
    const f = await create(),
      c = f.componentInstance,
      solved = vi.fn(),
      tested = vi.fn();
    f.componentRef.setInput('authoringPreview', true);
    c.solved.subscribe(solved);
    c.tested.subscribe(tested);
    for (const [scale, indices] of [
      [0, [0, 1]],
      [1, [5, 6, 7]],
      [2, [10, 11]],
    ] as const) {
      c.changeScale(scale);
      indices.forEach((index) => c.place(index, 2));
      f.detectChanges();
    }
    expect(c.released()).toBe(true);
    expect(tested.mock.calls).toEqual([[0], [1], [2]]);
    expect(c.locked()).toBe(false);
    c.changeScale(0);
    c.place(0, 0);
    f.detectChanges();
    expect(c.released()).toBe(false);
    expect(c.sealed()).toEqual([1, 2]);
    c.place(0, 2);
    f.detectChanges();
    expect(c.released()).toBe(true);
    c.retrySave();
    expect(solved).not.toHaveBeenCalled();
  });
  it('defers automatic release while paused and does not create trials from restored work', async () => {
    const f = await create(),
      c = f.componentInstance,
      tested = vi.fn();
    f.componentRef.setInput('authoringPreview', true);
    f.componentRef.setInput('paused', true);
    c.tested.subscribe(tested);
    const answer = emptyBalance(lock);
    [0, 1, 5, 6, 7, 10, 11].forEach((i) => (answer[i] = 2));
    f.componentRef.setInput('placements', answer);
    f.detectChanges();
    expect(c.released()).toBe(false);
    f.componentRef.setInput('paused', false);
    f.detectChanges();
    expect(c.released()).toBe(true);
    expect(tested).not.toHaveBeenCalled();
  });
  it('opens an expanded workshop and restores the control focus on Escape without changing weights', async () => {
    const fixture = await create(),
      component = fixture.componentInstance;
    component.place(0, 2);
    component.toggleExpanded();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[role="dialog"][aria-modal="true"]'),
    ).not.toBeNull();
    const event = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
    component.workshopKey(event);
    fixture.detectChanges();
    expect(component.expanded()).toBe(false);
    expect(event.defaultPrevented).toBe(true);
    expect(component.positions()[0]).toBe(2);
    expect(fixture.nativeElement.querySelector('[aria-modal="true"]')).toBeNull();
  });
});
