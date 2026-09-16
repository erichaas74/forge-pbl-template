import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/templates/exhibit-hall/rooms/museum-room.ts
var classicRoom = Object.freeze({
  id: "classic-museum-room-v1",
  width: 12,
  depth: 12,
  height: 5.8,
  slots: Object.freeze([
    { id: "display-1", label: "Display 1", position: [-3.4, 0, -0.6] },
    { id: "display-2", label: "Display 2", position: [0, 0, -2.6] },
    { id: "display-3", label: "Display 3", position: [3.4, 0, -0.6] }
  ])
});
var layouts = /* @__PURE__ */ new Map([[classicRoom.id, classicRoom]]);
function museumRoomLayout(id) {
  return layouts.get(id);
}
var DEFAULT_MUSEUM_ROOM_LAYOUT = classicRoom.id;
function emptyMuseumRoom(room, credit) {
  return {
    title: "",
    centralClaim: "",
    objects: [],
    sources: [],
    teamCredit: credit,
    museumRoom: { roomId: room.roomId, layoutId: room.layoutId, placements: [] }
  };
}
function furnishMuseumRoom(board, room) {
  const layout = museumRoomLayout(room.layoutId);
  if (!layout)
    throw new Error("CAPABILITY_NOT_INSTALLED: The assigned museum room design is unavailable.");
  const _a = board, { immersiveGallery: _gallery, videoPresentation: _video } = _a, content = __objRest(_a, ["immersiveGallery", "videoPresentation"]);
  return __spreadProps(__spreadValues({}, content), {
    museumRoom: {
      roomId: room.roomId,
      layoutId: room.layoutId,
      placements: board.objects.map((object, index) => ({
        slotId: layout.slots[index]?.id ?? "",
        objectId: object.id
      }))
    }
  });
}
function isMuseumRoomData(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const data = value;
  const layout = typeof data["layoutId"] === "string" ? museumRoomLayout(data["layoutId"]) : void 0;
  if (!layout || typeof data["roomId"] !== "string" || !data["roomId"].trim() || !Array.isArray(data["placements"]))
    return false;
  const slots = /* @__PURE__ */ new Set(), objects = /* @__PURE__ */ new Set();
  return data["placements"].length <= layout.slots.length && data["placements"].every((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const placement = entry;
    const slot = placement["slotId"], object = placement["objectId"];
    if (typeof slot !== "string" || typeof object !== "string" || !object.trim() || !layout.slots.some((item) => item.id === slot) || slots.has(slot) || objects.has(object))
      return false;
    slots.add(slot);
    objects.add(object);
    return true;
  });
}
function placeMuseumObject(board, assignment, catalog, slotId, objectId) {
  const room = board.museumRoom;
  if (!room || room.roomId !== assignment.roomId || room.layoutId !== assignment.layoutId || !isMuseumRoomData(room) || !museumRoomLayout(room.layoutId)?.slots.some((slot) => slot.id === slotId))
    return void 0;
  const item = objectId === void 0 ? void 0 : catalog.objects.find((object) => object.id === objectId);
  if (objectId !== void 0 && !item) return void 0;
  if (item && room.placements.some(
    (placement) => placement.objectId === item.id && placement.slotId !== slotId
  ))
    return void 0;
  if (room.placements.find((placement) => placement.slotId === slotId)?.objectId === objectId)
    return board;
  const placements = room.placements.filter((placement) => placement.slotId !== slotId);
  if (item) placements.push({ slotId, objectId: item.id });
  const objects = board.objects.filter(
    (object) => placements.some((placement) => placement.objectId === object.id)
  );
  if (item && !objects.some((object) => object.id === item.id))
    objects.push(__spreadProps(__spreadValues({}, structuredClone(item)), { description: "", evidenceConnection: "" }));
  const sourceIds = new Set(objects.flatMap((object) => object.sourceIds));
  const sourcePool = new Map(
    [...catalog.sources, ...board.sources].map((source) => [source.id, source])
  );
  return __spreadProps(__spreadValues({}, board), {
    objects,
    sources: [...sourcePool.values()].filter((source) => sourceIds.has(source.id)),
    museumRoom: __spreadProps(__spreadValues({}, room), { placements })
  });
}
function validateMuseumRoom(board, assignment) {
  const errors = [];
  const room = board.museumRoom;
  if (!isMuseumRoomData(room))
    return [
      { fieldId: "museum-room", message: "The assigned room or its display spots are invalid." }
    ];
  if (assignment && (assignment.roomId !== room.roomId || assignment.layoutId !== room.layoutId))
    errors.push({ fieldId: "museum-room", message: "You can submit only your assigned room." });
  if (new Set(board.objects.map((object) => object.id)).size !== board.objects.length || room.placements.length !== board.objects.length || room.placements.some(
    (placement) => !board.objects.some((object) => object.id === placement.objectId)
  ))
    errors.push({
      fieldId: "museum-room",
      message: "Every artifact must occupy one display spot in your room."
    });
  for (const object of board.objects) {
    if (!object.title.trim() || !object.description.trim() || !object.evidenceConnection.trim())
      errors.push({
        fieldId: object.id,
        message: `Finish the label and \u201CWhy it matters\u201D for ${object.title || "each artifact"}.`
      });
    if (!object.sourceIds.length || object.sourceIds.some(
      (id) => !board.sources.some((source) => source.id === id && source.citation.trim())
    ))
      errors.push({ fieldId: object.id, message: `Add the source credit for ${object.title}.` });
  }
  return errors;
}

export {
  museumRoomLayout,
  DEFAULT_MUSEUM_ROOM_LAYOUT,
  emptyMuseumRoom,
  furnishMuseumRoom,
  isMuseumRoomData,
  placeMuseumObject,
  validateMuseumRoom
};
//# debugId=4c8e9aeb-ba71-5f58-861e-c0241ea9567e
//# sourceMappingURL=chunk-SUG7Z2TW.js.map
