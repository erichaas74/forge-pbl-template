import type { HistoryLiveProjectConfig } from '../domain/history-live.models';
import { BOARD_FIELDS, PRESENTATION_FORMATS, type ReportingAction, type ReportingWorkspace, type StoryReportingState, type ReportingStory, type ReportingStep, type EvidenceKind } from './story-reporting.models';

export const EDITOR_CHECKS = ['Sources checked', 'Views represented fairly', 'Uncertainty is clear'] as const;
export const EMPTY_REPORTING: StoryReportingState = { version: '1.0', step: 'story', workspaces: [] };
export function emptyReportingWorkspace(storyId: string): ReportingWorkspace {
  return { storyId, notes: [], noteDrafts: {}, asked: [], checks: [], presentations: {},
    board: Object.fromEntries(BOARD_FIELDS.map(key => [key, { text: '', noteIds: [] }])) as unknown as ReportingWorkspace['board'] };
}
export function reportingOrigin(story: ReportingStory, originId: string) {
  const interview = story.interviews.find(person => person.id === originId);
  if (interview) return { kind: 'interview' as EvidenceKind, title: interview.name, sourceIds: interview.sourceIds };
  if (originId === 'scene') return { kind: 'scene' as EvidenceKind, title: `${story.location} · scene notes`, sourceIds: [...new Set(story.dispatches.flatMap(item => item.sourceIds))] };
  if (story.sourceIds.includes(originId)) return { kind: 'document' as EvidenceKind, title: '', sourceIds: [originId] };
  throw new Error('This evidence is not part of the selected story.');
}
export function boardIssues(work: ReportingWorkspace | undefined): string[] {
  if (!work) return ['Pick a story.'];
  const issues: string[] = [];
  if (!work.board.question.text.trim()) issues.push('Your story question');
  if (!work.board.facts.text.trim()) issues.push('Facts in your own words');
  const notes = work.notes.filter(note => work.board.facts.noteIds.includes(note.id));
  if (new Set(notes.flatMap(note => note.sourceIds)).size < 2) issues.push('Facts linked to two sources');
  if (!notes.some(note => note.kind === 'document')) issues.push('A document note linked to your facts');
  if (!work.board.opposing.text.trim() || !work.board.opposing.noteIds.length) issues.push('Another view with a linked note');
  if (!work.board.context.text.trim()) issues.push('Who, where, and when');
  if (!work.board.unknowns.text.trim()) issues.push('What is still uncertain');
  if (!work.board.lead.text.trim()) issues.push('Your opening sentence');
  if (EDITOR_CHECKS.some(check => !work.checks.includes(check))) issues.push('Your three editor checks');
  return issues;
}
export function reportingStepIssues(state: StoryReportingState, step: ReportingStep): string[] {
  const work = state.workspaces.find(item => item.storyId === state.activeStoryId);
  if (step === 'story') return [];
  if (!work) return ['Pick a story first.'];
  if (step === 'build') return work.notes.length ? [] : ['Save your first reporting note.'];
  if (step === 'format' || step === 'create') {
    const issues = boardIssues(work);
    if (step === 'create' && !work.format) issues.push('Choose a presentation.');
    return issues;
  }
  return [];
}
export function reduceReporting(state: StoryReportingState, action: ReportingAction, config: HistoryLiveProjectConfig): StoryReportingState {
  const reporting = config.reporting;
  if (!reporting) throw new Error('Story reporting is not configured.');
  if (action.type === 'reporting.storySelected') {
    if (!reporting.stories.some(item => item.id === action.storyId)) throw new Error('Unknown story.');
    return { ...state, activeStoryId: action.storyId, step: 'gather', workspaces: state.workspaces.some(item => item.storyId === action.storyId) ? state.workspaces : [...state.workspaces, emptyReportingWorkspace(action.storyId)] };
  }
  if (action.type === 'reporting.stepOpened') {
    const issues = reportingStepIssues(state, action.step);
    if (issues.length) throw new Error(issues.join(' · '));
    return { ...state, step: action.step };
  }
  const work = state.workspaces.find(item => item.storyId === state.activeStoryId);
  const story = reporting.stories.find(item => item.id === state.activeStoryId);
  if (!work || !story) throw new Error('Pick a story first.');
  let next = work;
  let step = state.step;
  const clipped = (text: string) => text.slice(0, 6000);
  switch (action.type) {
    case 'reporting.questionAsked': {
      const person = story.interviews.find(item => item.id === action.interviewId);
      if (!person?.questions.some(item => item.id === action.questionId)) throw new Error('Unknown interview question.');
      next = { ...work, asked: [...new Set([...work.asked, `${action.interviewId}:${action.questionId}`])] };
      break;
    }
    case 'reporting.noteDraftChanged':
      reportingOrigin(story, action.originId);
      next = { ...work, noteDrafts: { ...work.noteDrafts, [action.originId]: clipped(action.text) } };
      break;
    case 'reporting.noteSaved': {
      const origin = reportingOrigin(story, action.originId);
      const text = work.noteDrafts[action.originId]?.trim();
      if (!text) throw new Error('Write a note in your own words.');
      if (origin.kind === 'interview' && !work.asked.some(key => key.startsWith(`${action.originId}:`))) throw new Error('Ask this person a question first.');
      const existing = work.notes.find(item => item.originId === action.originId);
      const title = origin.title || config.sources.find(item => item.id === action.originId)!.title;
      const note = { ...origin, title, id: existing?.id ?? `note:${action.originId}`, originId: action.originId, text, originalText: existing?.originalText ?? text, previous: existing && existing.text !== text ? [...existing.previous.slice(-4), existing.text] : existing?.previous ?? [] };
      next = { ...work, checks: [], notes: [...work.notes.filter(item => item.id !== note.id), note] };
      break;
    }
    case 'reporting.boardChanged':
      next = { ...work, checks: [], board: { ...work.board, [action.field]: { ...work.board[action.field], text: clipped(action.text) } } };
      break;
    case 'reporting.noteLinked': {
      if (!work.notes.some(item => item.id === action.noteId)) throw new Error('This note belongs to another story.');
      const entry = work.board[action.field];
      next = { ...work, checks: [], board: { ...work.board, [action.field]: { ...entry, noteIds: entry.noteIds.includes(action.noteId) ? entry.noteIds.filter(id => id !== action.noteId) : [...entry.noteIds, action.noteId] } } };
      break;
    }
    case 'reporting.checkChanged':
      if (!(EDITOR_CHECKS as readonly string[]).includes(action.check)) throw new Error('Unknown editor check.');
      next = { ...work, checks: work.checks.includes(action.check) ? work.checks.filter(item => item !== action.check) : [...work.checks, action.check] };
      break;
    case 'reporting.formatSelected': {
      const issues = boardIssues(work);
      if (issues.length) throw new Error(issues.join(' · '));
      if (!(state.allowedFormats ?? reporting.allowedFormats).includes(action.format)) throw new Error('This format is not available for this assignment.');
      next = { ...work, format: action.format, presentations: { ...work.presentations, [action.format]: work.presentations[action.format] ?? { title: '', parts: ['', '', '', ''] } } };
      step = 'create';
      break;
    }
    case 'reporting.presentationChanged': {
      if (!work.format || !(state.allowedFormats ?? reporting.allowedFormats).includes(work.format)) throw new Error('Choose an available format.');
      const draft = work.presentations[work.format]!;
      if (action.index !== undefined && (!Number.isInteger(action.index) || action.index < 0 || action.index > 3)) throw new Error('Unknown presentation part.');
      next = { ...work, presentations: { ...work.presentations, [work.format]: { ...draft, savedRevision: undefined, title: action.title === undefined ? draft.title : clipped(action.title), parts: draft.parts.map((text, index) => index === action.index ? clipped(action.text ?? '') : text) } } };
      break;
    }
    case 'reporting.presentationSaved': {
      const issues = boardIssues(work);
      const draft = work.format && work.presentations[work.format];
      if (issues.length || !draft?.title.trim() || draft.parts.some(text => !text.trim())) throw new Error('Finish the story board, headline, and four report parts.');
      if (!work.format || !(state.allowedFormats ?? reporting.allowedFormats).includes(work.format)) throw new Error('This format is no longer available.');
      next = { ...work, presentations: { ...work.presentations, [work.format]: { ...draft, savedRevision: (draft.savedRevision ?? 0) + 1 } } };
      break;
    }
  }
  // A changed source note or reasoning invalidates a finished report, without erasing its draft.
  if (['reporting.noteSaved', 'reporting.boardChanged', 'reporting.noteLinked', 'reporting.checkChanged'].includes(action.type)) {
    next = { ...next, presentations: Object.fromEntries(Object.entries(next.presentations).map(([key, value]) => [key, { ...value, savedRevision: undefined }])) };
  }
  return { ...state, step, workspaces: state.workspaces.map(item => item.storyId === work.storyId ? next : item) };
}
export function validateReportingConfig(config: HistoryLiveProjectConfig): string[] {
  const reporting = config.reporting;
  if (!reporting) return [];
  const errors: string[] = [];
  if (reporting.version !== '1.0' || !reporting.stories.length || reporting.stories.length > 30) errors.push('Invalid reporting configuration.');
  if (!reporting.allowedFormats.length || new Set(reporting.allowedFormats).size !== reporting.allowedFormats.length || reporting.allowedFormats.some(format => !PRESENTATION_FORMATS.includes(format))) errors.push('Invalid presentation formats.');
  if (new Set(reporting.stories.map(story => story.id)).size !== reporting.stories.length) errors.push('Duplicate reporting story.');
  for (const story of reporting.stories) {
    if (!config.storyLeads.some(lead => lead.id === story.leadId)) errors.push(`Missing lead: ${story.id}`);
    if (story.sourceIds.length < 2 || story.interviews.length < 2 || !story.dispatches.length) errors.push(`Incomplete reporting packet: ${story.id}`);
    if (new Set(story.interviews.map(person => person.id)).size !== story.interviews.length) errors.push(`Duplicate interview: ${story.id}`);
    const references = [...story.sourceIds, ...story.interviews.flatMap(person => person.sourceIds), ...story.dispatches.flatMap(scene => scene.sourceIds)];
    for (const id of references) {
      const source = config.sources.find(item => item.id === id);
      if (!source || !story.sourceIds.includes(id) || !source.availableOn || source.availableOn > story.date) errors.push(`Unavailable source ${id}: ${story.id}`);
    }
    if (!story.sourceIds.some(id => config.sources.find(source => source.id === id)?.primary)) errors.push(`Missing primary document: ${story.id}`);
    for (const person of story.interviews) if (!person.questions.length || !person.sourceIds.length || new Set(person.questions.map(question => question.id)).size !== person.questions.length) errors.push(`Incomplete interview: ${person.id}`);
  }
  return errors;
}
