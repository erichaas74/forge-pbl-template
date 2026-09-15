import { InjectionToken } from '@angular/core';

export type LabActivity =
  | { station: 'properties'; test: 'appearance' | 'solubility' | 'conductivity' | 'texture' }
  | { station: 'reaction' }
  | { station: 'conservation'; chamber: 'closed' | 'open' }
  | { station: 'emergency' }
  | { station: 'restoration' };

export interface LabSession {
  readonly title: string;
  readonly product: string;
  readonly activity: LabActivity;
  readonly sample: string;
}
export interface LabWeek {
  readonly week: number;
  readonly title: string;
  readonly setting: string;
  readonly sessions: readonly [LabSession, LabSession];
  readonly questions: readonly string[];
  readonly evidence: readonly string[];
  readonly controls: readonly string[];
}

/** Explicit local authoring context. Defaults retain the assessed station behavior. */
export const LAB_AUTHORING_PREVIEW = new InjectionToken<boolean>('LAB_AUTHORING_PREVIEW', {
  factory: () => false,
});
export const LAB_PREVIEW_WEEKS = new InjectionToken<readonly LabWeek[]>('LAB_PREVIEW_WEEKS');

export function validateLabWeeks(weeks: readonly LabWeek[]): readonly string[] {
  const errors: string[] = [];
  if (weeks.length !== 4) errors.push('LAB_WEEK_COUNT: Expected four weeks.');
  weeks.forEach((week, index) => {
    if (week.week !== index + 1 || !week.title.trim() || !week.setting.trim())
      errors.push(`LAB_WEEK_INVALID: Week ${index + 1}.`);
    if (week.sessions.length !== 2) errors.push(`LAB_SESSION_COUNT: Week ${week.week}.`);
    for (const session of week.sessions) {
      const activity = session.activity;
      const known = ['properties', 'reaction', 'conservation', 'emergency', 'restoration'];
      if (!known.includes(activity.station) ||
          (activity.station === 'properties' && !['appearance', 'solubility', 'conductivity', 'texture'].includes(activity.test)) ||
          (activity.station === 'conservation' && !['closed', 'open'].includes(activity.chamber)))
        errors.push(`LAB_ACTIVITY_UNAVAILABLE: ${session.title}.`);
      if (!session.title.trim() || !session.product.trim() || !session.sample.trim())
        errors.push(`LAB_SESSION_CONTENT: Week ${week.week}.`);
    }
    if ([week.questions, week.evidence, week.controls].some(items => !items.length || items.some(item => !item.trim())))
      errors.push(`LAB_TUTOR_PLAN_MISSING: Week ${week.week}.`);
  });
  return errors;
}
