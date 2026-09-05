import {
  assertJourneyMatchesPolicy,
  assertSubmittableJourney,
  isJourneyRecord,
  masteryTagsFromRecord,
  responsePreview,
  teamIdentity,
  type JourneyProjectPolicy,
  type JourneyRecordShape,
} from './journey-policy';
import projectPolicies from './config/journey-project-policies.json';

interface D1Result<T = unknown> {
  readonly success: boolean;
  readonly results?: readonly T[];
  readonly meta?: { readonly changes?: number };
}

interface D1PreparedStatement {
  bind(...values: readonly unknown[]): D1PreparedStatement;
  first<T>(): Promise<T | null>;
  all<T>(): Promise<D1Result<T>>;
  run<T = unknown>(): Promise<D1Result<T>>;
}

interface D1Database {
  prepare(sql: string): D1PreparedStatement;
  batch<T = unknown>(statements: readonly D1PreparedStatement[]): Promise<readonly D1Result<T>[]>;
}

interface R2ObjectBody {
  readonly body: ReadableStream;
  readonly httpMetadata?: { readonly contentType?: string };
  readonly size?: number;
}

interface R2Bucket {
  put(key: string, value: Blob | ArrayBuffer | ReadableStream, options?: { httpMetadata?: { contentType?: string } }): Promise<unknown>;
  get(key: string): Promise<R2ObjectBody | null>;
}

interface WorkerEnv {
  readonly DB: D1Database;
  readonly MEDIA: R2Bucket;
  readonly ASSETS: { fetch(request: Request): Promise<Response> };
}

interface Actor {
  readonly id: string;
  readonly email: string;
  readonly displayName: string;
}

interface Locator {
  readonly tenantId: string;
  readonly classId: string;
  readonly classLabel: string;
  readonly projectId: string;
  readonly projectVersion: string;
}

interface MembershipRow {
  readonly actor_user_id: string;
  readonly actor_email: string;
  readonly display_name: string;
  readonly role: 'student' | 'teacher';
}

interface RecordRow {
  readonly record_json: string;
  readonly revision: number;
  readonly updated_at: string;
}

interface SubmissionRow {
  readonly id: string;
  readonly class_key: string;
  readonly actor_user_id: string;
  readonly voyage_id: string;
  readonly status: 'submitted' | 'approved' | 'revision-requested';
  readonly submitted_at: string;
  readonly reviewed_at: string | null;
  readonly reviewer_display_name: string | null;
  readonly teacher_feedback: string | null;
  readonly revision: number;
  readonly snapshot_json: string;
}

interface MasteryRow {
  readonly submission_id: string;
  readonly mastery_tag: string;
  readonly level: 'developing' | 'proficient' | 'advanced';
  readonly feedback: string | null;
}

interface ClassProjectionRow extends MembershipRow {
  readonly record_json: string | null;
  readonly total_steps: number | null;
  readonly completed_steps: number | null;
  readonly completion_status: 'in-progress' | 'complete' | null;
  readonly response_preview: string | null;
  readonly record_updated_at: string | null;
  readonly submission_id: string | null;
  readonly voyage_id: string | null;
  readonly submission_status: 'submitted' | 'approved' | 'revision-requested' | null;
  readonly submitted_at: string | null;
  readonly reviewed_at: string | null;
  readonly reviewer_display_name: string | null;
  readonly teacher_feedback: string | null;
  readonly submission_revision: number | null;
  readonly snapshot_json: string | null;
}

interface MediaRow {
  readonly id: string;
  readonly class_key: string;
  readonly actor_user_id: string;
  readonly object_key: string;
  readonly file_name: string;
  readonly content_type: string;
  readonly byte_size: number;
  readonly metadata_json: string;
}

class HttpError extends Error {
  constructor(readonly status: number, message: string, readonly details?: unknown) {
    super(message);
  }
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/journey')) return serveApplication(request, env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204 });

    try {
      return await routeJourneyRequest(request, url, env);
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message, details: error.details }, error.status);
      console.error('Journey API failure', error);
      return json({ error: 'JOURNEY_SERVICE_UNAVAILABLE' }, 500);
    }
  },
};

