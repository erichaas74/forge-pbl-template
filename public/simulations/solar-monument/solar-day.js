/* Shared date/time and Earth-frame math. All angles come from the installed SunCalc model. */
(() => {
  const DAY = 86400000;
  function day(settings) {
    const D = window.luxon.DateTime;
    const midnight = D.fromISO(settings.localDate, { zone: settings.zone }).startOf('day');
    const midday = midnight.set({ hour: 12 });
    const times = window.SunCalc.getTimes(midday.toJSDate(), settings.latitude, settings.longitude);
    const minute = date => { const t = D.fromJSDate(date, { zone: settings.zone }); return Math.round(t.startOf('day').diff(midnight, 'days').days) * 1440 + t.hour * 60 + t.minute + t.second / 60 + t.millisecond / 60000; };
    const valid = t => t instanceof Date && Number.isFinite(t.valueOf());
    const noon = valid(times.solarNoon) ? minute(times.solarNoon) : 720;
    const noonAltitude = window.SunCalc.getPosition(midday.toJSDate(), settings.latitude, settings.longitude).altitude;
    const polar = !valid(times.sunrise) || !valid(times.sunset);
    return { start: polar ? 0 : minute(times.sunrise), end: polar ? 1439 : minute(times.sunset), noon,
      kind: polar ? (noonAltitude > 0 ? 'polar-day' : 'polar-night') : 'normal',
      at(minutes) {
        const whole = Math.floor(minutes), offset = Math.floor(whole / 1440), within = whole - offset * 1440;
        return midnight.plus({ days: offset }).set({ hour: Math.floor(within / 60), minute: within % 60 }).plus({ milliseconds: (minutes - whole) * 60000 }).toJSDate();
      },
    };
  }
  function observe(settings, rule = 'noon', clockMinutes = 720) {
    const d = day(settings);
    const minute = rule === 'clock' ? clockMinutes : rule === 'morning' ? d.start + 30 : rule === 'evening' ? d.end - 30 : d.noon;
    if (!['noon', 'clock', 'morning', 'evening'].includes(rule) || !Number.isFinite(minute) || minute < -1440 || minute >= 2880 || (rule === 'clock' && (minute < 0 || minute >= 1440))) return null;
    if ((rule === 'morning' || rule === 'evening') && (d.kind !== 'normal' || minute < d.start || minute > d.end)) return null;
    return { date: d.at(minute), minutes: minute, day: d };
  }
  function earth(date, latitude, longitude) {
    // Greenwich equator basis: east=(0,0,-1), north=(0,1,0), up=(1,0,0).
    const p = window.SunCalc.getPosition(date, 0, 0);
    const local = window.SolarGeometry.sunDirection(p.altitude * 180 / Math.PI, p.azimuth * 180 / Math.PI + 180);
    const sunFixed = [local.y, -local.z, -local.x];
    const days = date.valueOf() / DAY - .5 + 2440588 - 2451545;
    const sidereal = (280.16 + 360.9856235 * days) * Math.PI / 180;
    const tilt = 23.4397 * Math.PI / 180;
    const fixedToOrbit = v => {
      const x = Math.cos(sidereal) * v[0] + Math.sin(sidereal) * v[2];
      const z = -Math.sin(sidereal) * v[0] + Math.cos(sidereal) * v[2];
      return [x, Math.cos(tilt) * v[1] + Math.sin(tilt) * z, -Math.sin(tilt) * v[1] + Math.cos(tilt) * z];
    };
    const lat = latitude * Math.PI / 180, lon = longitude * Math.PI / 180;
    const siteFixed = [Math.cos(lat) * Math.cos(lon), Math.sin(lat), -Math.cos(lat) * Math.sin(lon)];
    return { sun: fixedToOrbit(sunFixed), site: fixedToOrbit(siteFixed), north: fixedToOrbit([0, 1, 0]),
      fixedToOrbit, tilt, sidereal, altitude: Math.asin(Math.max(-1, Math.min(1, sunFixed.reduce((sum, v, i) => sum + v * siteFixed[i], 0)))) };
  }
  window.SolarDay = Object.freeze({ day, observe, earth });
})();
