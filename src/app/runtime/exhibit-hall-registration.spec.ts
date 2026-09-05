import { InMemoryProjectPackageSource } from '../infrastructure/persistence/in-memory-project-package-source';
import { createLocalTemplateRegistry } from './local-template-registry';

describe('exhibit-hall template registration', () => {
  it('registers the exhibit-hall project template in the shared app registry', () => {
    const registry = createLocalTemplateRegistry(new InMemoryProjectPackageSource({}));

    expect(registry.resolve('exhibit-hall', '1.0')).toMatchObject({
      ok: true,
      value: {
        id: 'exhibit-hall',
        version: '1.0.0',
        projectTypes: ['exhibit-hall'],
        packageDescriptor: {
          requiredFiles: ['project.json', 'hall.json', 'exhibit-template.json'],
        },
      },
    });
  });
});
