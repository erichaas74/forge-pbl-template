import { Component, computed, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import type { Subscription } from 'rxjs';

import { detectVoyageIntersections } from '../core/journey-replay.engine';
import type {
  ClassVoyageRecord,
  ClassVoyageRoutePoint,
  JourneyClassMemberSummary,
  JourneyClassSummary,
  JourneyMapConfig,
  JourneyMasteryLevel,
} from '../domain/journey-replay.models';
import { JourneyReplayRuntimeService } from '../runtime/journey-replay-runtime.service';
import { JOURNEY_REPLAY_DEMO_CLASS_SUMMARY } from '../runtime/journey-replay.tokens';
import { LivingJourneyMapComponent } from './map/living-journey-map.component';

export type ClassVoyageDemoMode = 'snapshots' | 'compare';

export interface VoyageSnapshot {
  readonly id: string;
  readonly routeIndex: number;
  readonly sequence: number;
  readonly locationName: string;
  readonly label: string;
  readonly description: string;
  readonly eventType: ClassVoyageRoutePoint['eventType'];
}

export interface VoyageComparison {
  readonly voyage: ClassVoyageRecord;
  readonly sharedLocationNames: readonly string[];
  readonly uniqueLocationCount: number;
  readonly summary: string;
}

export interface ClassPerformanceSnapshot {
  readonly completionPercent: number;
  readonly reasoningReadyPercent: number;
  readonly approvedCount: number;
  readonly awaitingReviewCount: number;
  readonly revisionCount: number;
}

export interface ClassStoryBeat {
  readonly id: string;
  readonly kicker: string;
  readonly title: string;
  readonly body: string;
  readonly stat: string;
}

@Component({
  selector: 'app-class-journey-map',
  imports: [LivingJourneyMapComponent],
  templateUrl: './class-journey-map.component.html',
  styleUrl: './class-journey-map.component.scss',
})
export class ClassJourneyMapComponent implements OnInit, OnDestroy {
  readonly runtime = inject(JourneyReplayRuntimeService);
  private readonly demoClassSummary = inject(JOURNEY_REPLAY_DEMO_CLASS_SUMMARY, {
    optional: true,
  });
  readonly initialMode = input<ClassVoyageDemoMode>('snapshots');
  readonly mode = signal<ClassVoyageDemoMode>('snapshots');
  readonly selectedVoyageId = signal(this.runtime.config.classVoyages[0]?.voyageId ?? '');
  readonly activeSnapshotIndex = signal(0);
  readonly playing = signal(false);
  readonly reviewLevel = signal<JourneyMasteryLevel>('proficient');
  readonly reviewFeedback = signal('');

  readonly displaySummary = computed(
    () => this.runtime.classSummary() ?? this.demoClassSummary ?? undefined,
  );
  readonly isSimulatedSummary = computed(
    () => this.runtime.classSummary() === undefined && this.demoClassSummary !== null,
  );

  readonly voyages = computed<readonly ClassVoyageRecord[]>(() => {
    const summary = this.displaySummary();
    if (summary !== undefined) {
      return summary.members.map((member) => ({
        voyageId: member.voyageId,
        team: member.team,
        route: member.route,
        outcome: member.outcome,
      }));
    }
    return this.runtime.session() === undefined ? this.runtime.config.classVoyages : [];
  });

  readonly selectedVoyage = computed<ClassVoyageRecord | undefined>(
    () =>
      this.voyages().find((voyage) => voyage.voyageId === this.selectedVoyageId()) ??
      this.voyages()[0],
  );

  readonly snapshots = computed(() =>
    buildVoyageSnapshots(this.selectedVoyage(), this.runtime.config.map),
  );

  readonly activeSnapshot = computed(
    () =>
      this.snapshots()[
        Math.min(this.activeSnapshotIndex(), Math.max(0, this.snapshots().length - 1))
      ],
  );

  readonly storyVoyage = computed<readonly ClassVoyageRecord[]>(() => {
    const voyage = this.selectedVoyage();
    const snapshot = this.activeSnapshot();
    if (voyage === undefined) return [];
    return [
      {
        ...voyage,
        route:
          snapshot === undefined ? voyage.route : voyage.route.slice(0, snapshot.routeIndex + 1),
      },
    ];
  });

  readonly compareVoyages = computed<readonly ClassVoyageRecord[]>(() => {
    const selected = this.selectedVoyage();
    if (selected === undefined) return this.voyages();
    return [...this.voyages().filter((voyage) => voyage.voyageId !== selected.voyageId), selected];
  });

  readonly intersections = computed(() => detectVoyageIntersections(this.voyages()));
  readonly selectedSharedStops = computed(() => {
    const selectedId = this.selectedVoyage()?.voyageId;
    return this.intersections().filter((intersection) =>
      intersection.voyageIds.includes(selectedId ?? ''),
    );
  });
  readonly comparisons = computed(() =>
    compareVoyages(this.selectedVoyage(), this.voyages(), this.runtime.config.map),
  );
  readonly namedDestinationCount = computed(
    () =>
      new Set(
        this.voyages().flatMap((voyage) => voyage.route.flatMap((point) => point.locationId ?? [])),
      ).size,
  );
  readonly classPerformance = computed(() => summarizeClassPerformance(this.displaySummary()));
  readonly classStoryBeats = computed(() =>
    buildClassStoryBeats(this.voyages(), this.runtime.config.map, this.displaySummary()),
  );
  readonly pendingReviews = computed(
    () =>
      this.runtime
        .classSummary()
        ?.members.filter((member) => member.submission?.status === 'submitted') ?? [],
  );
  readonly masteryTags = computed(() => [
    ...new Set(this.runtime.config.steps.flatMap((step) => step.masteryTags)),
  ]);

  private timer?: ReturnType<typeof setInterval>;
  private summarySubscription?: Subscription;

  ngOnInit(): void {
    this.mode.set(this.initialMode());
    this.summarySubscription = this.runtime.connectClassSummary();
  }

  setMode(mode: ClassVoyageDemoMode): void {
    this.stopPlayback();
    this.mode.set(mode);
  }

  selectVoyage(voyageId: string): void {
    this.stopPlayback();
    this.selectedVoyageId.set(voyageId);
    this.activeSnapshotIndex.set(0);
  }

  selectSnapshot(index: number): void {
    this.stopPlayback();
    this.activeSnapshotIndex.set(Math.max(0, Math.min(index, this.snapshots().length - 1)));
  }

  previousSnapshot(): void {
    this.selectSnapshot(this.activeSnapshotIndex() - 1);
  }

  nextSnapshot(): void {
    this.selectSnapshot(this.activeSnapshotIndex() + 1);
  }

  togglePlayback(): void {
    if (this.playing()) {
      this.stopPlayback();
      return;
    }
    if (this.snapshots().length === 0) return;
    if (this.activeSnapshotIndex() >= this.snapshots().length - 1) this.activeSnapshotIndex.set(0);
    this.playing.set(true);
    this.timer = setInterval(() => {
      if (this.activeSnapshotIndex() >= this.snapshots().length - 1) {
        this.stopPlayback();
        return;
      }
      this.activeSnapshotIndex.update((index) => index + 1);
    }, 2200);
  }

  snapshotIcon(eventType: ClassVoyageRoutePoint['eventType']): string {
    const icons: Record<NonNullable<ClassVoyageRoutePoint['eventType']>, string> = {
      storm: '⛈',
      decision: '⚑',
      trade: '⚖',
      conflict: '⚠',
      discovery: '✦',
      resupply: '⚓',
      evidence: '◈',
      encounter: '◉',
    };
    return eventType === undefined ? '•' : icons[eventType];
  }

  setReviewLevel(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'developing' || value === 'proficient' || value === 'advanced') {
      this.reviewLevel.set(value);
    }
  }

  setReviewFeedback(event: Event): void {
    this.reviewFeedback.set((event.target as HTMLTextAreaElement).value);
  }

  async review(
    member: JourneyClassMemberSummary,
    decision: 'approved' | 'revision-requested',
  ): Promise<void> {
    if (member.submission === undefined) return;
    const mastery = this.masteryTags().map((masteryTag) => ({
      masteryTag,
      level: decision === 'approved' ? this.reviewLevel() : ('developing' as const),
      feedback: this.reviewFeedback().trim() || undefined,
    }));
    if (
      await this.runtime.reviewSubmission(
        member.submission.id,
        decision,
        this.reviewFeedback().trim(),
        mastery,
      )
    )
      this.reviewFeedback.set('');
  }

  stopPlayback(): void {
    if (this.timer !== undefined) clearInterval(this.timer);
    this.timer = undefined;
    this.playing.set(false);
  }

  ngOnDestroy(): void {
    this.stopPlayback();
    this.summarySubscription?.unsubscribe();
  }
}

