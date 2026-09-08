# Professor Pip: illustrated opening for The Unlabeled Shelf

## September 8: story on the launch page and quicker narration

The single-page invitation now embeds the existing illustrated comparison as Professor Pip's story. Students can play the voices, trigger the blue/pink test and POOF, meet the four mystery vials, and replay. **Start Project** stays available on the same page. There are no required prediction or observation questions in this presentation, and watching it does not write an opening response or completion receipt. The earlier practice flow described below remains supported by the scene's default mode for existing consumers.

The registered scene and its host accept an optional `storyMode` input, defaulting to `false`. The launch selects this presentation through the existing `illustrated-comparison` capability configuration, with no project-ID branch, new plugin, dependency, or core schema change. The existing illustrations, captions, audio player, cancellation behavior, and activity route are reused. Launch rendering does not move focus into the story automatically.

Pip's four lines now use a more excited script and Microsoft David Desktop at speech rate `3`. Beep's voice is unchanged. Four new `*-scientist-v2.wav` files preserve the original assets and refresh cached narration. Together, the new Pip clips run approximately 46 seconds, compared with 63 seconds previously. Captions and spoken text still share the dialogue manifest. Regenerate only Pip's clips with:

```powershell
powershell.exe -NoProfile -NonInteractive -Sta -File scripts/generate-intro-voices.ps1 -Manifests unlabeled-shelf -Speakers scientist
```

Added: `welcome-scientist-v2.wav`, `testing-scientist-v2.wav`, `reveal-scientist-v2.wav`, and `handoff-scientist-v2.wav` under `public/project-intros/lab-surprise/`.

Modified: the illustrated-comparison component, template, styles, and tests; project-intro component, template, styles, and tests; project-teaser host; project-intros configuration; unlabeled-shelf dialogue manifest; voice-generation script; this report; and SINGLE_PAGE_PROJECT_LAUNCH.md. A small `unknown` callback annotation in the concurrent Crisis Center validator also resolves a strict TypeScript error discovered during the build.

Verification: the production build passes with existing stylesheet-budget warnings outside this change. Seven focused test files pass, **57 tests**, including story playback without practice responses, unchanged practice behavior, all ten invitations, audio cancellation/error handling, scene registration, and the robot workspace. Browser checks cover optional voices without an audio error, the test/reveal/handoff/replay controls, one project heading, and a phone-sized layout without horizontal overflow. WAV headers and clip durations were checked.

No specification deviation or new `TEMPLATE_CAPABILITY_GAP`. Recommended next step: review Pip's pacing in the local preview.

## Original implementation record

Implemented September 5, 2026. This adds the approved overconfident scientist and robot to the science project's opening. The other five openings were subsequently extended in [upgraded project openings](UPGRADED_PROJECT_OPENINGS.md); the Pip scene remains intact.

## What students experience

Professor Pip declares two clear samples identical, while Beep points out that he has collected no evidence. **TEST THAT THEORY** starts a virtual comparison: A turns blue, B turns pink, and a cartoon POOF gives Pip wild hair, crooked goggles, soot marks, and a “NEEDS MORE EVIDENCE” sticky note. His reply: “Appearances can fool us… and I need a hat.”

The color observations remain in a small practice case file. Students reveal the four mystery vials and choose **Give Me the Case** to continue into the existing reflection and investigation flow. The cartoon exaggeration is explained after the reveal; it does not become a scientific observation or a chemical procedure.

The scene supports captions throughout, optional voices, replay, skip, keyboard controls, and reduced motion. It proceeds at the learner's pace. The dialogue runs approximately 1½ minutes in total, leaving room for the student interaction and reading within the intended 2–3 minute opening.

## Voice and illustration assets

The scientist, robot, glassware, and effects are SVG/CSS illustrations. Separate hair, goggles, eyes, note, and puff layers provide the comedy. No raster art or external animation library is required.

Seven WAV files under `public/project-intros/lab-surprise/` provide approximately 4.3 MB of local, synthesized narration. Pip uses Microsoft David Desktop and Beep uses Microsoft Zira Desktop. These are synthesized voices, not recorded actors. Audio starts only when requested, and is stopped when leaving, skipping, replaying, or changing scenes. Failed audio returns to the visible captions.

