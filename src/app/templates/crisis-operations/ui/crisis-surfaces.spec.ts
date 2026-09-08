import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { CrisisConfig } from '../domain/crisis.models';
import {
  CRISIS_CONFIG,
  CRISIS_PERSISTENCE,
  CRISIS_SESSION,
  CrisisRuntimeService,
} from '../runtime/crisis-runtime.service';
import { CrisisCenterComponent } from './crisis-center.component';

const config: CrisisConfig = {
  schemaVersion: '1.0',
  projectId: 'test-district',
  projectVersion: '1',
  template: { id: 'crisis-operations', version: '1.0' },
  title: 'Test district',
  region: 'Test region',
  operationCode: 'T-01',
  roomImage: '/room.png',
  newsImage: '/camera.png',
  roomTagline: ['Observe', 'Respond'],
  analysisHeadline: ['Assess', 'Act'],
  systemChain: ['Water', 'Roads'],
  primaryMetric: {
    label: 'River level',
    unit: 'm',
    caption: 'Threshold 5 m',
    initialTrend: [3, 4],
  },
  newsCamera: {
    label: 'Camera 1',
    network: 'Test network',
    locationId: 'bridge',
    minute: 0,
    description: 'Exercise still',
  },
  startHour: 12,
  crews: 4,
  evidenceLimit: 3,
  bulletinIntervalSeconds: 75,
  roles: [{ id: 'command', name: 'Command', shortName: 'Command', focus: 'Coordinate' }],
  locations: [
    {
      id: 'bridge',
      name: 'Test bridge',
      kind: 'bridge',
      x: 500,
      y: 300,
      elevation: 6,
      population: 0,
      detail: 'River crossing',
    },
    {
      id: 'hospital',
      name: 'Test hospital',
      kind: 'hospital',
      x: 700,
      y: 450,
      elevation: 20,
      population: 180,
      detail: 'Medical care',
    },
  ],
  evidence: [
    {
      id: 'road',
      title: 'Water across the road',
      source: 'Field team',
      channel: 'Radio',
      body: 'Standing water is confirmed at the bridge.',
      confidence: 'Confirmed',
      minute: 0,
      stage: 0,
      locationId: 'bridge',
      roleIds: [],
    },
  ],
  actions: [
    {
      id: 'inspect',
      title: 'Inspect bridge',
      description: 'Send inspectors',
      locationId: 'bridge',
      crews: 2,
      duration: 15,
      tradeoff: 'Two crews assigned',
      outcome: 'Inspection ordered',
      mapLabel: 'Inspection assigned',
      minStage: 0,
      riskReduction: 5,
      protects: 0,
    },
  ],
  bulletins: [
    {
      minute: 0,
      title: 'River rising',
      summary: 'Bridge being monitored',
      alert: 'Watch',
      metricValue: 4,
      risk: 30,
      affected: 180,
      forecast: 'More rain',
      uncertainty: 'Extent unknown',
    },
  ],
  map: {
    coast: 'M100 0H1000V600H100Z',
    river: 'M500 0V600',
    roads: ['M0 300H1000'],
    contours: [],
    hazard: 'M400 0H600V600H400Z',
    labels: [],
  },
};

