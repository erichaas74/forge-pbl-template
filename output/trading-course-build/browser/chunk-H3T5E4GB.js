import {
  egyptianObjectModels,
  modelCollection,
  modelSources
} from "./chunk-X7Y4LULJ.js";
import {
  museumBoardTemplate
} from "./chunk-WLIGGVEP.js";
import {
  DEFAULT_MUSEUM_ROOM_LAYOUT,
  furnishMuseumRoom
} from "./chunk-SUG7Z2TW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/projects/class-exhibit-hall/class-exhibit-hall.config.ts
var METASTEPS_EGYPTIAN_HALL = "https://metasteps.com/viewer/embed/baac88b7-b37f-49c0-90d6-83caf06218a6?showSignIn=0&showCommunications=0&showOrbitButton=0&showSettingsButton=0&showSoundButton=0&showLikeButton=0&forceOrbitCamera=0";
var galleryWing = (title) => ({
  provider: "metasteps",
  title,
  embedUrl: METASTEPS_EGYPTIAN_HALL
});
var prototypeVideo = (title, presenterLabel) => ({
  title,
  presenterLabel,
  prototype: true
});
var board = (title, centralClaim, displayName, objects, sources, themeVariant, memberDisplayNames, immersiveGallery, videoPresentation) => ({
  title,
  centralClaim,
  objects,
  sources,
  immersiveGallery,
  videoPresentation,
  teamCredit: { displayName, memberDisplayNames },
  themeVariant
});
var egyptianExhibitGallery = galleryWing("Egyptian Exhibit \xB7 Shared MetaSteps Hall");
var classExhibitHallConfig = {
  schemaVersion: "1.0",
  projectId: "objects-that-changed-us",
  projectVersion: "2.2.0",
  projectInstanceId: "egyptian-artifacts-period-3-prototype",
  courseSectionId: "ancient-civilizations-5-period-3",
  classLabel: "Ancient Civilizations \xB7 Period 3",
  title: "Objects That Changed Us: Ancient Egypt",
  subtitle: "Each student or group researches an Egyptian artifact collection, builds one wing of a shared MetaSteps museum, and records a video tour for classmates and families.",
  openingLabel: "Egyptian Museum Showcase \xB7 Student & Family Walkthrough",
  creatorMode: "individual_or_group",
  template: museumBoardTemplate,
  teams: [
    {
      id: "team-atlas",
      displayName: "Material & Craft Curators",
      memberIds: ["student-avery", "student-jo", "student-mateo"],
      memberDisplayNames: ["Avery", "Jo", "Mateo"],
      locationId: "alcove-01"
    },
    {
      id: "team-marigold",
      displayName: "Royal Image Curators",
      memberIds: ["student-lina", "student-sam", "student-noor"],
      memberDisplayNames: ["Lina", "Sam", "Noor"],
      locationId: "alcove-02"
    },
    {
      id: "team-northstar",
      displayName: "Afterlife Curators",
      memberIds: ["student-emery", "student-kai", "student-zuri"],
      memberDisplayNames: ["Emery", "Kai", "Zuri"],
      locationId: "alcove-03"
    },
    {
      id: "team-ember",
      displayName: "Builders & Engineers",
      memberIds: ["student-ivy", "student-max", "student-rene"],
      memberDisplayNames: ["Ivy", "Max", "Ren\xE9"],
      locationId: "alcove-04"
    }
  ],
  seedBoards: [
    {
      teamId: "team-atlas",
      published: true,
      data: board(
        "Materials and Skilled Making",
        "A funerary ensemble and a royal bust invite comparison of shaped forms, decoration, and the skilled work behind ancient Egyptian objects.",
        "Material & Craft Curators",
        modelCollection("coffin", "nefertiti"),
        modelSources("coffin", "nefertiti"),
        "ochre",
        ["Avery", "Jo", "Mateo"],
        galleryWing("MetaSteps Wing 1 \xB7 Materials and Skilled Making"),
        prototypeVideo(
          "How form and decoration reveal skilled making",
          "Material & Craft Curators"
        )
      )
    },
    {
      teamId: "team-marigold",
      published: true,
      data: board(
        "Royal Images and Sacred Spaces",
        "A royal portrait and a temple model help us explore how images and spaces could make authority visible.",
        "Royal Image Curators",
        modelCollection("nefertiti", "temple"),
        modelSources("nefertiti", "temple"),
        "indigo",
        ["Lina", "Sam", "Noor"],
        galleryWing("MetaSteps Wing 2 \xB7 Royal Images and Sacred Spaces"),
        prototypeVideo("Reading power through images and spaces", "Royal Image Curators")
      )
    },
    {
      teamId: "team-northstar",
      published: true,
      data: board(
        "Preparing for the Afterlife",
        "Funerary artifacts show that ancient Egyptian beliefs about the afterlife were expressed through materials, images, texts, and ritual preparation.",
        "Afterlife Curators",
        modelCollection("coffin"),
        modelSources("coffin"),
        "sage",
        ["Emery", "Kai", "Zuri"],
        galleryWing("MetaSteps Wing 3 \xB7 Beliefs and the Afterlife"),
        prototypeVideo("What funerary artifacts can\u2014and cannot\u2014tell us", "Afterlife Curators")
      )
    },
    {
      teamId: "team-ember",
      published: true,
      data: board(
        "Measuring and Building",
        "A temple and a coffin invite comparison of construction at different scales, from organized spaces to a shaped enclosure.",
        "Builders & Engineers",
        modelCollection("temple", "coffin"),
        modelSources("temple", "coffin"),
        "rose",
        ["Ivy", "Max", "Ren\xE9"],
        galleryWing("MetaSteps Wing 4 \xB7 Builders and Engineers"),
        prototypeVideo("Comparing construction at different scales", "Builders & Engineers")
      )
    }
  ],
  viewer: {
    studentId: "student-avery",
    studentDisplayName: "Avery",
    teamId: "team-atlas",
    teacherId: "teacher-morgan",
    teacherDisplayName: "Ms. Morgan"
  }
};

