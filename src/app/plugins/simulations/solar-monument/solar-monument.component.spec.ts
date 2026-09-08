import { TestBed } from '@angular/core/testing';
import { SolarMonumentComponent } from './solar-monument.component';
import {
  DESIGN_CAPTURE_BATCH,
  DESIGN_CHECKS_CHANGE,
  DESIGN_VIEW_REQUEST,
  DESIGN_CHANGE,
  DESIGN_CAPTURE,
  DESIGN_CHROME,
  type DesignChrome,
} from '../../../shared/engineering/design-simulation.registry';
import { calendarMonumentConfig } from '../../../projects/calendar-monument/calendar-monument.config';
import type { BlockDesign } from '../../../shared/engineering/block-design';
import { markerClock, solarMarkerRecord } from './solar-marker-record';
import { calendarMonumentSample } from '../../../projects/calendar-monument/calendar-monument.sample';

describe('solar monument demonstration bridge', () => {
  const batches: unknown[] = [];
  const changes: unknown[] = [];
  const views: unknown[] = [];
  const designs: unknown[] = [],
    captures: unknown[] = [];
  beforeEach(() => {
    batches.length = changes.length = views.length = 0;
    designs.length = captures.length = 0;
    TestBed.configureTestingModule({
      providers: [
        { provide: DESIGN_CAPTURE_BATCH, useValue: (value: unknown) => batches.push(value) },
        { provide: DESIGN_CHECKS_CHANGE, useValue: (value: unknown) => changes.push(value) },
        { provide: DESIGN_VIEW_REQUEST, useValue: (value: unknown) => views.push(value) },
        { provide: DESIGN_CHANGE, useValue: (value: unknown) => designs.push(value) },
        { provide: DESIGN_CAPTURE, useValue: (value: unknown) => captures.push(value) },
      ],
    });
  });
  function setup(readOnly = false) {
    const fixture = TestBed.createComponent(SolarMonumentComponent);
    fixture.componentRef.setInput('design', calendarMonumentConfig.starterDesign);
    fixture.componentRef.setInput('presentation', true);
    fixture.componentRef.setInput('readOnly', readOnly);
    fixture.detectChanges();
    const source = (fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement)
      .contentWindow!;
    const sent: Record<string, unknown>[] = [];
    source.postMessage = ((payload: Record<string, unknown>) =>
      sent.push(payload)) as typeof source.postMessage;
    const receive = (data: Record<string, unknown>, origin = window.location.origin) =>
      window.dispatchEvent(
        new MessageEvent('message', {
          source,
          origin,
          data: { channel: 'forge.design-simulation.v1', ...data },
        }),
      );
    receive({ type: 'ready' });
    fixture.detectChanges();
    const latest = () => [...sent].reverse().find((message) => message['type'] === 'review')!;
    const response = (request: Record<string, unknown>, outcome = 'met') => ({
      type: 'review',
      id: request['id'],
      captures: fixture.componentInstance.cases.map((item, i) => ({
        ...calendarMonumentSample.trials[i],
        id: request['id'] + ':' + item.id,
        design: request['design'],
        settings: {
          ...calendarMonumentSample.trials[i].settings,
          scenarioId: item.id,
          reviewId: request['id'],
          outcome,
        },
      })),
    });
    return { fixture, component: fixture.componentInstance, sent, receive, latest, response };
  }
  it('replays each seasonal result and records the complete comparison once', () => {
    const test = setup();
    test.receive(test.response(test.latest()));
    test.fixture.detectChanges();
    expect(test.component.results()).toHaveLength(4);
    test.component.viewCase(2);
    const replay = test.sent[test.sent.length - 1]['capture'] as {
      settings: { scenarioId: string };
    };
    expect(replay.settings.scenarioId).toBe('sept');
    test.component.recordReview();
    test.component.recordReview();
    expect(batches).toHaveLength(1);
    expect(batches[0]).toHaveLength(4);
    test.fixture.destroy();
  });
  it('invalidates old comparisons after design/location changes and ignores stale or foreign responses', () => {
    const test = setup();
    const old = test.latest();
    test.receive(test.response(old), 'https://different.example');
    expect(test.component.results()).toHaveLength(0);
    test.receive(test.response(old));
    test.fixture.componentRef.setInput('design', {
      ...calendarMonumentConfig.starterDesign,
      targets: [{ id: 'new', label: 'Marker', x: 0, z: -1 }],
    });
    test.fixture.detectChanges();
    expect(test.component.results()).toHaveLength(0);
    test.receive(test.response(old));
    expect(test.component.results()).toHaveLength(0);
    test.receive(test.response(test.latest()));
    test.receive({ type: 'context', key: 'a-new-location' });
    expect(test.component.results()).toHaveLength(0);
    test.fixture.destroy();
  });
  it('does not record incomplete expectations or persist changes from a read-only example', () => {
    const test = setup();
    test.receive(test.response(test.latest(), 'unconfigured'));
    test.component.recordReview();
    expect(batches).toHaveLength(0);
    test.component.changeCheck('march', 'targetId', 'marker');
    expect(changes).toHaveLength(1);
    test.fixture.destroy();
    const readOnly = setup(true);
    readOnly.receive(readOnly.response(readOnly.latest()));
    readOnly.component.recordReview();
    readOnly.component.changeCheck('march', 'targetId', 'changed');
    expect(batches).toHaveLength(0);
    expect(changes).toHaveLength(1);
    readOnly.fixture.destroy();
  });
  it('accepts bounded layout and navigation messages only from this frame and protects previews', () => {
    const test = setup();
    test.receive({ type: 'size', height: 1150 });
    expect(test.component.frameHeight()).toBe(1152);
    test.receive({ type: 'size', height: Infinity });
    test.receive({ type: 'size', height: 900 }, 'https://other.example');
    expect(test.component.frameHeight()).toBe(1152);
    test.receive({ type: 'view-request', view: 'build' });
    test.receive({ type: 'view-request', view: 'observe' });
    expect(views).toEqual(['build', 'observe']);
    test.fixture.componentRef.setInput('readOnly', true);
    test.fixture.detectChanges();
    test.receive({ type: 'view-request', view: 'build' });
    expect(views).toHaveLength(2);
    test.fixture.destroy();
  });
  it('saves observation rules and clock minutes, then requests a fresh comparison', () => {
    const test = setup();
    test.fixture.componentRef.setInput('checks', [
      { scenarioId: 'march', targetId: 'marker', expectedValue: 'shadow' },
    ]);
    test.fixture.detectChanges();
    test.component.changeTime('march', 'clock', '09:17');
    expect(changes[0]).toEqual([
      {
        scenarioId: 'march',
        targetId: 'marker',
        expectedValue: 'shadow',
        settings: { observationRule: 'clock', minutes: 557 },
      },
    ]);
    test.fixture.componentRef.setInput('checks', changes[0]);
    test.fixture.detectChanges();
    expect(test.latest()['checks']).toEqual(changes[0]);
    expect(test.component.clockFor('march')).toBe('09:17');
    test.component.changeTime('march', 'invalid');
    test.component.changeTime('march', 'clock', 'bad');
    expect(changes).toHaveLength(1);
    test.fixture.destroy();
  });
  it('shows the saved target when dynamic target options are created', async () => {
    const test = setup(true);
    test.fixture.componentRef.setInput('design', {
      ...calendarMonumentConfig.starterDesign,
      targets: [{ id: 'marker', label: 'Equinox marker', x: 0, z: -1 }],
    });
    test.fixture.componentRef.setInput('checks', [
      { scenarioId: 'march', targetId: 'marker', expectedValue: 'shadow' },
    ]);
    test.fixture.detectChanges();
    await test.fixture.whenStable();
    const target = test.fixture.nativeElement.querySelector(
      '.expectation select',
    ) as HTMLSelectElement;
    expect(target.value).toBe('marker');
    expect(target.selectedOptions[0].textContent).toContain('Equinox marker');
    test.fixture.destroy();
  });
  it('accepts sundial changes only for the current editable lesson and ignores stale captures after navigation', () => {
    const test = setup();
    test.fixture.componentRef.setInput('presentation', false);
    test.fixture.componentRef.setInput('activity', 'sundial-build');
    test.fixture.detectChanges();
    const message = {
      type: 'design-change',
      activity: 'sundial-build',
      design: calendarMonumentConfig.learningSequence!.practiceDesign,
    };
    test.receive(message, 'https://foreign.example');
    test.receive({ ...message, design: {} });
    expect(designs).toHaveLength(0);
    test.receive(message);
    expect(designs).toHaveLength(1);
    test.component.capture();
    const pending = [...test.sent].reverse().find((m) => m['type'] === 'capture')!;
    test.fixture.componentRef.setInput('activity', 'sundial-seasons');
    test.fixture.detectChanges();
    test.receive(message);
    test.receive({ ...message, activity: 'sundial-seasons' });
    test.receive({
      type: 'capture',
      capture: { ...calendarMonumentSample.trials[0], id: pending['id'] },
    });
    expect(designs).toHaveLength(1);
    expect(captures).toHaveLength(0);
    expect(test.component.busy()).toBe(false);
    test.fixture.componentRef.setInput('activity', 'sundial-calendar');
    test.fixture.componentRef.setInput('readOnly', true);
    test.fixture.detectChanges();
    test.receive({ ...message, activity: 'sundial-calendar' });
    expect(designs).toHaveLength(1);
    test.fixture.destroy();
  });
  it('restores an evidence observation after applying a different lesson’s starting date', () => {
    const test = setup();
    const capture = {
      ...calendarMonumentSample.trials[0],
      design: calendarMonumentConfig.learningSequence!.practiceDesign,
    };
    test.fixture.componentRef.setInput('presentation', false);
    test.fixture.componentRef.setInput('design', capture.design);
    test.fixture.componentRef.setInput('restore', capture);
    test.fixture.componentRef.setInput('activity', 'sundial-calendar');
    test.fixture.detectChanges();
    const relevant = test.sent.filter((m) => ['lesson', 'restore'].includes(String(m['type'])));
    expect(relevant[relevant.length - 1]).toEqual({
      channel: 'forge.design-simulation.v1',
      type: 'restore',
      capture,
    });
    test.fixture.destroy();
  });
  it('contributes a single toolbar and guide, validates live state, and routes events to the renderer', () => {
    const chrome: (DesignChrome | undefined)[] = [];
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DESIGN_CHROME,
          useValue: (value: DesignChrome | undefined) => chrome.push(value),
        },
      ],
    });
    const test = setup();
    expect(chrome[0]?.toolbar).toBeTruthy();
    expect(chrome[0]?.guide).toBeTruthy();
    expect(test.fixture.nativeElement.querySelector('.standalone-header')).toBeNull();
    expect(test.sent.some((m) => m['type'] === 'hosted-chrome')).toBe(true);
    const state = { ...test.component.ui(), clock: '9:00 AM', minutes: 540 };
    test.receive({ type: 'toolbar-state', state }, 'https://other.example');
    expect(test.component.ui().minutes).toBe(720);
    test.receive({ type: 'toolbar-state', state: { ...state, end: Infinity } });
    expect(test.component.ui().minutes).toBe(720);
    test.receive({ type: 'toolbar-state', state });
    expect(test.component.ui().minutes).toBe(540);
    test.fixture.componentRef.setInput('presentation', false);
    test.fixture.detectChanges();
    test.component.event('noonBtn');
    expect(test.sent.at(-1)).toEqual({
      channel: 'forge.design-simulation.v1',
      type: 'toolbar-action',
      action: 'noonBtn',
      value: undefined,
    });
    test.fixture.destroy();
    expect(chrome.at(-1)).toBeUndefined();
  });
  it('keeps the selected final date accurate when dynamic event options appear', async () => {
    const test = setup(true);
    test.receive(test.response(test.latest()));
    test.fixture.detectChanges();
    await test.fixture.whenStable();
    const picker = test.fixture.nativeElement.querySelector('.event-select') as HTMLSelectElement;
    expect(picker.value).toBe('march');
    expect(picker.selectedOptions[0].textContent).toContain('March equinox');
    test.component.event('june');
    test.fixture.detectChanges();
    await test.fixture.whenStable();
    expect(picker.value).toBe('june');
    test.component.event('nearby-before');
    test.fixture.detectChanges();
    await test.fixture.whenStable();
    expect(picker.value).toBe('nearby-before');
    expect(test.sent.at(-1)?.['type']).toBe('nearby');
    test.fixture.destroy();
  });
  it('previews a measured sunstone, saves its observation, configures a seasonal test and supports undo', () => {
    const test = setup();
    test.fixture.componentRef.setInput('presentation', false);
    test.fixture.componentRef.setInput('activity', 'monument');
    test.fixture.detectChanges();
    test.component.toggleMarkers();
    test.component.startMarker({ x: -1.3, z: 0.315 });
    const request = [...test.sent].reverse().find((m) => m['type'] === 'marker-start')!;
    const target = {
      ...structuredClone(calendarMonumentSample.design.targets[0]),
      id: 'sunstone-' + request['requestId'],
    };
    const picked = { type: 'marker-picked', requestId: request['requestId'], target };
    test.receive(picked, 'https://foreign.example');
    test.receive({ ...picked, requestId: 'old-request' });
    test.receive({
      ...picked,
      target: { ...target, settings: { ...target.settings, sunAltitude: NaN } },
    });
    expect(test.component.markerDraft()).toBeUndefined();
    test.receive(picked);
    expect(test.component.markerDraft()).toEqual(target);
    expect(designs).toHaveLength(0);
    test.component.markerName = 'My amber June stone';
    test.component.saveMarker();
    expect(designs).toHaveLength(1);
    const saved = designs[0] as BlockDesign;
    expect(saved.blocks).toEqual(calendarMonumentConfig.starterDesign.blocks);
    expect(saved.targets[0].settings).toEqual(target.settings);
    expect(saved.targets[0].label).toBe('My amber June stone');
    test.fixture.componentRef.setInput('design', saved);
    test.fixture.detectChanges();
    test.component.useMarkerForTest();
    expect(changes.at(-1)).toEqual([
      expect.objectContaining({
        scenarioId: 'june',
        targetId: target.id,
        expectedValue: 'amber light',
        settings: { observationRule: 'clock', minutes: markerClock(solarMarkerRecord(target)!) },
      }),
    ]);
    test.fixture.componentRef.setInput('checks', changes.at(-1));
    test.fixture.detectChanges();
    const clock = test.component.clockFor('june');
    expect(clock).toBe('13:02:20.107');
    test.component.changeTime('june', 'clock', clock);
    expect(changes.at(-1)).toEqual([
      {
        scenarioId: 'june',
        targetId: target.id,
        expectedValue: 'amber light',
        settings: {
          observationRule: 'clock',
          minutes: expect.closeTo(782.3351166666667, 10),
        },
      },
    ]);
    const count = changes.length;
    test.component.changeTime('june', 'clock', '12:99');
    expect(changes).toHaveLength(count);
    test.receive({ type: 'marker-reading', targetId: 'other', light: 'shadow' });
    expect(test.component.markerNow()).toBe('');
    test.receive({ type: 'marker-reading', targetId: target.id, light: 'shadow' });
    expect(test.component.markerNow()).toBe('shadow');
    test.component.revisitMarker();
    expect(test.sent.at(-1)).toEqual(
      expect.objectContaining({ type: 'marker-revisit', targetId: target.id }),
    );
    test.component.removeMarker();
    test.fixture.componentRef.setInput('design', designs.at(-1));
    test.fixture.detectChanges();
    expect(test.component.design().targets).toHaveLength(0);
    test.component.undoMarker();
    expect((designs.at(-1) as BlockDesign).targets).toEqual(saved.targets);
    test.fixture.destroy();
  });
  it('cancels pending marker placement on lesson changes and protects read-only and final views', () => {
    const test = setup();
    test.component.startMarker();
    expect(test.sent.some((m) => m['type'] === 'marker-start')).toBe(false);
    test.fixture.componentRef.setInput('presentation', false);
    test.fixture.detectChanges();
    test.component.startMarker();
    const request = [...test.sent].reverse().find((m) => m['type'] === 'marker-start')!;
    test.fixture.componentRef.setInput('activity', 'sundial-calendar');
    test.fixture.detectChanges();
    test.receive({
      type: 'marker-picked',
      requestId: request['requestId'],
      target: {
        ...calendarMonumentSample.design.targets[0],
        id: 'sunstone-' + request['requestId'],
      },
    });
    expect(test.component.markerDraft()).toBeUndefined();
    test.fixture.componentRef.setInput('activity', 'monument');
    test.fixture.componentRef.setInput('design', calendarMonumentSample.design);
    test.fixture.componentRef.setInput('readOnly', true);
    test.fixture.detectChanges();
    test.component.selectMarker(calendarMonumentSample.design.targets[0]);
    test.component.removeMarker();
    test.component.renameMarker();
    test.component.useMarkerForTest();
    test.component.saveMarker();
    expect(designs).toHaveLength(0);
    expect(changes).toHaveLength(0);
    test.fixture.destroy();
  });
  it('reconnects the hosted header and complete lesson policy after an iframe reload', () => {
    const test = setup(true);
    test.fixture.componentRef.setInput('activity', 'sundial-calendar');
    test.fixture.detectChanges();
    test.sent.length = 0;
    test.receive({ type: 'ready' });
    test.fixture.detectChanges();
    expect(test.sent).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'hosted-chrome', active: true }),
        expect.objectContaining({ type: 'lesson', activity: 'sundial-calendar' }),
        expect.objectContaining({ type: 'view-policy', readOnly: true }),
        expect.objectContaining({ type: 'presentation', active: true }),
        expect.objectContaining({ type: 'visibility', active: true }),
      ]),
    );
    test.fixture.destroy();
  });
});
