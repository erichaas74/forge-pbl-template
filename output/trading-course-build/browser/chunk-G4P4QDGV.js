import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/projects/calendar-monument/calendar-monument.solstice-gates.ts
var solsticeGateSun = {
  summer: { bearing: 63.28835276727858, altitude: 4.451833497848568 },
  winter: { bearing: 124.91145318850852, altitude: 4.283907546270092 }
};
var rounded = (n) => Math.round(n * 1e5) / 1e5;
var receiver = (season) => ({
  id: season + "-carving",
  label: season === "summer" ? "Summer carving" : "Winter carving",
  x: -0.35,
  z: season === "summer" ? -0.2 : 0.2,
  y: rounded(0.8 - 3 * Math.tan(solsticeGateSun[season].altitude * Math.PI / 180)),
  normal: [1, 0, 0]
});
function gate(season) {
  const target = receiver(season), bearing = solsticeGateSun[season].bearing * Math.PI / 180;
  const rotation = 180 - solsticeGateSun[season].bearing;
  const x = rounded(target.x + 3 * Math.sin(bearing)), z = rounded(target.z - 3 * Math.cos(bearing));
  return [
    {
      id: season + "-window",
      label: season === "summer" ? "Summer window" : "Winter window",
      x,
      z,
      y: 0,
      width: 1.4,
      height: 1.6,
      depth: 0.25,
      rotation,
      aperture: { axis: "z", diameter: 0.18, insert: "open", color: "clear" }
    }
  ];
}
var solsticeGatesDesign = {
  blocks: [
    ...gate("summer"),
    ...gate("winter"),
    {
      id: "receiving-pillar",
      label: "Central receiving pillar",
      x: -0.5,
      y: 0,
      z: 0,
      width: 0.3,
      height: 1.2,
      depth: 0.8,
      rotation: 0
    }
  ],
  targets: [
    receiver("summer"),
    receiver("winter"),
    { id: "observer", label: "Center \xB7 face east", x: 0, z: 0 }
  ]
};
var solsticeGatesStarter = __spreadProps(__spreadValues({}, solsticeGatesDesign), {
  blocks: solsticeGatesDesign.blocks.map(
    (block) => block.id === "summer-window" ? __spreadProps(__spreadValues({}, block), { z: block.z + 0.4 }) : block
  )
});
var solsticeGatesChecks = [
  {
    scenarioId: "march",
    targetId: "observer",
    expectedValue: "sunlight",
    settings: { observationRule: "morning" }
  },
  {
    scenarioId: "june",
    targetId: "summer-carving",
    expectedValue: "sunlight",
    settings: { observationRule: "morning" }
  },
  {
    scenarioId: "sept",
    targetId: "observer",
    expectedValue: "sunlight",
    settings: { observationRule: "morning" }
  },
  {
    scenarioId: "dec",
    targetId: "winter-carving",
    expectedValue: "sunlight",
    settings: { observationRule: "morning" }
  }
];

export {
  solsticeGatesDesign,
  solsticeGatesStarter,
  solsticeGatesChecks
};
//# debugId=a2552af9-d6e2-50c0-939c-0e9fc9395d0c
//# sourceMappingURL=chunk-G4P4QDGV.js.map
