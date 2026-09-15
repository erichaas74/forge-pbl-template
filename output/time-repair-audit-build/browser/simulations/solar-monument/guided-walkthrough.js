/* Instrument settings and live measurements for a host-owned lesson. No curriculum here. */
(() => {
  'use strict';
  function valid(s) {
    return s && typeof s === 'object' && Number.isFinite(s.latitude) && Math.abs(s.latitude) <= 89.9 &&
      Number.isFinite(s.longitude) && Math.abs(s.longitude) <= 180 && Number.isInteger(s.year) && s.year >= 2025 && s.year <= 2030 &&
      ['march', 'june', 'sept', 'dec'].includes(s.season) && ['noon', 'clock', 'morning'].includes(s.rule) &&
      ['angle', 'top', 'target'].includes(s.camera) && (s.rule !== 'clock' || (Number.isFinite(s.minutes) && s.minutes >= 0 && s.minutes < 1440)) &&
      (s.earth === undefined || typeof s.earth === 'boolean') &&
      (s.targetId === undefined || (typeof s.targetId === 'string' && s.targetId.length <= 80));
  }
  function readings(design, settings, sun, practice) {
    const direction = window.SolarGeometry.sunDirection(sun.altitudeDeg, sun.compassDeg);
    const date = window.luxon.DateTime.fromISO(settings.localDate, { zone: settings.zone }).startOf('day').plus({ minutes: settings.minutes });
    const rows = [{ label: 'Date & time', value: date.toFormat('MMM d · h:mm a') },
      { label: 'Sun above horizon', value: sun.altitudeDeg.toFixed(1) + '°' }];
    if (practice) {
      const tip = window.SundialLab.tip(design, direction), post = window.SundialLab.post(design);
      rows.push({ label: 'Shadow length', value: tip && post ? (Math.hypot(tip.x - post.x, tip.z - post.z) * 100).toFixed(1) + ' cm' : 'No visible shadow tip' });
    } else {
      for (const target of design.targets.filter(t => t.y && t.normal).slice(0, 4))
        rows.push({ label: target.label, value: window.SolarOptics.trace(design, target, direction).value });
    }
    return rows;
  }
  window.SolarWalkthrough = Object.freeze({ valid, readings });
})();
