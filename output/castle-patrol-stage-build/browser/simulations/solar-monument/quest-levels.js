/* Level challenges for weekly builds: carved symbols, gems, measured win checks and reveal animations.
   Shadow levels never light anything up: when the shadow tip reaches a carved symbol, its grooves fill
   with colored inlay. Light levels wake gems only where real sunlight lands. Carvings use the lab's
   analytic sunlight material, so real shadows fall across them. Decorations never change or block the
   design. Questions, hints and explanations belong to the host's tutor; this module reports progress. */
(() => {
  'use strict';
  const COLORS = Object.freeze({ gold: 0xffc93c, amber: 0xff9a2e, ruby: 0xe8344e, sapphire: 0x3d7bff, emerald: 0x2fc374, amethyst: 0xa65df2 });
  const SYMBOLS = ['rooster', 'rabbit', 'bee', 'butterfly', 'sun', 'turtle', 'fox', 'owl', 'sunflower', 'leaf', 'snowflake'];
  const LIGHTS = ['sunlight', 'red light', 'amber light', 'green light', 'blue light', 'violet light'];
  const KINDS = ['shadow-tip', 'light', 'edge', 'markers'];
  const STYLES = ['burst', 'beam', 'bloom', 'year', 'daylapse'];
  const CONTROLS = ['days', 'seasons', 'noon'];
  const TOOLS = ['post', 'build', 'markers'];
  const DATE = /^20(2[5-9]|30)-\d\d-\d\d$/;
  const text = (v, max) => typeof v === 'string' && v.trim().length > 0 && v.length <= max;
  const num = (v, min, max) => typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;
  const slug = v => typeof v === 'string' && /^[a-z0-9-]{1,60}$/.test(v);
  const optional = (v, test) => v === undefined || test(v);
  const colorName = v => typeof v === 'string' && Object.hasOwn(COLORS, v);
  const date = v => typeof v === 'string' && DATE.test(v);
  const itemsOf = q => (q.kind === 'shadow-tip' ? q.marks : q.gems) || [];

  function validMark(m) {
    return !!m && typeof m === 'object' && slug(m.id) && text(m.label, 80) && SYMBOLS.includes(m.symbol) && colorName(m.color) &&
      num(m.x, -12, 12) && num(m.z, -12, 12) && num(m.radius, .02, .3) && num(m.size, .08, .8) &&
      optional(m.required, v => typeof v === 'boolean') && optional(m.minutes, v => num(v, 0, 1439)) &&
      optional(m.rule, v => v === 'noon') && optional(m.date, date);
  }
  function validGem(g, kind) {
    if (!g || typeof g !== 'object' || !slug(g.id) || !text(g.label, 80) || !colorName(g.color)) return false;
    const ground = num(g.x, -12, 12) && num(g.z, -12, 12) && g.targetId === undefined;
    const surface = text(g.targetId, 80) && g.x === undefined && g.z === undefined;
    if (kind === 'markers') return g.targetId === undefined && g.x === undefined && date(g.date) && ['noon', 'morning'].includes(g.rule) && LIGHTS.includes(g.light);
    if (kind === 'edge') return surface && LIGHTS.includes(g.light) && date(g.date) && g.rule === 'morning' && Number.isInteger(g.window) && g.window >= 2 && g.window <= 60;
    return (ground || surface) && LIGHTS.includes(g.light) && optional(g.date, date) &&
      (g.rule === undefined ? g.within === undefined : g.rule === 'morning' && num(g.within, 1, 120));
  }
  function validCarving(c) {
    if (!c || typeof c !== 'object' || !optional(c.color, colorName) || !optional(c.width, w => num(w, .005, .12))) return false;
    if (c.kind === 'line') return Array.isArray(c.from) && Array.isArray(c.to) && c.from.length === 2 && c.to.length === 2 && [...c.from, ...c.to].every(v => num(v, -12, 12));
    const centre = num(c.x, -12, 12) && num(c.z, -12, 12) && num(c.radius, .05, 8);
    if (c.kind === 'ring' || c.kind === 'plate') return centre;
    if (c.kind === 'rays') return centre && Number.isInteger(c.count) && c.count >= 3 && c.count <= 48 && optional(c.inner, v => num(v, 0, c.radius));
    return false;
  }
  function valid(q) {
    if (!q || typeof q !== 'object' || !slug(q.id) || !text(q.title, 80) || !text(q.goal, 200) || !KINDS.includes(q.kind)) return false;
    if (q.kind === 'shadow-tip') {
      if (q.gems !== undefined || !Array.isArray(q.marks) || q.marks.length < 1 || q.marks.length > 10 || !q.marks.every(validMark) || !q.marks.some(m => m.required !== false)) return false;
      if (!(num(q.postHeight, .1, 2) && num(q.tolerance, .005, .2))) return false;
    } else if (q.marks !== undefined || !Array.isArray(q.gems) || q.gems.length < 1 || q.gems.length > 6 || !q.gems.every(g => validGem(g, q.kind))) return false;
    const items = itemsOf(q);
    if (new Set(items.map(item => item.id)).size !== items.length) return false;
    if (q.kind === 'edge' && q.gems.length !== 1) return false;
    const reveal = q.reveal;
    return optional(q.together, v => typeof v === 'boolean') &&
      optional(q.carvings, v => Array.isArray(v) && v.length <= 12 && v.every(validCarving)) &&
      optional(q.keep, v => Array.isArray(v) && v.length <= 6 && v.every(k => k && typeof k === 'object' && text(k.blockId, 80) && optional(k.x, x => num(x, -12, 12)) && optional(k.z, z => num(z, -12, 12)) && optional(k.aperture, a => a === true))) &&
      optional(q.controls, v => Array.isArray(v) && v.length <= 3 && v.every(c => CONTROLS.includes(c))) &&
      optional(q.tools, v => Array.isArray(v) && v.length <= 3 && new Set(v).size === v.length && v.every(t => TOOLS.includes(t))) &&
      !!reveal && typeof reveal === 'object' && STYLES.includes(reveal.style) && text(reveal.title, 80) && optional(reveal.from, date) &&
      (reveal.style !== 'year' || ['markers', 'shadow-tip'].includes(q.kind)) &&
      (reveal.style !== 'daylapse' || q.kind === 'shadow-tip');
  }

  const luxon = () => window.luxon.DateTime;
  const shift = (iso, days) => luxon().fromISO(iso, { zone: 'utc' }).plus({ days }).toISODate();
  const between = (a, b) => Math.round(luxon().fromISO(a, { zone: 'utc' }).diff(luxon().fromISO(b, { zone: 'utc' }), 'days').days);
  const shortDate = iso => luxon().fromISO(iso, { zone: 'utc' }).toFormat('MMM d');
  const clockText = minutes => {
    const whole = Math.max(0, Math.min(1439, Math.floor(minutes)));
    return luxon().fromObject({ hour: Math.floor(whole / 60), minute: whole % 60 }).toFormat('h:mm a');
  };
  function sunOn(settings, localDate, rule) {
    const observed = window.SolarDay.observe({ ...settings, localDate }, rule);
    if (!observed) return null;
    const p = window.SunCalc.getPosition(observed.date, settings.latitude, settings.longitude);
    return window.SolarGeometry.sunDirection(p.altitude * 180 / Math.PI, (p.azimuth * 180 / Math.PI + 540) % 360);
  }
  function kept(q, design) {
    return (q.keep || []).every(k => {
      const b = design.blocks.find(block => block.id === k.blockId);
      return !!b && (k.x === undefined || Math.abs(b.x - k.x) <= .02) && (k.z === undefined || Math.abs(b.z - k.z) <= .02) && (!k.aperture || !!b.aperture);
    });
  }
  const pointFor = (g, design) => g.targetId ? design.targets.find(t => t.id === g.targetId) : { id: 'quest-' + g.id, label: g.label, x: g.x, z: g.z };
  const lightAt = (design, point, sun) => point && sun && sun.y > 0 ? window.SolarOptics.trace(design, point, sun).value : 'unavailable';
  const entry = (id, label, color, done) => ({ id, label, color, done: !!done });
  function createMemory() { return { touched: new Set(), visits: new Set(), model: new Map(), complete: false, designKey: '' }; }

  /** Pure, deterministic progress for one quest at one observed moment. Memory keeps sticky wins. */
  function evaluate(q, ctx, memory) {
    const progress = [], points = {};
    const designKey = JSON.stringify(ctx.design);
    if (designKey !== memory.designKey) {
      memory.designKey = designKey; memory.visits.clear(); memory.model.clear();
      if (q.kind === 'edge' && !memory.complete) memory.touched.clear();
    }
    if (q.kind === 'shadow-tip') {
      const post = window.SundialLab.post(ctx.design);
      const fits = !!post && Math.abs(post.height - q.postHeight) <= q.tolerance + 1e-9;
      const tip = post ? window.SundialLab.tip(ctx.design, ctx.sun) : null;
      for (const m of q.marks) {
        const distance = tip ? Math.hypot(tip.x - m.x, tip.z - m.z) : Infinity;
        if (distance <= m.radius && fits) memory.touched.add(m.id);
        points[m.id] = { x: m.x, z: m.z };
        if (m.required !== false) progress.push(entry(m.id, m.label, m.color, memory.touched.has(m.id)));
      }
    } else if (q.kind === 'light') {
      const keep = kept(q, ctx.design);
      const now = q.gems.map(g => {
        const point = pointFor(g, ctx.design);
        if (point) points[g.id] = point;
        const lit = keep && (!g.date || g.date === ctx.settings.localDate) && lightAt(ctx.design, point, ctx.sun) === g.light;
        if (!lit || !g.rule) return lit;
        const moment = window.SolarDay.observe(ctx.settings, g.rule);
        return !!moment && Math.abs(ctx.settings.minutes - moment.minutes) <= g.within;
      });
      if (!q.together) q.gems.forEach((g, i) => { if (now[i]) memory.touched.add(g.id); });
      else if (now.every(Boolean)) q.gems.forEach(g => memory.touched.add(g.id));
      q.gems.forEach((g, i) => progress.push(entry(g.id, g.label, g.color, memory.touched.has(g.id) || (q.together && now[i]))));
    } else if (q.kind === 'edge') {
      const g = q.gems[0], point = pointFor(g, ctx.design), keep = kept(q, ctx.design);
      if (point) points[g.id] = point;
      const glows = day => {
        if (!memory.model.has(day)) memory.model.set(day, lightAt(ctx.design, point, sunOn(ctx.settings, day, g.rule)) === g.light);
        return memory.model.get(day);
      };
      const today = ctx.settings.localDate;
      if (point && keep && Math.abs(between(today, g.date)) <= g.window + 1) memory.visits.add(today);
      if (point && keep && memory.visits.has(g.date) && glows(g.date)) memory.touched.add('start');
      for (const [flag, sign] of [['first', -1], ['last', 1]]) {
        if (!memory.touched.has('start') || memory.touched.has(flag)) continue;
        for (const day of memory.visits) {
          const steps = between(day, g.date) * sign, next = shift(day, sign);
          if (steps < 0 || steps > g.window || !glows(day) || !memory.visits.has(next) || glows(next)) continue;
          let unbroken = true;
          for (let k = 0; k <= steps && unbroken; k++) unbroken = glows(shift(g.date, k * sign));
          if (unbroken) { memory.touched.add(flag); break; }
        }
      }
      progress.push(entry(g.id, `Light the ${g.label} on ${shortDate(g.date)}`, g.color, memory.touched.has('start')));
      progress.push(entry(g.id + '-first', 'First glowing morning', g.color, memory.touched.has('first')));
      progress.push(entry(g.id + '-last', 'Last glowing morning', g.color, memory.touched.has('last')));
    } else {
      for (const g of q.gems) {
        const sun = sunOn(ctx.settings, g.date, g.rule);
        const stone = ctx.design.targets.find(t => !t.y && lightAt(ctx.design, t, sun) === g.light);
        if (stone) points[g.id] = stone;
        progress.push(entry(g.id, g.label, g.color, !!stone));
      }
    }
    const complete = memory.complete || progress.every(p => p.done);
    memory.complete = complete;
    return { progress, complete, points };
  }

  // Engraving strokes on a 256 px medallion, centred at 128.
  const circle = (ctx, x, y, r) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke(); };
  const oval = (ctx, x, y, rx, ry, rotation = 0) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rotation, 0, Math.PI * 2); ctx.stroke(); };
  const line = (ctx, points) => { ctx.beginPath(); points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); };
  const curve = (ctx, [x0, y0], [cx, cy], [x1, y1]) => { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(cx, cy, x1, y1); ctx.stroke(); };
  const rays = (ctx, count, inner, outer, cx = 128, cy = 128) => {
    for (let i = 0; i < count; i++) {
      const a = i * Math.PI * 2 / count;
      line(ctx, [[cx + Math.sin(a) * inner, cy - Math.cos(a) * inner], [cx + Math.sin(a) * outer, cy - Math.cos(a) * outer]]);
    }
  };
  const DRAW = {
    sun(ctx) { circle(ctx, 128, 128, 28); rays(ctx, 12, 40, 66); circle(ctx, 118, 122, 3); circle(ctx, 138, 122, 3); curve(ctx, [116, 136], [128, 146], [140, 136]); },
    rooster(ctx) {
      oval(ctx, 122, 142, 42, 30, -.2); circle(ctx, 164, 98, 14);
      circle(ctx, 156, 80, 6); circle(ctx, 167, 76, 6); circle(ctx, 178, 81, 6);
      line(ctx, [[177, 94], [194, 99], [177, 105]]); circle(ctx, 172, 114, 4);
      curve(ctx, [84, 132], [52, 116], [62, 76]); curve(ctx, [88, 124], [70, 96], [86, 70]); curve(ctx, [92, 118], [90, 92], [106, 76]);
      line(ctx, [[114, 170], [108, 196], [98, 200]]); line(ctx, [[136, 170], [142, 196], [152, 200]]);
    },
    rabbit(ctx) {
      oval(ctx, 118, 150, 44, 34); circle(ctx, 158, 110, 22);
      oval(ctx, 146, 64, 8, 28, -.25); oval(ctx, 170, 66, 8, 28, .22);
      circle(ctx, 72, 150, 10); circle(ctx, 166, 104, 3);
      line(ctx, [[104, 182], [86, 192]]); line(ctx, [[140, 182], [154, 192]]);
    },
    bee(ctx) {
      oval(ctx, 124, 140, 42, 26);
      line(ctx, [[106, 118], [106, 162]]); line(ctx, [[124, 115], [124, 165]]); line(ctx, [[142, 118], [142, 162]]);
      oval(ctx, 108, 94, 18, 30, -.5); oval(ctx, 142, 94, 18, 30, .5); circle(ctx, 176, 140, 14);
      line(ctx, [[82, 140], [66, 140]]); line(ctx, [[182, 128], [196, 106]]); line(ctx, [[176, 126], [182, 102]]);
    },
    butterfly(ctx) {
      oval(ctx, 96, 104, 30, 34, -.4); oval(ctx, 160, 104, 30, 34, .4);
      oval(ctx, 102, 162, 22, 26, .4); oval(ctx, 154, 162, 22, 26, -.4);
      line(ctx, [[128, 82], [128, 188]]); curve(ctx, [128, 82], [118, 62], [106, 56]); curve(ctx, [128, 82], [138, 62], [150, 56]);
    },
    turtle(ctx) {
      oval(ctx, 124, 132, 50, 36); oval(ctx, 124, 132, 24, 17);
      for (const [x0, y0, x1, y1] of [[124, 115, 124, 96], [124, 149, 124, 168], [100, 132, 74, 132], [148, 132, 174, 132], [106, 120, 90, 106], [142, 144, 158, 158]]) line(ctx, [[x0, y0], [x1, y1]]);
      circle(ctx, 186, 132, 13); circle(ctx, 92, 170, 10); circle(ctx, 156, 170, 10); circle(ctx, 92, 94, 10); circle(ctx, 156, 94, 10);
      line(ctx, [[74, 136], [60, 142]]);
    },
    fox(ctx) {
      oval(ctx, 116, 150, 44, 24);
      line(ctx, [[150, 120], [198, 132], [150, 146], [150, 120]]); line(ctx, [[152, 122], [158, 94], [170, 124]]); circle(ctx, 172, 130, 3);
      curve(ctx, [74, 146], [30, 118], [62, 92]); curve(ctx, [62, 92], [92, 104], [84, 138]);
      line(ctx, [[100, 172], [96, 198]]); line(ctx, [[134, 172], [138, 198]]);
    },
    owl(ctx) {
      oval(ctx, 128, 142, 42, 52);
      circle(ctx, 112, 116, 14); circle(ctx, 144, 116, 14); circle(ctx, 112, 116, 4); circle(ctx, 144, 116, 4);
      line(ctx, [[122, 132], [128, 146], [134, 132]]); line(ctx, [[94, 96], [100, 72], [114, 94]]); line(ctx, [[142, 94], [156, 72], [162, 96]]);
      curve(ctx, [96, 150], [104, 176], [124, 186]); curve(ctx, [160, 150], [152, 176], [132, 186]);
      line(ctx, [[116, 194], [112, 204]]); line(ctx, [[140, 194], [144, 204]]);
    },
    sunflower(ctx) {
      circle(ctx, 128, 128, 24); circle(ctx, 128, 128, 10);
      for (let i = 0; i < 14; i++) { const a = i * Math.PI * 2 / 14; oval(ctx, 128 + Math.sin(a) * 50, 128 - Math.cos(a) * 50, 9, 20, a); }
    },
    leaf(ctx) {
      oval(ctx, 128, 128, 34, 66, .6); line(ctx, [[88, 180], [168, 76]]);
      for (const t of [.3, .45, .6, .75]) { const x = 88 + 80 * t, y = 180 - 104 * t; line(ctx, [[x, y], [x - 24, y - 12]]); line(ctx, [[x, y], [x + 14, y + 22]]); }
    },
    snowflake(ctx) {
      for (let i = 0; i < 6; i++) {
        const a = i * Math.PI / 3, s = Math.sin(a), c = -Math.cos(a);
        line(ctx, [[128, 128], [128 + s * 70, 128 + c * 70]]);
        for (const r of [34, 54]) {
          const bx = 128 + s * r, by = 128 + c * r;
          for (const turn of [-.6, .6]) line(ctx, [[bx, by], [bx + Math.sin(a + turn) * 16, by - Math.cos(a + turn) * 16]]);
        }
      }
    },
  };

  function create(THREE, scene, container, hooks) {
    const reduced = !!window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const root = new THREE.Group(); root.name = 'quest-level'; scene.add(root);
    let quest = null, questKey = '', memory = createMemory(), result = null, postedKey = '', progressKey = '';
    let views = new Map(), carvings = [], effects = [], reveal = null, sequence = null, lastCtx = null, haloMap = null, dateEl = null;
    const textures = new Map();
    const el = (tag, className = '', content = '') => { const node = document.createElement(tag); if (className) node.className = className; if (content) node.textContent = content; return node; };
    const button = (label, action) => { const b = el('button', '', label); b.type = 'button'; b.addEventListener('click', action); return b; };
    const css = name => '#' + COLORS[name].toString(16).padStart(6, '0');
    // Carvings share the lab's sunlight material, so the post's real shadow darkens them.
    const surface = options => (hooks.surface ? hooks.surface(options) : new THREE.MeshStandardMaterial(options));
    const carvedMaterial = (map, opacity, offset, inlay) => surface({
      map, color: 0xffffff, transparent: true, opacity, depthWrite: false, roughness: inlay ? .38 : .92, metalness: inlay ? .35 : 0,
      polygonOffset: true, polygonOffsetFactor: offset, polygonOffsetUnits: offset,
    });

    // A compact strip at the edge of the 3D view: title, progress and optional date buttons.
    const hud = el('section', 'quest-hud'); hud.id = 'questHud'; hud.hidden = true; hud.setAttribute('aria-label', 'Level challenge');
    const header = el('header'), star = el('span', 'quest-star', '◇'), title = el('h2'), count = el('span', 'quest-count');
    star.setAttribute('aria-hidden', 'true');
    const collapse = button('–', () => setCollapsed(!hud.classList.contains('collapsed')));
    collapse.className = 'quest-collapse';
    header.append(star, title, count, collapse);
    const goal = el('p', 'quest-goal'), list = el('ul'), controls = el('div', 'quest-controls');
    const replay = button('✨ Replay', () => startReveal()); replay.className = 'quest-replay'; replay.hidden = true;
    hud.append(header, goal, list, controls, replay);
    function setCollapsed(collapsed) {
      hud.classList.toggle('collapsed', collapsed);
      collapse.textContent = collapsed ? '+' : '–';
      collapse.setAttribute('aria-expanded', String(!collapsed));
      collapse.setAttribute('aria-label', collapsed ? 'Show level details' : 'Hide level details');
    }
    setCollapsed(false);

    // A small corner message on success. It never covers the centre of the 3D view or takes focus.
    const banner = el('section', 'quest-banner'); banner.hidden = true; banner.setAttribute('role', 'status'); banner.setAttribute('aria-live', 'polite');
    const bannerTitle = el('strong'), ticker = el('span', 'quest-ticker');
    const bannerReplay = button('✨ Replay', () => startReveal());
    const bannerClose = button('×', () => { if (sequence) endSequence(); else banner.hidden = true; });
    const actions = el('div', 'quest-banner-actions'); actions.append(bannerReplay, bannerClose);
    banner.append(bannerTitle, ticker, actions);
    container.append(hud, banner);

    function canvas2d(size) {
      const canvas = document.createElement('canvas'); canvas.width = canvas.height = size;
      return { canvas, ctx: canvas.getContext('2d') };
    }
    function cachedTexture(key, size, draw) {
      if (textures.has(key)) return textures.get(key);
      const { canvas, ctx } = canvas2d(size);
      if (ctx) { ctx.lineCap = 'round'; ctx.lineJoin = 'round'; draw(ctx); }
      const texture = new THREE.CanvasTexture(canvas);
      textures.set(key, texture);
      return texture;
    }
    function symbolTexture(symbol, color, inlay) {
      return cachedTexture(['symbol', symbol, color, inlay].join('|'), 256, ctx => {
        const strokes = (style, width) => {
          ctx.strokeStyle = style;
          ctx.lineWidth = width + 2; circle(ctx, 128, 128, 116);
          ctx.lineWidth = Math.max(2, width * .3); circle(ctx, 128, 128, 103);
          for (let i = 0; i < 24; i++) {
            const a = i * Math.PI / 12;
            line(ctx, [[128 + Math.sin(a) * 104, 128 - Math.cos(a) * 104], [128 + Math.sin(a) * 113, 128 - Math.cos(a) * 113]]);
          }
          ctx.lineWidth = width; DRAW[symbol](ctx);
        };
        if (inlay) { strokes(css(color), 11); strokes('rgba(255,250,228,0.8)', 2.5); }
        else { strokes('rgba(255,244,214,0.55)', 10); ctx.translate(-2, -2); strokes('rgba(78,58,34,0.9)', 8); }
      });
    }
    function plateTexture(color, inlay) {
      return cachedTexture(['plate', color, inlay].join('|'), 1024, ctx => {
        const c = 512, R = 500;
        const engrave = (style, scale) => {
          ctx.strokeStyle = style;
          ctx.lineWidth = 8 * scale; circle(ctx, c, c, R - 6);
          ctx.lineWidth = 3 * scale; circle(ctx, c, c, R * .94); circle(ctx, c, c, R * .86);
          ctx.beginPath();
          for (let i = 0; i <= 120; i++) {
            const a = i * Math.PI * 2 / 120, r = i % 2 ? R * .945 : R * .985, x = c + Math.sin(a) * r, y = c - Math.cos(a) * r;
            if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
          }
          ctx.stroke();
          for (let i = 0; i < 96; i++) {
            const a = i * Math.PI * 2 / 96, major = i % 8 === 0, inner = major ? R * .78 : R * .82;
            ctx.lineWidth = (major ? 5 : 2.5) * scale;
            line(ctx, [[c + Math.sin(a) * inner, c - Math.cos(a) * inner], [c + Math.sin(a) * R * .86, c - Math.cos(a) * R * .86]]);
          }
          ctx.lineWidth = 4 * scale; circle(ctx, c, c, 18); circle(ctx, c, c, 28);
          ctx.lineWidth = 3 * scale; rays(ctx, 16, 31, 40, c, c);
        };
        if (inlay) engrave(css(color), 1.2);
        else { engrave('rgba(255,244,214,0.5)', 1.1); ctx.translate(-2, -2); engrave('rgba(78,58,34,0.8)', 1); }
      });
    }
    function haloTexture() {
      if (haloMap) return haloMap;
      const { canvas, ctx } = canvas2d(64);
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255,255,255,1)'); gradient.addColorStop(.35, 'rgba(255,255,255,.5)'); gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient; ctx.fillRect(0, 0, 64, 64);
      }
      haloMap = new THREE.CanvasTexture(canvas);
      return haloMap;
    }
    function strip(ax, az, bx, bz, width) {
      const geometry = new THREE.PlaneGeometry(Math.max(1e-3, Math.hypot(bx - ax, bz - az)), width);
      geometry.rotateX(-Math.PI / 2); geometry.rotateY(-Math.atan2(bz - az, bx - ax)); geometry.translate((ax + bx) / 2, 0, (az + bz) / 2);
      return geometry;
    }
    function carving(c) {
      const color = c.color ?? 'gold';
      if (c.kind === 'plate') {
        const geometry = new THREE.PlaneGeometry(c.radius * 2, c.radius * 2).rotateX(-Math.PI / 2).translate(c.x, 0, c.z);
        const glow = carvedMaterial(plateTexture(color, true), 0, -1.5, true);
        const group = new THREE.Group(); group.name = 'quest-plate';
        const bed = new THREE.Mesh(geometry, carvedMaterial(plateTexture(color, false), 1, -1, false)); bed.position.y = .0022;
        const inlay = new THREE.Mesh(geometry, glow); inlay.position.y = .0026;
        group.add(bed, inlay); root.add(group);
        return { group, glow };
      }
      const width = c.width ?? .03, geometries = [];
      if (c.kind === 'line') geometries.push(strip(c.from[0], c.from[1], c.to[0], c.to[1], width));
      if (c.kind === 'ring') geometries.push(new THREE.RingGeometry(c.radius - width / 2, c.radius + width / 2, 96).rotateX(-Math.PI / 2).translate(c.x, 0, c.z));
      if (c.kind === 'rays') {
        const inner = c.inner ?? c.radius * .5;
        for (let i = 0; i < c.count; i++) {
          const a = i * Math.PI * 2 / c.count, sx = Math.sin(a), sz = -Math.cos(a);
          geometries.push(strip(c.x + sx * inner, c.z + sz * inner, c.x + sx * c.radius, c.z + sz * c.radius, width));
        }
      }
      const groove = surface({ color: 0x6d5536, transparent: true, opacity: .55, depthWrite: false, roughness: .95, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
      const glow = surface({ color: COLORS[color], transparent: true, opacity: 0, depthWrite: false, roughness: .4, metalness: .3, polygonOffset: true, polygonOffsetFactor: -1.5, polygonOffsetUnits: -1.5 });
      const group = new THREE.Group(); group.name = 'quest-carving';
      for (const geometry of geometries) {
        const bed = new THREE.Mesh(geometry, groove); bed.position.y = .0025;
        const inlay = new THREE.Mesh(geometry, glow); inlay.position.y = .003;
        group.add(bed, inlay);
      }
      root.add(group);
      return { group, glow };
    }
    function markView(m) {
      const group = new THREE.Group(); group.name = 'quest-mark:' + m.id;
      const geometry = new THREE.PlaneGeometry(m.size, m.size).rotateX(-Math.PI / 2);
      const carved = new THREE.Mesh(geometry, carvedMaterial(symbolTexture(m.symbol, m.color, false), 1, -2, false));
      const inlay = new THREE.Mesh(geometry, carvedMaterial(symbolTexture(m.symbol, m.color, true), 0, -3, true));
      carved.position.y = .004; inlay.position.y = .005;
      group.add(carved, inlay); group.position.set(m.x, 0, m.z); root.add(group);
      return { mark: true, group, inlay, color: new THREE.Color(COLORS[m.color]), filled: false, filledAt: -Infinity, flashAt: -Infinity, order: 0 };
    }
    function gemView(g) {
      const r = g.targetId ? .05 : .065;
      const tint = new THREE.Color(COLORS[g.color]);
      const group = new THREE.Group(); group.name = 'quest-gem:' + g.id; group.visible = false;
      const socket = new THREE.Mesh(new THREE.RingGeometry(r * .9, r * 1.3, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x4f3d27, transparent: true, opacity: .7, depthWrite: false, side: THREE.DoubleSide }));
      socket.position.y = .002;
      const rim = new THREE.Mesh(new THREE.RingGeometry(r * 1.3, r * 1.48, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: tint, transparent: true, opacity: .5, depthWrite: false, side: THREE.DoubleSide }));
      rim.position.y = .003;
      const material = new THREE.MeshStandardMaterial({ color: tint, emissive: tint, emissiveIntensity: .12, roughness: .2, metalness: .1, flatShading: true });
      const gem = new THREE.Mesh(new THREE.OctahedronGeometry(r * .8, 0), material);
      const baseY = r * .3; gem.scale.set(1, .38, 1); gem.position.y = baseY; gem.rotation.y = Math.PI / 4;
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTexture(), color: tint, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
      halo.scale.setScalar(r * 6); halo.position.y = r * .5;
      group.add(socket, rim, gem, halo); root.add(group);
      return { mark: false, group, gem, halo, material, rim, r, baseY, color: tint, lit: false, litAt: -Infinity, flashAt: -Infinity, order: 0 };
    }
    function disposeChildren() {
      const geometries = new Set(), materials = new Set();
      root.traverse(object => { if (object.geometry) geometries.add(object.geometry); if (object.material) materials.add(object.material); });
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
      root.clear();
      views = new Map(); carvings = []; effects = []; reveal = null;
    }
    function place(view, point, index) {
      const normal = new THREE.Vector3(...(point.normal || [0, 1, 0]));
      view.group.position.set(point.x + index * .15, point.y || 0, point.z).addScaledVector(normal, .004);
      view.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    }
    /** Additive sparkles for sunlit gems; soft gold dust for shadow carvings (not light). */
    function particles(view, total, additive) {
      const origin = view.group.position.clone(), positions = new Float32Array(total * 3), velocity = [];
      for (let i = 0; i < total; i++) {
        const a = Math.random() * Math.PI * 2, out = additive ? .15 + Math.random() * .4 : .05 + Math.random() * .22;
        velocity.push([Math.cos(a) * out, (additive ? .6 : .25) + Math.random() * (additive ? .9 : .45), Math.sin(a) * out]);
        positions.set([origin.x, origin.y + .02, origin.z], i * 3);
      }
      const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ color: view.color, size: additive ? .05 : .035, transparent: true, opacity: 1, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending });
      const points = new THREE.Points(geometry, material); points.name = additive ? 'quest-sparkles' : 'quest-dust'; root.add(points);
      const gravity = additive ? 1.1 : .5;
      effects.push({ object: points, start: performance.now(), duration: additive ? 1800 : 1300, update(t) {
        for (let i = 0; i < total; i++) {
          const v = velocity[i], s = t * 1.8;
          positions[i * 3] = origin.x + v[0] * s; positions[i * 3 + 1] = origin.y + .02 + v[1] * s - gravity * t * t; positions[i * 3 + 2] = origin.z + v[2] * s;
        }
        geometry.attributes.position.needsUpdate = true; material.opacity = 1 - t;
      } });
    }
    const sparkle = (view, total) => particles(view, total, true);
    const dust = (view, total) => particles(view, total, false);
    function beam(view, sun) {
      const length = 3.2, direction = new THREE.Vector3(sun.x, sun.y, sun.z).normalize();
      const geometry = new THREE.CylinderGeometry(.035, .07, length, 20, 1, true);
      const material = new THREE.MeshBasicMaterial({ color: view.color, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geometry, material); mesh.name = 'quest-beam';
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
      mesh.position.copy(view.group.position).addScaledVector(direction, length / 2);
      root.add(mesh);
      effects.push({ object: mesh, start: performance.now(), duration: 4200, update(t) { material.opacity = Math.sin(Math.min(1, t) * Math.PI) * .6; } });
    }

    function setQuest(q, completed) {
      const next = q && valid(q) ? JSON.stringify(q) : '';
      if (next && next === questKey) {
        if (completed && !memory.complete) { memory.complete = true; markAll(); if (lastCtx) update(lastCtx); }
        return;
      }
      if (sequence) endSequence(true);
      disposeChildren();
      questKey = next; quest = next ? JSON.parse(next) : null; memory = createMemory(); result = null; postedKey = ''; progressKey = '';
      banner.hidden = true;
      if (!quest) { hud.hidden = true; hooks.render(); return; }
      if (completed) { memory.complete = true; markAll(); }
      carvings = (quest.carvings || []).map(carving);
      for (const item of itemsOf(quest)) views.set(item.id, quest.kind === 'shadow-tip' ? markView(item) : gemView(item));
      title.textContent = quest.title; goal.textContent = quest.goal;
      controls.replaceChildren(); dateEl = null;
      for (const c of quest.controls || []) {
        if (c === 'days') {
          dateEl = el('span', 'quest-date'); controls.append(dateEl);
          for (const n of [-30, -7, -1, 1, 7, 30]) {
            const b = button(`${n > 0 ? '+' : '−'}${Math.abs(n)}`, () => hooks.stepDays(n));
            b.setAttribute('aria-label', `${n > 0 ? 'Forward' : 'Back'} ${Math.abs(n)} ${Math.abs(n) === 1 ? 'day' : 'days'}`);
            controls.append(b);
          }
        }
        if (c === 'seasons') for (const [key, label] of [['march', 'Mar 20'], ['june', 'Jun 21'], ['sept', 'Sep 22'], ['dec', 'Dec 21']]) controls.append(button(label, () => hooks.season(key)));
        if (c === 'noon') controls.append(button('☀ Noon', () => hooks.noon()));
      }
      controls.hidden = !controls.children.length;
      hud.hidden = false; setCollapsed(false);
      hooks.render();
    }
    function markAll() {
      for (const item of quest ? itemsOf(quest) : []) if (item.required !== false) memory.touched.add(item.id);
      ['start', 'first', 'last'].forEach(flag => memory.touched.add(flag));
    }
    function update(ctx) {
      if (!quest) return;
      lastCtx = ctx;
      if (sequence) { flashSequence(ctx); return; }
      const was = memory.complete;
      result = evaluate(quest, ctx, memory);
      paint(performance.now());
      renderHud(ctx);
      const key = JSON.stringify([quest.id, result.complete, result.progress.map(p => p.done)]);
      if (key !== postedKey) {
        postedKey = key;
        hooks.post({ type: 'quest-state', questId: quest.id, complete: result.complete, progress: result.progress.map(({ id, label, done }) => ({ id, label, done })) });
      }
      if (result.complete && !was) startReveal();
    }
    function paint(now) {
      for (const item of itemsOf(quest)) {
        const view = views.get(item.id);
        if (view.mark) {
          if (memory.touched.has(item.id) && !view.filled) { view.filled = true; view.filledAt = now; if (!reduced) dust(view, 18); }
          if (reduced || now - view.filledAt >= 600) view.inlay.material.opacity = view.filled ? 1 : 0;
          continue;
        }
        const point = result.points[item.id];
        const lit = !!result.progress.find(p => p.id === item.id)?.done;
        view.group.visible = !!point;
        if (point) place(view, point, quest.gems.filter(o => result.points[o.id] === point).indexOf(item));
        if (lit && !view.lit) { view.lit = true; view.litAt = now; if (!reduced && point) sparkle(view, 14); }
        if (!lit && view.lit) view.lit = false;
        view.material.emissiveIntensity = view.lit ? 1.15 : .12;
        view.halo.material.opacity = view.lit ? .7 : 0;
        view.rim.material.opacity = view.lit ? .95 : .5;
      }
      const done = result.progress.filter(p => p.done).length;
      if (!reveal) for (const c of carvings) c.glow.opacity = memory.complete ? .8 : done / Math.max(1, result.progress.length) * .35;
      hooks.render();
    }
    function renderHud(ctx) {
      const done = result.progress.filter(p => p.done).length;
      star.textContent = result.complete ? '★' : '◇';
      count.textContent = `${done}/${result.progress.length}`;
      hud.classList.toggle('complete', result.complete);
      const key = JSON.stringify(result.progress);
      if (key !== progressKey) {
        progressKey = key;
        list.replaceChildren(...result.progress.map(p => {
          const item = el('li'), icon = el('i');
          item.classList.toggle('done', p.done); icon.style.setProperty('--gem', css(p.color)); icon.setAttribute('aria-hidden', 'true');
          item.setAttribute('aria-label', `${p.label}: ${p.done ? 'done' : 'not yet'}`);
          item.append(icon, el('span', '', p.label));
          return item;
        }));
      }
      if (dateEl) dateEl.textContent = shortDate(ctx.settings.localDate);
      replay.hidden = !result.complete;
    }
    function showBanner(mode) {
      banner.hidden = false;
      bannerTitle.textContent = (mode === 'sequence' ? '☀ ' : '★ ') + quest.reveal.title;
      bannerReplay.hidden = mode === 'sequence';
      bannerClose.textContent = mode === 'sequence' ? 'Skip' : '×';
      bannerClose.setAttribute('aria-label', mode === 'sequence' ? 'Skip the time-lapse' : 'Close');
      if (mode !== 'sequence') ticker.textContent = '';
    }
    function startReveal() {
      if (!quest || !memory.complete || sequence) return;
      const style = quest.reveal.style;
      if (!reduced && (style === 'year' || style === 'daylapse')) { startSequence(style === 'daylapse' ? 'day' : 'year'); return; }
      showBanner('complete');
      if (reduced) {
        for (const c of carvings) c.glow.opacity = .8;
        for (const view of views.values()) if (view.mark && view.filled) view.inlay.material.opacity = 1;
        hooks.render(); return;
      }
      glow(performance.now());
    }
    function glow(now) {
      reveal = { start: now, duration: 4200 };
      itemsOf(quest).forEach((item, index) => {
        const view = views.get(item.id);
        if (!view) return;
        view.order = index;
        if (view.mark) { if (view.filled) dust(view, 24); return; }
        if (!view.group.visible) return;
        sparkle(view, quest.reveal.style === 'bloom' ? 44 : 30);
        if (quest.reveal.style === 'beam' && lastCtx?.sun?.y > 0) beam(view, lastCtx.sun);
      });
      hooks.render();
    }
    function startSequence(kind) {
      const snapshot = hooks.snapshot();
      if (kind === 'day') {
        const day = hooks.day?.();
        if (!day || day.kind !== 'normal' || !hooks.observeClock) { showBanner('complete'); glow(performance.now()); return; }
        sequence = { kind, snapshot, from: day.start + 1, to: Math.min(day.end, 1439) - 1, step: 0, steps: 90, next: 0 };
      } else {
        const from = quest.reveal.from || itemsOf(quest).find(item => item.date)?.date || snapshot.localDate;
        sequence = { kind, snapshot, from, day: 0, next: 0 };
      }
      hooks.freeze(true);
      showBanner('sequence');
    }
    function stepSequence(now) {
      if (sequence.kind === 'day') {
        if (sequence.step > sequence.steps) { endSequence(); return; }
        const minutes = sequence.from + (sequence.to - sequence.from) * sequence.step / sequence.steps;
        sequence.step++; sequence.next = now + 70;
        ticker.textContent = clockText(minutes);
        hooks.observeClock(minutes);
        return;
      }
      if (sequence.day > 365) { endSequence(); return; }
      const day = shift(sequence.from, sequence.day);
      sequence.day += 4; sequence.next = now + 110;
      ticker.textContent = luxon().fromISO(day, { zone: 'utc' }).toFormat('MMM d');
      hooks.observe(day, 'noon');
    }
    /** During a time-lapse, each symbol or gem responds when the moving shadow tip or light reaches it. */
    function flashSequence(ctx) {
      const now = performance.now();
      const tip = quest.kind === 'shadow-tip' ? window.SundialLab.tip(ctx.design, ctx.sun) : null;
      for (const item of itemsOf(quest)) {
        const view = views.get(item.id);
        if (!view) continue;
        let hit = false;
        if (view.mark) hit = !!tip && Math.hypot(tip.x - item.x, tip.z - item.z) <= Math.max(item.radius, item.size / 2);
        else {
          const point = result?.points[item.id];
          hit = !!point && lightAt(ctx.design, point, ctx.sun) === item.light;
        }
        if (!hit || now - view.flashAt < 400) continue;
        view.flashAt = now;
        if (view.mark) { if (!view.filled) { view.filled = true; view.filledAt = now; } dust(view, 12); }
        else sparkle(view, 10);
      }
    }
    function endSequence(silent = false) {
      const snapshot = sequence.snapshot;
      sequence = null; hooks.freeze(false); hooks.restore(snapshot);
      if (silent || !quest) return;
      showBanner('complete'); glow(performance.now());
    }
    function tick(now) {
      if (!quest) return false;
      let active = false;
      if (sequence) { active = true; if (now >= sequence.next) stepSequence(now); }
      for (const view of views.values()) {
        if (view.mark) {
          const age = now - view.filledAt, flash = now - view.flashAt;
          let scale = 1;
          if (!reduced && view.filled && age >= 0 && age < 700) {
            scale = 1 + Math.sin(age / 700 * Math.PI) * .35; view.inlay.material.opacity = Math.min(1, age / 500); active = true;
          } else if (view.filled) view.inlay.material.opacity = 1;
          if (!reduced && flash >= 0 && flash < 450) { scale = Math.max(scale, 1 + Math.sin(flash / 450 * Math.PI) * .45); active = true; }
          if (reveal && !reduced) {
            const local = (now - reveal.start - view.order * 140) / 700;
            if (local > 0 && local < 1) scale = Math.max(scale, 1 + Math.sin(local * Math.PI) * .5);
          }
          view.group.scale.setScalar(scale);
          continue;
        }
        const age = now - view.litAt, flash = now - view.flashAt;
        if (!reduced && view.lit && age >= 0 && age < 900) {
          const s = 1 + Math.sin(age / 900 * Math.PI) * .9;
          view.gem.scale.set(s, .38 * s, s); active = true;
        } else if (!reduced && flash >= 0 && flash < 500) {
          const s = 1 + Math.sin(flash / 500 * Math.PI) * 1.2;
          view.gem.scale.set(s, .38 * s, s); view.halo.material.opacity = .95; active = true;
        } else view.gem.scale.set(1, .38, 1);
      }
      if (reveal) {
        const t = (now - reveal.start) / reveal.duration;
        if (t >= 1 || t < 0) {
          reveal = null;
          for (const c of carvings) c.glow.opacity = .8;
          for (const v of views.values()) {
            if (v.mark) { v.group.scale.setScalar(1); continue; }
            v.gem.position.y = v.baseY; v.gem.rotation.y = Math.PI / 4; v.halo.scale.setScalar(v.r * 6); v.halo.material.opacity = v.lit ? .7 : 0;
          }
        } else {
          carvings.forEach((c, i) => { c.glow.opacity = Math.min(1, Math.max(0, t * 2.2 - i * .1)) * (.85 + Math.sin(now / 160) * .15); });
          for (const v of views.values()) {
            if (v.mark || !v.group.visible) continue;
            const lift = Math.sin(Math.min(1, t * 1.4) * Math.PI);
            v.gem.position.y = v.baseY + lift * v.r * 2.4; v.gem.rotation.y = Math.PI / 4 + t * Math.PI * 6;
            v.halo.material.opacity = .6 + Math.sin(now / 120) * .35; v.halo.scale.setScalar(v.r * (6 + lift * 5));
          }
        }
        active = true;
      }
      effects = effects.filter(effect => {
        const t = (now - effect.start) / effect.duration;
        if (t >= 1 || t < 0) { root.remove(effect.object); effect.object.geometry.dispose(); effect.object.material.dispose(); return false; }
        effect.update(t); return true;
      });
      return active || effects.length > 0;
    }
    return {
      setQuest, update, tick,
      get quest() { return quest; },
      get complete() { return memory.complete; },
    };
  }

  window.SolarQuests = Object.freeze({ colors: COLORS, symbols: SYMBOLS, valid, evaluate, createMemory, create });
})();
