/* Deterministic geometric shadows: parallel rays on a horizontal plane, metres. */
(() => {
  function sunDirection(altitudeDeg, compassDeg) {
    const a = altitudeDeg * Math.PI / 180, c = compassDeg * Math.PI / 180;
    return { x: Math.sin(c) * Math.cos(a), y: Math.sin(a), z: -Math.cos(c) * Math.cos(a) };
  }
  function hull(points) {
    const sorted = [...points].sort((a, b) => a.x - b.x || a.z - b.z);
    const cross = (o, a, b) => (a.x - o.x) * (b.z - o.z) - (a.z - o.z) * (b.x - o.x);
    const half = (list) => { const out = []; for (const p of list) { while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], p) <= 1e-12) out.pop(); out.push(p); } return out; };
    return [...half(sorted).slice(0, -1), ...half([...sorted].reverse()).slice(0, -1)];
  }
  function blockShadow(block, direction) {
    if (direction.y <= 0) return [];
    const r = block.rotation * Math.PI / 180, points = [];
    for (const dx of [-block.width / 2, block.width / 2]) for (const dz of [-block.depth / 2, block.depth / 2]) for (const y of [block.y, block.y + block.height]) {
      const x = block.x + dx * Math.cos(r) + dz * Math.sin(r);
      const z = block.z - dx * Math.sin(r) + dz * Math.cos(r);
      points.push({ x: x - y * direction.x / direction.y, z: z - y * direction.z / direction.y });
    }
    return hull(points);
  }
  function contains(polygon, point) {
    if (polygon.length < 3) return false;
    let positive = false, negative = false;
    for (let i = 0; i < polygon.length; i++) {
      const a = polygon[i], b = polygon[(i + 1) % polygon.length];
      const cross = (b.x - a.x) * (point.z - a.z) - (b.z - a.z) * (point.x - a.x);
      if (cross > 1e-9) positive = true;
      if (cross < -1e-9) negative = true;
    }
    return !(positive && negative);
  }
  window.SolarGeometry = Object.freeze({ sunDirection, blockShadow, contains });
})();
