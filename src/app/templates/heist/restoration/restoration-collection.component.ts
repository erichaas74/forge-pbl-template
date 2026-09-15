import { bindLessonFocus } from '../../../shared/project-lessons/project-lesson-focus';
import { WorkspaceToolsComponent } from '../../../shared/project-lessons/workspace-tools.component';
import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EncounterComponent } from '../../../shared/encounters/encounter.component';
import type { EncounterAction } from '../../../shared/encounters/encounter.models';
import { initialEncounterState } from '../../../shared/encounters/encounter.engine';
import { PaintingCanvasComponent } from '../../../shared/restoration/painting-canvas.component';
import { RestorationEditorComponent } from '../../../shared/restoration/restoration-editor.component';
import { initialRestoration, selectedRepair } from '../../../shared/restoration/restoration.engine';
import type { RestorationAction } from '../../../shared/restoration/restoration.models';
import { comparisonImage, downloadFile, escapeHtml, renderRestoration } from '../../../shared/restoration/restoration-export';
import { AcademicLockComponent } from '../gallery/ui/academic-lock.component';
import type { LockAnswer } from '../gallery/domain/gallery.models';
import { collectionReady } from './restoration-collection.engine';
import { RestorationCollectionRuntime } from './restoration-collection.runtime';
import type { RestorationCommission } from './restoration-collection.models';

