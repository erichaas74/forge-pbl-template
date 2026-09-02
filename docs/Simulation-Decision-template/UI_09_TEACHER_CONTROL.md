# UI 09 — Frontier Trading Teacher Control

## Page Purpose
The Teacher Control page lets the teacher configure, launch, monitor, pause, and review the Frontier Trading Simulation while preserving individual mastery and an auditable record of student decisions.

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
### Desktop Teacher Workspace
Use tabs or segmented views:

1. **Overview**
   - class progress,
   - teams/students active,
   - season status,
   - students not started,
   - pending events,
   - students at checkpoint,
   - seasons complete,
   - reports awaiting grading.

2. **Simulation Control**
   - launch / pause / resume season,
   - open/close markets,
   - route availability,
   - event mode,
   - official attempt limits,
   - reset/reopen controls with confirmation and audit note.

3. **Market Configuration**
   - location list,
   - good list,
   - buy/sell prices,
   - stock,
   - cargo values,
   - price-change schedule/seed,
   - preview as student.

4. **Route / Event Configuration**
   - route graph,
   - distance/time/terrain/risk,
   - blocked routes,
   - event pools and triggers,
   - common event vs seeded event settings.

5. **Live Monitor**
   - table of students/teams with:
     - current location,
     - cash,
     - cargo use,
     - profit/loss,
     - last action,
     - event pending,
     - save status.
   - filters for stuck / inactive / missing checkpoint.

6. **Evidence & Mastery**
   - completion status,
   - mastery map,
   - reteach needed,
   - pinned evidence count,
   - notebook progress.

7. **Results / Grading**
   - season results,
   - final report submission status,
   - grading queue,
   - rubric panel.

### Safety for State Changes
Teacher actions that alter student simulation state must be separated from normal monitoring and require explicit confirmation.

## Student Actions
Teachers can:
- Assign simulation to class/team/individual.
- Configure starting cash, cargo capacity, locations, goods, prices, route network, event rules, and season target.
- Preview the student experience.
- Launch/pause/resume.
- See who is stuck on an event or save error.
- Open a student's immutable ledger.
- View simulation evidence alongside mastery status.
- Trigger/release teacher-configured common events if the mode allows it.
- Reopen a season for a student/team with audit reason.
- Reset an attempt only with confirmation.
- Unlock reteach/retake paths.
- Review and grade Final Strategy Reports with rubric.
- Export grades/reports through the LMS's normal export path.

Teachers should not manually “fix” a student's cash or inventory silently. If an administrative correction is necessary, it becomes an explicit adjustment log entry with reason.

## Component States
### Class Simulation States
- draft,
- scheduled,
- open,
- paused,
- closed,
- archived.

### Student/Team States
- not_started,
- planning,
- active,
- event_pending,
- checkpoint_due,
- season_complete,
- report_draft,
- submitted,
- needs_revision,
- graded,
- save_error.

### Teacher Control States
- config_valid,
- config_warning,
- config_invalid,
- unsaved_changes,
- launching,
- paused,
- action_requires_confirmation.

### Alerts
Flag:
- no activity after configurable interval,
- repeated invalid trade attempts,
- save errors,
- missing mastery,
- required event unresolved,
- season complete but report not started,
- report waiting for grading.

## Mobile Behavior
Teacher Control is desktop-first.

### Tablet
- Overview and Live Monitor supported.
- Configuration forms use stacked sections.
- Market/route editing is simplified but functional.
- Grading opens one submission at a time.

### Phone
- Monitoring, pause/resume, alerts, and basic student lookup only.
- Complex market/route/event authoring should display `Best on larger screen` and provide read-only summary instead of forcing a cramped editor.
- Emergency pause control remains accessible.

## Graphics / Assets Needed
- Teacher dashboard icons.
- Class/team status badges.
- Small regional map preview.
- Market configuration table styles.
- Alert icons.
- Mastery map grid.
- Audit-log icon.
- Rubric/grading panel styles.
- Student-view preview frame.

## LMS / Data Requirements
### Simulation Configuration
```ts
FrontierSimulationConfig {
  projectId
  version
  gradeLevel
  mode: "practice" | "official"
  startingCash
  cargoCapacity
  locations[]
  goods[]
  markets[]
  routes[]
  events[]
  seasonRules
  scoringRules
  evidenceRequirements
  masterySkillIds[]
  attemptRules
  leaderboardSettings
  accessibilityOverrides?
}
```

### Teacher Audit Log
```ts
TeacherSimulationAction {
  actionId
  teacherId
  simulationId?
  classId
  actionType
  targetStudentId?
  targetTeamId?
  beforeState?
  afterState?
  reason?
  timestamp
}
```

### LMS / Gradebook
Integrate with:
- Class Overview,
- Project View,
- Student View,
- Team View,
- Mastery Map,
- Grading Queue.

Store:
- activity statuses,
- mastery records,
- reteach status,
- report submissions,
- rubric scores,
- feedback,
- simulation trial/action logs.

### Reset / Reopen Rules
A reset must never delete the original record. Instead:
- close original attempt,
- create new attempt/version,
- retain audit link,
- determine via teacher setting which attempt feeds mastery/grade.

### Privacy
Student leaderboard names can be hidden/anonymized. Teacher sees full class data; students only see permitted comparison data.

## Accessibility / Student Support
- Teacher tables support keyboard navigation and screen-reader headers.
- Alerts include text labels.
- Confirmation dialogs clearly state scope: one student, one team, or entire class.
- High-density tables support zoom and column selection.
- Live status never relies on color alone.
- Provide a non-map route configuration list/table for accessibility.

## Acceptance Criteria
- Teacher can run the full simulation without editing code.
- Configuration is versioned and previewable before launch.
- Pause/resume affects commits but does not destroy student drafts.
- Every reset/reopen/administrative adjustment is auditable.
- Teacher can connect simulation performance to completion, mastery, evidence, and final-report grading without using profit rank as the sole grade.
