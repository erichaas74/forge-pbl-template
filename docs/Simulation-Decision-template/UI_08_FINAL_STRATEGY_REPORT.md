# UI 08 — Final Strategy Report

## Page Purpose
The Final Strategy Report is the guided final product for the Frontier Trading Simulation. It converts simulation activity into an evidence-based business/trade explanation and should function as a structured portfolio report rather than a blank essay.

## Curriculum / Product Alignment
This page belongs to the **Frontier Trading Simulation** project type. The curriculum foundation is a trading-company challenge built around limited money, cargo capacity, changing prices, budgeting, unit price, profit, and defending trade decisions. The social-studies extension adds route choice, maps, terrain, supplies, risk events, consequences, and multiple perspectives.

**Source-supported learning priorities**
- Decimal and money calculations.
- Budgeting and unit-price comparisons.
- Profit / loss reasoning.
- Cargo-capacity constraints and measurement conversion.
- Route choice using map, distance, terrain, and risk evidence.
- Evidence-based explanation of decisions.
- Simulation evidence that can be saved into the project notebook and final submission.

**Design decisions introduced by this UI spec**
- A turn/stop-based trading season.
- Student-facing market, route, cargo, event, ledger, and season-results views.
- Persistent simulation state that carries across all page views.
- Teacher-configurable market/event presets and final-challenge rules.
- No single “correct” route; students are expected to justify tradeoffs with evidence.

## Layout
### Desktop Layout
Use a **guided report builder** with a left section navigator and large central writing/evidence workspace.

Sections:
1. **Mission Summary**
   - What were you trying to accomplish?
2. **Starting Strategy**
   - How did you plan to use your money, cargo space, and routes?
3. **Best Trade Decision**
   - Claim + linked ledger evidence + calculation.
4. **Route / Risk Decision**
   - Claim + map/event evidence.
5. **A Decision You Would Change**
   - What happened and what evidence now changes your thinking?
6. **Math Evidence**
   - Required unit-price / profit / budget calculation(s).
7. **Final Season Result**
   - Results cards can be embedded from the Results page.
8. **Final Strategy Claim**
   - What strategy would you recommend for another trading season, and why?
9. **Individual Reflection**
   - What did you personally learn / contribute?
10. **Submission Checklist**

### Evidence Drawer
Persistent right drawer on desktop:
- pinned ledger entries,
- route choices,
- event decisions,
- results metrics,
- notebook notes.
Drag/click `Use Evidence` to attach a source to the active report section.

### Rubric Preview
Accessible without leaving report; shows criteria and current completion only, not an AI-predicted grade.

## Student Actions
Students can:
- Draft each report section.
- Insert evidence links from the simulation.
- Insert calculations or result snapshots.
- Save draft automatically.
- Open source evidence in read-only preview.
- Complete required reflection.
- View rubric.
- Run a final readiness check.
- Submit report.
- Revise/resubmit if teacher returns `Needs Revision`.

The system can prompt but should not write the student's evidence-based explanation for them unless the project explicitly enables AI coaching with clear boundaries.

## Component States
### Section States
- not_started,
- drafting,
- evidence_missing,
- calculation_missing,
- ready,
- complete,
- needs_revision.

### Report States
- draft,
- ready_to_submit,
- submitted,
- under_review,
- needs_revision,
- resubmitted,
- graded.

### Readiness Rules
Teacher-configurable requirements can include:
- minimum evidence links,
- at least one trade calculation,
- at least one route/event evidence item,
- final season result,
- individual reflection,
- all required mastery checks completed.

Submission button remains disabled with a specific checklist of missing requirements.

## Mobile Behavior
- Section navigator becomes a top dropdown / progress stepper.
- Evidence drawer becomes a bottom sheet.
- Only one report section shown at a time.
- Autosave indicator remains visible.
- Rubric opens full screen.
- Evidence preview opens in a temporary overlay with `Return to Report`.

## Graphics / Assets Needed
- Report cover/banner.
- Evidence chip styles for Trade, Route, Event, Result, Notebook.
- Calculation block component.
- Embedded mini-chart styles.
- Rubric icon.
- Submission-ready seal/check graphic.

Keep the report visually cleaner than the simulation pages; writing and evidence readability take priority.

## LMS / Data Requirements
### Report Model
```ts
FinalStrategyReport {
  reportId
  projectId
  simulationId
  studentId
  teamId?
  sections: ReportSection[]
  status
  rubricId
  submittedAt?
  revisionNumber
}

ReportSection {
  sectionId
  response
  evidenceRefs[]
  calculationBlocks[]
  attachments[]
  status
  teacherFeedback?
}
```

### Evidence Reference
```ts
EvidenceRef {
  sourceType: "transaction" | "route" | "event" | "result" | "notebook"
  sourceId
  snapshotId?
  studentCaption?
}
```

### LMS
- Final report is a Final Submission Activity.
- Supports autosave, submit, teacher comments, rubric grading, revision request, and resubmit.
- Team sections and individual sections must be distinguishable if collaborative.
- Final report score can feed Final Write-Up / Reflection category.
- Linked evidence remains available to teacher even after simulation is locked.
- Preserve revision history.

## Accessibility / Student Support
- Guided prompts use short, concrete language.
- Evidence chips have descriptive accessible names.
- Autosave state announced non-intrusively.
- Writing area supports spellcheck and keyboard formatting.
- Rubric readable as a simple table/list.
- Avoid requiring drag-and-drop; every evidence insertion has click/keyboard alternative.

## Acceptance Criteria
- Student cannot submit without required sections/evidence.
- Every evidence citation resolves to an immutable simulation/notebook record.
- Teacher can see report and source evidence together while grading.
- Revision preserves prior submitted version.
- Report can support 5th-grade guided response lengths without becoming a long blank essay.
