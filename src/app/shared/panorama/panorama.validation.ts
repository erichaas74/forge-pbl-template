import type { PanoramaDefinition, PanoramaState, SceneRect } from './panorama.models';
import { requireSpatialInspection } from '../spatial-inspection/spatial-inspection.definition';
const fail = (part: string): never => { throw new Error(`INVALID_PANORAMA: ${part}`); };
const object = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const text = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0 && v.length <= 2500;
const id = (v: unknown): v is string => typeof v === 'string' && /^[a-z][a-z0-9-]{0,79}$/.test(v) && !['constructor', 'prototype'].includes(v);
const list = (v: unknown, max = 20): v is unknown[] => Array.isArray(v) && v.length > 0 && v.length <= max;
const unique = (values: readonly { id: string }[]) => values.every(v => v && id(v.id)) && new Set(values.map(v => v.id)).size === values.length;
const asset = (v: unknown, extensions = 'png|webp|jpg') => typeof v === 'string' && new RegExp(`^/projects/[a-zA-Z0-9/_-]+\\.(${extensions})$`).test(v);
const rect = (r: SceneRect) => r && [r.x, r.y, r.width, r.height].every(Number.isFinite) && r.x >= 0 && r.y >= 0 && r.width > 0 && r.height > 0 && r.x + r.width <= 100 && r.y + r.height <= 100;
export function requirePanorama(value: unknown): PanoramaDefinition {
  const d = value as PanoramaDefinition;
  if (!object(value) || d.capability !== 'panorama.encounter.v1') throw new Error('CAPABILITY_NOT_INSTALLED: panorama');
  if (d.version !== 1 || !id(d.id) || !id(d.workId) || ![d.title, d.setting, d.invitation, d.imageAlt, d.attribution].every(text) || !asset(d.panorama) || !asset(d.forgery)) fail('scene');
  if (d.questionOwner !== undefined && !['scene', 'tutor'].includes(d.questionOwner)) fail('question owner');
  if (!list(d.sources) || !unique(d.sources) || !list(d.people, 8) || !unique(d.people) || !list(d.repairs, 8) || !unique(d.repairs)) fail('collections');
  const references = (v: readonly string[]) => list(v) && new Set(v).size === v.length && v.every(id => d.sources.some(s => s.id === id));
  for (const s of d.sources) if (![s.title, s.text, s.provenance].every(text) || typeof s.url !== 'string' || !/^https:\/\/[^\s]+$/.test(s.url) || s.rect && !rect(s.rect)) fail('source');
  for (const p of d.people) {
    if (![p.name, p.activity, p.welcome].every(text) || !rect(p.rect) || !list(p.topics, 12) || !unique(p.topics)) fail('person');
    for (const t of p.topics) if (![t.question, t.reply].every(text) || !list(t.keywords) || !t.keywords.every(text) || !references(t.sourceIds)) fail('topic');
    if (p.approach && (!asset(p.approach.src, 'mp4|webm') || !asset(p.approach.captions, 'vtt') || !text(p.approach.transcript))) fail('approach');
  }
  for (const r of d.repairs) if (![r.title, r.action].every(text) || !rect(r.rect) || !references(r.sourceIds)) fail('repair');
  if (d.interviews !== undefined) {
    if (!list(d.interviews, 8) || !unique(d.interviews)) fail('interviews');
    for (const interview of d.interviews) {
      if (!text(interview.title) || !asset(interview.poster) || (interview.video && (!asset(interview.video.src, 'mp4|webm') || !asset(interview.video.captions, 'vtt')))) fail('interview media');
    }
  }
  if (d.viewpoints !== undefined) {
    if (!list(d.viewpoints, 8) || !unique(d.viewpoints)) fail('viewpoints');
    for (const v of d.viewpoints) {
      if (v.inspection !== undefined) requireSpatialInspection(v.inspection);
      if (!text(v.title) || !asset(v.image) || !Number.isFinite(v.yaw) || v.yaw < -180 || v.yaw >= 180 || !Number.isFinite(v.pitch) || Math.abs(v.pitch) > 89.9 || !Array.isArray(v.people)) fail('viewpoint');
      if (new Set(v.people.map(p => p.personId)).size !== v.people.length || v.people.some(p => !p || !d.people.some(person => person.id === p.personId) || !rect(p.rect))) fail('viewpoint people');
      if (v.places !== undefined && (!Array.isArray(v.places) || v.places.length > 8 || v.places.some(p => !p || !text(p.label) || p.targetId === v.id || !d.viewpoints!.some(target => target.id === p.targetId) || !Number.isFinite(p.yaw) || p.yaw < -180 || p.yaw >= 180 || !Number.isFinite(p.pitch) || Math.abs(p.pitch) > 89.9))) fail('viewpoint places');
    }
  }
  return d;
}
export const panoramaCapabilities = { 'panorama.encounter.v1': requirePanorama } as const;
export function requirePanoramaState(value: unknown, d: PanoramaDefinition): PanoramaState {
  const s = value as PanoramaState;
  if (!object(value) || !Number.isFinite(s.heading) || s.heading < 0 || s.heading > 100 || !object(s.conversations) || !object(s.repairs) || !Array.isArray(s.undo) || s.undo.length > 60) fail('saved scene');
  const refs = (v: unknown, allowed: readonly string[]) => Array.isArray(v) && v.length <= allowed.length && new Set(v).size === v.length && v.every(x => allowed.includes(x));
  if (!refs(s.visited, d.people.map(p => p.id)) || !refs(s.collected, d.sources.map(e => e.id))) fail('saved references');
  if (s.selectedPersonId !== undefined && !d.people.some(p => p.id === s.selectedPersonId)) fail('saved person');
  if (s.sphericalView !== undefined) {
    const v = s.sphericalView;
    if (!v || !d.viewpoints?.some(p => p.id === v.viewpointId) || ![v.yaw, v.pitch, v.fov].every(Number.isFinite) || v.yaw < -180 || v.yaw >= 180 || Math.abs(v.pitch) > 89.9 || v.fov < 35 || v.fov > 100) fail('saved spherical view');
  }
  for (const [person, messages] of Object.entries(s.conversations)) {
    if (!d.people.some(p => p.id === person) || !Array.isArray(messages) || messages.length > 60) fail('saved interview');
    for (const m of messages) if (!m || !['student', 'character'].includes(m.role) || !text(m.text) || !refs(m.sourceIds, d.sources.map(e => e.id))) fail('saved message');
  }
  for (const [repair, applied] of Object.entries(s.repairs)) if (!d.repairs.some(r => r.id === repair) || typeof applied !== 'boolean') fail('saved repair');
  for (const u of s.undo) if (!u || !d.repairs.some(r => r.id === u.id) || typeof u.previous !== 'boolean') fail('saved undo');
  return s;
}
