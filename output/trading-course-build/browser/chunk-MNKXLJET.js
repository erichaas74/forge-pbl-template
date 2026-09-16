// src/app/shared/media/object-model.ts
function isExhibitObjectModel(value) {
  if (typeof value !== "object" || value === null) return false;
  const model = value;
  const view = model["initialView"];
  const validView = view === void 0 || typeof view === "object" && view !== null && ["azimuthDegrees", "elevationDegrees", "distancePercent"].every(
    (key) => typeof view[key] === "number" && Number.isFinite(view[key])
  ) && Number(view["elevationDegrees"]) > 0 && Number(view["elevationDegrees"]) < 180 && Number(view["distancePercent"]) > 0;
  return validView && typeof model["src"] === "string" && /^(\/[^/]|https:\/\/)/u.test(model["src"]) && /\.glb$/iu.test(model["src"]) && ["alt", "credit", "license"].every(
    (key) => typeof model[key] === "string" && model[key].trim().length > 0
  ) && typeof model["sourceUrl"] === "string" && /^https:\/\//u.test(model["sourceUrl"]) && (model["sizeBytes"] === void 0 || typeof model["sizeBytes"] === "number" && Number.isFinite(model["sizeBytes"]) && model["sizeBytes"] > 0);
}

export {
  isExhibitObjectModel
};
//# debugId=70cddedc-8e37-5806-b0c7-9f4355d96da7
//# sourceMappingURL=chunk-MNKXLJET.js.map
