import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DebateStudioRuntimeService } from '../runtime/debate-studio-runtime.service';
import { DebateFactionRailComponent } from './debate-faction-rail.component';
import { DebateShowcaseComponent } from './debate-showcase.component';
import { DebateWorkbenchComponent } from './debate-workbench.component';

@Component({
  selector: 'app-debate-studio-page',
  imports: [
    RouterLink,
    DebateFactionRailComponent,
    DebateShowcaseComponent,
    DebateWorkbenchComponent,
  ],
  templateUrl: './debate-studio-page.component.html',
  styleUrl: './debate-studio-page.component.scss',
})
export class DebateStudioPageComponent {
  readonly runtime = inject(DebateStudioRuntimeService);
  readonly docketOpen = signal(false);

  toggleDocket(): void {
    this.docketOpen.update((open) => !open);
  }
}
