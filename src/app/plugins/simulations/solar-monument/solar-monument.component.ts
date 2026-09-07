import {
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  DESIGN_CAPTURE,
  DESIGN_CAPTURE_BATCH,
  DESIGN_CHECKS_CHANGE,
} from '../../../shared/engineering/design-simulation.registry';
import {
  isDesignCapture,
  type BlockDesign,
  type DesignCapture,
  type DesignCheck,
} from '../../../shared/engineering/block-design';

@Component({
  selector: 'app-solar-monument',
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
  private readonly onCapture = inject(DESIGN_CAPTURE, { optional: true });
  private readonly onBatch = inject(DESIGN_CAPTURE_BATCH, { optional: true });
  private readonly onChecks = inject(DESIGN_CHECKS_CHANGE, { optional: true });
  private readonly frame = viewChild<ElementRef<HTMLIFrameElement>>('frame');
  readonly ready = signal(false);
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
    });
    effect(() => {
      const design = this.design();
      if (this.ready()) this.send({ type: 'design', design });
    });
    effect(() => {
      const capture = this.restore();
      if (this.ready() && capture) this.send({ type: 'restore', capture });
    });
    effect(() => {
      const active = this.active();
      if (this.ready()) this.send({ type: 'visibility', active });
    });
    effect(() => {
      this.design();
      this.checks();
      const presenting = this.presentation(),
        ready = this.ready();
      this.results.set([]);
      if (ready) this.send({ type: 'presentation', active: presenting });
      if (presenting && ready) this.runReview();
    });
  }
  connect(): void {
    this.send({ type: 'connect' });
  }
  capture(): void {
    if (this.busy() || !this.ready() || this.readOnly() || !this.onCapture) return;
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
    if (data['type'] === 'ready') {
      this.ready.set(true);
      this.status.set(
        'Use Place & time to choose your site. Build your monument and watch its shadow.',
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
