# Castle remaining lock concepts — one workshop at a time

The user requested brainstorming before redesigning the remaining locks, then authorized starting the build one lock at a time. The balance/piston lock, Patrol synchronizer, Rabbit courtyard workshop, clockwork fox rescue, and Moon-tower optics are implemented. The first four workshops also received an iterative graphics polish pass. Review the current results before starting another workshop; Bridge, Sluice, and Riverboat remain queued proposals.

The researched graphics and animation proposal is in [2.5D art and animal escapes](CASTLE_2_5D_ART_DIRECTION.md), including free tools, scene composition, animal behavior, and the staged cage-opening sequence.

## Shared visual and interaction direction

Use the first lock's Three.js materials, beveled brass and steel, depth, lighting, shadows, readable labels, and visible connections between each control and its release. Give each workshop one spacious machine and a separate equipment tray. Selecting a part highlights that part and its controls. A correct physical arrangement releases the lock automatically, with the relevant movement visible. Preserve direct-entry authoring previews, grade-specific mathematics, exact or configured success rules, saved arrangements, reduced motion, pause, and keyboard/tap equivalents. Renderers remain separate from the existing domain evaluators.

Every proposed scene must include a visible animal cage whose door opens when the puzzle is solved. Show a continuous mechanical connection from the puzzle to the cage latch: a cable, rod, gear train, or lever. Give the cage room beside or behind the mechanism, keep the active puzzle large, and show the animals waiting inside. The success sequence is visible and automatic: the mechanism aligns, the latch withdraws, the door opens fully, and the animals react and leave. Keep the open cage visible afterward. Reduced motion must still show the open door and released animals clearly.

Preserve the existing rescue groups and counts: six rabbits, four foxes, and two owls. Cage openings in patrol and route workshops are proposed staging or holding-enclosure actions; animal assignments remain to be confirmed and must not add duplicate rescue awards. A bridge or boarding route must be ready before animals exit onto it. Direct-entry previews can demonstrate the opening without recording assessment completion.

## Proposed sequence

| Workshop | Proposed machine and interaction | Visible release |
| --- | --- | --- |
| Patrol synchronizer — implemented | A hand crank advances large overlapping brass timing discs. Each disc has a release hole, a period label, and a clear arrival marker. All discs remain visible in a shallow cutaway. | At the first positive shared alignment, a spring pin passes through every disc. Its cable closes the lookout shutter and withdraws the holding-cage bolt; the door swings open and an animated fox walks, then runs outside. |
| Rabbit courtyard workshop — implemented | Place and rotate substantial toothed sectors around a broken axle. A ghost outline shows the selected sector; gaps remain visible and overlaps cannot seat. | Completing exactly one cog lets it mesh with the drive and wind the rabbit cage's barred door upward. Six articulated rabbits leave in staggered hops once the opening is clear. |
| The clockwork fox rescue — implemented | Fit the missing cogs into a visible compound gear train using the tooth-count clues, then turn a physical crank. The output drum makes the speed ratio visible. | Correct gearing and the required drum travel trip the existing mechanical rescue sequence. The final linkage draws back the fox cage bolt, the door swings open, and the foxes trot out. |
| Moon-tower optics — implemented | A dark stone chamber with brass mirror mounts and a visible moonbeam. Drag a mirror handle or rotate by its marked angle notches; each reflection updates immediately. | Light reaches the receiver and charges its release. A connected lever draws back the owl cage latch, the grille rises, and the owls spread their wings and fly out. |
| Bridge engineering workshop | One bridge scene with two connected stages: X/Y lead screws dock an anchor carriage at the coordinate socket; cable reels then hook across the measured route. | A correctly positioned anchor and exact cable length tension the spring, withdraw its pin, and lower the bridge. A linked catch opens the holding cage once the bridge is fully down, letting the animals cross. Short cables do not reach; long cables visibly sag. |
| Sluice workshop | Pour measured vessels into a transparent graduated chamber with a float and attached release pin. Offer measured removal for reversible trials. | The required water level aligns the float's cutout with the bolt, opening the sluice. The same linkage releases the nearby cage door so the animals can reach the cleared path. Underfilling and overfilling leave the slot visibly off center. |
| Riverboat workshop | Two labeled ingredient pumps feed one visible mixing tank. A recipe indicator and volume float show the two independent conditions. | The exact ratio clears one interlock and the total volume clears the other. Together they open the fuel valve and release the boarding cage latch; its door opens, the animals board, and the boat mechanism starts. |

## Implemented first: Patrol synchronizer

Recommended composition: two large overlapping timing discs in one iron frame, with a single horizontal spring pin shown in cutaway. Place the animal cage alongside the frame and show the cable running from the release pin to its door bolt. Higher grade configurations may add a third disc or starting offsets. Keep the axle planes shallow enough that every hole and alignment mark is readable.

1. Grab the crank, or use one-tick/keyboard controls. One click advances the shared tick counter and turns each disc according to its configured period.
2. Watch each hole approach the marked release line. A small trail of tick marks can help compare recurring arrivals without obscuring the mechanism.
3. The crank's first click arms the latch, so the starting zero alignment cannot count as a solution.
4. At the first positive shared alignment, the spring pin visibly travels through the lined-up holes and releases the shutter automatically. Its cable pulls the cage bolt clear; the cage door swings open and the animals leave. The counter stops at the alignment that triggers this opening, preserving the existing first-alignment requirement.
5. Rewind resets the same mechanism for another attempt; it does not discard another workshop's saved work.

The overlapping-disc composition is implemented in Three.js with a connected spring pin, drawbar, cable, cage latch, hinged door, and animated glTF fox. See [the Patrol implementation and verification](CASTLE_PATROL_2_5D_WORKSHOP.md). The fox occupies a holding enclosure; this scene does not add a rescue award.

## Status

**Moon-tower optics and the first-four-level polish are ready for review.** See [Owl implementation and verification](CASTLE_OPTICS_2_5D_WORKSHOP.md) and [iterative visual review](CASTLE_FOUR_LEVEL_VISUAL_POLISH.md). Bridge, Sluice, and Riverboat remain proposals; Bridge is next only when requested. Earlier work is documented in [Fox](CASTLE_FOX_2_5D_WORKSHOP.md), [Rabbit](CASTLE_RABBIT_2_5D_WORKSHOP.md), [Patrol](CASTLE_PATROL_2_5D_WORKSHOP.md), and [Piston counterweights](CASTLE_PISTON_COUNTERWEIGHTS.md).
