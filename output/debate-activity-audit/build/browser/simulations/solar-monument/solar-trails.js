/* Reference samples are guides, never additional solids or measured shadow footprints. */
(() => {
  function shadowTip(block, sample) {
    if (sample.altitude <= 0) return null;
    const d = window.SolarGeometry.sunDirection(sample.altitude, sample.bearing),
      height = block.y + block.height;
    const p = { x: block.x - (height * d.x) / d.y, y: 0.018, z: block.z - (height * d.z) / d.y };
    return Math.hypot(p.x, p.z) <= 24 ? p : null;
  }
  function create(THREE, scene, makeLabel) {
    const group = new THREE.Group();
    group.name = 'annual-reference-trail';
    scene.add(group);
    let key = '';
    function update(settings, design, selected, center, eyeHeight, visible) {
      group.visible = visible;
      if (!visible) return '';
      const block =
        design.blocks.find((b) => b.id === selected) ||
        [...design.blocks].sort((a, b) => b.y + b.height - a.y - a.height)[0];
      const next = JSON.stringify([
        settings.latitude,
        settings.longitude,
        settings.zone,
        settings.localDate.slice(0, 4),
        block,
        center,
        eyeHeight,
      ]);
      const caption = center
        ? 'Teal marks = sunrise on the 15th of each month. Seasonal rings stay fixed.'
        : block
          ? `Teal trail = monthly solar-noon shadow tip for ${block.label || 'the selected stone'}’s top center. A reference point, not the full shadow.`
          : 'Add a stone to see its yearly shadow-tip trail.';
      if (next === key) return caption;
      key = next;
      group.traverse((o) => {
        o.geometry?.dispose();
        o.material?.map?.dispose();
        o.material?.dispose();
      });
      group.clear();
      let previous;
      for (const sample of window.SolarExplorer.annual(settings)) {
        const d =
          center && sample.rise !== null ? window.SolarGeometry.sunDirection(0, sample.rise) : null;
        const p = center
          ? d
            ? { x: d.x * 475, y: eyeHeight, z: d.z * 475 }
            : null
          : block
            ? shadowTip(block, sample)
            : null;
        if (!p) {
          previous = undefined;
          continue;
        }
        const position = new THREE.Vector3(p.x, p.y, p.z),
          size = center ? 1.5 : 0.027;
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(size, 10, 8),
          new THREE.MeshBasicMaterial({ color: '#42cabb', depthTest: !center }),
        );
        dot.position.copy(position);
        group.add(dot);
        if (previous && !center)
          group.add(
            new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([previous, position]),
              new THREE.LineBasicMaterial({ color: '#168d8c' }),
            ),
          );
        if (!center || [1, 4, 7, 10].includes(sample.month)) {
          const label = makeLabel(
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][
              sample.month - 1
            ],
          );
          label.position.copy(position);
          label.position.y += center ? 18 : 0.09;
          label.scale.set(center ? 24 : 0.2, center ? 12 : 0.1, 1);
          label.material.depthTest = false;
          group.add(label);
        }
        previous = position;
      }
      return caption;
    }
    return { update };
  }
  window.SolarTrails = Object.freeze({ shadowTip, create });
})();
