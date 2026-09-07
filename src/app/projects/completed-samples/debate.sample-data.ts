import { romanSenateDebateConfig } from '../roman-senate-debate/roman-senate-debate.config';
import {
  createInitialDebateSession,
  createInitialDebateWorkspace,
  assembleBroadcastTimeline,
} from '../../templates/debate-studio/core/debate-studio-state';
import type {
  DebateSession,
  DebateStudioProjectConfig,
  DebateWorkspaceState,
  DebateVote,
} from '../../templates/debate-studio/domain/debate-studio.models';
import type { SampleGuide } from '../../shared/project-intro/completed-sample-guide';
const now = '2026-04-16T14:00:00.000Z';
export const debateSampleConfig: DebateStudioProjectConfig = {
  ...romanSenateDebateConfig,
  sessionId: 'completed-sample-senate',
  sessionDateLabel: 'Fictional classroom Senate · completed session',
  viewer: {
    ...romanSenateDebateConfig.viewer,
    studentId: 'sample-viewer',
    studentDisplayName: 'Sample visitor',
    classId: 'sample-senate',
    classLabel: 'Fictional classroom',
    allowTeacherPreview: false,
  },
};
const argumentsByRound: Record<string, readonly [string, string]> = {
  opening: [
    'The Republic was in crisis before Caesar. The crisis chronology describes blocked reforms and recurring violence. The reform record lists practical changes to the calendar, colonies, debt, and grain policy. Those results support our claim that strong leadership addressed problems the existing government had failed to solve. But useful results alone do not tell us how long extraordinary power should last.',
    'A crisis does not settle who may hold power or for how long. The Rubicon record describes an army brought into Italy against a demand to surrender command. The title dictator in perpetuity removes the customary short emergency limit. Together these records support our concern that personal power was replacing restraints. We must also explain how a limited government could respond to a real crisis.',
  ],
  response: [
    'The moderator asks where emergency leadership should end. We first treated successful reforms as enough. The opposing claim about permanent power shows the gap. Our revised defense is conditional: emergency leadership needs a time limit and a way to return authority. The reform record supports the need to act; it does not prove that permanent dictatorship was necessary.',
    'The reformers say power should be judged by the problems it solves. We agree that the crisis chronology describes serious problems. But the dictator title supplies a specific institutional cost: the old emergency limit no longer applies. A reform can be useful while the arrangement used to deliver it threatens accountability.',
  ],
  rebuttal: [
    'Our opponents connect crossing the Rubicon with the loss of republican authority. That is serious evidence, but it does not show that the institutions were functioning well beforehand. The crisis record challenges a simple story in which Caesar alone created the problem. We defend the need for reform while accepting the objection to unlimited duration.',
    'The reformers argue that solving problems justifies extraordinary power. Their reform record shows outcomes; it does not show that indefinite personal control was the only way to achieve them. Our evidence is the missing time limit in the dictator title. Our response targets that connection, rather than denying that reforms occurred.',
  ],
  crossfire: [
    'Would we support a leader who kept emergency authority after the crisis ended? No. The moderator’s question changes our test: we would require a defined end and review. The evidence of political crisis explains why extraordinary authority appealed; it does not establish that every use or duration was justified.',
    'Can ordinary institutions solve a crisis if they are already blocked? We cannot assume they can. The crisis record is a real challenge to our faction. Our answer is that proposals need both a way to act and enforceable limits. The title without an end date is the specific feature we cannot reconcile with that requirement.',
  ],
  closing: [
    'Rome needed action on serious problems, and the reform record supports that part of our case. We have narrowed the claim we opened with: beneficial reform does not automatically justify permanent authority. Judge whether we used the crisis evidence honestly and answered the concern about limits.',
    'The Republic faced genuine instability, and our opponents were right to make us address it. Our final claim is that effectiveness and accountability must both be tested. The Rubicon and dictator records support our concern about force and duration. Our strongest improvement was answering the reform argument instead of simply repeating that power was dangerous.',
  ],
};
export function createDebateSample(): DebateSession {
  const seed = createInitialDebateSession(debateSampleConfig, now, 'completed-sample');
  const turns = seed.turns.map((turn, index) => {
    const side = turn.factionId === 'caesarian-reformers' ? 0 : 1;
    const speaker =
      side === 0
        ? turn.roundType === 'opening'
          ? 'Maya Torres'
          : 'Elena Ruiz'
        : turn.roundType === 'opening'
          ? 'Noah Williams'
          : 'Jordan Lee';
    const prior = seed.turns
      .filter((candidate) => candidate.factionId !== turn.factionId && candidate.order < turn.order)
      .at(-1);
    return {
      ...turn,
      status: 'filed' as const,
      speakerId: 'sample-' + speaker.split(' ')[0].toLowerCase(),
      speakerDisplayName: speaker,
      transcript: argumentsByRound[turn.roundId][side],
      evidenceIds: side === 0 ? ['ev-senate-crisis', 'ev-reforms'] : ['ev-rubicon', 'ev-dictator'],
      opponentAnnotations: prior
        ? [
            {
              id: 'annotation-' + index,
              studentId: 'sample-' + speaker.split(' ')[0].toLowerCase(),
              sourceTurnId: prior.id,
              excerpt: argumentsByRound[prior.roundId][side === 0 ? 1 : 0],
              marker: 'answer-this' as const,
              createdAt: now,
            },
          ]
        : [],
      reasoningContribution:
        side === 0
          ? 'A need for reform does not establish that permanent authority was necessary.'
          : 'A useful result does not remove the need to examine limits on authority.',
      durationSeconds: 55,
      filedAt: now,
      teacherFeedback:
        side === 0
          ? 'Builder guidance example: connect each benefit to a source and answer the objection about duration.'
          : 'Builder guidance example: respond to the crisis evidence and identify the particular institutional limit at stake.',
    };
  });
  const moderatorQueue = turns
    .filter((turn) => turn.moderatorRequired)
    .map((turn, index) => ({
      id: 'sample-moderator-' + index,
      targetTurnId: turn.id,
      question:
        turn.factionId === 'caesarian-reformers'
          ? 'You have argued that crisis required action. What evidence would show that emergency power had gone too far?'
          : 'Your opponents identify reforms and a blocked government. How does your answer address those needs while preserving limits?',
      reason: 'Test whether the next speaker can answer a specific opposing claim.',
      triggerTurnIds: turn.dependsOnTurnIds,
      priority: 'point of clash',
      status: 'released' as const,
      createdAt: now,
      approvedBy: 'sample-teacher',
      approvedAt: now,
      releasedAt: now,
      generation: 1,
    }));
  const votes = (choices: readonly string[]): Record<string, DebateVote> =>
    Object.fromEntries(
      choices.map((choiceId, index) => [
        'sample-ballot-' + index,
        { studentId: 'sample-ballot-' + index, choiceId, castAt: now },
      ]),
    );
  const ballots = (first: string, second: string, count: number) =>
    votes(Array.from({ length: 12 }, (_, index) => (index < count ? first : second)));
  const categoryVotes = Object.fromEntries(
    debateSampleConfig.voteCategories.map((category) => [
      category.id,
      category.optionSource === 'factions'
        ? ballots(
            'republic-defenders',
            'caesarian-reformers',
            category.id === 'final-verdict' ? 7 : category.id === 'evidence' ? 8 : 5,
          )
        : votes(
            Array.from({ length: 12 }, (_, index) =>
              category.optionSource === 'speakers'
                ? ['sample-maya', 'sample-noah', 'sample-elena', 'sample-jordan'][index % 4]
                : turns[index % turns.length].id,
            ),
          ),
    ]),
  );
  const session: DebateSession = {
    ...seed,
    status: 'complete',
    revision: 24,
    currentTurnId: null,
    currentRound: debateSampleConfig.rounds.length - 1,
    turns,
    moderatorQueue,
    preVotes: votes(
      Array.from(
        { length: 12 },
        (_, index) => ['leader-needed', 'threat-republic', 'unsure'][index % 3],
      ),
    ),
    postVotes: ballots('threat-republic', 'leader-needed', 7),
    categoryVotes,
    premiereCompletedAt: now,
    members: {},
    reflections: {},
    updatedAt: now,
  };
  return { ...session, broadcastTimeline: assembleBroadcastTimeline(debateSampleConfig, session) };
}
export function createDebateSampleWorkspace(): DebateWorkspaceState {
  return { ...createInitialDebateWorkspace(), room: 'premiere', activeSegmentIndex: 2 };
}
export const debateSampleGuide: SampleGuide = {
  title: 'Watch a Finished Senate Debate Take Shape',
  subtitle:
    'An animated walkthrough adds each argument to the shared thread, opens the response builder, demonstrates the student work, and files the finished response.',
  audience: 'History & argument · Grades 5–6',
  duration: 'Play, pause, or step through · about 45 seconds',
  trail: [
    {
      label: 'Thread builds',
      title: 'Arguments enter from both sides.',
      text: 'The two opening positions arrive as speech bubbles and are added to their compact faction archives.',
      evidence: 'Animated thread bubbles → expandable left and right argument records.',
    },
    {
      label: 'Neutral interruption',
      title: 'The moderator identifies the point of clash.',
      text: 'A third-color moderator question breaks the back-and-forth before the next response is prepared.',
      evidence: 'Centered moderator break → response builder opens below it.',
    },
    {
      label: 'Build the response',
      title: 'Planning becomes a filed argument.',
      text: 'The example moves through planning, selected evidence, animated writing, readiness feedback, and the final filing step.',
      evidence: 'Plan → Evidence → Write → Feedback → Record & file.',
    },
    {
      label: 'Complete record',
      title: 'The exchange continues to the class judgment.',
      text: 'The remaining moderator questions and arguments enter in sequence. Seven of twelve fictional ballots find the Republic faction most persuasive today: 58% versus 42%.',
      evidence:
        'Finished class record → optional aggregate result. Individual ballots are not displayed.',
    },
  ],
  review: {
    strength:
      'Reformers use the crisis and policy records and accept a limit to their first claim. Republic defenders connect their concern to particular institutional changes.',
    question:
      'Reformers: what would end the emergency authority you defend? Republic defenders: how would your proposal address the crisis your opponents identified?',
    revision:
      'Both closings acknowledge a strong opposing point. The claim changes in response to the moderator and the evidence.',
    assessment:
      'Feedback for reformers: strengthen the evidence for proposed safeguards. Feedback for republic defenders: explain a workable response to institutional paralysis. Class persuasion totals are not a mastery grade or a ranking of students.',
  },
};
