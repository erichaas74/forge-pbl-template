import { describe, expect, it, vi } from 'vitest';
// Routing is under test; Phaser's browser-only canvas probe is outside this boundary.
vi.mock('phaser', () => ({}));
import fixture from '../../../../../../public/projects/shadow-gallery/versions/2.0.0/project.json';
import { createLocalPreviewSession } from '../../../../core/context/project-session-context';
import { projectCatalog } from '../../../../projects/project-catalog';
import { heistLauncher } from '../../../../runtime/project-launch/template-launchers/heist.launcher';
import { RestorationWeekWorkspaceComponent } from './restoration-week-workspace.component';
import { RestorationCollectionComponent } from '../restoration-collection.component';
describe('Restoration preview launch boundary', () => {
  it('uses weekly tools only for configured local previews, retaining final-demo and assessed routing', async () => {
    const project = projectCatalog.find(p => p.id === fixture.projectId)!;
    const request = { project, projectDefinition: fixture, session: createLocalPreviewSession(project.id, project.projectVersion) };
    expect((await heistLauncher.load(request)).component).toBe(RestorationWeekWorkspaceComponent);
    expect((await heistLauncher.load({ ...request, view: 'final-demo' })).component).toBe(RestorationCollectionComponent);
    expect((await heistLauncher.load({ ...request, session: { ...request.session, mode: 'student' } })).component).toBe(RestorationCollectionComponent);
    const { previewWeeks: _unused, ...legacy } = fixture;
    expect((await heistLauncher.load({ ...request, projectDefinition: legacy })).component).toBe(RestorationCollectionComponent);
  });
});
