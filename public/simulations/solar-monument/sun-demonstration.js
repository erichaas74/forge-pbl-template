/* Visible ray paths use SolarOptics.inspect; decoration never changes the light solver. */
(() => {
  window.createSunDemonstration = (THREE, scene) => {
    const group = new THREE.Group(); group.name = 'sun-demonstration'; scene.add(group);
    const vector = p => new THREE.Vector3(p.x, p.y, p.z);
    function clear() {
      for (const child of [...group.children]) {
        child.traverse(o => { o.geometry?.dispose(); o.material?.dispose(); }); group.remove(child);
      }
    }
    function line(points, color, dashed = false) {
      const geometry = new THREE.BufferGeometry().setFromPoints(points.map(vector));
      const material = dashed ? new THREE.LineDashedMaterial({ color, dashSize: .04, gapSize: .025, transparent: true, opacity: .8 }) : new THREE.LineBasicMaterial({ color });
      const mesh = new THREE.Line(geometry, material); if (dashed) mesh.computeLineDistances(); group.add(mesh);
    }
    function update(design, direction, selected, visible) {
      clear(); group.visible = visible && direction.y > 0;
      if (!group.visible) return { caption: direction.y <= 0 ? 'The Sun is at or below the geometric horizon. Direct rays appear when its centre rises.' : 'Build your model, then choose Show Sun.', reference: null };
      const frame = window.MonumentCamera.bounds(design, direction, false);
      const span = Math.max(.25, frame.max.x - frame.min.x, frame.max.z - frame.min.z, frame.height);
      const b = design.blocks.find(b => 'block:' + b.id === selected) || design.blocks.find(b => b.aperture) || [...design.blocks].sort((a, b) => b.y + b.height - a.y - a.height)[0];
      const target = design.targets.find(t => 'target:' + t.id === selected);
      const centre = b ? { x: b.x, y: b.y + b.height / 2, z: b.z } : frame.centre;
      let end = target ? { ...target, y: .00002 } : { x: centre.x - centre.y * direction.x / direction.y, y: .00002, z: centre.z - centre.y * direction.z / direction.y };
      // At very low angles the actual landing point is far away. Inspect the object instead.
      const offCourt = Math.hypot(end.x - centre.x, end.z - centre.z) > Math.max(6, frame.height * 7);
      if (offCourt && !target) end = centre;
      const length = Math.max((frame.height + span * .5 - end.y) / direction.y, span * 1.5);
      const travel = { x: -direction.x, y: -direction.y, z: -direction.z };
      let featured;
      for (const offset of [0, -.23, .23]) {
        const endpoint = { x: end.x + offset * span, y: end.y, z: end.z };
        // Start high enough to be upstream of every design surface, but draw only a short incoming guide.
        const origin = { x: endpoint.x + direction.x * length, y: endpoint.y + direction.y * length, z: endpoint.z + direction.z * length };
        const result = window.SolarOptics.inspect(design, origin, travel, length);
        if (!offset) featured = result;
        for (const segment of result.segments) {
          const from = vector(segment.from), to = vector(segment.to), heading = to.clone().sub(from);
          const maxVisible = span * 2;
          if (heading.length() > maxVisible && segment === result.segments[0]) from.copy(to).addScaledVector(vector(direction), maxVisible);
          const color = segment.rgb.every(v => v > .99) ? new THREE.Color('#ffe79b') : new THREE.Color(...segment.rgb);
          line([from, to], color);
          const distance = to.distanceTo(from);
          if (distance > .04) group.add(new THREE.ArrowHelper(vector(travel), from.clone().lerp(to, .5), Math.min(distance * .3, span * .22), color, Math.min(.10, span * .075), Math.min(.055, span * .04)));
        }
        const dot = new THREE.Mesh(new THREE.SphereGeometry(span * (offset ? .009 : .017), 12, 8), new THREE.MeshBasicMaterial({ color: result.blocked ? '#efbc6b' : '#fff3bc' }));
        dot.position.copy(vector(result.hit)); group.add(dot);
      }
      const height = b ? b.y + b.height : frame.height;
      const base = { x: (b?.x ?? frame.centre.x), y: .012, z: (b?.z ?? frame.centre.z) };
      const tip = { x: base.x - height * direction.x / direction.y, y: .012, z: base.z - height * direction.z / direction.y };
      const reference = height * Math.hypot(direction.x, direction.z) / direction.y;
      const referenceVisible = reference < Math.max(6, height * 7);
      if (referenceVisible) line([base, tip], '#c9804b', true);
      const altitude = Math.asin(direction.y), radius = Math.min(.65, span * .45);
      const horizontal = Math.max(1e-8, Math.hypot(direction.x, direction.z));
      const anchor = { x: frame.min.x - span * .18, y: .015, z: frame.max.z + span * .16 };
      const arc = Array.from({ length: 33 }, (_, i) => {
        const a = altitude * i / 32;
        return { x: anchor.x + radius * Math.cos(a) * direction.x / horizontal, y: anchor.y + radius * Math.sin(a), z: anchor.z + radius * Math.cos(a) * direction.z / horizontal };
      });
      line([anchor, arc[0]], '#e5c889'); line(arc, '#f5c24d'); line([anchor, arc[32]], '#f5c24d');
      return { reference, referenceVisible, caption: featured?.blocked ? 'The highlighted ray stops at the solid surface. No direct sunlight continues behind that point.' : offCourt ? 'The ray is shown at the model. Its ground landing is beyond this view.' : featured?.filters.some(c => c !== 'clear') ? `The ray passes through ${featured.filters.filter(c => c !== 'clear').join(' + ')} glass and reaches the highlighted point.` : 'The highlighted ray reaches the ground through an open path.', offCourt };
    }
    return { update, setVisible: visible => { group.visible = visible; }, dispose() { clear(); scene.remove(group); } };
  };
})();
