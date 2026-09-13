import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, InjectionToken, ViewChild, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import type { Challenge, Point } from '../domain/heist.models';
import { distance, location, position, verified } from '../domain/heist.timeline';
import { HeistRuntime } from '../runtime/heist-runtime.service';
import type { HeistMap } from '../game/heist-map';
export const HEIST_MAP_LOADER = new InjectionToken<() => Promise<Pick<typeof import('../game/heist-map'), 'mountHeistMap'>>>('HEIST_MAP_LOADER', {
  providedIn: 'root', factory: () => () => import('../game/heist-map'),
});
@Component({
  selector: 'app-heist', imports: [FormsModule, RouterLink], templateUrl: './heist.component.html', styleUrls: ['./heist.component.scss', './heist-guided.scss'], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeistComponent implements AfterViewInit {
  readonly Math = Math;
  readonly runtime = inject(HeistRuntime);
  readonly mission = this.runtime.mission;
  readonly guided = !!this.mission.guidance;
  readonly engine = computed(() => { this.runtime.revision(); return this.runtime.engine; }, { equal: () => false });
  readonly tools = this.guided ? [] : ['Inspect', 'Measure', 'Route', 'Pan'];
  readonly tool = signal('Inspect');
  readonly selected = signal(this.mission.entry);
  readonly detail = computed(() => location(this.mission, this.selected()));
  readonly security = signal(true);
  readonly reducedMotion = signal(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  readonly ready = signal(false);
  readonly mapError = signal('');
  readonly mapWarning = signal('');
  readonly drawerOpen = signal(this.guided);
  readonly previewTime = signal(0);
  readonly replay = signal(false);
  readonly replayEvent = signal<number | undefined>(undefined);
  readonly visibleEvents = computed(() => {
    const cursor = this.replayEvent(), events = this.engine().events;
    return this.replay() && cursor !== undefined ? events.slice(0, cursor + 1) : events;
  }, { equal: () => false });
  readonly paused = signal(true);
  readonly playback = signal(!this.guided);
  readonly measurement = computed(() => this.engine().measurement);
  readonly measureStart = signal<Point | undefined>(undefined);
  readonly panel = signal<'intel' | 'plan' | 'math' | 'results'>(this.guided ? 'plan' : 'intel');
  readonly activeChallenge = signal<Challenge | undefined>(undefined);
  readonly feedback = signal('');
  readonly showHint = signal(false);
  readonly selectedRoute = computed(() => this.mission.guidance?.routes.find(r => r.nodes.join('|') === this.engine().plan.nodes.join('|')));
  readonly solvedCount = computed(() => this.engine().challenges.filter(q => verified(q, this.engine().plan)).length);
  readonly questionNumber = computed(() => this.engine().challenges.findIndex(q => q.id === this.activeChallenge()?.id) + 1);
  readonly guideStep = computed(() => !this.engine().editable ? 3 : this.selectedRoute() ? 2 : 1);
  readonly stageLabel = computed(() => this.replay() ? 'Replay' : ({ RECON: 'Choose a path', PLANNING: 'Make your plan', EXECUTING: this.paused() ? 'Game paused' : 'Rescue in progress', CRISIS: 'Help your team', SUCCESS: 'Books saved!', FAILURE: 'Try again' })[this.engine().mode]);
  readonly speed = signal(4);
  readonly debug = new URLSearchParams(globalThis.location?.search ?? '').get('heistDebug') === 'true';
  readonly compatibility = new URLSearchParams(globalThis.location?.search ?? '').get('heistRenderer') === 'canvas';
  answer: number | null = null;
  waitSeconds = 0;
  readonly time = computed(() => this.engine().editable || this.replay() ? this.previewTime() : this.engine().time);
  readonly gateOpen = computed(() => this.time() % this.mission.gate.cycle < this.mission.gate.openSeconds);
  readonly targetSecured = computed(() => this.visibleEvents().some(e => e.type === 'TARGET_SECURED' && e.time <= this.time()));
  readonly currentAction = computed(() => (this.engine().editable ? this.engine().predicted : this.engine().actual).find(a => a.start <= this.time() && this.time() < a.end));
  readonly sceneStatus = computed(() => this.visibleEvents().filter(e => e.time <= this.time() && ['CRISIS', 'CRISIS_RESOLVED', 'TARGET_SECURED', 'NEAR_MISS', 'DETECTED', 'FAILED', 'EXTRACTED'].includes(e.type) && (this.time() - e.time < 8 || ['CRISIS', 'FAILED', 'EXTRACTED'].includes(e.type))).at(-1));
  readonly positionLabel = computed(() => { const p = position(this.mission, this.engine().actual, this.time()); return `Team coordinates: ${p.x.toFixed(0)}, ${p.y.toFixed(0)}`; });
  @ViewChild('mapHost', { static: true }) private mapHost!: ElementRef<HTMLElement>;
  @ViewChild('detailPanel') private detailPanel?: ElementRef<HTMLElement>;
  private map?: HeistMap;
  private readonly loadMap = inject(HEIST_MAP_LOADER);
  private disposed = false;
  private timer?: ReturnType<typeof setInterval>;
  private accumulator = 0;
  constructor() {
    inject(DestroyRef).onDestroy(() => { this.disposed = true; if (this.timer) clearInterval(this.timer); this.runtime.checkpoint(); this.map?.destroy(); });
  }
  async ngAfterViewInit(): Promise<void> {
    if (this.engine().mode === 'CRISIS') this.openMath(this.mission.crisis.challenge);
    else if (this.engine().mode === 'EXECUTING') this.panel.set('plan');
    else if (this.engine().mode === 'SUCCESS' || this.engine().mode === 'FAILURE') this.showPanel('results');
    try {
      const { mountHeistMap } = await this.loadMap();

      if (this.disposed) return;
      this.map = mountHeistMap(this.mapHost.nativeElement, this.mission, () => ({ revision: this.runtime.revision(), time: this.time(), actions: this.replay() || !this.engine().editable ? this.engine().actual : this.engine().predicted, plan: this.engine().plan, events: this.visibleEvents(), mode: this.engine().mode, response: this.engine().response, selected: this.selected(), security: this.security(), tool: this.tool(), measurement: this.measurement(), measureStart: this.measureStart(), executing: this.engine().mode === 'EXECUTING' && !this.replay(), reducedMotion: this.reducedMotion(), cameraLocked: this.drawerOpen() || this.paused(), replay: this.replay() }), p => this.mapClick(p), warning => { this.ready.set(true); this.mapWarning.set(warning ?? ''); }, message => this.mapError.set(message), this.compatibility);
    } catch { this.mapError.set('The Phaser map could not start. Reload this project in a browser with canvas support.'); }
    this.timer = setInterval(() => this.tick(), 100);
  }
  private tick(): void {
    if (document.hidden) return;
    const e = this.engine();
    if (e.editable && this.playback()) { this.previewTime.set((this.previewTime() + this.speed() / 10) % this.mission.deadline); return; }
    if (this.replay() && this.playback()) { this.replayEvent.set(undefined); const end = e.time; this.previewTime.set(Math.min(end, this.previewTime() + this.speed() / 10)); if (this.previewTime() >= end) this.playback.set(false); }
    else if (e.mode === 'EXECUTING' && !this.paused()) {
      this.accumulator += this.speed() / 10;
      if (this.accumulator < 0.1) return;
      const delta = Math.floor((this.accumulator + 1e-8) * 10) / 10; this.accumulator -= delta;
      this.runtime.advance(Math.min(this.mission.deadline + 1, e.time + delta));
      if (this.engine().mode === 'CRISIS') { this.openMath(this.mission.crisis.challenge); this.paused.set(true); }
      if (this.engine().mode === 'SUCCESS' || this.engine().mode === 'FAILURE') { this.showPanel('results'); this.focusPanel(); }
    }
  }
  setTool(tool: string): void {
    this.tool.set(this.guided && tool === 'Route' ? 'Inspect' : tool); this.feedback.set('');
    if (tool === 'Route') { this.runtime.send({ type: 'plan' }); this.showPanel('plan'); this.playback.set(false); this.previewTime.set(0); }
    if (tool === 'Measure') this.measureStart.set(undefined);
  }
  mapClick(p: Point): void {
    if (this.tool() === 'Measure' && this.engine().editable) {
      const start = this.measureStart();
      if (!start) { this.measureStart.set(p); this.feedback.set('Choose the second measurement point.'); }
      else { if (this.runtime.send({ type: 'measure', from: start, to: p })) { this.measureStart.set(undefined); this.openMath(this.engine().measurementChallenge!); } }
      return;
    }
    const nearest = this.mission.locations.find(n => distance(n, p) < 30);
    if (nearest) this.selectNode(nearest.id);
  }
  selectNode(id: string): void {
    this.selected.set(id);
    if (this.engine().mode === 'CRISIS') { this.openMath(this.mission.crisis.challenge); return; }
    if (this.tool() === 'Route' && this.engine().editable) this.runtime.send({ type: 'node', id });
    else if (this.tool() === 'Measure' && this.engine().editable) { this.mapClick(location(this.mission, id)); return; }
    else { this.panel.set('intel'); if (this.tool() === 'Inspect') this.map?.focus?.(location(this.mission, id)); }
    this.focusPanel();
  }
  addWait(): void { this.runtime.send({ type: 'wait', index: this.engine().plan.nodes.length - 1, seconds: this.waitSeconds }); }
  chooseRoute(id: string): void {
    if (this.runtime.send({ type: 'route', id })) {
      this.previewTime.set(0); this.playback.set(false); this.tool.set('Inspect'); this.activeChallenge.set(undefined);
      this.panel.set('plan'); this.feedback.set(''); this.map?.home(); this.focusPanel();
    }
  }
  nextQuestion(): void {
    const next = this.engine().challenges.find(q => !this.isVerified(q));
    if (next) this.openMath(next); else { this.panel.set('plan'); this.focusPanel(); }
  }
  pickup(enabled: boolean): void { this.runtime.send({ type: 'pickup', enabled }); }
  openMath(c: Challenge): void { this.activeChallenge.set(c); this.answer = null; this.feedback.set(''); this.showHint.set(false); this.playback.set(false); this.panel.set('math'); this.focusPanel(); }
  submitMath(): void {
    const q = this.activeChallenge(); if (!q || this.answer === null) { this.feedback.set('Enter a number before checking.'); return; }
    if (this.runtime.send({ type: 'answer', id: q.id, answer: this.answer, unit: q.unit })) this.feedback.set(this.isVerified(q) ? this.guided ? 'You got it! Your answer is saved.' : 'Verified. Your mathematical evidence is saved.' : `Try again. ${q.hint}`);
    if (this.guided && this.engine().mode === 'CRISIS' && this.isVerified(q)) this.focusPanel();
  }
  isVerified(c: Challenge): boolean { return verified(c, this.engine().plan); }
  attempts(id: string): number { return this.engine().plan.answers[id]?.length ?? 0; }
  lock(): void { if (this.runtime.send({ type: 'lock' })) { this.replay.set(false); this.paused.set(false); this.accumulator = 0; this.panel.set('plan'); this.drawerOpen.set(false); } }
  pause(): void { this.paused.update(v => !v); if (this.paused()) this.runtime.checkpoint(); }
  respond(id: string): void { if (this.runtime.send({ type: 'respond', id })) { this.paused.set(false); this.panel.set('plan'); this.drawerOpen.set(false); this.feedback.set(''); } }
  startReplay(): void { this.replay.set(true); this.replayEvent.set(undefined); this.previewTime.set(0); this.panel.set('results'); this.drawerOpen.set(false); this.playback.set(false); this.map?.home(); }
  reset(): void { if (this.runtime.send({ type: 'reset' })) { this.replay.set(false); this.paused.set(true); this.playback.set(false); this.previewTime.set(0); this.selected.set(this.mission.entry); this.tool.set('Inspect'); this.panel.set(this.guided ? 'plan' : 'intel'); this.activeChallenge.set(undefined); this.feedback.set(''); this.showHint.set(false); this.map?.home(); this.focusPanel(); } }
  zoom(amount: number): void { this.map?.zoom(amount); }
  pan(x: number, y: number): void { this.map?.pan(x, y); }
  overview(): void { this.map?.home(); }
  showPanel(panel: 'intel' | 'plan' | 'results'): void { this.panel.set(this.engine().mode === 'CRISIS' ? 'math' : panel); this.drawerOpen.set(true); }
  closePanel(): void { this.drawerOpen.set(false); }
  jump(time: number, eventIndex?: number): void { if (!this.engine().editable && this.engine().mode !== 'EXECUTING' && this.engine().mode !== 'CRISIS') this.replay.set(true); this.replayEvent.set(eventIndex); this.playback.set(false); this.previewTime.set(time); }
  label(id: string): string { return location(this.mission, id).name; }
  clock(seconds: number): string { return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`; }
  exportEvidence(): void {
    const e = this.engine();
    const payload = { schemaVersion: '1.0', projectId: this.mission.projectId, projectVersion: this.mission.projectVersion, mode: 'local-practice', plan: e.locked ?? e.plan, calculations: e.plan.answers, measurement: this.measurement(), predicted: e.predicted, actual: e.actual, response: e.response, outcome: e.mode, events: e.events };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = `${this.mission.projectId}-evidence.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  private focusPanel(): void {
    this.drawerOpen.set(true);
    setTimeout(() => {
      const panel = this.detailPanel?.nativeElement;
      if (!panel) return;
      panel.scrollTop = 0;
      if (this.guided && window.innerWidth <= 760) panel.scrollIntoView({ block: 'nearest', behavior: this.reducedMotion() ? 'instant' : 'smooth' });
      panel.focus({ preventScroll: true });
    }, 0);
  }
}
