import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import type { CrisisWorkstation } from '../domain/crisis.models';
import { CrisisRuntimeService } from '../runtime/crisis-runtime.service';
import { CrisisIconComponent } from './crisis-icon.component';
import { CrisisConsoleComponent } from './crisis-console.component';

@Component({
  selector: 'app-crisis-conference',
  imports: [CrisisIconComponent, CrisisConsoleComponent],
  templateUrl: './crisis-conference.component.html',
  styleUrl: './crisis-conference.component.scss',
})
export class CrisisConferenceComponent implements OnDestroy {
  readonly runtime = inject(CrisisRuntimeService);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly workstation = input.required<CrisisWorkstation>();
  readonly leave = output<void>();
  readonly locate = output<string>();
  readonly call = computed(() => this.workstation().conference!);
  readonly selectedId = signal('');
  readonly selected = computed(
    () =>
      this.call().participants.find((person) => person.id === this.selectedId()) ??
      this.call().participants[0],
  );
  readonly gallery = signal(false);
  readonly captions = signal(true);
  readonly sharing = signal(false);
  readonly panel = signal<'people' | 'reports' | ''>('');
  readonly failedPortraits = signal<readonly string[]>([]);
  readonly update = computed(() =>
    this.runtime.reports().find((report) => this.selected().evidenceIds.includes(report.id)),
  );
  private focusTimer?: ReturnType<typeof setTimeout>;
  selectParticipant(id: string): void {
    this.selectedId.set(id);
    this.gallery.set(false);
    this.sharing.set(false);
  }
  togglePanel(panel: 'people' | 'reports'): void {
    this.panel.set(this.panel() === panel ? '' : panel);
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(
      () =>
        this.element.nativeElement
          .querySelector<HTMLElement>(
            this.panel() ? '.call-sidebar h2' : `[data-call-panel="${panel}"]`,
          )
          ?.focus({ preventScroll: true }),
      0,
    );
  }
  initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('');
  }
  portraitFailed(id: string): void {
    this.failedPortraits.update((ids) => [...ids, id]);
  }
  ngOnDestroy(): void {
    clearTimeout(this.focusTimer);
  }
}
