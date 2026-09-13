/* Framing affects only the camera. Extremely long shadows remain physically unbounded. */
(() => {
  function corners(design) {
    const points = [];
    const solids = [...design.blocks, ...(design.displayObject ? [{ ...design.displayObject, depth: design.displayObject.width }] : [])];
    for (const b of solids) {
      const r = b.rotation * Math.PI / 180;
      for (const x of [-b.width / 2, b.width / 2]) for (const z of [-b.depth / 2, b.depth / 2]) for (const y of [b.y, b.y + b.height]) {
        points.push({ x: b.x + Math.cos(r) * x + Math.sin(r) * z, y, z: b.z - Math.sin(r) * x + Math.cos(r) * z });
      }
    }
    if (!points.length) points.push({ x: -.3, y: 0, z: -.3 }, { x: .3, y: .6, z: .3 });
    return points;
  }
  function bounds(design, direction, shadows = true) {
    const points = corners(design), geometry = [...points];
    const height = Math.max(.1, ...points.map(p => p.y));
    const limit = Math.max(6, height * 7);
    let clipped = false;
    if (shadows && direction?.y > 0) for (const p of geometry) {
      const distance = p.y * Math.hypot(direction.x, direction.z) / direction.y;
      const scale = distance > limit ? limit / distance : 1;
      clipped ||= distance > limit;
      points.push({ x: p.x - p.y * direction.x / direction.y * scale, y: 0, z: p.z - p.y * direction.z / direction.y * scale });
    }
    points.push(...design.targets.map(p => ({ ...p, y: 0 })));
    const min = {}, max = {};
    for (const key of ['x', 'y', 'z']) { min[key] = Math.min(...points.map(p => p[key])); max[key] = Math.max(...points.map(p => p[key])); }
    return { points, min, max, height, clipped, centre: { x: (min.x + max.x) / 2, y: (min.y + max.y) / 2, z: (min.z + max.z) / 2 } };
  }
  function fit(THREE, frame, bearing, elevation, aspect, zoom = 1) {
    const direction = window.SolarGeometry.sunDirection(elevation, bearing);
    const back = new THREE.Vector3(direction.x, direction.y, direction.z);
    const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), back).normalize();
    const up = new THREE.Vector3().crossVectors(back, right).normalize();
    const centre = new THREE.Vector3(frame.centre.x, frame.centre.y, frame.centre.z);
    const vertical = Math.tan(42 * Math.PI / 360), horizontal = vertical * Math.max(.1, aspect);
    let distance = .25;
    for (const p of frame.points) {
      const v = new THREE.Vector3(p.x, p.y, p.z).sub(centre);
      distance = Math.max(distance, v.dot(back) + 1.10 * Math.max(Math.abs(v.dot(right)) / horizontal, Math.abs(v.dot(up)) / vertical));
    }
    return { centre, position: centre.clone().addScaledVector(back, distance / zoom), distance };
  }
  window.MonumentCamera = Object.freeze({ corners, bounds, fit });
})();
