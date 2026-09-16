import {
  InjectionToken,
  effect,
  inject,
  untracked
} from "./chunk-E2VJWGUE.js";

// src/app/shared/project-lessons/project-lesson-focus.ts
var PROJECT_LESSON_FOCUS = new InjectionToken(
  "PROJECT_LESSON_FOCUS"
);
function bindLessonFocus(open) {
  const focus = inject(PROJECT_LESSON_FOCUS, { optional: true });
  effect(() => {
    const lesson = focus?.();
    if (lesson?.focusTarget) untracked(() => open(lesson));
  });
}

export {
  PROJECT_LESSON_FOCUS,
  bindLessonFocus
};
//# debugId=2618ffe5-07ac-56c2-b493-808ece244ff7
//# sourceMappingURL=chunk-3C62DQOL.js.map
