import { MysteryInvestigationService } from './mystery-investigation.service';
import { mysterySubstanceLocation } from './mystery-substance.package';

describe('MysteryInvestigationService', () => {
  it('loads and initializes the project package against the platform runtime', async () => {
    const service = new MysteryInvestigationService();

    await service.initialize();

    expect(service.errors()).toEqual([]);
    expect(service.loading()).toBe(false);
    expect(service.snapshot()).toMatchObject({
      tenantId: mysterySubstanceLocation.tenantId,
      projectId: mysterySubstanceLocation.projectId,
      projectVersion: mysterySubstanceLocation.projectVersion,
      version: 0,
    });
  });
});
