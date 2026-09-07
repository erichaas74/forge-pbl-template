/* A synchronized schematic Earth: orbit position, fixed axis, rotating site and local horizon. */
(() => {
  window.createEarthExplanation = (THREE, canvas) => {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(36, 1, .01, 100);
    const closeCamera = new THREE.PerspectiveCamera(38, 1, .01, 100);
    let closeView;
    camera.position.set(0, 6.8, 8.8); camera.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight(0xcde4ef, 0x434132, .75));
    const sun = new THREE.Mesh(new THREE.SphereGeometry(.26, 24, 16), new THREE.MeshBasicMaterial({ color: '#ffc54d' })); scene.add(sun);
    const light = new THREE.DirectionalLight('#fff1d2', 2.6); scene.add(light, light.target);
    const orbit = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 120 }, (_, i) => new THREE.Vector3(Math.cos(i * Math.PI / 60) * 2.35, 0, Math.sin(i * Math.PI / 60) * 2.35))), new THREE.LineBasicMaterial({ color: '#b4bcb0' })); scene.add(orbit);
    const earthGroup = new THREE.Group(); scene.add(earthGroup);
    const globe = new THREE.Mesh(new THREE.SphereGeometry(.53, 48, 32), new THREE.MeshStandardMaterial({ color: '#4686a2', roughness: .9 })); earthGroup.add(globe);
    const surface = new THREE.Group(); earthGroup.add(surface);
    // Latitude rings make the daily spin and the site's hemisphere legible without an extra asset load.
    for (const latitude of [-60, -30, 0, 30, 60]) {
      const a = latitude * Math.PI / 180, r = .536 * Math.cos(a);
      surface.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 80 }, (_, i) => new THREE.Vector3(r * Math.cos(i * Math.PI / 40), .536 * Math.sin(a), r * Math.sin(i * Math.PI / 40)))), new THREE.LineBasicMaterial({ color: latitude ? '#699dad' : '#e6cb80', transparent: true, opacity: .85 })));
    }
    for (const longitude of [0, 60, 120]) {
      const a = longitude * Math.PI / 180;
      surface.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 80 }, (_, i) => { const t = i * Math.PI / 40; return new THREE.Vector3(.536 * Math.cos(t) * Math.cos(a), .536 * Math.sin(t), .536 * Math.cos(t) * Math.sin(a)); })), new THREE.LineBasicMaterial({ color: '#699dad', transparent: true, opacity: .6 })));
    }
    const axis = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), .9, '#f9e3a6', .10, .06); earthGroup.add(axis);
    const southAxis = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, -1, 0)]), new THREE.LineBasicMaterial({ color: '#f9e3a6' })); earthGroup.add(southAxis);
    const upright = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 1, 0)]), new THREE.LineBasicMaterial({ color: '#9da7ad' })); earthGroup.add(upright);
    const tiltArc = new THREE.Line(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 25 }, (_, i) => { const a = i / 24 * 23.4397 * Math.PI / 180; return new THREE.Vector3(0, .78 * Math.cos(a), -.78 * Math.sin(a)); })), new THREE.LineBasicMaterial({ color: '#f9e3a6' })); earthGroup.add(tiltArc);
    const site = new THREE.Mesh(new THREE.SphereGeometry(.052, 16, 12), new THREE.MeshBasicMaterial({ color: '#ff7854' })); earthGroup.add(site);
    const horizon = new THREE.Mesh(new THREE.CircleGeometry(.16, 40), new THREE.MeshBasicMaterial({ color: '#fbe7b5', transparent: true, opacity: .6, side: THREE.DoubleSide })); earthGroup.add(horizon);
    const incoming = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1, '#ffdc83', .10, .055); scene.add(incoming);
    function update(date, latitude, longitude) {
      const model = window.SolarDay.earth(date, latitude, longitude), sunDirection = new THREE.Vector3(...model.sun), normal = new THREE.Vector3(...model.site);
      earthGroup.position.copy(sunDirection).multiplyScalar(-2.35);
      light.position.copy(earthGroup.position).addScaledVector(sunDirection, 10); light.target.position.copy(earthGroup.position); light.target.updateMatrixWorld();
      surface.rotation.set(-model.tilt, model.sidereal, 0, 'XYZ');
      axis.setDirection(new THREE.Vector3(...model.north));
      southAxis.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(...model.north));
      site.position.copy(normal).multiplyScalar(.56);
      horizon.position.copy(normal).multiplyScalar(.55); horizon.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      const landing = earthGroup.position.clone().add(site.position);
      incoming.position.copy(landing).addScaledVector(sunDirection, 1.05); incoming.setDirection(sunDirection.clone().negate());
      const rect = canvas.getBoundingClientRect(), width = Math.max(1, rect.width), height = Math.max(1, rect.height), split = Math.round(width * .58);
      renderer.setSize(width, height, false); renderer.setScissorTest(true);
      // Fixed viewing direction preserves the axis orientation as the site spins. The second view locates Earth in its orbit.
      if (!closeView) {
        closeView = new THREE.Vector3(model.site[0], 0, model.site[2]);
        if (closeView.length() < .01) closeView.set(model.sun[0], 0, model.sun[2]);
        closeView.normalize().multiplyScalar(3.2); closeView.y = 1.3;
      }
      closeCamera.position.copy(earthGroup.position).add(closeView); closeCamera.lookAt(earthGroup.position);
      closeCamera.aspect = split / height; closeCamera.updateProjectionMatrix();
      orbit.visible = false; sun.visible = false;
      renderer.setViewport(0, 0, split, height); renderer.setScissor(0, 0, split, height); renderer.render(scene, closeCamera);
      orbit.visible = true; sun.visible = true;
      const orbitHeight = Math.min(height, (width - split) * .95), bottom = (height - orbitHeight) / 2;
      camera.aspect = (width - split) / orbitHeight; camera.updateProjectionMatrix();
      renderer.setViewport(split, bottom, width - split, orbitHeight); renderer.setScissor(split, bottom, width - split, orbitHeight); renderer.render(scene, camera);
      renderer.setScissorTest(false);
      return model;
    }
    return { update, dispose() { scene.traverse(o => { o.geometry?.dispose(); o.material?.dispose(); }); renderer.dispose(); } };
  };
})();
