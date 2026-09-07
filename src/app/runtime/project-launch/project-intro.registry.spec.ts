import { projectCatalog } from '../../projects/project-catalog';
import { projectIntros } from '../../projects/project-intros';
import { ProjectIntroRegistry } from './project-intro.registry';
import { localProjectSession } from './local-project-session';
import { demoJourneyEnrollment } from './template-launchers/journey-replay.preview';
import { createLocalTemplateLauncherRegistry } from './template-launcher.registry';
import { LocalProjectDefinitionSource } from './local-project-definition.source';

describe('project opening registration', () => {
  it('provides a validated, distinct opening and final example for every built-in project', () => {
    const registry = new ProjectIntroRegistry(projectIntros);
    for (const project of projectCatalog) {
      const config = registry.find(project.id)!;
      expect(config).toBeDefined();
      expect(project.route).toBe(`/projects/${project.id}`);
      expect(config.finalExample.chapters).toHaveLength(3);
    }
    expect(new Set(projectIntros.map((config) => config.headline)).size).toBe(projectIntros.length);
    expect(new Set(projectIntros.map((config) => config.image)).size).toBe(projectIntros.length);
  });

  it('rejects duplicate registrations, missing content and duplicate choices', () => {
    expect(() => new ProjectIntroRegistry([projectIntros[0], projectIntros[0]])).toThrow();
    expect(() => new ProjectIntroRegistry([{ ...projectIntros[0], headline: '' }])).toThrow();
    expect(
      () =>
        new ProjectIntroRegistry([
          {
            ...projectIntros[0],
            challenge: {
              ...projectIntros[0].challenge,
              options: [
                projectIntros[0].challenge.options[0],
                projectIntros[0].challenge.options[0],
              ],
            },
          },
        ]),
    ).toThrow();
    expect(new ProjectIntroRegistry(projectIntros).find('unregistered-project')).toBeUndefined();
  });

  it('keeps the journey preview identity and supports its activity through the common host', async () => {
    const project = projectCatalog.find((item) => item.id === 'race-around-the-world')!;
    const oldEnrollment = demoJourneyEnrollment();
    const session = localProjectSession(project);
    expect(session.studentId).toBe(oldEnrollment.studentId);
    expect(session.tenantId).toBe(oldEnrollment.tenantId);
    expect(session.classId).toBe(oldEnrollment.classId);
    expect(
      (await createLocalTemplateLauncherRegistry().require(project.template.id)).templateId,
    ).toBe('journey-replay');
  });

  it('resolves every launch destination to its existing activity and providers', async () => {
    const source = new LocalProjectDefinitionSource();
    const registry = createLocalTemplateLauncherRegistry();
    for (const project of projectCatalog) {
      const definition = await source.load(project);
      const launcher = await registry.require(project.template.id);
      const target = await launcher.load({
        project,
        projectDefinition: definition,
        session: localProjectSession(project),
        view: 'experience',
      });
      expect(target.component).toBeDefined();
      expect(target.providers.length).toBeGreaterThan(0);
    }
  });
});