async function routeJourneyRequest(request: Request, url: URL, env: WorkerEnv): Promise<Response> {
  const actor = authenticatedActor(request);
  const path = url.pathname.slice('/api/journey'.length) || '/';

  if (path === '/session' && request.method === 'POST') return openSession(request, env, actor);
  if (path === '/record' && request.method === 'GET') return loadRecord(url, env, actor);
  if (path === '/record' && request.method === 'PUT') return saveRecord(request, env, actor);
  if (path === '/submission' && request.method === 'GET') return loadSubmission(url, env, actor);
  if (path === '/submission' && request.method === 'POST') return submitJourney(request, env, actor);
  if (path === '/class-summary' && request.method === 'GET') return classSummary(url, env, actor);
  if (path === '/media' && request.method === 'POST') return uploadMedia(request, env, actor);
  if (path.startsWith('/media/') && request.method === 'GET') return serveMedia(path.slice('/media/'.length), env, actor);

  const reviewMatch = path.match(/^\/submissions\/([^/]+)\/review$/);
  if (reviewMatch !== null && request.method === 'POST') {
    return reviewSubmission(decodeURIComponent(reviewMatch[1]), request, env, actor);
  }
  throw new HttpError(404, 'JOURNEY_API_NOT_FOUND');
}

async function openSession(request: Request, env: WorkerEnv, actor: Actor): Promise<Response> {
  const body = await jsonBody(request);
  const locator = locatorFrom(body.locator);
  const membership = await ensureMembership(env.DB, locator, actor, actor.displayName);
  return json({
    authenticated: true,
    actor: { id: actor.id, email: actor.email, displayName: membership.display_name },
    role: membership.role,
    classId: locator.classId,
    classLabel: locator.classLabel,
  });
}

async function loadRecord(url: URL, env: WorkerEnv, actor: Actor): Promise<Response> {
  const locator = locatorFromUrl(url);
  await ensureMembership(env.DB, locator, actor, actor.displayName);
  const row = await env.DB.prepare(
    'SELECT record_json, revision, updated_at FROM journey_records WHERE id = ?',
  ).bind(recordKey(locator, actor.id)).first<RecordRow>();
  if (row === null) throw new HttpError(404, 'JOURNEY_RECORD_NOT_FOUND');
  return json(authoritativeRecord(row));
}

