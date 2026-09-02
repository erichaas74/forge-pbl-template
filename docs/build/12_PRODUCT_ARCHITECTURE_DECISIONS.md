# Product Architecture Decisions

## Status

Accepted. These decisions are architectural requirements for the PBL LMS and
govern the other build specifications in this directory. If an older example
conflicts with this document, this document takes precedence until the example
is migrated.

---

# 1. Product Boundary

The primary product is a secure, tenant-aware, reusable PBL LMS.

The LMS uses one portable, configuration-driven project runtime. Do not build a
separate portable player or a second runtime. Portability is provided through
adapters around the same runtime for:

- identity and authorization
- persistence
- realtime delivery
- file and asset storage
- analytics and event export
- external LMS launch and reporting

The priority order is:

1. secure PBL LMS
2. portable project runtime inside the LMS
3. future external-LMS integration, including possible LTI, xAPI, and cmi5

The runtime must not depend directly on a database, authentication provider,
hosting provider, school, curriculum project, or LMS integration protocol.

---

# 2. Declarative Packages and Trusted Plugins

Project packages are untrusted declarative content/configuration. They may
contain JSON, Markdown, asset references, rules, definitions, and final-product
configuration.

Project packages must not contain or execute arbitrary JavaScript or
TypeScript. They reference registered IDs for platform-owned, trusted,
versioned capability plugins such as simulations, map activities, graphing
tools, 3D viewers, or sequence viewers.

Plugin installation and deployment are platform administration operations, not
project-package capabilities. Plugins must have explicit contracts,
permissions, versions, validation, and failure isolation.

---

# 3. Deployment and Adapter Strategy

V1 is cloud-first and browser-based. It does not require a fully offline or
school-hosted installation.

The client should tolerate temporary connection loss through local drafts,
debounced saving, retry-safe events, and queued low-risk changes where
practical. Pending and confirmed state must remain distinguishable.

Production vendors will be selected later. Core, shared, and Investigation code
depend on interfaces, while infrastructure supplies interchangeable adapters
for authentication, persistence, realtime, storage, and analytics.

---

# 4. Tenant, Identity, and Data Boundaries

Every identity, enrollment, runtime scope, authoritative request, event,
subscription, persistence key, idempotency key, asset ownership record, and
analytics record must be tenant-bound.

`tenantId` is therefore part of the runtime scope and event identity. A project
ID, class ID, student ID, or team ID is not globally unique without its tenant.

Authorization must verify tenant membership, role, class membership, team
membership, and project enrollment on the server. Cross-tenant reads,
subscriptions, mutations, and cache collisions must be impossible by contract.

Students must never subscribe to raw whole-class runtime state. Use scoped
runtime streams and bounded summary projections.

---

# 5. Authority and Concurrency

Low-risk client operations may be optimistic or queued:

- Case Board movement and ordering
- private or shared notes
- hypothesis and final-response drafts
- opening/viewing evidence

For low-risk team organization, the last valid committed mutation may win.

The following are server-authoritative and require validation, idempotency, and
transactional or equivalent concurrency control:

- limited-resource spending
- generated-once random assignments
- official simulation and final-challenge attempts
- mastery results
- graded assessment and final submissions
- teacher releases, overrides, grading, and rubric scores
- project enrollment and team membership changes
- official grade/progress changes
- constrained shared-team transactions

Client prediction must not be treated as confirmed state. If client and server
state differ, server state wins.

---

# 6. Runtime State Scopes

The platform supports concurrent student/team use with three principal scopes:

- student-private: personal hypotheses, mastery, reflections, contributions,
  private notes, and future individual reasoning
- team-shared: configured shared evidence, Case Board, observations, data,
  resources, hypotheses, and final product
- class-level: teacher announcements, configured class challenges, summary
  leaderboard data, and released events

Runtime snapshots and mutations carry version/concurrency information. Scope is
explicit; data must not be inferred as shared merely because it belongs to the
same project.

---

# 7. Educational State Semantics

Completion, mastery, submission, approval, and grade are separate dimensions.
Click-through completion must never imply mastery.

Activity and project progression may combine configurable requirements such as
field completion, evidence thresholds, activity results, hypothesis creation or
revision, mastery, teacher release, submission, approval, and rubric results.

Runtime contracts must preserve each dimension independently so later grading
or approval does not overwrite evidence of completion or mastery.

---

# 8. Final Product Model

The canonical Investigation final product is a structured evidence-based
argument package. Depending on project configuration it may include:

- claim, identification, diagnosis, cause, or recommendation
- selected evidence and reasoning
- counterevidence and alternative explanations
- confidence, uncertainty, and next test
- safety recommendation and reflection
- individual contribution

Projects may additionally require documents, presentations, posters, video,
models, simulation results, oral defense, or future AI defense. These are
artifacts or assessment modes attached to the structured record; file upload is
never the sole canonical representation.

Draft, submitted, approved/returned, graded, and rubric states remain distinct.

---

# 9. V1 Authoring Workflow

Do not build a large visual project builder in V1. The intended workflow is:

```text
Designer Project Brief
    -> Curriculum LLM
    -> Declarative Project Package
    -> Schema Validation
    -> Reference Validation
    -> Capability Validation
    -> Logic Validation
    -> Preview
    -> Designer Revision
    -> Publish
```

V1 authoring deliverables are the Designer Project Brief, LLM generation
instructions, validation report, project preview, readable generation report,
and migration/audit tooling. Human designers should not normally edit raw JSON.

---

# 10. Architecture Stress Tests

The Investigation engine is not considered generic until these three projects
use the same runtime without project-specific replacement engines:

1. **7th Grade Mystery Substance Outbreak Lab** — existing-code migration,
   simulation, exact solution, resources, branching, and randomization.
2. **4th Grade Fossil Detectives: Rebuild the Lost Landscape** — younger
   learners, controlled progression, visual/map evidence, multiple defensible
   explanations, and clean omission of resources.
3. **4th Grade First Encounters Case File** — historical primary/secondary
   sources, perspective, bias, conflicting evidence, and multiple explanations.

Project-specific content and trusted plugin configuration are allowed.
Project-specific runtime engines are not.

---

# 11. Devices and Accessibility

The browser UI targets Chromebooks, Windows/Mac laptops, and modern tablets
where practical, initially for grades 4–8 (approximately ages 9–14).

Target WCAG 2.2 AA where practical. Required behaviors include keyboard
navigation, visible focus, semantic controls, screen-reader labels,
captions/transcripts, alt text, sufficient contrast, readable typography,
touch-friendly targets, reduced-motion support, chunked instructions, and no
required drag-only interaction. Case Board movement requires a non-drag
alternative.

---

# 12. Privacy and Protected Content

The platform serves minors and must be designed for school privacy/security
requirements, including FERPA/COPPA considerations. Minimize collection,
exposure, logging, and retention of student content.

Client-side hiding is not authorization. Correct answers, evidence meaning,
decoy status, hidden solution relationships, grading keys, and other
teacher-only material must be server-filtered or delivered through protected
teacher/admin paths. Student-safe project definitions must contain only data the
student is authorized to receive.

---

# 13. Change Rule

These decisions constrain future work but do not require speculative rewrites.
Refactor existing code when an implementation audit identifies a concrete
conflict or when the affected phase begins. Record intentional transitional
gaps in the implementation report and keep adapter/contract seams ready for the
required behavior.
