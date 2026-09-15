import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { KnowledgeRuntime } from './knowledge.runtime';
import { timelineValue } from './timeline.activity';
import { SceneButtonDirective } from './scene-tools';

@Component({
  selector: 'app-knowledge-timeline',
  imports: [SceneButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timeline.component.html',
  styleUrls: ['./knowledge-scene.scss', './timeline.component.scss'],
})
export class TimelineComponent {
  readonly k = inject(KnowledgeRuntime);
  readonly d = computed(() => this.k.config()!.timeline!);
  readonly view = computed(() => timelineValue(this.k.state(), 'view'));
  n(key: string): number {
    return timelineValue(this.k.state(), key);
  }
}
