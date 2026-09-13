/* Parallel-ray transmission. CPU evidence and GPU uniforms share these measured solids.
   RGB filters are illustrative, not measured spectra; no refraction, focusing or caustics. */
(() => {
  const colors = Object.freeze({ clear: [1, 1, 1], red: [.86, .025, .015], amber: [.95, .42, .015], green: [.025, .75, .07], blue: [.02, .12, .9], violet: [.48, .025, .82] });
  const axes = ['x', 'y', 'z'];
  function local(point, b, vector = false) {
    const r = b.rotation * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
    const x = point.x - (vector ? 0 : b.x), z = point.z - (vector ? 0 : b.z);
    return [c * x - s * z, point.y - (vector ? 0 : b.y + b.height / 2), s * x + c * z];
  }
  function interval(p, d, half) {
    let near = 0, far = Infinity;
    for (let i = 0; i < 3; i++) {
      if (Math.abs(d[i]) < 1e-10) { if (Math.abs(p[i]) > half[i]) return null; }
      else { const a = (-half[i] - p[i]) / d[i], b = (half[i] - p[i]) / d[i]; near = Math.max(near, Math.min(a, b)); far = Math.min(far, Math.max(a, b)); }
    }
    return far > Math.max(near, 1e-6) ? [near, far] : null;
  }
  function blockPass(point, direction, b) {
    const p = local(point, b), d = local(direction, b, true);
    const hit = interval(p, d, [b.width / 2, b.height / 2, b.depth / 2]);
    if (!hit) return { rgb: [1, 1, 1], filter: null };
    const a = b.aperture;
    if (!a) return null;
    const axis = axes.indexOf(a.axis), r2 = (a.diameter / 2) ** 2;
    // A cylinder is convex: both entry and exit must lie inside its cross-section.
    if (hit.some(t => p.reduce((sum, v, i) => sum + (i === axis ? 0 : (v + d[i] * t) ** 2), 0) > r2 + 1e-12)) return null;
    return { rgb: a.insert === 'open' ? [1, 1, 1] : colors[a.color], filter: a.insert === 'open' || a.color === 'clear' ? null : a.color };
  }
  function planes(model) {
    if (model === 'crystal') {
      const out = []; for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) out.push([x, y, z, 1]);
      return out;
    }
    // Obelisk: half-width tapers from 1 at the base to .45 at the top.
    return [[1, .275, 0, .725], [-1, .275, 0, .725], [0, .275, 1, .725], [0, .275, -1, .725], [0, 1, 0, 1], [0, -1, 0, 1]];
  }
  function objectInterval(point, direction, object) {
    if (!object) return null;
    const h = [object.width / 2, object.height / 2, object.width / 2];
    const p = local(point, object).map((v, i) => v / h[i]), d = local(direction, object, true).map((v, i) => v / h[i]);
    if (object.model === 'sphere') {
      const a = d.reduce((s, v) => s + v * v, 0), b = p.reduce((s, v, i) => s + v * d[i], 0), c = p.reduce((s, v) => s + v * v, -1), disc = b * b - a * c;
      if (disc < 0 || (-b + Math.sqrt(disc)) / a <= 1e-5) return null;
      return [Math.max(0, (-b - Math.sqrt(disc)) / a), (-b + Math.sqrt(disc)) / a];
    }
    let near = 0, far = Infinity;
    for (const plane of planes(object.model)) {
      const distance = plane[3] - p.reduce((s, v, i) => s + v * plane[i], 0), slope = d.reduce((s, v, i) => s + v * plane[i], 0);
      if (Math.abs(slope) < 1e-10) { if (distance < 0) return null; }
      else if (slope > 0) far = Math.min(far, distance / slope);
      else near = Math.max(near, distance / slope);
    }
    return far > Math.max(near, 1e-5) ? [near, far] : null;
  }
  function objectBlocks(point, direction, object) { return !!objectInterval(point, direction, object); }

  // Ordered interactions along a visible incoming ray, sharing the same local solids.
  function inspect(design, origin, travel, length) {
    const events = [], pointAt = t => ({ x: origin.x + travel.x * t, y: origin.y + travel.y * t, z: origin.z + travel.z * t });
    for (const b of design.blocks) {
      const p = local(origin, b), d = local(travel, b, true), range = interval(p, d, [b.width / 2, b.height / 2, b.depth / 2]);
      if (!range || range[0] > length) continue;
      const [near, far] = range, a = b.aperture;
      let hit = near;
      if (a) {
        const axis = axes.indexOf(a.axis), radial = [0, 1, 2].filter(i => i !== axis), radius2 = (a.diameter / 2) ** 2;
        if (radial.reduce((s, i) => s + (p[i] + d[i] * near) ** 2, 0) <= radius2 + 1e-12) {
          const A = radial.reduce((s, i) => s + d[i] ** 2, 0), B = radial.reduce((s, i) => s + p[i] * d[i], 0), C = radial.reduce((s, i) => s + p[i] ** 2, -radius2);
          const leave = A < 1e-14 ? Infinity : (-B + Math.sqrt(Math.max(0, B * B - A * C))) / A;
          hit = leave < far - 1e-8 ? leave : Infinity;
        }
        const insert = Math.abs(d[axis]) > 1e-10 ? -p[axis] / d[axis] : Infinity;
        if (a.insert !== 'open' && insert >= near && insert <= far && insert < hit && insert <= length) events.push({ t: insert, color: a.color, id: b.id });
      }
      if (hit <= length) events.push({ t: hit, blocked: true, id: b.id });
    }
    const object = objectInterval(origin, travel, design.displayObject);
    if (object && object[0] <= length) events.push({ t: object[0], blocked: true, id: 'sculpture' });
    events.sort((a, b) => a.t - b.t || Number(!!b.blocked) - Number(!!a.blocked));
    let previous = 0, rgb = [1, 1, 1]; const segments = [], filters = [];
    for (const event of events) {
      if (event.t > previous + 1e-8) segments.push({ from: pointAt(previous), to: pointAt(event.t), rgb: [...rgb] });
      previous = event.t;
      if (event.blocked) return { segments, blocked: true, hit: pointAt(event.t), id: event.id, filters };
      rgb = rgb.map((v, i) => v * colors[event.color][i]); filters.push(event.color);
    }
    if (length > previous) segments.push({ from: pointAt(previous), to: pointAt(length), rgb });
    return { segments, blocked: false, hit: pointAt(length), filters };
  }
  function trace(design, point, direction, skipObject = false) {
    if (direction.y <= 0) return { value: 'unavailable', rgb: [0, 0, 0] };
    const origin = { x: point.x + direction.x * 1e-5, y: (point.y || 0) + direction.y * 1e-5, z: point.z + direction.z * 1e-5 };
    let rgb = [1, 1, 1]; const filters = new Set();
    for (const b of design.blocks) {
      const pass = blockPass(origin, direction, b);
      if (!pass) return { value: 'shadow', rgb: [0, 0, 0] };
      rgb = rgb.map((v, i) => v * pass.rgb[i]);
      if (pass.filter) filters.add(pass.filter);
    }
    if (!skipObject && objectBlocks(origin, direction, design.displayObject)) return { value: 'shadow', rgb: [0, 0, 0] };
    return { value: filters.size > 1 ? 'mixed filters' : filters.size ? [...filters][0] + ' light' : 'sunlight', rgb };
  }
  function objectReadings(design, direction) {
    const o = design.displayObject;
    if (!o) return 'No central object';
    const r = o.rotation * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
    const samples = o.model === 'crystal'
      ? planes('crystal').map((p, i) => ({ label: `Facet ${i + 1}`, p: p.slice(0, 3).map(v => v / 3), n: [p[0] / o.width, p[1] / o.height, p[2] / o.width] }))
      : [{ label: 'East face', p: [o.model === 'obelisk' ? .725 : 1, 0, 0], n: [1, o.model === 'obelisk' ? .275 * o.width / o.height : 0, 0] },
        { label: 'South face', p: [0, 0, o.model === 'obelisk' ? .725 : 1], n: [0, o.model === 'obelisk' ? .275 * o.width / o.height : 0, 1] },
        { label: 'West face', p: [o.model === 'obelisk' ? -.725 : -1, 0, 0], n: [-1, o.model === 'obelisk' ? .275 * o.width / o.height : 0, 0] },
        { label: 'North face', p: [0, 0, o.model === 'obelisk' ? -.725 : -1], n: [0, o.model === 'obelisk' ? .275 * o.width / o.height : 0, -1] }];
    return samples.map(sample => {
      const [x, y, z] = sample.p.map((v, i) => v * (i === 1 ? o.height : o.width) / 2);
      const p = { x: o.x + c * x + s * z, y: o.y + o.height / 2 + y, z: o.z - s * x + c * z };
      const [nx, ny, nz] = sample.n;
      const incidence = ((c * nx + s * nz) * direction.x + ny * direction.y + (-s * nx + c * nz) * direction.z) / Math.hypot(nx, ny, nz);
      const light = direction.y <= 0 ? 'no Sun' : incidence <= 0 ? 'faces away' : trace(design, p, direction, true).value;
      const worldBearing = (Math.atan2(c * nx + s * nz, -(-s * nx + c * nz)) * 180 / Math.PI + 360) % 360;
      const faceName = o.model === 'crystal' ? sample.label : `${['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'][Math.round(worldBearing / 45) % 8]} side`;
      return `${faceName}: ${direction.y > 0 && Math.abs(incidence) < 1e-6 ? 'edge-on to Sun' : light}`;
    }).join('; ');
  }
  function validDesign(v) {
    const finite = (n, min, max) => typeof n === 'number' && Number.isFinite(n) && n >= min && n <= max;
    const text = (s, max = 200) => typeof s === 'string' && s.length > 0 && s.length <= max;
    const solid = b => b && finite(b.x, -12, 12) && finite(b.y, 0, 10) && finite(b.z, -12, 12) && finite(b.width, .01, 5) && finite(b.height, .01, 5) && finite(b.depth, .01, 5) && finite(b.rotation, 0, 359);
    const aperture = b => {
      const a = b.aperture; if (a === undefined) return true;
      if (!a || !axes.includes(a.axis) || !['open', 'glass', 'jewel'].includes(a.insert) || !Object.hasOwn(colors, a.color)) return false;
      const cross = a.axis === 'x' ? [b.height, b.depth] : a.axis === 'y' ? [b.width, b.depth] : [b.width, b.height];
      return finite(a.diameter, .005, Math.min(...cross) * .9);
    };
    if (!v || !Array.isArray(v.blocks) || !Array.isArray(v.targets) || v.blocks.length > 100 || v.targets.length > 12 ||
      !v.blocks.every(b => solid(b) && text(b.id) && aperture(b)) ||
      !v.targets.every(t => t && text(t.id) && text(t.label, 80) && finite(t.x, -12, 12) && finite(t.z, -12, 12) &&
        (t.settings === undefined || (t.settings && typeof t.settings === 'object' && !Array.isArray(t.settings) && Object.entries(t.settings).length <= 8 && Object.entries(t.settings).every(([k, value]) => text(k, 40) && (typeof value === 'string' ? text(value, 80) : finite(value, -100000, 100000)))))) ||
      new Set(v.blocks.map(b => b.id)).size !== v.blocks.length || new Set(v.targets.map(t => t.id)).size !== v.targets.length) return false;
    const solids = [...v.blocks];
    if (v.displayObject !== undefined) {
      const o = v.displayObject;
      if (!o || !['sphere', 'crystal', 'obelisk'].includes(o.model) || !['limestone', 'bronze', 'porcelain'].includes(o.material) || !solid({ ...o, depth: o.width }) || o.width < .05 || o.height < .05) return false;
      solids.push({ ...o, depth: o.width });
    }
    return !solids.some((a, i) => solids.slice(i + 1).some(b => {
      if (a.y + a.height <= b.y + 1e-8 || b.y + b.height <= a.y + 1e-8) return false;
      const dirs = b => { const r = b.rotation * Math.PI / 180; return [[Math.cos(r), -Math.sin(r)], [Math.sin(r), Math.cos(r)]]; };
      const aa = dirs(a), bb = dirs(b), dot = (a, b) => a[0] * b[0] + a[1] * b[1];
      return [...aa, ...bb].every(axis => Math.abs(dot([b.x - a.x, b.z - a.z], axis)) <
        a.width / 2 * Math.abs(dot(axis, aa[0])) + a.depth / 2 * Math.abs(dot(axis, aa[1])) + b.width / 2 * Math.abs(dot(axis, bb[0])) + b.depth / 2 * Math.abs(dot(axis, bb[1])) - 1e-8);
    }));
  }
  window.SolarOptics = Object.freeze({ colors, local, interval, planes, blockPass, objectBlocks, trace, inspect, objectReadings, validDesign });
})();
