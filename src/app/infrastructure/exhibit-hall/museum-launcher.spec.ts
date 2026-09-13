import { TestBed } from '@angular/core/testing';
import { createLocalPreviewSession } from '../../core/context/project-session-context';
import { studentMuseumConfig as config } from '../../projects/class-exhibit-hall/student-museum.config';
import { projectCatalog } from '../../projects/project-catalog';
import { exhibitHallLauncher } from '../../runtime/project-launch/template-launchers/exhibit-hall.launcher';
import {
  EXHIBIT_HALL_CONFIG,
  MUSEUM_PUBLICATION,
} from '../../templates/exhibit-hall/runtime/exhibit-hall.tokens';

describe('museum launch scope', () => {
  afterEach(() => TestBed.resetTestingModule());
  it('shares one class museum across separate student attempts and binds the HTTP adapter for official sessions', async () => {
    const project = projectCatalog.find((entry) => entry.id === config.projectId)!;
    for (const actorId of ['student-a', 'student-b']) {
      const target = await exhibitHallLauncher.load({
        project,
        projectDefinition: config,
        session: createLocalPreviewSession(config.projectId, config.projectVersion, {
          actorId,
          attemptId: actorId + '-attempt',
          authorityMode: 'serverAuthoritative',
          teamId: config.viewer.teamId,
        }),
      });
      TestBed.configureTestingModule({ providers: [...target.providers] });
      expect(TestBed.inject(EXHIBIT_HALL_CONFIG).projectInstanceId).toBe(config.projectInstanceId);
      expect(TestBed.inject(EXHIBIT_HALL_CONFIG).seedBoards).toEqual([]);
      expect(TestBed.inject(MUSEUM_PUBLICATION)).toBeDefined();
      TestBed.resetTestingModule();
    }
  });
  it('keeps the local preview independent of network publication', async () => {
    const target = await exhibitHallLauncher.load({
      project: projectCatalog.find((entry) => entry.id === config.projectId)!,
      projectDefinition: config,
      session: createLocalPreviewSession(config.projectId, config.projectVersion),
    });
    TestBed.configureTestingModule({ providers: [...target.providers] });
    expect(TestBed.inject(MUSEUM_PUBLICATION, null)).toBeNull();
  });
});
