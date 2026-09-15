import raw from '../../../../../../public/projects/exploration-time-repair/versions/2.3.0/project.json';
import { requireInventionProject } from '../invention.validation';
import { knowledgeActivities, validKnowledgeDefinition } from './knowledge.engine';

const project = requireInventionProject(raw);
const sessions = project.inventionRescue.sessions;

describe('Time Repair four-week history restructure', () => {
  it('keeps investigation outside Week 3 and repair screens inside Week 3', () => {
    expect(project.projectVersion).toBe('2.3.0');
    expect(project.inventionRescue.weeks.map((week) => week.title)).toEqual([
      'Find what did not happen',
      'Find what caused the gap',
      'Repair and learn Gutenberg',
      'See the history that happened',
    ]);
    expect(sessions.slice(0, 2).map((session) => session.knowledge?.kind)).toEqual([
      'timeline',
      'interview',
    ]);
    expect(sessions.slice(2, 4).map((session) => session.knowledge?.kind)).toEqual([
      'newspaper',
      'interview',
    ]);
    expect(sessions[4].mode).toBe('ink');
    expect(sessions[4].knowledge).toBeUndefined();
    expect(sessions[5].knowledge?.kind).toBe('assembly');
    expect(sessions.slice(6).map((session) => session.knowledge?.kind)).toEqual([
      'newspaper',
      'timeline',
    ]);
    expect(sessions.filter((session) => session.mode !== 'knowledge' && session.number !== 5)).toHaveLength(0);
  });

  it('validates and solves the timeline inference without text entry', () => {
    const config = sessions[0].knowledge!;
    expect(validKnowledgeDefinition(config)).toBe(true);
    let state = knowledgeActivities.timeline.initial(config);
    for (const node of config.timeline!.nodes) {
      state = knowledgeActivities.timeline.reduce(config, state, { type: 'inspect', target: node.id });
    }
    state = knowledgeActivities.timeline.reduce(config, state, { type: 'candidate', target: config.timeline!.answer });
    state = knowledgeActivities.timeline.reduce(config, state, { type: 'test' });
    expect(state.trials.at(-1)?.success).toBe(true);
  });

  it('requires newspaper and interview evidence to be inspected before interpretation', () => {
    const newspaper = sessions[2].knowledge!;
    let paperState = knowledgeActivities.newspaper.initial(newspaper);
    paperState = knowledgeActivities.newspaper.reduce(newspaper, paperState, { type: 'trace' });
    expect(paperState.trials.at(-1)?.success).toBe(false);
    for (const edition of newspaper.newspaper!.editions) {
      paperState = knowledgeActivities.newspaper.reduce(newspaper, paperState, { type: 'open', target: edition.id });
      for (const column of [0, 1])
        paperState = knowledgeActivities.newspaper.reduce(newspaper, paperState, { type: 'inspect', target: `${edition.id}:${column}` });
    }
    paperState = knowledgeActivities.newspaper.reduce(newspaper, paperState, { type: 'trace' });
    expect(paperState.trials.at(-1)?.success).toBe(true);

    const interview = sessions[3].knowledge!;
    let interviewState = knowledgeActivities.interview.initial(interview);
    for (const witness of interview.interview!.witnesses) {
      interviewState = knowledgeActivities.interview.reduce(interview, interviewState, { type: 'hear', target: witness.id });
      interviewState = knowledgeActivities.interview.reduce(interview, interviewState, { type: 'inspect', target: witness.id });
    }
    interviewState = knowledgeActivities.interview.reduce(interview, interviewState, { type: 'weigh' });
    expect(interviewState.trials.at(-1)?.success).toBe(true);
  });
});