@Component({ selector: 'app-restoration-collection', imports: [WorkspaceToolsComponent,FormsModule, PaintingCanvasComponent, RestorationEditorComponent, EncounterComponent, AcademicLockComponent], templateUrl: './restoration-collection.component.html', styleUrl: './restoration-collection.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class RestorationCollectionComponent {
  readonly runtime = inject(RestorationCollectionRuntime); readonly mission = this.runtime.mission;
  readonly state = computed(() => { this.runtime.revision(); return this.runtime.engine.state; });
  readonly page = signal<'collection' | 'studio' | 'ledger' | 'heist'>('collection');
  readonly work = computed(() => this.mission.works.find(w => w.id === this.state().workId));
  readonly workState = computed(() => this.work() ? this.state().works[this.work()!.id] ?? initialRestoration() : initialRestoration());
  readonly completed = computed(() => this.mission.works.filter(w => this.state().works[w.id]?.verified).length);
  readonly ready = computed(() => collectionReady(this.mission, this.state()));
  readonly nextWork = computed(() => this.mission.works.find(w => !this.state().works[w.id]?.verified));
  readonly nextLock = computed(() => this.mission.sourceGallery.locks.find(l => l.id === this.mission.finalLockIds.find(id => !this.state().solvedLocks.includes(id))));
  readonly encounter = computed(() => this.mission.sourceGallery.encounters?.find(e => e.id === this.state().activeEncounterId));
  readonly portal = computed(() => this.mission.sourceGallery.encounters?.find(e => e.id === this.work()?.encounterId));
  readonly encounterState = computed(() => this.encounter() ? this.state().encounters[this.encounter()!.id] ?? initialEncounterState(this.encounter()!) : undefined);
  readonly sourceIds = computed(() => this.page() === 'heist' ? this.nextLock()?.evidenceIds ?? [] : this.work()?.regions.flatMap(r => r.evidenceIds) ?? []);
  readonly sourceList = computed(() => [...this.mission.sourceGallery.evidence].sort((a, b) => Number(this.sourceIds().includes(b.id)) - Number(this.sourceIds().includes(a.id))));
  readonly researchOpen = signal(false); readonly resetOpen = signal(false); readonly downloadBusy = signal(false); readonly message = signal('');
  readonly label = signal(this.state().museumLabel); readonly lockDrafts = signal<Record<string, LockAnswer>>({});
  readonly editor = viewChild(RestorationEditorComponent); readonly lockEditor = viewChild(AcademicLockComponent);
  readonly researchDialog = viewChild<ElementRef<HTMLDialogElement>>('researchDialog'); readonly storyDialog = viewChild<ElementRef<HTMLDialogElement>>('storyDialog'); readonly resetDialog = viewChild<ElementRef<HTMLDialogElement>>('resetDialog');
  readonly heading = viewChild<ElementRef<HTMLElement>>('pageHeading');
  private previousFocus?: HTMLElement;
  constructor() {
    bindLessonFocus((lesson) => {
      const target = lesson.focusTarget;
      if (target === 'studio') {
        const work = this.work() ?? this.nextWork();
        if (work) this.open(work);
      } else if (target === 'ledger' || target === 'heist') this.go(target);
    });
    if (this.state().heistStarted) this.page.set('heist'); else if (this.state().workId) this.page.set('studio');
    effect(() => { if (this.researchOpen()) this.researchDialog()?.nativeElement.showModal(); else this.researchDialog()?.nativeElement.close(); });
    effect(() => { if (this.encounter()) this.storyDialog()?.nativeElement.showModal(); else this.storyDialog()?.nativeElement.close(); });
    effect(() => { if (this.resetOpen()) this.resetDialog()?.nativeElement.showModal(); else this.resetDialog()?.nativeElement.close(); });
  }
  saveContext(): void { this.editor()?.save(); const lock = this.nextLock(); if (this.page() === 'heist' && lock && this.lockEditor()) this.lockDrafts.update(v => ({ ...v, [lock.id]: this.lockEditor()!.answer() })); this.saveLabel(); }
  saveLabel(): void { this.runtime.send({ type: 'museum-label', text: this.label() }); }
  go(page: 'collection' | 'studio' | 'ledger' | 'heist'): void { this.saveContext(); this.page.set(page); this.focusHeading(); }
  open(work: RestorationCommission): void { this.saveContext(); this.runtime.send({ type: 'open', workId: work.id }); this.page.set('studio'); this.focusHeading(); }
  repair(action: RestorationAction): void { const work = this.work(); if (work) this.runtime.send({ type: 'repair', workId: work.id, action }); }
  stateFor(id: string) { return this.state().works[id] ?? initialRestoration(); }
  optionLabel(w: RestorationCommission, id: string): string { return selectedRepair(w.regions.find(r => r.id === id)!, this.stateFor(w.id)).label; }
  sourceTitle(id?: string): string { return this.mission.sourceGallery.evidence.find(s => s.id === id)?.title ?? 'No reference attached'; }
  lockTitle(id: string): string { return this.mission.sourceGallery.locks.find(l => l.id === id)?.title ?? id; }
  research(): void { this.saveContext(); this.previousFocus = document.activeElement as HTMLElement; this.researchOpen.set(true); }
  closeResearch(): void { this.researchOpen.set(false); this.restoreFocus(); }
  enterStory(): void { const portal = this.portal(); if (!portal) return; this.saveContext(); this.previousFocus = document.activeElement as HTMLElement; this.runtime.send({ type: 'encounter', encounterId: portal.id, action: { type: 'enter' } }); }
  storyAction(action: EncounterAction): void { if (this.encounter()) this.runtime.send({ type: 'encounter', encounterId: this.encounter()!.id, action }); }
  leaveStory(): void { this.storyAction({ type: 'exit' }); this.restoreFocus(); }
  startHeist(): void { this.saveContext(); if (this.runtime.send({ type: 'start-heist' })) { this.page.set('heist'); this.focusHeading(); } }
  operate(answer: LockAnswer): void { const lock = this.nextLock(); if (lock && this.runtime.send({ type: 'operate', lockId: lock.id, answer })) { this.message.set(this.runtime.engine.events.at(-1)!.message); this.focusHeading(); } }
  extract(): void { this.saveContext(); if (this.runtime.send({ type: 'extract' })) this.message.set(this.runtime.engine.events.at(-1)!.message); }
  reset(): void { this.runtime.reset(); this.label.set(''); this.message.set(''); this.page.set('collection'); this.resetOpen.set(false); this.focusHeading(); }
  downloadLedger(): void { this.saveContext(); downloadFile(new Blob([JSON.stringify(this.runtime.engine.dossier(), null, 2)], { type: 'application/json' }), `${this.mission.projectId}-restoration-ledger.json`); }
  async downloadComparison(): Promise<void> { const work = this.work(); if (!work) return; this.saveContext(); this.downloadBusy.set(true); try { downloadFile(await comparisonImage(work, this.workState()), `${work.id}-before-after.png`); } catch (e) { this.message.set(e instanceof Error ? e.message : 'Image export failed.'); } finally { this.downloadBusy.set(false); } }
  async downloadExhibition(): Promise<void> {
    this.saveContext(); this.downloadBusy.set(true); this.message.set('Preparing the illustrated exhibition…');
    try {
      const dossier = this.runtime.engine.dossier(); const sections: string[] = [];
      for (const work of this.mission.works) {
        const s = this.stateFor(work.id), before = await renderRestoration(work, s, true, 640), after = await renderRestoration(work, s, false, 640);
        sections.push(`<article><h2>${escapeHtml(work.title)}</h2><p>${escapeHtml(work.location)} · ${escapeHtml(work.date)} · ${s.verified ? 'Evidence check passed' : 'Work in progress'}</p><div class="pair"><figure><img src="${before.toDataURL('image/png')}" alt="Original forged study"><figcaption>Original forged study</figcaption></figure><figure><img src="${after.toDataURL('image/png')}" alt="Student reconstruction"><figcaption>Student reconstruction</figcaption></figure></div>${work.regions.map(r => `<h3>${escapeHtml(r.title)}</h3><p>Original claim: ${escapeHtml(r.claim)}</p><p>Choice: ${escapeHtml(selectedRepair(r, s).description)}</p><p>Evidence: ${escapeHtml(this.sourceTitle(s.notes[r.id]?.evidenceId))} · ${escapeHtml(s.notes[r.id]?.relationship ?? 'Not selected')}</p><blockquote>${escapeHtml(s.notes[r.id]?.explanation ?? 'No explanation saved.')}</blockquote>`).join('')}<small>${escapeHtml(work.attribution)}</small></article>`);
      }
      const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Restoration exhibition</title><style>body{max-width:1100px;margin:auto;padding:28px;background:#f3eee2;color:#24372c;font:17px/1.6 system-ui}h1,h2{font-family:Georgia}article{border-top:2px solid #958867;margin-top:40px;padding-top:20px}.pair{display:flex;gap:16px}figure{margin:0;flex:1}img{width:100%}blockquote{border-left:3px solid #958867;padding-left:20px;white-space:pre-wrap}small{font-size:12px}a{color:#235744}@media(max-width:600px){.pair{display:block}}</style><h1>${escapeHtml(this.mission.title)}: student restoration exhibition</h1><p>Local practice · ${dossier.complete ? 'Collection recovered' : 'Recovery in progress'} · ${this.completed()}/${this.mission.works.length} evidence checks passed.</p><p>Written explanations are saved for teacher review; these checks are not teacher grades.</p><h2>Museum label</h2><blockquote>${escapeHtml(dossier.museumLabel || 'Label not written yet.')}</blockquote>${sections.join('')}<h2>Reference desk</h2>${this.mission.sourceGallery.evidence.map(s => `<p><a href="${escapeHtml(s.sourceUrl)}">${escapeHtml(s.sourceTitle)}</a><br>${escapeHtml(s.text)}</p>`).join('')}</html>`;
      downloadFile(new Blob([html], { type: 'text/html' }), `${this.mission.projectId}-exhibition.html`); this.message.set('Exhibition downloaded with the before-and-after images and your explanations.');
    } catch (e) { this.message.set(e instanceof Error ? e.message : 'Exhibition export failed.'); } finally { this.downloadBusy.set(false); }
  }
  private restoreFocus(): void { setTimeout(() => this.previousFocus?.isConnected ? this.previousFocus.focus() : this.heading()?.nativeElement.focus()); }
  private focusHeading(): void { setTimeout(() => { this.heading()?.nativeElement.scrollIntoView?.({ block: 'nearest', behavior: 'instant' }); this.heading()?.nativeElement.focus({ preventScroll: true }); }); }
}
