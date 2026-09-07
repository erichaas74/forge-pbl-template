import type { ProjectPackageLocation } from '../core/packages/project-package-contracts';
import { simpleProjectPackage } from './simple-project-package.fixture';

export const fossilDetectivesLocation: ProjectPackageLocation = {
  tenantId: 'tenant-school-1',
  projectId: 'fossil-detectives',
  projectVersion: '1.0.0',
  reference: 'fixtures/fossil-detectives',
};

const idReplacements: Readonly<Record<string, string>> = {
  'project-linear-investigation': 'fossil-detectives',
  'investigation-linear': 'investigation-fossil-site',
  'board-linear': 'board-fossil-site',
  'ev-intro': 'evidence-site-observation',
  'ev-result': 'evidence-fossil-measurement',
  'act-test': 'activity-measure-fossil',
  'lesson-method': 'lesson-stratigraphy',
  'final-linear': 'final-fossil-explanation',
};

export const fossilDetectivesProjectPackage: Readonly<Record<string, unknown>> = renameIds(
  simpleProjectPackage,
  idReplacements,
);

function renameIds(
  value: Readonly<Record<string, unknown>>,
  replacements: Readonly<Record<string, string>>,
): Readonly<Record<string, unknown>> {
  const visit = (item: unknown): unknown => {
    if (typeof item === 'string') return replacements[item] ?? item;
    if (Array.isArray(item)) return item.map(visit);
    if (typeof item === 'object' && item !== null) {
      return Object.fromEntries(
        Object.entries(item as Record<string, unknown>).map(([key, nested]) => [key, visit(nested)]),
      );
    }
    return item;
  };
  const packageFiles = visit(value) as Record<string, unknown>;
  const manifest = packageFiles['project.json'] as Record<string, unknown>;
  manifest['title'] = 'Fossil Detectives';
  manifest['gradeLevels'] = [6];
  manifest['subjects'] = { primary: 'earth science' };
  return Object.freeze(packageFiles);
}
