# Final-product launch page and goal-chat preview

This September 5, 2026 update supersedes the practice-choice and written-response screens described in PROJECT_LAUNCHES.md. It applies to all seven configured project launches.

## Student flow

1. The existing project-specific opening scene introduces the story on every visit to the launch page, including when an earlier scene receipt or planning response is saved. Its meaningful scene interactions remain available. In particular, Professor Pip, Beep, the sample test, and the POOF/reveal/handoff remain intact. Saved history never automatically bypasses this opening; students can explicitly skip it.
2. Completing or skipping the scene opens one visual product page. It explains the role, driving question, and mission; shows a graphic inspired by the final product; and links to the existing completed-project example.
3. The page includes a chatbot-shaped placeholder titled **Future chatbot link**, marked **Not functional for now**, asking **What is your goal in this project?** Its textarea and send button are disabled. It makes no requests, saves no goal, and produces no simulated replies.
4. The project’s existing primary action opens `/projects/:projectId/experience` directly. No practice-choice, direction, reason, question, confidence, or chatbot answer is required.

## Implementation

- Added `features/project-intro/project-product-preview.component.ts`, a reusable visual component driven by existing introduction/final-example content. Theme styling evokes case files, ledgers, museum labels, broadcasts, Senate speeches, route replays, and storybooks. The museum keeps the supplied rotatable GLB.
- Replaced the launch component’s HTML/SCSS and simplified its TypeScript controller. Removed the old choice screens, stepper, response forms, and acceptance prerequisite.
- Updated decision-scene handoff wording to lead into the final-product page.
- Existing scene receipts still save before the handoff; retry, replay preservation, navigation protection, and restored openings remain supported. Old saved response/history data is preserved by the unchanged persistence contracts. Entering a project does not fabricate an accepted response or goal.
- No core schema, backend, AI service, or model provider is added. No new template capability gap is required for a deliberately nonfunctional UI placeholder. No unrelated activity choices are removed.

## Verification

- Return-visit correction: 13 focused launch and illustrated-comparison tests pass, including saved scene receipts and older planning history. Browser verification followed Professor Pip's test, surprise, case handoff, chatbot preview, and reopening from the project library. The full opening now appears again without clearing student data. Production build passes with existing unrelated stylesheet warnings.

- Production Angular build passes, with existing warnings outside the new page.
- 30 focused tests pass across six launch/intro test files. The updated component suite checks all seven projects, no choice-card UI after the scene, disabled chatbot controls, direct navigation without acceptance, existing-record preservation, and save failures/retries.
- Browser check: Senate opening → product page → Senate workspace succeeds without entering a chatbot goal. The new page renders at desktop and 390px viewport sizes without horizontal overflow; disabled controls and their status remain readable on mobile.
- The shared preview component and controller contain no project-ID-specific behavior. Project differences come from existing configuration and theme styles.
- No deployment performed. Recommended next phase, only when requested: connect an actual goal-conversation adapter and define its save/consent/assessment contract. The current placeholder remains inactive.