async function saveRecord(request: Request, env: WorkerEnv, actor: Actor): Promise<Response> {
  const body = await jsonBody(request);
  const locator = locatorFrom(body.locator);
  await ensureMembership(env.DB, locator, actor, actor.displayName);
  const idempotencyKey = requiredText(body.idempotencyKey, 'IDEMPOTENCY_KEY_REQUIRED', 180);
  if (!isJourneyRecord(body.record)) throw new HttpError(400, 'INVALID_JOURNEY_RECORD');
  assertRecordScope(body.record, locator);
  const policy = projectPolicy(locator);
  try { assertJourneyMatchesPolicy(body.record, policy); }
  catch { throw new HttpError(422, 'JOURNEY_POLICY_MISMATCH'); }
  const expectedRevision = integer(body.expectedServerRevision, 0, 1_000_000);
  const requestedTotalSteps = integer(body.totalStepCount, 1, 500);
  if (requestedTotalSteps !== policy.steps.length) throw new HttpError(422, 'JOURNEY_POLICY_MISMATCH');
  const totalSteps = policy.steps.length;
  const key = recordKey(locator, actor.id);
  const current = await env.DB.prepare(
    'SELECT record_json, revision, updated_at FROM journey_records WHERE id = ?',
  ).bind(key).first<RecordRow>();
  if ((current?.revision ?? 0) !== expectedRevision) {
    throw new HttpError(409, 'JOURNEY_RECORD_CONFLICT', current === null ? undefined : authoritativeRecord(current));
  }

  const now = new Date().toISOString();
  const newRevision = expectedRevision + 1;
  const normalized = normalizeRecord(body.record, actor.id, newRevision);
  const claim = await claimOperation(env.DB, actor.id, idempotencyKey, 'record.save');
  if (!claim.claimed) return json(claim.response);
  let result: D1Result;
  if (current === null) {
    result = await env.DB.prepare(
      `INSERT INTO journey_records
       (id, class_key, actor_user_id, voyage_id, record_json, total_steps, completed_steps, completion_status, response_preview, revision, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      key,
      classKey(locator),
      actor.id,
      normalized.voyageId,
      JSON.stringify(normalized),
      totalSteps,
      normalized.completedSteps.length,
      normalized.completionStatus,
      responsePreview(normalized) ?? null,
      newRevision,
      now,
    ).run();
  } else {
    result = await env.DB.prepare(
      `UPDATE journey_records
       SET voyage_id = ?, record_json = ?, total_steps = ?, completed_steps = ?, completion_status = ?, response_preview = ?, revision = ?, updated_at = ?
       WHERE id = ? AND revision = ?`,
    ).bind(
      normalized.voyageId,
      JSON.stringify(normalized),
      totalSteps,
      normalized.completedSteps.length,
      normalized.completionStatus,
      responsePreview(normalized) ?? null,
      newRevision,
      now,
      key,
      expectedRevision,
    ).run();
  }
  if (!result.success || result.meta?.changes !== 1) throw new HttpError(409, 'JOURNEY_RECORD_CONFLICT');
  await bumpClassRevision(env.DB, locator, now);
  const response = { record: normalized, serverRevision: newRevision, updatedAt: now };
  await completeOperation(env.DB, actor.id, idempotencyKey, response);
  return json(response);
}

async function loadSubmission(url: URL, env: WorkerEnv, actor: Actor): Promise<Response> {
  const locator = locatorFromUrl(url);
  const membership = await ensureMembership(env.DB, locator, actor, actor.displayName);
  const row = await env.DB.prepare(
    `SELECT id, class_key, actor_user_id, voyage_id, status, submitted_at, reviewed_at,
            reviewer_display_name, teacher_feedback, revision, snapshot_json
     FROM journey_submissions WHERE class_key = ? AND actor_user_id = ?`,
  ).bind(classKey(locator), actor.id).first<SubmissionRow>();
  if (row === null) throw new HttpError(404, 'JOURNEY_SUBMISSION_NOT_FOUND');
  return json(await submissionDto(env.DB, row, membership.display_name, locator));
}

async function submitJourney(request: Request, env: WorkerEnv, actor: Actor): Promise<Response> {
  const body = await jsonBody(request);
  const locator = locatorFrom(body.locator);
  const membership = await ensureMembership(env.DB, locator, actor, actor.displayName);
  const idempotencyKey = requiredText(body.idempotencyKey, 'IDEMPOTENCY_KEY_REQUIRED', 180);
  if (!isJourneyRecord(body.record)) throw new HttpError(400, 'INVALID_JOURNEY_RECORD');
  assertRecordScope(body.record, locator);
  const policy = projectPolicy(locator);
  const totalSteps = integer(body.totalStepCount, 1, 500);
  if (totalSteps !== policy.steps.length) throw new HttpError(422, 'JOURNEY_POLICY_MISMATCH');
  try {
    assertSubmittableJourney(body.record, policy);
  } catch {
    throw new HttpError(422, 'JOURNEY_NOT_COMPLETE');
  }
  const now = new Date().toISOString();
  const key = recordKey(locator, actor.id);
  const authoritative = await env.DB.prepare(
    'SELECT record_json, revision, updated_at FROM journey_records WHERE id = ?',
  ).bind(key).first<RecordRow>();
  if (authoritative === null) throw new HttpError(409, 'AUTHORITATIVE_RECORD_REQUIRED');
  const stored = JSON.parse(authoritative.record_json) as unknown;
  if (!isJourneyRecord(stored) || stored.completionStatus !== 'complete') {
    throw new HttpError(409, 'AUTHORITATIVE_RECORD_INCOMPLETE');
  }
  const existing = await env.DB.prepare(
    `SELECT id, class_key, actor_user_id, voyage_id, status, submitted_at, reviewed_at,
            reviewer_display_name, teacher_feedback, revision, snapshot_json
     FROM journey_submissions WHERE class_key = ? AND actor_user_id = ?`,
  ).bind(classKey(locator), actor.id).first<SubmissionRow>();
  if (existing?.status === 'approved') throw new HttpError(409, 'APPROVED_SUBMISSION_LOCKED');
  const claim = await claimOperation(env.DB, actor.id, idempotencyKey, 'journey.submit');
  if (!claim.claimed) return json(claim.response);
  const submissionId = existing?.id ?? crypto.randomUUID();
  const revision = (existing?.revision ?? 0) + 1;
  if (existing === null) {
    await env.DB.prepare(
      `INSERT INTO journey_submissions
       (id, class_key, actor_user_id, voyage_id, snapshot_json, status, submitted_at, revision, updated_at)
       VALUES (?, ?, ?, ?, ?, 'submitted', ?, ?, ?)`,
    ).bind(submissionId, classKey(locator), actor.id, stored.voyageId, JSON.stringify(stored), now, revision, now).run();
  } else {
    await env.DB.prepare(
      `UPDATE journey_submissions SET voyage_id = ?, snapshot_json = ?, status = 'submitted', submitted_at = ?,
       reviewed_at = NULL, reviewer_user_id = NULL, reviewer_display_name = NULL, teacher_feedback = NULL,
       revision = ?, updated_at = ? WHERE id = ?`,
    ).bind(stored.voyageId, JSON.stringify(stored), now, revision, now, submissionId).run();
    await env.DB.prepare('DELETE FROM journey_mastery_assessments WHERE submission_id = ?').bind(submissionId).run();
  }
  await bumpClassRevision(env.DB, locator, now);
  const row = await submissionById(env.DB, submissionId);
  const response = await submissionDto(env.DB, row, membership.display_name, locator);
  await completeOperation(env.DB, actor.id, idempotencyKey, response);
  return json(response, 201);
}

async function reviewSubmission(
  submissionId: string,
  request: Request,
  env: WorkerEnv,
  actor: Actor,
): Promise<Response> {
  const body = await jsonBody(request);
  const locator = locatorFrom(body.locator);
  const teacher = await ensureMembership(env.DB, locator, actor, actor.displayName);
  if (teacher.role !== 'teacher') throw new HttpError(403, 'TEACHER_AUTHORIZATION_REQUIRED');
  const idempotencyKey = requiredText(body.idempotencyKey, 'IDEMPOTENCY_KEY_REQUIRED', 180);
  const decision = body.decision;
  if (decision !== 'approved' && decision !== 'revision-requested') {
    throw new HttpError(400, 'INVALID_REVIEW_DECISION');
  }
  const row = await submissionById(env.DB, submissionId);
  if (row.class_key !== classKey(locator)) throw new HttpError(404, 'JOURNEY_SUBMISSION_NOT_FOUND');
  const snapshot = JSON.parse(row.snapshot_json) as unknown;
  if (!isJourneyRecord(snapshot)) throw new HttpError(500, 'INVALID_SUBMISSION_SNAPSHOT');
  const projectTags = new Set(projectPolicy(locator).steps.flatMap((step) => step.masteryTags));
  const allowedTags = new Set([...masteryTagsFromRecord(snapshot)].filter((tag) => projectTags.has(tag)));
  const mastery = masteryInput(body.mastery, allowedTags);
  const feedback = text(body.teacherFeedback, 2_000);
  if (decision === 'revision-requested' && feedback.length < 3) {
    throw new HttpError(422, 'REVISION_FEEDBACK_REQUIRED');
  }
  const claim = await claimOperation(env.DB, actor.id, idempotencyKey, 'submission.review');
  if (!claim.claimed) return json(claim.response);
  const now = new Date().toISOString();
  const statements: D1PreparedStatement[] = [
    env.DB.prepare(
      `UPDATE journey_submissions SET status = ?, reviewed_at = ?, reviewer_user_id = ?,
       reviewer_display_name = ?, teacher_feedback = ?, revision = revision + 1, updated_at = ? WHERE id = ?`,
    ).bind(decision, now, actor.id, teacher.display_name, feedback || null, now, submissionId),
    env.DB.prepare('DELETE FROM journey_mastery_assessments WHERE submission_id = ?').bind(submissionId),
  ];
  for (const assessment of mastery) {
    statements.push(env.DB.prepare(
      `INSERT INTO journey_mastery_assessments
       (id, submission_id, mastery_tag, level, feedback, assessor_user_id, assessed_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      `${submissionId}::${assessment.masteryTag}`,
      submissionId,
      assessment.masteryTag,
      assessment.level,
      assessment.feedback ?? null,
      actor.id,
      now,
    ));
  }
  await env.DB.batch(statements);
  await bumpClassRevision(env.DB, locator, now);
  const updated = await submissionById(env.DB, submissionId);
  const student = await membershipByActor(env.DB, classKey(locator), updated.actor_user_id);
  const response = await submissionDto(env.DB, updated, student.display_name, locator);
  await completeOperation(env.DB, actor.id, idempotencyKey, response);
  return json(response);
}

