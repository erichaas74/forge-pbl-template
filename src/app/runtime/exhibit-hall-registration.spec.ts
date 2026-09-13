import { InMemoryProjectPackageSource } from '../infrastructure/persistence/in-memory-project-package-source';
import { createLocalTemplateRegistry } from './local-template-registry';
import { CapabilityRegistry } from '../core/registries/specialized-registries';
import { registerExhibitHallCapabilities } from '../templates/exhibit-hall/runtime/exhibit-hall-capability-pack';

describe('exhibit-hall template registration', () => {
  it('registers shared museum publication through the existing capability pack', () => {
    const registry = new CapabilityRegistry();
    registerExhibitHallCapabilities(registry);
    expect(registry.get('sharedMuseumPublication')).toMatchObject({
      id: 'sharedMuseumPublication',
      version: '1.0.0',
      status: 'core',
    });
  });
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
