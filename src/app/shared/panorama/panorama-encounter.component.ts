import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, computed, inject, input, output, signal, viewChild } from '@angular/core';
import { PANORAMA_INTERVIEW } from './panorama-interview.adapter';
import { PanoramaPaintingComponent, clipRect } from './panorama-painting.component';
import { renderPanoramaPainting } from './panorama-export';
import { downloadFile } from '../restoration/restoration-export';
import { SphericalViewComponent } from './spherical-view.component';
import type { PanoramaAction, PanoramaDefinition, PanoramaPerson, PanoramaState } from './panorama.models';

@Component({
  selector: 'app-panorama-encounter', imports: [PanoramaPaintingComponent, SphericalViewComponent],
  templateUrl: './panorama-encounter.component.html', styleUrl: './panorama-encounter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanoramaEncounterComponent {
  readonly scene = input.required<PanoramaDefinition>(); readonly state = input.required<PanoramaState>();
  readonly action = output<PanoramaAction>();
  readonly tutorRequested = output<void>();
  readonly sphereView = viewChild(SphericalViewComponent);
  readonly adapter = inject(PANORAMA_INTERVIEW);
  readonly mode = signal<'painting' | 'panorama' | 'approach' | 'interview'>('painting');
  readonly heading = signal(50); readonly personId = signal(''); readonly question = signal('');
  readonly person = computed(() => this.scene().people.find(p => p.id === this.personId()));
  readonly conversation = computed(() => this.state().conversations[this.personId()] ?? []);
  readonly sourceId = signal(''); readonly source = computed(() => this.scene().sources.find(s => s.id === this.sourceId()));
  readonly sourceZoom = signal(false); readonly repairId = signal('');
  readonly repair = computed(() => this.scene().repairs.find(r => r.id === this.repairId()));
  readonly notebook = signal(false); readonly original = signal(false); readonly repairMode = signal(false);
  readonly busy = signal(false); readonly status = signal(''); readonly videoFailed = signal(false);
  readonly repairCount = computed(() => this.scene().repairs.filter(r => this.state().repairs[r.id]).length);
  readonly view = viewChild<ElementRef<HTMLElement>>('view'); readonly messages = viewChild<ElementRef<HTMLElement>>('messages');
  readonly sourceDialog = viewChild<ElementRef<HTMLDialogElement>>('sourceDialog');
  readonly clip = clipRect;
  private request?: AbortController; private focusTimer?: ReturnType<typeof setTimeout>;
  private drag?: { x: number; heading: number; width: number }; private dragged = false;
  constructor() { inject(DestroyRef).onDestroy(() => { this.request?.abort(); if (this.focusTimer) clearTimeout(this.focusTimer); }); }
  private focus(): void { if (this.focusTimer) clearTimeout(this.focusTimer); this.focusTimer = setTimeout(() => { const view = this.view()?.nativeElement; view?.scrollIntoView?.({ block: 'start', behavior: 'instant' }); view?.focus({ preventScroll: true }); }); }
  sourceTitle(id: string): string { return this.scene().sources.find(s => s.id === id)?.title ?? 'Historical evidence'; }
  selectSphericalPerson(id: string): void {
    const person = this.scene().people.find(p => p.id === id); if (!person) return;
    this.personId.set(id); this.action.emit({ type: 'visit', personId: id });
    this.status.set(`${person.name} selected. Questions belong in the AI box.`);
    const closeView = this.scene().viewpoints?.find(v => v.people.length === 1 && v.people[0].personId === id);
    if (closeView && this.sphereView()?.active().id !== closeView.id) this.sphereView()?.choose(closeView.id);
  }
  enter(): void { this.heading.set(this.state().heading); this.mode.set('panorama'); this.sourceId.set(''); this.repairId.set(''); this.focus(); }
  leave(): void { this.cancel(); this.mode.set('painting'); this.sourceId.set(''); this.repairMode.set(true); this.focus(); }
  pan(amount: number): void { this.heading.update(h => Math.max(0, Math.min(100, h + amount))); }
  saveHeading(): void { this.action.emit({ type: 'view', heading: this.heading() }); }
  pointerDown(e: PointerEvent): void { if (e.button !== 0) return; this.drag = { x: e.clientX, heading: this.heading(), width: e.currentTarget instanceof HTMLElement ? e.currentTarget.clientWidth : 1000 }; this.dragged = false; }
  pointerMove(e: PointerEvent): void { if (!this.drag) return; const delta = e.clientX - this.drag.x; if (Math.abs(delta) > 5) this.dragged = true; if (this.dragged) this.heading.set(Math.max(0, Math.min(100, this.drag.heading - delta / this.drag.width * 90))); }
  pointerEnd(): void { if (this.drag) this.saveHeading(); this.drag = undefined; }
  key(e: KeyboardEvent): void {
    if (this.mode() !== 'panorama') return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); this.pan(e.key === 'ArrowLeft' ? -10 : 10); this.saveHeading(); }
  }
  approach(p: PanoramaPerson): void {
    if (this.scene().questionOwner === 'tutor') { this.selectSphericalPerson(p.id); return; }
    if (this.dragged) { this.dragged = false; return; }
    this.saveHeading(); this.personId.set(p.id); this.mode.set('approach'); this.videoFailed.set(false); this.question.set(''); this.status.set('');
    this.action.emit({ type: 'visit', personId: p.id }); this.focus();
  }
  talk(): void { this.mode.set('interview'); this.focus(); }
  returnToScene(): void { this.cancel(); this.sourceId.set(''); this.mode.set('panorama'); this.focus(); }
  private cancel(): void { this.request?.abort(); this.request = undefined; this.busy.set(false); }
  async ask(question = this.question()): Promise<void> {
    const p = this.person(), value = question.trim(); if (!p || !value || value.length > 600 || this.busy()) return;
    const request = new AbortController(); this.request = request; this.busy.set(true); this.status.set(''); this.question.set(value);
    try {
      const answer = await this.adapter.answer(this.scene(), p, value, this.conversation(), request.signal);
      if (request.signal.aborted) return;
      if (answer.role !== 'character' || !answer.text?.trim() || answer.text.length > 2500 || !Array.isArray(answer.sourceIds) || answer.sourceIds.some(id => !this.scene().sources.some(s => s.id === id))) throw new Error('Invalid interview response');
      this.action.emit({ type: 'conversation', personId: p.id, question: value, answer }); this.question.set('');
      setTimeout(() => { const messages = this.messages()?.nativeElement; if (messages) messages.scrollTop = messages.scrollHeight; });
    } catch { if (!request.signal.aborted) this.status.set('The interview could not answer. Your question is retained; please retry.'); }
    finally { if (this.request === request) { this.busy.set(false); this.request = undefined; } }
  }
  inspectSource(id: string): void {
    this.sourceId.set(id); this.sourceZoom.set(false);
    if (this.focusTimer) clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => this.sourceDialog()?.nativeElement.showModal());
  }
  closeSource(): void { this.sourceDialog()?.nativeElement.close(); this.sourceId.set(''); }
  async download(): Promise<void> {
    this.status.set('Preparing picture…');
    try {
      const canvas = await renderPanoramaPainting(this.scene(), this.state());
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error('Export failed')), 'image/png'));
      downloadFile(blob, `${this.scene().id}-restoration.png`); this.status.set('Restoration image downloaded.');
    } catch { this.status.set('The picture could not export. Your draft remains saved; retry when the artwork loads.'); }
  }
  downloadNotebook(): void { downloadFile(new Blob([JSON.stringify({ scene: this.scene().title, ...this.state() }, null, 2)], { type: 'application/json' }), `${this.scene().id}-field-notebook.json`); }
}
