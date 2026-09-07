/* Local sky directions share the monument's east/up/south coordinate system.
   The sky sphere's radius and marker sizes are illustrative; angles are calculated. */
(() => {
  'use strict';
  window.createSolarSky = function (THREE, scene, makeLabel) {
    const group = new THREE.Group();
    scene.add(group);
    const paths = new THREE.Group();
    const guides = new THREE.Group();
    group.add(paths, guides);
    const sun = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 12), new THREE.MeshBasicMaterial({ color: '#ffe28a' }));
    const moon = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 10), new THREE.MeshBasicMaterial({ color: '#dbe9ff' }));
    const sunLabel = makeLabel('Sun');
    const moonLabel = makeLabel('Moon');
    group.add(sun, moon, sunLabel, moonLabel);
    const ray = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: '#ffe28a' }));
    group.add(ray);
    let previousKey = '';
    function clear(container) {
      for (const child of [...container.children]) {
        child.traverse((object) => {
          object.geometry?.dispose();
          object.material?.map?.dispose();
          object.material?.dispose();
        });
        container.remove(child);
      }
    }
    function line(container, points, color, segments = false) {
      const geometry = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, p.y, p.z)));
      const material = new THREE.LineBasicMaterial({ color });
      container.add(segments ? new THREE.LineSegments(geometry, material) : new THREE.Line(geometry, material));
    }
    function label(text, position, size) {
      const sprite = makeLabel(text);
      sprite.position.copy(position);
      sprite.scale.set(size, size / 2, 1);
      guides.add(sprite);
    }
    function vector(position, radius) {
      const d = window.SolarGeometry.sunDirection(position.altitudeDeg, position.compassDeg);
      return new THREE.Vector3(d.x, d.y, d.z).multiplyScalar(radius);
    }
    return {
      setVisible(visible) { group.visible = visible; },
      update({ radius, key, tracks, sunPosition, moonPosition, showMoon, showLabels }) {
        if (key !== previousKey) {
          previousKey = key;
          clear(paths);
          clear(guides);
          for (const track of tracks) {
            const points = window.SolarGeometry.skySegments(track.points).map(p => ({ x: p.x * radius, y: p.y * radius, z: p.z * radius }));
            line(paths, points, track.color, true);
          }
          const horizon = Array.from({ length: 97 }, (_, i) => vector({ altitudeDeg: 0, compassDeg: i * 360 / 96 }, radius));
          // Slight lift prevents the geometric horizon line from fighting the ground surface.
          horizon.forEach(point => point.y = .01);
          line(guides, horizon, '#86a89e');
          for (const bearing of [0, 90]) {
            const arc = Array.from({ length: 49 }, (_, i) => {
              const angle = i * Math.PI / 48;
              return bearing === 0
                ? { x: 0, y: Math.sin(angle) * radius, z: -Math.cos(angle) * radius }
                : { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, z: 0 };
            });
            line(guides, arc, '#395f61');
          }
          if (showLabels) {
            for (const [text, bearing] of [['N', 0], ['E', 90], ['S', 180], ['W', 270]]) {
              const p = vector({ altitudeDeg: 0, compassDeg: bearing }, radius * 1.08);
              p.y = radius * .025;
              label(text, p, radius * .15);
            }
          }
        }
        sun.position.copy(vector(sunPosition, radius));
        moon.position.copy(vector(moonPosition, radius));
        sun.scale.setScalar(radius * .025);
        moon.scale.setScalar(radius * .018);
        sun.visible = sunPosition.altitudeDeg > 0;
        moon.visible = showMoon && moonPosition.altitudeDeg > 0;
        for (const [marker, caption] of [[sun, sunLabel], [moon, moonLabel]]) {
          caption.position.copy(marker.position).add(new THREE.Vector3(0, radius * .09, 0));
          caption.scale.set(radius * .23, radius * .115, 1);
          caption.visible = marker.visible && showLabels;
        }
        // A direction guide to the ground origin; shadows still use parallel rays for every block.
        ray.geometry.dispose();
        ray.geometry = new THREE.BufferGeometry().setFromPoints([sun.position, new THREE.Vector3()]);
        ray.visible = sun.visible;
      },
      dispose() { clear(group); scene.remove(group); },
    };
  };
})();
