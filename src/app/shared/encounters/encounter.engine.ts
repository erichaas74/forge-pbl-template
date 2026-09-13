import type { EncounterAction, EncounterDefinition, EncounterState, EncounterTransition } from './encounter.models';

export function initialEncounterState(definition: EncounterDefinition): EncounterState {
  return { viewId: definition.entryViewId, visitedViews: [], chapters: [], questions: [], features: [], insightEarned: false, attempts: 0 };
}
export function encounterReady(state: EncounterState): boolean {
  return state.chapters.length > 0 && state.questions.length > 0 && state.features.length > 0;
}
const append = (items: readonly string[], id: string) => items.includes(id) ? items : [...items, id];
type Handler<K extends EncounterAction['type']> = (definition: EncounterDefinition, state: EncounterState, action: Extract<EncounterAction, { type: K }>) => EncounterTransition | undefined;
type Handlers = { [K in EncounterAction['type']]: Handler<K> };

/** Registered, curriculum-independent actions. Presentation never grants an insight. */
export const encounterActions: Handlers = {
  enter: (d, s) => ({ state: { ...s, visitedViews: append(s.visitedViews, s.viewId) }, message: `Entered ${d.title}.`, eventType: 'activity.started' }),
  exit: (d, s) => ({ state: s, message: `Returned from ${d.title}.`, eventType: 'encounter.exited' }),
  view: (d, s, a) => {
    const view = d.views.find(v => v.id === a.viewId);
    if (!view || s.viewId === view.id) return;
    return { state: { ...s, viewId: view.id, visitedViews: append(s.visitedViews, view.id) }, message: `Moved to ${view.label}.`, eventType: 'evidence.viewed' };
  },
  chapter: (d, s, a) => {
    const chapter = d.chapters.find(c => c.id === a.chapterId);
    if (!chapter || !d.views.some(v => v.id === s.viewId && v.mode === 'listen')) return;
    if (s.chapterId === chapter.id && s.chapters.includes(chapter.id)) return;
    return { state: { ...s, chapterId: chapter.id, chapters: append(s.chapters, chapter.id) }, message: `Opened account: ${chapter.title}.`, eventType: 'evidence.viewed' };
  },
  question: (d, s, a) => {
    const question = d.questions.find(q => q.id === a.questionId);
    if (!question || !d.views.some(v => v.id === s.viewId && v.mode === 'talk') || question.requiresQuestionId && !s.questions.includes(question.requiresQuestionId)) return;
    if (s.questionId === question.id && s.questions.includes(question.id)) return;
    return { state: { ...s, questionId: question.id, questions: append(s.questions, question.id) }, message: `Asked: ${question.title}`, eventType: 'npc.questionAsked' };
  },
  feature: (d, s, a) => {
    const feature = d.object.features.find(f => f.id === a.featureId);
    if (!feature || !d.views.some(v => v.id === s.viewId && v.mode === 'object') || s.features.includes(feature.id)) return;
    return { state: { ...s, features: [...s.features, feature.id] }, message: `Observed ${d.object.title}: ${feature.label}.`, eventType: 'evidence.viewed' };
  },
  insight: (d, s, a) => {
    if (!encounterReady(s) || s.insightEarned || !d.insight.evidenceIds.includes(a.evidenceId) || !['supports', 'contradicts', 'does-not-establish'].includes(a.relationship)) return;
    const correct = a.evidenceId === d.insight.answerEvidenceId && a.relationship === d.insight.relationship;
    return { state: { ...s, insightEarned: correct, lastCorrect: correct, attempts: s.attempts + 1 }, correct,
      message: correct ? d.insight.explanation : d.insight.hint, eventType: 'activity.resultSubmitted' };
  },
};

export function transitionEncounter(d: EncounterDefinition, s: EncounterState, action: EncounterAction): EncounterTransition | undefined {
  if (!action || typeof action !== 'object' || !Object.hasOwn(encounterActions, action.type)) return;
  // The mapped registry keeps the action and handler types paired at this boundary.
  const handler = encounterActions[action.type] as (definition: EncounterDefinition, state: EncounterState, action: EncounterAction) => EncounterTransition | undefined;
  return handler(d, s, action);
}
