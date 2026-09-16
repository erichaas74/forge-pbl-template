import {
  TaskGuideComponent
} from "./chunk-FBZ4EUOY.js";
import {
  ProjectCatalogService
} from "./chunk-XTAQPZPK.js";
import {
  RouterLink
} from "./chunk-X5IBMLI3.js";
import "./chunk-SKMWBOWD.js";
import "./chunk-ENCFJY7U.js";
import {
  Component,
  computed,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-E2VJWGUE.js";
import "./chunk-GOMI4DH3.js";

// src/app/projects/project-type-overviews.ts
var projectTypeOverviews = {
  "engineering-design": {
    title: "Engineering / Design Challenge",
    description: "Students showcase learning by designing and building a race car, measuring its performance in test runs, analyzing data, and using evidence to defend their design decisions. Engagement comes from testing a car they built, learning from failed trials, improving the design, and putting it to the test in a final race or performance challenge."
  },
  "astronomy-calendar-monument": {
    title: "Astronomy / Calendar & Monument Building",
    description: "Students demonstrate learning by exploring the solar system, observing the positions and patterns of the Sun, Moon, and stars, and researching how people throughout history developed calendars. They apply their observations and historical research to build a monument that marks time through celestial alignments. Engagement comes from experimenting with a changing sky, testing shadows and alignments across days and seasons, and seeing their own monument connect astronomy with the human history of timekeeping."
  },
  investigation: {
    title: "Investigation / Mystery Lab",
    description: "Students demonstrate mastery by gathering evidence, identifying patterns, developing competing explanations, and defending a conclusion. Engagement comes from not knowing the answer at the beginning and gradually uncovering the mystery through experiments, clues, documents, or observations."
  },
  "evidence-case": {
    title: "Evidence / Case File Investigation",
    description: "Students showcase learning by constructing an organized case from sources, evidence, maps, data, artifacts, or witness accounts and presenting a supported claim. The case-board format makes learning feel like detective work as students decide what evidence supports, contradicts, or changes their theory."
  },
  "exhibit-hall": {
    title: "Museum / Exhibit Hall / Showcase",
    description: "Students prove learning by curating artifacts, models, explanations, graphics, and evidence into an exhibit that teaches an audience. Engagement comes from seeing everyone's work become part of a shared digital museum or exhibition rather than simply turning in an assignment."
  },
  "history-live-broadcast": {
    title: "Broadcast Studio / Live Newsroom",
    description: "Students demonstrate learning by researching events or issues, gathering evidence, interviewing sources or historical characters, and turning that work into reports, analysis segments, graphics, and a polished broadcast. Engagement comes from authentic newsroom roles, live or simulated breaking events, deadlines, and the feeling that students are reporting from inside the story rather than just summarizing it afterward."
  },
  "debate-studio": {
    title: "Debate / Trial / Hearing",
    description: "Students showcase mastery through claims, evidence, counterclaims, questioning, rebuttals, and oral defense. Engagement increases because opposing teams can challenge their reasoning and the final verdict or decision is not predetermined."
  },
  "journey-replay": {
    title: "Exploration / Voyage / Route Mission",
    description: "Students demonstrate learning by using maps, calculations, research, and evidence to choose routes and defend decisions during a journey. New locations, hazards, discoveries, and choices make the project feel like an evolving expedition."
  },
  "simulation-decision": {
    title: "Trading / Resource Decision Simulation",
    description: "Students prove learning through repeated calculations, economic decisions, resource management, data analysis, and explanations of their strategy. Changing prices, routes, shortages, events, and competitors make every decision affect what happens next."
  },
  "live-strategy-league": {
    title: "Live Competition League",
    description: "Students showcase mastery through recurring rounds where academic calculations or decisions determine team performance and leaderboard position. Students can improve their strategy throughout the project and finish with a competitive championship round."
  },
  "programming-automation": {
    title: "Robot Coding / Automation Challenge",
    description: "Students demonstrate learning by planning movements, using measurements and variables, coding, debugging errors, and explaining the efficiency of their solution. Engagement comes from immediately seeing a robot respond to their commands and eventually competing on a shared course or mission."
  },
  "crisis-operations": {
    title: "Crisis Operations Center",
    description: "Students showcase learning by analyzing incoming maps, data, reports, probabilities, and stakeholder information before making and defending group decisions. A changing command center with alerts, maps, video reports, NPC activity, and unexpected developments creates urgency and makes teamwork important."
  },
  "competition-show": {
    title: "Semi-Live Game Show / Tournament",
    description: "Students showcase learning through recorded mini-rounds, evidence challenges, rapid-response tasks, and a final live tournament or game-show round. Scores, buzz-in questions, short competitions, highlight reels, and a championship ending keep energy high throughout the project."
  },
  heist: {
    title: "Heist / Break-In Challenge",
    description: "Students demonstrate mastery by applying academic knowledge to operate locks, identify correct evidence, navigate routes, and solve interconnected puzzles. Engagement comes from manipulating mechanisms and discovering that academic knowledge directly unlocks the next part of the environment."
  },
  "publication-preview": {
    title: "Community Story Network",
    description: "Students showcase learning by researching real people or events, conducting interviews, verifying information, and publishing polished stories, podcasts, videos, or reports. Engagement comes from creating work about athletes, families, businesses, organizations, and community events for an authentic audience."
  },
  "research-symposium": {
    title: "Research Symposium / Expert Conference",
    description: "Students demonstrate mastery by becoming knowledgeable about a focused question, synthesizing credible research, and defending evidence-based conclusions. Students develop ownership by becoming the class expert and participating in presentations, panels, poster sessions, questioning, and peer discussion."
  },
  "time-repair": {
    title: "Time Repair / Timeline Restoration Mission",
    description: "Students prove learning by identifying what is wrong in a corrupted historical or literary timeline, researching what actually happened, and using evidence to determine what must be repaired. Engagement comes from entering disrupted historical events or book worlds and progressively restoring the correct timeline."
  },
  "narrative-studio": {
    title: "Branching Narrative / Story Studio",
    description: "Students demonstrate learning by researching a setting, developing characters, and writing connected story paths with meaningful choices and consequences. Engagement comes from playtesting one another\u2019s stories, revising the experience, and publishing an adventure an audience can explore."
  },
  "historical-forgery": {
    title: "Historical Forgery Hunt / Living Artwork Restoration",
    description: "Students demonstrate learning by examining artworks for historical inaccuracies\u2014wrong technology, clothing, architecture, plants, animals, people, geography, customs, or objects\u2014then researching the time period and using evidence to explain exactly why the image is a forgery. Engagement comes from students entering the artwork\u2019s setting as an immersive historical environment, interacting with people and objects to gather clues, then returning to the present to repair the forged artwork so every major detail accurately represents the period."
  }
};

// src/app/projects/project-home-catalog.ts
var homepageOverrides = {
  "shadow-gallery": { typeId: "historical-forgery" },
  "calendar-monument": { typeId: "astronomy-calendar-monument" }
};
var plannedTypes = [
  { id: "engineering-design", coverImage: "/project-types/race-car-design-v1.png" },
  { id: "research-symposium", coverImage: "/project-types/research-symposium-v1.png" }
];
function createProjectHomeCards(projects) {
  return [
    ...projects.map((project) => {
      const override = homepageOverrides[project.id];
      const overview = projectTypeOverviews[override?.typeId ?? project.template.id];
      return {
        id: project.id,
        projectType: overview?.title ?? project.projectType,
        description: overview?.description ?? project.description,
        demoTitle: override?.unavailable ? void 0 : project.title,
        grade: project.grade,
        coverImage: project.coverImage,
        symbol: project.symbol,
        route: override?.unavailable ? null : project.route,
        status: override?.unavailable ? "Not built yet" : project.status
      };
    }),
    ...plannedTypes.map((type) => ({
      id: type.id,
      projectType: projectTypeOverviews[type.id].title,
      description: projectTypeOverviews[type.id].description,
      coverImage: type.coverImage,
      route: null,
      status: "Not built yet"
    }))
  ];
}

// src/app/features/project-home/project-home.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ProjectHomeComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(project_r1.projectType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(project_r1.description);
  }
}
function ProjectHomeComponent_For_14_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 10);
  }
  if (rf & 2) {
    const project_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", project_r2.coverImage, \u0275\u0275sanitizeUrl);
  }
}
function ProjectHomeComponent_For_14_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(project_r2.symbol);
  }
}
function ProjectHomeComponent_For_14_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong")(1, "span", 16);
    \u0275\u0275text(2, "Demo project");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(project_r2.demoTitle);
  }
}
function ProjectHomeComponent_For_14_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const project_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(project_r2.grade);
  }
}
function ProjectHomeComponent_For_14_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1, "\u2192");
    \u0275\u0275elementEnd();
  }
}
function ProjectHomeComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 7)(1, "a", 8)(2, "div", 9);
    \u0275\u0275conditionalCreate(3, ProjectHomeComponent_For_14_Conditional_3_Template, 1, 1, "img", 10)(4, ProjectHomeComponent_For_14_Conditional_4_Template, 2, 1, "span", 11);
    \u0275\u0275conditionalCreate(5, ProjectHomeComponent_For_14_Conditional_5_Template, 4, 1, "strong");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 12);
    \u0275\u0275conditionalCreate(7, ProjectHomeComponent_For_14_Conditional_7_Template, 2, 1, "p", 13);
    \u0275\u0275elementStart(8, "h2");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 14);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, ProjectHomeComponent_For_14_Conditional_14_Template, 2, 0, "span", 15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const project_r2 = ctx.$implicit;
    \u0275\u0275attribute("data-project-id", project_r2.id);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", project_r2.route);
    \u0275\u0275attribute("role", project_r2.route ? null : "link")("aria-disabled", project_r2.route ? null : "true")("aria-label", project_r2.route ? "Open demo: " + project_r2.demoTitle : project_r2.projectType + " \u2014 Not built yet");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(project_r2.coverImage ? 3 : 4);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(project_r2.demoTitle ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(project_r2.grade ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(project_r2.projectType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(project_r2.description);
    \u0275\u0275advance();
    \u0275\u0275attribute("data-release-status", project_r2.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(project_r2.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(project_r2.route ? 14 : -1);
  }
}
var ProjectHomeComponent = class _ProjectHomeComponent {
  projects = inject(ProjectCatalogService).projects;
  cards = computed(
    () => createProjectHomeCards(this.projects()),
    ...ngDevMode ? [{ debugName: "cards" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function ProjectHomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProjectHomeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProjectHomeComponent, selectors: [["app-project-home"]], decls: 15, vars: 0, consts: [[1, "project-home"], [1, "library-header"], ["title", "Project guide"], ["aria-labelledby", "available-projects-title", 1, "project-section"], ["id", "available-projects-title"], [1, "library-introduction"], [1, "project-grid"], [1, "project-card"], [1, "project-choice", 3, "routerLink"], [1, "project-art"], ["alt", "", "loading", "lazy", 3, "src"], ["aria-hidden", "true"], [1, "project-content"], [1, "project-grade"], [1, "project-status"], ["aria-hidden", "true", 1, "open-mark"], [1, "demo-label"]], template: function ProjectHomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "header", 1)(2, "strong");
      \u0275\u0275text(3, "FORGE PBL");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "app-task-guide", 2);
      \u0275\u0275repeaterCreate(5, ProjectHomeComponent_For_6_Template, 4, 2, null, null, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "section", 3)(8, "h1", 4);
      \u0275\u0275text(9, "What will you create?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "p", 5);
      \u0275\u0275text(11, " Explore project types and how students demonstrate learning. Each demo\u2019s name and image show one way to bring the project to life. Grade labels identify the primary placement of each current demo. Grade 7\u20138 placements are provisional pending the Forge standards for those grades. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 6);
      \u0275\u0275repeaterCreate(13, ProjectHomeComponent_For_14_Template, 15, 13, "article", 7, _forTrack0);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.cards());
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.cards());
    }
  }, dependencies: [RouterLink, TaskGuideComponent], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100dvh;\n  background: #f3f3e9;\n  color: #233d40;\n  font: 16px/1.5 Arial, sans-serif;\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.library-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 28px;\n  border-bottom: 1px solid #cdd8cd;\n}\n.library-header[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] {\n  letter-spacing: 0.18em;\n  font-size: 14px;\n}\n.project-section[_ngcontent-%COMP%] {\n  max-width: 1300px;\n  margin: auto;\n  padding: 28px;\n}\nh1[_ngcontent-%COMP%] {\n  text-align: center;\n  font: 700 clamp(26px, 3vw, 36px) Georgia;\n  margin: 12px 0;\n}\n.library-introduction[_ngcontent-%COMP%] {\n  max-width: 700px;\n  margin: 0 auto 32px;\n  text-align: center;\n  color: #58706b;\n}\n.project-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 22px;\n}\n.project-card[_ngcontent-%COMP%] {\n  border: 1px solid #c9d1c5;\n  border-radius: 16px;\n  background: #fffefa;\n  overflow: hidden;\n  box-shadow: 0 5px 14px rgba(23, 56, 43, 0.0392156863);\n}\n.project-choice[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n  color: inherit;\n  text-decoration: none;\n  transition: background 0.15s;\n}\n.project-choice[href][_ngcontent-%COMP%]:hover {\n  background: #eaf0dd;\n}\n.project-choice[_ngcontent-%COMP%]:focus-visible {\n  outline: 4px solid #247ca0;\n  outline-offset: -4px;\n}\n.project-choice[aria-disabled=true][_ngcontent-%COMP%] {\n  cursor: default;\n}\n.project-art[_ngcontent-%COMP%] {\n  height: 185px;\n  position: relative;\n  background: #244953;\n  overflow: hidden;\n}\n.project-art[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.project-art[_ngcontent-%COMP%]:after {\n  content: "";\n  position: absolute;\n  inset: 30% 0 0;\n  background: linear-gradient(transparent, rgba(6, 46, 57, 0.8509803922));\n}\n.project-art[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 16px;\n  left: 20px;\n  right: 16px;\n  z-index: 1;\n  color: #fff7da;\n  font: 700 24px/1.2 Georgia;\n  text-shadow: 0 2px 8px #000;\n}\n.demo-label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font: 700 10px/1.5 Arial, sans-serif;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.project-content[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 135px;\n  padding: 18px 48px 18px 20px;\n}\n.project-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 19px;\n  line-height: 1.3;\n  margin: 0 0 10px;\n}\n.project-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0;\n  color: #58706b;\n}\n.project-status[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-top: 10px;\n  border: 1px solid #d1d7c3;\n  border-radius: 12px;\n  font-size: 11px;\n  padding: 1px 7px;\n  color: #606c50;\n}\n.project-content[_ngcontent-%COMP%]   .project-grade[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n  color: #233d40;\n  font-weight: 700;\n}\n.open-mark[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 20px;\n  top: 24px;\n  font-size: 25px;\n}\n@media (max-width: 900px) {\n  .project-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 550px) {\n  .project-section[_ngcontent-%COMP%] {\n    padding: 20px 16px;\n  }\n  .project-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .project-art[_ngcontent-%COMP%] {\n    height: 180px;\n  }\n  .library-header[_ngcontent-%COMP%] {\n    padding: 8px 16px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%] {\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=project-home.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProjectHomeComponent, [{
    type: Component,
    args: [{ selector: "app-project-home", imports: [RouterLink, TaskGuideComponent], template: `<main class="project-home">
  <header class="library-header">
    <strong>FORGE PBL</strong
    ><app-task-guide title="Project guide">
      @for (project of cards(); track project.id) {
        <h3>{{ project.projectType }}</h3>
        <p>{{ project.description }}</p>
      }
    </app-task-guide>
  </header>
  <section class="project-section" aria-labelledby="available-projects-title">
    <h1 id="available-projects-title">What will you create?</h1>
    <p class="library-introduction">
      Explore project types and how students demonstrate learning. Each demo\u2019s name and image show
      one way to bring the project to life. Grade labels identify the primary placement of each current
      demo. Grade 7\u20138 placements are provisional pending the Forge standards for those grades.
    </p>
    <div class="project-grid">
      @for (project of cards(); track project.id) {
        <article class="project-card" [attr.data-project-id]="project.id">
          <a
            class="project-choice"
            [routerLink]="project.route"
            [attr.role]="project.route ? null : 'link'"
            [attr.aria-disabled]="project.route ? null : 'true'"
            [attr.aria-label]="
              project.route
                ? 'Open demo: ' + project.demoTitle
                : project.projectType + ' \u2014 Not built yet'
            "
          >
            <div class="project-art">
              @if (project.coverImage) {
                <img [src]="project.coverImage" alt="" loading="lazy" />
              } @else {
                <span aria-hidden="true">{{ project.symbol }}</span>
              }
              @if (project.demoTitle) {
                <strong><span class="demo-label">Demo project</span>{{ project.demoTitle }}</strong>
              }
            </div>
            <div class="project-content">
              @if (project.grade) {
                <p class="project-grade">{{ project.grade }}</p>
              }
              <h2>{{ project.projectType }}</h2>
              <p>{{ project.description }}</p>
              <span class="project-status" [attr.data-release-status]="project.status">{{
                project.status
              }}</span>
              @if (project.route) {
                <span class="open-mark" aria-hidden="true">\u2192</span>
              }
            </div>
          </a>
        </article>
      }
    </div>
  </section>
</main>
`, styles: ['/* src/app/features/project-home/project-home.component.scss */\n:host {\n  display: block;\n  min-height: 100dvh;\n  background: #f3f3e9;\n  color: #233d40;\n  font: 16px/1.5 Arial, sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.library-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 28px;\n  border-bottom: 1px solid #cdd8cd;\n}\n.library-header > strong {\n  letter-spacing: 0.18em;\n  font-size: 14px;\n}\n.project-section {\n  max-width: 1300px;\n  margin: auto;\n  padding: 28px;\n}\nh1 {\n  text-align: center;\n  font: 700 clamp(26px, 3vw, 36px) Georgia;\n  margin: 12px 0;\n}\n.library-introduction {\n  max-width: 700px;\n  margin: 0 auto 32px;\n  text-align: center;\n  color: #58706b;\n}\n.project-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 22px;\n}\n.project-card {\n  border: 1px solid #c9d1c5;\n  border-radius: 16px;\n  background: #fffefa;\n  overflow: hidden;\n  box-shadow: 0 5px 14px rgba(23, 56, 43, 0.0392156863);\n}\n.project-choice {\n  display: block;\n  height: 100%;\n  color: inherit;\n  text-decoration: none;\n  transition: background 0.15s;\n}\n.project-choice[href]:hover {\n  background: #eaf0dd;\n}\n.project-choice:focus-visible {\n  outline: 4px solid #247ca0;\n  outline-offset: -4px;\n}\n.project-choice[aria-disabled=true] {\n  cursor: default;\n}\n.project-art {\n  height: 185px;\n  position: relative;\n  background: #244953;\n  overflow: hidden;\n}\n.project-art img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.project-art:after {\n  content: "";\n  position: absolute;\n  inset: 30% 0 0;\n  background: linear-gradient(transparent, rgba(6, 46, 57, 0.8509803922));\n}\n.project-art strong {\n  position: absolute;\n  bottom: 16px;\n  left: 20px;\n  right: 16px;\n  z-index: 1;\n  color: #fff7da;\n  font: 700 24px/1.2 Georgia;\n  text-shadow: 0 2px 8px #000;\n}\n.demo-label {\n  display: block;\n  margin-bottom: 6px;\n  font: 700 10px/1.5 Arial, sans-serif;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.project-content {\n  position: relative;\n  min-height: 135px;\n  padding: 18px 48px 18px 20px;\n}\n.project-content h2 {\n  font-size: 19px;\n  line-height: 1.3;\n  margin: 0 0 10px;\n}\n.project-content p {\n  font-size: 14px;\n  margin: 0;\n  color: #58706b;\n}\n.project-status {\n  display: inline-block;\n  margin-top: 10px;\n  border: 1px solid #d1d7c3;\n  border-radius: 12px;\n  font-size: 11px;\n  padding: 1px 7px;\n  color: #606c50;\n}\n.project-content .project-grade {\n  margin-bottom: 6px;\n  color: #233d40;\n  font-weight: 700;\n}\n.open-mark {\n  position: absolute;\n  right: 20px;\n  top: 24px;\n  font-size: 25px;\n}\n@media (max-width: 900px) {\n  .project-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 550px) {\n  .project-section {\n    padding: 20px 16px;\n  }\n  .project-grid {\n    grid-template-columns: 1fr;\n  }\n  .project-art {\n    height: 180px;\n  }\n  .library-header {\n    padding: 8px 16px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  * {\n    transition: none !important;\n  }\n}\n/*# sourceMappingURL=project-home.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProjectHomeComponent, { className: "ProjectHomeComponent", filePath: "src/app/features/project-home/project-home.component.ts", lineNumber: 14 });
})();
export {
  ProjectHomeComponent
};
//# debugId=dc5a8a7c-d77e-541b-be1b-f754466ba657
//# sourceMappingURL=chunk-KD5L7RLL.js.map
