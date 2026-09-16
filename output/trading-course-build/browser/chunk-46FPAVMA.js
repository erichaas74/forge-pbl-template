import {
  InjectionToken
} from "./chunk-E2VJWGUE.js";

// src/app/projects/mystery-substance/lab-week.models.ts
var LAB_AUTHORING_PREVIEW = new InjectionToken("LAB_AUTHORING_PREVIEW", {
  factory: () => false
});
var LAB_PREVIEW_WEEKS = new InjectionToken("LAB_PREVIEW_WEEKS");
function validateLabWeeks(weeks) {
  const errors = [];
  if (weeks.length !== 4) errors.push("LAB_WEEK_COUNT: Expected four weeks.");
  weeks.forEach((week, index) => {
    if (week.week !== index + 1 || !week.title.trim() || !week.setting.trim())
      errors.push(`LAB_WEEK_INVALID: Week ${index + 1}.`);
    if (week.sessions.length !== 2) errors.push(`LAB_SESSION_COUNT: Week ${week.week}.`);
    for (const session of week.sessions) {
      const activity = session.activity;
      const known = ["properties", "reaction", "conservation", "emergency", "restoration"];
      if (!known.includes(activity.station) || activity.station === "properties" && !["appearance", "solubility", "conductivity", "texture"].includes(activity.test) || activity.station === "conservation" && !["closed", "open"].includes(activity.chamber))
        errors.push(`LAB_ACTIVITY_UNAVAILABLE: ${session.title}.`);
      if (!session.title.trim() || !session.product.trim() || !session.sample.trim())
        errors.push(`LAB_SESSION_CONTENT: Week ${week.week}.`);
    }
    if ([week.questions, week.evidence, week.controls].some((items) => !items.length || items.some((item) => !item.trim())))
      errors.push(`LAB_TUTOR_PLAN_MISSING: Week ${week.week}.`);
  });
  return errors;
}

export {
  LAB_AUTHORING_PREVIEW,
  LAB_PREVIEW_WEEKS,
  validateLabWeeks
};
//# debugId=b0c401f7-54cd-599f-b8f7-185e50e6ac69
//# sourceMappingURL=chunk-46FPAVMA.js.map
