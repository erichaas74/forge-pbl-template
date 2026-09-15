import { type PanoramaAction, type PanoramaDefinition, type PanoramaPerson, type PanoramaState } from './panorama.models';

/** Authored topic matching, deliberately not presented as AI. */
export function matchTopic(person: PanoramaPerson, question: string) {
  const words: readonly string[] = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(/[a-z]+/g) ?? [];
  return person.topics.map(topic => ({ topic, score: topic.question.toLowerCase() === question.toLowerCase().trim() ? 100 : topic.keywords.filter(k => words.includes(k)).length }))
    .filter(row => row.score > 0).sort((a, b) => b.score - a.score)[0]?.topic;
}
export function transitionPanorama(d: PanoramaDefinition, s: PanoramaState, a: PanoramaAction): PanoramaState | undefined {
  switch (a.type) {
    case 'spherical-view': return d.viewpoints?.some(v => v.id === a.view.viewpointId) && [a.view.yaw, a.view.pitch, a.view.fov].every(Number.isFinite) && a.view.yaw >= -180 && a.view.yaw < 180 && Math.abs(a.view.pitch) <= 89.9 && a.view.fov >= 35 && a.view.fov <= 100 ? { ...s, sphericalView: a.view } : undefined;
    case 'view': return Number.isFinite(a.heading) && a.heading >= 0 && a.heading <= 100 ? { ...s, heading: a.heading } : undefined;
    case 'visit': return d.people.some(p => p.id === a.personId) ? { ...s, selectedPersonId: a.personId, visited: [...new Set([...s.visited, a.personId])] } : undefined;
    case 'collect': return d.sources.some(e => e.id === a.sourceId) ? { ...s, collected: s.collected.includes(a.sourceId) ? s.collected.filter(id => id !== a.sourceId) : [...s.collected, a.sourceId] } : undefined;
    case 'conversation': {
      if (!d.people.some(p => p.id === a.personId) || !a.question.trim() || a.question.length > 600 || a.answer.role !== 'character' || !a.answer.text.trim() || a.answer.text.length > 2500 || a.answer.sourceIds.some(id => !d.sources.some(e => e.id === id))) return undefined;
      const messages = [...(s.conversations[a.personId] ?? []), { role: 'student' as const, text: a.question, sourceIds: [] }, a.answer].slice(-60);
      return { ...s, conversations: { ...s.conversations, [a.personId]: messages } };
    }
    case 'repair': {
      if (!d.repairs.some(r => r.id === a.repairId) || !!s.repairs[a.repairId] === a.applied) return undefined;
      return { ...s, repairs: { ...s.repairs, [a.repairId]: a.applied }, undo: [...s.undo, { id: a.repairId, previous: !!s.repairs[a.repairId] }].slice(-60) };
    }
    case 'undo': {
      const last = s.undo.at(-1);
      return last ? { ...s, repairs: { ...s.repairs, [last.id]: last.previous }, undo: s.undo.slice(0, -1) } : undefined;
    }
  }
}
