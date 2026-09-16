/* One preview observation feeds Earth, the local sky and monument lighting. */
(() => {
  function observation(settings, mode, rule, fraction = 0.5, offset = 10) {
    const D = window.luxon.DateTime,
      day = window.SolarDay.day(settings);
    if (mode === 'year')
      return {
        date: day.at(rule === 'sunrise' && day.kind === 'normal' ? day.start + offset : day.noon),
        kind: day.kind,
      };
    const start = D.fromISO(settings.localDate, { zone: settings.zone }).startOf('day'),
      end = start.plus({ days: 1 });
    return {
      date: new Date(
        start.toMillis() +
          (end.toMillis() - start.toMillis()) * Math.min(0.999999, Math.max(0, fraction)),
      ),
      kind: day.kind,
    };
  }
  function annual(settings) {
    const D = window.luxon.DateTime,
      year = Number(settings.localDate.slice(0, 4));
    return Array.from({ length: 12 }, (_, i) => {
      const localDate = D.fromObject(
        { year, month: i + 1, day: 15 },
        { zone: settings.zone },
      ).toISODate();
      const day = window.SolarDay.day({ ...settings, localDate });
      const sun = window.SunCalc.getPosition(
        day.at(day.noon),
        settings.latitude,
        settings.longitude,
      );
      const rise =
        day.kind === 'normal'
          ? window.SunCalc.getPosition(day.at(day.start), settings.latitude, settings.longitude)
          : null;
      return {
        month: i + 1,
        localDate,
        altitude: (sun.altitude * 180) / Math.PI,
        bearing: ((sun.azimuth * 180) / Math.PI + 540) % 360,
        rise: rise ? ((rise.azimuth * 180) / Math.PI + 540) % 360 : null,
      };
    });
  }
  function create(panel, change, compare) {
    const D = window.luxon.DateTime;
    let active = false,
      localDate = '',
      mode = 'day',
      rule = 'noon',
      fraction = 0.5,
      playing = false,
      timer,
      paused = false,
      last = 0,
      elapsedYear = 0,
      base,
      center = false;
    const el = (id) => panel.querySelector('#' + id);
    const stop = () => {
      playing = false;
      clearInterval(timer);
      timer = undefined;
    };
    function dateValue() {
      return D.fromISO(localDate, { zone: base.zone });
    }
    function render() {
      if (!base) return;
      el('exploreDate').value = localDate;
      const d = dateValue();
      el('exploreYearSlider').max = String(d.daysInYear);
      el('exploreYearSlider').value = String(d.ordinal);
      el('exploreDaySlider').value = String(Math.round(fraction * 1000));
      el('exploreDayControls').hidden = mode !== 'day';
      el('exploreYearControls').hidden = mode !== 'year';
      el('exploreRule').value = rule;
      el('exploreRule').disabled = center;
      el('explorePlay').textContent = playing ? 'Ⅱ Pause' : `▶ Play ${mode}`;
      el('exploreDay').setAttribute('aria-pressed', String(mode === 'day'));
      el('exploreYear').setAttribute('aria-pressed', String(mode === 'year'));
      el('exploreDay').disabled = center;
      el('exploreSampling').textContent =
        mode === 'day'
          ? 'One complete day, including night. Follow your site as Earth turns.'
          : center
            ? 'One sunrise sample per day; the camera stays facing the same direction.'
            : 'One sample per day at the chosen observation time. Earth still rotates every day.';
    }
    function changed() {
      render();
      change();
    }
    function setMode(next) {
      stop();
      mode = next;
      paused = false;
      changed();
    }
    el('exploreDay').addEventListener('click', () => setMode('day'));
    el('exploreYear').addEventListener('click', () => setMode('year'));
    el('exploreRule').addEventListener('change', (e) => {
      stop();
      rule = e.target.value;
      changed();
    });
    el('exploreDate').addEventListener('change', (e) => {
      const d = D.fromISO(e.target.value, { zone: base.zone });
      if (!d.isValid || d.year < 2025 || d.year > 2030) return;
      stop();
      localDate = d.toISODate();
      paused = true;
      changed();
    });
    el('exploreDaySlider').addEventListener('input', (e) => {
      stop();
      fraction = Number(e.target.value) / 1000;
      paused = true;
      changed();
    });
    el('exploreYearSlider').addEventListener('input', (e) => {
      stop();
      localDate = dateValue()
        .startOf('year')
        .plus({ days: Number(e.target.value) - 1 })
        .toISODate();
      paused = true;
      changed();
    });
    for (const [id, delta] of [
      ['explorePrevious', -1],
      ['exploreNext', 1],
    ])
      el(id).addEventListener('click', () => {
        stop();
        if (mode === 'day') fraction = Math.max(0, Math.min(1, fraction + delta / 24));
        else {
          const d = dateValue(),
            ordinal = Math.max(1, Math.min(d.daysInYear, d.ordinal + delta));
          localDate = d
            .startOf('year')
            .plus({ days: ordinal - 1 })
            .toISODate();
        }
        paused = true;
        changed();
      });
    for (const button of panel.querySelectorAll('[data-explore-season]'))
      button.addEventListener('click', () => {
        const event = window.SOLAR_SEASONS[dateValue().year]?.[button.dataset.exploreSeason];
        if (!event) return;
        stop();
        localDate = D.fromISO(event, { zone: base.zone }).toISODate();
        paused = true;
        changed();
      });
    el('exploreTrails').addEventListener('change', changed);
    el('exploreCompare').addEventListener('click', () => {
      stop();
      changed();
      compare();
    });
    el('explorePlay').addEventListener('click', () => {
      if (playing) {
        stop();
        paused = true;
        changed();
        return;
      }
      if (!paused) {
        if (mode === 'day') fraction = 0;
        else localDate = dateValue().startOf('year').toISODate();
      }
      playing = true;
      last = performance.now();
      elapsedYear = 0;
      render();
      timer = setInterval(() => {
        const now = performance.now(),
          elapsed = Math.min(500, now - last);
        last = now;
        if (mode === 'day') {
          fraction = Math.min(1, fraction + elapsed / 45000);
          if (fraction >= 1) {
            stop();
            paused = false;
          }
        } else {
          elapsedYear += elapsed;
          const steps = Math.floor(elapsedYear / 125);
          if (!steps) return;
          elapsedYear -= steps * 125;
          const d = dateValue(),
            ordinal = Math.min(d.daysInYear, d.ordinal + steps);
          localDate = d
            .startOf('year')
            .plus({ days: ordinal - 1 })
            .toISODate();
          if (ordinal === d.daysInYear) {
            stop();
            paused = false;
          }
        }
        changed();
      }, 80);
    });
    return {
      get active() {
        return active;
      },
      get rule() {
        return rule;
      },
      get mode() {
        return mode;
      },
      get trails() {
        return el('exploreTrails').checked;
      },
      open(settings) {
        active = true;
        base = settings;
        localDate = settings.localDate;
        const start = D.fromISO(localDate, { zone: settings.zone }).startOf('day');
        const end = start.plus({ days: 1 });
        const observed = window.SolarDay.day(settings).at(settings.minutes ?? 720);
        fraction = Math.max(
          0,
          Math.min(
            1,
            (observed.getTime() - start.toMillis()) / (end.toMillis() - start.toMillis()),
          ),
        );
        paused = false;
        render();
      },
      close() {
        stop();
        active = false;
      },
      pause() {
        stop();
        paused = true;
        render();
      },
      adopt(settings) {
        if (!active) return;
        stop();
        base = settings;
        localDate = settings.localDate;
        render();
      },
      center(value) {
        center = value;
        if (value) {
          mode = 'year';
          rule = 'sunrise';
          stop();
        }
        render();
      },
      settings(settings) {
        return active ? { ...settings, localDate } : settings;
      },
      date(settings, offset) {
        return observation({ ...settings, localDate }, mode, rule, fraction, offset ?? 10).date;
      },
      reading(settings, date) {
        if (!active) return;
        const local = D.fromJSDate(date, { zone: settings.zone });
        el('exploreClock').textContent = local.toFormat('MMM d · h:mm a ZZZZ');
        const day = window.SolarDay.day(settings);
        el('explorePolar').textContent =
          day.kind === 'normal'
            ? ''
            : day.kind === 'polar-day'
              ? '24-hour daylight. No sunrise event; yearly sunrise preview uses noon.'
              : 'Polar night. No sunrise event; yearly sunrise preview uses noon.';
      },
    };
  }
  window.SolarExplorer = Object.freeze({ observation, annual, create });
})();
