# Project homepage update

The homepage describes reusable project types using the supplied learning and engagement copy. Existing demo names appear over their cover images. Engineering / Design Challenge and Research Symposium / Expert Conference have images, descriptions, a Not built yet label, and inactive links. Historical Forgery Hunt / Living Artwork Restoration uses the built Cartographer’s Vault demo with its existing image and working link; there is no duplicate unbuilt restoration card.

Homepage-only configuration lives in `src/app/projects/project-home-catalog.ts` and `project-type-overviews.ts`. The existing runtime catalog and project packages are unchanged by this update. Engineering / Design Challenge is an unbuilt race-car design and testing concept with its own cover image and inactive link. The built From Sundial to Sun Monument demo has its original cover and working link under the distinct Astronomy / Calendar & Monument Building type. Its description connects the solar system, Sun/Moon/star positions, celestial alignments, and the history of calendar making. The Cartographer’s Vault illustrates Historical Forgery Hunt / Living Artwork Restoration; The Midnight Menagerie illustrates the heist / break-in format.

Modified: the homepage component TypeScript, HTML, SCSS, and component test. Added: the two homepage configuration files, three cover images, and these notes. The component test checks active demo links, inactive concept cards, images, and the distinction between type descriptions and demo names, including the separate race-car and monument cards.

Validation: production Angular build and the targeted homepage/catalog tests verify the layout, demo links, and inactive cards. The homepage test also verifies restoration appears once, linked to The Cartographer’s Vault. Existing stylesheet budget warnings remain. The architecture check reports unrelated violations in `core/index.ts` (dependency on `./templates`) and `projects/mystery-substance/lab-kit/render-quality.service.ts` (service inside project content).

No core contract changes, specification deviations, or runtime capability additions. The unbuilt concepts remain homepage content only. No further implementation phase is required for this request.

## Generated cover assets

Created with the built-in image generation tool and copied into the project:

- `public/project-types/historical-forgery-v1.png` (unused concept art; the homepage uses the existing Vault cover)
- `public/project-types/research-symposium-v1.png`
- `public/project-types/race-car-design-v1.png`

Final historical forgery prompt:

> Create one landscape 16:9 painterly cinematic illustration for an educational project homepage card: Historical Forgery Hunt / Living Artwork Restoration. In a warm museum conservation studio, a large ornate gold-framed painting of a Renaissance harbor becomes a luminous doorway into that historical harbor, small student investigators seen from behind examining a detail with magnifying glass, brushes and historical reference papers on a foreground desk. The painting includes a deliberately out-of-period modern bicycle as a clue. Atmospheric teal shadows, antique gold light, rich oil-painted texture, inviting mystery and research, clear composition legible at thumbnail size. No text, labels, letters, logos or watermark.

Final research symposium prompt:

> Create one landscape 16:9 painterly cinematic illustration for an educational project homepage card: Research Symposium / Expert Conference. An inviting school exhibition hall with students presenting research posters and discussing evidence with peers, foreground poster easel with elegant charts and diagrams without legible text, notebooks and a small scientific model on a table, a presentation stage in the background. Warm antique gold daylight, deep teal accents, softly textured storybook realism, polished composition clear at thumbnail size. No text, labels, letters, logos or watermark.

Final race-car engineering prompt (built-in image generation tool):

> Create one landscape 16:9 painterly cinematic illustration for an educational project homepage card: Engineering / Design Challenge. Students design and test a small model race car in a school engineering workshop. In the foreground a carefully built wheeled model race car sits on a wooden workbench beside a ruler, calipers, spare wheels and a sketch showing dimensions without text. Behind it, students measure and time a second model car on a short test track. The scene should clearly communicate designing, building, testing and improving a race car. Warm daylight, deep teal and gold accents, softly textured realism consistent with an educational adventure game library. Clear composition readable at thumbnail size. No text, labels, letters, logos or watermark.