async function classSummary(url: URL, env: WorkerEnv, actor: Actor): Promise<Response> {
  const locator = locatorFromUrl(url);
  const teacher = await ensureMembership(env.DB, locator, actor, actor.displayName);
  if (teacher.role !== 'teacher') throw new HttpError(403, 'TEACHER_AUTHORIZATION_REQUIRED');
  const classRow = await env.DB.prepare(
    'SELECT revision, class_label FROM journey_classes WHERE id = ?',
  ).bind(classKey(locator)).first<{ revision: number; class_label: string }>();
  if (classRow === null) throw new HttpError(404, 'JOURNEY_CLASS_NOT_FOUND');
  const rows = await env.DB.prepare(
    `SELECT m.actor_user_id, m.actor_email, m.display_name, m.role,
            r.record_json, r.total_steps, r.completed_steps, r.completion_status,
            r.response_preview, r.updated_at AS record_updated_at,
            s.id AS submission_id, s.voyage_id, s.status AS submission_status,
            s.submitted_at, s.reviewed_at, s.reviewer_display_name, s.teacher_feedback,
            s.revision AS submission_revision, s.snapshot_json
     FROM journey_memberships m
     LEFT JOIN journey_records r ON r.class_key = m.class_key AND r.actor_user_id = m.actor_user_id
     LEFT JOIN journey_submissions s ON s.class_key = m.class_key AND s.actor_user_id = m.actor_user_id
     WHERE m.class_key = ? AND r.id IS NOT NULL
     ORDER BY m.display_name, m.actor_user_id`,
  ).bind(classKey(locator)).all<ClassProjectionRow>();
  const masteryResult = await env.DB.prepare(
    `SELECT a.submission_id, a.mastery_tag, a.level, a.feedback
     FROM journey_mastery_assessments a
     INNER JOIN journey_submissions s ON s.id = a.submission_id
     WHERE s.class_key = ? ORDER BY a.mastery_tag`,
  ).bind(classKey(locator)).all<MasteryRow>();
  const masteryBySubmission = groupMastery(masteryResult.results ?? []);
  const members = (rows.results ?? []).flatMap((row) => {
    const recordValue = row.record_json === null ? undefined : JSON.parse(row.record_json) as unknown;
    if (!isJourneyRecord(recordValue)) return [];
    const submission = row.submission_id === null ? undefined : submissionFromProjection(row, locator, masteryBySubmission.get(row.submission_id) ?? []);
    return [{
      studentId: row.actor_user_id,
      studentDisplayName: row.display_name,
      voyageId: recordValue.voyageId,
      team: teamIdentity(row.actor_user_id, row.display_name),
      route: recordValue.route.map((point) => ({
        latitude: point.latitude,
        longitude: point.longitude,
        locationId: point.locationId,
        eventType: point.eventId === undefined ? undefined : 'decision' as const,
        eventLabel: point.eventId,
      })),
      outcome: recordValue.completedSteps.at(-1)?.consequence ?? 'Voyage in progress',
      completedStepCount: row.completed_steps ?? recordValue.completedSteps.length,
      totalStepCount: row.total_steps ?? recordValue.completedSteps.length,
      completionStatus: row.completion_status ?? recordValue.completionStatus,
      submission,
      responsePreview: row.response_preview ?? undefined,
      updatedAt: row.record_updated_at ?? new Date(0).toISOString(),
    }];
  });
  return json({
    classId: locator.classId,
    classLabel: classRow.class_label,
    projectId: locator.projectId,
    projectVersion: locator.projectVersion,
    generatedAt: new Date().toISOString(),
    revision: classRow.revision,
    members,
  });
}

