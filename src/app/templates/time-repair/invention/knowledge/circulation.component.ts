import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { KnowledgeRuntime } from './knowledge.runtime';
import { circulationValue } from './circulation.activity';
import { SceneButtonDirective } from './scene-tools';

@Component({
  selector: 'app-knowledge-circulation',
  imports: [SceneButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './circulation.component.html',
  styleUrls: ['./knowledge-scene.scss', './circulation.component.scss'],
})
export class CirculationComponent {
  readonly k = inject(KnowledgeRuntime);
  readonly d = computed(() => this.k.config()!.circulation!);
  readonly reference = computed(() => !!this.k.state().values['reference']);
  readonly inspected = computed(() => this.d().destinations.some((p) => this.n('inspected-' + p.id)));
  readonly tables = [0, 1, 2];
  readonly sheets = [0, 1, 2, 3, 4, 5];
  readonly lines = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  n(key: string): number { return circulationValue(this.k.state(), key); }
}
