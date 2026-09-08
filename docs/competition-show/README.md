# Championship setup, television studio, and fictional final

## Scope

The supplied `TOURNAMENT_GAME_SHOW_PROJECT_TEMPLATE.md` is a longer-term reference, not an instruction to implement all 61 sections now. The user subsequently authorized a broadcast graphics system and a completely invented final to demonstrate the idea. This implementation supplies one reusable `competition-show@1.0` template with a local championship rehearsal, a configurable 3D studio, and a separate fictional showcase. It does not claim to be the full educational or multiplayer MVP in that reference.

Open **The Championship Show** in the project catalog, or `/projects/championship-show`. The entry goes directly to championship setup.

## Rehearsal

1. Choose hybrid, tournament, or all-team game show.
2. Edit 2–16 team names and qualification points. Add/remove teams before locking the lineup.
3. Lock the lineup. Seeds are descending qualification points, then stable team ID for ties. Standard separated seeding keeps the top seeds in different sides. Empty slots advance as byes.
4. Run any ready bracket match. Hybrid narrows the field to at most four teams and then opens a shared final game show. With four or fewer teams it enters that show directly. Tournament continues to a head-to-head final. All-team mode includes everyone.
5. Cue each round, reveal its prompt, and start the clock. Pause/resume or lock early. The timer locks answers when time expires and recovers correctly after reload.
6. Enter team responses at the host desk. The local first buzzer team can answer; simultaneous rounds accept every participant. Answers lock once and immediately create separate evidence records.
7. Review competition points, then reveal answers and score changes together. Scores may be corrected before reveal. Every submitted response must be scored before reveal; an unanswered ordinary round earns zero.
8. Lock each team's wager before revealing the final prompt. Wagers cannot exceed the current score. Correct earns the wager, incorrect or unanswered loses it. Zero is allowed.
9. Confirm the leading team to advance. A tie requires a host-led tiebreak and a recorded reason. The winner and match scores are retained; the next contest starts at zero.
10. Reveal the champion and export the rehearsal/evidence JSON. The presentation toggle hides host controls and unrevealed answers on this device. Return to the host view to operate the show.

This is a single-device rehearsal. It intentionally uses host-entered sample team responses and does not simulate remote students. Presentation view is a display mode, not an authorization or data-security boundary. Unsubmitted answer drafts and unlocked setup edits are not saved; locked actions are saved. One local attempt resumes its saved state. A new attempt ID creates separate storage; an in-app reset/archive workflow is not supplied yet.

## Configuration and implementation

`public/projects/championship-show/project.json` supplies version, title, teams, defaults, prompts, standards, timers, and point ceilings. The sample mathematics content is illustrative and repeats the same queue for each contest. Replace this content package or version it before a real classroom final; subject content is never embedded in the domain engine. The setup UI configures participants/format; question authoring currently happens in the package.

Stable advertised capabilities: `competition.bracket`, `competition.rounds`, `competition.evidence`. The `competition-show` template and lazy launcher register at the existing composition boundaries. The existing catalog, routes, package source, session context, and single-config runtime are reused. No core schema or existing project contract changed.

Domain files separate models, validation, seeding/advancement, and command behavior. The command-handler registry controls all state transitions. Request IDs make retries idempotent; revisions support stale-state rejection. Configuration remains immutable. UI controls use the runtime service instead of changing domain state or calling a backend.

Persistence uses an injected adapter. The browser implementation scopes records to tenant, class, project/version, actor, and attempt. Its local rehearsal log is bounded to 2,000 actions and replayed through the same validated command boundary. A configuration fingerprint rejects incompatible restores. A failed save leaves confirmed state unchanged and blocks further writes. Sequential stale-tab writes are rejected; browser localStorage is not transactional and simultaneous cross-tab writes are not a production concurrency solution.

Evidence contains original prompt, original team response, standards, timestamp, project/version, contest, and round. It contains no competition points, rubric score, or mastery decision. Competition results are exported alongside evidence as separate records. Scores and selection of a winner do not mark learning mastery.

Reuse is exercised with a mathematics package and an independent historical-source-defense test fixture. Both use identical domain behavior.

## Television graphics and fictional showcase

Open `/projects/championship-show/final-demo` for the separate fictional final. Its nine chapters cover the opening image, three-event season rewind, bracket, three question types, two intermissions, and champion. Play the timed sequence or inspect any chapter manually. Pause stops scheduled progression; Play restarts the current chapter. The standalone showcase builds its snapshots through the real domain engine in memory and does not inject the rehearsal runtime or persistence adapter.

