import {
  Component,
  effect,
  input,
  inputBinding,
  output,
  outputBinding,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { projectTeaserRegistry } from '../../runtime/project-launch/project-teaser.registry';
import {
  validateTeaser,
  type ProjectTeaserConfig,
  type ProjectTeaserResult,
} from '../../shared/project-intro/project-teaser.models';

@Component({
  selector: 'app-project-teaser-host',
  template:
    '@if (error(); as message) { <p role="alert">{{ message }}</p> } <ng-container #outlet />',
})
export class ProjectTeaserHostComponent {
  readonly config = input.required<ProjectTeaserConfig>();
  readonly storyMode = input(false);
  readonly completed = output<ProjectTeaserResult>();
  readonly error = signal<string | undefined>(undefined);
  private readonly outlet = viewChild('outlet', { read: ViewContainerRef });
  constructor() {
    effect((cleanup) => {
      const outlet = this.outlet();
      if (!outlet) return;
      const config = this.config();
      try {
        validateTeaser(config);
        const component = projectTeaserRegistry.require(config.type);
        const ref = outlet.createComponent(component, {
          bindings: [
            inputBinding('config', () => config),
            ...(config.type === 'illustrated-comparison'
              ? [inputBinding('storyMode', () => this.storyMode())]
              : []),
            outputBinding<ProjectTeaserResult>('completed', (result) =>
              this.completed.emit(result),
            ),
          ],
        });
        this.error.set(undefined);
        cleanup(() => ref.destroy());
      } catch (error: unknown) {
        this.error.set(
          error instanceof Error ? error.message : 'The opening scene could not load.',
        );
      }
    });
  }
}
