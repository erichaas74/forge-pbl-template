import type { Type } from '@angular/core';
import { IllustratedComparisonComponent } from '../../plugins/intro-scenes/illustrated-comparison.component';
import { DecisionSceneComponent } from '../../plugins/intro-scenes/decision-scene.component';

/** Scene mechanics are plugins. A project's characters, dialogue and assets are configuration. */
export class ProjectTeaserRegistry {
  private readonly entries = new Map<string, Type<unknown>>();
  register(id: string, renderer: Type<unknown>): void {
    if (this.entries.has(id)) throw new Error(`DUPLICATE_REGISTRATION: Opening scene ${id}.`);
    this.entries.set(id, renderer);
  }
  require(id: string): Type<unknown> {
    const component = this.entries.get(id);
    if (!component) throw new Error(`CAPABILITY_NOT_INSTALLED: Opening scene ${id}.`);
    return component;
  }
}

export const projectTeaserRegistry = new ProjectTeaserRegistry();
projectTeaserRegistry.register('illustrated-comparison', IllustratedComparisonComponent);
projectTeaserRegistry.register('decision-scene', DecisionSceneComponent);
