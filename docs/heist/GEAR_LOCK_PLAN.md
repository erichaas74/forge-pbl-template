# Gear Restoration Lock

## Design before implementation

Replace the fox-pen combination with an independent, full-screen Phaser workshop, entered through Solve lock. Preserve the balance workshop and outside-gate spawn. The map waits while the student works.

Two removable cogs repair a compound train. A 24-tooth drive meshes with cog A. A shares its axle with a fixed 12-tooth pinion, which meshes with cog B. The sockets slide along rails to mesh different diameters. Tooth count determines pitch radius and angular velocity; adjacent gears turn oppositely, coaxial gears turn together. Printed numbers stay upright.

Grade-five calibration: A has 3/2 as many teeth as the drive; B has twice the pinion's teeth; calculate crank turns to give the output one full turn. The solution is A=36 teeth, B=24 teeth, crank=3 turns. Inventory contains plausible decoys. The evaluator checks the two fractional size constraints and exact rational output rotation, independently of animation. A wrong trial turns the actual train, then stalls the latch with a specific mechanical/math diagnosis.

Correct calibration triggers a paced release: drive and belt -> ball down a rail -> hammer strikes peg -> suspended counterweight descends -> domino chain -> pen gate rises. Students can replay or skip the animation. Pausing freezes it. Reduced motion uses a static completed tableau and explanatory text.

## Boundaries

Reusable `gear-lock` domain contract, strict package validator, evaluator registry entry, bounded runtime input, independent lazy Phaser renderer and accessible Angular controls. The existing persistence adapter and command envelope remain authoritative. No multiplayer networking. The release run is a presentation timeline composed from named modules, not an additional scoring engine.

No new core schema: additive escape puzzle union capability. Existing number, code, timing, balance and balance-lock packages remain supported. New castle curriculum version 3.3.0 isolates saves.

## Verification planned

Exact gear ratio and direction tests; rejection of reused/invalid cogs, bad fractions, unreachable configurations; non-drag interaction and scene teardown tests; full eight-step runtime path and restored gear answers; Angular production build; desktop drag/drop and release run inspection, phone controls and overflow check.
