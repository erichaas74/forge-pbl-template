# Hammurabi on Trial — current build plan

Updated 2026-09-15 for project **2.0.0**, lesson plan **2.0.0**.

The authoritative implementation and design requirements are in the [Debate Studio build guide](build/16_DEBATE_STUDIO_TEMPLATE.md). This plan applies the user's continuing-debate design to Hammurabi. It supersedes the earlier worksheet-first, final-hearing-only sequence.

## Product

Students debate whether Hammurabi's Code created order, fairness, both or neither. The main screen stays on their continuing debate: openings, opposing responses, same-side critique, individual revisions, closings and ranked individual performers.

| Session | Work | Individual evidence |
| --- | --- | --- |
| 1 · Individual | Hear prompt, choose side, form points, cite sources and produce opening. | Begin monarchy, empire and hierarchy explanations. |
| 2 · Group | Exchange with an opposing group or individual; submit rebuttal by class end. | Explain order versus fairness using a specific law. |
| 3 · Individual | Learn source critique, review a same-side peer and revise. | Compare royal purpose, polytheism, cuneiform and literature. |
| 4 · Group | Exchange refined arguments and submit next response. | Distinguish intended protection from proof of practice. |
| 5 · Individual | Learn stronger reasoning, critique and revise again. | Propose a hypothetical law change, predict effects on two groups and examine architecture separately. |
| 6 · Group | Exchange and answer the strongest opposing argument. | Cite a law, answer fairly and acknowledge a limitation. |
| 7 · Individual | Review feedback, refine/rehearse closing. | Independently compare crop failure with canal negligence; revisit all eight concepts. |
| 8 · Group | Final exchange, closing performances, justified rankings. | Personal argument/context defense and evidence-based judging. |

## Standards that must be retained

- **FF.G6.SS.01:** gather and cite sources, identify their origins and relevance, and recognize remaining evidence needs.
- **FF.G6.SS.02:** analyze purpose, viewpoint, fact, opinion and inference; explain source limitations.
- **FF.G6.SS.04:** support a claim, answer another interpretation, predict consequences and engage in civic discourse.
- **FF.G6.SS.10:** explain **monarchy, empire, hierarchy, polytheism, cuneiform, monumental architecture, epic literature and the Code of Hammurabi**.

The independent context evidence editor retains every target. A law argument or performer ranking cannot establish every bundled SS.10 component. Teachers review individual evidence and supply follow-ups for missing components. Full source wording remains in the compact, expandable standards review.

## Screen and resource design

Keep the current tasks directly above the disconnected AI Tutor box. Writing, explanations, peer feedback and judgment reasons open from the tutor-owned side area. The main panel contains the debate and meaningful source/argument interactions.

Project sources include the royal monument, river cities, laws 48 and 55, medical fees, royal religious claims, cuneiform, a ziggurat and epic literature. Preserve citation, provenance, perspective and source limits. Do not treat an architectural object, epic or royal promise as proof of everyday legal enforcement.

[Student resource ideas](debate-studio/STUDENT_RESOURCES.md) proposes museum sources, selected translated laws and short debate-skill resources. Optional videos need verified playable media and a defined critique task.

## Delivery and assessment

The current build supports local drafts/history, actual local recordings and manual exchange files for submitted work. The AI Tutor and official assessment remain disconnected. Live authenticated classroom delivery and shared media require a production gateway, as documented in the shared build guide.

All sessions, sources, practice examples and judging remain accessible during testing. Legacy H-A/H-B/H-C gates do not apply to this experience. Prerequisite teaching and targeted support continue as teacher actions.

Use 45–60 minutes as a planning estimate: short modeling, sustained debate work, then a class-end submission/check. Do not use word counts, watched clips or completed fields as automatic mastery.

## Build files and checks

Curriculum lives in `projects/hammurabi-on-trial/hammurabi-on-trial.config.ts`, its `*.exchange.ts` skill examples and existing inquiry targets. The reusable implementation lives in `templates/debate-studio/exchange/`. Version the catalog, lessons and standards together.

Test all eight direct entries, opposition links, same-side critiques, private context save/resume, revisions, performer rankings and responsive layout. Test actual media and exchange-file failures separately from curriculum checks.

The [earlier plan](debate-studio/archive/HAMMURABI_BUILD_PLAN_BEFORE_EXCHANGE.md) is preserved for historical reference. Its gates, central text forms, AI-connected language and prohibition on performance rankings are superseded by the current user requirements.
