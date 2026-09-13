import { Component, input, signal } from '@angular/core';
import type { JourneyAdventureDefinition } from '../domain/journey-replay.models';

@Component({
  selector: 'app-journey-adventure-scene',
  templateUrl: './journey-adventure-scene.component.html',
  styleUrl: './journey-adventure-scene.component.scss',
})
export class JourneyAdventureSceneComponent {
  readonly adventure = input.required<JourneyAdventureDefinition>();
  readonly location = input.required<string>();
  readonly paused = signal(false);
}
