import type { RestorationMission } from '../restoration-collection.models';
import type { RestorationPreviewConfig, RestorationPreviewState } from './restoration-preview.models';
import { requirePanorama, requirePanoramaState } from '../../../../shared/panorama/panorama.validation';

const fail = (part: string): never => { throw new Error(`INVALID_RESTORATION_PREVIEW: ${part}`); };
const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const strings = (v: unknown): v is string[] => Array.isArray(v) && v.length > 0 && v.length <= 12 && v.every(s => typeof s === 'string' && s.trim().length > 0 && s.length <= 1500);
export function requireRestorationPreview(value: unknown, mission: RestorationMission): RestorationPreviewConfig {
  if (!record(value) || value['capability'] !== 'restoration.preview-weeks.v1') fail('capability');
  const config = value as unknown as RestorationPreviewConfig;
  if (config.scenes !== undefined) {
    if (!Array.isArray(config.scenes) || config.scenes.length > 16 || new Set(config.scenes.map(s => s?.id)).size !== config.scenes.length || new Set(config.scenes.map(s => s?.workId)).size !== config.scenes.length) fail('panorama scenes');
    for (const scene of config.scenes) { requirePanorama(scene); if (!mission.works.some(w => w.id === scene.workId)) fail('panorama work'); }
  }
  if (!Array.isArray(config.weeks) || config.weeks.length !== 4) fail('four weeks required');
  config.weeks.forEach((week, i) => {
    if (!week || week.week !== i + 1 || !strings([week.title, week.setting]) || !strings(week.questions) || !strings(week.evidence) || !strings(week.controls)) fail('week planning');
    if (!Array.isArray(week.sessions) || week.sessions.length !== 2) fail('two sessions required');
    for (const session of week.sessions) {
      const work = mission.works.find(w => w.id === session?.workId);
      if (!work || !strings([session.title, session.product]) || !strings(session.steps) || !['inspect', 'compare', 'restore', 'exhibit'].includes(session.activity)) fail('session/work reference');
      const film = session.film;
      if (!film || !/^\/[\w/.-]+\.mp4$/.test(film.src) || !/^\/[\w/.-]+\.vtt$/.test(film.captions) || !Array.isArray(film.cues) || !film.cues.length || film.cues.length > 10) fail('film media');
      let last = -1;
      for (const cue of film.cues) {
        if (!cue || !Number.isFinite(cue.at) || cue.at < 0 || cue.at <= last || !work!.regions.some(r => r.id === cue.regionId) || !strings([cue.label, cue.transcript])) fail('film cue');
        last = cue.at;
      }
    }
  });
  if (!Array.isArray(config.sampleExhibit) || !config.sampleExhibit.length || config.sampleExhibit.length > mission.works.length) fail('sample exhibit');
  const seen = new Set<string>();
  for (const sample of config.sampleExhibit) {
    const work = mission.works.find(w => w.id === sample?.workId);
    if (!work || seen.has(sample.workId) || !strings([sample.caption]) || !record(sample.choices)) fail('sample');
    seen.add(sample.workId);
    for (const [id, choice] of Object.entries(sample.choices)) if (!work!.regions.some(r => r.id === id && r.options.some(o => o.id === choice))) fail('sample choice');
  }
  return config;
}

/** Reject incompatible saved drafts without overwriting the original browser value. */
export function requirePreviewState(value: unknown, mission: RestorationMission): RestorationPreviewState {
  const s = value as RestorationPreviewState;
  if (!record(value) || s.schemaVersion !== 1 || !Number.isInteger(s.version) || s.version < 0 || !record(s.works) || !record(s.selectedByLesson) || !record(s.sources) || !record(s.trials) || !record(s.captions) || !record(s.filmTimes) || !Array.isArray(s.sampleWorkIds)) fail('saved state');
  const workExists = (id: string) => mission.works.some(w => w.id === id);
  if (s.scenes !== undefined) {
    if (!record(s.scenes)) fail('saved panoramas');
    for (const [id, sceneState] of Object.entries(s.scenes)) { const scene = mission.previewWeeks?.scenes?.find(d => d.id === id); if (!scene) fail('saved panorama reference'); requirePanoramaState(sceneState, scene!); }
  }
  const validIds = (v: unknown): v is string[] => Array.isArray(v) && v.length <= mission.works.length && new Set(v).size === v.length && v.every(id => typeof id === 'string' && workExists(id));
  if (s.exhibit !== undefined && !validIds(s.exhibit) || !validIds(s.sampleWorkIds)) fail('saved exhibit');
  for (const [lesson, workId] of Object.entries(s.selectedByLesson)) if (!/^[1-8]$/.test(lesson) || !workExists(workId)) fail('saved selection');
  for (const [lesson, time] of Object.entries(s.filmTimes)) if (!/^[1-8]$/.test(lesson) || !Number.isFinite(time) || time < 0 || time > 3600) fail('saved film time');
  for (const [id, caption] of Object.entries(s.captions)) if (!workExists(id) || typeof caption !== 'string' || caption.length > 1500) fail('saved caption');
  for (const [id, sources] of Object.entries(s.sources)) if (!workExists(id) || !Array.isArray(sources) || sources.length > mission.sourceGallery.evidence.length || sources.some(source => !mission.sourceGallery.evidence.some(e => e.id === source))) fail('saved sources');
  const validateImage = (id: string, image: unknown) => {
    const work = mission.works.find(w => w.id === id), state = image as RestorationPreviewState['works'][string];
    if (!work || !record(image) || !record(state.choices) || !Array.isArray(state.inspected) || !Array.isArray(state.undo) || state.undo.length > 100 || !record(state.notes) || state.verified !== false || state.submissions !== 0) fail('saved image');
    for (const [region, choice] of Object.entries(state.choices)) if (!work!.regions.some(r => r.id === region && r.options.some(o => o.id === choice))) fail('saved layer');
    if (state.inspected.some(id => !work!.regions.some(r => r.id === id)) || state.selectedRegionId && !work!.regions.some(r => r.id === state.selectedRegionId)) fail('saved region');
    for (const undo of state.undo) if (!undo || !work!.regions.some(r => r.id === undo.regionId && r.options.some(o => o.id === undo.previousOptionId))) fail('saved undo');
  };
  for (const [id, state] of Object.entries(s.works)) validateImage(id, state);
  for (const [id, trials] of Object.entries(s.trials)) {
    if (!workExists(id) || !Array.isArray(trials) || trials.length > 20) fail('saved trials');
    for (const trial of trials) { if (!trial || typeof trial.id !== 'string') fail('saved trial'); validateImage(id, trial.state); }
  }
  return s;
}
