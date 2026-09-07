import { InMemoryProjectPackageSource } from '../infrastructure/persistence/in-memory-project-package-source';
import { ProjectTemplateResolverService } from '../core/templates/project-template-resolver.service';
import {
  simpleProjectLocation,
  simpleProjectPackage,
} from '../testing/simple-project-package.fixture';
import { FixedClock } from '../testing/runtime-test-helpers';
import { LocalInvestigationRuntime } from './local-investigation-runtime';
import { LocalSimulationDecisionRuntime } from './local-simulation-decision-runtime';
import { createLocalTemplateRegistry } from './local-template-registry';
import {
  simpleSimulationDecisionLocation,
  simpleSimulationDecisionPackage,
} from '../testing/simple-simulation-decision-package.fixture';

describe('local template composition', () => {
  it('registers Investigation and creates its runtime through the generic registry', async () => {
    const source = new InMemoryProjectPackageSource({
      [simpleProjectLocation.reference]: simpleProjectPackage,
    });
    const registry = createLocalTemplateRegistry(source, new FixedClock());

    const resolved = await new ProjectTemplateResolverService(
      source,
      registry,
    ).resolve<LocalInvestigationRuntime>(simpleProjectLocation);

    expect(resolved).toMatchObject({
      ok: true,
      value: {
        registration: {
          id: 'investigation',
          version: '1.0.0',
          projectTypes: ['investigation'],
        },
      },
    });
    if (!resolved.ok) {
      throw new Error(resolved.error.message);
    }
    const runtime = resolved.value.runtime;
    const loaded = await runtime.loadProject(simpleProjectLocation);
    expect(runtime).toBeInstanceOf(LocalInvestigationRuntime);
    expect(loaded.graph?.manifest.template).toEqual({
      id: 'investigation',
      version: '1.0',
    });
  });

  it('registers simulation-decision and loads its package through the generic registry', async () => {
    const source = new InMemoryProjectPackageSource({
      [simpleSimulationDecisionLocation.reference]: simpleSimulationDecisionPackage,
    });
    const registry = createLocalTemplateRegistry(source, new FixedClock());

    const resolved = await new ProjectTemplateResolverService(
      source,
      registry,
    ).resolve<LocalSimulationDecisionRuntime>(simpleSimulationDecisionLocation);

    expect(resolved).toMatchObject({
      ok: true,
      value: {
        registration: {
          id: 'simulation-decision',
          version: '1.0.0',
          projectTypes: ['simulation-decision'],
        },
      },
    });
    if (!resolved.ok) {
      throw new Error(resolved.error.message);
    }
    const loaded = await resolved.value.runtime.loadProject(simpleSimulationDecisionLocation);
    expect(resolved.value.runtime).toBeInstanceOf(LocalSimulationDecisionRuntime);
    expect(loaded.issues).toEqual([]);
    expect(loaded.graph?.manifest.template).toEqual({
      id: 'simulation-decision',
      version: '1.1',
    });
  });

  it('reports an unregistered package template without creating a runtime', async () => {
    const files = structuredClone(simpleProjectPackage);
    const manifest = files['project.json'] as Record<string, unknown>;
    manifest['template'] = { id: 'design-challenge', version: '1.0.0' };
    const source = new InMemoryProjectPackageSource({
      [simpleProjectLocation.reference]: files,
    });
    const registry = createLocalTemplateRegistry(source, new FixedClock());

    const resolved = await new ProjectTemplateResolverService(source, registry).resolve(
      simpleProjectLocation,
    );

    expect(resolved).toMatchObject({
      ok: false,
      error: {
        code: 'TEMPLATE_NOT_FOUND',
        templateId: 'design-challenge',
      },
    });
  });

  it('registers every installed project template at the composition boundary', () => {
    const registry = createLocalTemplateRegistry(
      new InMemoryProjectPackageSource({}),
      new FixedClock(),
    );

    expect(registry.list().map((registration) => registration.id)).toEqual([
      'debate-studio',
      'engineering-design',
      'exhibit-hall',
      'history-live-broadcast',
      'investigation',
      'journey-replay',
      'narrative-studio',
      'programming-automation',
      'simulation-decision',
    ]);
  });
});
