import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  untracked,
} from '@angular/core';
import type { CrisisView } from '../domain/crisis.models';
import { CrisisRuntimeService } from '../runtime/crisis-runtime.service';
import { CrisisIconComponent } from './crisis-icon.component';

@Component({
  selector: 'app-crisis-command-panel',
  imports: [CrisisIconComponent],
  templateUrl: './crisis-command-panel.component.html',
  styleUrl: './crisis-command-panel.component.scss',
})
export class CrisisCommandPanelComponent implements OnDestroy {
  readonly runtime = inject(CrisisRuntimeService);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private focusTimer?: ReturnType<typeof setTimeout>;
  readonly active = input(false);
  readonly suggestedActionId = input('');
  readonly navigate = output<CrisisView>();
  readonly selectedActionId = signal('');
  readonly attached = signal<readonly string[]>([]);
  readonly showingLog = signal(false);
  readonly confirmation = signal('');
  readonly selectedAction = computed(() =>
    this.runtime.config.actions.find((action) => action.id === this.selectedActionId()),
  );
  readonly responseOptions = computed(() =>
    this.runtime.config.actions.filter(
      (action) =>
        action.minStage <= this.runtime.state().stage &&
        !this.runtime.state().decisions.some((order) => order.actionId === action.id),
    ),
  );
  readonly pendingOptions = computed(() =>
    this.runtime.config.actions.filter((action) => action.minStage > this.runtime.state().stage),
  );
  readonly attachedEvidence = computed(() =>
    this.runtime.shared().filter((report) => this.attached().includes(report.id)),
  );

  constructor() {
    effect(() => {
      const id = this.suggestedActionId();
      if (this.active() && id && this.runtime.config.actions.some((action) => action.id === id))
        untracked(() => this.selectAction(id));
    });
  }
  selectAction(id: string): void {
    this.selectedActionId.set(id);
    this.attached.set([]);
    this.showingLog.set(false);
    this.confirmation.set('');
    this.reveal('.order-review');
  }
  showResponses(): void {
    this.selectedActionId.set('');
    this.showingLog.set(false);
    this.reveal('.response-options');
  }
  showLog(): void {
    this.selectedActionId.set('');
    this.showingLog.set(true);
    this.reveal('.orders-log');
  }
  attach(id: string): void {
    this.attached.update((ids) =>
      ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id],
    );
  }
  commit(): void {
    const action = this.selectedAction();
    if (
      action &&
      this.runtime.commit(
        action.id,
        this.attachedEvidence().map((report) => report.id),
      )
    ) {
      this.confirmation.set(`${action.crews} ${action.crews === 1 ? 'crew' : 'crews'} dispatched.`);
      this.attached.set([]);
      this.showLog();
    }
  }
  private reveal(selector: string): void {
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      const target = this.element.nativeElement.querySelector<HTMLElement>(selector);
      this.element.nativeElement
        .querySelector<HTMLElement>('.command-panel')
        ?.scrollIntoView({ block: 'start', behavior: 'instant' });
      target?.focus({ preventScroll: true });
    }, 0);
  }
  ngOnDestroy(): void {
    clearTimeout(this.focusTimer);
  }
}
