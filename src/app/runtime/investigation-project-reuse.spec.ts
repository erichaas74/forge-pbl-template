import { InMemoryProjectPackageSource } from '../infrastructure/persistence/in-memory-project-package-source';
import {
  fossilDetectivesLocation,
  fossilDetectivesProjectPackage,
} from '../testing/fossil-detectives-project-package.fixture';
import {
  simpleProjectLocation,
  simpleProjectPackage,
} from '../testing/simple-project-package.fixture';
import { LocalInvestigationRuntime } from './local-investigation-runtime';

describe('Investigation project reuse', () => {
  it('loads unrelated investigations through the same runtime without project imports', async () => {
    const source = new InMemoryProjectPackageSource({
      [simpleProjectLocation.reference]: simpleProjectPackage,
      [fossilDetectivesLocation.reference]: fossilDetectivesProjectPackage,
    });
    const runtime = new LocalInvestigationRuntime(source);

    const scienceCase = await runtime.loadProject(simpleProjectLocation);
    const fossilCase = await runtime.loadProject(fossilDetectivesLocation);

    expect(scienceCase.graph?.manifest.id).toBe(simpleProjectLocation.projectId);
    expect(fossilCase.graph?.manifest.id).toBe(fossilDetectivesLocation.projectId);
    expect(fossilCase.graph?.manifest.template.id).toBe('investigation');
    expect(fossilCase.issues.some((issue) => issue.severity === 'error')).toBe(false);
  });
});
