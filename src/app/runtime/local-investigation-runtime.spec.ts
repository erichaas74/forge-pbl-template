import {
  createSimpleRuntime,
  runtimeEvent,
  studentScope,
} from '../testing/runtime-test-helpers';

describe('event -> rule -> command -> state integration', () => {
  it('runs the configured investigation behavior without project-specific runtime code', async () => {
    const { platform, graph } = await createSimpleRuntime();
    const versions: number[] = [];
    platform.state.subscribe(studentScope, (snapshot) => versions.push(snapshot.version));

    const activity = runtimeEvent(
      'event-activity-complete',
      'activity.completed',
      'act-test',
    );
    const activityResult = await platform.dispatch(studentScope, activity, graph);

    expect(activityResult.matchedRuleIds).toEqual([
      'rule-activity-unlocks-evidence',
    ]);
    expect(activityResult.snapshot?.activities['act-test']?.status).toBe('complete');
    expect(activityResult.snapshot?.activities['act-test']).toMatchObject({
      completionStatus: 'complete',
      submissionStatus: 'notRequired',
      masteryStatus: 'notMeasured',
      approvalStatus: 'notRequired',
      gradeStatus: 'ungraded',
    });
    expect(activityResult.snapshot?.evidence['ev-result']?.status).toBe('available');
    expect(activityResult.snapshot?.resources['resource-credits']).toBe(3);
    expect(activityResult.snapshot?.firedRuleIds).toContain(
      'rule-activity-unlocks-evidence',
    );
    expect(activityResult.snapshot?.version).toBe(1);

    const duplicate = await platform.dispatch(studentScope, activity, graph);
    expect(duplicate.duplicate).toBe(true);
    expect(duplicate.errors).toContainEqual(
      expect.objectContaining({ code: 'DUPLICATE_EVENT', severity: 'info' }),
    );
    expect(duplicate.snapshot?.resources['resource-credits']).toBe(3);
    expect(duplicate.snapshot?.version).toBe(1);

    await platform.dispatch(
      studentScope,
      runtimeEvent('event-collect-intro', 'evidence.collected', 'ev-intro'),
      graph,
    );
    const secondCollection = await platform.dispatch(
      studentScope,
      runtimeEvent('event-collect-result', 'evidence.collected', 'ev-result'),
      graph,
    );
    expect(secondCollection.matchedRuleIds).toEqual([
      'rule-evidence-opens-phase',
    ]);
    expect(secondCollection.snapshot?.phases['phase-final']?.status).toBe('available');

    const classification = await platform.dispatch(
      studentScope,
      runtimeEvent('event-classify', 'evidence.classified', 'ev-result', {
        classification: 'supports',
      }),
      graph,
    );
    expect(classification.snapshot?.evidence['ev-result']).toMatchObject({
      status: 'classified',
      classification: 'supports',
    });

    await platform.dispatch(
      studentScope,
      runtimeEvent('event-hypothesis-create', 'hypothesis.created', 'hyp-1', {
        statement: 'Initial explanation',
        confidence: 40,
      }),
      graph,
    );
    const revision = await platform.dispatch(
      studentScope,
      runtimeEvent('event-hypothesis-revise', 'hypothesis.revised', 'hyp-1', {
        statement: 'Revised explanation',
        reasonForChange: 'New evidence',
      }),
      graph,
    );
    expect(revision.snapshot?.hypotheses[0]?.revisions).toHaveLength(2);
    expect(revision.snapshot?.hypotheses[0]?.statement).toBe('Revised explanation');
    expect(revision.snapshot?.finalSubmission.status).toBe('open');

    const spend = await platform.dispatch(
      studentScope,
      runtimeEvent('event-spend', 'resource.spendRequested', 'resource-credits', {
        amount: 2,
      }),
      graph,
    );
    expect(spend.snapshot?.resources['resource-credits']).toBe(1);
    const insufficient = await platform.dispatch(
      studentScope,
      runtimeEvent('event-spend-too-much', 'resource.spendRequested', 'resource-credits', {
        amount: 2,
      }),
      graph,
    );
    expect(insufficient.errors).toContainEqual(
      expect.objectContaining({ code: 'INSUFFICIENT_RESOURCE' }),
    );
    expect(insufficient.snapshot?.resources['resource-credits']).toBe(1);

    const npc = await platform.dispatch(
      studentScope,
      runtimeEvent('event-npc', 'npc.questionAsked', 'npc-guide'),
      graph,
    );
    expect(npc.snapshot?.stateValues['case.path']).toBe('npc');

    const teacher = await platform.dispatch(
      studentScope,
      runtimeEvent(
        'event-teacher',
        'teacher.commandRequested',
        undefined,
        {
          command: {
            commandType: 'state.set',
            targetId: 'case.progress',
            value: 4,
          },
        },
        { type: 'teacher', id: 'teacher-1' },
      ),
      graph,
    );
    expect(teacher.snapshot?.stateValues['case.progress']).toBe(4);

    const final = await platform.dispatch(
      studentScope,
      runtimeEvent('event-final', 'finalSubmission.submitted'),
      graph,
    );
    expect(final.snapshot?.finalSubmission.status).toBe('submitted');
    expect(final.snapshot?.finalSubmission).toMatchObject({
      availabilityStatus: 'open',
      submissionStatus: 'submitted',
      approvalStatus: 'notRequired',
      gradeStatus: 'ungraded',
    });
    expect(versions).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(platform.eventLog.list(studentScope)).toHaveLength(11);
    expect(platform.tracer.list().at(-1)).toMatchObject({
      eventType: 'finalSubmission.submitted',
      stateVersion: 10,
    });
  });

  it('rejects unregistered events without changing runtime state', async () => {
    const { platform, graph } = await createSimpleRuntime();

    const result = await platform.dispatch(
      studentScope,
      runtimeEvent('event-unknown', 'project.customUiClick'),
      graph,
    );

    expect(result.errors).toContainEqual(
      expect.objectContaining({ code: 'UNKNOWN_EVENT_TYPE' }),
    );
    expect(platform.state.getSnapshot(studentScope)?.version).toBe(0);
  });

  it('denies teacher command events from a student actor', async () => {
    const { platform, graph } = await createSimpleRuntime();

    const result = await platform.dispatch(
      studentScope,
      runtimeEvent('event-fake-teacher', 'teacher.commandRequested', undefined, {
        command: { commandType: 'state.set', targetId: 'case.path', value: 'npc' },
      }),
      graph,
    );

    expect(result.errors).toContainEqual(
      expect.objectContaining({ code: 'PERMISSION_DENIED' }),
    );
    expect(result.snapshot?.stateValues['case.path']).toBe('default');
  });

  it('coalesces concurrent retries with the same idempotency key', async () => {
    const { platform, graph } = await createSimpleRuntime();
    const first = {
      ...runtimeEvent('concurrent-a', 'activity.completed', 'act-test'),
      clientEventId: 'retry-key',
    };
    const retry = {
      ...runtimeEvent('concurrent-b', 'activity.completed', 'act-test'),
      clientEventId: 'retry-key',
    };

    const [firstResult, retryResult] = await Promise.all([
      platform.dispatch(studentScope, first, graph),
      platform.dispatch(studentScope, retry, graph),
    ]);

    expect(firstResult.duplicate).not.toBe(true);
    expect(retryResult.duplicate).toBe(true);
    expect(retryResult.errors).toContainEqual(
      expect.objectContaining({ code: 'DUPLICATE_EVENT', severity: 'info' }),
    );
    expect(platform.state.getSnapshot(studentScope)?.version).toBe(1);
    expect(platform.eventLog.list(studentScope)).toHaveLength(1);
  });
});
