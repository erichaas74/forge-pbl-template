import type { Provider, Type } from '@angular/core';
import type { SampleGuide } from '../../shared/project-intro/completed-sample-guide';

/** Every provider belongs to one disposable, fictional curriculum preview. */
export interface CompletedSample extends SampleGuide {
  component: Type<unknown>;
  providers: Provider[];
  inputs?: Record<string, unknown>;
}

/** Fresh clones isolate playback. Completed samples never read or write student storage. */
export function samplePersistence<T>(record: T) {
  return { load: () => structuredClone(record), save: () => {}, clear: () => {} };
}