The spoken script and on-screen captions share `src/app/projects/intro-scenes/unlabeled-shelf.dialogue.json`. Regenerate audio on Windows with:

```powershell
powershell.exe -NoProfile -NonInteractive -Sta -File scripts/generate-intro-voices.ps1
```

The script validates every output path remains under the workspace's `public` directory. The narration was generated using installed Windows voices; the sandbox's speech-engine restriction required the approved authoring command to run outside the sandbox.

## Architecture and reuse

- `ProjectIntroConfig.teaser` is an optional, backward-compatible capability configuration.
- `ProjectTeaserRegistry` registers `illustrated-comparison`, a reusable scene renderer. The feature host resolves registered components with Angular input/output bindings. Missing renderers and invalid content report errors.
- Curriculum names, dialogue, sample result colors, and action copy live in project configuration. The scene renderer contains no project-ID checks.
- Existing `ProjectIntroRuntime`, scoped persistence, immutable accepted-response history, catalog routing, and activity launchers are reused.
- The independently versioned scene is `unlabeled-shelf-pip-opening@1.0.0`. Existing intro response records remain valid; no migration or reset is needed.
- A new optional `IntroResponse.teaser` receipt records `projectIntro.teaserCompleted` or `projectIntro.teaserSkipped`, scene ID/version, timestamp, and the observations actually shown. Skipping partway records only already-visible results.
- Save must succeed before the first handoff. Retry preserves the pending handoff. Reload avoids forcing a completed scene again, and a replay button remains available. Replaying an accepted opening does not rewrite its original response or history.
- The teaser is ungraded practice. It does not spend resources, identify real mystery vials, alter activity evidence, or complete any official lab task.

## Added files

- `src/app/shared/project-intro/project-teaser.models.ts`
- `src/app/shared/project-intro/teaser-audio-player.ts` and `.spec.ts`
- `src/app/plugins/intro-scenes/illustrated-comparison.component.ts`, `.html`, `.scss`, `.spec.ts`
- `src/app/runtime/project-launch/project-teaser.registry.ts` and `.spec.ts`
- `src/app/features/project-intro/project-teaser-host.component.ts`
- `src/app/projects/intro-scenes/unlabeled-shelf.teaser.ts`
- `src/app/projects/intro-scenes/unlabeled-shelf.dialogue.json`
- `scripts/generate-intro-voices.ps1`
- Seven generated WAV files in `public/project-intros/lab-surprise/`
- This report.

## Modified files

- `src/app/shared/project-intro/project-intro.models.ts`: optional scene and receipt contracts, validation, and event names.
- `src/app/projects/project-intros.ts`: registers the science opening scene.
- `src/app/features/project-intro/project-intro.component.ts`, `.html`, `.spec.ts`: scene placement, handoff, persistence, replay, and tests.
- `docs/architecture/PROJECT_LAUNCHES.md`: links this extension.

## Validation and limits

- Production build passes, with the same six existing stylesheet-budget warnings outside the new scene.
- Full Angular suite: **61 files, 275 tests passed**.
- After the final keyboard-focus adjustment, both affected component suites passed again: **11 tests**. The production build was also rerun successfully, with all seven voice clips present in its output.
- Coverage includes color order, persistent revealed evidence, receipt idempotency, skipping before and during a test, replay/destroy cancellation, audio end/error/cancellation, optional-schema compatibility, registry errors, save failure/retry, and reload behavior.
- All seven narration files have valid WAV headers and return HTTP 200 from the local preview server.
- Browser checks cover the illustrated welcome, optional voice playback without an error, the blue/pink reveal, Pip's comic appearance, captions, the four-vial handoff, successful saved continuation, and replay with focus returned to the scene heading.
- The architecture checker still reports the same two unrelated findings in `core/index.ts` and `projects/mystery-substance/lab-kit/render-quality.service.ts`; no new scene file is flagged.

No breaking architecture deviation or missing capability for this opening. The existing `TEMPLATE_CAPABILITY_GAP` for authenticated cloud storage and tutor/final-submission consumers remains as documented in `PROJECT_LAUNCHES.md`. Recommended next phase: classroom feedback on pacing and humor, followed by adapting the registered scene approach to the other agreed project-specific media formats. Professional character performances can replace the WAV assets without changing the runtime.
