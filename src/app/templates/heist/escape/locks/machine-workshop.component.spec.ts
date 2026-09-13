import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
vi.mock('phaser', () => ({}));
import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { requireEscapeMission } from '../domain/escape.validation';
import { MACHINE_SCENE_LOADER, MachineWorkshopComponent } from './machine-workshop.component';
import type { MachineCallbacks } from './machine-surface';
import type { MachineDefinition } from './machine.models';
import { initialMachine } from './machine.rules';
import { machineWitness } from './machine.validation';

const mission = requireEscapeMission(data);
describe('Independent machine workshop controls', () => {
  let callbacks: MachineCallbacks;
  const destroy = vi.fn();
  async function create(index: number, failure = false) {
    TestBed.configureTestingModule({
      imports: [MachineWorkshopComponent],
      providers: [
        {
          provide: MACHINE_SCENE_LOADER,
          useValue: async () => ({
            mountMachineScene: (
              _h: HTMLElement,
              _d: MachineDefinition,
              _s: unknown,
              cb: MachineCallbacks,
            ) => {
              callbacks = cb;
              failure ? cb.failed() : cb.ready();
              return { destroy };
            },
          }),
        },
      ],
    });
    const f = TestBed.createComponent(MachineWorkshopComponent),
      p = mission.steps[index].puzzle;
    if (p.type !== 'machine-lock') throw new Error('Workshop required');
    f.componentRef.setInput('definition', p.lock);
    f.componentInstance.changed.subscribe((a) => f.componentRef.setInput('answer', a));
    f.detectChanges();
    await f.whenStable();
    f.detectChanges();
    return f;
  }
  for (const [index, text] of [
    [1, 'Crank run'],
    [2, 'Seat selected sector'],
    [4, 'Mirror 1'],
    [5, 'X left'],
    [6, 'Pour 1 L'],
    [7, 'Pump Blue'],
  ] as const) {
    it(`renders operational keyboard controls at rescue location ${index + 1}`, async () => {
      const f = await create(index);
      f.componentInstance.controls.set(true);
      f.detectChanges();
      expect(f.nativeElement.textContent).toContain(text);
      f.destroy();
      expect(destroy).toHaveBeenCalled();
    });
  }
  it('runs both bridge stages, persists each seal, and replays without awarding twice', async () => {
    const f = await create(5),
      c = f.componentInstance,
      award = vi.fn();
    c.solved.subscribe(award);
    const d = c.definition(),
      base = initialMachine(d);
    f.componentRef.setInput('answer', {
      ...base,
      stages: [machineWitness(d.stages[0]), base.stages[1]],
    });
    f.detectChanges();
    c.test();
    expect(award).not.toHaveBeenCalled();
    expect(c.state().seals).toEqual(['coordinate']);
    c.nextStage();
    expect(c.active()).toBe(0);
    f.componentRef.setInput('paused', true);
    f.detectChanges();
    callbacks.finished();
    expect(c.testing()).toBe(true);
    f.componentRef.setInput('paused', false);
    f.detectChanges();
    callbacks.finished();
    c.nextStage();
    f.detectChanges();
    expect(c.active()).toBe(1);
    c.controls.set(true);
    f.detectChanges();
    expect(f.nativeElement.textContent).toContain('Attach 6 m cable');
    callbacks.input({ type: 'cable', index: 2 });
    f.detectChanges();
    c.test();
    expect(award).toHaveBeenCalledOnce();
    callbacks.finished();
    f.componentRef.setInput('completed', true);
    f.detectChanges();
    c.replay();
    callbacks.finished();
    expect(award).toHaveBeenCalledOnce();
  });
  it('keeps drag inputs and keyboard operations equivalent and blocks changes during a test', async () => {
    const f = await create(2),
      c = f.componentInstance;
    callbacks.input({ type: 'piece', index: 0, offset: 0 });
    callbacks.select(2);
    c.seatPiece();
    f.detectChanges();
    expect(c.stageAnswer()).toEqual({ kind: 'fraction-gear', offsets: [0, -1, 12, -1, -1, -1] });
    c.test();
    const before = c.state();
    callbacks.input({ type: 'piece', index: 3, offset: 18 });
    expect(c.state()).toBe(before);
    callbacks.finished();
    c.select(3);
    c.seatPiece();
    f.detectChanges();
    expect(c.reading().solved).toBe(true);
  });
  it('waits for the float to settle and retains a usable equivalent fallback', async () => {
    const f = await create(6),
      c = f.componentInstance;
    callbacks.settled(false);
    c.test();
    expect(c.testing()).toBe(false);
    callbacks.failed();
    expect(c.controls()).toBe(true);
    [0, 1, 2, 3].forEach((index) => c.operate({ type: 'pour', index, delta: 1 }));
    f.detectChanges();
    const solved = vi.fn();
    c.solved.subscribe(solved);
    c.test();
    expect(solved).toHaveBeenCalledOnce();
    expect(c.testing()).toBe(false);
  });
});
