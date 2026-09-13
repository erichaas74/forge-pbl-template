import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, InjectionToken, ViewChild, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { cargoMass } from '../domain/academic-locks';
import type { FraudCategory, GalleryCommand, GalleryPainting, LockAnswer } from '../domain/gallery.models';
import type { GallerySceneHandle } from '../game/gallery-scene';
import { GalleryRuntime } from '../runtime/gallery-runtime';
import { AcademicLockComponent } from './academic-lock.component';
import { buildGalleryAudit } from '../domain/gallery-audit';
import { GalleryAuditComponent } from './gallery-audit.component';
import { EncounterComponent } from '../../../../shared/encounters/encounter.component';
import type { EncounterAction } from '../../../../shared/encounters/encounter.models';

type GalleryPanel = 'inspect' | 'notes' | 'lock' | 'dossier' | 'replay' | 'audit' | 'encounter';

export const GALLERY_SCENE_LOADER = new InjectionToken<() => Promise<Pick<typeof import('../game/gallery-scene'), 'mountGallery'>>>('GALLERY_SCENE_LOADER', { providedIn: 'root', factory: () => () => import('../game/gallery-scene') });
@Component({ selector: 'app-heist-gallery', imports: [FormsModule, RouterLink, AcademicLockComponent, GalleryAuditComponent, EncounterComponent], templateUrl: './gallery.component.html', styleUrl: './gallery.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class GalleryComponent implements AfterViewInit {
  readonly runtime = inject(GalleryRuntime);
  readonly mission = this.runtime.mission;
  readonly engine = computed(() => { this.runtime.revision(); return this.runtime.engine; }, { equal: () => false });
  readonly chamber = computed(() => this.engine().chamber);
  readonly number = computed(() => this.mission.chambers.findIndex(c => c.id === this.chamber().id) + 1);
  readonly panel = signal<GalleryPanel>('inspect');
  readonly audit = computed(() => buildGalleryAudit(this.engine()));
  readonly currentEncounters = computed(() => (this.mission.encounters ?? []).filter(e => e.chamberIds.includes(this.chamber().id)));
  readonly availableEncounters = computed(() => (this.mission.encounters ?? []).filter(e => e.chamberIds.some(id => id === this.chamber().id || this.engine().cleared.includes(id))));
  readonly activeEncounter = computed(() => this.mission.encounters?.find(e => e.id === this.engine().activeEncounterId));
  readonly encounterState = computed(() => this.activeEncounter() ? this.engine().encounters[this.activeEncounter()!.id] : undefined);
  private encounterReturnPanel: GalleryPanel = 'inspect';
  private returnToWorkspace = false;
  readonly selectedPainting = signal('');
  readonly painting = computed(() => this.chamber().paintings.find(p => p.id === this.selectedPainting()));
  readonly hotspot = signal('');
  readonly category = signal<FraudCategory | ''>('');
  readonly feedback = signal('');
  readonly ready = signal(false);
  readonly artError = signal('');
  readonly reducedMotion = signal(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  readonly replayIndex = signal<number | null>(null);
  readonly zoom = signal(false);
  readonly currentLock = computed(() => this.engine().activeLocks[0]);
  readonly displaySnapshot = computed(() => this.replayIndex() === null ? this.engine().snapshot() : this.engine().events[this.replayIndex()!]?.snapshot ?? this.engine().snapshot());
  readonly displayChamber = computed(() => this.mission.chambers.find(c => c.id === this.displaySnapshot().chamberId)!);
  readonly categories: readonly { id: FraudCategory; label: string; symbol: string }[] = [{ id: 'timeline', label: 'Wrong timeline', symbol: '◷' }, { id: 'animal-plant', label: 'Wrong animal / plant', symbol: '✦' }, { id: 'people', label: 'Wrong group of people', symbol: '⌂' }, { id: 'technology', label: 'Wrong technology', symbol: '⚙' }];
  readonly groups = ['Timeline', 'People', 'Technology', 'Exchange', 'Routes', 'Mathematics'];
  readonly phaseText = computed(() => ({ recon: 'Inspect the paintings', fraud: 'Investigate the fraud', recovery: 'Repair the mechanism', mechanism: 'Operate the passage', unlocked: 'Passage unlocked', extracted: 'Collection recovered' })[this.engine().phase]);
  responses: string[] = [];
  readonly lockDrafts = new Map<string, LockAnswer>();
  @ViewChild(AcademicLockComponent) private lockWorkspace?: AcademicLockComponent;
  @ViewChild('stage', { static: true }) private stage!: ElementRef<HTMLElement>;
  @ViewChild('dialog', { static: true }) private dialog!: ElementRef<HTMLDialogElement>;
  private scene?: GallerySceneHandle;
  private readonly loader = inject(GALLERY_SCENE_LOADER);
  private disposed = false;
  private previousFocus?: HTMLElement;
  constructor() { this.responses = this.mission.defensePrompts.map((_, i) => this.engine().defense[i] ?? ''); inject(DestroyRef).onDestroy(() => { this.disposed = true; this.scene?.destroy(); }); }
  async ngAfterViewInit(): Promise<void> { await this.loadScene(); if (!this.disposed && this.activeEncounter()) this.open('encounter'); }
  async loadScene(): Promise<void> {
    this.ready.set(false); this.artError.set(''); this.scene?.destroy();
    try {
      const { mountGallery } = await this.loader(); if (this.disposed) return;
      this.scene = mountGallery(this.stage.nativeElement, this.mission, () => {
        const snapshot = this.displaySnapshot();
        const latest = (type: string) => this.mission.locks.filter(l => l.type === type && snapshot.mechanisms[l.id]).at(-1);
        const angle = latest('rotation'), load = latest('cargo'), distance = latest('measurement');
        return { snapshot, interactive: !this.dialog.nativeElement.open && this.replayIndex() === null, reducedMotion: this.reducedMotion(), previewAngle: angle ? snapshot.mechanisms[angle.id].setting ?? 0 : 0, previewLoad: load ? cargoMass(load, snapshot.mechanisms[load.id].selected ?? []) : 0, previewDistance: distance ? snapshot.mechanisms[distance.id].setting ?? 0 : 0 };
      }, id => { if (!this.dialog.nativeElement.open && this.replayIndex() === null) this.inspect(id); }, () => this.ready.set(true), message => this.artError.set(message));
    } catch { this.artError.set('The gallery could not start. Reload the artwork to retry.'); }
  }
  private send(command: GalleryCommand): boolean {
    const accepted = this.runtime.send(command);
    if (accepted) this.feedback.set(this.engine().events.at(-1)?.message ?? '');
    else this.feedback.set(this.runtime.restoreBlocked() ? 'Resolve the saved-practice warning before continuing.' : 'Inspect a detail first, then complete the current mechanism to continue.');
    return accepted;
  }
  inspect(id: string): void {
    this.selectedPainting.set(id); this.hotspot.set(''); this.category.set(''); this.zoom.set(false); this.feedback.set(''); this.open('inspect');
  }
  inspectHotspot(id: string): void { this.hotspot.set(id); this.send({ type: 'inspect', paintingId: this.selectedPainting(), hotspotId: id }); }
  choose(): void {
    if (!this.ready() || this.artError() || !this.send({ type: 'choose', paintingId: this.selectedPainting() })) return;
    if (this.engine().phase === 'mechanism') this.open('lock');
  }
  classify(): void { if (this.category() && this.send({ type: 'classify', category: this.category() as FraudCategory, hotspotId: this.hotspot() }) && this.engine().phase === 'recovery') this.open('lock'); }
  operate(answer: LockAnswer): void {
    const lock = this.currentLock(); if (!lock || !this.send({ type: 'operate', lockId: lock.id, answer })) return;
    this.lockDrafts.delete(lock.id);
    if (this.engine().phase === 'recon' || this.engine().phase === 'unlocked') this.close();
    else this.focusHeading();
  }
  continue(): void { if (this.send({ type: 'continue' })) { this.selectedPainting.set(''); this.hotspot.set(''); if (this.engine().phase === 'extracted') this.open('dossier'); else this.focusStage(); } }
  resume(): void { if (this.engine().phase === 'fraud') this.inspect(this.engine().paintingId!); else this.open(this.engine().phase === 'extracted' ? 'dossier' : 'lock'); }
  returnFromAudit(): void {
    if (this.engine().phase === 'recon' || this.engine().phase === 'unlocked') this.close();
    else this.resume();
  }
  enterEncounter(id: string): void {
    this.encounterReturnPanel = this.panel(); this.returnToWorkspace = this.dialog.nativeElement.open;
    if (this.send({ type: 'encounter', encounterId: id, action: { type: 'enter' } })) this.open('encounter');
  }
  encounterAction(action: EncounterAction): void {
    const encounter = this.activeEncounter();
    if (encounter) this.send({ type: 'encounter', encounterId: encounter.id, action });
  }
  leaveEncounter(): void {
    this.encounterAction({ type: 'exit' });
    if (this.returnToWorkspace) this.open(this.encounterReturnPanel === 'encounter' ? 'audit' : this.encounterReturnPanel);
    else { this.panel.set('inspect'); this.close(); }
  }
  cancel(event: Event): void { event.preventDefault(); this.close(); }
  open(panel: GalleryPanel): void {
    // Notebook navigation destroys the lock view. Keep its unsubmitted controls local to this practice.
    if (this.panel() === 'lock' && panel !== 'lock' && this.lockWorkspace) {
      this.lockDrafts.set(this.lockWorkspace.lock().id, structuredClone(this.lockWorkspace.answer()));
    }
    this.panel.set(panel);
    if (panel === 'replay') this.replayIndex.set(Math.max(0, this.engine().events.length - 1));
    else this.replayIndex.set(null);
    if (!this.dialog.nativeElement.open) { this.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : undefined; this.dialog.nativeElement.showModal(); }
    this.focusHeading();
  }
  close(): void { if (this.panel() === 'encounter') { this.leaveEncounter(); return; } this.dialog.nativeElement.close(); this.closed(); }
  closed(): void { if (this.activeEncounter()) { this.encounterAction({ type: 'exit' }); this.panel.set('inspect'); } this.replayIndex.set(null); this.previousFocus?.focus({ preventScroll: true }); }
  private focusHeading(): void { setTimeout(() => { if (!this.disposed && this.dialog.nativeElement.open) this.dialog.nativeElement.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true }); }); }
  private focusStage(): void { setTimeout(() => { if (!this.disposed) this.stage.nativeElement.focus({ preventScroll: true }); }); }
  toggleEvidence(event: Event, id: string): void { if ((event.target as HTMLDetailsElement).open && !this.engine().evidenceRead.includes(id)) this.send({ type: 'read', evidenceId: id }); }
  hasInspected(painting: GalleryPainting): boolean { return !!this.engine().inspections[painting.id]?.length; }
  passage(painting: GalleryPainting): string { return ['I', 'II', 'III'][this.chamber().paintings.indexOf(painting)] ?? ''; }
  artPosition(painting: GalleryPainting): string { return `${painting.artFrame % 3 * 50}% ${Math.floor(painting.artFrame / 3) * 50}%`; }
  saveDefense(): void { this.send({ type: 'defend', responses: this.responses }); }
  reset(): void { this.lockDrafts.clear(); this.runtime.reset(); this.responses = this.mission.defensePrompts.map(() => ''); this.feedback.set('A new practice is ready.'); this.close(); this.focusStage(); }
  time(seconds: number): string { return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`; }
  exportDossier(format: 'json' | 'md'): void {
    const dossier = this.engine().dossier();
    const content = format === 'json' ? JSON.stringify(dossier, null, 2) : [
      '# Historical Authentication Dossier', `\n${this.mission.title} · ${this.mission.projectVersion}`, `\nLocal practice · ${dossier.complete ? 'Collection recovered' : 'In progress'}`, '\n## Authenticated paintings',
      ...dossier.authenticPaintings.map(p => `- ${p.chamberId}: ${p.painting?.title} — ${p.painting?.caption}`), '\n## Frauds identified',
      ...dossier.frauds.map(p => `- ${p.title} · ${p.category}: ${p.explanation}`), '\n## Confirmed evidence',
      ...dossier.confirmedEvidence.map(e => `- **${e.category}: ${e.title}.** ${e.text} [${e.sourceTitle}](${e.sourceUrl})`),
      '\n## Running fraud-clue list',
      ...(dossier.clueLog.length ? dossier.clueLog.flatMap(c => [
        `\n### ${c.chamber} · Passage ${c.passage} · ${c.title}`, c.status, c.caption,
        ...c.details.map(d => `- **${d.label}:** ${d.detail}`),
        ...(c.explanation ? [`\n**${c.category}:** ${c.explanation}`] : []),
        ...(c.recovery ? [`Recovery: ${c.recovery.title} · ${c.recovery.complete ? 'Complete' : 'Pending'}`] : []),
        ...c.evidence.map(e => `- Reference: [${e.title}](${e.sourceUrl})`),
      ]) : ['No clues inspected yet.']),
      '\n## Encounter records', ...dossier.encounterRecords.flatMap(e => [
        `\n### ${e.title}`, e.attribution,
        ...e.chapters.map(c => `- Account opened: ${c.title} · ${c.speaker}`),
        ...e.questions.map(q => `- Question: ${q.title}\n  ${q.speaker}: ${q.text}`),
        ...e.observations.map(o => `- Observation: ${o.label} — ${o.text}`),
        ...(e.insight ? [`Insight: ${e.insight.explanation}`, `Source: [${e.insight.source?.title}](${e.insight.source?.sourceUrl})`] : ['Insight not yet recorded.']),
      ]),
      '\n## Vault audit', ...dossier.vaultAudit.route.map(r => `- [${r.complete ? 'x' : ' '}] ${r.title}${r.current ? ' · Current gallery' : ''}`),
      `\n### Current gallery: ${this.chamber().title}`,
      ...dossier.vaultAudit.steps.map(s => `- [${s.complete ? 'x' : ' '}] ${s.title}`),
      '\n### Passage mechanisms', ...dossier.vaultAudit.locks.map(l => `- [${l.complete ? 'x' : ' '}] ${l.title}${l.current ? ' · Current mechanism' : ''}`),
      '\n## Route', dossier.route.join(' → '), '\n## Mechanism attempts',
      ...dossier.attempts.map(e => `- ${this.time(e.elapsed)} · ${e.message}`), '\n## Defense', ...dossier.defense.flatMap(d => [`\n### ${d.prompt}`, d.response || '(Not yet recorded)']),
    ].join('\n');
    const url = URL.createObjectURL(new Blob([content], { type: format === 'json' ? 'application/json' : 'text/markdown;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = `${this.mission.projectId}-authentication-dossier.${format}`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
