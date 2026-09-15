/* Direct manipulation is a preview. The host validates and commits each completed gesture. */
(() => {
  function transform(design, ids, op) {
    const chosen = design.blocks.filter((b) => ids.includes(b.id));
    if (!chosen.length) return design;
    const x = chosen.reduce((s, b) => s + b.x, 0) / chosen.length,
      z = chosen.reduce((s, b) => s + b.z, 0) / chosen.length;
    const turn = Math.round(op.turn || 0),
      a = (turn * Math.PI) / 180,
      c = Math.cos(a),
      s = Math.sin(a),
      round = (n) => Math.round(n * 100000) / 100000;
    return {
      ...design,
      blocks: design.blocks.map((b) =>
        ids.includes(b.id)
          ? {
              ...b,
              x: round(x + c * (b.x - x) + s * (b.z - z) + (op.dx || 0)),
              z: round(z - s * (b.x - x) + c * (b.z - z) + (op.dz || 0)),
              y: round(b.y + (op.dy || 0)),
              rotation: round((((b.rotation + turn) % 360) + 360) % 360) % 360,
            }
          : b,
      ),
    };
  }
  function create(THREE, scene, camera, canvas, design, send, dirty) {
    let enabled = false,
      ids = [],
      snap = 0.05,
      assemblies = true,
      drag;
    const outlines = new THREE.Group(),
      ghosts = new THREE.Group();
    scene.add(outlines, ghosts);
    const hint = document.getElementById('editSceneHint'),
      compass = document.getElementById('sceneCompass');
    function clear(group) {
      group.traverse((o) => {
        o.geometry?.dispose();
        o.material?.dispose();
      });
      group.clear();
    }
    function select(block, additive) {
      const chosen =
        assemblies && block.assemblyId
          ? design()
              .blocks.filter((b) => b.assemblyId === block.assemblyId)
              .map((b) => b.id)
          : [block.id];
      ids = additive ? [...new Set([...ids, ...chosen])] : chosen;
      send({ type: 'editor-select', id: block.id, additive });
      refresh();
    }
    function refresh() {
      clear(outlines);
      outlines.visible = enabled;
      hint.hidden = !enabled;
      if (!enabled) return;
      for (const id of ids) {
        const mesh = scene.getObjectByName('design-block:' + id);
        if (!mesh) continue;
        const box = new THREE.BoxHelper(mesh, 0x25d6d1);
        box.material.depthTest = false;
        box.renderOrder = 20;
        outlines.add(box);
      }
      const b = design().blocks.find((b) => ids.includes(b.id));
      hint.textContent = b
        ? `${ids.length > 1 ? ids.length + ' stones' : b.label || 'Selected stone'} · X ${(b.x * 100).toFixed(0)} cm · Z ${(b.z * 100).toFixed(0)} cm · drag to move · Q / E to turn`
        : 'Click a stone to select it · drag to move · Shift-click to select several';
      dirty();
    }
    function ray(event) {
      const rect = canvas.getBoundingClientRect(),
        r = new THREE.Raycaster();
      r.setFromCamera(
        new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          (-(event.clientY - rect.top) / rect.height) * 2 + 1,
        ),
        camera,
      );
      return r;
    }
    const point = (event, y) =>
      ray(event).ray.intersectPlane(
        new THREE.Plane(new THREE.Vector3(0, 1, 0), -y),
        new THREE.Vector3(),
      );
    canvas.addEventListener(
      'pointerdown',
      (event) => {
        if (!enabled || event.button !== 0) return;
        const meshes = [];
        scene.traverse((o) => {
          if (o.name.startsWith('design-block:')) meshes.push(o);
        });
        const hit = ray(event).intersectObjects(meshes, false)[0];
        if (!hit) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        canvas.focus({ preventScroll: true });
        const b = design().blocks.find((b) => b.id === hit.object.name.slice(13));
        if (!b) return;
        if (!ids.includes(b.id) || event.shiftKey) select(b, event.shiftKey);
        const origin = point(event, hit.point.y);
        if (!origin) return;
        drag = {
          origin,
          y: hit.point.y,
          base: structuredClone(design()),
          ids: [...ids],
          op: {},
          moved: false,
        };
        canvas.setPointerCapture(event.pointerId);
      },
      true,
    );
    canvas.addEventListener(
      'pointermove',
      (event) => {
        if (!drag) return;
        event.stopImmediatePropagation();
        const p = point(event, drag.y);
        if (!p) return;
        const round = (n) => (snap && !event.altKey ? Math.round(n / snap) * snap : n);
        drag.op = { dx: round(p.x - drag.origin.x), dz: round(p.z - drag.origin.z) };
        drag.moved ||= Math.hypot(drag.op.dx, drag.op.dz) > 0.003;
        const next = transform(drag.base, drag.ids, drag.op),
          valid = window.SolarOptics.validDesign(next);
        clear(ghosts);
        for (const b of next.blocks.filter((b) => drag.ids.includes(b.id))) {
          const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(b.width, b.height, b.depth),
            new THREE.MeshBasicMaterial({
              color: valid ? 0x36d7ae : 0xff5360,
              transparent: true,
              opacity: 0.45,
              depthWrite: false,
            }),
          );
          mesh.position.set(b.x, b.y + b.height / 2, b.z);
          mesh.rotation.y = (b.rotation * Math.PI) / 180;
          ghosts.add(mesh);
        }
        hint.textContent = valid
          ? 'Release to place · Alt temporarily disables snapping'
          : 'Blocked placement · move to clear space';
        dirty();
      },
      true,
    );
    canvas.addEventListener(
      'pointerup',
      (event) => {
        if (!drag) return;
        event.stopImmediatePropagation();
        if (drag.moved)
          send({
            type: 'editor-transform',
            ids: drag.ids,
            operation: drag.op,
            expected: JSON.stringify(drag.base),
          });
        drag = undefined;
        clear(ghosts);
        refresh();
      },
      true,
    );
    canvas.addEventListener(
      'pointercancel',
      () => {
        drag = undefined;
        clear(ghosts);
        refresh();
      },
      true,
    );
    canvas.addEventListener(
      'keydown',
      (event) => {
        if (!enabled || !ids.length) return;
        const step = event.shiftKey ? 0.05 : 0.01;
        const op =
          event.key === 'ArrowLeft'
            ? { dx: -step }
            : event.key === 'ArrowRight'
              ? { dx: step }
              : event.key === 'ArrowUp'
                ? { dz: -step }
                : event.key === 'ArrowDown'
                  ? { dz: step }
                  : event.key.toLowerCase() === 'q'
                    ? { turn: 15 }
                    : event.key.toLowerCase() === 'e'
                      ? { turn: -15 }
                      : null;
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopImmediatePropagation();
          drag = undefined;
          clear(ghosts);
          ids = [];
          send({ type: 'editor-select', id: '', additive: false });
          refresh();
        }
        if (op) {
          event.preventDefault();
          event.stopImmediatePropagation();
          send({
            type: 'editor-transform',
            ids,
            operation: op,
            expected: JSON.stringify(design()),
          });
        }
      },
      true,
    );
    return {
      state(state) {
        ids = state.ids;
        snap = state.snap;
        assemblies = state.assemblies;
        refresh();
      },
      enable(value) {
        if (enabled !== value) {
          enabled = value;
          if (!enabled) {
            drag = undefined;
            clear(ghosts);
          }
          refresh();
        }
      },
      refresh,
      orient() {
        const d = camera.getWorldDirection(new THREE.Vector3()),
          bearing = ((Math.atan2(d.x, -d.z) * 180) / Math.PI + 360) % 360;
        const top = Math.abs(d.y) > 0.999;
        compass.querySelector('strong').textContent = top
          ? '↑ N · plan'
          : `Looking ${bearing.toFixed(0)}° from N`;
        compass.querySelector('span').textContent = top
          ? 'E → · origin 0,0'
          : 'X east · Z south · Y up';
      },
    };
  }
  window.MonumentEditor = Object.freeze({ create, transform });
})();
