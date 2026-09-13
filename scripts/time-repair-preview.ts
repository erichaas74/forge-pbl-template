/** Isolated local development entry; production uses the registered project launcher. */
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from '../src/app/app';
import { ProjectHomeComponent } from '../src/app/features/project-home/project-home.component';
import { createLocalPreviewSession } from '../src/app/core/context/project-session-context';
import { requireTimeRepairConfig } from '../src/app/templates/time-repair/domain/time-repair.validation';
import { BrowserTimeRepairPersistence } from '../src/app/templates/time-repair/runtime/time-repair.persistence';
import {
  TIME_REPAIR_CONFIG,
  TIME_REPAIR_PERSISTENCE,
  TIME_REPAIR_SESSION,
  TimeRepairRuntime,
} from '../src/app/templates/time-repair/runtime/time-repair.runtime';
import { TimeRepairPageComponent } from '../src/app/templates/time-repair/ui/time-repair-page.component';
import raw from '../public/projects/exploration-time-repair/project.json';

const config = requireTimeRepairConfig(raw);
const session = createLocalPreviewSession(config.projectId, config.projectVersion);
bootstrapApplication(App, {
  providers: [
    provideRouter([
      { path: 'projects', component: ProjectHomeComponent },
      { path: 'projects/' + config.projectId, component: TimeRepairPageComponent },
      { path: '', pathMatch: 'full', redirectTo: 'projects/' + config.projectId },
    ]),
    { provide: TIME_REPAIR_CONFIG, useValue: config },
    { provide: TIME_REPAIR_SESSION, useValue: session },
    {
      provide: TIME_REPAIR_PERSISTENCE,
      useFactory: () => new BrowserTimeRepairPersistence(config, session),
    },
    TimeRepairRuntime,
  ],
}).catch((error) => console.error(error));