export function buildVoyageSnapshots(
  voyage: ClassVoyageRecord | undefined,
  map: JourneyMapConfig,
): readonly VoyageSnapshot[] {
  if (voyage === undefined) return [];
  const meaningfulPoints = voyage.route
    .map((point, routeIndex) => ({ point, routeIndex }))
    .filter(
      ({ point }, index) =>
        point.locationId !== undefined ||
        point.eventLabel !== undefined ||
        index === voyage.route.length - 1,
    );

  return meaningfulPoints.map(({ point, routeIndex }, index) => {
    const location = map.locations.find((item) => item.id === point.locationId);
    const isLast = routeIndex === voyage.route.length - 1;
    return {
      id: `${voyage.voyageId}-snapshot-${routeIndex}`,
      routeIndex,
      sequence: index + 1,
      locationName: location?.name ?? (isLast ? 'Final position' : 'At sea'),
      label:
        point.eventLabel ??
        (isLast ? voyage.outcome : `Reached ${location?.name ?? 'a new waypoint'}`),
      description:
        location?.description ??
        (isLast ? voyage.outcome : 'The voyage continued across open water.'),
      eventType: point.eventType,
    };
  });
}

export function compareVoyages(
  selected: ClassVoyageRecord | undefined,
  voyages: readonly ClassVoyageRecord[],
  map: JourneyMapConfig,
): readonly VoyageComparison[] {
  if (selected === undefined) return [];
  const selectedLocations = new Set(selected.route.flatMap((point) => point.locationId ?? []));
  return voyages
    .filter((voyage) => voyage.voyageId !== selected.voyageId)
    .map((voyage) => {
      const routeLocations = new Set(voyage.route.flatMap((point) => point.locationId ?? []));
      const sharedIds = [...selectedLocations].filter((locationId) =>
        routeLocations.has(locationId),
      );
      const sharedLocationNames = sharedIds.map(
        (locationId) =>
          map.locations.find((location) => location.id === locationId)?.shortName ?? locationId,
      );
      const uniqueLocationCount = [...routeLocations].filter(
        (locationId) => !selectedLocations.has(locationId),
      ).length;
      const summary =
        sharedLocationNames.length > 0
          ? `Shared ${sharedLocationNames.join(' and ')} before the routes separated.`
          : 'This voyage followed a completely different set of named stops.';
      return { voyage, sharedLocationNames, uniqueLocationCount, summary };
    });
}

