# Delivery arena graphics

Launch artwork: `public/robot-delivery/arena-launch-v2.png`.

Created with the built-in image generation tool. Original preserved in the generated-images directory; a project-owned copy supplies both the launch page and catalog card. The original SVG is retained as an earlier asset.

## Final generation prompt

Use case: stylized-concept. Asset type: exciting landscape launch artwork for a Grade 5 Robot Delivery Code Lab educational video game, 1536x1024 composition. Create polished high-end stylized 3D game key art of a small friendly autonomous delivery rover in a futuristic warehouse training arena. The robot has a rounded teal/turquoise chassis, ivory top armor, chunky black rubber side wheels, a dark navy visor with two bright cyan rectangular eyes, small amber lamps, and a small orange shipping crate securely carried in its rear cargo tray. Hero robot large in foreground, viewed from a dynamic elevated three-quarter camera angle, driving along luminous cyan route markers on a dark navy modular metal tile floor. In the background show neatly stacked orange shipping crates on blue-gray industrial storage racks and a circular golden-orange glowing parking pad, with a second green-lit delivery platform. Details: beveled floor panels, bolts, subtle scuffing, hazard-striped shelf bases, soft robot underglow, restrained atmospheric lighting. Energetic, inviting, playful engineering adventure suitable for students, crisp premium game render rather than flat clip art. Cohesive palette dark navy/slate steel, teal and cyan, warm amber/orange accents, ivory robot trim. Maintain clear readable shapes that can be matched by a top-down playable course renderer. Strong centered focal subject so image works as a wide hero or cropped catalog card. No words, no letters, no logos, no watermark, no weapons, no people, no interface overlays.

## Playable course

The reusable course renderer matches the launch art with navy metal floor tiles, teal/ivory robot armor, cyan eyes and headlights, orange crates, steel storage racks with hazard stripes, amber parking pads, green delivery zones, and luminous travel paths. Objects render from existing world coordinates. The course remains top-down so grid distances and headings stay usable for student calculations. Delivery pads show recorded cargo delivery state. SVG definition IDs are unique per renderer instance.

The graphics are presentation-only: course geometry, collision rules, scores, student saves, and replay timing use the existing engine. The course panel includes a live distance readout and delivery counter. There are no decorative animation loops or new graphics dependencies.

The existing `robotics` presentation theme now features the complete 3:2 launch artwork, with a dark game frame and compact evidence captions. It avoids the default overlapping paper treatment, while other project themes retain their presentation styles.
