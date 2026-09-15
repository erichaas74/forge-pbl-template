import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type, computed, inject } from '@angular/core';
import { KnowledgeRuntime } from './knowledge.runtime';
import type { KnowledgeKind } from './knowledge.models';
import { ReconstructionComponent } from './reconstruction.component';
import { AssemblyComponent } from './assembly.component';
import { DiagramComponent } from './diagram.component';
import { DistributionComponent } from './distribution.component';
import { AccessComponent } from './access.component';
import { ApprenticeComponent } from './apprentice.component';
import { CirculationComponent } from './circulation.component';

export const KNOWLEDGE_RENDERERS: Readonly<Record<KnowledgeKind, Type<unknown>>> = {
  reconstruction: ReconstructionComponent,
  assembly: AssemblyComponent,
  diagram: DiagramComponent,
  distribution: DistributionComponent,
  access: AccessComponent,
  apprentice: ApprenticeComponent,
  circulation: CirculationComponent,
};
@Component({
  selector: 'app-knowledge-host',
  imports: [NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-container *ngComponentOutlet="renderer()" />`,
  styles: ':host{display:block;height:100%;min-width:0;}',
})
export class KnowledgeHostComponent {
  private readonly k = inject(KnowledgeRuntime);
  readonly renderer = computed(() => KNOWLEDGE_RENDERERS[this.k.config()!.kind]);
}
