import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import type { JourneyPathChoice, JourneyPathNode } from '../domain/journey-path.models';

@Component({
  selector: 'app-journey-location-scene',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './journey-location-scene.component.html',
  styleUrl: './journey-location-scene.component.scss',
})
export class JourneyLocationSceneComponent {
  readonly node = input.required<JourneyPathNode>();
  readonly selections = input<readonly JourneyPathChoice[]>([]);
  readonly activeEventId = input<string>();
  readonly inspected = output<string>();
  readonly paused = signal(false);
  readonly effects = computed(() => new Set(this.selections().map(choice => choice.effect)));
  readonly storm = computed(() => this.node().scene === 'storm' || this.node().scene === 'cape');
  readonly damagedSail = computed(() => this.node().events.some(event => event.object.icon === 'sail'));
  readonly town = computed(() => ['harbor', 'home'].includes(this.node().scene ?? ''));
  readonly inspectedEvent = computed(() => this.node().events.find(event => event.id === this.activeEventId()));
  readonly skyBirds = [0, 1, 2];
  readonly waves = [0, 1, 2, 3, 4, 5];
  readonly buildings = [0, 1, 2, 3, 4, 5, 6];
  readonly barrels = [0, 1, 2, 3];
  symbol(icon: string): string { return ({compass: '⌖', cargo: '▥', sail: '⚑', shore: '⇄', log: '▤'} as Record<string,string>)[icon] ?? '•'; }
}
