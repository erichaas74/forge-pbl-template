import { TestBed } from '@angular/core/testing';
import { SolarMonumentComponent } from './solar-monument.component';
import {
  DESIGN_CAPTURE_BATCH,
  DESIGN_CHECKS_CHANGE,
} from '../../../shared/engineering/design-simulation.registry';
import { calendarMonumentConfig } from '../../../projects/calendar-monument/calendar-monument.config';
import { calendarMonumentSample } from '../../../projects/calendar-monument/calendar-monument.sample';

describe('solar monument demonstration bridge', () => {
  const batches: unknown[] = [];
  const changes: unknown[] = [];
  beforeEach(() => {
    batches.length = changes.length = 0;
    TestBed.configureTestingModule({
      providers: [
        { provide: DESIGN_CAPTURE_BATCH, useValue: (value: unknown) => batches.push(value) },
        { provide: DESIGN_CHECKS_CHANGE, useValue: (value: unknown) => changes.push(value) },
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
});
