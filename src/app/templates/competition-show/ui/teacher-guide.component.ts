import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, Injector, input, output, signal, viewChild } from '@angular/core';

/**
 * Every choice the show offers lives here. Non-modal on purpose: a host runs the
 * clock from this panel while the stage stays visible, which a dialog would cover.
 */
@Component({
  selector: 'app-teacher-guide', changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button #trigger class="guide-trigger" type="button" [attr.aria-expanded]="open()" aria-controls="teacher-guide-panel"
      (click)="toggle()">{{ open() ? 'Close guide' : '⚙ Teacher guide' }}@if (!open() && badge()) { <span class="badge">{{ badge() }}</span> }</button>
    @if (open()) {
      <aside #panel id="teacher-guide-panel" class="guide" tabindex="-1" aria-label="Teacher guide">
        <header><div><small>TEACHER ONLY</small><h2>{{ title() }}</h2></div>
          <button type="button" (click)="close()" aria-label="Close teacher guide">×</button></header>
        <div class="guide-body"><ng-content /></div>
        <p class="guide-foot">Students never see this panel. Game points stay separate from academic evidence.</p>
      </aside>
    }`,
  styles: [`
    :host{display:block}
    .guide-trigger{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:.6rem 1rem;border:1px solid var(--broadcast-accent,#edc875);border-radius:4px;background:#1a1508;color:var(--broadcast-accent,#edc875);font:inherit;font-size:12px;cursor:pointer}
    .guide-trigger:hover{background:#241d0c}
    .badge{background:var(--broadcast-accent,#edc875);color:#111a28;border-radius:9px;padding:1px 7px;font-size:10px;font-weight:700}
    .guide{margin-top:12px;border:1px solid #6d5a33;border-left:3px solid var(--broadcast-accent,#edc875);background:#12100a;padding:0 0 4px}
    .guide:focus{outline:none}
    header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:16px 20px;border-bottom:1px solid #332c18}
    header small{display:block;color:var(--broadcast-accent,#edc875);font-size:9px;letter-spacing:2px}
    h2{font-size:19px;font-weight:500;margin:6px 0 0;color:#f4ecd8}
    header button{min-height:36px;min-width:36px;border:1px solid #5d4f2e;border-radius:4px;background:#1d1809;color:#e7dcc0;font-size:18px;line-height:1;cursor:pointer}
    .guide-body{padding:4px 20px}
    .guide-foot{margin:4px 20px 12px;font-size:11px;color:#96886a}
    :is(button,input,textarea,select):focus-visible{outline:2px solid #f1d89b;outline-offset:3px}
    @media(max-width:700px){.guide-body{padding:4px 12px}header{padding:12px}}
  `],
})
export class TeacherGuideComponent {
  readonly title = input('Teacher guide');
  /** Count of actions waiting on the host, shown on the closed trigger. */
  readonly badge = input(0);
  readonly opened = output<boolean>();
  readonly open = signal(false);
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private readonly trigger = viewChild<ElementRef<HTMLButtonElement>>('trigger');
  private readonly injector = inject(Injector);
  toggle(): void {
    this.open.update(value => !value); this.opened.emit(this.open());
    if (this.open()) afterNextRender(() => this.panel()?.nativeElement.focus({ preventScroll: true }), { injector: this.injector });
  }
  close(): void {
    if (!this.open()) return;
    this.open.set(false); this.opened.emit(false); this.trigger()?.nativeElement.focus({ preventScroll: true });
  }
}