// src/app/templates/exhibit-hall/rooms/museum-room-template.ts
var museumRoomTemplate = __spreadProps(__spreadValues({}, museumBoardTemplate), {
  templateId: "assigned-museum-room",
  version: 1,
  vocabulary: __spreadProps(__spreadValues({}, museumBoardTemplate.vocabulary), {
    composeAction: "Open my room",
    publishAction: "Submit my room",
    publishedState: "Submitted"
  }),
  sourceAdapter: __spreadProps(__spreadValues({}, museumBoardTemplate.sourceAdapter), {
    allowedSlotIds: [...museumBoardTemplate.sourceAdapter.allowedSlotIds, "museum-room"]
  }),
  requirements: [
    { fieldId: "exhibit-title", required: true, maxWords: 12 },
    { fieldId: "central-claim", required: true, maxWords: 60 },
    { fieldId: "selected-objects", required: true, minItems: 1, maxItems: 3 },
    { fieldId: "object-captions", required: true },
    { fieldId: "source-list", required: true, minItems: 1 },
    { fieldId: "museum-room", required: true }
  ],
  defense: __spreadProps(__spreadValues({}, museumBoardTemplate.defense), {
    prompts: museumBoardTemplate.defense.prompts.map(
      (prompt) => prompt.id === "design" ? __spreadProps(__spreadValues({}, prompt), { label: "Explain why you included these artifacts in your room." }) : prompt
    )
  })
});

// src/app/projects/class-exhibit-hall/student-museum.config.ts
var rooms = classExhibitHallConfig.teams.map((team, index) => ({
  roomId: team.locationId,
  label: `Room ${String(index + 1).padStart(2, "0")}`,
  layoutId: DEFAULT_MUSEUM_ROOM_LAYOUT
}));
var studentMuseumConfig = __spreadProps(__spreadValues({}, classExhibitHallConfig), {
  projectVersion: "2.3.0",
  subtitle: "Curate your assigned museum room. Add artifacts and write labels, then submit your room for the class museum.",
  template: museumRoomTemplate,
  museum: {
    rooms,
    catalog: {
      objects: egyptianObjectModels,
      sources: modelSources("nefertiti", "coffin", "temple")
    }
  },
  seedBoards: classExhibitHallConfig.seedBoards.map((seed) => {
    const team = classExhibitHallConfig.teams.find((item) => item.id === seed.teamId);
    return __spreadProps(__spreadValues({}, seed), {
      data: furnishMuseumRoom(
        seed.data,
        rooms.find((room) => room.roomId === team.locationId)
      )
    });
  })
});

export {
  studentMuseumConfig
};
//# debugId=8d9b6fdd-f324-5da8-88db-f8562d2e3c26
//# sourceMappingURL=chunk-H3T5E4GB.js.map