async function uploadMedia(request: Request, env: WorkerEnv, actor: Actor): Promise<Response> {
  const form = await request.formData();
  const locator = locatorFrom(parseJsonField(form.get('locator'), 'INVALID_MEDIA_LOCATOR'));
  await ensureMembership(env.DB, locator, actor, actor.displayName);
  const file = form.get('file');
  if (!(file instanceof Blob)) throw new HttpError(400, 'MEDIA_FILE_REQUIRED');
  if (file.size < 1 || file.size > 15 * 1024 * 1024) throw new HttpError(413, 'MEDIA_SIZE_INVALID');
  if (!file.type.startsWith('audio/')) throw new HttpError(415, 'AUDIO_MEDIA_REQUIRED');
  const id = crypto.randomUUID();
  const fileName = file instanceof File ? text(file.name, 180) || 'journey-response.webm' : 'journey-response.webm';
  const objectKey = `journey-replay/${encodeURIComponent(classKey(locator))}/${encodeURIComponent(actor.id)}/${id}`;
  await env.MEDIA.put(objectKey, file, { httpMetadata: { contentType: file.type } });
  const metadata = parseJsonField(form.get('metadata'), 'INVALID_MEDIA_METADATA');
  const now = new Date().toISOString();
  await env.DB.prepare(
    `INSERT INTO journey_media_assets
     (id, class_key, actor_user_id, object_key, file_name, content_type, byte_size, metadata_json, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(id, classKey(locator), actor.id, objectKey, fileName, file.type, file.size, JSON.stringify(metadata), now).run();
  return json({
    id,
    reference: `/api/journey/media/${encodeURIComponent(id)}`,
    fileName,
    contentType: file.type,
    size: file.size,
    metadata,
  }, 201);
}

async function serveMedia(assetId: string, env: WorkerEnv, actor: Actor): Promise<Response> {
  const row = await env.DB.prepare(
    `SELECT id, class_key, actor_user_id, object_key, file_name, content_type, byte_size, metadata_json
     FROM journey_media_assets WHERE id = ?`,
  ).bind(assetId).first<MediaRow>();
  if (row === null) throw new HttpError(404, 'ASSET_NOT_FOUND');
  const membership = await membershipByActor(env.DB, row.class_key, actor.id, false);
  if (row.actor_user_id !== actor.id && membership?.role !== 'teacher') throw new HttpError(403, 'MEDIA_ACCESS_DENIED');
  const object = await env.MEDIA.get(row.object_key);
  if (object === null) throw new HttpError(404, 'ASSET_NOT_FOUND');
  return new Response(object.body, {
    headers: {
      'content-type': object.httpMetadata?.contentType ?? row.content_type,
      'content-disposition': `inline; filename="${row.file_name.replace(/["\\]/g, '')}"`,
      'cache-control': 'private, max-age=300',
      'x-content-type-options': 'nosniff',
    },
  });
}

