import { WorkspaceToolsComponent } from '../../../shared/project-lessons/workspace-tools.component';
import { afterNextRender, Component, computed, effect, ElementRef, inject, Injector, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import type { CompetitionCommand, CompetitionTeam, FinalMode } from '../domain/competition.models';
import { CompetitionRuntimeService } from '../runtime/competition-runtime.service';
import { CompetitionBracketComponent } from './competition-bracket.component';
import { ShowRailComponent } from './show-rail.component';
import { ScoreboardComponent } from './scoreboard.component';
import { TeacherGuideComponent } from './teacher-guide.component';
import { TelevisionStageComponent } from '../broadcast/television-stage.component';
import { BroadcastDirectorService } from '../broadcast/broadcast-director.service';
import { midnightBroadcast, polarBroadcast } from '../broadcast/broadcast.models';
import { studioProjection } from '../broadcast/studio-projection';

@Component({
  selector: 'app-competition-show', standalone: true,
  imports: [WorkspaceToolsComponent,FormsModule, RouterLink, CompetitionBracketComponent, TelevisionStageComponent, ShowRailComponent, TeacherGuideComponent, ScoreboardComponent],
  providers: [BroadcastDirectorService],
  templateUrl: './competition-show.component.html', styleUrl: './competition-show.component.scss',
})
export class CompetitionShowComponent {
  readonly show = inject(CompetitionRuntimeService);
  readonly television = viewChild(TelevisionStageComponent);
  readonly director = inject(BroadcastDirectorService);
  readonly skin = signal<'project' | 'polar'>('project');
  readonly theme = computed(() => this.skin() === 'polar' ? { ...polarBroadcast, assets: this.show.config.broadcast?.assets ?? {}, teamEmblems: this.show.config.broadcast?.teamEmblems } : this.show.config.broadcast ?? midnightBroadcast);
  readonly studioView = computed(() => studioProjection(this.show.config, this.show.state(), this.theme(),
    this.director.shot(), this.director.teamId(), this.director.cue(), this.director.step(), this.show.seconds()));
  private readonly injector = inject(Injector);
  readonly workspace = viewChild<ElementRef<HTMLElement>>('workspace');
  /** Projector mode drops the play card and the guide; the stage is all that remains. */
  readonly projector = signal(false);
  /** Which team's answer card is showing. One team at a time replaces eight stacked fieldsets. */
  readonly answering = signal<string | null>(null);
  mode: FinalMode = this.show.state().mode;
  teams: CompetitionTeam[] = structuredClone(this.show.state().teams);
  drafts: Record<string, string> = {};
  awards: Partial<Record<string, number>> = {};
  wagers: Partial<Record<string, number>> = {};
  tiebreak = '';
  readonly modes: { id: FinalMode; label: string; description: string }[] = [
    { id: 'hybrid', label: 'Bracket → final game show', description: 'Seeded matches narrow the field to four. The finalists enter one all-team championship.' },
    { id: 'tournament', label: 'Head-to-head tournament', description: 'Each match is a game show. Winners advance until one champion remains.' },
    { id: 'game-show', label: 'All-team game show', description: 'Every team stays in the final. The highest final score wins.' },
  ];
  /** Teams still owing an answer this round, in turn order. */
  readonly pending = computed(() => this.show.state().participants.filter(id => this.canAnswer(id)));
  readonly current = computed(() => {
    const pending = this.pending(); const chosen = this.answering();
    return chosen && pending.includes(chosen) ? chosen : pending[0] ?? null;
  });
  /** Actions waiting on the host, surfaced on the closed guide trigger. */
  readonly waiting = computed(() => {
    const state = this.show.state();
    if (state.phase === 'locked') return state.responses.filter(r => r.points === null).length || 1;
    return ['ready', 'open', 'paused', 'revealed', 'results', 'bracket'].includes(state.phase) ? 1 : 0;
  });
  /** The biggest mover of the round, for the reveal headline. */
  readonly topAward = computed(() => {
    const scored = this.studioView().teams.filter(t => t.verdict !== null);
    return scored.sort((a, b) => (b.award ?? 0) - (a.award ?? 0))[0] ?? null;
  });
  readonly clock = computed(() => ['ready', 'open', 'paused'].includes(this.show.state().phase) ? `${this.show.seconds()}s` : '');
  constructor() {
    effect(() => {
      const sound = this.director.sound(); const cue = this.director.cue(); const phase = this.show.state().phase;
      this.director.tension(this.theme(), sound && this.show.round().kind === 'wager' && (phase === 'ready' || phase === 'open') && cue === null);
    });
    effect(() => {
      const first = this.show.state().buzzes[0];
      if (first && this.show.state().phase === 'open') this.director.autoShot('team', first);
    });
  }
  command(command: CompetitionCommand): void {
    if (this.director.cue()) return;
    if (command.type === 'open' || command.type === 'reveal') {
      const state = this.show.state(); const expectedPhase = command.type === 'open' ? 'ready' : 'locked';
      if (state.phase !== expectedPhase || this.show.blocked()) return;
      this.television()?.focusStage();
      this.director.run(command.type === 'open' ? 'question' : 'score', this.theme(), () => {
        const current = this.show.state();
        if (current.phase === expectedPhase && current.contestId === state.contestId && current.roundIndex === state.roundIndex) this.commit(command);
      });
      return;
    }
    this.commit(command);
  }
  private commit(command: CompetitionCommand): void {
    const previous = this.show.state().phase;
    if (this.show.command(command)) {
      if (['next', 'start'].includes(command.type)) { this.drafts = {}; this.awards = {}; this.wagers = {}; this.tiebreak = ''; this.answering.set(null); }
      if (command.type === 'answer') this.answering.set(null);
      if (previous !== this.show.state().phase && !['start', 'open', 'reveal', 'finish'].includes(command.type)) this.focusWorkspace();
      if (command.type === 'start') { this.television()?.focusStage(); this.director.run('entrance', this.theme()); }
      if (command.type === 'next') this.director.autoShot('wide');
      if (command.type === 'finish') {
        if (this.show.state().phase === 'champion') { this.television()?.focusStage(); this.director.run('champion', this.theme(), undefined, this.show.state().championId); }
        else this.director.autoShot('wide');
      }
    }
  }
  seed(): void {
    if (this.show.command({ type: 'configure', mode: this.mode, teams: this.teams })) this.command({ type: 'seed' });
  }
  addTeam(): void {
    let n = 1; while (this.teams.some(t => t.id === `team-${n}`)) n++;
    this.teams = [...this.teams, { id: `team-${n}`, name: `Team ${n}`, qualificationPoints: 0 }];
  }
  removeTeam(id: string): void { this.teams = this.teams.filter(t => t.id !== id); }
  changeSkin(event: Event): void { this.director.cancel(); this.skin.set((event.target as HTMLSelectElement).value === 'polar' ? 'polar' : 'project'); }
  present(): void { this.projector.update(value => !value); this.focusWorkspace(); }
  /** Seeded order, for the read-only line-up the class sees before the first bell. */
  readonly lineup = computed(() => [...this.show.state().teams].sort((a, b) => b.qualificationPoints - a.qualificationPoints || a.id.localeCompare(b.id)));
  answerLocked(id: string): boolean { return this.show.state().responses.some(r => r.teamId === id); }
  allWagersLocked(): boolean { return this.show.state().participants.every(id => this.show.state().wagers[id] !== undefined); }
  canAnswer(id: string): boolean {
    return !this.answerLocked(id) && (this.show.round().kind !== 'buzzer' || this.show.state().buzzes[0] === id);
  }
  allScored(): boolean { return this.show.state().responses.every(r => r.points !== null); }
  finish(id: string): void { this.command({ type: 'finish', winnerId: id, reason: this.tiebreak }); }
  exportRecord(): void {
    const state = this.show.state();
    const data = { schemaVersion: '1.0', authority: 'local-rehearsal', projectId: this.show.config.projectId,
      projectVersion: this.show.config.projectVersion, mode: state.mode, teams: state.teams,
      championId: state.championId, matches: state.matches, results: state.results, evidence: state.evidence };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = `${this.show.config.projectId}-rehearsal.json`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  private focusWorkspace(): void {
    afterNextRender(() => this.workspace()?.nativeElement.focus({ preventScroll: false }), { injector: this.injector });
  }
}
