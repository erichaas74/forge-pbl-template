import {
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DESIGN_CAPTURE,
  DESIGN_CAPTURE_BATCH,
  DESIGN_CHECKS_CHANGE,
  DESIGN_VIEW_REQUEST,
  DESIGN_CHANGE,
  DESIGN_CHROME,
} from '../../../shared/engineering/design-simulation.registry';
import {
  isDesignCapture,
  isBlockDesign,
  type BlockDesign,
  type DesignCapture,
  type DesignCheck,
} from '../../../shared/engineering/block-design';

@Component({
  selector: 'app-solar-monument',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './solar-monument.component.html',
  styleUrl: './solar-monument.component.scss',
})
export class SolarMonumentComponent {
  readonly design = input.required<BlockDesign>();
  readonly restore = input<DesignCapture>();
  readonly checks = input<readonly DesignCheck[]>([]);
  readonly active = input(true);
  readonly presentation = input(false);
  readonly readOnly = input(false);
  readonly building = input(false);
  readonly activity = input('');
  readonly frameHeight = signal(850);
  readonly onChrome = inject(DESIGN_CHROME, { optional: true });
  private readonly toolbar = viewChild<TemplateRef<unknown>>('toolbar');
  private readonly guide = viewChild<TemplateRef<unknown>>('guide');
  readonly toolsOpen = signal(false);
  readonly reviewOpen = signal(false);
  readonly eventSelection = signal('');
  readonly ui = signal({
    date: '',
    clock: '',
    minutes: 720,
    start: 0,
    end: 1440,
    play: 'Play day',
    canPlay: true,
    noon: true,
    sun: true,
    season: '',
    height: 60,
    marks: 0,
    canUndo: false,
    canReturn: false,
    message: '',
    startLabel: 'Sunrise',
    endLabel: 'Sunset',
  });
  private readonly onCapture = inject(DESIGN_CAPTURE, { optional: true });
  private readonly onBatch = inject(DESIGN_CAPTURE_BATCH, { optional: true });
  private readonly onChecks = inject(DESIGN_CHECKS_CHANGE, { optional: true });
  private readonly onView = inject(DESIGN_VIEW_REQUEST, { optional: true });
  private readonly onDesign = inject(DESIGN_CHANGE, { optional: true });
  private readonly frame = viewChild<ElementRef<HTMLIFrameElement>>('frame');
  readonly ready = signal(false);
  private readonly connection = signal(0);
  readonly busy = signal(false);
  readonly reviewing = signal(false);
  readonly status = signal('Loading the monument…');
  readonly results = signal<readonly DesignCapture[]>([]);
  readonly selected = signal(0);
  readonly savedReview = signal('');
  readonly cases = [
    { id: 'march', label: 'March equinox' },
    { id: 'june', label: 'June solstice' },
    { id: 'sept', label: 'September equinox' },
    { id: 'dec', label: 'December solstice' },
  ];
  readonly current = computed<DesignCapture | undefined>(() => this.results()[this.selected()]);
  readonly outcome = computed(() => this.current()?.settings['outcome'] ?? 'unconfigured');
  readonly matches = computed(
    () => this.results().filter((r) => r.settings['outcome'] === 'met').length,
  );
  readonly configured = computed(
    () =>
      this.results().length === 4 &&
      this.results().every((r) => r.settings['outcome'] !== 'unconfigured'),
  );
  readonly recorded = computed(
    () => !!this.results().length && this.savedReview() === this.results()[0].settings['reviewId'],
  );
  private pendingId = '';
  private reviewId = '';
  private contextKey = '';
  private timer?: ReturnType<typeof setTimeout>;
  private reviewTimer?: ReturnType<typeof setTimeout>;
  constructor() {
    const listener = (event: MessageEvent<unknown>) => this.receive(event);
    window.addEventListener('message', listener);
    inject(DestroyRef).onDestroy(() => {
      window.removeEventListener('message', listener);
      clearTimeout(this.timer);
      clearTimeout(this.reviewTimer);
      this.onChrome?.(undefined);
    });
    effect(() => {
      const toolbar = this.toolbar(),
        guide = this.guide();
      if (toolbar && guide) this.onChrome?.({ toolbar, guide });
    });
    effect(() => {
      if (this.connected()) this.send({ type: 'hosted-chrome', active: true });
    });
    effect(() => {
      const design = this.design();
      if (this.connected()) this.send({ type: 'design', design });
    });
    effect(() => {
      const capture = this.restore();
      if (this.connected() && capture) this.send({ type: 'restore', capture });
    });
    effect(() => {
      const active = this.active();
      if (this.connected()) this.send({ type: 'visibility', active });
    });
    effect(() => {
      const activity = this.activity();
      this.eventSelection.set('');
      if (!this.connected()) return;
      clearTimeout(this.timer);
      clearTimeout(this.reviewTimer);
      this.pendingId = '';
      this.reviewId = '';
      this.busy.set(false);
      this.reviewing.set(false);
      this.send({ type: 'design', design: untracked(this.design) });
      this.send({ type: 'lesson', activity });
      const capture = untracked(this.restore);
      if (capture) this.send({ type: 'restore', capture });
      this.status.set(
        activity.startsWith('sundial-')
          ? 'Play day to follow your post’s shadow. Your sundial and its marks save automatically.'
          : 'Build your monument, then Show Sun. Play day follows sunrise to sunset.',
      );
    });
    effect(() => {
      const readOnly = this.readOnly(),
        building = this.building();
      if (this.connected()) {
        this.send({ type: 'view-policy', readOnly });
        this.send({ type: 'build-view', building: building && !readOnly });
      }
    });
    effect(() => {
      this.design();
      this.checks();
      const presenting = this.presentation(),
        ready = this.connected();
      this.results.set([]);
      if (ready) this.send({ type: 'presentation', active: presenting });
      if (presenting && ready) this.runReview();
    });
  }
  private connected(): boolean {
    this.connection();
    return this.ready();
  }
  connect(): void {
    this.send({ type: 'connect' });
  }
  command(action: string, value?: number | string): void {
    if (!this.ready()) return;
    this.send({ type: 'toolbar-action', action, value });
  }
  event(value: string): void {
    this.eventSelection.set(value);
    if (
      this.presentation() &&
      ['nearby-before', 'nearby-after', 'special-return'].includes(value)
    ) {
      if (value === 'special-return') this.viewCase(this.selected());
      else this.viewNearby(value === 'nearby-before' ? -7 : 7);
    } else if (this.presentation() && this.cases.some((c) => c.id === value)) {
      this.viewCase(this.cases.findIndex((c) => c.id === value));
    } else this.command(value);
    if (!this.presentation()) queueMicrotask(() => this.eventSelection.set(''));
  }
  capture(): void {
    if (this.busy() || !this.ready() || this.readOnly() || !this.onCapture) return;
    this.onView?.('observe');
    this.pendingId = crypto.randomUUID();
    this.busy.set(true);
    this.send({ type: 'capture', id: this.pendingId, design: this.design() });
    this.timer = setTimeout(() => {
      this.busy.set(false);
      this.pendingId = '';
      this.status.set('The lab did not return a trial. Try again once the canvas has loaded.');
    }, 10000);
  }
  runReview(): void {
    if (!this.ready()) return;
    clearTimeout(this.reviewTimer);
    this.reviewId = crypto.randomUUID();
    this.results.set([]);
    this.reviewing.set(true);
    this.send({ type: 'review', id: this.reviewId, design: this.design(), checks: this.checks() });
    this.reviewTimer = setTimeout(() => {
      this.reviewing.set(false);
      this.reviewId = '';
      this.status.set(
        'The seasonal comparison did not load. Select Recheck all four dates to try again.',
      );
    }, 10000);
  }
  viewCase(index: number): void {
    this.selected.set((index + 4) % 4);
    this.eventSelection.set(this.cases[this.selected()].id);
    const capture = this.results()[this.selected()];
    if (capture) this.send({ type: 'restore', capture });
  }
  checkFor(id: string): DesignCheck | undefined {
    return this.checks().find((check) => check.scenarioId === id);
  }
  changeCheck(id: string, field: 'targetId' | 'expectedValue', value: string): void {
    if (this.readOnly() || !this.onChecks) return;
    const check = {
      scenarioId: id,
      targetId: '',
      expectedValue: 'shadow',
      ...this.checkFor(id),
      [field]: value,
    };
    const checks = this.checks().filter((item) => item.scenarioId !== id);
    this.onChecks(check.targetId ? [...checks, check] : checks);
  }
  changeTime(id: string, rule: string, clock?: string): void {
    if (
      this.readOnly() ||
      !this.onChecks ||
      !['noon', 'morning', 'evening', 'clock'].includes(rule)
    )
      return;
    const existing = this.checkFor(id);
    if (!existing) return;
    const parts = clock?.split(':').map(Number);
    const minutes = parts
      ? parts[0] * 60 + parts[1]
      : Number(existing.settings?.['minutes'] ?? 720);
    if (!Number.isFinite(minutes) || minutes < 0 || minutes >= 1440) return;
    this.onChecks(
      this.checks().map((check) =>
        check.scenarioId === id
          ? { ...check, settings: { observationRule: rule, minutes } }
          : check,
      ),
    );
  }
  clockFor(id: string): string {
    const minutes = Number(this.checkFor(id)?.settings?.['minutes'] ?? 720);
    return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
  }
  viewNearby(offset: number): void {
    const capture = this.current();
    if (capture) this.send({ type: 'nearby', capture, offset });
  }
  resultLabel(result: DesignCapture | undefined): string {
    switch (result?.settings['outcome']) {
      case 'met':
        return 'Matches expectation';
      case 'missed':
        return 'Does not match yet';
      case 'unavailable':
        return 'No direct Sun / no design';
      default:
        return 'Choose a target';
    }
  }
  measurement(result: DesignCapture | undefined, label: string): string {
    return result?.measurements.find((m) => m.label === label)?.value ?? '—';
  }
  recordReview(): void {
    if (!this.configured() || this.recorded() || this.readOnly() || !this.onBatch) return;
    try {
      this.onBatch(this.results());
      this.savedReview.set(String(this.results()[0].settings['reviewId']));
      this.status.set(
        'Four seasonal tests added to your evidence notebook, with this design and its expectations.',
      );
    } catch (error) {
      this.status.set(
        error instanceof Error ? error.message : 'The comparison could not be recorded.',
      );
    }
  }
  private send(payload: Record<string, unknown>): void {
    this.frame()?.nativeElement.contentWindow?.postMessage(
      { channel: 'forge.design-simulation.v1', ...payload },
      window.location.origin,
    );
  }
  private receive(event: MessageEvent<unknown>): void {
    if (
      event.origin !== window.location.origin ||
      event.source !== this.frame()?.nativeElement.contentWindow ||
      !event.data ||
      typeof event.data !== 'object'
    )
      return;
    const data = event.data as Record<string, unknown>;
    if (data['channel'] !== 'forge.design-simulation.v1') return;
    if (data['type'] === 'toolbar-state') {
      const s = data['state'] as Record<string, unknown> | undefined;
      if (
        s &&
        ['date', 'clock', 'play', 'season', 'message', 'startLabel', 'endLabel'].every(
          (k) => typeof s[k] === 'string' && (s[k] as string).length <= 300,
        ) &&
        ['minutes', 'start', 'end', 'height', 'marks'].every(
          (k) =>
            typeof s[k] === 'number' && Number.isFinite(s[k]) && Math.abs(s[k] as number) <= 3000,
        ) &&
        ['canPlay', 'noon', 'sun', 'canUndo', 'canReturn'].every(
          (k) => typeof s[k] === 'boolean',
        ) &&
        Number(s['end']) >= Number(s['start'])
      ) {
        this.ui.set(s as unknown as ReturnType<typeof this.ui>);
      }
      return;
    }
    if (
      data['type'] === 'design-change' &&
      data['activity'] === this.activity() &&
      !this.readOnly() &&
      ['sundial-build', 'sundial-calendar'].includes(this.activity()) &&
      isBlockDesign(data['design'])
    ) {
      try {
        this.onDesign?.(data['design']);
      } catch (error) {
        this.status.set(error instanceof Error ? error.message : 'The sundial could not be saved.');
      }
      return;
    }
    if (
      data['type'] === 'size' &&
      typeof data['height'] === 'number' &&
      Number.isFinite(data['height'])
    ) {
      this.frameHeight.set(Math.ceil(Math.min(2200, Math.max(500, data['height']))) + 2);
    }
    if (
      data['type'] === 'view-request' &&
      (data['view'] === 'observe' || (data['view'] === 'build' && !this.readOnly()))
    ) {
      this.onView?.(data['view']);
    }
    if (data['type'] === 'ready') {
      this.ready.set(true);
      this.connection.update(value => value + 1);
      this.status.set(
        this.activity().startsWith('sundial-')
          ? 'Play day to test your sundial. Your post and marks save automatically.'
          : 'Build your monument, then Show Sun. Play day follows the Sun from sunrise to sunset.',
      );
      this.send({ type: 'design', design: this.design() });
    }
    if (
      data['type'] === 'context' &&
      typeof data['key'] === 'string' &&
      data['key'] !== this.contextKey
    ) {
      this.contextKey = data['key'];
      this.results.set([]);
      if (this.presentation() && this.ready()) this.runReview();
    }
    if (data['type'] === 'review-error' && data['id'] === this.reviewId) {
      clearTimeout(this.reviewTimer);
      this.reviewing.set(false);
      this.status.set(
        'The comparison could not be calculated. Check the location and year, then recheck.',
      );
    }
    if (
      data['type'] === 'review' &&
      data['id'] === this.reviewId &&
      Array.isArray(data['captures']) &&
      data['captures'].length === 4 &&
      data['captures'].every(
        (capture: unknown, i: number) =>
          isDesignCapture(capture) &&
          capture.pluginId === 'simulation.solar-monument' &&
          capture.id === this.reviewId + ':' + this.cases[i].id &&
          capture.settings['scenarioId'] === this.cases[i].id &&
          ['met', 'missed', 'unavailable', 'unconfigured'].includes(
            String(capture.settings['outcome']),
          ) &&
          JSON.stringify(capture.design) === JSON.stringify(this.design()),
      )
    ) {
      clearTimeout(this.reviewTimer);
      this.reviewing.set(false);
      this.results.set(data['captures'] as DesignCapture[]);
      this.viewCase(this.selected());
    }
    if (
      data['type'] === 'capture' &&
      isDesignCapture(data['capture']) &&
      data['capture'].id === this.pendingId
    ) {
      clearTimeout(this.timer);
      this.busy.set(false);
      this.pendingId = '';
      try {
        this.onCapture?.(data['capture']);
        this.status.set('Trial added to your evidence notebook.');
      } catch (error) {
        this.status.set(
          error instanceof Error ? error.message : 'This trial could not be recorded.',
        );
      }
    }
  }
}
