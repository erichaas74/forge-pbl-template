import { effect, inject, InjectionToken, untracked, type Signal } from '@angular/core';
import type { ProjectLesson } from './project-lesson.models';

/** Presentation context only. Changing lessons never completes an activity or unlocks a gate. */
export const PROJECT_LESSON_FOCUS = new InjectionToken<Signal<ProjectLesson | undefined>>(
  'PROJECT_LESSON_FOCUS',
);

/** Bind a native view to the lesson without subscribing to or advancing runtime state. */
export function bindLessonFocus(open: (lesson: ProjectLesson) => void): void {
  const focus = inject(PROJECT_LESSON_FOCUS, { optional: true });
  effect(() => {
    const lesson = focus?.();
    if (lesson?.focusTarget) untracked(() => open(lesson));
  });
}
