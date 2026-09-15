# Castle scene UI audit — September 15, 2026

The scene is the activity. Questions, challenge instructions, hints, and trial explanations belong in the adjacent AI Tutor panel. This supersedes earlier Castle concepts that proposed camera preset buttons or workshop options menus.

## Changes

- Removed the duplicate workshop picker, saved-setup overlay, and repeated instruction bands. The shared lesson navigation remains the way to change workshops.
- Moved grade selection, reduced motion, trial history, and model credits to the sidebar. The tutor remains explicitly disconnected; no live AI integration or assessment was added.
- Removed alternate camera controls and options menus from Patrol, Rabbit, Fox, Owl, and Bridge. Their existing automatic camera movement follows the mechanism and escape.
- Removed Balance's How it works and Save trial header buttons, repeated working-scale bar, and drag-direction text. Scale selection, weight placement, pause, reset, and expansion remain available.
- Replaced redundant Rabbit notch, Owl angle, and Bridge coordinate dropdowns with measured outputs alongside their existing adjustment buttons. Drag interactions remain intact.
- Reduced in-scene narration to accessible live announcements and retained physical measurements. Gear tooth-count challenge clues moved to the tutor.
- Simplified Sluice and Riverboat to the apparatus and directly available, labelled manipulation buttons. Their later 2.5D upgrades are outside this audit.

## Verification

- Castle production build passes. Initial bundle is 546.79 kB; the existing 500 kB advisory budget warning remains.
- Existing Heist/launcher suite: 280 tests passed. After final label changes, 37 targeted layout, component, and eight-lesson workspace tests passed, including five new menu-removal checks.
- Visually inspected all eight activities. Checked Rabbit at 390 × 844 and corrected the control tray height so its buttons are fully visible. Verified Patrol crank/rewind operation; saved completed animal scenes still display their released state.
- Refreshed the loopback preview on port 52102 and verified the copied final bundle hashes. A full disk interrupted one copy; obsolete generated Castle preview bundles were removed and the complete build was recopied. No project source, public assets, or saved drafts were deleted.
- No deployment, assessment changes, or other project edits.

Build/test evidence: `output/castle-minimal-ui-build.log`, `output/castle-minimal-ui-tests.log`, and `output/castle-minimal-ui-final-tests.log`.
