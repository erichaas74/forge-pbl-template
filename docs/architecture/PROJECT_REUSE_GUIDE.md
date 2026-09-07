# Project reuse architecture

## Supported launch path

All new projects launch at `/projects/:projectId`. The project host performs four separate jobs:

1. Resolve student-safe catalog metadata.
2. Load the versioned project definition or package.
3. Create an authenticated `ProjectSessionContext` outside the package.
4. Select a registered template launcher and infrastructure adapters.

Legacy project URLs are redirects. They must not contain their own provider graphs.

## Adding a project that uses an existing template

Add one entry to `public/project-catalog.json` and publish the package directory named by
`packageReference`. No Angular route, component, service, or template registration is required.

Every catalog entry declares:

- a stable project ID and version;
- a template ID and compatible version;
- a package reference;
- required capability IDs;
- student-safe title, subject, grade, theme, and learning-goal metadata.

Catalog status describes release readiness, not discoverability: `Preview` is a local
demonstration, `Pilot` has a substantial learner flow but still needs production connections,
`Classroom ready` has authenticated authoritative services, and `Updating` marks a temporarily
changing project. A catalog card must not use a generic "Available" label as a readiness claim.

Investigation packages use the modular files in
`InvestigationProjectPackageAssembler`. Other currently installed templates use a single
`project.json` compatibility format until their modular package assemblers replace it.

## Adding a new project type

Create one reusable template plugin and register one template launcher. The plugin owns its domain
model, initializer, validation, capability registrations, and UI shell. It may depend on `core` and
`shared`; it must not import a project or feature.

After registration, all projects of that type are packages only.

## Session and authority rules

Project packages never contain the current viewer, tenant, enrollment, class, attempt, or role.
Those values come from `ProjectSessionContext` at launch. Browser persistence keys include this
scope. A command registered as `serverRequired` is rejected unless it is server-confirmed or an
explicit local-demo composition root enables the bypass.

Debate currently uses its in-memory adapters in local-demo mode. Classroom mode intentionally
fails closed until a server-authoritative Debate adapter is installed.

## Final products

Every reusable template can expose a `FinalProductAdapter`. The adapter translates project-specific
language such as case file, strategy showcase, museum wing, news package, senate address, or journey
record into the shared immutable submission, review, rubric, revision, and approval timeline. The
template keeps its own student-facing metaphor; teacher and reporting tools consume one contract.

## Transitional code

Mystery Substance retains a specialized presentation while the generic Investigation shell is now
available for new packages. Its lab components are the remaining legacy project-code allowlist in
`scripts/check-architecture.mjs`; move them into reusable activity plugins as each activity contract
is generalized. The architecture check prevents that allowlist from growing.

Race Around the World / Journey Replay is intentionally excluded from this migration while its
active update is in progress. Its server membership and idempotency hardening must be applied after
that work is merged, followed by the deferred full build and test run.
