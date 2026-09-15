import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { bindLessonFocus } from '../../../../shared/project-lessons/project-lesson-focus';
import { PaintingCanvasComponent } from '../../../../shared/restoration/painting-canvas.component';
import { comparisonImage, downloadFile, escapeHtml, renderRestoration } from '../../../../shared/restoration/restoration-export';
import { selectedRepair } from '../../../../shared/restoration/restoration.engine';
import { RestorationPreviewRuntime } from './restoration-preview.runtime';
import { RestorationSceneFilmComponent } from './restoration-scene-film.component';
import { PanoramaEncounterComponent } from '../../../../shared/panorama/panorama-encounter.component';
import { PanoramaPaintingComponent } from '../../../../shared/panorama/panorama-painting.component';
import { renderPanoramaPainting } from '../../../../shared/panorama/panorama-export';

@Component({
  selector: 'app-restoration-week-workspace',
  imports: [PaintingCanvasComponent, RestorationSceneFilmComponent, PanoramaEncounterComponent, PanoramaPaintingComponent],
  templateUrl: './restoration-week-workspace.component.html',
  styleUrl: './restoration-week-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestorationWeekWorkspaceComponent {
  readonly runtime = inject(RestorationPreviewRuntime);
  readonly lesson = signal(1);
  readonly week = computed(() => this.runtime.config.weeks[Math.floor((this.lesson() - 1) / 2)]);
  readonly session = computed(() => this.week().sessions[(this.lesson() - 1) % 2]);
  readonly work = computed(() => this.runtime.mission.works.find(w => w.id === (this.runtime.state().selectedByLesson[this.lesson()] ?? this.session().workId))!);
  readonly state = computed(() => this.runtime.image(this.work().id));
  readonly scene = computed(() => this.sceneFor(this.work().id));
  readonly activePerson = computed(() => { const d = this.scene(); return d?.people.find(p => p.id === this.runtime.sceneState(d.id).selectedPersonId); });
  readonly tutorPanel = viewChild<ElementRef<HTMLDetailsElement>>('tutorPanel');
  openTutor(): void { const panel = this.tutorPanel()?.nativeElement; if (panel) { panel.open = true; panel.scrollIntoView({ block: 'nearest' }); panel.focus({ preventScroll: true }); } }
  sceneFor(workId: string) { return this.runtime.config.scenes?.find(s => s.workId === workId); }
  readonly extra = computed(() => this.work().id !== this.session().workId);
  readonly region = computed(() => this.work().regions.find(r => r.id === this.state().selectedRegionId));
  readonly sources = computed(() => this.runtime.mission.sourceGallery.evidence.filter(e => (this.region()?.evidenceIds ?? this.work().regions.flatMap(r => r.evidenceIds)).includes(e.id)));
  readonly pinnedSources = computed(() => this.runtime.state().sources[this.work().id] ?? []);
  readonly filmTime = computed(() => this.runtime.state().filmTimes[this.lesson()] ?? 0);
  readonly mode = signal<'picture' | 'film' | 'exhibit'>('picture');
  readonly compare = signal(false);
  readonly wipe = signal(50);
  readonly zoom = signal(false);
  readonly guides = signal(true);
  readonly replayId = signal<string | undefined>(undefined);
  readonly trials = computed(() => this.runtime.state().trials[this.work().id] ?? []);
  readonly replay = computed(() => this.trials().find(t => t.id === this.replayId()));
  readonly displayState = computed(() => this.replay()?.state ?? this.state());
  readonly exhibit = computed(() => (this.runtime.state().exhibit ?? []).map(id => this.runtime.mission.works.find(w => w.id === id)!));
  readonly captionDrafts = signal<Record<string, string>>({});
  readonly presentation = signal(false);
  readonly busy = signal(false);
  readonly message = signal('');
  readonly inspector = viewChild<ElementRef<HTMLElement>>('inspector');
  readonly filmPlayer = viewChild(RestorationSceneFilmComponent);
  readonly sessionHeading = viewChild<ElementRef<HTMLElement>>('sessionHeading');
  private focusTimer?: ReturnType<typeof setTimeout>;
  constructor() {
    bindLessonFocus(l => this.openLesson(l.number));
    inject(DestroyRef).onDestroy(() => { if (this.focusTimer) clearTimeout(this.focusTimer); this.saveFilmPosition(); this.saveCaptions(); });
  }
  openLesson(number: number): void {
    if (!Number.isInteger(number) || number < 1 || number > 8) return;
    this.saveFilmPosition(); this.saveCaptions(); this.lesson.set(number); this.replayId.set(undefined); this.zoom.set(false); this.presentation.set(false);
    this.compare.set(this.session().activity === 'compare');
    this.mode.set(this.session().activity === 'exhibit' ? 'exhibit' : 'picture');
    if (this.mode() === 'exhibit') this.runtime.ensureExhibit();
    if (this.focusTimer) clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      const heading = this.sessionHeading()?.nativeElement;
      heading?.scrollIntoView?.({ block: 'start', behavior: 'instant' });
      heading?.focus({ preventScroll: true });
    });
  }
  choose(id: string): void { this.saveFilmPosition(); this.saveCaptions(); this.runtime.select(this.lesson(), id); this.mode.set('picture'); this.replayId.set(undefined); this.zoom.set(false); }
  inspect(id: string): void {
    this.mode.set('picture'); this.replayId.set(undefined);
    this.runtime.repair(this.work().id, { type: 'inspect', regionId: id });
    setTimeout(() => { const panel = this.inspector()?.nativeElement; panel?.scrollIntoView?.({ block: 'nearest', behavior: 'instant' }); panel?.focus({ preventScroll: true }); });
  }
  edit(optionId: string): void {
    if (!this.region()) return;
    this.showPicture();
    this.replayId.set(undefined);
    this.runtime.repair(this.work().id, { type: 'edit', regionId: this.region()!.id, optionId });
  }
  option(id: string): string { const region = this.work().regions.find(r => r.id === id)!; return selectedRepair(region, this.state()).id; }
  showFilm(): void { this.choose(this.session().workId); this.mode.set('film'); }
  showExhibit(): void { this.saveFilmPosition(); this.runtime.ensureExhibit(); this.mode.set('exhibit'); }
  showPicture(): void { this.saveFilmPosition(); this.mode.set('picture'); }
  undo(): void { this.showPicture(); this.replayId.set(undefined); this.runtime.repair(this.work().id, { type: 'undo' }); }
  saveVersion(): void { this.showPicture(); this.runtime.saveTrial(this.work().id); }
  private saveFilmPosition(): void { const film = this.filmPlayer(); if (film) this.runtime.saveFilmTime(this.lesson(), film.time()); }
  caption(id: string): string { return this.captionDrafts()[id] ?? this.runtime.state().captions[id] ?? ''; }
  draftCaption(id: string, text: string): void { this.captionDrafts.update(d => ({ ...d, [id]: text })); }
  saveCaptions(): void { for (const [id, text] of Object.entries(this.captionDrafts())) this.runtime.caption(id, text); this.captionDrafts.set({}); }
  async downloadComparison(): Promise<void> {
    this.busy.set(true); this.message.set('');
    try { downloadFile(await comparisonImage(this.work(), this.displayState()), `${this.work().id}-comparison.png`); this.message.set('Before-and-after image downloaded.'); }
    catch { this.message.set('The image export could not load its artwork. Try again after the picture has loaded.'); }
    finally { this.busy.set(false); }
  }
  downloadDraft(): void { this.saveCaptions(); downloadFile(new Blob([JSON.stringify(this.runtime.state(), null, 2)], { type: 'application/json' }), `${this.runtime.mission.projectId}-preview-draft.json`); }
  async downloadExhibit(): Promise<void> {
    this.saveCaptions(); this.busy.set(true); this.message.set('Preparing your illustrated exhibition…');
    try {
      const sections: string[] = [];
      for (const work of this.exhibit()) {
        const scene = this.sceneFor(work.id);
        const before = scene ? await renderPanoramaPainting(scene, this.runtime.sceneState(scene.id), true) : await renderRestoration(work, this.runtime.image(work.id), true, 640);
        const after = scene ? await renderPanoramaPainting(scene, this.runtime.sceneState(scene.id)) : await renderRestoration(work, this.runtime.image(work.id), false, 640);
        const sources = scene ? scene.sources.filter(e => this.runtime.sceneState(scene.id).collected.includes(e.id)).map(e => ({ sourceTitle: e.title, sourceUrl: e.url, text: e.text })) : this.runtime.mission.sourceGallery.evidence.filter(e => this.runtime.state().sources[work.id]?.includes(e.id));
        sections.push(`<article><h2>${escapeHtml(work.title)}</h2><p>${escapeHtml(work.location)} · ${escapeHtml(work.date)}</p><div class="pair"><figure><img src="${before.toDataURL()}" alt="Original teaching reconstruction"><figcaption>Original teaching reconstruction</figcaption></figure><figure><img src="${after.toDataURL()}" alt="Student reconstruction"><figcaption>Student reconstruction</figcaption></figure></div><p class="caption">${escapeHtml(this.caption(work.id))}</p><small>${escapeHtml(work.attribution)}</small>${sources.map(s => `<p><a href="${escapeHtml(s.sourceUrl)}">${escapeHtml(s.sourceTitle)}</a> — ${escapeHtml(s.text)}</p>`).join('')}</article>`);
      }
      const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Historical reconstruction gallery</title><style>body{max-width:1050px;margin:auto;padding:24px;background:#f6f0e2;color:#203b30;font:17px/1.6 system-ui}h1,h2{font-family:Georgia}article{border-top:1px solid #89794b;margin-top:36px;padding-top:24px}.pair{display:flex;gap:18px}figure{flex:1;min-width:0;margin:0}img{width:100%}.caption{white-space:pre-wrap}small{font-size:12px}@media(max-width:600px){.pair{display:block}}</style><h1>History, back in the picture</h1><p>Editable classroom exhibition · Student historical reconstructions. These illustrations are not historical photographs. No assessment or completion is recorded.</p>${sections.join('')}</html>`;
      downloadFile(new Blob([html], { type: 'text/html' }), `${this.runtime.mission.projectId}-preview-exhibition.html`);
      this.message.set('Illustrated exhibition downloaded with your pictures, captions and pinned sources.');
    } catch { this.message.set('The exhibition export could not load an image. Your draft is retained; try again or download the draft.'); }
    finally { this.busy.set(false); }
  }
}
