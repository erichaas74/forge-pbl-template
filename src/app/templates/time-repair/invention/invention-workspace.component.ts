import { ChangeDetectionStrategy, Component, effect, inject, untracked } from '@angular/core';
import { PROJECT_LESSON_FOCUS } from '../../../shared/project-lessons/project-lesson-focus';
import {
  INVENTION_CONTEXT,
  INVENTION_PERSISTENCE,
  INVENTION_PROJECT,
  InventionRuntime,
} from './invention.runtime';
import { BrowserInventionPersistence } from './invention.persistence';
import { PressWorkbenchComponent } from './press-workbench.component';
import { CourtyardSceneComponent } from './courtyard-scene.component';
import { KnowledgeHostComponent } from './knowledge/knowledge-host.component';
import { KNOWLEDGE_PERSISTENCE, KnowledgeRuntime } from './knowledge/knowledge.runtime';
import { BrowserKnowledgePersistence } from './knowledge/knowledge.persistence';

@Component({
  selector: 'app-invention-workspace',
  imports: [PressWorkbenchComponent, CourtyardSceneComponent, KnowledgeHostComponent],
  providers: [
    InventionRuntime,
    KnowledgeRuntime,
    {
      provide: KNOWLEDGE_PERSISTENCE,
      useFactory: () => new BrowserKnowledgePersistence(inject(INVENTION_CONTEXT)),
    },
    {
      provide: INVENTION_PERSISTENCE,
      useFactory: () =>
        new BrowserInventionPersistence(inject(INVENTION_PROJECT), inject(INVENTION_CONTEXT)),
    },
  ],
  templateUrl: './invention-workspace.component.html',
  styleUrl: './invention-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventionWorkspaceComponent {
  readonly r = inject(InventionRuntime);
  readonly k = inject(KnowledgeRuntime);
  private readonly focus = inject(PROJECT_LESSON_FOCUS, { optional: true });
  constructor() {
    effect(() => {
      const lesson = this.focus?.();
      if (lesson && !this.r.example) untracked(() => this.r.open(lesson.number));
    });
  }
}
