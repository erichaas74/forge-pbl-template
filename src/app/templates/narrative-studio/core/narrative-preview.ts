import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import type { NarrativePreviewWeek } from '../domain/narrative-preview.models';
import type { NarrativeStudioProjectConfig } from '../domain/narrative-studio.models';
import { narrativeGraphIssues } from './narrative-branching';
import { validateNarrativeConfig } from './narrative-studio-state';

export function usesNarrativeWeeklyPreview(config: NarrativeStudioProjectConfig, session: ProjectSessionContext): boolean {
  return session.mode === 'preview' && session.authorityMode === 'localDemo' && !!config.previewWeeks;
}

export function narrativeWeekConfig(config: NarrativeStudioProjectConfig, week: NarrativePreviewWeek): NarrativeStudioProjectConfig {
  return { ...config, previewWeeks: undefined, authoringMode: undefined, title: week.title,
    startNodeId: week.startNodeId, nodes: week.scenes.map(({ starterText, ...node }) => node) };
}

/** Validate the optional extension independently of the unchanged assessed graph contract. */
export function validateNarrativePreview(config: NarrativeStudioProjectConfig): void {
  const weeks = config.previewWeeks;
  if (!weeks) return;
  const fail = (message: string): never => { throw new Error(`NARRATIVE_PREVIEW_INVALID: ${message}`); };
  if (weeks.length !== 4 || new Set(weeks.map((week) => week.id)).size !== 4) fail('Four uniquely identified weeks are required.');
  for (const [index, week] of weeks.entries()) {
    if (week.week !== index + 1 || !/^[a-z0-9-]+$/.test(week.id) || !week.title.trim() || !week.setting.trim()) fail('Week identity or setting is invalid.');
    if (week.sessions.length !== 2 || week.sessions.some((session) =>
      !['write', 'map', 'revise', 'read'].includes(session.tool) ||
      !week.scenes.some((scene) => scene.id === session.nodeId) ||
      ![session.title, session.mission, session.product].every((value) => value.trim()),
    )) fail(`Week ${week.week} needs two valid session targets.`);
    if ([week.questions, week.evidence, week.controls].some((items) => !items.length || items.some((item) => !item.trim())) ||
      week.scenes.some((scene) => !scene.starterText.trim() || !scene.craftPrompt.trim() || scene.choices.some((choice) => !choice.prompt.trim()))) fail(`Week ${week.week} has incomplete planning or sample content.`);
    const scenario = narrativeWeekConfig(config, week);
    try { validateNarrativeConfig(scenario); } catch { fail(`Week ${week.week} has an invalid sample graph.`); }
    if (narrativeGraphIssues(scenario).length) fail(`Week ${week.week} has an invalid branch graph.`);
  }
}