The broadcast renderer provides physical podiums, lit materials, a reflected stage, a textured LED wall, crisp live screen textures, and eased perspective camera movement to each team's actual position. Camera direction includes wide, matchup, question, team, and champion shots. Questions follow a dim → camera travel → sliding-panel reveal → hold sequence before the actual answer timer begins. Confirmed score changes remain behind the reveal cue. Manual direction, skip/cancel, full-screen, reduced-motion cuts, optional original sound stings, and a quiet wager bed are included. Sound starts only after the viewer enables it.

Project packages swap palettes, wall/floor/podium textures, emblems, logos, screen/bracket/winner art, sounds, camera timing, and materials through `broadcast`. Midnight/Gold and Polar/Silver preview treatments exercise the same renderer. Presentation settings are excluded from the gameplay persistence fingerprint, so replacing artwork does not invalidate a saved rehearsal. See [BROADCAST_SYSTEM.md](BROADCAST_SYSTEM.md) for configuration and asset provenance.

The fictional recap derives qualification points from its three invented event records; those same story moments become the narrator's warm-up. Nova's early delivery-cost mistake returns in the final wager, giving the ending a narrative payoff. The demo currently shows a timed storyboard, not an assembled video. [The video script](../../public/projects/championship-show/mock-recap-script.md) supplies a 75-second shot list, narration, captions, opening frame, and exact instructions for attaching a mock MP4. The native video player hands off on `ended` and falls back to the storyboard on load failure. Real classroom clip selection/assembly is still a future integration.

Three audience games are available during both quiz breaks: Mystery Zoom (a sunglasses-wearing rubber duck), Wrong Answers Only, and Victory Pose Freeze. They have no competition points or academic scoring and include seated/pass options.

## Capability gaps and deliberate deferrals

`TEMPLATE_CAPABILITY_GAP — authoritative classroom competition`: no server command endpoint, authenticated host permissions, scoped student projections, remote responses, synchronized presentation clients, transactional buzzer ordering, or server timer exists for this template. The launcher rejects `serverAuthoritative` sessions instead of silently running local logic as official results.

`TEMPLATE_CAPABILITY_GAP — educational integration`: this pass captures and exports team evidence but does not write into student notebooks, portfolio records, or mastery services. Individual responses/reflections, teacher rubric review, and the full three-week learning/qualification activity sequence need a subsequent integration phase.

Other reference features are deferred: AI judging, real classroom recording/highlight assembly, automatic qualifier import, automatic steals, per-match question pools, risk-board selection, result overrides after reveal, replay/reset/reseed after lineup lock, awards, and project authoring UI. They are not presented as functional controls.

Recommended next phase: review the fictional final, supply a mock recap video, and refine project artwork; implement the authoritative classroom adapter before any official live competition.

## Change inventory and verification

Added: competition domain models/validator/bracket/engine, runtime service and persistence contract/adapter, bracket and host/presentation components, reusable broadcast renderer/director/projection/audio, fictional showcase engine and components, project packages and three generated images, video script/captions, lazy launcher, behavioral tests, serial test configuration, and documentation. Three.js and its type definitions are explicit dependencies.

Modified: project catalog and its expected entries; local template registry and its expected entries; launcher registry. Existing unrelated workspace changes are preserved.

Tests cover 2–16-team tournaments, byes, separated seeds, hybrid progression, all-team finals, subject reuse, evidence separation, timer pause/expiry, first-buzz ownership, wager limits/losses, tiebreaks, score review/reveal idempotency, UI host-to-champion flow, private pre-reveal display, reload recovery, failed persistence, storage isolation, and rejection of authoritative launches.

Verified September 8, 2026: production `npm run build` passed with existing unrelated stylesheet budget warnings. The targeted Angular test run passed **41 tests across 7 files**, including cue cancellation/timing, public projections, configurable cameras, fictional replay/scoring, recap video handoff/fallback, quiz breaks, bracket-to-final qualification, and the original domain/UI/persistence/catalog/registration coverage. Final verification uses `NG_BUILD_MAX_WORKERS=1` and `scripts/vitest-competition.config.mjs` to avoid worker memory exhaustion alongside the desktop preview. Browser checks exercised the opening, bracket and finalist reveal, real team camera movement, question reveal, mystery-duck answer, and final champion/scores. Targeted `git diff --check` passed. No production deployment was performed.

The repository architecture checker currently flags two unrelated existing paths: `core/index.ts` imports `./templates`; `projects/mystery-substance/lab-kit/render-quality.service.ts` is a service under project content. This change does not modify those files.
