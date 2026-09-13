import type { RepairOption, RepairRegion, RestorationAction, RestorationDefinition, RestorationState, RestorationTransition } from './restoration.models';

export const initialRestoration = (): RestorationState => ({ inspected: [], choices: {}, notes: {}, undo: [], verified: false, submissions: 0, feedback: '', issues: [] });
export function selectedRepair(region: RepairRegion, state: RestorationState): RepairOption {
  return region.options.find(o => o.id === (state.choices[region.id] ?? region.originalOptionId))!;
}
export function restorationIssues(d: RestorationDefinition, s: RestorationState): string[] {
  return d.regions.flatMap(region => {
    const note = s.notes[region.id];
    if (!s.inspected.includes(region.id)) return [`${region.title}: inspect this detail first.`];
    if (!note?.evidenceId || !note.relationship || note.explanation.trim().length < 20) return [`${region.title}: attach a reference, choose its relationship to the original claim, and explain your decision in at least 20 characters.`];
    if (!region.answers.some(a => a.optionId === selectedRepair(region, s).id && a.evidenceId === note.evidenceId && a.relationship === note.relationship)) return [`${region.title}: ${region.hint}`];
    return [];
  });
}
type Handlers = { [K in RestorationAction['type']]: (d: RestorationDefinition, s: RestorationState, a: Extract<RestorationAction, { type: K }>) => RestorationTransition | undefined };
const updated = (s: RestorationState, message: string, eventType: RestorationTransition['eventType']): RestorationTransition => ({ state: s, message, eventType });
export const restorationActions: Handlers = {
  inspect: (d, s, a) => {
    const region = d.regions.find(r => r.id === a.regionId); if (!region || s.selectedRegionId === a.regionId && s.inspected.includes(a.regionId)) return;
    return updated({ ...s, selectedRegionId: a.regionId, inspected: [...new Set([...s.inspected, a.regionId])] }, `Inspected ${region.title}.`, 'evidence.viewed');
  },
  edit: (d, s, a) => {
    const region = d.regions.find(r => r.id === a.regionId), option = region?.options.find(o => o.id === a.optionId);
    if (!region || !option || !s.inspected.includes(a.regionId) || selectedRepair(region, s).id === option.id) return;
    const notes = { ...s.notes }; delete notes[a.regionId];
    return updated({ ...s, choices: { ...s.choices, [region.id]: option.id }, notes, verified: false, issues: [], feedback: 'Draft changed. Attach evidence for this choice.', undo: [...s.undo, { regionId: region.id, previousOptionId: selectedRepair(region, s).id, previousNote: s.notes[region.id] }].slice(-100) }, `Changed ${region.title}: ${option.label}.`, 'evidence.annotationAdded');
  },
  justify: (d, s, a) => {
    const region = d.regions.find(r => r.id === a.regionId), note = a.note;
    if (!region || !s.inspected.includes(a.regionId) || !note || typeof note !== 'object' || typeof note.explanation !== 'string' || note.explanation.length > 1500 || !['', 'supports', 'contradicts', 'does-not-establish'].includes(note.relationship) || !(note.evidenceId === '' || region.evidenceIds.includes(note.evidenceId))) return;
    if (JSON.stringify(s.notes[a.regionId]) === JSON.stringify(note)) return;
    return updated({ ...s, notes: { ...s.notes, [a.regionId]: { ...note } }, verified: false, issues: [], feedback: 'Explanation saved. Check the whole reconstruction when both details are ready.' }, `Saved evidence and explanation for ${region.title}.`, 'evidence.usedInClaim');
  },
  undo: (_d, s) => {
    const last = s.undo.at(-1); if (!last) return;
    const notes = { ...s.notes }; if (last.previousNote) notes[last.regionId] = last.previousNote; else delete notes[last.regionId];
    return updated({ ...s, choices: { ...s.choices, [last.regionId]: last.previousOptionId }, notes, undo: s.undo.slice(0, -1), verified: false, issues: [], feedback: 'Previous image choice restored. Review its explanation.' }, 'Undid the last image edit.', 'evidence.annotationAdded');
  },
  submit: (d, s) => {
    if (s.verified) return;
    const issues = restorationIssues(d, s), verified = issues.length === 0;
    const feedback = verified ? 'Evidence check passed. Your reconstruction and reflection are saved for review.' : 'This reconstruction needs another look. Use the detail feedback to revise.';
    return updated({ ...s, verified, issues, feedback, submissions: s.submissions + 1 }, feedback, 'activity.resultSubmitted');
  },
};
export function transitionRestoration(d: RestorationDefinition, s: RestorationState, a: RestorationAction): RestorationTransition | undefined {
  if (!a || typeof a !== 'object' || !Object.hasOwn(restorationActions, a.type)) return;
  const handler = restorationActions[a.type] as (d: RestorationDefinition, s: RestorationState, a: RestorationAction) => RestorationTransition | undefined;
  return handler(d, s, a);
}
