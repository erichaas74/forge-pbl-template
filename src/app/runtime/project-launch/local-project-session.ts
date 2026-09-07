import {
  createLocalPreviewSession,
  type ProjectSessionContext,
} from '../../core/context/project-session-context';
import type { ProjectCatalogEntry } from '../../projects/project-catalog';
import { demoJourneyEnrollment } from './template-launchers/journey-replay.preview';

const previewSessionAdapters: Readonly<
  Record<string, (project: ProjectCatalogEntry) => ProjectSessionContext>
> = {
  'journey-replay': (project) => {
    const enrollment = demoJourneyEnrollment();
    return createLocalPreviewSession(project.id, project.projectVersion, {
      tenantId: enrollment.tenantId,
      classId: enrollment.classId,
      actorId: enrollment.studentId,
      studentId: enrollment.studentId,
      actorDisplayName: enrollment.studentDisplayName,
    });
  },
};

export function localProjectSession(project: ProjectCatalogEntry): ProjectSessionContext {
  return (
    previewSessionAdapters[project.template.id]?.(project) ??
    createLocalPreviewSession(project.id, project.projectVersion)
  );
}
