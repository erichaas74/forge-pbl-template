import {
  narrativeGraphIssues,
  validateNarrativeConfig
} from "./chunk-M73YRRYA.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/narrative-studio/core/narrative-preview.ts
function usesNarrativeWeeklyPreview(config, session) {
  return session.mode === "preview" && session.authorityMode === "localDemo" && !!config.previewWeeks;
}
function narrativeWeekConfig(config, week) {
  return __spreadProps(__spreadValues({}, config), {
    previewWeeks: void 0,
    authoringMode: void 0,
    title: week.title,
    startNodeId: week.startNodeId,
    nodes: week.scenes.map((_a) => {
      var _b = _a, { starterText } = _b, node = __objRest(_b, ["starterText"]);
      return node;
    })
  });
}
function validateNarrativePreview(config) {
  const weeks = config.previewWeeks;
  if (!weeks) return;
  const fail = (message) => {
    throw new Error(`NARRATIVE_PREVIEW_INVALID: ${message}`);
  };
  if (weeks.length !== 4 || new Set(weeks.map((week) => week.id)).size !== 4) fail("Four uniquely identified weeks are required.");
  for (const [index, week] of weeks.entries()) {
    if (week.week !== index + 1 || !/^[a-z0-9-]+$/.test(week.id) || !week.title.trim() || !week.setting.trim()) fail("Week identity or setting is invalid.");
    if (week.sessions.length !== 2 || week.sessions.some(
      (session) => !["write", "map", "revise", "read"].includes(session.tool) || !week.scenes.some((scene) => scene.id === session.nodeId) || ![session.title, session.mission, session.product].every((value) => value.trim())
    )) fail(`Week ${week.week} needs two valid session targets.`);
    if ([week.questions, week.evidence, week.controls].some((items) => !items.length || items.some((item) => !item.trim())) || week.scenes.some((scene) => !scene.starterText.trim() || !scene.craftPrompt.trim() || scene.choices.some((choice) => !choice.prompt.trim()))) fail(`Week ${week.week} has incomplete planning or sample content.`);
    const scenario = narrativeWeekConfig(config, week);
    try {
      validateNarrativeConfig(scenario);
    } catch {
      fail(`Week ${week.week} has an invalid sample graph.`);
    }
    if (narrativeGraphIssues(scenario).length) fail(`Week ${week.week} has an invalid branch graph.`);
  }
}

export {
  usesNarrativeWeeklyPreview,
  narrativeWeekConfig,
  validateNarrativePreview
};
//# debugId=35567b7a-c653-5be8-9e84-c064f5f5fbb6
//# sourceMappingURL=chunk-KYN6TK4M.js.map
