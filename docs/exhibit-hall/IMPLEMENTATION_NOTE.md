# Class Exhibit Hall implementation note

## Integration map

The reusable Exhibit Hall template is integrated with the existing Forge PBL architecture rather than creating a second application.

- `ProjectComponentContext` already carries tenant, project, class, student, team, mode, permissions, and accessibility context. Exhibit authorization uses the same identities conceptually.
- `TemplateRegistry` and `ProjectPackageLoaderService` already provide versioned template selection, package validation, immutable graph caching, and structured errors. `exhibit-hall@1.0.0` is registered through those seams.
- `RuntimePersistenceAdapter` and `RealtimeAdapter` already define replaceable storage and scoped pub/sub boundaries. The interactive demo uses an exhibit-specific browser adapter behind an equivalent contract; official deployment should bind the exhibit records to authoritative server adapters.
- The current repository has shared team and submission folders, but they contain no concrete roster, enrollment, submission, or LMS implementations. The hall therefore references its demo section/team configuration without creating a general roster system.
- The repository has in-memory realtime but no authenticated server transport or reconnecting client implementation. Live focus maintains a monotonic revision and current-state recovery contract so a production transport can publish it later.

## Architecture delivered

The implementation separates:

- generic exhibit records and lifecycle contracts;
- approved-slot artifact composition and validation;
- immutable snapshot publication and stable hall locations;
- centralized access policy;
- structured peer responses;
- revisioned live focus and independent navigation flags;
- individual defense records;
- idempotent LMS evidence mapping;
- renderer and exhibit-template registries;
- project configuration from the reusable Angular hall shell.

The museum-board renderer and `science-poster-demo` renderer both use the same renderer registry. No hall component changes are required to register another renderer component.

## Demo project

`Objects That Changed Us: Ancient Egypt` is the prototype class project instance. Individuals or student groups research a connected Egyptian artifact collection, create one wing of the shared MetaSteps hall, add a curator video presentation, and publish it for a student and family walkthrough. Four completed sample wings demonstrate daily life along the Nile, scribes and power, beliefs about the afterlife, and building technology.

The final-exhibit builder accepts either a MetaSteps iframe or its public embed URL. It extracts and stores a canonical `https://metasteps.com/viewer/embed/{uuid}` URL, preserves only supported boolean viewer controls, rejects other origins and paths, and renders the result in a sandboxed responsive iframe with a full-screen fallback link. The supplied `Egyptian Exhibit` represents the shared hall; each sample board labels the wing that its curators create.

Because this is a prototype, each wing includes an interactive mock video station showing where a student or group’s recorded explanation will play. The builder also demonstrates the intended future input by accepting public YouTube/Vimeo embeds or direct HTTPS video files. A real file-upload workflow remains outside the prototype because the repository has no authoritative media-storage service.

The seeded session opens in its completed, family-readable showcase state so the Student and Family preview buttons both demonstrate the walkthrough immediately. Teacher controls can still move the same prototype back into walk or live-presentation phases.

The role switch exists only to make student, teacher, and family states inspectable in the local demo. It is not an authentication mechanism.

## Production integration gaps

```text
TEMPLATE_CAPABILITY_GAP

Requested:
Authenticated server-side enrollment and access enforcement, transactional multi-record publication,
durable cross-client realtime delivery, scheduled locks, and delivery into a real LMS gradebook.

Reason:
The current app has adapter contracts and Firebase bootstrap configuration, but no concrete authentication,
roster/enrollment, exhibit persistence, scheduled-job, or LMS result-reporting services to reuse.

Suggested reusable capability:
Bind ExhibitRepository, ExhibitAccessPolicy, LiveFocus transport, and ExhibitLmsBridge contracts to the
future authenticated platform services. Resolve actors on the server and use transactions plus persisted
idempotency keys for official project instances.
```

The local build demonstrates the complete interaction and state model, but it must not be described as production authorization or a deployed LMS integration until those platform adapters exist.
