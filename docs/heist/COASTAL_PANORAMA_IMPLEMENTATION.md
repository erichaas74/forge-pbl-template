# Coastal panorama: A morning on the shore

## Accepted scene / scope

Only Shadow Gallery's first coastal commission is being extended. Existing eight-session mapping and assessed collection remain intact. Students observe a painting with three inconsistencies, enter a historically supported world without the forgery, click actual people, approach, ask about their lives and work, inspect sources, return in the same direction, and repair the painting. The boat builder explains construction only when asked. Three proposed repairs: horses, iron nails/screws on the canoe, wheat replacing maize in the harvest (avoids confusing potatoes with historically present sweet potatoes).

## TEMPLATE_CAPABILITY_GAP

Requested: free panorama exploration, person-anchored approach video, open interview, source inspection, three independent repairs.
Existing guided encounters have predetermined views/questions and one object. They cannot provide this interaction without extending a reusable capability.
Implementation: optional `panorama.encounter.v1` configuration in restoration preview weeks; reusable shared panorama UI, pure transitions, validation, interview adapter boundary, and scoped existing preview persistence. Only configured work IDs select it. No project-name branches or assessed completion.

Video generation is blocked by the connected Runway Free plan (no available video models). No purchase is authorized or made. The approach slot supports real captioned video; while absent, the UI explicitly labels a camera-move preview and offers continuation. This is not passed off as generated character footage.
Live AI needs a server endpoint. Until configured, the UI explicitly labels authored interviews as scripted and AI disconnected. No fake AI, provider key in client, or unconfigured network call. User asked about an existing endpoint asynchronously. The unrelated weekly AI Tutor remains disconnected.

## Scene map

Studio → enter picture → drag/key-pan → click canoe maker or food grower → camera approach/video slot → welcome → interview → inspect object and provenance → return to panorama → return to painting → independently repair three areas → compare/export/exhibit.

Initial world: fictional community on Hispaniola in early 1492, before European arrival there. Character names are roles, avoiding invented historical identities. Speech is an English dramatization. Clothing/layout are illustrative, not recovered evidence. No Europeans, horses, wheat or metal fasteners appear in the historical panorama.

Research references:
- https://academic.oup.com/past/article/271/1/52/8231030 — before 1492 canoe building with stone axes, shell gouges and fire. Do not generalize later colonial repair descriptions to all Taíno communities.
- https://siba.web.ox.ac.uk/material-culture-and-cultural-practices — surviving Lucayan canoe/axe/paddle evidence and historical descriptions; geographically identified as comparative evidence.
- https://www.floridamuseum.ufl.edu/histarch/research/haiti/en-bas-saline/material-remains/ — archaeological crop/tool evidence from Haiti.
- https://www.nps.gov/places/taino-settlement.htm — Taíno travel, foods, and materials.
- https://openstax.org/books/us-history/pages/2-4-new-worlds-in-the-americas-labor-commerce-and-the-columbian-exchange — direction of wheat and horse introduction.

## Media provenance

Built-in image generation (not CLI) created the correct panorama and a matched forgery variant. Final assets are copied into `public/projects/shadow-gallery/coastal-v1/`. Prompts: correct wide 3:1 Hispaniola early-1492 community with canoe maker left, food grower right, dugout/stone/shell tools, manioc and maize; no anachronisms. Forgery edit preserves framing and people, adding central horses, a metal-fastened canoe patch, and wheat in the maize basket. Runtime composites only those three regions over the correct base to keep all other pixels identical.

## Delivery and verification

Local preview: http://127.0.0.1:4369/projects/shadow-gallery/experience?lesson=1

Run `node docs/heist/preview-coastal-scene.mjs` to serve `output/shadow-coastal-build/browser` on localhost only. This is separate from the older 4367 weekly preview. No deployment took place.

Added shared capability files in `src/app/shared/panorama/`: models, pure engine, configuration/state validation, interview adapter contract with explicit scripted implementation, painting renderer, scene UI (TypeScript/HTML/SCSS), canvas export, domain tests and component tests.

Modified only restoration weekly models/validation/runtime/UI/test files and this project's optional preview configuration. Scene state is an optional field within the existing tenant/class/project/version/actor/team/attempt-scoped preview adapter. Older saves without it remain valid. Legacy work definitions and assessment behavior remain unchanged. The exhibition renders and exports the current three-repair scene and collected scene sources; old example captions are not seeded onto this new scene. Existing user captions are preserved.

Added project assets:
- `public/projects/shadow-gallery/coastal-v1/panorama.png` — 2172×724, 3,234,697 bytes.
- `public/projects/shadow-gallery/coastal-v1/forgery.png` — 2172×724, 2,899,476 bytes.

Added `configure-coastal-panorama.mjs` (content regeneration) and `preview-coastal-scene.mjs` (local static server). If regenerating all weekly content using the earlier `configure-shadow-weeks.mjs`, run the coastal configurator afterward to restore this scene's metadata. No shared lesson catalog was rewritten during this scene build.

Tests: **9 files / 37 tests passed** (`output/shadow-coastal-tests.log`). Covers all three independent image layers and undo, original comparison, bounds/references/media validation, explicit scripted/AI distinction, asked-only construction response, canceled late replies, scene/source/repair/conversation persistence and reload, legacy restoration behavior, existing eight-session mapping and exhibition access.

Production build passed in 26.705 seconds (`output/shadow-coastal-build.log`). No new component style-budget warning. Existing unrelated component-budget warnings remain.

Architecture check (`output/shadow-coastal-architecture.log`) still reports two unchanged pre-existing violations: `core/index.ts` importing `./templates`, and `projects/mystery-substance/lab-kit/render-quality.service.ts` declaring a project service. Neither was changed. Scoped tracked diff whitespace check passed.

Browser verification (Chrome, localhost): entered the correct panorama with no forgery layers; clicked both actual people; viewed clearly labeled pending-video approach; asked construction and harvest questions; inspected source imagery/provenance in a native keyboard-accessible dialog; saved a source; returned to the same heading (65); independently applied all three repairs, then undid one (visible forged layers 0 → 1); restored picture PNG download confirmed; exhibition included the panorama and HTML export reported success; interviews and repairs survived reload/session navigation. Checked 1366×768, 768×1024, and 390×844 without horizontal overflow. Phone suggested questions have 44px touch targets. Temporary viewport override reset. No browser console errors. Test repairs were returned to original details, leaving the painting ready to investigate; sample interview history remains available.

Remaining capability gaps are explicit: Runway account plan blocks generated video; no live AI endpoint was supplied. `PanoramaPerson.approach` accepts actual local MP4/WebM plus captions/transcript. A host can provide `PANORAMA_INTERVIEW` using an authenticated server adapter; current mode remains `scripted`, with no AI claim or outbound interview request. The AI Tutor planning sidebar remains separate and disconnected. Only the first coastal painting has this new experience; later paintings retain their existing weekly activities.