export function summarizeClassPerformance(
  summary: JourneyClassSummary | undefined,
): ClassPerformanceSnapshot {
  const members = summary?.members ?? [];
  const possibleSteps = members.reduce((total, member) => total + member.totalStepCount, 0);
  const completedSteps = members.reduce((total, member) => total + member.completedStepCount, 0);
  const assessments = members.flatMap((member) => member.submission?.mastery ?? []);
  const reasoningReady = assessments.filter(
    (assessment) => assessment.level !== 'developing',
  ).length;
  return {
    completionPercent: possibleSteps === 0 ? 0 : Math.round((completedSteps / possibleSteps) * 100),
    reasoningReadyPercent:
      assessments.length === 0 ? 0 : Math.round((reasoningReady / assessments.length) * 100),
    approvedCount: members.filter((member) => member.submission?.status === 'approved').length,
    awaitingReviewCount: members.filter((member) => member.submission?.status === 'submitted')
      .length,
    revisionCount: members.filter(
      (member) =>
        member.submission?.status === 'revision-requested' ||
        (member.submission?.revision ?? 0) > 1,
    ).length,
  };
}

export function buildClassStoryBeats(
  voyages: readonly ClassVoyageRecord[],
  map: JourneyMapConfig,
  summary: JourneyClassSummary | undefined,
): readonly ClassStoryBeat[] {
  if (voyages.length === 0) return [];
  const namedPoints = voyages.flatMap((voyage) =>
    voyage.route.flatMap((point) => (point.locationId ? [{ voyage, point }] : [])),
  );
  const startNames = [
    ...new Set(
      voyages.flatMap((voyage) => {
        const id = voyage.route.find((point) => point.locationId)?.locationId;
        return id ? [map.locations.find((location) => location.id === id)?.shortName ?? id] : [];
      }),
    ),
  ];
  const stormMoments = namedPoints.filter(({ point }) => point.eventType === 'storm');
  const destinationNames = [
    ...new Set(
      voyages.flatMap((voyage) => {
        const id = [...voyage.route].reverse().find((point) => point.locationId)?.locationId;
        return id ? [map.locations.find((location) => location.id === id)?.shortName ?? id] : [];
      }),
    ),
  ];
  const revisedCount =
    summary?.members.filter(
      (member) =>
        member.submission?.status === 'revision-requested' ||
        (member.submission?.revision ?? 0) > 1,
    ).length ?? 0;

  return [
    {
      id: 'class-story-departure',
      kicker: 'Opening scene',
      title: `${voyages.length} crews leave the chart table`,
      body: `${startNames.join(' and ')} become the starting points for a class full of competing plans.`,
      stat: `${startNames.length} first recorded port${startNames.length === 1 ? '' : 's'}`,
    },
    {
      id: 'class-story-crisis',
      kicker: 'Turning point',
      title: stormMoments.length > 0 ? 'The storm redraws the race' : 'The routes split',
      body:
        stormMoments.length > 0
          ? `${stormMoments.map(({ point }) => point.eventLabel).join(' · ')}. One shared danger produces very different consequences.`
          : 'Crews use the same map evidence but defend different passages and tradeoffs.',
      stat: `${stormMoments.length > 0 ? stormMoments.length : voyages.length} route-changing moment${(stormMoments.length > 0 ? stormMoments.length : voyages.length) === 1 ? '' : 's'}`,
    },
    {
      id: 'class-story-destinations',
      kicker: 'Big reveal',
      title: `${destinationNames.length} endings—no single version of success`,
      body: `The final map reaches ${destinationNames.join(', ')} and makes distance, safety, impact, and discovery visible together.`,
      stat: `${destinationNames.length} final destinations`,
    },
    {
      id: 'class-story-revision',
      kicker: 'Reflection',
      title: `${revisedCount} crews change their thinking`,
      body: 'The final story shows revisions beside the route, so learning is visible as a change in reasoning—not just a finished line.',
      stat: `${revisedCount} revised records`,
    },
  ];
}
