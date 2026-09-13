# Project #13 — Community Story Network

Status: introduction and mock showcase only. The publication will be hosted elsewhere; no host URL has been supplied. No publishing engine, uploads, student data, outreach tool, authentication, editorial-state workflow, or backend is implemented here.

## Defining product

Students become community reporters, interviewers, and storytellers. They research authentic stories outside the classroom and produce multimedia pieces for an ongoing student-produced public website with an audience beyond school. Each class adds to the same digital archive rather than creating a disposable site for a three-week block.

Coverage includes People → Events → Sports → Community → History → Organizations → Causes. The long-term opportunity is a recognizable school publication, with multiple bylined pieces per student over several years and potentially hundreds or thousands of stories from communities around the country.

## Missions

- Sports Reporting: cover a real tournament, competition, or event through research, interviews, statistics, and observation.
- Beyond the Scoreboard: explore an athlete’s training, setbacks, success, sacrifice, school balance, injury, travel, or competition.
- People Behind the Athlete: profile coaches, trainers, physical therapists, officials, parents, tournament directors, equipment specialists, and others who make athletics possible.
- Inside My Sport: research and interview an interesting or accomplished athlete, coach, trainer, journalist, or other figure in the sport.
- Voices of Our Community: preserve an older family or community member’s story and connect it to historical time and place.
- Community & Business Stories: explain the people, problem, purpose, and impact of a business, nonprofit, organization, entrepreneur, or community leader.

## Reporting and final product

Story Assignment → Background Research → Interview Plan → Real-World Contact → Reporting/Interview → Evidence & Media → Writing/Production → Editing & Fact Checking → Publication.

Teacher-supported outreach is part of the proposed process, especially for unfamiliar contacts. Quotes must be accurate, facts verified, context retained, media appropriately permitted, and subjects fairly represented.

Formats: written feature/profile, video story, recorded interview, podcast/audio story, tournament/event report, photo story, data/statistics story, short documentary, or multimedia combination. Each published page includes author credits, sources, media, related stories, topic/sport tags, and publication date.

The signature final is **Publish Day**. Students revise through an editorial process to **Ready to Publish**, then the new collection goes live. A launch event can supplement the release; public publication is the final action.

## Preview integration and reuse

- Canonical launch: `/projects/community-story-network`.
- Canonical showcase: `/projects/community-story-network/final-demo`.
- Standalone content: `public/projects/community-story-network/launch.html`, `showcase.html`, `publication.css`, and `cover.svg`.
- Existing project catalog, card renderer, and route host are reused.
- The catalog's optional `entryMode` now supports `preview`. It embeds static launch/showcase HTML by validated project ID and a fixed filename convention. It bypasses session resolution, runtime package loading, and persistence; unsupported activity views produce an explicit message.
- No template plugin, runtime schema, or publication capability was added. `publication-preview` is catalog metadata, not an executable template. Empty capability IDs intentionally request no runtime behavior.
- The iframe has an accessible title; the static pages provide their own semantic navigation, responsive layouts, skip links, visible focus, and native disclosure controls. Back-to-catalog links target the top window.
- All showcase people, quotes, source references, bylines, dates, and results are fictional. Audio/video/photo formats are explicitly labeled as illustrations without supplied recordings or photographs.
- Existing unrelated changes, including the Heist project, are retained. Project #13 is the supplied framework designation, not an assertion about the live catalog card count.

No capability gap is claimed for the requested preview. Public publishing remains deliberately outside scope. Next step, when available: connect the separately hosted publication URL.

## Validation

- Production Angular build passed, with existing stylesheet budget warnings in other projects.
- Eight focused tests passed across preview routing, catalog metadata, catalog links, and intro/launcher registration. Preview tests verify both pages, no session/package/persistence access, and explicit rejection of activity routes.
- All static page assets, links, anchor targets, unique IDs, and single main headings checked. Neither page contains scripts or forms.
- Both pages visually inspected in Chrome; the canonical showcase route also rendered successfully through the shared host.
- Repository architecture check remains blocked by existing findings in `core/index.ts` (dependency on `./templates`) and `projects/mystery-substance/lab-kit/render-quality.service.ts` (project-local service). Neither file was changed for this task.
