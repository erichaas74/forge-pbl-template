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
import {
  DESIGN_SIMULATIONS,
  DesignSimulationRegistry,
  DESIGN_CHANGE,
  DESIGN_CAPTURE,
} from '../../shared/engineering/design-simulation.registry';
import { BrowserEngineeringDesignAdapter } from '../../infrastructure/persistence/browser-engineering-design.adapter';
import { createLocalPreviewSession } from '../../core/context/project-session-context';
import { BlockBuilderComponent } from './ui/block-builder.component';
import { DesignOpticsBuilderComponent } from './ui/design-optics-builder.component';
import { EngineeringDesignPageComponent } from './ui/engineering-design-page.component';
@Component({ template: '' })
class ExampleSimulation {}

// A fixed legacy tower keeps generic stacking/collision tests independent of curriculum defaults.
const towerFixture: BlockDesign = {
  blocks: Array.from({ length: 10 }, (_, i) => ({
    id: `starter-${i + 1}`,
    width: 0.1,
    height: 0.1,
    depth: 0.1,
    x: 0,
    y: i / 10,
    z: 0,
    rotation: 0,
  })),
  targets: [],
};
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
    const block = towerFixture.blocks[0];
    expect(blocksOverlap(block, { ...block, id: 'duplicate' })).toBe(true);
    expect(blocksOverlap(block, { ...block, x: 0.1 })).toBe(false);
    expect(blocksOverlap(block, { ...block, y: 0.1 })).toBe(false);
    expect(blocksOverlap({ ...block, width: 0.4, rotation: 90 }, { ...block, z: 0.15 })).toBe(true);
  });
  it('validates every gallery model and rejects duplicate or malformed sample definitions', () => {
    expect(calendarMonumentConfig.designSamples).toHaveLength(7);
    for (const sample of calendarMonumentConfig.designSamples ?? [])
      expect(isBlockDesign(sample.design)).toBe(true);
    const sample = calendarMonumentConfig.designSamples![0];
    for (const designSamples of [
      [sample, sample],
      [{ ...sample, design: { blocks: [{}], targets: [] } }],
      [null],
    ]) {
      expect(() =>
        requireEngineeringConfig({ ...calendarMonumentConfig, designSamples }, 'calendar-monument'),
      ).toThrow('CONFIG_INVALID');
    }
    expect(
      requireEngineeringConfig(
        { ...calendarMonumentConfig, designSamples: undefined },
        'calendar-monument',
      ).designSamples,
    ).toBeUndefined();
  });
  it('previews samples without saving them and returns to the student design', () => {
    const registry = new DesignSimulationRegistry();
    registry.register(calendarMonumentConfig.simulationId, ExampleSimulation);
    TestBed.configureTestingModule({
      providers: [{ provide: DESIGN_SIMULATIONS, useValue: registry }],
    });
    TestBed.overrideComponent(EngineeringDesignPageComponent, { set: { template: '' } });
    const fixture = TestBed.createComponent(EngineeringDesignPageComponent),
      page = fixture.componentInstance;
    page.selectStep('sun-monument');
    const before = structuredClone(page.runtime.snapshot());
    page.previewSample('round-portal');
    expect(page.simulationInputs().design.blocks[0].aperture?.diameter).toBe(0.8);
    expect(page.simulationInputs().readOnly).toBe(true);
    expect(page.runtime.snapshot()).toEqual(before);
    expect(saved).toEqual(before);
    page.stopPreview();
    expect(page.simulationInputs().design).toEqual(before.design);
    expect(page.simulationInputs().readOnly).toBe(false);
  });
  it('preserves an existing tower draft when entering the new solar-calendar challenge', () => {
    saved = { ...structuredClone(calendarMonumentSample), design: structuredClone(towerFixture) };
    const runtime = TestBed.inject(EngineeringDesignRuntime);
    runtime.selectLearningStep('sun-monument');
    expect(runtime.snapshot().design).toEqual(towerFixture);
    runtime.useDesignSample('solar-calendar-circle');
    expect(runtime.snapshot().design.blocks).toHaveLength(24);
    expect(runtime.snapshot().design.targets).toEqual([]);
    runtime.restoreDesignBackup();
    expect(runtime.snapshot().design).toEqual(towerFixture);
  });
  it('loads a sample atomically, preserves notes/evidence, and restores the prior design after reload', () => {
    const runtime = TestBed.inject(EngineeringDesignRuntime);
    runtime.saveDesign(opticalDesign);
    const checks = [{ scenarioId: 'march', targetId: 'color-marker', expectedValue: 'blue light' }];
    runtime.saveChecks(checks);
    runtime.saveResearch('moon', 'My Moon observations');
    runtime.capture({ ...calendarMonumentSample.trials[0], design: opticalDesign });
    const revision = runtime.snapshot().revision;
    runtime.useDesignSample('pierced-pyramid');
    expect(runtime.snapshot().revision).toBe(revision + 1);
    expect(runtime.snapshot().design.blocks).toHaveLength(4);
    expect(runtime.snapshot().checks).toEqual([]);
    expect(runtime.snapshot().trials[0].design).toEqual(opticalDesign);
    expect(runtime.snapshot().research['moon']).toBe('My Moon observations');
    const loaded = TestBed.runInInjectionContext(() => new EngineeringDesignRuntime());
    loaded.restoreDesignBackup();
    expect(loaded.snapshot().design).toEqual(opticalDesign);
    expect(loaded.snapshot().checks).toEqual(checks);
    expect(loaded.snapshot().designBackup).toBeUndefined();
    expect(() => loaded.useDesignSample('missing')).toThrow('STATE_INVALID');
    expect(
      isEngineeringSnapshot({ ...loaded.snapshot(), designBackup: { design: {}, checks: [] } }),
    ).toBe(false);
  });
  it('validates optional learning steps and preserves packages with no sequence', () => {
    const learningSequence = calendarMonumentConfig.learningSequence!;
    expect(
      requireEngineeringConfig(
        { ...calendarMonumentConfig, learningSequence: undefined },
        'calendar-monument',
      ),
    ).toBeTruthy();
    for (const steps of [
      [],
      [null],
      [learningSequence.steps[0]],
      [learningSequence.steps[4], learningSequence.steps[4]],
      [{ ...learningSequence.steps[4], question: { researchId: 'missing', prompt: 'Why?' } }],
      [{ ...learningSequence.steps[4], showGuides: 'yes' }],
    ]) {
      expect(() =>
        requireEngineeringConfig(
          { ...calendarMonumentConfig, learningSequence: { ...learningSequence, steps } },
          'calendar-monument',
        ),
      ).toThrow('CONFIG_INVALID');
    }
  });
  it('keeps sundial practice, monument, and first/revised explanations separate after reload', () => {
    const runtime = TestBed.inject(EngineeringDesignRuntime),
      final = structuredClone(runtime.snapshot().design);
    const practice = {
      ...calendarMonumentConfig.learningSequence!.practiceDesign,
      targets: [
        {
          id: 'time',
          label: '9 AM',
          x: -0.3,
          z: 0.2,
          settings: { markerKind: 'hour', localDate: '2026-06-21', minutes: 540 },
        },
      ],
    };
    runtime.saveDesign(practice, 'practice');
    runtime.selectLearningStep('season-surprise');
    runtime.saveResearch('season-noticing', 'My first idea');
    runtime.saveResearch('seasons', 'My revised explanation');
    const loaded = TestBed.runInInjectionContext(() => new EngineeringDesignRuntime());
    expect(loaded.snapshot().practiceDesign).toEqual(practice);
    expect(loaded.snapshot().design).toEqual(final);
    expect(loaded.snapshot().learningStepId).toBe('season-surprise');
    expect(loaded.snapshot().research['season-noticing']).toBe('My first idea');
    expect(loaded.snapshot().research['seasons']).toBe('My revised explanation');
    expect(() => loaded.selectLearningStep('unknown')).toThrow('STATE_INVALID');
    expect(
      isBlockDesign({
        ...practice,
        targets: [{ ...practice.targets[0], settings: { minutes: NaN } }],
      }),
    ).toBe(false);
    expect(isEngineeringSnapshot({ ...loaded.snapshot(), practiceDesign: {} })).toBe(false);
  });
  it('routes simulation edits, captures and replay to the practice workspace without replacing the monument', () => {
    const registry = new DesignSimulationRegistry();
    registry.register(calendarMonumentConfig.simulationId, ExampleSimulation);
    TestBed.configureTestingModule({
      providers: [{ provide: DESIGN_SIMULATIONS, useValue: registry }],
    });
    TestBed.overrideComponent(EngineeringDesignPageComponent, { set: { template: '' } });
    const fixture = TestBed.createComponent(EngineeringDesignPageComponent),
      page = fixture.componentInstance;
    const final = structuredClone(page.runtime.snapshot().design),
      practice = page.activeDesign();
    expect(page.simulationInputs().activity).toBe('sundial-build');
    page.previewSample('round-portal');
    expect(page.preview()).toBeUndefined();
    page.simulationInjector.get(DESIGN_CHANGE)({
      ...practice,
      blocks: [{ ...practice.blocks[0], height: 0.9 }],
    });
    page.simulationInjector.get(DESIGN_CAPTURE)({
      ...calendarMonumentSample.trials[0],
      design: page.activeDesign(),
      id: 'dial-test',
    });
    const trial = page.runtime.snapshot().trials[0];
    expect(trial.settings['workspace']).toBe('practice');
    expect(trial.settings['learningStepId']).toBe('make-a-sundial');
    page.selectStep('sun-monument');
    expect(page.activeDesign()).toEqual(final);
    page.replay(trial);
    expect(page.activeDesign().blocks[0].height).toBe(0.9);
    expect(page.runtime.snapshot().design).toEqual(final);
    expect(page.restore()).toEqual(trial);
  });
  const opticalDesign: BlockDesign = {
    blocks: [
      {
        id: 'window',
        x: 0,
        y: 0.6,
        z: 0,
        width: 0.8,
        height: 0.8,
        depth: 0.06,
        rotation: 0,
        aperture: { axis: 'z', diameter: 0.48, insert: 'jewel', color: 'blue' },
      },
    ],
    targets: [{ id: 'color-marker', label: 'Blue marker', x: 0, z: -1 }],
    displayObject: {
      model: 'crystal',
      material: 'porcelain',
      x: 0,
      y: 0,
      z: -0.7,
      width: 0.4,
      height: 0.65,
      rotation: 25,
    },
  };
  it('validates optical dimensions, installed models, and reserved sculpture space without breaking old designs', () => {
    expect(isBlockDesign(opticalDesign)).toBe(true);
    expect(isBlockDesign(calendarMonumentConfig.starterDesign)).toBe(true);
    const b = opticalDesign.blocks[0];
    for (const aperture of [
      null,
      { ...b.aperture, diameter: 0.75 },
      { ...b.aperture, axis: 'x' },
      { ...b.aperture, color: 'unknown' },
    ]) {
      expect(isBlockDesign({ ...opticalDesign, blocks: [{ ...b, aperture }] })).toBe(false);
    }
    expect(
      isBlockDesign({
        ...opticalDesign,
        displayObject: { ...opticalDesign.displayObject, model: 'missing-model' },
      }),
    ).toBe(false);
    expect(
      isBlockDesign({
        ...opticalDesign,
        displayObject: { ...opticalDesign.displayObject, y: 0.6, z: 0 },
      }),
    ).toBe(false);
  });
  it('persists holes, inserts, sculpture and colored expectations with immutable trial replay', () => {
    const runtime = TestBed.inject(EngineeringDesignRuntime);
    runtime.saveDesign(opticalDesign);
    runtime.saveChecks([
      { scenarioId: 'march', targetId: 'color-marker', expectedValue: 'blue light' },
    ]);
    runtime.capture({
      ...calendarMonumentSample.trials[0],
      id: 'optics-trial',
      design: opticalDesign,
    });
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
    fixture.componentInstance.changed.subscribe((value) => {
      emitted = value;
      fixture.componentRef.setInput('design', value);
    });
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
    fixture.componentRef.setInput('design', towerFixture);
    fixture.detectChanges();
    let emitted: BlockDesign = towerFixture;
    fixture.componentInstance.changed.subscribe((value) => {
      emitted = value;
      fixture.componentRef.setInput('design', value);
    });
    fixture.componentInstance.selected.subscribe((id) =>
      fixture.componentRef.setInput('selectedId', id),
    );
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
    expect(runtime.snapshot().trials[0].design).toEqual(calendarMonumentSample.design);
    expect(runtime.snapshot().trials[0].prediction).toBe('A lower Sun makes a longer shadow.');
    expect(runtime.snapshot().events.map((event) => event.eventType)).toContain(
      'activity.completed',
    );
    const loaded = TestBed.runInInjectionContext(() => new EngineeringDesignRuntime());
    expect(loaded.snapshot()).toEqual(runtime.snapshot());
    expect(calendarMonumentConfig.starterDesign.blocks).toHaveLength(24);
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
    const checks = [
      {
        scenarioId: 'march',
        targetId: 'marker',
        expectedValue: 'shadow',
        settings: { observationRule: 'clock', minutes: 557 },
      },
    ];
    runtime.saveChecks(checks);
    checks[0].expectedValue = 'sunlight';
    expect(runtime.snapshot().checks?.[0].expectedValue).toBe('shadow');
    const captures = structuredClone(calendarMonumentSample.trials);
    runtime.captureBatch(captures);
    runtime.captureBatch(captures);
    expect(runtime.snapshot().trials).toHaveLength(4);
    runtime.saveDesign({ blocks: [], targets: [] });
    expect(runtime.snapshot().trials[0].design).toEqual(calendarMonumentSample.design);
    const loaded = TestBed.runInInjectionContext(() => new EngineeringDesignRuntime());
    expect(loaded.snapshot().checks).toEqual(runtime.snapshot().checks);
    expect(loaded.snapshot().checks?.[0].settings).toEqual({
      observationRule: 'clock',
      minutes: 557,
    });
    expect(() => runtime.saveChecks([{ ...checks[0], settings: { minutes: NaN } }])).toThrow(
      'STATE_INVALID',
    );
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
    expect(adapter.load()?.design).toEqual(calendarMonumentSample.design);
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
    fixture.componentRef.setInput('design', towerFixture);
    fixture.detectChanges();
    let emitted = towerFixture;
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
