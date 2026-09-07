import { historyLiveRevolutionaryWarConfig as config } from '../../../projects/history-live-revolutionary-war/history-live-revolutionary-war.config';
import { researchItems, validateResearchLibrary } from './history-live-research';

describe('History Live research library', () => {
  it('keeps primary records separate from reconstructed interviews and event summaries', () => {
    expect(validateResearchLibrary(config)).toEqual([]);
    const items = researchItems(config);
    expect(new Set(items.map((item) => item.category))).toEqual(
      new Set(['documents', 'witnesses', 'events', 'interviews']),
    );
    expect(items.find((item) => item.id === 'source-parker')?.category).toBe('witnesses');
    expect(items.find((item) => item.id === 'interview-parker')?.category).toBe('interviews');
    expect(items.find((item) => item.id === 'source-loyalist-claims')).toBeUndefined();
    expect(
      items.every((item) =>
        item.sourceIds.every((id) => config.sources.some((source) => source.id === id)),
      ),
    ).toBe(true);
  });
  it('does not add source interpretations, rankings, or suggested claims to resource descriptions', () => {
    const items = researchItems(config);
    for (const source of config.sources.filter((item) => item.primary)) {
      const item = items.find((item) => item.id === source.id)!;
      expect(item.description).toBe(
        `${source.sourceType} · ${source.creator} · ${source.dateLabel}`,
      );
      expect(item.sections).toEqual([
        {
          label: source.excerptKind === 'quotation' ? 'Excerpt' : 'Document summary',
          text: source.excerpt,
        },
      ]);
      expect(JSON.stringify(item)).not.toContain(source.context);
    }
  });
  it('rejects missing references and does not classify secondary articles as witness testimony', () => {
    const library = config.researchLibrary!;
    expect(
      validateResearchLibrary({
        ...config,
        researchLibrary: { ...library, witnessSourceIds: ['source-loyalist-claims'] },
      }),
    ).toContain('RESEARCH_WITNESS_REFERENCE_INVALID');
    expect(
      validateResearchLibrary({
        ...config,
        researchLibrary: {
          ...library,
          entries: [{ ...library.entries[0], sourceIds: ['missing'] }],
        },
      }),
    ).toContain('RESEARCH_SOURCE_REFERENCE_INVALID: interview-parker');
  });
  it('supports another project without the optional library or project-name checks', () => {
    const other = {
      ...config,
      projectId: 'another-history-project',
      researchLibrary: undefined,
      sources: [{ ...config.sources[0], id: 'another-record', title: 'Another record' }],
    };
    expect(validateResearchLibrary(other)).toEqual([]);
    expect(researchItems(other)).toHaveLength(1);
    expect(researchItems(other)[0].title).toBe('Another record');
  });
});
