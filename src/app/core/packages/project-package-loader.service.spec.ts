import { InMemoryProjectPackageSource } from '../../infrastructure/persistence/in-memory-project-package-source';
import { LocalInvestigationRuntime } from '../../runtime/local-investigation-runtime';
import {
  simpleProjectLocation,
  simpleProjectPackage,
} from '../../testing/simple-project-package.fixture';
import { FixedClock } from '../../testing/runtime-test-helpers';

describe('ProjectPackageLoaderService', () => {
  it('loads, indexes, validates, freezes, and caches a modular fixture package', async () => {
    const platform = platformFor(simpleProjectPackage);

    const first = await platform.loadProject(simpleProjectLocation);
    const second = await platform.loadProject(simpleProjectLocation);

    expect(first.issues.filter((issue) => issue.severity === 'error')).toEqual([]);
    expect(first.graph?.evidenceById.get('ev-result')?.title).toBe('Activity Result');
    expect(first.graph?.resourcesById.get('resource-credits')?.initialAmount).toBe(2);
    expect(Object.isFrozen(first.graph)).toBe(true);
    expect(first.fromCache).toBe(false);
    expect(second.fromCache).toBe(true);
    expect(second.graph).toBe(first.graph);
  });

  it('does not share project-definition cache entries across tenants', async () => {
    const platform = platformFor(simpleProjectPackage);
    const otherTenantLocation = {
      ...simpleProjectLocation,
      tenantId: 'tenant-school-2',
    };

    const first = await platform.loadProject(simpleProjectLocation);
    const second = await platform.loadProject(otherTenantLocation);

    expect(first.fromCache).toBe(false);
    expect(second.fromCache).toBe(false);
    expect(first.graph?.tenantId).toBe('tenant-school-1');
    expect(second.graph?.tenantId).toBe('tenant-school-2');
    expect(second.graph).not.toBe(first.graph);
  });

  it('allows absent optional package files', async () => {
    const platform = platformFor(simpleProjectPackage);

    const result = await platform.loadProject(simpleProjectLocation);

    expect(result.graph).toBeDefined();
    expect(result.graph?.teams).toBeUndefined();
  });

  it('returns a structured issue for a missing required file', async () => {
    const files = clonePackage();
    delete files['rules.json'];

    const result = await platformFor(files).loadProject(simpleProjectLocation);

    expect(result.graph).toBeUndefined();
    expect(result.issues).toContainEqual(
      expect.objectContaining({
        code: 'REQUIRED_FILE_MISSING',
        file: 'rules.json',
      }),
    );
  });

  it('detects duplicate IDs before creating the graph', async () => {
    const files = clonePackage();
    const evidence = files['evidence.json'] as { items: unknown[] };
    evidence.items.push(structuredClone(evidence.items[0]));

    const result = await platformFor(files).loadProject(simpleProjectLocation);

    expect(result.graph).toBeUndefined();
    expect(result.issues).toContainEqual(
      expect.objectContaining({ code: 'DUPLICATE_ID', entityId: 'ev-intro' }),
    );
  });

  it('returns structured capability and reference issues', async () => {
    const files = clonePackage();
    const manifest = files['project.json'] as { capabilities: string[] };
    manifest.capabilities.push('unsupported.requiredCapability');
    const investigation = files['investigation.json'] as {
      phases: Array<{ activityIds?: string[] }>;
    };
    investigation.phases[0]!.activityIds = ['act-missing'];

    const result = await platformFor(files).loadProject(simpleProjectLocation);

    expect(result.graph).toBeDefined();
    expect(result.issues.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(['CAPABILITY_NOT_INSTALLED', 'REFERENCE_NOT_FOUND']),
    );
  });
});

function clonePackage(): Record<string, unknown> {
  return structuredClone(simpleProjectPackage) as Record<string, unknown>;
}

function platformFor(files: Readonly<Record<string, unknown>>): LocalInvestigationRuntime {
  return new LocalInvestigationRuntime(
    new InMemoryProjectPackageSource({
      [simpleProjectLocation.reference]: files,
    }),
    new FixedClock(),
  );
}
