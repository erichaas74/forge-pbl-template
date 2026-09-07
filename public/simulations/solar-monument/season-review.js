/* Four reproducible tests of one design at one location and local solar noon. */
(() => {
  const scenarios = [
    { id: 'march', month: 2, label: 'March equinox' },
    { id: 'june', month: 5, label: 'June solstice' },
    { id: 'sept', month: 8, label: 'September equinox' },
    { id: 'dec', month: 11, label: 'December solstice' },
  ];
  window.SolarReview = Object.freeze({
    evaluate({ design, checks, settings, id }) {
      const { DateTime } = window.luxon;
      const year = Number(settings.localDate.slice(0, 4));
      if (!window.SOLAR_SEASONS[year]) throw new Error('Choose a year from 2025 to 2030.');
      return scenarios.map(scenario => {
        const localDate = DateTime.fromISO(window.SOLAR_SEASONS[year][scenario.month], { zone: 'utc' }).setZone(settings.zone).toISODate();
        const midday = DateTime.fromISO(`${localDate}T12:00`, { zone: settings.zone });
        const noon = window.SunCalc.getTimes(midday.toJSDate(), settings.latitude, settings.longitude).solarNoon;
        const localNoon = DateTime.fromJSDate(noon, { zone: settings.zone });
        const minutes = localNoon.hour * 60 + localNoon.minute + localNoon.second / 60 + localNoon.millisecond / 60000;
        const position = window.SunCalc.getPosition(noon, settings.latitude, settings.longitude);
        const altitude = position.altitude * 180 / Math.PI;
        const compass = (position.azimuth * 180 / Math.PI + 540) % 360;
        const direction = window.SolarGeometry.sunDirection(altitude, compass);
        const check = checks.find(item => item.scenarioId === scenario.id);
        const target = design.targets.find(item => item.id === check?.targetId);
        const configured = target && ['shadow', 'sunlight', 'red light', 'amber light', 'green light', 'blue light', 'violet light', 'mixed filters'].includes(check?.expectedValue);
        const actual = altitude <= 0 || (!design.blocks.length && !design.displayObject) ? 'unavailable' : !target ? 'unconfigured' : window.SolarOptics.trace(design, target, direction).value;
        const outcome = !configured ? 'unconfigured' : actual === 'unavailable' ? 'unavailable' : actual === check.expectedValue ? 'met' : 'missed';
        const height = Math.max(design.displayObject ? design.displayObject.y + design.displayObject.height : 0, ...design.blocks.map(block => block.y + block.height));
        return {
          id: `${id}:${scenario.id}`, pluginId: 'simulation.solar-monument', capturedAt: new Date().toISOString(), design: structuredClone(design),
          settings: { latitude: settings.latitude, longitude: settings.longitude, zone: settings.zone, localDate, minutes, utcInstant: noon.toISOString(), modelVersion: 'solar-optics-2.0', scenarioId: scenario.id, reviewId: id, targetId: target?.id || '-', expectedValue: configured ? check.expectedValue : '-', actualValue: actual, outcome },
          measurements: [
            { label: 'Seasonal event', value: scenario.label },
            { label: 'Observation', value: `${localDate} · ${localNoon.toFormat('h:mm:ss a')} solar noon · ${settings.zone}` },
            { label: 'Sun altitude', value: `${altitude.toFixed(2)}°` },
            { label: 'Sun direction', value: `${compass.toFixed(2)}° clockwise from north` },
            { label: 'Height-only shadow reference', value: altitude > 0 ? `${(height / Math.tan(position.altitude)).toFixed(3)} m` : 'No direct sunlight' },
            { label: 'Target', value: target?.label || 'Choose a ground target' },
            { label: 'Expected', value: configured ? check.expectedValue : 'Choose an expectation' },
            { label: 'Observed at target centre', value: actual },
            { label: 'Sculpture surface samples', value: window.SolarOptics.objectReadings(design, direction) },
            { label: 'Comparison', value: outcome === 'met' ? 'Matches expectation' : outcome === 'missed' ? 'Does not match yet' : outcome === 'unavailable' ? 'No direct sunlight or no design' : 'Set a target and expectation' },
          ],
        };
      });
    },
  });
})();
