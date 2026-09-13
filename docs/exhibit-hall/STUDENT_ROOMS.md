# Assigned student museum rooms

The live Ancient Egypt project now uses `studentMuseumConfig` version **2.3.0**. A student curates one teacher-assigned room with three fixed displays. The student adds approved artifacts, edits a room title/introduction and object labels, previews the result, and submits it to the final class exhibition.

## Product decisions

- The room geometry, display positions, camera stops, and generic museum entrance are predefined. There is no student layout picker and no teacher walkthrough designer.
- The initial student room is empty. Students select a display, choose an approved model, and write its label and “Why it matters.” They can change or remove an artifact before submission. At least one complete artifact is required; at most three fit the first room design.
- The teacher config assigns each team a stable room ID through its existing `locationId`. Individual work uses the same ownership seam with a one-person group. Room/catalog assignments remain content configuration.
- The editor renders only the assigned room. Previewing uses that same scene. Classmates’ rooms are not instantiated or rendered in the editor.
- Submitting creates an immutable exhibit snapshot at the assigned hall location. The draft becomes read-only in this first release. An incomplete room or failed save stays unpublished and editable.
- The final view has a fixed generic entrance and a directory of submitted rooms. Each room opens separately, and moving to another room releases the previous room’s models. This is a room-by-room visit, not continuous first-person walking through a single building.
- The completed-example route has four furnished sample rooms. The editable demo has three published classmate examples and the student’s initially empty fourth room; only the student’s room is rendered during curation.

## Temple appearance

The native entrance and assigned rooms share an Egyptian-inspired presentation shell in `temple-museum-architecture.ts`: sandstone masonry, flared painted columns, lotus friezes, stylized sun/ankh reliefs, a star-painted ceiling, and blue-and-gold stone display bases. The ornaments are decorative interpretations, not historical inscriptions or a reconstruction of a particular temple. All textures are generated locally with canvas; no additional downloads, model packages, or idle animations are required.

This is a presentation change to the existing fixed room. Room/layout IDs, dimensions, camera stops, assignment rules, saved artifacts, and publication contracts stay compatible. It adds no student layout/theme controls or teacher designer. The shared renderer gives the entrance, student editor, visitor preview, and published rooms the same appearance.

Temple appearance verification: the application TypeScript check, production build, and 10 existing room/UI tests passed. Browser inspection covered the entrance, furnished room overview, artifact close-up, and restored student draft; one active canvas, no horizontal overflow in the narrow view, and no captured console errors. Existing unrelated stylesheet budget warnings remain.

## Reusable contracts and integration

`templates/exhibit-hall/rooms/museum-room.ts` defines `MuseumRoomAssignment`, `MuseumRoomData`, `MuseumRoomCatalog`, and the versioned room-layout registry. Drafts store stable room, layout, slot, and object references, without student-authored geometry or camera transforms. Mutations validate assignment, known slots, allowed catalog IDs, and duplicate placements. Restoring a draft cannot render another assigned room.

The optional `museumRoom` snapshot field and `museum-room` approved content slot extend the existing museum-board adapter and renderer. The `assigned-museum-room` template declares its smaller submission requirements. The `assignedMuseumRooms` capability is registered through the existing Exhibit Hall capability pack; the project launch source selects the versioned project config. Older museum-board/MetaSteps projects continue to use their existing template and renderer branch.

The `MuseumScenePort` contract isolates rendering from Angular/runtime state. Its factory is loaded through an injection token and a dynamic import. The Three.js renderer uses the existing dependency and supplied GLBs; no package or binary asset was added. It redraws on changes, limits pixel density, cancels pending model requests, reuses unchanged models during text edits, and disposes GPU resources when the scene ends. HTML display buttons and reading views provide keyboard navigation and readable content if WebGL or a model fails. Model errors offer a retry.

`ExhibitHallRuntimeService` owns composition and publication. The existing persistence adapter, snapshot service, hall location records, access rules, and LMS evidence mapper remain the integration points. Publication persists the complete new state before reporting success. Local retries do not create duplicate submitted snapshots or evidence events.

## Changed areas

- New reusable room contracts, renderer, Angular student/visitor components, styles, and tests: `src/app/templates/exhibit-hall/rooms/`.
- Native project configuration: `src/app/projects/class-exhibit-hall/student-museum.config.ts`.
- Existing domain, adapter, draft validation, renderer registry capability, and runtime service accept assigned-room snapshots.
- Existing student page and completed collection select the native room presentation when configured. Project catalog, opening copy, and completed sample data point to the new experience.

## Delivery boundary

The default localhost experience remains a local preview: drafts and submitted snapshots persist on the current device. A separate [shared publication path](SHARED_PUBLICATION.md) now connects server-authoritative launches to the museum HTTP API. Such launches require verified enrollment and server confirmation; they cannot claim successful publication through the local adapter.

Shared publication now includes server-side assignment checks, atomic immutable submissions, retry recovery, and a class collection endpoint. Deployment still needs a verified authentication ingress, provisioned classroom membership, and API hosting. Draft synchronization and LMS delivery remain separate work. No teacher designer, arbitrary student model upload, or live co-editing was added.

The old `classExhibitHallConfig` version 2.2.0 and its integration notes document the retained legacy MetaSteps/video path. The new route uses a separate version so legacy browser drafts are not silently migrated.

## Verification

Automated checks cover assigned-room isolation, fixed-slot mutation, source-credit preservation, corruption rejection, alternate-subject configuration, draft reload, assignment mismatch, immutable submission, storage failure/retry, submission locks, official-session rejection, one active scene, visitor filtering, navigation reset, and async renderer disposal.

- Focused Angular/Vitest suite: **14 files, 44 tests passed** using `ng test --watch=false --include='src/app/templates/exhibit-hall/**/*.spec.ts' --include='src/app/runtime/exhibit-hall-registration.spec.ts'`.
- Development build, application TypeScript check, and final production build passed. The production build retains existing stylesheet budget warnings in other/legacy components; the new room styles do not exceed their budget.
- Browser checks exercised the production build in an isolated localhost origin: incomplete submission, adding a supplied GLB, writing labels, successful publication into the four-room directory, read-only submitted contents, next-room selection reset, and one active canvas. All three supplied GLBs rendered. No console errors were captured during the checked production flow.
- The working student page retained its draft across reload and kept one canvas/no editable fields in visitor preview. Desktop/laptop and 390-pixel narrow-screen layouts were inspected; the narrow page had no horizontal overflow. Temporary viewport overrides were reset.
- Scoped `git diff --check` passed.
- The repository-wide architecture check still fails on two existing boundaries outside this change: `core/index.ts` imports `./templates`, and `projects/mystery-substance/lab-kit/render-quality.service.ts` defines a project service. Neither violation is introduced by the assigned-room implementation.
