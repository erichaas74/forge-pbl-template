import { Injectable, inject, signal } from '@angular/core';
import { initialRestoration, transitionRestoration } from '../../../../shared/restoration/restoration.engine';
import type { RestorationAction, RestorationState } from '../../../../shared/restoration/restoration.models';
import { RESTORATION_MISSION } from '../restoration-collection.runtime';
import { initialPreviewState, type RestorationPreviewState } from './restoration-preview.models';
import { RESTORATION_PREVIEW_PERSISTENCE, RESTORATION_PREVIEW_SESSION } from './restoration-preview.persistence';
import { initialPanoramaState, type PanoramaAction } from '../../../../shared/panorama/panorama.models';
import { transitionPanorama } from '../../../../shared/panorama/panorama.engine';

@Injectable()
export class RestorationPreviewRuntime {
  readonly mission = inject(RESTORATION_MISSION);
  readonly config = this.mission.previewWeeks!;
  private readonly session = inject(RESTORATION_PREVIEW_SESSION);
  private readonly persistence = inject(RESTORATION_PREVIEW_PERSISTENCE);
  readonly state = signal(initialPreviewState());
  readonly warning = signal('');
  readonly feedback = signal('');
  private preserveInvalidSave = false;
  constructor() {
    if (!this.config || this.session.mode !== 'preview' || this.session.authorityMode !== 'localDemo') throw new Error('PERMISSION_DENIED: weekly restoration tools require local authoring preview.');
    try { const saved = this.persistence.load(); if (saved) this.state.set(saved); }
    catch { this.preserveInvalidSave = true; this.warning.set('The existing preview save could not load and has been preserved. These new edits are temporary; download your draft before leaving.'); }
  }
  image(id: string): RestorationState { return this.state().works[id] ?? initialRestoration(); }
  sceneState(id: string) { return this.state().scenes?.[id] ?? initialPanoramaState(); }
  sceneAction(id: string, action: PanoramaAction): void {
    const definition = this.config.scenes?.find(s => s.id === id);
    if (!definition) return;
    const next = transitionPanorama(definition, this.sceneState(id), action);
    if (next) this.commit({ ...this.state(), scenes: { ...this.state().scenes, [id]: next } });
  }
  select(lesson: number, workId: string): void {
    if (!Number.isInteger(lesson) || lesson < 1 || lesson > 8 || !this.mission.works.some(w => w.id === workId)) return;
    this.commit({ ...this.state(), selectedByLesson: { ...this.state().selectedByLesson, [lesson]: workId } });
  }
  repair(id: string, action: RestorationAction): boolean {
    if (!['inspect', 'edit', 'undo'].includes(action.type)) { this.feedback.set('Only picture inspection, edits and undo are available in this preview.'); return false; }
    const work = this.mission.works.find(w => w.id === id);
    if (!work) return false;
    const result = transitionRestoration(work, this.image(id), action);
    if (!result) { this.feedback.set('The picture is unchanged. Select a different layer to try another version, or keep the current choice.'); return false; }
    this.commit({ ...this.state(), works: { ...this.state().works, [id]: { ...result.state, feedback: '', issues: [] } } });
    this.feedback.set(result.message);
    return true;
  }
  pinSource(workId: string, sourceId: string): void {
    const work = this.mission.works.find(w => w.id === workId);
    if (!work?.regions.some(r => r.evidenceIds.includes(sourceId))) return;
    const current = this.state().sources[workId] ?? [];
    this.commit({ ...this.state(), sources: { ...this.state().sources, [workId]: current.includes(sourceId) ? current.filter(id => id !== sourceId) : [...current, sourceId] } });
  }
  saveTrial(workId: string): void {
    if (!this.mission.works.some(w => w.id === workId)) return;
    const trials = this.state().trials[workId] ?? [];
    this.commit({ ...this.state(), trials: { ...this.state().trials, [workId]: [...trials, { id: crypto.randomUUID(), state: structuredClone(this.image(workId)) }].slice(-20) } });
    this.feedback.set('Picture version saved. Use Replay versions to compare your trials.');
  }
  saveFilmTime(lesson: number, time: number): void {
    if (lesson < 1 || lesson > 8 || !Number.isFinite(time) || time < 0 || time > 3600) return;
    this.commit({ ...this.state(), filmTimes: { ...this.state().filmTimes, [lesson]: time } });
  }
  ensureExhibit(): void {
    if (this.state().exhibit !== undefined) return;
    const works = { ...this.state().works }, captions = { ...this.state().captions }, samples: string[] = [];
    for (const sample of this.config.sampleExhibit) {
      const untouched = !Object.hasOwn(works, sample.workId);
      const panorama = this.config.scenes?.some(s => s.workId === sample.workId);
      if (untouched) {
        works[sample.workId] = { ...initialRestoration(), choices: { ...sample.choices } };
        if (!panorama) samples.push(sample.workId);
      }
      // Example prose describes the example image, never an independently edited draft.
      if (!Object.hasOwn(captions, sample.workId)) captions[sample.workId] = untouched && !panorama ? sample.caption : '';
    }
    this.commit({ ...this.state(), works, captions, sampleWorkIds: samples, exhibit: this.config.sampleExhibit.map(s => s.workId) });
  }
  caption(id: string, text: string): void {
    if (!this.mission.works.some(w => w.id === id) || text.length > 1500) return;
    this.commit({ ...this.state(), captions: { ...this.state().captions, [id]: text } });
  }
  toggleExhibit(id: string): void {
    if (!this.mission.works.some(w => w.id === id)) return;
    const exhibit = this.state().exhibit ?? [];
    this.commit({ ...this.state(), exhibit: exhibit.includes(id) ? exhibit.filter(w => w !== id) : [...exhibit, id] });
  }
  move(id: string, delta: number): void {
    const exhibit = [...this.state().exhibit ?? []], from = exhibit.indexOf(id), to = from + delta;
    if (from < 0 || to < 0 || to >= exhibit.length) return;
    [exhibit[from], exhibit[to]] = [exhibit[to], exhibit[from]];
    this.commit({ ...this.state(), exhibit });
  }
  private commit(state: RestorationPreviewState): void {
    const next = { ...state, version: this.state().version + 1 };
    this.state.set(next);
    if (this.preserveInvalidSave) return;
    try { this.persistence.save(next); this.warning.set(''); }
    catch { this.warning.set('Browser storage is unavailable. Your edits remain here; download your draft before leaving.'); }
  }
}