describe('crisis room spatial surfaces', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    HTMLElement.prototype.scrollIntoView = vi.fn();
    TestBed.configureTestingModule({
      imports: [CrisisCenterComponent],
      providers: [
        provideRouter([]),
        CrisisRuntimeService,
        { provide: CRISIS_CONFIG, useValue: config },
        { provide: CRISIS_SESSION, useValue: { tenantId: 'test', actorId: 'operator' } },
        {
          provide: CRISIS_PERSISTENCE,
          useValue: { available: true, load: () => null, save: vi.fn() },
        },
      ],
    });
  });
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.useRealTimers();
  });
  function room() {
    const fixture = TestBed.createComponent(CrisisCenterComponent);
    fixture.detectChanges();
    return {
      fixture,
      center: fixture.componentInstance,
      root: fixture.nativeElement as HTMLElement,
      runtime: TestBed.inject(CrisisRuntimeService),
    };
  }
  function withWorkstations() {
    TestBed.overrideProvider(CRISIS_CONFIG, {
      useValue: {
        ...config,
        roles: [
          ...config.roles,
          { id: 'systems', name: 'Systems', shortName: 'Systems', focus: 'Review sensors' },
        ],
        workstations: [
          {
            id: 'sensors',
            name: 'Sensor desk',
            description: 'Read instruments',
            side: 'left',
            roleIds: ['systems'],
            instrument: 'telemetry',
          },
          {
            id: 'dispatch',
            name: 'Dispatch desk',
            description: 'Coordinate crews',
            side: 'right',
            roleIds: ['command'],
            instrument: 'resources',
          },
        ],
        evidence: [
          ...config.evidence,
          { ...config.evidence[0], id: 'sensor', title: 'Sensor reading', roleIds: ['systems'] },
        ],
      },
    });
  }
  function withStationExperiences() {
    TestBed.overrideProvider(CRISIS_CONFIG, {
      useValue: {
        ...config,
        bulletins: [
          { ...config.bulletins[0], minute: 10 },
          { ...config.bulletins[0], minute: 20 },
        ],
        evidence: [
          ...config.evidence,
          { ...config.evidence[0], id: 'future', title: 'Future source', stage: 1, minute: 15 },
        ],
        workstations: [
          {
            id: 'weather',
            name: 'Weather',
            description: 'Radar',
            side: 'left',
            roleIds: ['command'],
            instrument: 'telemetry',
            weather: {
              title: 'Test weather',
              network: 'Test weather desk',
              satelliteImage: '/satellite.png',
              frames: [
                { stage: 0, minute: 0, x: 400, y: 200, intensity: 0.4 },
                { stage: 0, minute: 5, x: 450, y: 250, intensity: 0.6 },
                { stage: 0, minute: 10, x: 500, y: 300, intensity: 0.8 },
                { stage: 1, minute: 15, x: 600, y: 300, intensity: 0.9 },
                { stage: 1, minute: 20, x: 650, y: 300, intensity: 0.7 },
              ],
            },
          },
          {
            id: 'call',
            name: 'Field call',
            description: 'Call',
            side: 'right',
            roleIds: ['command'],
            instrument: 'resources',
            conference: {
              title: 'Test conference',
              participants: [
                {
                  id: 'lead',
                  name: 'Test Coordinator',
                  role: 'Field lead',
                  locationId: 'bridge',
                  portrait: '/lead.png',
                  evidenceIds: ['road'],
                },
                {
                  id: 'engineer',
                  name: 'Test Engineer',
                  role: 'Engineer',
                  locationId: 'hospital',
                  portrait: '/engineer.png',
                  evidenceIds: ['future'],
                },
              ],
            },
          },
        ],
      },
    });
  }
  it('opens the call with selectable participant views and no premature field reports', () => {
    withStationExperiences();
    const { fixture, root, center, runtime } = room();
    root.querySelector<HTMLButtonElement>('[data-workstation-id="call"]')!.click();
    fixture.detectChanges();
    expect(root.querySelector('.conference-window')).not.toBeNull();
    expect(root.querySelector('.focus-console')).toBeNull();
    expect(root.querySelector('.field-caption')!.textContent).toContain('Water across the road');
    const state = runtime.state();
    root.querySelectorAll<HTMLButtonElement>('.participant-tile')[1].click();
    fixture.detectChanges();
    expect(root.querySelector('[data-speaker="engineer"]')).not.toBeNull();
    expect(root.querySelector('.field-caption')!.textContent).toContain('Standing by');
    expect(root.querySelector('.field-caption')!.textContent).not.toContain('Future source');
    root.querySelector<HTMLButtonElement>('.layout-button')!.click();
    fixture.detectChanges();
    expect(root.querySelectorAll('.gallery-tile')).toHaveLength(2);
    expect(root.querySelectorAll('.media-controls button:disabled')).toHaveLength(2);
    root.querySelector<HTMLButtonElement>('.leave-call')!.click();
    fixture.detectChanges();
    expect(center.view()).toBe('room');
    expect(runtime.state()).toBe(state);
  });
  it('presents pinned evidence through the conference without spending resources', () => {
    withStationExperiences();
    const { fixture, root, runtime } = room();
    root.querySelector<HTMLButtonElement>('[data-workstation-id="call"]')!.click();
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('[data-call-panel="reports"]')!.click();
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('[data-station-report-id="road"]')!.click();
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('.report-tools .primary')!.click();
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('.share-control')!.click();
    fixture.detectChanges();
    expect(root.querySelector('.briefing-sheet')!.textContent).toContain(
      'Standing water is confirmed',
    );
    expect(runtime.shared().map((report) => report.id)).toEqual(['road']);
    expect(runtime.crews()).toBe(4);
    expect(runtime.state().decisions).toHaveLength(0);
  });
  it('plays, pauses, and scrubs only released weather frames without advancing the scenario', () => {
    withStationExperiences();
    const { fixture, root, runtime } = room();
    root.querySelector<HTMLButtonElement>('[data-workstation-id="weather"]')!.click();
    fixture.detectChanges();
    const state = runtime.state();
    const slider = root.querySelector<HTMLInputElement>('.weather-playback input')!;
    vi.advanceTimersByTime(1500);
    fixture.detectChanges();
    expect(slider.value).toBe('1');
    root.querySelector<HTMLButtonElement>('.weather-playback button')!.click();
    fixture.detectChanges();
    vi.advanceTimersByTime(3000);
    fixture.detectChanges();
    expect(slider.value).toBe('1');
    slider.value = '2';
    slider.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(slider.getAttribute('aria-valuetext')).toBe('12:10');
    root.querySelectorAll<HTMLButtonElement>('.weather-tabs button')[1].click();
    fixture.detectChanges();
    expect(
      root.querySelector('app-crisis-weather-screen:not(.miniature) .satellite'),
    ).not.toBeNull();
    expect(runtime.state()).toBe(state);
    runtime.advance();
    fixture.detectChanges();
    expect(slider.max).toBe('1');
    expect(slider.getAttribute('aria-valuetext')).toBe('12:15');
  });
  it('starts weather paused with reduced motion and keeps the specialist reports accessible', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    withStationExperiences();
    const { fixture, root, center } = room();
    root.querySelector<HTMLButtonElement>('[data-workstation-id="weather"]')!.click();
    fixture.detectChanges();
    vi.advanceTimersByTime(4500);
    fixture.detectChanges();
    expect(root.querySelector<HTMLInputElement>('.weather-playback input')!.value).toBe('0');
    expect(root.querySelector('.weather-playback button')!.getAttribute('aria-label')).toBe(
      'Play weather loop',
    );
    root.querySelector<HTMLButtonElement>('.weather-reports')!.click();
    fixture.detectChanges();
    expect(center.specializedStation()).toBe(false);
    expect(root.querySelector('[data-station-report-id="road"]')).not.toBeNull();
  });
  it('opens left and right desks with their own specialties while preserving time and orders', () => {
    withWorkstations();
    const { fixture, center, root, runtime } = room();
    expect(root.querySelectorAll('.workstation')).toHaveLength(2);
    expect(root.querySelector('.station-target')).toBeNull();
    const before = runtime.state();
    root.querySelector<HTMLButtonElement>('[data-workstation-id="sensors"]')!.click();
    fixture.detectChanges();
    expect(center.viewTitle()).toBe('Sensor desk');
    expect(runtime.state().roleId).toBe('systems');
    expect(
      [...root.querySelectorAll('select option')].map((option) => option.textContent?.trim()),
    ).toEqual(['Systems']);
    expect(root.querySelector('[data-station-report-id="sensor"]')).not.toBeNull();
    expect(root.querySelector('.workstation-space')!.hasAttribute('inert')).toBe(true);
    root.querySelector<HTMLButtonElement>('[data-station-report-id="sensor"]')!.click();
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('.report-tools .primary')!.click();
    fixture.detectChanges();
    center.showView('room');
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('[data-workstation-id="dispatch"]')!.click();
    fixture.detectChanges();
    expect(center.viewTitle()).toBe('Dispatch desk');
    expect(runtime.state().roleId).toBe('command');
    expect(root.querySelector('.evidence-reader')).toBeNull();
    expect(root.querySelector('[data-station-report-id="sensor"]')).not.toBeNull();
    expect(runtime.state().stage).toBe(before.stage);
    expect(runtime.state().decisions).toEqual(before.decisions);
    expect(runtime.crews()).toBe(4);
    root.querySelector<HTMLButtonElement>('.view-button[data-view="station"]')!.click();
    fixture.detectChanges();
    expect(root.querySelectorAll('select option')).toHaveLength(2);
    expect(center.selectedWorkstation()).toBeUndefined();
  });
  it('returns keyboard focus to the desk after Escape', () => {
    withWorkstations();
    const { fixture, root, center } = room();
    const desk = root.querySelector<HTMLButtonElement>('[data-workstation-id="sensors"]')!;
    desk.focus();
    desk.click();
    fixture.detectChanges();
    vi.advanceTimersByTime(1200);
    expect(document.activeElement).toBe(root.querySelector('[data-panel-heading]'));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    vi.advanceTimersByTime(1200);
    expect(center.view()).toBe('room');
    expect(document.activeElement).toBe(desk);
    expect(root.querySelector('.workstation-space')!.hasAttribute('inert')).toBe(false);
  });
  it('shows the active specialty when a desk opens with dynamically rendered options', () => {
    TestBed.overrideProvider(CRISIS_CONFIG, {
      useValue: {
        ...config,
        roles: [
          ...config.roles,
          { id: 'terrain', name: 'Terrain', shortName: 'Terrain', focus: 'Review routes' },
          { id: 'sensors', name: 'Sensors', shortName: 'Sensors', focus: 'Review readings' },
        ],
        workstations: [
          {
            id: 'analysis',
            name: 'Analysis',
            description: 'Read reports',
            side: 'left',
            roleIds: ['sensors', 'terrain'],
            instrument: 'reports',
          },
        ],
      },
    });
    const { fixture, root, runtime } = room();
    root.querySelector<HTMLButtonElement>('[data-workstation-id="analysis"]')!.click();
    fixture.detectChanges();
    expect(runtime.state().roleId).toBe('sensors');
    const specialty = root.querySelector<HTMLSelectElement>('select')!;
    expect(specialty.value).toBe('sensors');
    specialty.value = 'terrain';
    specialty.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(runtime.state().roleId).toBe('terrain');
  });
  it('progresses from available responses to evidence review and a dispatched order', () => {
    TestBed.overrideProvider(CRISIS_CONFIG, {
      useValue: {
        ...config,
        actions: [
          ...config.actions,
          { ...config.actions[0], id: 'later', title: 'Later response', minStage: 1 },
        ],
      },
    });
    const { fixture, center, root, runtime } = room();
    runtime.read('road');
    runtime.share('road');
    center.showView('command');
    fixture.detectChanges();
    expect(root.querySelectorAll('.order-option')).toHaveLength(1);
    expect(root.querySelector('.pending-orders')!.hasAttribute('open')).toBe(false);
    expect(root.querySelector('.order-review')).toBeNull();
    root.querySelector<HTMLButtonElement>('.order-option')!.click();
    fixture.detectChanges();
    expect(root.querySelector('.response-options')).toBeNull();
    expect(root.querySelector('.order-review')!.textContent).toContain('Two crews assigned');
    expect(root.querySelector<HTMLButtonElement>('.dispatch-button')!.disabled).toBe(true);
    root.querySelector<HTMLInputElement>('.attach-evidence input')!.click();
    fixture.detectChanges();
    expect(root.querySelector<HTMLButtonElement>('.dispatch-button')!.disabled).toBe(false);
    root.querySelector<HTMLButtonElement>('.dispatch-button')!.click();
    fixture.detectChanges();
    expect(runtime.crews()).toBe(2);
    expect(runtime.state().decisions[0].evidenceIds).toEqual(['road']);
    expect(root.querySelector('.orders-log')!.textContent).toContain('Inspect bridge');
    expect(root.querySelector('.order-review')).toBeNull();
    root.querySelector<HTMLButtonElement>('.command-tabs button')!.click();
    fixture.detectChanges();
    expect(root.querySelectorAll('.order-option')).toHaveLength(0);
  });
  it('opens one report at a time and returns to the selected response after finding evidence', () => {
    const { fixture, center, root, runtime } = room();
    center.showView('command');
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('.order-option')!.click();
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('.empty-evidence button')!.click();
    fixture.detectChanges();
    expect(center.view()).toBe('station');
    expect(root.querySelector('.evidence-reader')).toBeNull();
    root.querySelector<HTMLButtonElement>('[data-station-report-id="road"]')!.click();
    fixture.detectChanges();
    expect(root.querySelector('.wire')).toBeNull();
    expect(root.querySelector('.evidence-reader')!.textContent).toContain(
      'Standing water is confirmed',
    );
    root.querySelector<HTMLButtonElement>('.report-tools .primary')!.click();
    fixture.detectChanges();
    expect(runtime.shared().map((report) => report.id)).toEqual(['road']);
    root.querySelector<HTMLButtonElement>('.back-to-reports')!.click();
    fixture.detectChanges();
    expect(root.querySelector('.wire')).not.toBeNull();
    expect(root.querySelector('.evidence-reader')).toBeNull();
    center.showView('command');
    fixture.detectChanges();
    expect(root.querySelector('.order-review')!.textContent).toContain('Inspect bridge');
    expect(root.querySelectorAll('.attach-evidence')).toHaveLength(1);
    expect(runtime.state().decisions).toHaveLength(0);
  });
  it('enters each physical surface directly and steps back by clicking the surrounding room', () => {
    const { fixture, center, root, runtime } = room();
    const state = runtime.state();
    for (const view of ['map', 'news'] as const) {
      root.querySelector<HTMLButtonElement>(`[data-room-entry="${view}"]`)!.click();
      fixture.detectChanges();
      expect(center.view()).toBe(view);
      expect(root.querySelector('[data-room-entry="map"]')).toBeNull();
      root.querySelector<HTMLButtonElement>('.room-return-surface')!.click();
      fixture.detectChanges();
      expect(center.view()).toBe('room');
      expect(root.querySelector('.room-return-surface')).toBeNull();
    }
    expect(runtime.state()).toBe(state);
  });
  it('keeps instrument surfaces and their controls separate from the click-away area', () => {
    const { fixture, center, root } = room();
    root.querySelector<HTMLButtonElement>('[data-room-entry="map"]')!.click();
    fixture.detectChanges();
    root.querySelector<HTMLElement>('.table-projection')!.click();
    root.querySelectorAll<HTMLButtonElement>('.layer-controls button')[1].click();
    fixture.detectChanges();
    root.querySelector<HTMLElement>('.location-inspector p')!.click();
    expect(center.view()).toBe('map');
    expect(center.layer()).toBe('people');
    root.querySelector<HTMLButtonElement>('.view-button[data-view="news"]')!.click();
    fixture.detectChanges();
    root.querySelector<HTMLElement>('.monitor-bank')!.click();
    root.querySelector<HTMLButtonElement>('[data-monitor-first-control]')!.click();
    fixture.detectChanges();
    expect(center.view()).toBe('news');
    expect(root.querySelector('.camera-picture')!.classList.contains('magnified')).toBe(true);
  });
  it('restores keyboard focus to the physical entry surface after stepping back', () => {
    const { fixture, root } = room();
    for (const view of ['map', 'news'] as const) {
      const entry = root.querySelector<HTMLButtonElement>(`[data-room-entry="${view}"]`)!;
      entry.focus();
      entry.click();
      fixture.detectChanges();
      vi.advanceTimersByTime(1200);
      expect(document.activeElement).toBe(root.querySelector('[data-panel-heading]'));
      root.querySelector<HTMLButtonElement>('.room-return-surface')!.click();
      fixture.detectChanges();
      vi.advanceTimersByTime(1200);
      expect(document.activeElement).toBe(root.querySelector(`[data-room-entry="${view}"]`));
    }
  });
  it('opens contextual sources and carries a response preview to command without dispatching it', () => {
    const { fixture, center, root, runtime } = room();
    center.showView('argus');
    fixture.detectChanges();
    const intents = root.querySelectorAll<HTMLButtonElement>('.intent-choices button');
    intents[1].click();
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('.surface-actions .primary-action')!.click();
    fixture.detectChanges();
    expect(runtime.state().sharedEvidenceIds).toEqual(['road']);
    intents[2].click();
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('.response-lens .text-action')!.click();
    fixture.detectChanges();
    expect(center.view()).toBe('command');
    expect(root.querySelector('.order-review')!.textContent).toContain('Inspect bridge');
    expect(runtime.state().decisions).toHaveLength(0);
    expect(runtime.crews()).toBe(4);
    center.showView('argus');
    fixture.detectChanges();
    expect(root.querySelector('.data-lens')).not.toBeNull();
  });
  it('stops roaming for direct interaction and respects Hold position', () => {
    TestBed.overrideProvider(CRISIS_CONFIG, {
      useValue: {
        ...config,
        companion: {
          name: 'Test robot',
          sprite: '/robot.png',
          roamPoints: [
            { x: 78, y: 76, scale: 1 },
            { x: 80, y: 81, scale: 1 },
          ],
        },
      },
    });
    const { fixture, center, root } = room();
    fixture.detectChanges();
    vi.advanceTimersByTime(2300);
    fixture.detectChanges();
    expect(root.querySelector('.robot-travel')!.getAttribute('data-roaming')).toBe('true');
    const robot = root.querySelector<HTMLButtonElement>('.robot-character')!;
    robot.dispatchEvent(new Event('pointerenter'));
    fixture.detectChanges();
    expect(root.querySelector('.robot-travel')!.getAttribute('data-roaming')).toBe('false');
    robot.click();
    fixture.detectChanges();
    expect(center.view()).toBe('argus');
    root.querySelector<HTMLButtonElement>('.companion-footer button')!.click();
    fixture.detectChanges();
    expect(center.robotRoaming()).toBe(false);
    center.showView('room');
    fixture.detectChanges();
    vi.advanceTimersByTime(30000);
    fixture.detectChanges();
    expect(root.querySelector('.robot-travel')!.getAttribute('data-roaming')).toBe('false');
  });
  it('keeps the robot still when reduced motion is requested', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    TestBed.overrideProvider(CRISIS_CONFIG, {
      useValue: {
        ...config,
        companion: {
          name: 'Test robot',
          sprite: '/robot.png',
          roamPoints: [
            { x: 78, y: 76, scale: 1 },
            { x: 80, y: 81, scale: 1 },
          ],
        },
      },
    });
    const { fixture, root } = room();
    fixture.detectChanges();
    vi.advanceTimersByTime(30000);
    fixture.detectChanges();
    expect(root.querySelector('.robot-travel')!.getAttribute('data-roaming')).toBe('false');
  });
  it('keeps the same four screens, camera inspection and map mounted through camera moves', () => {
    const { fixture, center, root } = room();
    const screens = [...root.querySelectorAll('.wall-screen')],
      map = root.querySelector('app-crisis-map');
    expect(screens).toHaveLength(4);
    center.showView('news');
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('[data-monitor-first-control]')!.click();
    fixture.detectChanges();
    expect(root.querySelector('.camera-picture')!.classList.contains('magnified')).toBe(true);
    for (const view of ['map', 'room', 'news'] as const) {
      center.showView(view);
      fixture.detectChanges();
    }
    expect([...root.querySelectorAll('.wall-screen')]).toEqual(screens);
    expect(root.querySelectorAll('app-crisis-map')).toHaveLength(1);
    expect(root.querySelector('app-crisis-map')).toBe(map);
    expect(root.querySelector('.camera-picture')!.classList.contains('magnified')).toBe(true);
  });
  it('pins wall evidence and shows assigned crews on both persistent instruments', () => {
    const { fixture, center, root, runtime } = room();
    center.showView('news');
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('[data-report-id="road"]')!.click();
    fixture.detectChanges();
    root.querySelector<HTMLButtonElement>('.report-buttons button')!.click();
    fixture.detectChanges();
    expect(runtime.state().sharedEvidenceIds).toEqual(['road']);
    expect(runtime.commit('inspect', ['road'])).toBe(true);
    fixture.detectChanges();
    expect(root.querySelector('.resource-reading strong')!.textContent?.trim()).toBe('02');
    expect(root.querySelectorAll('.dispatch-beacon')).toHaveLength(1);
    center.showView('map');
    fixture.detectChanges();
    expect(root.querySelector('.shared-briefing')!.textContent).toContain('Water across the road');
    expect(root.querySelector('.location-order')!.textContent).toContain('Inspection assigned');
  });
  it('selects projected markers and cancels stale focus after interrupted camera moves', () => {
    const { fixture, center, root } = room();
    center.showView('map');
    fixture.detectChanges();
    root.querySelectorAll('.hit-area')[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    vi.runAllTimers();
    expect(root.querySelector('.location-inspector h2')!.textContent).toContain('Test hospital');
    expect(document.activeElement).toBe(root.querySelector('.location-inspector h2'));
    center.showView('room');
    fixture.detectChanges();
    center.showView('news');
    fixture.detectChanges();
    const inspect = root.querySelector<HTMLButtonElement>('[data-monitor-first-control]')!;
    inspect.focus();
    vi.runAllTimers();
    expect(document.activeElement).toBe(inspect);
    expect(center.view()).toBe('news');
  });
});
