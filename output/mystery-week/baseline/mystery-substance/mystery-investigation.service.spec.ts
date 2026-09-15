import { MysteryInvestigationService } from './mystery-investigation.service';
import {
  mysterySubstanceLocation,
  mysterySubstanceProjectPackage,
} from './mystery-substance.package';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { projectCatalog } from '../project-catalog';
import { LocalProjectDefinitionSource } from '../../runtime/project-launch/local-project-definition.source';
import { localProjectSession } from '../../runtime/project-launch/local-project-session';
import {
  PROJECT_CATALOG_ENTRY,
  PROJECT_DEFINITION,
  PROJECT_SESSION_CONTEXT,
} from '../../runtime/project-launch/project-launch.tokens';

describe('MysteryInvestigationService', () => {
  it('requires the five case clues rather than completing evidence review when a tool guide is opened', async () => {
    const service = new MysteryInvestigationService();
    await service.initialize();
    await service.reviewEvidence('evidence-test-kit');
    expect(service.snapshot()!.activities['activity-evidence-locker'].status).not.toBe('complete');
    for (const id of [
      'evidence-inventory',
      'evidence-shelf-scene',
      'evidence-temperature-log',
      'evidence-label-list',
    ])
      await service.reviewEvidence(id);
    expect(service.snapshot()!.activities['activity-evidence-locker'].status).not.toBe('complete');
    await service.reviewEvidence('evidence-witness-note');
    expect(service.snapshot()!.activities['activity-evidence-locker'].status).toBe('complete');
  });
  beforeEach(() => {
    const values = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
    });
  });

  afterEach(() => vi.unstubAllGlobals());

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

  it('launches through the catalog and restores saved work without changing legacy saves', async () => {
    const legacy = new MysteryInvestigationService();
    await legacy.initialize();
    await legacy.createQuestion('Keep my earlier investigation question.');
    const legacySnapshot = structuredClone(legacy.snapshot());

    const project = projectCatalog.find((entry) => entry.id === 'mystery-substance')!;
    const definition = await new LocalProjectDefinitionSource().load(project);
    const session = localProjectSession(project);
    TestBed.configureTestingModule({
      providers: [
        MysteryInvestigationService,
        { provide: PROJECT_CATALOG_ENTRY, useValue: project },
        { provide: PROJECT_DEFINITION, useValue: definition },
        { provide: PROJECT_SESSION_CONTEXT, useValue: session },
      ],
    });
    const service = TestBed.inject(MysteryInvestigationService);
    await service.initialize();
    expect(service.loading()).toBe(false);
    expect(service.errors()).toEqual([]);
    expect(service.snapshot()).toMatchObject({
      projectId: project.id,
      projectVersion: project.projectVersion,
      tenantId: session.tenantId,
    });
    await service.createQuestion('Which test distinguishes the powders?');
    expect(service.errors()).toEqual([]);
    expect(service.snapshot()!.board.questions).toHaveLength(1);

    const reopened = new MysteryInvestigationService(definition, session, project);
    await reopened.initialize();
    expect(reopened.errors()).toEqual([]);
    expect(reopened.snapshot()).toEqual(service.snapshot());

    const reopenedLegacy = new MysteryInvestigationService();
    await reopenedLegacy.initialize();
    expect(reopenedLegacy.snapshot()).toEqual(legacySnapshot);
    expect(mysterySubstanceProjectPackage['project.json']).toMatchObject({
      id: mysterySubstanceLocation.projectId,
    });
  });

  it('continues to reject a package belonging to another project', async () => {
    const project = projectCatalog.find((entry) => entry.id === 'mystery-substance')!;
    const service = new MysteryInvestigationService(
      {
        ...mysterySubstanceProjectPackage,
        'project.json': {
          ...(mysterySubstanceProjectPackage['project.json'] as Record<string, unknown>),
          id: 'unrelated-investigation',
        },
      },
      localProjectSession(project),
      project,
    );
    await service.initialize();
    expect(service.errors()).toContain(
      'Manifest ID "unrelated-investigation" does not match requested project "mystery-substance".',
    );
    expect(service.snapshot()).toBeUndefined();
  });
});
