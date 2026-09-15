import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { bindLessonFocus } from '../../../shared/project-lessons/project-lesson-focus';
import type { JourneyPathChoice, JourneyPathDecision } from '../domain/journey-path.models';
import type { MapLocation, VoyageRoutePoint } from '../domain/journey-replay.models';
import {
  availablePathChoices,
  pathChoices,
  projectJourneyResources,
  projectPathChoices,
  selectedPathChoice,
} from '../core/journey-path.engine';
import { resolveJourneyOutcome } from '../core/journey-consequences';
import { JourneyPathRuntime } from '../runtime/journey-path.runtime';
import { LivingJourneyMapComponent } from './map/living-journey-map.component';
import { JourneyLocationSceneComponent } from './journey-location-scene.component';
import { JourneyHistoryContextComponent } from './journey-history-context.component';

@Component({
  selector: 'app-journey-path-workspace',
  imports: [
    LivingJourneyMapComponent,
    JourneyLocationSceneComponent,
    JourneyHistoryContextComponent,
  ],
  providers: [JourneyPathRuntime],
  templateUrl: './journey-path-workspace.component.html',
  styleUrl: './journey-path-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneyPathWorkspaceComponent {
  readonly runtime = inject(JourneyPathRuntime);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly params = toSignal(this.route.queryParamMap);
  readonly session = signal(1);
  readonly previewNodeId = signal<string | undefined>(undefined);
  readonly previewDecisions = signal<readonly JourneyPathDecision[]>([]);
  readonly pendingRouteId = signal<string | undefined>(undefined);
  readonly activeEventId = signal<string | undefined>(undefined);
  readonly inspectedPlace = signal<MapLocation | undefined>(undefined);
  readonly map = viewChild(LivingJourneyMapComponent);
  readonly tutor = viewChild<ElementRef<HTMLDetailsElement>>('tutor');
  readonly sources = viewChild<ElementRef<HTMLDialogElement>>('sources');
  readonly sourceTrigger = viewChild<ElementRef<HTMLButtonElement>>('sourceTrigger');
  readonly definition = this.runtime.config.experience!;
  readonly vesselArt = this.definition.nodes.find((node) => node.sceneArt)?.sceneArt?.ship;
  readonly pathEntry = computed(() =>
    this.runtime.path().find((entry) => entry.node.session === this.session())!,
  );
  readonly node = computed(
    () =>
      this.definition.nodes.find((node) => node.id === this.previewNodeId()) ??
      this.pathEntry().node,
  );
  readonly previewing = computed(() => this.previewNodeId() !== undefined);
  readonly decisions = computed(() =>
    this.previewing() ? this.previewDecisions() : this.runtime.state().decisions,
  );
  readonly before = computed(() => {
    if (!this.previewing())
      return projectJourneyResources(this.runtime.config, this.runtime.state(), this.session());
    const choices = [...this.definition.nodes]
      .sort((a, b) => a.session - b.session)
      .filter((node) => node.session < this.session())
      .flatMap((node) =>
        (node.kind === 'map' ? ['route'] : node.events.map((event) => event.id)).flatMap((key) => {
          const choice = selectedPathChoice(node, this.previewDecisions(), key);
          return choice ? [choice] : [];
        }),
      );
    return projectPathChoices(this.runtime.config, choices);
  });
  readonly availableRoutes = computed(() =>
    this.previewing() ? this.node().choices : availablePathChoices(this.node(), this.before().tags),
  );
  readonly routeLabels = computed(() =>
    Object.fromEntries(
      this.availableRoutes().map((choice) => [choice.routeId!, choice.label.split(' · ')[0]]),
    ),
  );
  readonly routeIds = computed(() => this.availableRoutes().map((choice) => choice.routeId!));
  readonly selectedRoute = computed(
    () =>
      this.availableRoutes().find((choice) => choice.id === this.pendingRouteId()) ??
      selectedPathChoice(this.node(), this.decisions(), 'route'),
  );
  readonly activeEvent = computed(
    () =>
      this.node().events.find((event) => event.id === this.activeEventId()) ??
      this.node().events.at(0),
  );
  readonly currentChoices = computed(() =>
    (this.node().kind === 'map' ? ['route'] : this.node().events.map((event) => event.id)).flatMap(
      (key) => {
        const choice = selectedPathChoice(this.node(), this.decisions(), key);
        return choice ? [choice] : [];
      },
    ),
  );
  readonly eventSelected = computed(
    () =>
      this.activeEvent() &&
      selectedPathChoice(this.node(), this.decisions(), this.activeEvent()!.id),
  );
  readonly incoming = computed(() =>
    this.previewing()
      ? this.definition.nodes
          .filter((node) => node.session === this.session() - 1)
          .flatMap((node) =>
            (node.kind === 'map' ? ['route'] : node.events.map((event) => event.id)).flatMap(
              (key) => {
                const choice = selectedPathChoice(node, this.previewDecisions(), key);
                return choice ? [choice] : [];
              },
            ),
          )
      : (this.runtime.path().find((entry) => entry.node.session === this.session() - 1)?.choices ??
        []),
  );
  readonly nextNode = computed(() =>
    this.definition.nodes.find(
      (node) =>
        node.id ===
        ([...this.currentChoices()].reverse().find((choice) => choice.nextNodeId)?.nextNodeId ??
          this.node().defaultNextId),
    ),
  );
  readonly resources = computed(() => {
    let record = {
      resources: this.before().resources,
      completedSteps: this.before().completedSteps,
    };
    for (const choice of this.currentChoices())
      record = {
        resources: resolveJourneyOutcome(this.runtime.config, record, choice).resources,
        completedSteps: [...record.completedSteps, { choiceId: choice.id }],
      };
    return record.resources;
  });
  readonly routeTrace = computed<readonly VoyageRoutePoint[]>(() => {
    const routes = this.previewing()
      ? this.definition.nodes
          .filter((node) => node.session < this.session())
          .flatMap((node) => {
            const choice = selectedPathChoice(node, this.previewDecisions(), 'route');
            return choice?.routeId ? [choice.routeId] : [];
          })
      : this.runtime
          .path()
          .filter((entry) => entry.node.session < this.session())
          .flatMap((entry) =>
            entry.choices.flatMap((choice) => (choice.routeId ? [choice.routeId] : [])),
          );
    const coordinates = routes.flatMap(
      (id) => this.runtime.config.map.routes.find((route) => route.id === id)?.coordinates ?? [],
    );
    const place = this.runtime.config.map.locations.find(
      (place) => place.id === this.node().locationId,
    )!;
    // Later testing entries have a starting position, not invented completed route legs.
    const points = coordinates.length ? [...coordinates, place] : [place];
    return points.map((point, sequence) => ({
      ...point,
      voyageId: 'practice-path',
      pointId: `path-${sequence}`,
      sequence,
      legId: 'practice',
      timestamp: '',
      ...('id' in point ? { locationId: String(point.id) } : {}),
    }));
  });
  readonly evidence = computed(() =>
    this.runtime.config.evidence.filter((item) =>
      this.activeEvent()?.evidenceIds.includes(item.id),
    ),
  );
  readonly completedEvents = computed(
    () =>
      this.node().events.filter(
        (event) => !!selectedPathChoice(this.node(), this.decisions(), event.id),
      ).length,
  );

  constructor() {
    effect(() => {
      const value = Number(this.params()?.get('lesson') ?? 1);
      this.selectSession(Number.isInteger(value) && value >= 1 && value <= 8 ? value : 1);
    });
    bindLessonFocus((lesson) => this.selectSession(lesson.number));
    effect(() => {
      const nodeId = this.node().id;
      this.pendingRouteId.set(undefined);
      this.activeEventId.set(undefined);
      this.inspectedPlace.set(undefined);
      untracked(() =>
        afterNextRender(
          () => this.element.nativeElement.querySelector('.planning-column')?.scrollTo({ top: 0 }),
          { injector: this.injector },
        ),
      );
      void nodeId;
    });
  }

  private selectSession(number: number): void {
    untracked(() => {
      const preview = this.definition.nodes.find((node) => node.id === this.previewNodeId());
      if (preview && preview.session !== number) this.backToPath();
      this.session.set(number);
    });
  }

  inspectRoute(routeId: string): void {
    const choice = this.availableRoutes().find((choice) => choice.routeId === routeId);
    if (choice) {
      this.pendingRouteId.set(choice.id);
      this.inspectedPlace.set(undefined);
      this.revealTutor('.route-options');
    }
  }
  inspectPlace(place: MapLocation): void {
    const choice = this.availableRoutes().find(
      (choice) =>
        this.runtime.config.map.routes.find((route) => route.id === choice.routeId)
          ?.toLocationId === place.id,
    );
    if (choice) this.inspectRoute(choice.routeId!);
    else {
      this.inspectedPlace.set(place);
      this.revealTutor('.place-report');
    }
  }
  inspectEvent(id: string): void {
    this.activeEventId.set(id);
    this.revealTutor('.event-options');
  }
  selectRoute(id: string): void {
    this.pendingRouteId.set(id);
    this.inspectedPlace.set(undefined);
  }
  enterLocation(): void {
    const choice = this.selectedRoute();
    if (choice && this.choose('route', choice) && choice.nextNodeId) this.goNode(choice.nextNodeId);
  }
  choose(eventId: string, choice: JourneyPathChoice): boolean {
    if (this.previewing()) {
      this.previewDecisions.update((decisions) => [
        ...decisions.filter((item) => item.nodeId !== this.node().id || item.eventId !== eventId),
        { nodeId: this.node().id, eventId, choiceId: choice.id },
      ]);
      return true;
    }
    return this.runtime.choose(this.node().id, eventId, choice.id);
  }
  next(): void {
    const node = this.nextNode();
    if (node) this.goNode(node.id);
  }
  private goNode(id: string): void {
    const node = this.definition.nodes.find((node) => node.id === id)!;
    if (this.previewing()) this.previewNodeId.set(id);
    this.session.set(node.session);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { lesson: node.session },
      queryParamsHandling: 'merge',
    });
    afterNextRender(
      () => {
        const surface = this.element.nativeElement.querySelector<HTMLElement>('.activity');
        surface?.scrollIntoView({ block: 'start', behavior: 'instant' });
        surface?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
  previewScene(id: string): void {
    if (!id) {
      this.previewNodeId.set(undefined);
      return;
    }
    this.previewDecisions.set([]);
    this.previewNodeId.set(id);
    this.goNode(id);
  }
  backToPath(): void {
    this.previewNodeId.set(undefined);
    this.previewDecisions.set([]);
  }
  decisionLabel(decision: JourneyPathDecision): string {
    const node = this.definition.nodes.find((node) => node.id === decision.nodeId);
    return node
      ? (pathChoices(node, decision.eventId).find((choice) => choice.id === decision.choiceId)
          ?.label ?? 'Earlier choice')
      : 'Earlier choice';
  }
  selected(eventId: string, choiceId: string): boolean {
    return selectedPathChoice(this.node(), this.decisions(), eventId)?.id === choiceId;
  }
  preview(choice: JourneyPathChoice) {
    let record = {
      resources: this.before().resources,
      completedSteps: this.before().completedSteps,
    };
    for (const event of this.node().events) {
      if (event.choices.some((item) => item.id === choice.id)) break;
      const earlier = selectedPathChoice(this.node(), this.decisions(), event.id);
      if (earlier)
        record = {
          resources: resolveJourneyOutcome(this.runtime.config, record, earlier).resources,
          completedSteps: [...record.completedSteps, { choiceId: earlier.id }],
        };
    }
    return resolveJourneyOutcome(this.runtime.config, record, choice);
  }
  effectLabel(choice: JourneyPathChoice): string {
    return this.preview(choice)
      .changes.map((change) => `${change.label} ${change.delta > 0 ? '+' : ''}${change.delta}`)
      .join(' · ');
  }
  sourceText(id: string): string {
    return this.runtime.config.evidence.find((item) => item.id === id)?.title ?? id;
  }
  placeName(id: string): string {
    return this.runtime.config.map.locations.find((place) => place.id === id)?.shortName ?? '';
  }
  nodeKind(id: string): string {
    return this.definition.nodes.find((node) => node.id === id)?.kind === 'map'
      ? 'Map'
      : 'Location';
  }
  openSources(): void {
    this.sources()?.nativeElement.showModal();
  }
  closeSources(): void {
    this.sourceTrigger()?.nativeElement.focus();
  }
  showScene(): void {
    const activity = this.element.nativeElement.querySelector<HTMLElement>('.activity');
    activity?.scrollIntoView({ block: 'start', behavior: 'instant' });
    activity?.focus({ preventScroll: true });
  }
  revealTutor(selector = '.tutor-body'): void {
    const tutor = this.tutor()?.nativeElement;
    if (tutor) tutor.open = true;
    afterNextRender(
      () => {
        const target = this.element.nativeElement.querySelector<HTMLElement>(selector);
        target?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        target?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
}
