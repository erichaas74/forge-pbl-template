/* Reproducible seasonal and nearby-date tests, using the live lab's time resolver. */
(() => {
  const scenarios = [
    { id: 'march', month: 2, label: 'March equinox' },
    { id: 'june', month: 5, label: 'June solstice' },
    { id: 'sept', month: 8, label: 'September equinox' },
    { id: 'dec', month: 11, label: 'December solstice' },
  ];
  const labels = { noon: 'solar noon', morning: '30 min after sunrise', evening: '30 min before sunset', clock: 'local clock time' };
  function resolve(settings, check) {
    const rule = check?.settings?.observationRule ?? 'noon';
    const clock = check?.settings?.minutes ?? 720;
    if (!Object.hasOwn(labels, rule) || !Number.isFinite(clock) || clock < 0 || clock >= 1440) throw new Error('Invalid observation time.');
    return { rule, clock, observation: window.SolarDay.observe(settings, rule, clock) };
  }
  window.SolarReview = Object.freeze({
    resolve,
    evaluate({ design, checks, settings, id }) {
      const { DateTime } = window.luxon;
      const year = Number(settings.localDate.slice(0, 4));
      if (!window.SOLAR_SEASONS[year]) throw new Error('Choose a year from 2025 to 2030.');
      return scenarios.map(scenario => {
        const localDate = DateTime.fromISO(window.SOLAR_SEASONS[year][scenario.month], { zone: 'utc' }).setZone(settings.zone).toISODate();
        const check = checks.find(item => item.scenarioId === scenario.id);
        const { rule, clock, observation } = resolve({ ...settings, localDate }, check);
        // A polar site may have no sunrise/sunset. Show noon for orientation, explicitly unavailable.
        const display = observation || window.SolarDay.observe({ ...settings, localDate });
        const localTime = DateTime.fromJSDate(display.date, { zone: settings.zone });
        const minutes = display.minutes;
        const position = window.SunCalc.getPosition(display.date, settings.latitude, settings.longitude);
        const altitude = position.altitude * 180 / Math.PI;
        const compass = (position.azimuth * 180 / Math.PI + 540) % 360;
        const direction = window.SolarGeometry.sunDirection(altitude, compass);
        const target = design.targets.find(item => item.id === check?.targetId);
        const configured = target && ['shadow', 'sunlight', 'red light', 'amber light', 'green light', 'blue light', 'violet light', 'mixed filters'].includes(check?.expectedValue);
        const actual = !observation || altitude <= 0 || (!design.blocks.length && !design.displayObject) ? 'unavailable' : !target ? 'unconfigured' : window.SolarOptics.trace(design, target, direction).value;
        const outcome = !configured ? 'unconfigured' : actual === 'unavailable' ? 'unavailable' : actual === check.expectedValue ? 'met' : 'missed';
        const height = Math.max(design.displayObject ? design.displayObject.y + design.displayObject.height : 0, ...design.blocks.map(block => block.y + block.height));
        const nearby = offset => {
          const nearbyDate = DateTime.fromISO(localDate, { zone: settings.zone }).plus({ days: offset }).toISODate();
          const observed = resolve({ ...settings, localDate: nearbyDate }, check).observation;
          if (!configured) return 'Choose a target and expectation';
          if (!observed || (!design.blocks.length && !design.displayObject)) return `${nearbyDate}: unavailable`;
          const p = window.SunCalc.getPosition(observed.date, settings.latitude, settings.longitude);
          const value = window.SolarOptics.trace(design, target, window.SolarGeometry.sunDirection(p.altitude * 180 / Math.PI, p.azimuth * 180 / Math.PI + 180)).value;
          return `${nearbyDate}: ${value}${value === check.expectedValue ? ' · also matches' : ' · does not match'}`;
        };
        return {
          id: `${id}:${scenario.id}`, pluginId: 'simulation.solar-monument', capturedAt: new Date().toISOString(), design: structuredClone(design),
          settings: { latitude: settings.latitude, longitude: settings.longitude, zone: settings.zone, localDate, minutes, utcInstant: display.date.toISOString(), modelVersion: 'solar-optics-2.0', scenarioId: scenario.id, reviewId: id, targetId: target?.id || '-', expectedValue: configured ? check.expectedValue : '-', actualValue: actual, outcome, observationRule: rule, clockMinutes: clock, observationAvailable: observation ? 1 : 0 },
          measurements: [
            { label: 'Seasonal event', value: scenario.label },
            { label: 'Observation', value: observation ? `${localDate} · ${localTime.toFormat('h:mm:ss a')} · ${labels[rule]} · ${settings.zone}` : `${localDate} · No ${labels[rule]} at this site. Canvas shows noon for orientation.` },
            { label: 'Sun altitude', value: `${altitude.toFixed(2)}°` },
            { label: 'Sun direction', value: `${compass.toFixed(2)}° clockwise from north` },
            { label: 'Height-only shadow reference', value: altitude > 0 ? `${(height / Math.tan(position.altitude)).toFixed(3)} m` : 'No direct sunlight' },
            { label: 'Target', value: target?.label || 'Choose a ground target' },
            { label: 'Expected', value: configured ? check.expectedValue : 'Choose an expectation' },
            { label: 'Observed at target centre', value: actual },
            { label: 'Sculpture surface samples', value: window.SolarOptics.objectReadings(design, direction) },
            { label: 'Comparison', value: outcome === 'met' ? 'Matches expectation' : outcome === 'missed' ? 'Does not match yet' : outcome === 'unavailable' ? 'No direct sunlight or no design' : 'Set a target and expectation' },
            { label: '7 days before', value: nearby(-7) },
            { label: '7 days after', value: nearby(7) },
          ],
        };
      });
    },
  });
})();
