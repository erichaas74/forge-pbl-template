import { InMemoryProjectPackageSource } from '../infrastructure/persistence/in-memory-project-package-source';
import { ProjectTemplateResolverService } from '../core/templates/project-template-resolver.service';
import {
  simpleJourneyReplayLocation,
  simpleJourneyReplayPackage,
} from '../testing/simple-journey-replay-package.fixture';
import { LocalJourneyReplayRuntime } from './local-journey-replay-runtime';
import { createLocalTemplateRegistry } from './local-template-registry';

describe('journey-replay template registration', () => {
  it('registers the reusable journey project type', () => {
    const registry = createLocalTemplateRegistry(new InMemoryProjectPackageSource({}));

    expect(registry.resolve('journey-replay', '1.0')).toMatchObject({
      ok: true,
      value: {
        id: 'journey-replay',
        version: '1.0.0',
        projectTypes: ['journey-replay'],
        packageDescriptor: {
          requiredFiles: ['project.json', 'journey.json', 'map.json', 'replay.json'],
        },
      },
    });
  });

  it('resolves and validates a declarative journey package through the shared registry', async () => {
    const source = new InMemoryProjectPackageSource({
      [simpleJourneyReplayLocation.reference]: simpleJourneyReplayPackage,
    });
    const registry = createLocalTemplateRegistry(source);
    const result = await new ProjectTemplateResolverService(source, registry).resolve<LocalJourneyReplayRuntime>(
      simpleJourneyReplayLocation,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error(result.error.message);
    const loaded = await result.value.runtime.loadProject(simpleJourneyReplayLocation);
    expect(loaded.issues).toEqual([]);
    expect(loaded.graph?.map.locations.length).toBeGreaterThan(5);
    expect(loaded.graph?.capabilities).toContain('authoritativeJourneyPersistence');
  });
});
