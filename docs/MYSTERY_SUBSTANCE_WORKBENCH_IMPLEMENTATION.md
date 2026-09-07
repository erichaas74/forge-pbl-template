# Mystery Substance workbench

Implemented from the usability review with the existing visual assets and simulations retained.

## Student experience

- One persistent workbench with six illustrated station choices and an A–D specimen selector. Opening evidence, comparing results, and writing an explanation no longer destroys the current station.
- Search across clues, equipment guides, and student results. The default list relates to the current instrument; All records remains available. Searching looks across stations and excludes locked result content.
- Full text and tables from all ten recovered source files appear beside the experiment. Source downloads remain available. Equipment references have direct buttons to the appropriate tool.
- The existing physical and chemical result matrices are available under the bench. Empty cells choose the correct vial and tool; populated cells open the evidence record.
- My explanation displays the claim, evidence selection, reasoning, uncertainty, confidence, and revision reason together. “Use in my explanation” links the existing evidence record. Saved theories and revision history retain their existing runtime behavior.
- Tool guides no longer receive a supports/contradicts form. Clue classification displays the current saved claim and asks for a claim first if none exists.
- Opening a guide no longer completes the evidence review activity. New reviews require all five case clues. Previously completed saved activities are preserved.
- Contextual instructions explain what to do at the current station. The full checklist retains the existing curriculum requirements, including Bay 3 and final readiness.

## Graphics and layout

Kept the optical vial images, magnifier/particle field, animated water test, probe and lamp, reaction rig and rendered apparatus, conservation particles/chamber, shelf artwork, and Bay 3 scene. Removed the duplicate landing-page station cards. Compact station choices reuse the existing artwork.

Station canvases grow with their content when embedded in the workbench. Container breakpoints respond to the space left beside the evidence panel. On narrow screens the panel moves below the experiment; tables can scroll within their own bounds. Tool selection brings the experiment into view.

## Persistence and compatibility

`WORKSPACE_DRAFTS` is an optional shared port. The Mystery launcher supplies a browser adapter scoped by tenant, project/version, class, learner, and attempt. Existing runtime events and persistence still own recorded results, evidence, theory revisions, and final work.

UI drafts preserve the selected station/vial, scan notes/tags, notebook question, open comparison/explanation, evidence notes/questions, per-vial property and reaction drafts, conservation comparisons, shelf assignments, and Bay 3 decisions. They debounce writes and flush when the document hides or components are destroyed. Interrupted animations restart from a stable checkpoint rather than storing timers. Browser drafts stay on the current device; unavailable browser storage falls back to session memory.

Tool/reference relationships and source content live in Mystery project configuration. The dock, source-record rendering, optional single-page explanation, and draft port are reusable. The source transcripts in `mystery-evidence-records.ts` mirror the ten `public/evidence` files; update both when curriculum source documents change.

The earlier catalog manifest fix is retained: catalog launches use `mystery-substance`, while the legacy package identity and saved scopes remain intact.

## Validation

- Production Angular build passes, with existing stylesheet size warnings (the Mystery shell is smaller than before).
- 45 targeted tests in 10 files pass. They cover station instance continuity, selected tools/vials, evidence-to-explanation linking, matrix actions, guide filtering and hidden-result search, per-vial/chamber drafts, evidence review completion, scoped storage, and the existing science simulations and second-project reuse.
- Browser verification at student laptop and phone widths: retained artwork, water-guide lookup without resetting the test, unfinished observation restored after reload, recorded water result and coverage, comparison display, and no horizontal page overflow at the narrow breakpoint.
- Repository architecture check remains blocked by existing `core/index.ts → ./templates` and `projects/mystery-substance/lab-kit/render-quality.service.ts` findings. This change does not add either dependency/service.

No production deployment or new backend is part of this change. Student usability testing is still needed to measure confusion and task completion; this implementation does not claim measured learning gains or accessibility conformance.