async function ensureMembership(
  db: D1Database,
  locator: Locator,
  actor: Actor,
  displayName: string,
): Promise<MembershipRow> {
  const key = classKey(locator);
  const now = new Date().toISOString();
  const existingClass = await db.prepare('SELECT created_by FROM journey_classes WHERE id = ?')
    .bind(key).first<{ created_by: string }>();
  if (existingClass === null) {
    await db.prepare(
      `INSERT INTO journey_classes
       (id, tenant_id, class_id, class_label, project_id, project_version, created_by, created_at, updated_at, revision)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0) ON CONFLICT(id) DO NOTHING`,
    ).bind(
      key,
      locator.tenantId,
      locator.classId,
      locator.classLabel,
      locator.projectId,
      locator.projectVersion,
      actor.id,
      now,
      now,
    ).run();
  }
  const owner = await db.prepare('SELECT created_by FROM journey_classes WHERE id = ?')
    .bind(key).first<{ created_by: string }>();
  if (owner === null) throw new HttpError(500, 'JOURNEY_CLASS_INITIALIZATION_FAILED');
  const role = owner.created_by === actor.id ? 'teacher' : 'student';
  const membershipId = `${key}::${actor.id}`;
  await db.prepare(
    `INSERT INTO journey_memberships
     (id, class_key, actor_user_id, actor_email, display_name, role, joined_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET actor_email = excluded.actor_email, display_name = excluded.display_name, updated_at = excluded.updated_at`,
  ).bind(membershipId, key, actor.id, actor.email, displayName, role, now, now).run();
  return membershipByActor(db, key, actor.id);
}

async function membershipByActor(
  db: D1Database,
  classKeyValue: string,
  actorUserId: string,
  required?: true,
): Promise<MembershipRow>;
async function membershipByActor(
  db: D1Database,
  classKeyValue: string,
  actorUserId: string,
  required: false,
): Promise<MembershipRow | null>;
async function membershipByActor(
  db: D1Database,
  classKeyValue: string,
  actorUserId: string,
  required = true,
): Promise<MembershipRow | null> {
  const row = await db.prepare(
    'SELECT actor_user_id, actor_email, display_name, role FROM journey_memberships WHERE class_key = ? AND actor_user_id = ?',
  ).bind(classKeyValue, actorUserId).first<MembershipRow>();
  if (row === null && required) throw new HttpError(403, 'CLASS_MEMBERSHIP_REQUIRED');
  return row;
}

async function submissionById(db: D1Database, submissionId: string): Promise<SubmissionRow> {
  const row = await db.prepare(
    `SELECT id, class_key, actor_user_id, voyage_id, status, submitted_at, reviewed_at,
            reviewer_display_name, teacher_feedback, revision, snapshot_json
     FROM journey_submissions WHERE id = ?`,
  ).bind(submissionId).first<SubmissionRow>();
  if (row === null) throw new HttpError(404, 'JOURNEY_SUBMISSION_NOT_FOUND');
  return row;
}

async function submissionDto(
  db: D1Database,
  row: SubmissionRow,
  displayName: string,
  locator: Locator,
) {
  const mastery = await db.prepare(
    `SELECT submission_id, mastery_tag, level, feedback
     FROM journey_mastery_assessments WHERE submission_id = ? ORDER BY mastery_tag`,
  ).bind(row.id).all<MasteryRow>();
  return submissionFromRow(row, displayName, locator, mastery.results ?? []);
}

