import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { MapLocation } from '../domain/journey-replay.models';
import { JourneyReplayRuntimeService } from '../runtime/journey-replay-runtime.service';
import { ClassJourneyMapComponent } from './class-journey-map.component';
import { JourneyDecisionPanelComponent } from './journey-decision-panel.component';
import { JourneyReplayPlayerComponent } from './journey-replay-player.component';
import { LivingJourneyMapComponent } from './map/living-journey-map.component';

type JourneyUtility = 'mission' | 'location' | 'manifest' | 'log';

@Component({
  selector: 'app-journey-replay-page',
  imports: [
    RouterLink,
    ClassJourneyMapComponent,
    JourneyDecisionPanelComponent,
    JourneyReplayPlayerComponent,
    LivingJourneyMapComponent,
  ],
  templateUrl: './journey-shell.html',
  styleUrl: './journey-shell.scss',
})
export class JourneyReplayPageComponent {
  readonly runtime = inject(JourneyReplayRuntimeService);
  readonly view = signal<'journey' | 'replay' | 'class'>('journey');
  readonly utility = signal<JourneyUtility | undefined>(undefined);
  readonly inspectedLocation = signal<MapLocation | undefined>(undefined);
  readonly candidateRouteIds = computed(() =>
    this.runtime.step()?.choices.flatMap((choice) => (choice.routeId ? [choice.routeId] : [])) ?? [],
  );

  openUtility(utility: JourneyUtility): void {
    this.utility.update((current) => (current === utility ? undefined : utility));
  }

  inspectLocation(location: MapLocation): void {
    this.inspectedLocation.set(location);
    this.utility.set('location');
  }

  openReplay(): void {
    this.utility.set(undefined);
    this.view.set('replay');
  }

  openClassMap(): void {
    this.utility.set(undefined);
    this.view.set('class');
  }

  returnToJourney(): void {
    this.view.set('journey');
  }

  choiceLabel(stepId: string): string {
    const record = this.runtime.state().completedSteps.find((item) => item.stepId === stepId);
    const step = this.runtime.config.steps.find((item) => item.id === stepId);
    return step?.choices.find((choice) => choice.id === record?.choiceId)?.label ?? 'Awaiting decision';
  }
}
