import type { ProjectPackageLoadResult } from '../packages/project-package-contracts';
import type {
  ProjectTemplateRegistration,
  ProjectTemplateRuntime,
} from './template-contracts';
import { TemplateRegistry } from './template-registry';

describe('TemplateRegistry', () => {
  it('resolves the newest registered implementation compatible with a requested major', () => {
    const registry = new TemplateRegistry();
    registry.register(registration('investigation', '1.0.0', [1]));
    registry.register(registration('investigation', '1.2.0', [1]));
    registry.register(registration('investigation', '2.0.0', [2]));

    const firstMajor = registry.resolve('investigation', '1.9.0');
    const secondMajor = registry.resolve('investigation', '2.1.0');

    expect(firstMajor).toMatchObject({ ok: true, value: { version: '1.2.0' } });
    expect(secondMajor).toMatchObject({ ok: true, value: { version: '2.0.0' } });
    expect(registry.list().map(({ id, version }) => `${id}@${version}`)).toEqual([
      'investigation@1.0.0',
      'investigation@1.2.0',
      'investigation@2.0.0',
    ]);
  });

  it('returns structured errors for unknown templates and unsupported majors', () => {
    const registry = new TemplateRegistry();
    registry.register(registration('investigation', '1.0.0', [1]));

    expect(registry.resolve('missing', '1.0.0')).toMatchObject({
      ok: false,
      error: { code: 'TEMPLATE_NOT_FOUND' },
    });
    expect(registry.resolve('investigation', '2.0.0')).toMatchObject({
      ok: false,
      error: { code: 'TEMPLATE_VERSION_UNSUPPORTED' },
    });
    expect(registry.resolve('investigation', 'latest')).toMatchObject({
      ok: false,
      error: { code: 'INVALID_TEMPLATE_VERSION' },
    });
  });

  it('rejects duplicate versions and invalid registration metadata', () => {
    const registry = new TemplateRegistry();
    registry.register(registration('investigation', '1.0.0', [1]));

    expect(registry.register(registration('investigation', '1.0.0', [1]))).toMatchObject({
      ok: false,
      error: { code: 'DUPLICATE_TEMPLATE_REGISTRATION' },
    });
    expect(registry.register(registration('investigation', '1.0', [1]))).toMatchObject({
      ok: false,
      error: { code: 'DUPLICATE_TEMPLATE_REGISTRATION' },
    });
    expect(registry.register(registration(' investigation ', '1.0.0', [1]))).toMatchObject({
      ok: false,
      error: { code: 'INVALID_TEMPLATE_ID' },
    });
    expect(registry.register(registration('other', '1', [1]))).toMatchObject({
      ok: false,
      error: { code: 'INVALID_TEMPLATE_VERSION' },
    });
    expect(registry.register(registration('other', '1.0.0', []))).toMatchObject({
      ok: false,
      error: { code: 'INVALID_TEMPLATE_COMPATIBILITY' },
    });
  });

  it('copies and freezes mutable registration metadata', () => {
    const majors = [1];
    const projectTypes = ['investigation'];
    const registry = new TemplateRegistry();
    const result = registry.register({
      ...registration('investigation', '1.0.0', majors),
      projectTypes,
    });
    majors.push(2);
    projectTypes.push('changed');

    expect(result).toMatchObject({
      ok: true,
      value: {
        compatibleTemplateMajorVersions: [1],
        projectTypes: ['investigation'],
      },
    });
    if (result.ok) {
      expect(Object.isFrozen(result.value)).toBe(true);
      expect(Object.isFrozen(result.value.packageDescriptor.requiredFiles)).toBe(true);
    }
  });
});

function registration(
  id: string,
  version: string,
  compatibleTemplateMajorVersions: number[],
): ProjectTemplateRegistration<ProjectTemplateRuntime> {
  return {
    id,
    version,
    compatibleTemplateMajorVersions,
    projectTypes: ['investigation'],
    packageDescriptor: { requiredFiles: ['project.json'], optionalFiles: [] },
    createRuntime: () => ({
      loadProject: async () =>
        ({ issues: [], fromCache: false }) as ProjectPackageLoadResult<unknown>,
    }),
  };
}
