import type { CompletedSample } from './completed-sample';
const loaders: Readonly<Record<string, () => Promise<CompletedSample>>> = {
  'calendar-monument': () => import('./engineering.sample').then((m) => m.loadSample()),
  'robot-delivery-code-lab': () => import('./automation.sample').then(m => m.loadSample()),
  'mystery-substance': () => import('./investigation.sample').then((m) => m.loadSample()),
  'frontier-trading-company': () => import('./simulation.sample').then((m) => m.loadSample()),
  'objects-that-changed-us': () => import('./exhibit.sample').then((m) => m.loadSample()),
  'history-live-revolutionary-war': () => import('./broadcast.sample').then((m) => m.loadSample()),
  'the-fate-of-the-republic': () => import('./debate.sample').then((m) => m.loadSample()),
  'race-around-the-world': () => import('./journey.sample').then((m) => m.loadSample()),
  'survival-island-story-lab': () => import('./narrative.sample').then((m) => m.loadSample()),
};
export const completedSampleProjectIds = Object.keys(loaders);
export async function loadCompletedSample(projectId: string): Promise<CompletedSample> {
  const load = loaders[projectId];
  if (!load) throw new Error('A completed sample is not installed for this project.');
  return load();
}
