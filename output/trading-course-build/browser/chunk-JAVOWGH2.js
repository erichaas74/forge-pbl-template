import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/shared/encounters/encounter.engine.ts
function initialEncounterState(definition) {
  return { viewId: definition.entryViewId, visitedViews: [], chapters: [], questions: [], features: [], insightEarned: false, attempts: 0 };
}
function encounterReady(state) {
  return state.chapters.length > 0 && state.questions.length > 0 && state.features.length > 0;
}
var append = (items, id) => items.includes(id) ? items : [...items, id];
var encounterActions = {
  enter: (d, s) => ({ state: __spreadProps(__spreadValues({}, s), { visitedViews: append(s.visitedViews, s.viewId) }), message: `Entered ${d.title}.`, eventType: "activity.started" }),
  exit: (d, s) => ({ state: s, message: `Returned from ${d.title}.`, eventType: "encounter.exited" }),
  view: (d, s, a) => {
    const view = d.views.find((v) => v.id === a.viewId);
    if (!view || s.viewId === view.id) return;
    return { state: __spreadProps(__spreadValues({}, s), { viewId: view.id, visitedViews: append(s.visitedViews, view.id) }), message: `Moved to ${view.label}.`, eventType: "evidence.viewed" };
  },
  chapter: (d, s, a) => {
    const chapter = d.chapters.find((c) => c.id === a.chapterId);
    if (!chapter || !d.views.some((v) => v.id === s.viewId && v.mode === "listen")) return;
    if (s.chapterId === chapter.id && s.chapters.includes(chapter.id)) return;
    return { state: __spreadProps(__spreadValues({}, s), { chapterId: chapter.id, chapters: append(s.chapters, chapter.id) }), message: `Opened account: ${chapter.title}.`, eventType: "evidence.viewed" };
  },
  question: (d, s, a) => {
    const question = d.questions.find((q) => q.id === a.questionId);
    if (!question || !d.views.some((v) => v.id === s.viewId && v.mode === "talk") || question.requiresQuestionId && !s.questions.includes(question.requiresQuestionId)) return;
    if (s.questionId === question.id && s.questions.includes(question.id)) return;
    return { state: __spreadProps(__spreadValues({}, s), { questionId: question.id, questions: append(s.questions, question.id) }), message: `Asked: ${question.title}`, eventType: "npc.questionAsked" };
  },
  feature: (d, s, a) => {
    const feature = d.object.features.find((f) => f.id === a.featureId);
    if (!feature || !d.views.some((v) => v.id === s.viewId && v.mode === "object") || s.features.includes(feature.id)) return;
    return { state: __spreadProps(__spreadValues({}, s), { features: [...s.features, feature.id] }), message: `Observed ${d.object.title}: ${feature.label}.`, eventType: "evidence.viewed" };
  },
  insight: (d, s, a) => {
    if (!encounterReady(s) || s.insightEarned || !d.insight.evidenceIds.includes(a.evidenceId) || !["supports", "contradicts", "does-not-establish"].includes(a.relationship)) return;
    const correct = a.evidenceId === d.insight.answerEvidenceId && a.relationship === d.insight.relationship;
    return {
      state: __spreadProps(__spreadValues({}, s), { insightEarned: correct, lastCorrect: correct, attempts: s.attempts + 1 }),
      correct,
      message: correct ? d.insight.explanation : d.insight.hint,
      eventType: "activity.resultSubmitted"
    };
  }
};
function transitionEncounter(d, s, action) {
  if (!action || typeof action !== "object" || !Object.hasOwn(encounterActions, action.type)) return;
  const handler = encounterActions[action.type];
  return handler(d, s, action);
}

export {
  initialEncounterState,
  encounterReady,
  transitionEncounter
};
//# debugId=4242193d-1570-552a-897f-5504b0b4fb7b
//# sourceMappingURL=chunk-JAVOWGH2.js.map
