import type { ProjectPackageLocation } from '../../../core/packages/project-package-contracts';
import { museumBoardTemplate } from '../renderers/museum-board/museum-board-template';
import { ExhibitHallProjectPackageAssembler } from './exhibit-hall-project-package-assembler';

describe('ExhibitHallProjectPackageAssembler', () => {
  const location: ProjectPackageLocation = {
    tenantId: 'school-one',
    projectId: 'community-museum',
    projectVersion: '1.0.0',
    reference: 'fixture://community-museum',
  };

  it('assembles a versioned exhibit-hall package', () => {
    const result = new ExhibitHallProjectPackageAssembler().assemble(location, {
      'project.json': {
        id: 'community-museum',
        schemaVersion: '1.0',
        title: 'Community Museum',
        template: { id: 'exhibit-hall', version: '1.0' },
        projectType: 'exhibit-hall',
        status: 'published',
        hallConfigRef: 'hall.json',
        exhibitTemplateRef: 'exhibit-template.json',
        capabilities: ['artifactPublication', 'galleryCollection'],
      },
      'hall.json': {
        id: 'hall-one',
        schemaVersion: '1.0',
        courseSectionId: 'section-one',
        projectInstanceId: 'instance-one',
        locationOrder: ['location-one'],
      },
      'exhibit-template.json': museumBoardTemplate,
    });

    expect(result.issues).toEqual([]);
    expect(result.graph).toMatchObject({
      tenantId: 'school-one',
      projectId: 'community-museum',
      manifest: { template: { id: 'exhibit-hall', version: '1.0' } },
      exhibitTemplate: { rendererType: 'museum-board-v1' },
    });
  });

  it('rejects packages without a complete exhibit template', () => {
    const result = new ExhibitHallProjectPackageAssembler().assemble(location, {
      'project.json': {
        id: 'community-museum',
        schemaVersion: '1.0',
        title: 'Community Museum',
        template: { id: 'exhibit-hall', version: '1.0' },
        projectType: 'exhibit-hall',
        status: 'published',
        capabilities: [],
      },
      'hall.json': {
        id: 'hall-one',
        schemaVersion: '1.0',
        courseSectionId: 'section-one',
        projectInstanceId: 'instance-one',
        locationOrder: [],
      },
      'exhibit-template.json': { templateId: 'broken' },
    });

    expect(result.graph).toBeUndefined();
    expect(result.issues).toContainEqual(
      expect.objectContaining({ code: 'INVALID_FILE_SHAPE', file: 'exhibit-template.json' }),
    );
  });
});
