# Tabletop arena and moving course actors

The playable board now follows the supplied September 12 tabletop reference: cream tiles,
plain square interiors, lettered columns, numbered rows, muted colored perimeter walls,
bolted corners, steel obstacles, wooden cargo crates, dashed start/delivery/goal zones, and
a small ivory robot with a cyan lens. Current courses use `visualTheme: 'tabletop'`.
Existing course dimensions and learning measurements remain intact; the two new advanced
courses use a 400 × 400 cm, ten-by-ten board with 40 cm squares.

The repeated tick marks, small crosses, and fractional labels inside each square were removed
to make the grid easier to count. Perimeter coordinates, goal markings, patrol routes, and the
math-based movement blocks remain available.

## Rendering and animation

`tabletop-board.ts`, `tabletop-props.ts`, and `tabletop-renderer.ts` use Phaser 4 Graphics,
Text, Scene, cameras, and the existing lazy canvas host. No reference-image background,
generated bitmap, DOM sprite, external AI service, or physics engine controls the board.
The renderer draws geometry from course configuration and positions the learner robot from
recorded samples. Treads follow travel distance; cargo and delivered markers follow sample
state. Follow, overview, zoom, reduced motion, resizing, scene disposal, and context-loss
fallback remain supported. Goal completion comes from the recorded result at its endpoint.

The permanent block library stays on the right of the program. Current Move blocks retain
the mission-supplied operation and given operand; students fill the second operand. The library
previews that formula, and newly generated completed examples use the same math block format.
Variable-based missions retain their expression blocks and saved historical trials retain their
original command snapshots.

## Reusable capability: course actors

The optional `CourseDefinition.actors` extension adds a deterministic waypoint controller:

- Common fields: `id`, `label`, `path`, `speedCmPerSecond`, `patrol` (`ping-pong` or `loop`),
  optional `pauseSeconds` at every waypoint, and optional `phaseSeconds` for the starting phase.
- `kind: 'robot'` uses `radiusCm`; `kind: 'barrier'` uses `widthCm` and `heightCm`.
- Path coordinates are object centers in centimeters. Gates remain axis aligned. The controller
  cycles through configured waypoints; it is scripted patrol behavior, not an LLM agent.
- At most six actors, eight waypoints each, and speeds of 1–80 cm/s. Validation checks IDs,
  finite numbers, collision dimensions, arena bounds, nonzero routes, and a clear player start.
  Actor courses require the tabletop renderer so hazards cannot silently disappear.

`core/course-actors.ts` supplies the same pose function to execution, Phaser, and the SVG map.
`executeRobot` checks movement and elapsed waits, turns, pickup, and drop-off time against
actor bodies. Collision sampling is at most 25 ms apart and limits actor travel to 0.5 cm per
check. A moving-actor collision stops the run, adds the collision battery cost within capacity,
and records the actor name, contact timestamp, and a WAIT/route revision hint. Collision halts
moving-actor courses even if the older static-wall `stopOnCollision` option is false.
Cargo actions interrupted by an impact do not complete.

Each run starts actor time at zero plus its configured phase. During replay, actor positions
use `ReplaySample.timeMs`, so pause, speed changes, seeking, reset, and repeat runs agree.
Before a run, Phaser displays a clearly labeled patrol preview; reduced-motion mode freezes
that preview. The map shows initial positions until a run is loaded and then follows the same
recorded timeline. Coordinates and route/speed descriptions remain available without graphics.

## Advanced missions and reference programs

| Mission | Moving hazards | Verified reference route |
| --- | --- | --- |
| Patrol Crossing | Scout moves at 40 cm/s across the northbound route | WAIT 4 s, MOVE 280 cm |
| Moving Gates | Same scout plus a 20 cm/s sliding gate with 1 s endpoint pauses | WAIT 4 s, MOVE 280 cm, TURN right 90°, WAIT 4 s, MOVE 240 cm |

The corresponding direct crossings collide. Students can solve timing or choose another
safe route. New completed examples run through the same compiler and execution engine,
and include distance and timing math evidence. Earlier missions keep their static geometry.

## Compatibility and verification

This is an optional, backwards-compatible addition to the current 1.0 automation contract.
Existing saved trial/course snapshots are immutable, and legacy workshop/default renderers
remain available for them. Runtime loading merges missing mission drafts into a valid saved
state instead of resetting existing programs, trials, or completed work. Imported snapshots
validate actor data and their renderer capability. Existing project enrollment/storage keys
stay stable for this local additive update.

Tests cover waypoint pauses/reversal/loops/phases, deterministic successful and failed runs,
contact position, wait/turn/pickup/drop-off impacts, moving rectangle bounds, malformed
actors, saved snapshots, old courses, additive draft migration, and explicit graphics fallback.
Browser verification covers the live Phaser board, fixed library, advanced mission selection,
patrol preview, and recorded replay (10.8 s seek: learner at 60,176; scout at 132,180;
gate at 180,324 cm). The 390 px phone layout retains the board and the library on the right of
the code pane, including its mission formula previews. Temporary viewport overrides were reset.
All 65 tests in nine programming/automation suites pass. The production build passes with
existing stylesheet budget warnings in other project templates. The architecture check retains the two pre-existing
failures in `core/index.ts` and the mystery-substance render-quality service.
