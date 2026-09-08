# Frontier launch film and first trade

September 8, 2026.

The Frontier invitation at /projects/frontier-trading-company now presents the supplied Trading-town-launch-video.mp4 with native sound, play/pause, seeking, and fullscreen controls. Playback is user initiated. The generated first opening frame supplies its poster. A written contextual summary remains available if playback fails; it is not a verbatim transcript.

Try your first trade opens the existing cargo practice in a modal beside the launch context, beginning immediately at selection with 30 coins and two cargo spaces. Opening practice pauses the film. Closing, Escape, or the existing Project preview/completion action dismisses and destroys the practice and restores focus to its launch button. Reopening creates a fresh practice. Start Project still enters the full simulation directly.

## Files

Added public/project-intros/frontier/trading-town-launch.mp4 and trading-town-launch-poster.png, plus this report. The supplied source film remains in docs/frontier-trading.

Modified projects/intro-scenes/frontier.teaser.ts to configure the existing audible opening-speech contract, projects/project-intros.ts to select its poster, and features/project-intro/project-intro.component.ts/html/scss/spec.ts for the optional practice presentation and verification.

## Architecture

Reuses OpeningSpeech, the existing launch video renderer, ProjectTeaserHostComponent, and DecisionSceneComponent. Optional practice is selected by the existing cargo configuration, without project-ID checks or new core contracts. The presentation copies configuration with the prologue omitted so practice does not repeat the introductory story. No learner records are loaded or saved. The previous single-page invitation specification is extended to offer optional cargo practice; direct project entry remains available.

No new plugin, schema, persistence adapter, dependency, or TEMPLATE_CAPABILITY_GAP. Existing unrelated working changes were preserved.

## Verification

Production Angular build passed, with existing stylesheet-budget warnings elsewhere. All 35 focused tests passed across launch component, decision-scene component, and intro registry. Added a test for audible video, pausing on practice entry, cargo selection, dismissal, focus restoration, fresh replay, and no persistence/navigation side effects.

Browser checks confirmed the 20-second uploaded film plays, practice opens at cargo selection, rope and provisions fill the two slots, and continuing opens the cost question. Closing restores focus to Try your first trade. Desktop launch layout was visually checked. Task-scoped git diff --check passed.

Next step: review the local launch; deployment is separate.