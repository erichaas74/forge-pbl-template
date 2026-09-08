/* Calendar observations are fixed ground points. Their carvings never intercept optical rays. */
(() => {
  'use strict';
  const labels = { march: 'March equinox', june: 'June solstice', sept: 'September equinox', dec: 'December solstice' };
  const lights = ['shadow', 'sunlight', 'red light', 'amber light', 'green light', 'blue light', 'violet light', 'mixed filters'];
  function record(target) {
    const s = target?.settings;
    if (!s || !['calendar-observation', ...Object.keys(labels).map(key => 'calendar-' + key)].includes(s.markerKind)) return null;
    const date = window.luxon.DateTime.fromISO(s.utcInstant, { zone: s.zone });
    if (!date.isValid || date.year < 2025 || date.year > 2030 || !lights.includes(s.light) ||
      !Number.isFinite(s.latitude) || Math.abs(s.latitude) > 89.9 || !Number.isFinite(s.longitude) || Math.abs(s.longitude) > 180 ||
      !Number.isFinite(s.sunAltitude) || s.sunAltitude <= 0 || s.sunAltitude > 90 || !Number.isFinite(s.sunAzimuth) || s.sunAzimuth < 0 || s.sunAzimuth >= 360) return null;
    return { ...s, localDate: date.toISODate(), minutes: date.hour * 60 + date.minute + date.second / 60 + date.millisecond / 60000 };
  }
  function make(design, point, settings, sun, id) {
    if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.z) || Math.abs(point.x) > 12 || Math.abs(point.z) > 12) throw Error('Choose a point inside the 24 m marking court.');
    if (!design.blocks.length && !design.displayObject) throw Error('Build a monument before recording a calendar stone.');
    if (!(sun.altitudeDeg > 0)) throw Error('Choose a daylight time to record the Sun.');
    if (design.targets.length >= 12 && !design.targets.some(target => target.id === id)) throw Error('Your court has room for 12 markers. Remove one to make space.');
    const covered = design.blocks.some(b => {
      if (b.y > .001) return false;
      const r = b.rotation * Math.PI / 180, x = point.x - b.x, z = point.z - b.z;
      return Math.abs(Math.cos(r) * x - Math.sin(r) * z) < b.width / 2 && Math.abs(Math.sin(r) * x + Math.cos(r) * z) < b.depth / 2;
    });
    const object = design.displayObject;
    if (covered || (object?.y < .001 && Math.hypot(point.x - object.x, point.z - object.z) < object.width * Math.SQRT1_2)) throw Error('Place the marker on clear floor, beside the stone or sculpture.');
    const date = window.luxon.DateTime.fromISO(settings.utcInstant, { zone: settings.zone });
    const localDate = date.toISODate();
    const event = Object.keys(labels).find(key => {
      const month = { march: 2, june: 5, sept: 8, dec: 11 }[key];
      const instant = window.SOLAR_SEASONS[date.year]?.[month];
      return instant && window.luxon.DateTime.fromISO(instant, { zone: 'utc' }).setZone(settings.zone).toISODate() === localDate;
    });
    const direction = window.SolarGeometry.sunDirection(sun.altitudeDeg, sun.compassDeg);
    const light = window.SolarOptics.trace(design, point, direction).value;
    const target = { id, label: `${labels[event] || date.toFormat('MMM d')} · ${light}`, x: point.x, z: point.z, settings: {
      markerKind: 'calendar-' + (event || 'observation'), utcInstant: settings.utcInstant, zone: settings.zone,
      latitude: settings.latitude, longitude: settings.longitude,
      sunAltitude: sun.altitudeDeg, sunAzimuth: sun.compassDeg, light,
    } };
    if (!record(target)) throw Error('Choose a valid date, place and daylight observation.');
    return target;
  }
  function stone(THREE, target, index) {
    const group = new THREE.Group(); group.name = 'calendar-stone:' + target.id;
    group.position.set(target.x, .009, target.z);
    const s = record(target);
    const color = { 'red light': 0xc75749, 'amber light': 0xd9a938, 'blue light': 0x629add, 'green light': 0x66a178, 'violet light': 0xb280d2, shadow: 0x7c8290 }[s?.light] ?? 0xd0b875;
    const face = new THREE.Mesh(new THREE.RingGeometry(.067, .125, 48), new THREE.MeshBasicMaterial({ color: 0xbca785, side: THREE.DoubleSide }));
    face.rotation.x = -Math.PI / 2; group.add(face);
    const rim = new THREE.Mesh(new THREE.RingGeometry(.119, .13, 48), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
    rim.rotation.x = -Math.PI / 2; rim.position.y = .001; group.add(rim);
    const lines = [];
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6;
      lines.push(Math.sin(a) * .105, .003, Math.cos(a) * .105, Math.sin(a) * .119, .003, Math.cos(a) * .119);
    }
    // Engraved arrow points toward the recorded Sun, not the present Sun.
    if (s) {
      const a = s.sunAzimuth * Math.PI / 180, dx = Math.sin(a), dz = -Math.cos(a);
      lines.push(dx * .078, .004, dz * .078, dx * .112, .004, dz * .112);
      for (const side of [-1, 1]) lines.push(dx * .112, .004, dz * .112, dx * .094 + dz * .012 * side, .004, dz * .094 - dx * .012 * side);
    }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
    group.add(new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: 0x554737 })));
    group.userData.targetId = target.id; group.userData.number = index + 1;
    return group;
  }
  window.CalendarMarkers = Object.freeze({ labels, lights, record, make, stone });
})();
