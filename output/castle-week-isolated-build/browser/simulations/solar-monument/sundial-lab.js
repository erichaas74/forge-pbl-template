/* A vertical-post dial. Marks are measured shadow-tip positions, never a clock-face guess. */
(() => {
  'use strict';
  const activities = ['sundial-build', 'sundial-seasons', 'sundial-tilt', 'sundial-calendar'];
  const labels = { march: 'March equinox', june: 'June solstice', sept: 'September equinox', dec: 'December solstice' };
  function post(design) {
    const b = design.blocks[0];
    return design.blocks.length === 1 && !design.displayObject && b && !b.aperture && b.y === 0 ? b : null;
  }
  function build(design, cm) {
    if (!Number.isFinite(cm) || cm < 10 || cm > 200) throw Error('Choose a post height from 10 to 200 cm.');
    return { blocks: [{ id: 'practice-post', x: 0, y: 0, z: 0, width: .08, depth: .08, height: cm / 100, rotation: 0 }], targets: structuredClone(design.targets) };
  }
  function tip(design, sun) {
    const b = post(design);
    if (!b || !(sun.y > 0)) return null;
    const x = b.x - b.height * sun.x / sun.y, z = b.z - b.height * sun.z / sun.y;
    return Number.isFinite(x) && Number.isFinite(z) ? { x, z } : null;
  }
  function validContext(s) {
    return s && Number.isFinite(s.latitude) && Math.abs(s.latitude) <= 89.9 &&
      Number.isFinite(s.longitude) && Math.abs(s.longitude) <= 180 && Number.isFinite(s.minutes) && s.minutes >= -1440 && s.minutes < 2880 &&
      typeof s.zone === 'string' && typeof s.localDate === 'string' && /^20(2[5-9]|30)-\d{2}-\d{2}$/.test(s.localDate) &&
      window.luxon.DateTime.fromISO(s.localDate, { zone: s.zone }).isValid;
  }
  function reference(design) { return design.targets.find(t => t.settings?.markerKind === 'hour' && validContext(t.settings))?.settings; }
  function sameSite(a, b) { return a.latitude === b.latitude && a.longitude === b.longitude && a.zone === b.zone; }
  function mark(design, sun, settings, kind, label) {
    if (!validContext(settings) || !['clock', 'noon'].includes(settings.observationRule)) throw Error('Choose a valid place, date, and observation time.');
    const point = tip(design, sun), b = post(design);
    if (!point) throw Error('The Sun must be above the horizon to mark a shadow tip.');
    if (Math.abs(point.x) > 12 || Math.abs(point.z) > 12) throw Error('The shadow tip is beyond the marking court. Try a time closer to solar noon.');
    const ref = reference(design);
    if (kind === 'hour' && ref && (!sameSite(ref, settings) || ref.localDate !== settings.localDate)) throw Error('Return to your marking day and place to add more time marks.');
    if (kind !== 'hour' && !labels[kind]) throw Error('Choose one of the four special dates first.');
    if (kind !== 'hour' && design.targets.some(t => t.settings && !sameSite(t.settings, settings))) throw Error('Keep the same place for a fair comparison. Return to your marking place first.');
    const id = kind === 'hour' ? `sundial-hour-${settings.localDate}-${Math.round(settings.minutes)}` : `sundial-${kind}`;
    const remaining = design.targets.filter(t => t.id !== id);
    if (kind === 'hour' && remaining.filter(t => t.settings?.markerKind === 'hour').length >= 8) throw Error('You have eight time marks. Remove the last mark to try another time.');
    if (remaining.length >= 12) throw Error('The dial has room for twelve marks. Remove a mark first.');
    const target = { id, label: kind === 'hour' ? label : labels[kind], ...point, settings: {
      markerKind: kind, localDate: settings.localDate, minutes: settings.minutes,
      latitude: settings.latitude, longitude: settings.longitude, zone: settings.zone,
      observationRule: kind === 'hour' ? settings.observationRule : 'noon', height: b.height,
    } };
    return { ...structuredClone(design), targets: [...remaining, target] };
  }
  function createGuide(THREE, scene) {
    const group = new THREE.Group(); group.name = 'sundial-guide'; scene.add(group);
    const material = new THREE.MeshBasicMaterial({ color: 0xfcdf8e, side: THREE.DoubleSide });
    const dot = new THREE.Mesh(new THREE.RingGeometry(.026, .046, 32), material);
    dot.rotation.x = -Math.PI / 2; group.add(dot);
    let lines = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: 0x92724b, transparent: true, opacity: .7 })); group.add(lines);
    let key = '';
    return { update(design, sun, visible) {
      group.visible = visible; if (!visible) return;
      const point = tip(design, sun);
      dot.visible = !!point && Math.abs(point.x) <= 12 && Math.abs(point.z) <= 12;
      if (point) dot.position.set(point.x, .011, point.z);
      const next = JSON.stringify(design);
      if (next !== key) {
        key = next; const b = post(design), vertices = [];
        if (b) for (const t of design.targets.filter(t => t.settings?.markerKind === 'hour')) vertices.push(b.x, .007, b.z, t.x, .007, t.z);
        lines.geometry.dispose(); lines.geometry = new THREE.BufferGeometry();
        lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      }
    } };
  }
  window.SundialLab = Object.freeze({ activities, labels, post, build, tip, reference, mark, createGuide });
})();
