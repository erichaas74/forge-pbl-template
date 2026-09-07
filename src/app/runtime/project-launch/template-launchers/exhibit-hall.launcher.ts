import type { ExhibitProjectConfig } from '../../../templates/exhibit-hall/domain/exhibit-types';
import { BrowserExhibitPersistenceAdapter } from '../../../templates/exhibit-hall/persistence/exhibit-persistence';
import { ExhibitHallRuntimeService } from '../../../templates/exhibit-hall/runtime/exhibit-hall-runtime.service';
import {
  EXHIBIT_HALL_CONFIG,
  EXHIBIT_HALL_PERSISTENCE,
  EXHIBIT_RENDERER_COMPONENTS,
  EXHIBIT_HALL_SESSION_CONTEXT,
} from '../../../templates/exhibit-hall/runtime/exhibit-hall.tokens';
import { MuseumBoardComponent } from '../../../templates/exhibit-hall/ui/museum-board.component';
import { SciencePosterDemoComponent } from '../../../templates/exhibit-hall/ui/science-poster-demo.component';
import type { ProjectLaunchRequest, TemplateLauncher } from '../project-launch.contracts';

export const exhibitHallLauncher: TemplateLauncher = {
  templateId: 'exhibit-hall',
  async load(request: ProjectLaunchRequest) {
    const definition = requireExhibitConfig(request.projectDefinition, request.project.id);
    const config: ExhibitProjectConfig = {
      ...definition,
      courseSectionId: request.session.classId ?? definition.courseSectionId,
      projectInstanceId: request.session.attemptId ?? definition.projectInstanceId,
      viewer: {
        ...definition.viewer,
        studentId: request.session.studentId ?? request.session.actorId,
        studentDisplayName: request.session.actorDisplayName,
        teamId: request.session.teamId ?? definition.viewer.teamId,
      },
    };
    const module = await import('../../../templates/exhibit-hall/ui/exhibit-hall-page.component');
    return {
      component: module.ExhibitHallPageComponent,
      providers: [
        { provide: EXHIBIT_HALL_CONFIG, useValue: config },
        { provide: EXHIBIT_HALL_SESSION_CONTEXT, useValue: request.session },
        {
          provide: EXHIBIT_HALL_PERSISTENCE,
          useFactory: () => new BrowserExhibitPersistenceAdapter(undefined, request.session),
        },
        {
          provide: EXHIBIT_RENDERER_COMPONENTS,
          useValue: [
            { rendererType: 'museum-board-v1', component: MuseumBoardComponent },
            { rendererType: 'science-poster-demo', component: SciencePosterDemoComponent },
          ],
        },
        ExhibitHallRuntimeService,
      ],
    };
  },
};

function requireExhibitConfig(value: unknown, projectId: string): ExhibitProjectConfig {
  if (!isRecord(value) || value['projectId'] !== projectId || !Array.isArray(value['teams'])) {
    throw new Error(`Project "${projectId}" is not a valid exhibit-hall definition.`);
  }
  return value as unknown as ExhibitProjectConfig;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
