/* An observer at the court origin. Preview time never replaces a recorded observation. */
(() => {
  const RAD = Math.PI / 180;
  const seasons = [
    { month: 2, label: 'March', color: '#93e1bf', lane: 7 },
    { month: 5, label: 'June', color: '#ffe094', lane: 7 },
    { month: 8, label: 'September', color: '#ffb5a1', lane: 13 },
    { month: 11, label: 'December', color: '#b9d8ff', lane: 7 },
  ];
  function position(date, settings) {
    const p = window.SunCalc.getPosition(date, settings.latitude, settings.longitude);
    return { altitude: p.altitude / RAD, bearing: (p.azimuth / RAD + 540) % 360 };
  }
  function model(settings) {
    const D = window.luxon.DateTime, year = Number(settings.localDate.slice(0, 4));
    const day = window.SolarDay.day(settings);
    const references = seasons.map(season => {
      const event = window.SOLAR_SEASONS[year]?.[season.month];
      if (!event) return { ...season, localDate: null, bearing: null };
      const localDate = D.fromISO(event, { zone: settings.zone }).toISODate();
      const d = window.SolarDay.day({ ...settings, localDate });
      return { ...season, localDate, bearing: d.kind === 'normal' ? position(d.at(d.start), settings).bearing : null };
    });
    return { day, references, sunrise: day.kind === 'normal' ? position(day.at(day.start), settings) : null,
      at: offset => day.at(day.kind === 'normal' ? day.start + offset : day.noon) };
  }
  function aim(camera, options) {
    const direction = window.SolarGeometry.sunDirection(options.pitch, options.heading);
    camera.position.set(0, options.eyeHeight, 0);
    camera.up.set(0, 1, 0);
    camera.lookAt(direction.x, options.eyeHeight + direction.y, direction.z);
    // A wide horizontal field shows both solstices; portrait screens can turn in place.
    camera.fov = Math.max(25, Math.min(100, 2 * Math.atan(Math.tan(55 * RAD) / camera.aspect) / RAD / options.zoom));
    camera.updateProjectionMatrix();
  }
  function create(THREE, scene, panel, controls, makeLabel, onChange) {
    const options = { heading: 90, pitch: 3, eyeHeight: .7, offset: 10, zoom: 1 };
    const group = new THREE.Group(); group.name = 'center-sunrise-sky'; group.visible = false; scene.add(group);
    const radius = 480, guides = new THREE.Group(); group.add(guides);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(900, 32, 16), new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false,
      uniforms: { daylight: { value: 1 } },
      vertexShader: 'varying vec3 vSky; void main(){ vSky=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
      fragmentShader: 'varying vec3 vSky; uniform float daylight; void main(){ float h=clamp(normalize(vSky).y*2.0,0.0,1.0); vec3 c=mix(vec3(.98,.77,.52),vec3(.17,.43,.64),pow(h,.6)); gl_FragColor=vec4(mix(vec3(.025,.055,.10),c,daylight),1.0); }',
    }));
    dome.renderOrder = -20; group.add(dome);
    const sun = new THREE.Mesh(new THREE.SphereGeometry(radius * .006, 20, 12), new THREE.MeshBasicMaterial({ color: 0xffebad }));
    sun.name = 'observer-sun'; group.add(sun); // Depth testing lets the actual stones hide the Sun.
    let cacheKey = '', cached;
    const point = (altitude, bearing) => {
      const d = window.SolarGeometry.sunDirection(altitude, bearing);
      return new THREE.Vector3(d.x * radius, d.y * radius, d.z * radius);
    };
    const label = (text, altitude, bearing, color, width = 48) => {
      const sprite = makeLabel(text); sprite.position.copy(point(altitude, bearing));
      sprite.scale.set(width, width / 2, 1); sprite.material.color.set(color);
      sprite.material.depthTest = false; sprite.renderOrder = 10; guides.add(sprite);
    };
    function getModel(settings) {
      const key = [settings.latitude, settings.longitude, settings.zone, settings.localDate].join('|');
      if (key === cacheKey) return cached;
      cacheKey = key; cached = model(settings);
      guides.traverse(o => { o.geometry?.dispose(); o.material?.map?.dispose(); o.material?.dispose(); });
      guides.clear();
      for (const [i, text] of ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'].entries()) label(text, -4, i * 45, '#ffffff', 32);
      const legend = panel.querySelector('[data-center="seasons"]'); legend.replaceChildren();
      for (const ref of cached.references) {
        const chip = document.createElement('span'); chip.style.setProperty('--season-color', ref.color);
        chip.textContent = `${ref.label} ${ref.bearing === null ? '· no sunrise' : ref.bearing.toFixed(0) + '°'}`;
        chip.title = ref.localDate ?? 'Season date unavailable'; legend.append(chip);
        if (ref.bearing === null) continue;
        label(ref.label, ref.lane + 1.5, ref.bearing, ref.color);
        const material = new THREE.LineDashedMaterial({ color: ref.color, depthTest: false, depthWrite: false, dashSize: 2, gapSize: 2 });
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([point(.8, ref.bearing), point(ref.lane, ref.bearing)]), material);
        line.computeLineDistances(); line.renderOrder = 9; guides.add(line);
        const ring = new THREE.Mesh(new THREE.RingGeometry(2.6, 3.5, 24), new THREE.MeshBasicMaterial({ color: ref.color, side: THREE.DoubleSide, depthTest: false, depthWrite: false }));
        ring.position.copy(point(0, ref.bearing)); ring.lookAt(0, 0, 0); ring.renderOrder = 10; guides.add(ring);
      }
      return cached;
    }
    const text = (key, value) => {
      const element = panel.querySelector(`[data-center="${key}"]`) || controls.querySelector(`[data-center="${key}"]`);
      if (element.textContent !== value) element.textContent = value;
    };
    controls.querySelector('#centerOffset').addEventListener('input', event => { options.offset = Number(event.target.value); onChange(); });
    controls.querySelector('#centerEyeHeight').addEventListener('input', event => { options.eyeHeight = Number(event.target.value); onChange(); });
    function reset() { options.heading = 90; options.pitch = 3; options.zoom = 1; }
    controls.querySelector('#centerFaceEast').addEventListener('click', () => { reset(); onChange(); });
    return {
      options, reset, date: settings => getModel(settings).at(options.offset),
      turn(dx, dy) { options.heading = (options.heading + dx + 360) % 360; options.pitch = Math.max(-25, Math.min(70, options.pitch + dy)); },
      zoom(factor) { options.zoom = Math.max(.8, Math.min(3, options.zoom * factor)); },
      setVisible(visible) { group.visible = visible; panel.hidden = !visible; controls.hidden = !visible; },
      update(camera, settings, design, previewDate) {
        const m = getModel(settings), date = previewDate ?? m.at(options.offset), p = position(date, settings);
        aim(camera, options); group.position.set(0, options.eyeHeight, 0);
        sun.position.copy(point(p.altitude, p.bearing)); sun.visible = p.altitude > -.35;
        dome.material.uniforms.daylight.value = Math.max(0, Math.min(1, (p.altitude + 8) / 8));
        const local = window.luxon.DateTime.fromJSDate(date, { zone: settings.zone });
        text('date', local.toFormat('MMM d, yyyy · h:mm a ZZZZ'));
        text('rise', m.sunrise ? `Sunrise ${window.luxon.DateTime.fromJSDate(m.day.at(m.day.start), { zone: settings.zone }).toFormat('h:mm a')} · ${m.sunrise.bearing.toFixed(1)}° from north` : m.day.kind === 'polar-day' ? '24-hour daylight · no sunrise today' : 'Polar night · no sunrise today');
        text('heading', `Looking ${options.heading.toFixed(0)}° · Sun ${p.bearing.toFixed(1)}° / ${p.altitude.toFixed(1)}° high`);
        controls.querySelector('#centerOffset').disabled = !m.sunrise;
        controls.querySelector('#centerOffsetLabel').textContent = !m.sunrise ? 'Solar noon preview' : options.offset === 0 ? 'At sunrise' : `${Math.abs(options.offset)} min ${options.offset < 0 ? 'before' : 'after'} sunrise`;
        controls.querySelector('#centerEyeLabel').textContent = `${options.eyeHeight.toFixed(2)} m`;
        const eye = { x: 0, y: options.eyeHeight, z: 0 };
        const ray = window.SolarOptics.inspect(design, eye, window.SolarGeometry.sunDirection(p.altitude, p.bearing), radius);
        const inside = ray.blocked && Math.hypot(ray.hit.x, ray.hit.y - eye.y, ray.hit.z) < 1e-5;
        const blocker=design.blocks.find(b=>b.id===ray.id), blockerIndex=design.blocks.indexOf(blocker);
        text('visibility', inside ? 'Your eye is inside a stone. Raise the eye height to see out.' : p.altitude <= 0 ? 'The Sun is below the geometric horizon.' : ray.blocked ? `${blocker?.label || (blockerIndex>=0?'Block '+(blockerIndex+1):'The sculpture')} blocks the Sun from this eye height.` : 'The Sun has a clear line of sight from the center.');
      },
    };
  }
  window.CenterSunrise = Object.freeze({ model, aim, create });
})();
