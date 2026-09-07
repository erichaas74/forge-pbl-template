import type { JourneyEnrollment } from '../../../templates/journey-replay/domain/journey-replay.models';

/** Preserve the existing per-tab journey preview identity across the launch and activity. */
export function demoJourneyEnrollment(): JourneyEnrollment {
  const key = 'forge:journey-replay:demo-learner';
  let studentId = 'demo-navigator';
  try {
    const saved = sessionStorage.getItem(key);
    if (saved) studentId = saved;
    else {
      const suffix =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      studentId = `demo-${suffix}`;
      sessionStorage.setItem(key, studentId);
    }
  } catch {
    /* Retain the existing private-browser preview identity. */
  }
  return {
    tenantId: 'demo',
    classId: 'local-preview',
    studentId,
    studentDisplayName: 'Demo navigator',
    classLabel: 'Local demonstration',
    mode: 'demo',
  };
}
