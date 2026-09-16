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
  readonly hasHeadlines = computed(() => (this.d().headlines?.length ?? 0) > 0);
  readonly leadHeadline = computed(() => this.d().headlines?.[0] ?? '');
  readonly headlineCards = computed(() => (this.d().headlines ?? []).slice(1, 5));
  readonly view = computed(() => timelineValue(this.k.state(), 'view'));
  n(key: string): number {
    return timelineValue(this.k.state(), key);
  }

  headlineLines(headline: string, maxLength = 30): readonly string[] {
    const words = headline.split(' ');
    const lines: string[] = [];
    let line = '';
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (line && next.length > maxLength) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) lines.push(line);
    return lines;
  }
}
