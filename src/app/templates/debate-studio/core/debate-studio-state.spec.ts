import { describe, expect, it } from 'vitest';

import { romanSenateDebateConfig } from '../../../projects/roman-senate-debate/roman-senate-debate.config';
import type {
  DebateArgumentAnnotation,
  DebateSession,
  DebateTurnFiling,
} from '../domain/debate-studio.models';
import {
  approveModeratorPrompt,
  canFileTurn,
  castCategoryVote,
  castOpinionVote,
  completeDebateVoting,
  conveneDebatePremiere,
  createInitialDebateSession,
  createInitialDebateWorkspace,
  debateVotingComplete,
  fileDebateTurn,
  markPremiereComplete,
  persuasionShift,
  releaseModeratorPrompt,
  submitDebateReflection,
} from './debate-studio-state';

const NOW = '2026-09-04T18:00:00.000Z';

describe('shared debate state', () => {
  it('creates one turn plan with parallel openings and transcript-driven moderator release', () => {
    const config = { ...romanSenateDebateConfig, seedTurns: [], seedModeratorPrompts: [] } as const;
    let session = createInitialDebateSession(config, NOW);

    expect(
      session.turns.filter((turn) => turn.status === 'available').map((turn) => turn.id),
    ).toEqual(['opening-caesarian-reformers', 'opening-republic-defenders']);

    session = fileDebateTurn(
      config,
      session,
      'opening-caesarian-reformers',
      filing('student-a', 'Maya', 'Caesar restored order through reforms and military strength.'),
    );
    expect(session.moderatorQueue).toHaveLength(0);

    session = fileDebateTurn(
      config,
      session,
      'opening-republic-defenders',
      filing(
        'student-b',
        'Noah',
        'A crisis cannot justify permanent power without republican limits.',
      ),
    );
    const proposal = session.moderatorQueue.find(
      (prompt) => prompt.targetTurnId === 'response-caesarian-reformers',
    );
    expect(proposal?.status).toBe('proposed');
    expect(proposal?.triggerTurnIds).toEqual([
      'opening-caesarian-reformers',
      'opening-republic-defenders',
    ]);

    session = approveModeratorPrompt(session, proposal!.id, 'teacher-1', NOW);
    session = releaseModeratorPrompt(config, session, proposal!.id, 'teacher-1', NOW);
    expect(session.turns.find((turn) => turn.id === 'response-caesarian-reformers')?.status).toBe(
      'available',
    );
  });

  it('requires listening evidence before a response can be filed', () => {
    const round = romanSenateDebateConfig.rounds.find((item) => item.id === 'response')!;
    const initial = createInitialDebateWorkspace();
    expect(canFileTurn(round, initial, true)).toBe(false);

    const annotation: DebateArgumentAnnotation = {
      id: 'annotation-1',
      studentId: 'student-b',
      sourceTurnId: 'response-caesarian-reformers',
      excerpt: 'Caesar restored order.',
      marker: 'challenge-this',
      createdAt: NOW,
    };
    expect(
      canFileTurn(
        round,
        {
          ...initial,
          opponentHeardTurnId: 'response-caesarian-reformers',
          moderatorHeardPromptId: 'moderator-response-republic-defenders-1',
          annotations: [annotation],
          selectedEvidenceIds: ['ev-dictator'],
          draft:
            'The opposing faction measures power only by immediate results. The dictatorship in perpetuity shows why that measure is incomplete: a leader may solve a problem while also destroying the limits that protect a republic. Caesar’s useful reforms therefore cannot answer the danger created when no ordinary institution can restrain the person making them.',
          reasoningContribution:
            'The evidence answers the opponent because effective policy and legitimate limits must be judged together.',
          rehearsed: true,
          recordingReady: true,
        },
        true,
      ),
    ).toBe(true);
  });

  it('alternates authentic student turns and assembles them into the final broadcast automatically', () => {
    const config = { ...romanSenateDebateConfig, seedTurns: [], seedModeratorPrompts: [] } as const;
    let session = createInitialDebateSession(config, NOW);
    let speaker = 0;

    for (let guard = 0; guard < 30 && session.status !== 'premiere-ready'; guard += 1) {
      const pending = session.moderatorQueue.find(
        (prompt) => prompt.status === 'proposed' || prompt.status === 'approved',
      );
      if (pending !== undefined) {
        session = approveModeratorPrompt(session, pending.id, 'teacher-1', NOW);
        session = releaseModeratorPrompt(config, session, pending.id, 'teacher-1', NOW);
        continue;
      }
      const available = session.turns.find((turn) => turn.status === 'available');
      expect(available).toBeDefined();
      speaker += 1;
      session = fileDebateTurn(
        config,
        session,
        available!.id,
        filing(
          `student-${speaker}`,
          `Student ${speaker}`,
          `Authentic filed argument ${speaker} answering the developing class debate with historical evidence.`,
        ),
      );
    }

    expect(session.status).toBe('premiere-ready');
    expect(session.turns.every((turn) => turn.status === 'filed')).toBe(true);
    expect(session.broadcastTimeline.filter((segment) => segment.kind === 'student')).toHaveLength(
      10,
    );
    expect(
      session.broadcastTimeline.filter((segment) => segment.kind === 'moderator').length,
    ).toBeGreaterThan(4);
    expect(session.broadcastTimeline.map((segment) => segment.transcript)).toContain(
      'Authentic filed argument 10 answering the developing class debate with historical evidence.',
    );
  });

  it('unlocks voting only after the premiere and calculates persuasion shift', () => {
    let session: DebateSession = {
      ...createInitialDebateSession(romanSenateDebateConfig, NOW),
      status: 'premiere-ready',
    };
    session = castOpinionVote(session, 'pre', {
      studentId: 'student-1',
      choiceId: 'unsure',
      castAt: NOW,
    });
    expect(
      castOpinionVote(session, 'post', {
        studentId: 'student-1',
        choiceId: 'threat-republic',
        castAt: NOW,
      }),
    ).toEqual(session);

    session = conveneDebatePremiere(session, NOW);
    session = markPremiereComplete(session, NOW);
    session = castOpinionVote(session, 'post', {
      studentId: 'student-1',
      choiceId: 'threat-republic',
      castAt: NOW,
    });
    for (const category of romanSenateDebateConfig.voteCategories) {
      session = castCategoryVote(session, category.id, {
        studentId: 'student-1',
        choiceId:
          category.optionSource === 'factions'
            ? 'republic-defenders'
            : 'response-caesarian-reformers',
        castAt: NOW,
      });
    }
    session = submitDebateReflection(
      session,
      'student-1',
      'The exchange made the danger of permanent emergency power more concrete.',
      NOW,
    );
    expect(debateVotingComplete(romanSenateDebateConfig, session, 'student-1')).toBe(true);
    session = completeDebateVoting(romanSenateDebateConfig, session, 'student-1', NOW);
    expect(session.status).toBe('complete');
    expect(persuasionShift(session, romanSenateDebateConfig.opinionOptions)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ option: expect.objectContaining({ id: 'unsure' }), change: -1 }),
        expect.objectContaining({
          option: expect.objectContaining({ id: 'threat-republic' }),
          change: 1,
        }),
      ]),
    );
  });
});

function filing(
  speakerId: string,
  speakerDisplayName: string,
  transcript: string,
): DebateTurnFiling {
  return {
    speakerId,
    speakerDisplayName,
    transcript,
    evidenceIds: ['ev-senate-crisis'],
    opponentAnnotations: [],
    reasoningContribution:
      'This reasoning connects the evidence to the claim in the official record.',
    durationSeconds: 50,
    filedAt: NOW,
  };
}
