import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { KnowledgeRuntime } from './knowledge.runtime';
import { interviewValue } from './interview.activity';
import { SceneButtonDirective } from './scene-tools';

@Component({
  selector: 'app-knowledge-interview',
  imports: [SceneButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './interview.component.html',
  styleUrls: ['./knowledge-scene.scss', './interview.component.scss'],
})
export class InterviewComponent {
  readonly k = inject(KnowledgeRuntime);
  readonly d = computed(() => this.k.config()!.interview!);
  readonly view = computed(() => interviewValue(this.k.state(), 'view'));
  n(key: string): number {
    return interviewValue(this.k.state(), key);
  }
}