function submissionFromProjection(row: ClassProjectionRow, locator: Locator, mastery: readonly MasteryRow[]) {
  return {
    id: row.submission_id!,
    projectId: locator.projectId,
    projectVersion: locator.projectVersion,
    classId: locator.classId,
    studentId: row.actor_user_id,
    studentDisplayName: row.display_name,
    voyageId: row.voyage_id!,
    status: row.submission_status!,
    submittedAt: row.submitted_at!,
    reviewedAt: row.reviewed_at ?? undefined,
    reviewerDisplayName: row.reviewer_display_name ?? undefined,
    teacherFeedback: row.teacher_feedback ?? undefined,
    mastery: mastery.map(masteryDto),
    revision: row.submission_revision!,
  };
}

function submissionFromRow(row: SubmissionRow, displayName: string, locator: Locator, mastery: readonly MasteryRow[]) {
  return {
    id: row.id,
    projectId: locator.projectId,
    projectVersion: locator.projectVersion,
    classId: locator.classId,
    studentId: row.actor_user_id,
    studentDisplayName: displayName,
    voyageId: row.voyage_id,
    status: row.status,
    submittedAt: row.submitted_at,
    reviewedAt: row.reviewed_at ?? undefined,
    reviewerDisplayName: row.reviewer_display_name ?? undefined,
    teacherFeedback: row.teacher_feedback ?? undefined,
    mastery: mastery.map(masteryDto),
    revision: row.revision,
  };
}

function masteryDto(row: MasteryRow) {
  return { masteryTag: row.mastery_tag, level: row.level, feedback: row.feedback ?? undefined };
}

function groupMastery(rows: readonly MasteryRow[]): Map<string, MasteryRow[]> {
  const grouped = new Map<string, MasteryRow[]>();
  for (const row of rows) grouped.set(row.submission_id, [...(grouped.get(row.submission_id) ?? []), row]);
  return grouped;
}

function masteryInput(value: unknown, allowedTags: ReadonlySet<string>) {
  if (!Array.isArray(value)) throw new HttpError(400, 'INVALID_MASTERY_ASSESSMENT');
  const seen = new Set<string>();
  return value.map((item) => {
    if (typeof item !== 'object' || item === null) throw new HttpError(400, 'INVALID_MASTERY_ASSESSMENT');
    const input = item as Record<string, unknown>;
    const masteryTag = requiredText(input.masteryTag, 'INVALID_MASTERY_TAG', 120);
    if (!allowedTags.has(masteryTag) || seen.has(masteryTag)) throw new HttpError(422, 'INVALID_MASTERY_TAG');
    seen.add(masteryTag);
    const level = input.level;
    if (level !== 'developing' && level !== 'proficient' && level !== 'advanced') {
      throw new HttpError(422, 'INVALID_MASTERY_LEVEL');
    }
    return { masteryTag, level, feedback: text(input.feedback, 1_000) || undefined };
  });
}

function authenticatedActor(request: Request): Actor {
  const id = request.headers.get('oai-authenticated-user-id');
  const email = request.headers.get('oai-authenticated-user-email');
  if (id === null || email === null) throw new HttpError(401, 'AUTHENTICATION_REQUIRED');
  const encodedName = request.headers.get('oai-authenticated-user-full-name');
  const encoding = request.headers.get('oai-authenticated-user-full-name-encoding');
  let displayName = email;
  if (encodedName !== null && encoding === 'percent-encoded-utf-8') {
    try { displayName = decodeURIComponent(encodedName); } catch { displayName = email; }
  }
  return { id, email, displayName };
}

function locatorFrom(value: unknown): Locator {
  if (typeof value !== 'object' || value === null) throw new HttpError(400, 'INVALID_JOURNEY_LOCATOR');
  const input = value as Record<string, unknown>;
  return {
    tenantId: requiredText(input.tenantId, 'INVALID_TENANT_ID', 100),
    classId: requiredText(input.classId, 'INVALID_CLASS_ID', 100),
    classLabel: requiredText(input.classLabel, 'INVALID_CLASS_LABEL', 160),
    projectId: requiredText(input.projectId, 'INVALID_PROJECT_ID', 120),
    projectVersion: requiredText(input.projectVersion, 'INVALID_PROJECT_VERSION', 60),
  };
}

function locatorFromUrl(url: URL): Locator {
  return locatorFrom({
    tenantId: url.searchParams.get('tenantId'),
    classId: url.searchParams.get('classId'),
    classLabel: url.searchParams.get('classLabel'),
    projectId: url.searchParams.get('projectId'),
    projectVersion: url.searchParams.get('projectVersion'),
  });
}

