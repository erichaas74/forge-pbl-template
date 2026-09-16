// src/app/projects/class-exhibit-hall/egyptian-object-models.ts
var egyptianObjectModels = [
  {
    id: "nefertiti",
    title: "Nefertiti\u2019s bust",
    description: "A digital model titled Nefertiti\u2019s bust (like in the museum). Inspect the face, crown, and profile from different angles.",
    evidenceConnection: "The bust offers a way to examine how a royal image communicates identity through form and decoration. A digital representation alone cannot establish the original object\u2019s materials or history.",
    sourceIds: ["nefertiti-model"],
    model: {
      src: "/exhibit-hall/models/nefertitis_bust_like_in_the_museum.glb",
      alt: "A digital model titled Nefertiti\u2019s bust (like in the museum). Inspect the face, crown, and profile from different angles.",
      sizeBytes: 3266008,
      credit: "C. Yamahata",
      sourceUrl: "https://sketchfab.com/3d-models/nefertitis-bust-like-in-the-museum-ce5b14926e494558ab584375a8d63ca7",
      license: "CC BY 4.0"
    }
  },
  {
    id: "coffin",
    title: "Coffin of Ankh-Khonsu",
    description: "A supplied museum model identified as the Coffin of Ankh-Khonsu. Rotate the coffin to compare its shape and decorated surfaces.",
    evidenceConnection: "The coffin brings together craft, imagery, and funerary purpose. Its surviving surfaces invite questions about belief, while a model cannot by itself explain every image or inscription.",
    sourceIds: ["coffin-model"],
    model: {
      src: "/exhibit-hall/models/coffin_of_ankh-khonsu.glb",
      alt: "A supplied museum model identified as the Coffin of Ankh-Khonsu. Rotate the coffin to compare its shape and decorated surfaces.",
      sizeBytes: 2897268,
      credit: "Harvard Museum of the Ancient Near East",
      sourceUrl: "https://sketchfab.com/3d-models/coffin-of-ankh-khonsu-6132b52aa5904b1dbdd631235fc52c66",
      license: "CC BY 4.0"
    }
  },
  {
    id: "temple",
    title: "Temple of Horus",
    description: "A game-ready digital interpretation of the Temple of Horus. Explore its columns, entrances, and arrangement of spaces.",
    evidenceConnection: "The model helps visitors discuss scale, repeated forms, and the organization of a religious building. It is a reconstruction, not a measured archaeological survey.",
    sourceIds: ["temple-model"],
    model: {
      src: "/exhibit-hall/models/temple_of_horus_-_gameready_asset.glb",
      alt: "A game-ready digital interpretation of the Temple of Horus. Explore its columns, entrances, and arrangement of spaces.",
      sizeBytes: 1227960,
      credit: "numaan.k99",
      sourceUrl: "https://sketchfab.com/3d-models/temple-of-horus-gameready-asset-448a3d5d360b44ee8128e6d5eb61e0a5",
      license: "CC BY 4.0"
    }
  }
];
function modelCollection(...ids) {
  return ids.map((id) => egyptianObjectModels.find((object) => object.id === id));
}
function modelSources(...ids) {
  return modelCollection(...ids).map((object) => ({
    id: object.id + "-model",
    citation: object.model.credit + " \xB7 " + object.title + " \xB7 " + object.model.license + ". Supplied digital model; see creator record for context.",
    url: object.model.sourceUrl
  }));
}

export {
  egyptianObjectModels,
  modelCollection,
  modelSources
};
//# debugId=c1bbb6e9-659a-5777-8d79-99c60adec2f1
//# sourceMappingURL=chunk-X7Y4LULJ.js.map
