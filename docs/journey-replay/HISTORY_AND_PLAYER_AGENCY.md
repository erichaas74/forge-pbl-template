# Your path through fixed history

Curriculum 1.3.0 implements the requested distinction: the learner’s participation is personal, while documented historical events retain their dates, participants, and outcomes on every path.

## Player agency

The player leads a fictional small crew in 1501. They can choose their companions and obligations, what to carry, which Atlantic route to take, whose approach to support in a fictional encounter, and how to explain what they witness. Their supplies, health, elapsed voyage time, personal chart notes, contact’s backing, and recorded perspective can change.

They cannot command Dias, da Gama, Cabral, or Magellan; move a treaty boundary; replace an explorer’s documented voyage; decide another community’s history; or turn a local fictional exchange into proof that documented violence did not happen. Joining a sponsor means accepting a fictional contact’s commission, not controlling a national government. The local storm and resupply scenes remain explicitly fictional.

The first choice now asks whether to join a merchant venture, sail with chartmakers, or serve a sponsor’s agent. At landfall the learner can support the interpreter, the quartermaster’s limited exchange, or sailors asking to wait offshore. These allegiances change the personal costs and viewpoint without changing the historical chronology. No side automatically determines the correct historical interpretation.

## What the learner knows and witnesses

The game, opening, consequence report, and replay distinguish:

1. Documented historical context, supported by linked sources.
2. What the fictional character personally witnesses.
3. Inference, missing perspectives, and unresolved questions.

Events before 1501 are available during the voyage. A 1522 epilogue becomes visible after completion and is explicitly labelled hindsight, not an event the character witnessed during the 1501 journey. Game weeks measure the personal voyage; they do not advance historical dates or trigger alternative historical outcomes. Modern location labels orient learners; the possible arrival near present-day Recife is not Cabral’s landfall near present-day Bahia.

The factual anchors are Dias rounding southern Africa in 1488, the 1494 Treaty of Tordesillas, da Gama reaching India in 1498, Cabral’s Brazilian landfall in 1500, and Victoria’s return under Elcano in 1522. Sources are museum historical summaries and UNESCO’s record of the treaty; they are not presented as student eyewitness testimony. The corresponding before-voyage evidence paragraphs can be cited in the existing response workflow.

Sources checked for the fixed chronology:

- [The Mariners’ Museum: Bartolomeu Dias](https://exploration.marinersmuseum.org/subject/bartolomeu-dias/) supports the 1488 passage and 1498 arrival of da Gama.
- [UNESCO: Treaty of Tordesillas](https://www.unesco.org/en/memory-world/treaty-tordesillas) documents the 1494 agreement and demarcation line.
- [The Mariners’ Museum: Pedro Álvares Cabral](https://exploration.marinersmuseum.org/subject/pedro-alvares-cabral/) describes the 1500 landfall near present-day Bahia.
- [The Mariners’ Museum: Magellan’s expedition](https://exploration.marinersmuseum.org/subject/ferdinand-magellan/) records Victoria’s return under Elcano in 1522. The game attributes the return to Elcano and the surviving crew, not to Magellan personally.

## Reusable implementation

`historicalFrame` is optional, immutable project/package content with setting, agency, witness guidance, and sourced events. Each event has a stable ID, display date, title, summary, source label/HTTPS URL, and period (`before-voyage` or `epilogue`). It is not part of student runtime state, resource changes, or consequence modifiers. No player command targets it.

The reusable history component reads this frame in both the decision sidebar and replay. Its only progression input is whether the voyage has finished, which exposes the fixed epilogue. Branch selection cannot alter its event content. The existing engine, route mechanics, resource effects, citation workflow, persistence, and replay remain in use.

The optional contract is backwards compatible with template/schema 1.0; validation checks metadata, periods, distinct event IDs, and source URLs. The curriculum version advances to 1.3.0 with matching catalog and server policy. Prior 1.0.0, 1.1.0, and 1.2.0 exports and versioned saved data remain unchanged.

Added: `historical-voyage.ts`, the reusable history-context component and tests, the history validator, and this document. Modified: current configuration export, package/domain contracts, assembler and fixture, shell/replay/outcome UI, opening and completed-example copy, catalog and server version policy, and relevant regression assertions. The completed example also supplies its required planning target so it can finish through the current response workflow. No new branching engine, provider, or requested TEMPLATE_CAPABILITY_GAP was introduced.

## Verification

The journey suite passes 39 tests across 12 files, including all 162 choice combinations. Paths produce different personal destinations and costs while the historical frame remains unchanged. Component tests verify sourced past events and completion-only hindsight; package tests reject missing citations, invalid periods, duplicate identities, and unsafe links. Prior curriculum outcomes remain compatible.

Seven additional opening-registry and completed-example checks pass. The full Angular development build succeeds. A broader shared project-intro test suite could not initialize because a Phaser import requests a canvas context unavailable in its jsdom setup; its tests did not run. That harness issue remains outside this change. No new browser walkthrough was completed for the historical-content update.

Next useful classroom check: have two teams take different routes and compare their logs. They should identify which experiences differ, which historical facts remain identical, and what neither character could personally have witnessed.
