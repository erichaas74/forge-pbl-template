import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import data from '../testing/castle-advanced.fixture.json';
import guidedData from '../testing/castle-guided.fixture.json';
import { requireMission } from '../domain/heist.validation';
import { HEIST_MISSION, HeistRuntime } from '../runtime/heist-runtime.service';
import { HEIST_PERSISTENCE } from '../runtime/heist.persistence';
import { HEIST_MAP_LOADER, HeistComponent } from './heist.component';

// Angular's test bundler flattens lazy chunks. Canvas behavior is covered in the
// real browser; this suite exercises controls through the injected map adapter.
vi.mock('phaser', () => ({}));

const map = { destroy: vi.fn(), zoom: vi.fn(), pan: vi.fn(), home: vi.fn() };
const mapLoader = async () => ({ mountHeistMap: (_parent: unknown, _mission: unknown, _snapshot: unknown, _select: unknown, ready: () => void) => { ready(); return map; } });
describe('Heist workspace controls', () => {
  const mission = requireMission({ ...data, guards: [], gate: { ...data.gate, openSeconds: 60 } });
  beforeEach(() => { TestBed.configureTestingModule({ imports: [HeistComponent], providers: [provideRouter([]), HeistRuntime, { provide: HEIST_MAP_LOADER, useValue: mapLoader }, { provide: HEIST_MISSION, useValue: mission }, { provide: HEIST_PERSISTENCE, useValue: { load: () => [], save: vi.fn() } }] }); });
  it('updates the displayed timeline from runtime revisions and disposes the map', async () => {
    const fixture = TestBed.createComponent(HeistComponent); fixture.detectChanges(); await fixture.whenStable();
    const c = fixture.componentInstance, r = TestBed.inject(HeistRuntime);
    for (const id of ['market', 'gate', 'hall', 'archive', 'bridge', 'river']) r.send({ type: 'node', id });
    r.send({ type: 'pickup', enabled: true });
    for (const q of r.engine.challenges) r.send({ type: 'answer', id: q.id, answer: q.answer, unit: q.unit });
    r.send({ type: 'lock' });
    expect(c.time()).toBe(0); expect(c.targetSecured()).toBe(false); r.advance(20); expect(c.time()).toBe(20);
    r.advance(420); expect(r.engine.mode).toBe('CRISIS');
    expect(c.targetSecured()).toBe(true); expect(c.sceneStatus()?.type).toBe('CRISIS');
    c.selectNode('gate'); expect(c.panel()).toBe('math'); expect(c.activeChallenge()?.id).toBe(mission.crisis.challenge.id);
    fixture.destroy(); expect(map.destroy).toHaveBeenCalled();
  });
  it('retains measurement evidence and requires its verification', () => {
    const fixture = TestBed.createComponent(HeistComponent); const c = fixture.componentInstance;
    c.setTool('Measure'); c.selectNode('entry'); c.selectNode('market');
    expect(c.measurement()?.meters).toBe(90); expect(c.activeChallenge()?.id).toBe('field-measurement');
    expect(c.engine().problems).toContain('Verify your field measurement.');
    c.answer = 90; c.submitMath(); expect(c.feedback()).toContain('Verified'); fixture.destroy();
  });
  it('opens math without preview motion and can reopen a closed crisis drawer', () => {
    const fixture = TestBed.createComponent(HeistComponent), c = fixture.componentInstance;
    c.openMath(mission.math.required[0]); expect(c.drawerOpen()).toBe(true); expect(c.playback()).toBe(false);
    c.closePanel(); expect(c.drawerOpen()).toBe(false);
    c.runtime.engine.mode = 'CRISIS'; c.showPanel('intel');
    expect(c.drawerOpen()).toBe(true); expect(c.panel()).toBe('math'); fixture.destroy();
  });
  it('distinguishes crisis and response events at the same replay timestamp', () => {
    const fixture = TestBed.createComponent(HeistComponent), c = fixture.componentInstance;
    c.runtime.engine.mode = 'SUCCESS'; c.runtime.engine.events = [
      { time: 215, type: 'CRISIS', message: 'Axle damaged' },
      { time: 215, type: 'CRISIS_RESOLVED', message: 'Carry together' },
    ];
    c.jump(215, 0); expect(c.visibleEvents()).toHaveLength(1); expect(c.sceneStatus()?.type).toBe('CRISIS');
    c.jump(215, 1); expect(c.visibleEvents()).toHaveLength(2); expect(c.sceneStatus()?.type).toBe('CRISIS_RESOLVED');
    fixture.destroy();
  });
});

describe('Guided rescue controls', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HeistComponent], providers: [provideRouter([]), HeistRuntime, { provide: HEIST_MAP_LOADER, useValue: mapLoader }, { provide: HEIST_MISSION, useValue: requireMission(guidedData) }, { provide: HEIST_PERSISTENCE, useValue: { load: () => [], save: vi.fn() } }] }));
  it('leads from two paths through three questions and starts only after correct answers', async () => {
    const fixture = TestBed.createComponent(HeistComponent); fixture.detectChanges(); await fixture.whenStable();
    const c = fixture.componentInstance;
    expect(c.drawerOpen()).toBe(true); expect(c.playback()).toBe(false);
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('.route-option')).toHaveLength(2);
    expect(root.textContent).not.toContain('Wait at last waypoint');
    (root.querySelector('.route-option') as HTMLButtonElement).click(); fixture.detectChanges();
    expect(c.engine().plan.pickup).toBe(true); expect(c.selectedRoute()?.id).toBe('courtyard');
    c.nextQuestion(); c.answer = 9; c.submitMath();
    expect(c.feedback()).toContain('Try again'); expect(c.engine().problems.length).toBeGreaterThan(0);
    for (const answer of [90, 45, 20]) { c.answer = answer; c.submitMath(); expect(c.feedback()).toContain('You got it'); c.nextQuestion(); }
    fixture.detectChanges(); expect(c.panel()).toBe('plan'); expect(c.solvedCount()).toBe(3);
    const start = root.querySelector('.lock') as HTMLButtonElement;
    expect(start.disabled).toBe(false); start.click();
    expect(c.engine().mode).toBe('EXECUTING'); expect(c.drawerOpen()).toBe(false);
    fixture.destroy();
  });
  it('keeps both wheel choices hidden until the subtraction is correct and resets to path selection', () => {
    const fixture = TestBed.createComponent(HeistComponent), c = fixture.componentInstance;
    c.chooseRoute('tower');
    for (const q of c.engine().challenges) c.runtime.send({type:'answer', id:q.id, answer:q.answer, unit:q.unit});
    c.runtime.send({type:'lock'}); c.runtime.advance(600); c.openMath(c.mission.crisis.challenge); fixture.detectChanges();
    expect(c.engine().mode).toBe('CRISIS'); expect(fixture.nativeElement.querySelectorAll('.choice')).toHaveLength(0);
    c.answer = 50; c.submitMath(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.choice')).toHaveLength(2);
    expect(fixture.nativeElement.querySelector('#heist-answer')).toBeNull();
    c.respond('repair'); c.runtime.advance(600); expect(c.engine().mode).toBe('SUCCESS');
    c.startReplay(); expect(c.stageLabel()).toBe('Replay'); expect(c.time()).toBe(0);
    c.reset(); expect(c.selectedRoute()).toBeUndefined(); expect(c.panel()).toBe('plan'); expect(c.drawerOpen()).toBe(true);
    fixture.destroy();
  });
});