function assertRecordScope(record: JourneyRecordShape, locator: Locator): void {
  if (record.projectId !== locator.projectId || record.projectVersion !== locator.projectVersion) {
    throw new HttpError(422, 'JOURNEY_RECORD_SCOPE_MISMATCH');
  }
}

function projectPolicy(locator: Locator): JourneyProjectPolicy {
  const key = `${locator.projectId}@${locator.projectVersion}`;
  const policy = (projectPolicies as Readonly<Record<string, JourneyProjectPolicy>>)[key];
  if (policy === undefined) throw new HttpError(422, 'JOURNEY_PROJECT_POLICY_NOT_FOUND');
  return policy;
}

function normalizeRecord(record: JourneyRecordShape, actorUserId: string, revision: number): JourneyRecordShape {
  return { ...record, studentId: actorUserId, revision };
}

function classKey(locator: Locator): string {
  return [locator.tenantId, locator.projectId, locator.projectVersion, locator.classId].join('::');
}

function recordKey(locator: Locator, actorUserId: string): string {
  return `${classKey(locator)}::${actorUserId}`;
}

async function bumpClassRevision(db: D1Database, locator: Locator, now: string): Promise<void> {
  await db.prepare('UPDATE journey_classes SET revision = revision + 1, updated_at = ? WHERE id = ?')
    .bind(now, classKey(locator)).run();
}

async function claimOperation(
  db: D1Database,
  actorUserId: string,
  idempotencyKey: string,
  operationType: string,
): Promise<{ readonly claimed: true } | { readonly claimed: false; readonly response: unknown }> {
  const id = `${actorUserId}::${idempotencyKey}`;
  const result = await db.prepare(
    `INSERT INTO journey_operations (id, actor_user_id, operation_type, response_json, created_at)
     VALUES (?, ?, ?, '', ?) ON CONFLICT(id) DO NOTHING`,
  ).bind(id, actorUserId, operationType, new Date().toISOString()).run();
  if (result.meta?.changes === 1) return { claimed: true };
  const row = await db.prepare('SELECT response_json FROM journey_operations WHERE id = ?')
    .bind(id).first<{ response_json: string }>();
  if (row === null || row.response_json.length === 0) throw new HttpError(409, 'OPERATION_IN_PROGRESS');
  return { claimed: false, response: JSON.parse(row.response_json) };
}

async function completeOperation(
  db: D1Database,
  actorUserId: string,
  idempotencyKey: string,
  response: unknown,
): Promise<void> {
  await db.prepare(
    'UPDATE journey_operations SET response_json = ? WHERE id = ?',
  ).bind(
    JSON.stringify(response),
    `${actorUserId}::${idempotencyKey}`,
  ).run();
}

async function jsonBody(request: Request): Promise<Record<string, unknown>> {
  let value: unknown;
  try { value = await request.json(); } catch { throw new HttpError(400, 'INVALID_JSON'); }
  if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new HttpError(400, 'INVALID_JSON');
  return value as Record<string, unknown>;
}

function parseJsonField(value: FormDataEntryValue | null, error: string): Record<string, unknown> {
  if (typeof value !== 'string') throw new HttpError(400, error);
  try {
    const parsed = JSON.parse(value) as unknown;
    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) return parsed as Record<string, unknown>;
  } catch { /* handled below */ }
  throw new HttpError(400, error);
}

function requiredText(value: unknown, error: string, maxLength: number): string {
  const result = text(value, maxLength);
  if (result.length === 0) throw new HttpError(400, error);
  return result;
}

function text(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function integer(value: unknown, minimum: number, maximum: number): number {
  if (!Number.isInteger(value) || (value as number) < minimum || (value as number) > maximum) {
    throw new HttpError(400, 'INVALID_INTEGER');
  }
  return value as number;
}

function authoritativeRecord(row: RecordRow) {
  return { record: JSON.parse(row.record_json), serverRevision: row.revision, updatedAt: row.updated_at };
}

function json(value: unknown, status = 200): Response {
  return Response.json(value, {
    status,
    headers: {
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'same-origin',
    },
  });
}

async function serveApplication(request: Request, env: WorkerEnv): Promise<Response> {
  const response = await env.ASSETS.fetch(request);
  if (response.status !== 404 || request.method !== 'GET') return response;
  const accept = request.headers.get('accept') ?? '';
  if (!accept.includes('text/html')) return response;
  const url = new URL(request.url);
  url.pathname = '/index.html';
  return env.ASSETS.fetch(new Request(url, request));
}
