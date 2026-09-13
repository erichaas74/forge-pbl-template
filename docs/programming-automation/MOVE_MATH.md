# Mission-defined Move math

Move blocks can show a two-number problem: a fixed **Given** number, a fixed operation,
and one editable **Your number** slot. The result controls the existing movement command
in centimeters or wheel rotations. The mission chooses the question; students cannot edit
the given number or operation. Decimal values, fractions, and signed mixed numbers are
accepted as one operand. Additional expressions and variables are not accepted in this slot.

## Configuration and compatibility

`RobotChallenge.moveMath` optionally maps `move-distance` and `move-rotations` to a
`MoveMathProblem`. The given number is always the first operand, so subtraction means
`given − student` and division means `given ÷ student`.

```ts
moveMath: {
  'move-distance': { operation: 'multiply', given: 24 },
  'move-rotations': { operation: 'add', given: 2 },
}
```

Operations are `add`, `subtract`, `multiply`, and `divide`. Given numbers must be finite
and between 0 and 2000; multiplication and division require a positive given number.
Only movement types allowed by the mission may be configured. A blank student operand,
division by zero, and results outside the existing movement range prevent execution.

These are optional additions to schema/template 1.0. `RobotCommand.moveMath` stores a copy
of the problem with the command; `value` stores the student's operand when that field is
present. Otherwise `value` retains its existing full-expression meaning. Compilation uses
the result for movement and matching math evidence. The portfolio shows both operands and
the operation, and replay disables the student input. No new execution command, dependency,
backend adapter, or persistence scope is introduced.

New blocks use their mission's preset and start with an empty student operand. Numeric
starter commands and unlocked saved numeric drafts are converted by solving for the operand
that preserves their existing movement, within 1e-9. This conversion does not mutate the
published starter, trial snapshots, completed drafts, locked drafts, or finished examples.
Existing structured problems retain their recorded given number and operation. Legacy
variable/expression commands and values that cannot be represented by a preset remain intact.

## Current levels

Calibration and Coordinate Courier use multiplication; Precision Parking offers addition
for rotations and multiplication for centimeters; Turn Training uses subtraction; Warehouse
Pattern uses division; Battery Emergency uses addition; Cargo Delivery uses multiplication.
Variable Upgrade and the open championship retain their unrestricted expression commands
so their existing named-variable requirements remain achievable.

Precision Parking's original three-rotation guess is represented as `2 + 1` rotations.
Changing the student's number to `3` produces five rotations (120 cm with the current robot).
An added centimeter block reads `24 × ? cm`; entering `5` also produces 120 cm.

## Verification scope

Core tests cover all four operations, invalid operands, movement limits, draft compatibility,
configuration/storage validation, and portfolio expressions. Runtime and component tests
cover student input, successful movement from the computed result, saved/reloaded problems,
mission changes, immutable trial snapshots, read-only replay, and existing variable/loop behavior.
This extends the existing programming template; there is no template capability gap.

Validation: production Angular build passed with existing style-budget warnings; all 54 tests
across seven robot-template suites passed. Browser inspection confirmed fixed given/operator
labels and the editable operand on desktop and at 700 px. The repository architecture checker
still reports its two existing violations in `core/index.ts` and the Mystery Substance
render-quality service; this change does not modify either file.

Added: `core/move-math.ts`, `core/move-math.spec.ts`, and this document.
Modified: automation domain types, compiler, initialization/config validation, persistence
validation, runtime service and tests, robot project configuration, command editor TS/HTML/CSS,
lab help and component tests, evidence portfolio rendering, and the implementation note.
Existing execution/replay engines and variable-expression support are reused. No new dependencies,
breaking schema change, or specification deviation is required. No further phase is needed
for this request; future levels can supply different given numbers and operations through config.
