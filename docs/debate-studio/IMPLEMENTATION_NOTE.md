# Debate Studio implementation note

Updated 2026-09-15. Current behavior is specified in the [Debate Studio build guide](../build/16_DEBATE_STUDIO_TEMPLATE.md).

## Active implementation

- The Fate of the Republic **3.0.0** and Hammurabi on Trial **2.0.0** opt into `debate.exchange-cycle`.
- The main viewport is a continuing debate with case ordering, source inspection, linked opposing responses, immutable revisions, same-side critique and final individual performer rankings.
- All eight lessons are open during testing. Tasks appear above the disconnected tutor. Manual authoring, critique reasons and independent context answers use tutor-owned dialogs.
- Project teaching examples and content are configured separately from the reusable runtime.
- Shared standards expand from a compact row; mappings reference the new project versions and lesson plan **2.0.0**.

## Persistence

The launcher currently uses a local browser adapter, not the legacy Firebase adapter. Submitted history and private drafts use separate scoped stores; actual audio/video blobs use IndexedDB.

Manual exchange files carry submitted arguments, critiques and ballots between browsers. Imports validate references and reject conflicting IDs. Private drafts and context answers are not exported. Recordings remain local; exchanged transcripts are available to other participants.

Fictional practice work is explicitly labeled and stored separately. Teacher assessment, authenticated pairing/delivery and shared media remain integration work. The launcher rejects server-authoritative mode without a gateway.

## Media and assessment

Audio capture and audio/video attachment have playback, retake/removal and explicit review. A recording is not marked reviewed merely because capture stopped. A transcript is required; it cannot prove oral delivery.

No external AI, automatic mastery scoring or new great-speeches video collection is connected. Rankings use visible criteria and do not award standards.

## Compatibility

The new optional config contract retains debate package schema/template major version 2. Packages without `exchange` still load the old renderer and adapters. Earlier browser data is retained in its existing namespace and is not silently converted.

The [previous implementation note](archive/IMPLEMENTATION_NOTE_BEFORE_EXCHANGE.md) documents the older renderer. Its descriptions of active Firebase delivery do not describe the current launcher.
