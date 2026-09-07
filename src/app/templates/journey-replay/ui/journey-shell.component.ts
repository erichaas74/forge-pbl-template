import {
  Component,
  computed,
  inject,
  signal,
  viewChild,
  afterNextRender,
  ElementRef,
  effect,
  Injector,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import type {
  JourneyChoiceDefinition,
  JourneyRouteDefinition,
  MapLocation,
} from '../domain/journey-replay.models';
import { JourneyReplayRuntimeService } from '../runtime/journey-replay-runtime.service';
import { ClassJourneyMapComponent } from './class-journey-map.component';
import { JourneyDecisionPanelComponent } from './journey-decision-panel.component';
import { JourneyReplayPlayerComponent } from './journey-replay-player.component';
import { LivingJourneyMapComponent } from './map/living-journey-map.component';

type JourneyUtility = 'mission' | 'location' | 'manifest' | 'log' | 'records';

@Component({
  selector: 'app-journey-replay-page',
  imports: [
    ClassJourneyMapComponent,
    JourneyDecisionPanelComponent,
    JourneyReplayPlayerComponent,
    LivingJourneyMapComponent,
    RouterLink,
  ],
  templateUrl: './journey-shell.html',
  styleUrl: './journey-shell.scss',
})
export class JourneyReplayPageComponent {
  readonly runtime = inject(JourneyReplayRuntimeService);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  readonly view = signal<'journey' | 'replay' | 'class'>('journey');
  readonly decisionPanel = viewChild(JourneyDecisionPanelComponent);
  readonly livingMap = viewChild(LivingJourneyMapComponent);
  readonly decisionOpen = signal(true);
  readonly utility = signal<JourneyUtility | undefined>(undefined);
  readonly inspectedLocation = signal<MapLocation | undefined>(undefined);
  readonly inspectedRouteId = signal<string | undefined>(undefined);
  readonly revisionReason = signal('');
  readonly planningChoices = computed(
    () => this.runtime.step()?.choices.filter((choice) => choice.planning) ?? [],
  );
  readonly planningTargets = computed(() => this.runtime.choice()?.planning?.targets ?? []);
  readonly candidateRouteIds = computed(() => {
    const targets = this.planningTargets();
    return targets.length > 0
      ? targets.flatMap((target) => (target.routeId ? [target.routeId] : []))
      : (this.runtime
          .step()
          ?.choices.flatMap((choice) => (choice.routeId ? [choice.routeId] : [])) ?? []);
  });
  readonly candidateRouteLabels = computed<Readonly<Record<string, string>>>(() =>
    Object.fromEntries(
      this.planningTargets().length > 0
        ? this.planningTargets()
            .filter((target) => target.routeId !== undefined)
            .map((target) => [target.routeId!, target.label])
        : (this.runtime.step()?.choices ?? [])
            .filter((choice) => choice.routeId !== undefined)
            .map((choice) => [choice.routeId!, choice.label]),
    ),
  );
  readonly candidateLocationIds = computed(() =>
    this.planningTargets().map((target) => target.locationId),
  );
  readonly candidateLocationLabels = computed<Readonly<Record<string, string>>>(() =>
    Object.fromEntries(this.planningTargets().map((target) => [target.locationId, target.label])),
  );
  readonly selectedPlanningTarget = computed(() =>
    this.planningTargets().find(
      (target) => target.id === this.runtime.state().responseDraft.planningTargetId,
    ),
  );
  readonly selectedRouteId = computed(
    () => this.selectedPlanningTarget()?.routeId ?? this.runtime.choice()?.routeId,
  );
  readonly inspectedRoute = computed<JourneyRouteDefinition | undefined>(() =>
    this.runtime.config.map.routes.find((route) => route.id === this.inspectedRouteId()),
  );
  readonly inspectedRouteChoice = computed<JourneyChoiceDefinition | undefined>(() =>
    this.runtime.step()?.choices.find((choice) => choice.routeId === this.inspectedRouteId()),
  );
  readonly inspectedDestinationRoutes = computed(() => {
    const destinationId = this.inspectedLocation()?.id;
    const candidateIds = new Set(this.candidateRouteIds());
    if (!destinationId) return [];
    return this.runtime.config.map.routes
      .filter((route) => candidateIds.has(route.id) && route.toLocationId === destinationId)
      .map((route) => ({
        route,
        choice: this.runtime.step()?.choices.find((choice) => choice.routeId === route.id),
      }));
  });
  readonly mapOnly = computed(
    () => this.view() === 'journey' && !this.decisionOpen() && this.utility() === undefined,
  );
  private lastFocusedGoalId?: string;

  constructor() {
    effect(() => {
      const map = this.livingMap();
      const choice = this.runtime.choice();
      if (!map || !choice?.planning?.mapFocus || choice.id === this.lastFocusedGoalId) return;
      this.lastFocusedGoalId = choice.id;
      map.focusArea(choice.planning.mapFocus);
    });
  }

  openUtility(utility: JourneyUtility): void {
    if (this.utility() === utility) {
      this.closeUtility();
      return;
    }
    this.view.set('journey');
    this.decisionOpen.set(false);
    this.utility.set(utility);
    this.focusTool();
  }

  inspectLocation(location: MapLocation): void {
    const planningTarget = this.planningTargets().find(
      (target) => target.locationId === location.id,
    );
    if (planningTarget) {
      this.openDecision();
      this.decisionPanel()?.inspectPlanningTarget(planningTarget.id);
      return;
    }
    this.inspectedLocation.set(location);
    this.inspectedRouteId.set(undefined);
    this.openLocationUtility();
  }

  inspectRoute(routeId: string): void {
    const planningTarget = this.planningTargets().find((target) => target.routeId === routeId);
    if (planningTarget) {
      this.openDecision();
      this.decisionPanel()?.inspectPlanningTarget(planningTarget.id);
      return;
    }
    const route = this.runtime.config.map.routes.find((item) => item.id === routeId);
    if (!route) return;
    this.inspectedRouteId.set(routeId);
    this.inspectedLocation.set(
      this.runtime.config.map.locations.find((location) => location.id === route.toLocationId),
    );
    this.openLocationUtility();
  }

  chooseInspectedRoute(): void {
    const choice = this.inspectedRouteChoice();
    if (!choice) return;
    this.view.set('journey');
    this.utility.set(undefined);
    this.decisionOpen.set(true);
    this.decisionPanel()?.choose(choice.id);
  }

  chooseGoal(choiceId: string): void {
    this.openDecision();
    this.decisionPanel()?.choose(choiceId);
    const focus = this.runtime.choice()?.planning?.mapFocus;
    if (focus) {
      this.lastFocusedGoalId = choiceId;
      this.livingMap()?.focusArea(focus);
    }
  }

  openDecision(): void {
    this.view.set('journey');
    this.utility.set(undefined);
    this.decisionOpen.set(true);
    this.focusOverlay('.decision-sheet .sheet-close');
  }

  showMapOnly(): void {
    this.view.set('journey');
    this.utility.set(undefined);
    this.decisionOpen.set(false);
    afterNextRender(
      () => this.element.nativeElement.querySelector<HTMLElement>('.world-map')?.focus(),
      { injector: this.injector },
    );
  }

  private focusTool(): void {
    this.focusOverlay('.utility-close');
  }

  private openLocationUtility(): void {
    this.view.set('journey');
    this.decisionOpen.set(false);
    this.utility.set('location');
    this.focusTool();
  }

  private focusOverlay(selector: string): void {
    afterNextRender(
      () =>
        this.element.nativeElement
          .querySelector<HTMLElement>(selector)
          ?.focus({ preventScroll: true }),
      { injector: this.injector },
    );
  }

  closeUtility(): void {
    const selector = this.utility() === 'mission' ? '.guide-tool' : '.voyage-menu summary';
    this.utility.set(undefined);
    afterNextRender(
      () =>
        this.element.nativeElement
          .querySelector<HTMLElement>(selector)
          ?.focus({ preventScroll: true }),
      { injector: this.injector },
    );
  }

  openReplay(): void {
    this.utility.set(undefined);
    this.decisionOpen.set(false);
    this.view.set('replay');
  }

  openClassMap(): void {
    this.utility.set(undefined);
    this.decisionOpen.set(false);
    this.view.set('class');
  }

  returnToJourney(): void {
    this.view.set('journey');
    this.decisionOpen.set(false);
  }

  choiceLabel(stepId: string): string {
    const record = this.runtime.state().completedSteps.find((item) => item.stepId === stepId);
    const step = this.runtime.config.steps.find((item) => item.id === stepId);
    return (
      step?.choices.find((choice) => choice.id === record?.choiceId)?.label ?? 'Awaiting decision'
    );
  }

  stepTitle(stepId: string): string {
    return this.runtime.config.steps.find((step) => step.id === stepId)?.title ?? stepId;
  }

  updateRevisionText(event: Event): void {
    const text = (event.target as HTMLTextAreaElement).value;
    this.runtime.revisionDraft.update((draft) => ({ ...draft, responseMode: 'text', text }));
  }

  saveRevision(): void {
    if (this.runtime.saveRevision(this.revisionReason())) this.revisionReason.set('');
  }

  downloadBackup(which: 'device' | 'class' = 'device'): void {
    const url = URL.createObjectURL(
      new Blob([this.runtime.exportRecord(which)], { type: 'application/json' }),
    );
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `journey-${which}-backup.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async importBackup(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.runtime.importRecord(await file.text());
    input.value = '';
  }
}
