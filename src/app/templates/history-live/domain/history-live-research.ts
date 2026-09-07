import type { HistoryLiveProjectConfig } from './history-live.models';

export type ResearchCategory = 'interviews' | 'events' | 'witnesses' | 'documents';
export interface HistoryLiveResearchEntry {
  readonly id: string;
  readonly category: 'interviews' | 'events';
  readonly title: string;
  readonly description: string;
  readonly sourceIds: readonly string[];
  readonly sections: readonly { readonly label: string; readonly text: string }[];
}
export interface HistoryLiveResearchLibrary {
  readonly version: '1.0';
  readonly witnessSourceIds: readonly string[];
  readonly entries: readonly HistoryLiveResearchEntry[];
}
export interface ResearchItem {
  readonly id: string;
  readonly category: ResearchCategory;
  readonly title: string;
  readonly description: string;
  readonly sourceIds: readonly string[];
  readonly sections: readonly { readonly label: string; readonly text: string }[];
}

export function researchItems(config: HistoryLiveProjectConfig): readonly ResearchItem[] {
  const witnesses = new Set(config.researchLibrary?.witnessSourceIds ?? []);
  return [
    ...(config.researchLibrary?.entries ?? []),
    ...config.sources
      .filter((source) => source.primary)
      .map((source): ResearchItem => ({
        id: source.id,
        category: witnesses.has(source.id) ? 'witnesses' : 'documents',
        title: source.title,
        description: `${source.sourceType} · ${source.creator} · ${source.dateLabel}`,
        sourceIds: [source.id],
        sections: [
          {
            label: source.excerptKind === 'quotation' ? 'Excerpt' : 'Document summary',
            text: source.excerpt,
          },
        ],
      })),
  ];
}

export function validateResearchLibrary(config: HistoryLiveProjectConfig): readonly string[] {
  const library = config.researchLibrary;
  if (!library) return [];
  const issues: string[] = [];
  const sources = new Set(config.sources.map((source) => source.id));
  const ids = new Set(sources);
  if (library.version !== '1.0') issues.push('RESEARCH_VERSION_INVALID');
  if (
    new Set(library.witnessSourceIds).size !== library.witnessSourceIds.length ||
    library.witnessSourceIds.some(
      (id) => !config.sources.some((source) => source.id === id && source.primary),
    )
  )
    issues.push('RESEARCH_WITNESS_REFERENCE_INVALID');
  for (const entry of library.entries) {
    if (!entry.id.trim() || ids.has(entry.id)) issues.push(`RESEARCH_ID_INVALID: ${entry.id}`);
    ids.add(entry.id);
    if (
      !['interviews', 'events'].includes(entry.category) ||
      !entry.title.trim() ||
      !entry.description.trim() ||
      !entry.sections.length ||
      entry.sections.some((section) => !section.label.trim() || !section.text.trim())
    )
      issues.push(`RESEARCH_CONTENT_INVALID: ${entry.id}`);
    if (!entry.sourceIds.length || entry.sourceIds.some((id) => !sources.has(id)))
      issues.push(`RESEARCH_SOURCE_REFERENCE_INVALID: ${entry.id}`);
  }
  return issues;
}
