import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { KnowledgeRuntime } from './knowledge.runtime';
import { newspaperValue } from './newspaper.activity';
import { SceneButtonDirective } from './scene-tools';

@Component({
  selector: 'app-knowledge-newspaper',
  imports: [SceneButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './newspaper.component.html',
  styleUrls: ['./knowledge-scene.scss', './newspaper.component.scss'],
})
export class NewspaperComponent {
  readonly k = inject(KnowledgeRuntime);
  readonly d = computed(() => this.k.config()!.newspaper!);
  readonly view = computed(() => newspaperValue(this.k.state(), 'view'));
  n(key: string): number {
    return newspaperValue(this.k.state(), key);
  }
  row(index: number): number {
    return Math.floor(index / 2);
  }
  columnX(index: number): number {
    return 26 + (index % 2) * 122;
  }
  columnY(index: number): number {
    return 274 + this.row(index) * 57;
  }
}
