/* A time/altitude picture of the same local solar day used by the monument. */
(() => {
  'use strict';
  const plot = { left: 44, right: 476, top: 26, horizon: 166 };
  function position(date, settings) {
    const p = window.SunCalc.getPosition(date, settings.latitude, settings.longitude);
    return { altitude: p.altitude * 180 / Math.PI, bearing: (p.azimuth * 180 / Math.PI + 540) % 360 };
  }
  function direction(bearing) {
    return `${['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round(bearing / 45) % 8]} · ${Math.round(bearing)}°`;
  }
  function clock(date, settings) {
    const time = window.luxon.DateTime.fromJSDate(date, { zone: settings.zone });
    const offset = time.toISODate() === settings.localDate ? '' : ` · ${time.toFormat('MMM d')}`;
    return time.toFormat('h:mm a') + offset;
  }
  function project(instant, altitude, start, end) {
    return { x: plot.left + (instant - start) / (end - start) * (plot.right - plot.left),
      y: plot.horizon - altitude / 90 * (plot.horizon - plot.top) };
  }
  function dayModel(settings) {
    const day = window.SolarDay.day(settings);
    const start = day.at(day.start).valueOf(), end = day.at(day.end).valueOf();
    const sample = instant => {
      const sun = position(new Date(instant), settings);
      return { instant, ...sun, ...project(instant, sun.altitude, start, end) };
    };
    // Sample elapsed time, including any clock changes in the selected zone.
    const samples = Array.from({ length: 145 }, (_, i) => sample(start + (end - start) * i / 144));
    const event = minutes => {
      const date = day.at(minutes), sun = position(date, settings);
      return { time: clock(date, settings), direction: direction(sun.bearing), ...sample(date.valueOf()) };
    };
    return { settings, kind: day.kind, start, end, samples, noon: event(day.noon),
      sunrise: day.kind === 'normal' ? event(day.start) : null,
      sunset: day.kind === 'normal' ? event(day.end) : null };
  }
  function current(model, date) {
    const sun = position(date, model.settings), instant = date.valueOf();
    return { ...sun, ...project(instant, sun.altitude, model.start, model.end),
      inRange: instant >= model.start && instant <= model.end,
      time: clock(date, model.settings), direction: direction(sun.bearing) };
  }
  function create(panel) {
    const svg = panel.querySelector('svg'), find = name => panel.querySelector(`[data-sun-day="${name}"]`);
    let key = '', model;
    const setText = (name, value) => { const node = find(name); if (node.textContent !== value) node.textContent = value; };
    return { update(settings, date) {
      const nextKey = [settings.latitude, settings.longitude, settings.localDate, settings.zone].join('|');
      if (nextKey !== key) {
        key = nextKey; model = dayModel(settings);
        const points = model.samples.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
        find('path').setAttribute('points', points);
        find('path').setAttribute('stroke-dasharray', model.kind === 'polar-night' ? '3 6' : '5 5');
        setText('date', window.luxon.DateTime.fromISO(settings.localDate, { zone: settings.zone }).toFormat('MMM d, yyyy'));
        setText('place', `${settings.latitude.toFixed(2)}°, ${settings.longitude.toFixed(2)}° · ${settings.zone}`);
        setText('rise-time', model.sunrise?.time ?? 'No sunrise today');
        setText('rise-direction', model.sunrise?.direction ?? (model.kind === 'polar-day' ? 'Sun stays above the horizon' : 'Sun stays below the horizon'));
        setText('set-time', model.sunset?.time ?? 'No sunset today');
        setText('set-direction', model.sunset?.direction ?? (model.kind === 'polar-day' ? '24-hour daylight' : 'Polar night'));
        setText('noon-time', model.noon.time);
        setText('noon-height', `${model.noon.altitude.toFixed(1)}° high`);
        const noon = find('noon');
        noon.setAttribute('cx', model.noon.x); noon.setAttribute('cy', model.noon.y);
        noon.style.display = model.noon.x < plot.left || model.noon.x > plot.right ? 'none' : '';
        svg.setAttribute('aria-label', model.kind === 'normal'
          ? `Sun height across ${settings.localDate}. Sunrise ${model.sunrise.time}, ${model.sunrise.direction}. Solar noon ${model.noon.time}, ${model.noon.altitude.toFixed(1)} degrees. Sunset ${model.sunset.time}, ${model.sunset.direction}.`
          : `Sun height across ${settings.localDate}. ${model.kind === 'polar-day' ? '24-hour daylight; no sunrise or sunset.' : 'Polar night; the Sun stays below the horizon.'}`);
      }
      const sun = current(model, date), marker = find('sun');
      const visible = sun.inRange && sun.altitude >= -18;
      marker.style.display = visible ? '' : 'none';
      marker.setAttribute('transform', `translate(${sun.x.toFixed(2)} ${sun.y.toFixed(2)})`);
      find('guide').style.display = visible ? '' : 'none';
      for (const attribute of ['x1', 'x2']) find('guide').setAttribute(attribute, sun.x);
      find('guide').setAttribute('y1', sun.y);
      setText('now', `${sun.time} · ${sun.altitude.toFixed(1)}° · ${sun.direction}`);
      setText('state', sun.altitude <= 0 ? 'Sun below the horizon' : 'Sun above the horizon');
      panel.classList.toggle('sun-day-night', sun.altitude <= 0);
    } };
  }
  window.SunDayView = Object.freeze({ dayModel, current, create });
})();
