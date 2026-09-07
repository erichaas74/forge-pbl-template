import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { calendarMonumentConfig } from '../../projects/calendar-monument/calendar-monument.config';
import { calendarMonumentSample } from '../../projects/calendar-monument/calendar-monument.sample';
import {
  requireEngineeringConfig,
  isEngineeringSnapshot,
  type EngineeringSnapshot,
} from './domain/engineering-design.models';
import {
  ENGINEERING_CONFIG,
  ENGINEERING_PERSISTENCE,
  ENGINEERING_SESSION,
  EngineeringDesignRuntime,
  type EngineeringPersistence,
} from './runtime/engineering-design.runtime';
import {
  isBlockDesign,
  blocksOverlap,
  type DesignCapture,
  type BlockDesign,
} from '../../shared/engineering/block-design';
import { DesignSimulationRegistry } from '../../shared/engineering/design-simulation.registry';
import { BrowserEngineeringDesignAdapter } from '../../infrastructure/persistence/browser-engineering-design.adapter';
import { createLocalPreviewSession } from '../../core/context/project-session-context';
import { BlockBuilderComponent } from './ui/block-builder.component';
import { DesignOpticsBuilderComponent } from './ui/design-optics-builder.component';
@Component({ template: '' })
class ExampleSimulation {}
describe('engineering design template', () => {
  let saved: EngineeringSnapshot | undefined;
  const persistence: EngineeringPersistence = {
    location: 'Test memory',
    load: () => saved,
    save: (value) => {
      saved = structuredClone(value);
    },
  };
  beforeEach(() => {
    saved = undefined;
    TestBed.configureTestingModule({
      providers: [
        EngineeringDesignRuntime,
        {
          provide: ENGINEERING_SESSION,
          useValue: createLocalPreviewSession('calendar-monument', '1.0.0'),
        },
        { provide: ENGINEERING_CONFIG, useValue: calendarMonumentConfig },
        { provide: ENGINEERING_PERSISTENCE, useValue: persistence },
      ],
    });
  });
  it('validates curriculum, duplicate research IDs, dimensions, and template versions before launch', () => {
    expect(requireEngineeringConfig(calendarMonumentConfig, 'calendar-monument')).toBe(
      calendarMonumentConfig,
    );
    expect(() =>
      requireEngineeringConfig(
        { ...calendarMonumentConfig, template: { id: 'engineering-design', version: '2.0' } },
        'calendar-monument',
      ),
    ).toThrow('CONFIG_INVALID');
    expect(() =>
      requireEngineeringConfig(
        {
          ...calendarMonumentConfig,
          research: [calendarMonumentConfig.research[0], calendarMonumentConfig.research[0]],
        },
        'calendar-monument',
      ),
    ).toThrow('CONFIG_INVALID');
    expect(
      isBlockDesign({
        blocks: [{ ...calendarMonumentConfig.starterDesign.blocks[0], width: NaN }],
        targets: [],
      }),
    ).toBe(false);
    expect(isEngineeringSnapshot(calendarMonumentSample)).toBe(true);
  });
  it('rejects overlapping solids while permitting adjacent blocks and supported stacks', () => {
    const block = calendarMonumentConfig.starterDesign.blocks[0];
    expect(blocksOverlap(block, { ...block, id: 'duplicate' })).toBe(true);
    expect(blocksOverlap(block, { ...block, x: 0.1 })).toBe(false);
    expect(blocksOverlap(block, { ...block, y: 0.1 })).toBe(false);
    expect(blocksOverlap({ ...block, width: 0.4, rotation: 90 }, { ...block, z: 0.15 })).toBe(true);
  });
  const opticalDesign: BlockDesign = {
    blocks: [{ id: 'window', x: 0, y: .6, z: 0, width: .8, height: .8, depth: .06, rotation: 0,
      aperture: { axis: 'z', diameter: .48, insert: 'jewel', color: 'blue' } }],
    targets: [{ id: 'color-marker', label: 'Blue marker', x: 0, z: -1 }],
    displayObject: { model: 'crystal', material: 'porcelain', x: 0, y: 0, z: -.7, width: .4, height: .65, rotation: 25 },
  };
  it('validates optical dimensions, installed models, and reserved sculpture space without breaking old designs', () => {
    expect(isBlockDesign(opticalDesign)).toBe(true);
    expect(isBlockDesign(calendarMonumentConfig.starterDesign)).toBe(true);
    const b = opticalDesign.blocks[0];
    for (const aperture of [null, { ...b.aperture, diameter: .75 }, { ...b.aperture, axis: 'x' }, { ...b.aperture, color: 'unknown' }]) {
      expect(isBlockDesign({ ...opticalDesign, blocks: [{ ...b, aperture }] })).toBe(false);
    }
    expect(isBlockDesign({ ...opticalDesign, displayObject: { ...opticalDesign.displayObject, model: 'missing-model' } })).toBe(false);
    expect(isBlockDesign({ ...opticalDesign, displayObject: { ...opticalDesign.displayObject, y: .6, z: 0 } })).toBe(false);
  });
  it('persists holes, inserts, sculpture and colored expectations with immutable trial replay', () => {
    const runtime = TestBed.inject(EngineeringDesignRuntime);
    runtime.saveDesign(opticalDesign);
    runtime.saveChecks([{ scenarioId: 'march', targetId: 'color-marker', expectedValue: 'blue light' }]);
    runtime.capture({ ...calendarMonumentSample.trials[0], id: 'optics-trial', design: opticalDesign });
    runtime.saveDesign({ ...opticalDesign, displayObject: undefined });
    const loaded = TestBed.runInInjectionContext(() => new EngineeringDesignRuntime());
    expect(loaded.snapshot().trials[0].design.displayObject?.rotation).toBe(25);
    expect(loaded.snapshot().design.blocks[0].aperture?.color).toBe('blue');
    expect(loaded.snapshot().checks?.[0].expectedValue).toBe('blue light');
    expect(loaded.snapshot().design.displayObject).toBeUndefined();
  });
  it('preserves an opening while resizing or stacking a block and rejects a rim-breaking resize', () => {
    const fixture = TestBed.createComponent(BlockBuilderComponent);
    fixture.componentRef.setInput('design', opticalDesign);
    fixture.detectChanges();
    let emitted = opticalDesign;
    fixture.componentInstance.changed.subscribe(value => { emitted = value; fixture.componentRef.setInput('design', value); });
    fixture.componentInstance.select('window');
    fixture.componentInstance.width = 100;
    fixture.componentInstance.update();
    expect(emitted.blocks[0].width).toBe(1);
    expect(emitted.blocks[0].aperture?.insert).toBe('jewel');
    fixture.componentInstance.width = 10;
    fixture.componentInstance.update();
    expect(emitted.blocks[0].width).toBe(1);
    expect(fixture.componentInstance.error()).toContain('hole');
    fixture.componentInstance.stack();
    expect(emitted.blocks[1].aperture?.color).toBe('blue');
  });
  it('adds a supported window without discarding the existing design and edits its bore', () => {
    const fixture = TestBed.createComponent(DesignOpticsBuilderComponent);
    fixture.componentRef.setInput('design', calendarMonumentConfig.starterDesign);
    fixture.detectChanges();
    let emitted: BlockDesign = calendarMonumentConfig.starterDesign;
    fixture.componentInstance.changed.subscribe(value => { emitted = value; fixture.componentRef.setInput('design', value); });
    fixture.componentInstance.selected.subscribe(id => fixture.componentRef.setInput('selectedId', id));
    fixture.componentInstance.addWindow();
    fixture.detectChanges();
    expect(emitted.blocks).toHaveLength(13);
    expect(isBlockDesign(emitted)).toBe(true);
    expect(fixture.componentInstance.axis).toBe('z');
    fixture.componentInstance.color = 'green';
    fixture.componentInstance.saveHole();
    expect(emitted.blocks[12].aperture?.color).toBe('green');
    fixture.componentInstance.saveObject();
    expect(isBlockDesign(emitted)).toBe(true);
    expect(emitted.displayObject?.model).toBe('crystal');
  });
  it('keeps prior trial designs and predictions immutable, deduplicates retry receipts, and reloads saved work', () => {
    const runtime = TestBed.inject(EngineeringDesignRuntime);
    runtime.saveText('prediction', 'A lower Sun makes a longer shadow.');
    const capture: DesignCapture = structuredClone(calendarMonumentSample.trials[0]);
    runtime.capture(capture);
    runtime.capture(capture);
    runtime.saveDesign({ blocks: [], targets: [] });
    runtime.saveText('prediction', 'My next idea');
    expect(runtime.snapshot().trials).toHaveLength(1);
    expect(runtime.snapshot().trials[0].design.blocks).toHaveLength(10);
    expect(runtime.snapshot().trials[0].prediction).toBe('A lower Sun makes a longer shadow.');
    expect(runtime.snapshot().events.map((event) => event.eventType)).toContain(
      'activity.completed',
    );
    const loaded = TestBed.runInInjectionContext(() => new EngineeringDesignRuntime());
    expect(loaded.snapshot()).toEqual(runtime.snapshot());
    expect(calendarMonumentConfig.starterDesign.blocks).toHaveLength(10);
  });
  it('rejects invalid or mismatched simulation results instead of reporting completion', () => {
    const runtime = TestBed.inject(EngineeringDesignRuntime);
    expect(() =>
      runtime.capture({ ...calendarMonumentSample.trials[0], pluginId: 'uninstalled' }),
    ).toThrow('STATE_INVALID');
    expect(runtime.snapshot().trials).toHaveLength(0);
  });
  it('reports failed saves while retaining the in-session work', () => {
    TestBed.overrideProvider(ENGINEERING_PERSISTENCE, {
      useValue: {
        ...persistence,
        save: () => {
          throw new Error('quota');
        },
      },
    });
    const runtime = TestBed.inject(EngineeringDesignRuntime);
    runtime.saveResearch('moon', 'The Moon reflects sunlight.');
    expect(runtime.snapshot().research['moon']).toContain('reflects sunlight');
    expect(runtime.saveStatus()).toContain('Save failed');
  });
  it('saves learner expectations and records a whole comparison once without changing older designs', () => {
    const runtime = TestBed.inject(EngineeringDesignRuntime);
    const checks = [{ scenarioId: 'march', targetId: 'marker', expectedValue: 'shadow' }];
    runtime.saveChecks(checks);
    checks[0].expectedValue = 'sunlight';
    expect(runtime.snapshot().checks?.[0].expectedValue).toBe('shadow');
    const captures = structuredClone(calendarMonumentSample.trials);
    runtime.captureBatch(captures);
    runtime.captureBatch(captures);
    expect(runtime.snapshot().trials).toHaveLength(4);
    runtime.saveDesign({ blocks: [], targets: [] });
    expect(runtime.snapshot().trials[0].design.blocks).toHaveLength(10);
    const loaded = TestBed.runInInjectionContext(() => new EngineeringDesignRuntime());
    expect(loaded.snapshot().checks).toEqual(runtime.snapshot().checks);
    expect(() =>
      runtime.saveChecks([
        { scenarioId: 'x', targetId: 'a', expectedValue: 'shadow' },
        { scenarioId: 'x', targetId: 'b', expectedValue: 'sunlight' },
      ]),
    ).toThrow('STATE_INVALID');
  });
  it('rejects an invalid or over-capacity comparison atomically', () => {
    const runtime = TestBed.inject(EngineeringDesignRuntime);
    const captures = structuredClone(calendarMonumentSample.trials);
    expect(() =>
      runtime.captureBatch([...captures, { ...captures[0], id: 'invalid', pluginId: 'other' }]),
    ).toThrow('STATE_INVALID');
    expect(runtime.snapshot().trials).toHaveLength(0);
    for (let i = 0; i < 39; i++) runtime.capture({ ...captures[0], id: 'previous-' + i });
    expect(() => runtime.captureBatch(captures)).toThrow('TRIAL_LIMIT');
    expect(runtime.snapshot().trials).toHaveLength(39);
  });
  it('keeps learner, project version and attempt drafts separate', () => {
    const session = createLocalPreviewSession('calendar-monument', '1.0.0');
    const adapter = new BrowserEngineeringDesignAdapter(session, localStorage);
    adapter.save(calendarMonumentSample);
    expect(adapter.load()?.design.blocks).toHaveLength(10);
    expect(
      new BrowserEngineeringDesignAdapter({ ...session, actorId: 'other' }, localStorage).load(),
    ).toBeUndefined();
    expect(
      new BrowserEngineeringDesignAdapter(
        { ...session, projectVersion: '1.1.0' },
        localStorage,
      ).load(),
    ).toBeUndefined();
    expect(
      new BrowserEngineeringDesignAdapter({ ...session, attemptId: 'other' }, localStorage).load(),
    ).toBeUndefined();
  });
  it('resolves installed simulators and fails closed for missing or duplicate IDs', () => {
    const registry = new DesignSimulationRegistry();
    registry.register('test', ExampleSimulation);
    expect(registry.require('test')).toBe(ExampleSimulation);
    expect(() => registry.register('test', ExampleSimulation)).toThrow('DUPLICATE_REGISTRATION');
    expect(() => registry.require('unknown')).toThrow('CAPABILITY_NOT_INSTALLED');
  });
  it('provides keyboard-operable block stacking with measured dimensions and undo', async () => {
    const fixture = TestBed.createComponent(BlockBuilderComponent);
    fixture.componentRef.setInput('design', calendarMonumentConfig.starterDesign);
    fixture.detectChanges();
    let emitted = calendarMonumentConfig.starterDesign;
    fixture.componentInstance.changed.subscribe((value) => {
      emitted = value;
      fixture.componentRef.setInput('design', value);
    });
    fixture.componentInstance.select('starter-10');
    fixture.componentInstance.stack();
    expect(emitted.blocks).toHaveLength(11);
    expect(emitted.blocks[10].y).toBe(1);
    fixture.componentInstance.undo();
    expect(emitted.blocks).toHaveLength(10);
    expect(fixture.nativeElement.querySelectorAll('button').length).toBeGreaterThan(4);
  });
});
