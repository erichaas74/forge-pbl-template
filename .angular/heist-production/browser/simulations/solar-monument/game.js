(() => {
  'use strict';

  const missingDependencies = [];
  if (!window.THREE) missingDependencies.push('Three.js');
  if (!window.Globe) missingDependencies.push('Globe.gl');
  if (!window.SunCalc) missingDependencies.push('SunCalc');
  if (!window.luxon || !window.luxon.DateTime) missingDependencies.push('Luxon');
  if (!window.tzLookup && !window.tzlookup) missingDependencies.push('tz-lookup');
  if (!window.SolarDay || !window.MonumentCamera || !window.createSunDemonstration || !window.createEarthExplanation) missingDependencies.push('Sun demonstration');
  if (!window.SolarGeometry || !window.createSolarSky) missingDependencies.push('solar geometry and sky model');

  if (missingDependencies.length) {
    const warning = document.getElementById('dependencyWarning');
    if (warning) {
      warning.hidden = false;
      warning.textContent = `This lab needs ${missingDependencies.join(', ')} to load. Check the internet connection and refresh.`;
    }
    return;
  }

  const DateTime = window.luxon.DateTime;
  const tzLookup = window.tzLookup || window.tzlookup;

  const state = {
    lat: 38.83,
    lon: -104.82,
    selectedZone: 'America/Denver',
    localDateISO: '2026-06-21',
    minutes: 720,
    showMoon: false,
    compareSeasons: false,
    showLabels: true,
    showBelow: true,
    objectType: 'pole',
    objectHeight: 2,
    playing: false,
    activeView: 'globe'
  };

  const els = {
    globeContainer: document.getElementById('globeContainer'),
    globeTab: document.getElementById('globeTab'),
    horizonTab: document.getElementById('horizonTab'),
    globeView: document.getElementById('globeView'),
    horizonView: document.getElementById('horizonView'),
    latInput: document.getElementById('latInput'),
    lonInput: document.getElementById('lonInput'),
    useLocationBtn: document.getElementById('useLocationBtn'),
    zoneLabel: document.getElementById('zoneLabel'),
    locationPresetBtns: Array.from(document.querySelectorAll('[data-location-preset]')),
    dateInput: document.getElementById('dateInput'),
    timeSlider: document.getElementById('timeSlider'),
    timeLabel: document.getElementById('timeLabel'),
    playBtn: document.getElementById('playBtn'),
    noonBtn: document.getElementById('noonBtn'),
    sunriseBtn: document.getElementById('sunriseBtn'),
    sunsetBtn: document.getElementById('sunsetBtn'),
    moonToggle: document.getElementById('moonToggle'),
    seasonToggle: document.getElementById('seasonToggle'),
    labelsToggle: document.getElementById('labelsToggle'),
    belowToggle: document.getElementById('belowToggle'),
    readout: document.getElementById('readout'),
    statusText: document.getElementById('statusText'),
    sunSummary: document.getElementById('sunSummary'),
    objectSelect: document.getElementById('objectSelect'),
    heightInput: document.getElementById('heightInput'),
    horizonCanvas: document.getElementById('horizonCanvas'),
    shadowCanvas: document.getElementById('shadowCanvas'),
    shadowInfo: document.getElementById('shadowInfo'),
    diagnosticLocalTime: document.getElementById('diagnosticLocalTime'),
    diagnosticUTC: document.getElementById('diagnosticUTC'),
    diagnosticZone: document.getElementById('diagnosticZone'),
    seasonBtns: Array.from(document.querySelectorAll('[data-season]'))
  };

  const seasons = {
    march: { name: 'March Equinox', month: 2, day: 20, color: '#34a77b' },
    june: { name: 'June Solstice', month: 5, day: 21, color: '#f6b940' },
    sept: { name: 'Sept. Equinox', month: 8, day: 22, color: '#d66f4b' },
    dec: { name: 'Dec. Solstice', month: 11, day: 21, color: '#8bbde4' }
  };

  const shadow = {
    renderer: null,
    scene: null,
    camera: null,
    sunLight: null,
    ambient: null,
    target: null,
    ground: null,
    objectGroup: null
  };

  let globe;
  let playTimer = null;
  let _starCache = null;
  let monumentDesign = { blocks: [], targets: [] };
  let solarOptics;
  let sceneDirty = true;
  let targetMarkers = null;
  let markerRequest = '', markerPicking = false, markerPoint = { x: 0, z: 0 }, markerGhost = null, selectedMarker = '', markerReadingKey = '';
  let cameraMode = 'angle';
  let lastPublishedContext = '';
  let solarSky;
  let sunDemonstration;
  let earthExplanation;
  let lessonActivity = '', sundialGuide, dialReadOnly = false, calendarDate = '';
  let hostedChrome = false, toolbarFeedback = '', toolbarKey = '';
  let sunMode = false;
  let observationRule = 'noon';
  let dayCache, dayKey = '';
  let graphKey = '';
  let lastTick = 0;
  let cameraIncludesShadow = true;
  let cameraFrame;
  let frameKey = '';
  let rayChoice = 'auto';
  let pausedDay = '';
  let playbackFrame = null;
  let reviewFrame = null;
  let reviewingCamera = false;
  let skyPathKey = '';
  let skyTracks = [];
  let hostActive = window.parent === window;

  init();

  function init() {
    state.selectedZone = getZoneForLocation(state.lat, state.lon);
    state.localDateISO = normalizeDateInput(DateTime.now().setZone(state.selectedZone).toISODate(), '2026-06-21');
    els.dateInput.value = state.localDateISO;

    bindEvents();
    initGlobe();
    initShadowScene();
    bindDemonstration();
    state.minutes = currentDay().noon;
    updateAll();
    bindMonumentBridge();
    switchView('horizon');
    requestAnimationFrame(animationLoop);
  }

  function bindEvents() {
    els.globeTab.addEventListener('click', () => switchView('globe'));
    els.horizonTab.addEventListener('click', () => switchView('horizon'));

    els.useLocationBtn.addEventListener('click', () => {
      setLocationFromInputs();
      updateAll();
    });

    els.locationPresetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        state.lat = clamp(Number(btn.dataset.lat), -89.9, 89.9);
        state.lon = normalizeLon(Number(btn.dataset.lon));
        state.selectedZone = getZoneForLocation(state.lat, state.lon);
        locationChanged();
        syncLocationInputs();
        markActiveLocationPreset();
        updateAll();
      });
    });

    els.dateInput.addEventListener('change', () => {
      stopDay();
      state.localDateISO = normalizeDateInput(els.dateInput.value, state.localDateISO);
      els.dateInput.value = state.localDateISO;
      if (observationRule === 'noon') state.minutes = currentDay().noon;
      frameKey = '';
      updateAll();
    });

    els.timeSlider.addEventListener('input', () => {
      stopDay(); observationRule = 'clock';
      state.minutes = Number(els.timeSlider.value);
      setSunMode(true);
      updateAll();
    });

    els.playBtn.addEventListener('click', togglePlay);
    els.noonBtn.addEventListener('click', () => setTimeFromSolarEvent('solarNoon'));
    els.sunriseBtn.addEventListener('click', () => setTimeFromSolarEvent('sunrise'));
    els.sunsetBtn.addEventListener('click', () => setTimeFromSolarEvent('sunset'));

    bindToggle(els.moonToggle, 'showMoon');
    bindToggle(els.seasonToggle, 'compareSeasons');
    bindToggle(els.labelsToggle, 'showLabels');
    bindToggle(els.belowToggle, 'showBelow');

    els.objectSelect.addEventListener('change', () => {
      state.objectType = els.objectSelect.value;
      rebuildShadowObject();
      updateAll();
    });

    els.heightInput.addEventListener('input', () => {
      const nextHeight = Number(els.heightInput.value);
      if (!Number.isFinite(nextHeight)) return;
      state.objectHeight = clamp(nextHeight, 0.2, 10);
      rebuildShadowObject();
      updateAll();
    });

    els.heightInput.addEventListener('change', () => {
      els.heightInput.value = state.objectHeight.toFixed(1).replace(/\.0$/, '');
    });

    els.seasonBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        stopDay();
        const season = seasons[btn.dataset.season];
        if (!season) return;
        state.localDateISO = seasonISO(season, getSelectedYear());
        els.dateInput.value = state.localDateISO;
        if (observationRule === 'noon') state.minutes = currentDay().noon;
        frameKey = '';
        setSunMode(true);
        updateAll();
      });
    });

    window.addEventListener('resize', () => {
      resizeGlobe();
      resizeCanvases();
      resizeShadowRenderer();
      updateAll();
    });
  }

  function bindToggle(button, stateKey) {
    button.addEventListener('click', () => {
      state[stateKey] = !state[stateKey];
      button.classList.toggle('active', state[stateKey]);
      button.setAttribute('aria-pressed', String(state[stateKey]));
      updateAll();
    });
  }

  function setLocationFromInputs() {
    state.lat = clamp(Number(els.latInput.value) || 0, -89.9, 89.9);
    state.lon = normalizeLon(Number(els.lonInput.value) || 0);
    state.selectedZone = getZoneForLocation(state.lat, state.lon);
    locationChanged();
    syncLocationInputs();
    markActiveLocationPreset();
  }

  function locationChanged() {
    stopDay(); pausedDay = ''; reviewFrame = null;
    if (observationRule === 'noon') state.minutes = currentDay().noon;
    frameKey = '';
  }

  function syncLocationInputs() {
    els.latInput.value = state.lat.toFixed(2);
    els.lonInput.value = state.lon.toFixed(2);
  }

  function markActiveLocationPreset() {
    els.locationPresetBtns.forEach(btn => {
      const lat = Number(btn.dataset.lat);
      const lon = Number(btn.dataset.lon);
      const active = Math.abs(lat - state.lat) < 0.01 && Math.abs(normalizeLon(lon) - state.lon) < 0.01;
      btn.classList.toggle('active', active);
    });
  }

  function setTimeFromSolarEvent(key) {
    stopDay(true);
    const day = currentDay();
    if (key !== 'solarNoon' && day.kind !== 'normal') return;
    observationRule = key === 'solarNoon' ? 'noon' : 'clock';
    state.minutes = key === 'solarNoon' ? day.noon : key === 'sunrise' ? day.start : day.end;
    els.timeSlider.value = state.minutes;
    setSunMode(true);
    updateAll();
  }

  function switchView(view) {
    state.activeView = view;
    const globeActive = view === 'globe';
    els.globeTab.classList.toggle('active', globeActive);
    els.horizonTab.classList.toggle('active', !globeActive);
    els.globeTab.setAttribute('aria-selected', String(globeActive));
    els.horizonTab.setAttribute('aria-selected', String(!globeActive));
    els.globeView.classList.toggle('active', globeActive);
    els.horizonView.classList.toggle('active', !globeActive);

    window.setTimeout(() => {
      resizeGlobe();
      resizeCanvases();
      resizeShadowRenderer();
      updateAll();
    }, 40);
  }

  function initGlobe() {
    globe = Globe()(els.globeContainer)
      .globeImageUrl('earth.jpg')
      .bumpImageUrl('earth-topology.png')
      .backgroundColor('rgba(0,0,0,0)')
      .pointLat('lat')
      .pointLng('lng')
      .pointAltitude(0.025)
      .pointRadius(0.45)
      .pointColor(() => '#f6b940')
      .pointLabel(d => `Selected site<br>Lat: ${d.lat.toFixed(2)}<br>Lon: ${d.lng.toFixed(2)}`)
      .onGlobeClick(({ lat, lng }) => {
        state.lat = clamp(lat, -89.9, 89.9);
        state.lon = normalizeLon(lng);
        state.selectedZone = getZoneForLocation(state.lat, state.lon);
        locationChanged();
        syncLocationInputs();
        markActiveLocationPreset();
        updateAll();
      });

    globe.controls().autoRotate = false;
    globe.controls().autoRotateSpeed = 0.28;
    resizeGlobe();
  }

  function initShadowScene() {
    const canvas = els.shadowCanvas;
    shadow.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    shadow.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    shadow.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    shadow.renderer.toneMappingExposure = 1.15;
    shadow.renderer.shadowMap.enabled = false;
    shadow.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    shadow.scene = new THREE.Scene();
    shadow.scene.background = new THREE.Color(0xbce4ed);

    shadow.camera = new THREE.PerspectiveCamera(42, 1, 0.01, 2500);
    shadow.camera.position.set(6, 5, 8);
    shadow.camera.lookAt(0, 0.9, 0);

    shadow.ambient = new THREE.HemisphereLight(0xcdeaff, 0xbba47b, 0.8);
    shadow.scene.add(shadow.ambient);

    shadow.sunLight = new THREE.DirectionalLight(0xfff5e4, 2.4);
    shadow.sunLight.castShadow = true;
    shadow.sunLight.shadow.mapSize.width = 2048;
    shadow.sunLight.shadow.mapSize.height = 2048;
    shadow.sunLight.shadow.camera.left = -9;
    shadow.sunLight.shadow.camera.right = 9;
    shadow.sunLight.shadow.camera.top = 9;
    shadow.sunLight.shadow.camera.bottom = -9;
    shadow.sunLight.shadow.camera.near = 0.1;
    shadow.sunLight.shadow.camera.far = 1600;
    shadow.sunLight.shadow.bias = -0.00025;

    shadow.target = new THREE.Object3D();
    shadow.target.position.set(0, 0, 0);
    shadow.scene.add(shadow.target);
    shadow.sunLight.target = shadow.target;
    shadow.scene.add(shadow.sunLight);
    solarSky = window.createSolarSky(THREE, shadow.scene, makeTextSprite);
    solarOptics = window.createSolarOpticsRenderer(THREE);
    sunDemonstration = window.createSunDemonstration(THREE, shadow.scene);

    const groundGeo = new THREE.PlaneGeometry(2000, 2000);
    const groundMat = solarOptics.floorMaterial();
    shadow.ground = new THREE.Mesh(groundGeo, groundMat);
    shadow.ground.rotation.x = -Math.PI / 2;
    shadow.ground.name = 'carved-stone-court';
    // Analytic rays resolve holes, filters and object occlusion at each visible surface point.
    shadow.ground.receiveShadow = false;
    shadow.scene.add(shadow.ground);

    const grid = new THREE.GridHelper(28, 28, 0x615240, 0x897a64);
    grid.position.y = .003;
    grid.material.opacity = 0.4;
    grid.material.transparent = true;
    shadow.scene.add(grid);
    grid.visible = false;
    document.getElementById('gridToggle').addEventListener('click', event => {
      grid.visible = !grid.visible;
      event.currentTarget.setAttribute('aria-pressed', String(grid.visible));
      updateSceneLabel();
      sceneDirty = true;
    });

    addCompassMarkers();
    rebuildShadowObject();
    resizeShadowRenderer();
  }

  function addCompassMarkers() {
    shadow.compass = new THREE.Group();
    shadow.scene.add(shadow.compass);
    [
      { label: 'N', x: 0, z: -6.5 },
      { label: 'E', x: 6.5, z: 0 },
      { label: 'S', x: 0, z: 6.5 },
      { label: 'W', x: -6.5, z: 0 }
    ].forEach(marker => {
      const sprite = makeTextSprite(marker.label);
      sprite.position.set(marker.x, 0.05, marker.z);
      sprite.scale.set(0.9, 0.45, 1);
      shadow.compass.add(sprite);
    });
  }

  function makeTextSprite(text, badge = false) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (badge) { ctx.fillStyle = '#443e2d'; ctx.beginPath(); ctx.arc(128, 66, 43, 0, Math.PI * 2); ctx.fill(); }
    const caption = text.length > 22 ? text.slice(0, 21) + '…' : text;
    let fontSize = 64;
    ctx.font = `bold ${fontSize}px Inter, Arial`;
    while (ctx.measureText(caption).width > 240 && fontSize > 18) {
      fontSize -= 2;
      ctx.font = `bold ${fontSize}px Inter, Arial`;
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.fillText(caption, 128, 70);
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
    return new THREE.Sprite(material);
  }

  function rebuildShadowObject() {
    rebuildMonument();
  }

  function updateAll() {
    updateControlText();
    updateGlobeMarker();
    drawHorizon();
    updateShadowScene();
    updateReadout();
    publishContext();
    updateSundial();
    updateMarkerReading();
    publishToolbar();
  }

  function publishToolbar() {
    if (!hostedChrome) return;
    const day = currentDay(), post = window.SundialLab.post(monumentDesign);
    const ui = {
      date: formatDateShortISO(state.localDateISO), clock: document.getElementById('dayClock').textContent,
      minutes: state.minutes, start: day.start, end: day.end, play: els.playBtn.textContent,
      canPlay: !els.playBtn.disabled, noon: observationRule === 'noon', sun: sunMode,
      season: Object.keys(seasons).find(key => seasonISO(seasons[key], getSelectedYear()) === state.localDateISO) ?? '',
      height: post ? post.height * 100 : 60, marks: monumentDesign.targets.length,
      canUndo: monumentDesign.targets.some(editableDialMark), canReturn: !!window.SundialLab.reference(monumentDesign),
      message: toolbarFeedback || (day.kind === 'polar-night' ? 'No daylight at this place today.' : day.kind === 'polar-day' ? '24-hour daylight at this place.' : ''),
      startLabel: document.getElementById('dayStart').textContent, endLabel: document.getElementById('dayEnd').textContent,
    };
    const key = JSON.stringify(ui); if (key === toolbarKey) return; toolbarKey = key;
    window.parent.postMessage({ channel: 'forge.design-simulation.v1', type: 'toolbar-state', state: ui }, window.location.origin);
  }
  function toolbarAction(action, value) {
    if (!hostedChrome || typeof action !== 'string') return;
    toolbarFeedback = '';
    const presenting = document.body.classList.contains('presenting');
    const dateActions = ['dayStart', 'dayEnd', 'noonBtn', 'dialMorning', 'dialAfternoon', 'dialWeekBefore', 'dialWeekAfter', 'minutes', 'playBtn', 'march', 'june', 'sept', 'dec'];
    if (presenting && dateActions.includes(action)) return;
    if (dateActions.includes(action) || action === 'buildMode') cancelMarkerPlacement(true);
    if (['post','markDial','undoDial','buildMode'].includes(action) && dialReadOnly) return;
    if (action === 'post') {
      if (lessonActivity !== 'sundial-build' || !Number.isFinite(value)) return;
      document.getElementById('postHeight').value = String(value); document.getElementById('buildSundial').click();
    } else if (action === 'minutes') {
      const day = currentDay(); if (!Number.isFinite(value) || value < day.start || value > day.end || day.kind === 'polar-night') return;
      stopDay(); observationRule = 'clock'; state.minutes = value; setSunMode(true); updateAll();
    } else if (action === 'speed') {
      if (![.5, 1, 2].includes(Number(value))) return;
      document.getElementById('daySpeed').value = String(value);
    } else if (Object.hasOwn(seasons, action)) {
      document.getElementById(action + 'Btn').click();
    } else if (action === 'extras') {
      document.body.classList.toggle('extra-tools'); document.getElementById('moreViews').open = true;
      if (document.body.classList.contains('extra-tools')) document.getElementById('moreViews').scrollIntoView({ block: 'nearest' });
    } else if (['showSun','playBtn','buildMode','dayStart','dayEnd','noonBtn','dialMorning','dialAfternoon','dialWeekBefore','dialWeekAfter','markDial','undoDial','returnDial','controlsToggle','earthToggle','shadowView','topView','fitView'].includes(action)) {
      if (action === 'earthToggle' && ['sundial-build', 'sundial-seasons'].includes(lessonActivity)) return;
      document.getElementById(action).click();
    }
    publishToolbar();
  }

  function isSundial() { return window.SundialLab.activities.includes(lessonActivity); }
  function dialSun() {
    const sun = getSunPosition(getSelectedJSDate(), state.lat, state.lon);
    return window.SolarGeometry.sunDirection(sun.altitudeDeg, sun.compassDeg);
  }
  function dialObserve(settings, noon = true) {
    stopDay();
    state.lat = clamp(settings.latitude ?? state.lat, -89.9, 89.9);
    state.lon = normalizeLon(settings.longitude ?? state.lon);
    state.selectedZone = getZoneForLocation(state.lat, state.lon);
    state.localDateISO = normalizeDateInput(settings.localDate, state.localDateISO);
    observationRule = noon ? 'noon' : 'clock';
    state.minutes = noon ? currentDay().noon : settings.minutes;
    syncLocationInputs(); els.dateInput.value = state.localDateISO;
    frameKey = ''; setSunMode(true); updateAll();
  }
  function applyLesson(activity) {
    if (!['', 'monument', ...window.SundialLab.activities].includes(activity) || activity === lessonActivity) return;
    cancelMarkerPlacement(true); stopDay(); lessonActivity = activity; calendarDate = ''; toolbarFeedback = '';
    const practice = isSundial(), first = activity === 'sundial-build', surprise = activity === 'sundial-seasons', calendar = activity === 'sundial-calendar';
    document.body.classList.toggle('sundial-lesson', practice);
    document.getElementById('sundialTools').hidden = !practice;
    document.getElementById('sundialBuild').hidden = !first;
    document.getElementById('dialTimes').hidden = !first;
    document.getElementById('markDial').hidden = !(first || calendar);
    document.getElementById('markDial').textContent = calendar ? 'Mark this date' : 'Mark this time';
    document.getElementById('undoDial').hidden = !(first || calendar);
    document.getElementById('dialNearby').hidden = !calendar;
    document.querySelector('.season-grid').hidden = first;
    document.getElementById('buildMode').hidden = practice;
    document.getElementById('earthToggle').hidden = first || surprise;
    document.getElementById('earthGuide').hidden = hostedChrome || activity !== 'sundial-tilt';
    document.getElementById('earthToggle').setAttribute('aria-expanded', String(!document.getElementById('earthGuide').hidden));
    document.getElementById('dialStatus').textContent = first ? 'Place marks at the shadow tip. Gold lines keep your original measurements.' : 'Your original marks stay fixed. Compare where the shadow tip lands now.';
    if (!practice) { frameKey = ''; updateAll(); return; }
    const ref = window.SundialLab.reference(monumentDesign), year = ref ? Number(ref.localDate.slice(0, 4)) : getSelectedYear();
    if (!first && !ref) document.getElementById('dialStatus').textContent = 'For the clearest comparison, return to Build a sundial and make a few time marks first.';
    let localDate = first && ref ? ref.localDate : seasonISO(seasons.june, year);
    if (surprise || activity === 'sundial-tilt') localDate = seasonISO(Number((ref?.localDate ?? localDate).slice(5, 7)) >= 10 || Number((ref?.localDate ?? localDate).slice(5, 7)) <= 2 ? seasons.june : seasons.dec, year);
    if (calendar) localDate = seasonISO(seasons.march, year);
    dialObserve({ ...(ref ?? observationSettings()), localDate });
  }
  function updateSundial() {
    if (!shadow.scene) return;
    sundialGuide ||= window.SundialLab.createGuide(THREE, shadow.scene);
    sundialGuide.update(monumentDesign, dialSun(), isSundial() && sunMode);
    document.getElementById('dialLegend').hidden = !isSundial();
    if (!isSundial()) return;
    const point = window.SundialLab.tip(monumentDesign, dialSun());
    document.getElementById('dialTip').textContent = point ? `Shadow tip: ${Math.hypot(point.x, point.z).toFixed(2)} m from the post. The glowing ring follows the tip; your marks stay fixed.` : 'No shadow tip while the Sun is below the horizon.';
    document.getElementById('returnDial').disabled = !window.SundialLab.reference(monumentDesign);
    document.getElementById('markDial').disabled = dialReadOnly;
    document.getElementById('undoDial').disabled = dialReadOnly || !monumentDesign.targets.some(editableDialMark);
  }
  function editableDialMark(target) {
    const kind = target.settings?.markerKind;
    return lessonActivity === 'sundial-build' ? kind === 'hour' : lessonActivity === 'sundial-calendar' && Object.hasOwn(window.SundialLab.labels, kind);
  }
  function bindSundial() {
    const request = make => {
      if (!isSundial() || dialReadOnly) return;
      stopDay();
      try {
        const design = make();
        if (!validMonument(design)) throw Error('Check the post and mark measurements.');
        window.parent.postMessage({ channel: 'forge.design-simulation.v1', type: 'design-change', activity: lessonActivity, design }, window.location.origin);
        document.getElementById('dialStatus').textContent = 'Sundial updated. Play the day again to test your marks.';
      } catch (error) { document.getElementById('dialStatus').textContent = error.message; toolbarFeedback = error.message; }
      updateAll();
    };
    document.getElementById('buildSundial').addEventListener('click', () => request(() => window.SundialLab.build(monumentDesign, Number(document.getElementById('postHeight').value))));
    document.getElementById('markDial').addEventListener('click', () => request(() => {
      let kind = 'hour';
      if (lessonActivity === 'sundial-calendar') {
        kind = Object.keys(seasons).find(key => seasonISO(seasons[key], getSelectedYear()) === state.localDateISO);
        if (!kind) throw Error('Choose an equinox or solstice button, then mark that date at solar noon.');
        calendarDate = state.localDateISO; observationRule = 'noon'; state.minutes = currentDay().noon;
      }
      return window.SundialLab.mark(monumentDesign, dialSun(), { ...observationSettings(), observationRule }, kind, observationRule === 'noon' ? 'Solar noon' : formatTime(getSelectedJSDate()));
    }));
    document.getElementById('undoDial').addEventListener('click', () => request(() => {
      const index = monumentDesign.targets.findLastIndex(editableDialMark);
      return { ...monumentDesign, targets: monumentDesign.targets.filter((_, i) => i !== index) };
    }));
    document.getElementById('returnDial').addEventListener('click', () => { const ref = window.SundialLab.reference(monumentDesign); if (ref) dialObserve(ref); });
    for (const [id, minutes] of [['dialMorning', 540], ['dialAfternoon', 900]]) document.getElementById(id).addEventListener('click', () => dialObserve({ ...observationSettings(), minutes }, false));
    for (const [id, days] of [['dialWeekBefore', -7], ['dialWeekAfter', 7]]) document.getElementById(id).addEventListener('click', () => {
      const special = Object.keys(seasons).find(key => seasonISO(seasons[key], getSelectedYear()) === state.localDateISO);
      if (special) calendarDate = state.localDateISO;
      if (!calendarDate) { document.getElementById('dialStatus').textContent = 'Choose a special date first.'; return; }
      dialObserve({ localDate: DateTime.fromISO(calendarDate).plus({ days }).toISODate() });
      document.getElementById('dialStatus').textContent = `Comparing ${days < 0 ? 'a week before' : 'a week after'} ${calendarDate}. The marks stay fixed.`;
    });
  }

  function observationSettings() {
    return { latitude: state.lat, longitude: state.lon, zone: state.selectedZone, localDate: state.localDateISO, minutes: state.minutes };
  }
  function publishContext(force = false) {
    const key = [state.lat, state.lon, state.selectedZone, getSelectedYear()].join('|');
    if (!force && key === lastPublishedContext) return;
    lastPublishedContext = key;
    window.parent.postMessage({ channel: 'forge.design-simulation.v1', type: 'context', key, settings: observationSettings() }, window.location.origin);
  }

  function updateControlText() {
    const localDateTime = getSelectedLocalDateTime();
    const dateTime = getSelectedJSDate();
    const sun = getSunPosition(dateTime, state.lat, state.lon);
    els.timeLabel.textContent = formatTime(dateTime);
    els.zoneLabel.textContent = state.selectedZone;
    els.statusText.textContent = `Lat ${state.lat.toFixed(2)}, Lon ${state.lon.toFixed(2)} | ${formatDateShortISO(state.localDateISO)} ${formatTime(dateTime)} ${state.selectedZone}`;
    els.sunSummary.textContent = `Sun alt ${sun.altitudeDeg.toFixed(1)} deg | az ${sun.compassDeg.toFixed(0)} deg`;
    els.diagnosticLocalTime.textContent = localDateTime.toFormat('MMM d, yyyy h:mm a');
    els.diagnosticUTC.textContent = dateTime.toISOString();
    els.diagnosticZone.textContent = state.selectedZone;
    updateDayControls();
  }

  function updateGlobeMarker() {
    if (!globe) return;
    globe.pointsData([{ lat: state.lat, lng: state.lon }]);
  }

  function lerpColor(hex1, hex2, t) {
    const parse = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
    const [r1,g1,b1] = parse(hex1), [r2,g2,b2] = parse(hex2);
    return `rgb(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)})`;
  }

  function getStarPositions(w, skyH) {
    if (_starCache && _starCache.w === w && _starCache.h === skyH) return _starCache.stars;
    let seed = 4321;
    const rng = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0xffffffff; };
    const stars = Array.from({ length: 140 }, () => ({
      x: rng() * w, y: rng() * skyH, r: 0.4 + rng() * 1.3, b: 0.4 + rng() * 0.6
    }));
    _starCache = { w, h: skyH, stars };
    return stars;
  }

  function drawStars(ctx, w, horizonY, sunAlt) {
    const opacity = clamp((-sunAlt - 2) / 10, 0, 1);
    if (opacity <= 0) return;
    ctx.save();
    getStarPositions(w, horizonY).forEach(s => {
      ctx.globalAlpha = opacity * s.b;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.restore();
  }

  function drawSkyGradient(ctx, w, horizonY, sunAlt) {
    const a = sunAlt;
    let zenith, nearH;
    if (a <= -12) {
      zenith = '#020810'; nearH = '#03101e';
    } else if (a <= -4) {
      const t = (a + 12) / 8;
      zenith = lerpColor('#020810', '#0c2040', t);
      nearH  = lerpColor('#03101e', '#0c2040', t);
    } else if (a <= 0) {
      const t = (a + 4) / 4;
      zenith = lerpColor('#0c2040', '#0e1a4a', t);
      nearH  = lerpColor('#0c2040', '#e05518', t);
    } else if (a <= 8) {
      const t = a / 8;
      zenith = lerpColor('#0e1a4a', '#154360', t);
      nearH  = lerpColor('#e05518', '#f4c57d', t);
    } else if (a <= 30) {
      const t = (a - 8) / 22;
      zenith = '#154360';
      nearH  = lerpColor('#f4c57d', '#a8d8ee', t);
    } else {
      const t = clamp((a - 30) / 30, 0, 1);
      zenith = lerpColor('#154360', '#0c2e52', t);
      nearH  = '#a8d8ee';
    }
    const grad = ctx.createLinearGradient(0, 0, 0, horizonY);
    grad.addColorStop(0, zenith);
    grad.addColorStop(0.65, nearH);
    grad.addColorStop(1, nearH);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, horizonY);
  }

  function drawHorizonGlow(ctx, w, horizonY, sunX, sunAlt) {
    if (sunAlt < -15 || sunAlt > 22) return;
    const t = sunAlt <= 0
      ? clamp((sunAlt + 15) / 15, 0, 1)
      : clamp(1 - sunAlt / 22, 0, 1);
    const alpha = 0.55 * t;
    if (alpha <= 0) return;
    const grd = ctx.createRadialGradient(sunX, horizonY, 0, sunX, horizonY, w * 0.55);
    grd.addColorStop(0, `rgba(230,100,30,${alpha})`);
    grd.addColorStop(0.4, `rgba(200,60,10,${alpha * 0.4})`);
    grd.addColorStop(1, 'rgba(200,60,10,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, horizonY * 0.4, w, horizonY * 0.65);
  }

  function drawSunGlow(ctx, pos, altitudeDeg) {
    if (altitudeDeg < -8) return;
    const alpha = clamp((altitudeDeg + 8) / 12, 0, 1) * 0.45;
    const grd = ctx.createRadialGradient(pos.x, pos.y, 6, pos.x, pos.y, 52);
    grd.addColorStop(0, `rgba(255,230,100,${alpha})`);
    grd.addColorStop(0.5, `rgba(255,180,40,${alpha * 0.5})`);
    grd.addColorStop(1, 'rgba(255,150,0,0)');
    ctx.fillStyle = grd;
    ctx.beginPath(); ctx.arc(pos.x, pos.y, 52, 0, Math.PI * 2); ctx.fill();
  }

  function drawHorizon() {
    if (!els.horizonView.classList.contains('show-chart')) return;
    const canvas = els.horizonCanvas;
    const ctx = canvas.getContext('2d');
    resizeCanvasToDisplaySize(canvas);

    const w = canvas.width;
    const h = canvas.height;
    const horizonY = h * 0.72;
    const skyTop = h * 0.08;
    const skyHeight = horizonY - skyTop;

    const dateTime = getSelectedJSDate();
    const sun  = getSunPosition(dateTime, state.lat, state.lon);
    const moon = getMoonPosition(dateTime, state.lat, state.lon);
    const sunPos = skyToCanvas(sun.compassDeg, sun.altitudeDeg, w, horizonY, skyTop, skyHeight);

    ctx.clearRect(0, 0, w, h);

    drawSkyGradient(ctx, w, horizonY, sun.altitudeDeg);
    drawHorizonGlow(ctx, w, horizonY, sunPos.x, sun.altitudeDeg);

    const groundGrad = ctx.createLinearGradient(0, horizonY, 0, h);
    groundGrad.addColorStop(0, '#3a5a30');
    groundGrad.addColorStop(1, '#1e3318');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, horizonY, w, h - horizonY);

    drawStars(ctx, w, horizonY, sun.altitudeDeg);

    drawAltitudeGrid(ctx, w, horizonY, skyTop, skyHeight);
    drawDirectionGrid(ctx, w, h, horizonY);

    if (state.compareSeasons) {
      Object.values(seasons).forEach(season => {
        const isoDate = seasonISO(season, getSelectedYear());
        const path = samplePath('sun', isoDate, state.selectedZone, state.lat, state.lon, 10);
        drawPath(ctx, path, w, horizonY, skyTop, skyHeight, season.color, 2.2, 0.9, season.name);
      });
    } else {
      const sunPath = samplePath('sun', state.localDateISO, state.selectedZone, state.lat, state.lon, 5);
      drawPath(ctx, sunPath, w, horizonY, skyTop, skyHeight, '#f6b940', 3.2, 1, 'Sun path');
    }

    if (state.showMoon) {
      const moonPath = samplePath('moon', state.localDateISO, state.selectedZone, state.lat, state.lon, 10);
      drawPath(ctx, moonPath, w, horizonY, skyTop, skyHeight, '#d9e7f8', 2.2, 0.86, 'Moon path');
    }

    drawSunGlow(ctx, sunPos, sun.altitudeDeg);

    drawSkyObject(ctx, sun.compassDeg, sun.altitudeDeg, w, horizonY, skyTop, skyHeight, '#ffdf73', 'S', 'Sun');
    if (state.showMoon) {
      drawSkyObject(ctx, moon.compassDeg, moon.altitudeDeg, w, horizonY, skyTop, skyHeight, '#edf5ff', 'M', 'Moon');
    }

    drawRiseSetMarkers(ctx, w, horizonY, skyTop, skyHeight);
    drawShadowDirection(ctx, sun, w, h, horizonY);
    drawHorizonTitle(ctx, w);
  }

  function drawAltitudeGrid(ctx, w, horizonY, skyTop, skyHeight) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.16)';
    ctx.fillStyle = 'rgba(255,255,255,0.68)';
    ctx.font = '12px Inter, Arial';

    [0, 15, 30, 45, 60, 75, 90].forEach(alt => {
      const y = horizonY - (alt / 90) * skyHeight;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
      if (alt > 0 && alt < 90) ctx.fillText(`${alt} deg`, 8, y - 4);
    });

    ctx.restore();
  }

  function drawDirectionGrid(ctx, w, h, horizonY) {
    const dirs = [
      { label: 'N', deg: 0 },
      { label: 'E', deg: 90 },
      { label: 'S', deg: 180 },
      { label: 'W', deg: 270 },
      { label: 'N', deg: 360 }
    ];

    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = 'bold 15px Inter, Arial';
    ctx.textAlign = 'center';

    dirs.forEach(dir => {
      const x = (dir.deg / 360) * w;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
      ctx.fillText(dir.label, x, horizonY + 25);
    });

    for (let deg = 30; deg < 360; deg += 30) {
      const x = (deg / 360) * w;
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(19,58,36,0.95)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(w, horizonY);
    ctx.stroke();
    ctx.restore();
  }

  function drawPath(ctx, path, w, horizonY, skyTop, skyHeight, color, width, alpha, label) {
    const visible = path.filter(point => state.showBelow || point.altitudeDeg >= 0);
    if (visible.length < 2) return;

    ctx.save();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    splitWrappedPath(visible).forEach(segment => {
      if (segment.length < 2) return;
      ctx.beginPath();
      segment.forEach((point, index) => {
        const pos = skyToCanvas(point.compassDeg, point.altitudeDeg, w, horizonY, skyTop, skyHeight);
        if (index === 0) ctx.moveTo(pos.x, pos.y);
        else ctx.lineTo(pos.x, pos.y);
      });
      ctx.stroke();
    });

    if (state.showLabels) {
      const highPoint = path.reduce((best, point) => point.altitudeDeg > best.altitudeDeg ? point : best, path[0]);
      const pos = skyToCanvas(highPoint.compassDeg, highPoint.altitudeDeg, w, horizonY, skyTop, skyHeight);
      ctx.globalAlpha = 1;
      ctx.fillStyle = color;
      ctx.font = 'bold 12px Inter, Arial';
      ctx.fillText(label, clamp(pos.x + 8, 8, w - 130), clamp(pos.y - 8, 22, horizonY - 8));
    }

    ctx.restore();
  }

  function drawSkyObject(ctx, compassDeg, altitudeDeg, w, horizonY, skyTop, skyHeight, color, symbol, label) {
    if (!state.showBelow && altitudeDeg < 0) return;
    const pos = skyToCanvas(compassDeg, altitudeDeg, w, horizonY, skyTop, skyHeight);

    ctx.save();
    ctx.globalAlpha = altitudeDeg >= 0 ? 1 : 0.36;
    ctx.fillStyle = color;
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, label === 'Sun' ? 14 : 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#07131a';
    ctx.font = 'bold 12px Inter, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symbol, pos.x, pos.y + 0.5);

    if (state.showLabels) {
      const labelY = clamp(pos.y - 24, 24, horizonY - 8);
      ctx.fillStyle = 'rgba(255,255,255,0.94)';
      ctx.font = '12px Inter, Arial';
      ctx.fillText(`${label}: alt ${altitudeDeg.toFixed(1)}, az ${compassDeg.toFixed(0)}`, clamp(pos.x, 88, w - 88), labelY);
    }

    ctx.restore();
  }

  function drawRiseSetMarkers(ctx, w, horizonY, skyTop, skyHeight) {
    const times = SunCalc.getTimes(getSelectedJSDate(720), state.lat, state.lon);
    const markers = [
      { label: 'Sunrise', time: times.sunrise, color: '#fff0a6', kind: 'sun' },
      { label: 'Sunset', time: times.sunset, color: '#ffb36c', kind: 'sun' }
    ];

    if (state.showMoon) {
      const moonTimes = getMoonTimesForLocalDate(state.localDateISO, state.selectedZone, state.lat, state.lon);
      if (moonTimes.rise) markers.push({ label: 'Moonrise', time: moonTimes.rise, color: '#dce9ff', kind: 'moon' });
      if (moonTimes.set) markers.push({ label: 'Moonset', time: moonTimes.set, color: '#9fbfff', kind: 'moon' });
    }

    ctx.save();
    markers.forEach(marker => {
      if (!validDate(marker.time)) return;
      const pos = marker.kind === 'moon'
        ? getMoonPosition(marker.time, state.lat, state.lon)
        : getSunPosition(marker.time, state.lat, state.lon);
      const point = skyToCanvas(pos.compassDeg, 0, w, horizonY, skyTop, skyHeight);

      ctx.fillStyle = marker.color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.fill();

      if (state.showLabels) {
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = '11px Inter, Arial';
        ctx.textAlign = 'center';
        ctx.fillText(marker.label, clamp(point.x, 45, w - 45), horizonY - 12);
        ctx.fillText(formatTime(marker.time), clamp(point.x, 45, w - 45), horizonY + 43);
      }
    });
    ctx.restore();
  }

  function drawShadowDirection(ctx, sun, w, h, horizonY) {
    if (sun.altitudeDeg <= 0) return;

    const bearing = (sun.compassDeg + 180) % 360;
    const origin = { x: w - 86, y: h - 70 };
    const length = 42;
    const angle = degToRad(bearing - 90);
    const end = {
      x: origin.x + Math.cos(angle) * length,
      y: origin.y + Math.sin(angle) * length
    };

    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = 'bold 11px Inter, Arial';
    ctx.textAlign = 'center';
    ctx.fillText('shadow', origin.x, origin.y + 22);
    ctx.restore();
  }

  function drawHorizonTitle(ctx, w) {
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.86)';
    ctx.font = 'bold 16px Inter, Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Surface view at ${state.lat.toFixed(2)}, ${state.lon.toFixed(2)} - ${formatDateShortISO(state.localDateISO)}`, w / 2, 28);
    ctx.restore();
  }

  function updateShadowScene() {
    if (!shadow.sunLight) return;

    const dateTime = getSelectedJSDate();
    const sun = getSunPosition(dateTime, state.lat, state.lon);
    const altRad = degToRad(sun.altitudeDeg);
    const dist = 600;
    const direction = window.SolarGeometry.sunDirection(sun.altitudeDeg, sun.compassDeg);

    // Scene convention: x = east, z = south. Compass north maps to negative z.
    shadow.sunLight.position.set(direction.x * dist, direction.y * dist, direction.z * dist);
    shadow.sunLight.target.position.set(0, 0, 0);
    shadow.sunLight.target.updateMatrixWorld();

    const visible = sun.altitudeDeg > 0;
    shadow.sunLight.intensity = visible && sunMode ? 3.15 : 0;
    shadow.ambient.intensity = !sunMode ? 1.6 : visible ? 1.05 : .18;
    shadow.scene.background.set(!sunMode || visible ? 0xbce4ed : 0x101d32);
    renderMonumentShadows(sun);
    updateSolarSky(sun);
    // Every design/time change needs a new frame, including when the sky guide is closed.
    updateMonumentCamera();
    updateDemonstration(sun, direction);

    const shadowBearing = (sun.compassDeg + 180) % 360;
    const shadowLength = visible ? state.objectHeight / Math.tan(altRad) : Infinity;
    const lengthText = visible ? formatShadowLength(shadowLength) : 'No direct sunlight';
    const warning = visible ? '' : '<br><span class="warning">Sun is below the horizon.</span>';

    els.shadowInfo.innerHTML = `
      <strong>Sun altitude:</strong> ${sun.altitudeDeg.toFixed(1)} deg<br>
      <strong>Sun azimuth:</strong> ${sun.compassDeg.toFixed(0)} deg compass<br>
      <strong>Shadow direction:</strong> ${shadowBearing.toFixed(0)} deg compass<br>
      <strong>Height-only reference:</strong> ${lengthText}${warning}
      <br><small>Reference is height / tan(altitude), not the full monument footprint.${visible && sun.altitudeDeg < 5 ? ' Low Sun: atmospheric effects matter; shadow may extend beyond this view.' : ''}</small>
    `;
  }

  function updateReadout() {
    const dateTime = getSelectedJSDate();
    const sun = getSunPosition(dateTime, state.lat, state.lon);
    const moon = getMoonPosition(dateTime, state.lat, state.lon);
    const times = SunCalc.getTimes(getSelectedJSDate(720), state.lat, state.lon);
    const moonTimes = getMoonTimesForLocalDate(state.localDateISO, state.selectedZone, state.lat, state.lon);
    const moonIllum = SunCalc.getMoonIllumination(dateTime);
    const dayLength = validDate(times.sunrise) && validDate(times.sunset)
      ? msToHoursMinutes(times.sunset - times.sunrise)
      : 'Polar day/night';

    const values = [
      ['Sun Altitude', `${sun.altitudeDeg.toFixed(1)} deg`],
      ['Sun Azimuth', `${sun.compassDeg.toFixed(0)} deg`],
      ['Sunrise', validDate(times.sunrise) ? formatTime(times.sunrise) : 'None today'],
      ['Sunset', validDate(times.sunset) ? formatTime(times.sunset) : 'None today'],
      ['Day Length', dayLength],
      ['Solar Noon', validDate(times.solarNoon) ? formatTime(times.solarNoon) : '--'],
      ['Moon Altitude', `${moon.altitudeDeg.toFixed(1)} deg`],
      ['Moon Azimuth', `${moon.compassDeg.toFixed(0)} deg`],
      ['Moonrise', moonTimes.alwaysUp ? 'Always up' : moonTimes.rise ? formatTime(moonTimes.rise) : 'None today'],
      ['Moonset', moonTimes.alwaysDown ? 'Always down' : moonTimes.set ? formatTime(moonTimes.set) : 'None today'],
      ['Moon Illumination', `${Math.round(moonIllum.fraction * 100)}%`],
      ['Moon Phase', phaseName(moonIllum.phase)]
    ];

    els.readout.innerHTML = values.map(([name, value]) => `
      <div class="metric">
        <div class="name">${name}</div>
        <div class="value">${value}</div>
      </div>
    `).join('');
  }

  function animationLoop() {
    if (hostActive && sceneDirty && shadow.renderer && shadow.scene && shadow.camera) {
      shadow.renderer.render(shadow.scene, shadow.camera);
      sceneDirty = false;
    }
    requestAnimationFrame(animationLoop);
  }

  function togglePlay() {
    if (state.playing) { stopDay(); updateDayControls(); return; }
    const day = currentDay();
    if (day.kind === 'polar-night') return;
    const resume = pausedDay === dayKey && state.minutes > day.start && state.minutes < day.end;
    playbackFrame = cameraFrame;
    if (!resume) state.minutes = day.start;
    observationRule = 'clock'; setSunMode(true, true);
    pausedDay = dayKey;
    state.playing = true; lastTick = performance.now();
    frameKey = ''; updateAll();
    playTimer = window.setInterval(() => {
      const now = performance.now(), elapsed = Math.min(500, now - lastTick); lastTick = now;
      state.minutes = Math.min(day.end, state.minutes + elapsed / 45000 * (day.end - day.start) * Number(document.getElementById('daySpeed').value));
      els.timeSlider.value = state.minutes;
      if (state.minutes >= day.end) stopDay();
      updateAll();
    }, 80);
  }

  function stopDay(reset = false) {
    if (reset) { pausedDay = ''; playbackFrame = null; }
    state.playing = false;
    window.clearInterval(playTimer); playTimer = null;
  }

  function currentDay() {
    const key = [state.localDateISO, state.lat, state.lon, state.selectedZone].join('|');
    if (key !== dayKey) { dayKey = key; dayCache = window.SolarDay.day(observationSettings()); }
    return dayCache;
  }

  function setSunMode(value, notify = false) {
    sunMode = value;
    if (!value) stopDay(true);
    document.body.classList.toggle('build-mode', !value);
    document.getElementById('buildMode').setAttribute('aria-pressed', String(!value));
    document.getElementById('showSun').setAttribute('aria-pressed', String(value));
    document.getElementById('rayInspector').hidden = !value;
    if (notify) window.parent.postMessage({ channel: 'forge.design-simulation.v1', type: 'view-request', view: value ? 'observe' : 'build' }, window.location.origin);
  }

  function updateDayControls() {
    const day = currentDay(), slider = document.getElementById('daySlider');
    slider.min = String(day.start); slider.max = String(day.end); slider.value = String(state.minutes);
    slider.disabled = day.kind === 'polar-night';
    document.getElementById('dayDate').textContent = formatDateShortISO(state.localDateISO);
    document.getElementById('dayClock').textContent = formatTime(getSelectedJSDate()) + (state.minutes >= 1440 ? ' (+1 day)' : state.minutes < 0 ? ' (previous day)' : '');
    document.getElementById('noonBtn').setAttribute('aria-pressed', String(observationRule === 'noon'));
    document.getElementById('dayStart').textContent = day.kind === 'normal' ? `Sunrise ${formatTime(day.at(day.start))}` : 'Start of day';
    document.getElementById('dayEnd').textContent = day.kind === 'normal' ? `Sunset ${formatTime(day.at(day.end))}${day.end >= 1440 ? ' (+1 day)' : ''}` : 'End of day';
    document.getElementById('dayMessage').textContent = day.kind === 'polar-night' ? 'The Sun stays below the horizon today.' : day.kind === 'polar-day' ? '24-hour daylight at this place.' : observationRule === 'noon' ? 'Same solar-noon rule when you change seasons' : 'Slide through this day, or choose Solar noon';
    els.playBtn.textContent = state.playing ? 'Ⅱ Pause day' : state.minutes >= day.end - .1 ? '↻ Replay day' : pausedDay === dayKey ? '▶ Resume day' : '▶ Play day';
    els.playBtn.disabled = day.kind === 'polar-night' || document.body.classList.contains('presenting');
    for (const button of els.seasonBtns) button.setAttribute('aria-pressed', String(state.localDateISO === seasonISO(seasons[button.dataset.season], getSelectedYear())));
    publishToolbar();
  }

  function updateDemonstration(sun, direction) {
    const result = sunDemonstration.update(monumentDesign, direction, rayChoice, sunMode && cameraMode !== 'sky');
    document.getElementById('rayCaption').textContent = result.caption;
    document.getElementById('rayMeasure').textContent = result.reference === null ? '' : result.referenceVisible ? `Gold arc = Sun height. Dashed ruler = ${result.reference.toFixed(2)} m for the selected top height (not the full footprint).` : 'Low Sun: the height-only shadow ruler extends beyond this view.';
    const compass = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'][Math.round(sun.compassDeg / 45) % 8];
    document.getElementById('sunBadge').textContent = !sunMode ? 'Build lighting · press Show Sun to test' : sun.altitudeDeg <= 0 ? '☀ Sun at / below the horizon' : `☀ Sun in the ${compass} · ${sun.altitudeDeg.toFixed(1)}° high`;
    if (!document.getElementById('earthGuide').hidden) {
      earthExplanation ||= window.createEarthExplanation(THREE, document.getElementById('earthCanvas'));
      earthExplanation.update(getSelectedJSDate(), state.lat, state.lon);
      document.getElementById('earthReading').textContent = `At your site now: Sun ${sun.altitudeDeg.toFixed(1)}° above the horizon. ${currentDay().kind === 'polar-night' ? 'No daylight today.' : currentDay().kind === 'polar-day' ? 'Daylight lasts all day.' : `Daylight lasts ${((currentDay().end - currentDay().start) / 60).toFixed(1)} hours.`} Change the time to turn Earth; change the date to follow its orbit.`;
      updateSeasonGraph();
    }
  }

  function updateSeasonGraph() {
    const height = Math.max(.1, state.objectHeight), key = [dayKey, height].join('|');
    if (key === graphKey) return; graphKey = key;
    const results = Object.values(seasons).map(season => {
      const settings = { ...observationSettings(), localDate: seasonISO(season, getSelectedYear()) };
      const observation = window.SolarDay.observe(settings);
      const angle = getSunPosition(observation.date, state.lat, state.lon).altitudeDeg;
      return { label: season.name.split(' ')[0], value: angle > 0 ? height / Math.tan(degToRad(angle)) : null };
    });
    const max = Math.max(.1, ...results.map(r => r.value || 0));
    const svg = document.getElementById('seasonGraph'), ns = 'http://www.w3.org/2000/svg';
    svg.replaceChildren();
    results.forEach((r, i) => {
      const rect = document.createElementNS(ns, 'rect'), label = document.createElementNS(ns, 'text'), value = document.createElementNS(ns, 'text');
      const h = r.value === null ? 0 : r.value / max * 76, x = 20 + i * 78;
      for (const [name, val] of Object.entries({ x, y: 98 - h, width: 42, height: h, rx: 3, fill: ['#72877b', '#b88a36', '#b2794c', '#708b9e'][i] })) rect.setAttribute(name, String(val));
      label.setAttribute('x', String(x + 21)); label.setAttribute('y', '117'); label.setAttribute('text-anchor', 'middle'); label.textContent = r.label;
      value.setAttribute('x', String(x + 21)); value.setAttribute('y', String(90 - h)); value.setAttribute('text-anchor', 'middle'); value.textContent = r.value === null ? 'No Sun' : `${r.value.toFixed(2)}m`;
      svg.append(rect, label, value);
    });
    document.getElementById('graphCaption').textContent = `Solar-noon reference shadows for a ${height.toFixed(2)} m upright height at this location. Shorter shadow means a higher Sun. These bars are not the full monument footprint.`;
  }

  function markerMessage(payload) {
    window.parent.postMessage({ channel: 'forge.design-simulation.v1', ...payload }, window.location.origin);
  }
  function canPlaceMarker() { return hostedChrome && hostActive && !dialReadOnly && !isSundial() && !document.body.classList.contains('presenting'); }
  function cancelMarkerPlacement(notify = false) {
    const requestId = markerRequest; markerRequest = ''; markerPicking = false;
    if (markerGhost) markerGhost.visible = false;
    els.shadowCanvas.classList.remove('placing-marker');
    const hint = document.getElementById('markerHint'); if (hint) hint.hidden = true;
    if (notify && requestId) markerMessage({ type: 'marker-cancelled', requestId });
    sceneDirty = true;
  }
  function previewMarkerPoint(point) {
    markerPoint = { x: clamp(point.x, -12, 12), z: clamp(point.z, -12, 12) };
    if (!markerGhost) {
      markerGhost = new THREE.Mesh(new THREE.RingGeometry(.075, .095, 48), new THREE.MeshBasicMaterial({ color: 0xfff0ac, side: THREE.DoubleSide, transparent: true, opacity: .9, depthTest: false }));
      markerGhost.name = 'calendar-marker-cursor'; markerGhost.rotation.x = -Math.PI / 2; markerGhost.renderOrder = 20; shadow.scene.add(markerGhost);
    }
    markerGhost.visible = true; markerGhost.position.set(markerPoint.x, .016, markerPoint.z); sceneDirty = true;
  }
  function pickMarker(point) {
    if (!markerRequest || !canPlaceMarker()) return;
    try {
      const target = window.CalendarMarkers.make(monumentDesign, point, { ...observationSettings(), utcInstant: getSelectedJSDate().toISOString() }, getSunPosition(getSelectedJSDate(), state.lat, state.lon), 'sunstone-' + markerRequest);
      previewMarkerPoint(point); markerPicking = false; document.getElementById('markerHint').hidden = true; els.shadowCanvas.classList.remove('placing-marker');
      markerMessage({ type: 'marker-picked', requestId: markerRequest, target });
    } catch (error) { markerMessage({ type: 'marker-error', requestId: markerRequest, message: error.message }); }
  }
  function startMarkerPlacement(data) {
    if (!canPlaceMarker() || typeof data.requestId !== 'string' || data.requestId.length > 80 || !data.requestId.length) return;
    cancelMarkerPlacement(); stopDay(); markerRequest = data.requestId; markerPicking = true;
    setSunMode(true, true); switchView('horizon');
    if (cameraMode === 'sky' || cameraMode === 'sculpture') setCameraMode('angle');
    previewMarkerPoint(markerPoint);
    els.shadowCanvas.classList.add('placing-marker');
    document.getElementById('markerHint').hidden = false;
    updateAll();
    if (data.point) pickMarker(data.point);
    else els.shadowCanvas.focus({ preventScroll: true });
  }
  function markerRay(event) {
    const rect = els.shadowCanvas.getBoundingClientRect(), ray = new THREE.Raycaster();
    shadow.camera.updateMatrixWorld(true); shadow.objectGroup.updateMatrixWorld(true);
    ray.setFromCamera(new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1), shadow.camera);
    const point = ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), new THREE.Vector3());
    if (!point) return null;
    const solid = ray.intersectObjects(shadow.objectGroup.children, true)[0];
    if (solid && solid.distance < ray.ray.origin.distanceTo(point) - .01) return null;
    return point;
  }
  function updateMarkerReading() {
    const target = monumentDesign.targets.find(t => t.id === selectedMarker);
    if (!target) return;
    const light = window.SolarOptics.trace(monumentDesign, target, dialSun()).value;
    const key = selectedMarker + ':' + light;
    if (key !== markerReadingKey) { markerReadingKey = key; markerMessage({ type: 'marker-reading', targetId: selectedMarker, light }); }
  }
  function focusMarker(id) {
    if (!monumentDesign.targets.some(t => t.id === id)) return;
    selectedMarker = id; markerReadingKey = ''; rayChoice = 'target:' + id;
    document.getElementById('rayTarget').value = rayChoice;
    targetMarkers?.children.forEach(child => { if (child.name.startsWith('calendar-stone:')) child.scale.setScalar(child.name === 'calendar-stone:' + id ? 1.2 : 1); });
    updateAll();
  }
  function revisitMarker(id) {
    if (isSundial() || document.body.classList.contains('presenting')) return;
    const record = window.CalendarMarkers.record(monumentDesign.targets.find(t => t.id === id));
    if (!record) return;
    cancelMarkerPlacement(true); stopDay();
    state.lat = record.latitude; state.lon = record.longitude; state.selectedZone = record.zone;
    state.localDateISO = record.localDate; state.minutes = record.minutes; observationRule = 'clock';
    syncLocationInputs(); els.dateInput.value = state.localDateISO; els.timeSlider.value = state.minutes;
    setSunMode(true, true); focusMarker(id);
  }

  function bindDemonstration() {
    setSunMode(false);
    document.getElementById('buildMode').addEventListener('click', () => { setSunMode(false, true); updateAll(); });
    document.getElementById('showSun').addEventListener('click', () => { setSunMode(true, true); switchView('horizon'); if (cameraMode === 'sky') cameraMode = 'angle'; fitCamera(); setCameraMode(cameraMode); });
    document.getElementById('dayStart').addEventListener('click', () => { stopDay(); observationRule = 'clock'; state.minutes = currentDay().start; setSunMode(true); updateAll(); });
    document.getElementById('dayEnd').addEventListener('click', () => { stopDay(); observationRule = 'clock'; state.minutes = currentDay().end; setSunMode(true); updateAll(); });
    document.getElementById('daySlider').addEventListener('input', event => { stopDay(); observationRule = 'clock'; state.minutes = Number(event.target.value); els.timeSlider.value = state.minutes; setSunMode(true); updateAll(); });
    document.getElementById('earthToggle').addEventListener('click', event => {
      const panel = document.getElementById('earthGuide'); panel.hidden = !panel.hidden;
      event.currentTarget.setAttribute('aria-expanded', String(!panel.hidden)); updateAll();
      if (!panel.hidden) panel.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    });
    document.getElementById('rayTarget').addEventListener('change', event => { rayChoice = event.target.value; updateAll(); });
    document.getElementById('fitView').addEventListener('click', () => { fitCamera(); updateAll(); });
    document.getElementById('shadowView').addEventListener('click', () => {
      const sun = getSunPosition(getSelectedJSDate(), state.lat, state.lon);
      document.getElementById('cameraBearing').value = String((sun.compassDeg + 215) % 360);
      document.getElementById('cameraElevation').value = '55'; cameraMode = 'angle'; fitCamera(); setCameraMode('angle');
    });
    const zoom = factor => { const input = document.getElementById('cameraZoom'); input.value = String(clamp(Number(input.value) * factor, .3, 4)); updateMonumentCamera(); };
    document.getElementById('zoomIn').addEventListener('click', () => zoom(1.2));
    document.getElementById('zoomOut').addEventListener('click', () => zoom(1 / 1.2));
    const hint = document.createElement('div'); hint.id = 'markerHint'; hint.hidden = true;
    hint.innerHTML = '<span>Choose a light patch or shadow · arrow keys aim · Enter picks</span><button type="button">Cancel</button>';
    hint.querySelector('button').addEventListener('click', () => cancelMarkerPlacement(true));
    els.shadowCanvas.parentElement.append(hint);
    els.shadowCanvas.tabIndex = 0;
    els.shadowCanvas.addEventListener('wheel', event => { event.preventDefault(); zoom(event.deltaY < 0 ? 1.12 : 1 / 1.12); }, { passive: false });
    els.shadowCanvas.addEventListener('keydown', event => {
      if (markerRequest && markerPicking && ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter','Escape'].includes(event.key)) {
        event.preventDefault();
        if (event.key === 'Escape') cancelMarkerPlacement(true);
        else if (event.key === 'Enter') pickMarker(markerPoint);
        else { const step = event.shiftKey ? .01 : .05; previewMarkerPoint({ x: markerPoint.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0), z: markerPoint.z + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0) }); }
        return;
      }
      if (['+', '=', '-'].includes(event.key)) { event.preventDefault(); zoom(event.key === '-' ? 1 / 1.2 : 1.2); }
      if (event.key.startsWith('Arrow')) {
        event.preventDefault(); const bearing = document.getElementById('cameraBearing'), elevation = document.getElementById('cameraElevation');
        bearing.value = String((Number(bearing.value) + (event.key === 'ArrowRight' ? 5 : event.key === 'ArrowLeft' ? -5 : 0) + 360) % 360);
        elevation.value = String(clamp(Number(elevation.value) + (event.key === 'ArrowUp' ? 5 : event.key === 'ArrowDown' ? -5 : 0), 5, 80)); updateMonumentCamera();
      }
    });
    let drag;
    els.shadowCanvas.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      drag = { x: event.clientX, y: event.clientY, moved: false }; els.shadowCanvas.setPointerCapture(event.pointerId);
    });
    els.shadowCanvas.addEventListener('pointermove', event => {
      if (markerRequest && markerPicking && !drag) { const point = markerRay(event); if (point && Math.abs(point.x) <= 12 && Math.abs(point.z) <= 12) previewMarkerPoint(point); }
      if (!drag) return; const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 2) drag.moved = true;
      const bearing = document.getElementById('cameraBearing'), elevation = document.getElementById('cameraElevation');
      bearing.value = String((Number(bearing.value) - dx * .45 + 360) % 360);
      elevation.value = String(clamp(Number(elevation.value) + dy * .35, 5, 80)); drag.x = event.clientX; drag.y = event.clientY; updateMonumentCamera();
    });
    els.shadowCanvas.addEventListener('pointerup', event => {
      if (markerRequest && markerPicking && drag && !drag.moved) {
        const point = markerRay(event);
        if (point) pickMarker(point);
        else markerMessage({ type: 'marker-error', requestId: markerRequest, message: 'Choose visible floor, beside the stone. View from above can help.' });
        drag = null; return;
      }
      if (drag && !drag.moved && sunMode) {
        const ground = !isSundial() && markerRay(event);
        const target = ground && monumentDesign.targets.find(t => Math.hypot(t.x - ground.x, t.z - ground.z) < .16);
        if (target) { focusMarker(target.id); markerMessage({ type: 'marker-selected', targetId: target.id }); drag = null; return; }
        const rect = els.shadowCanvas.getBoundingClientRect(), ray = new THREE.Raycaster();
        ray.setFromCamera(new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1), shadow.camera);
        const hit = ray.intersectObjects(shadow.objectGroup.children, false)[0];
        if (hit?.object.name.startsWith('design-block:')) { rayChoice = 'block:' + hit.object.name.slice(13); document.getElementById('rayTarget').value = rayChoice; updateAll(); }
      }
      drag = null;
    });
    els.shadowCanvas.addEventListener('pointercancel', () => { drag = null; });
    const size = () => { const height = Math.ceil(document.querySelector('.app-shell').getBoundingClientRect().height); window.parent.postMessage({ channel: 'forge.design-simulation.v1', type: 'size', height }, window.location.origin); };
    if (window.ResizeObserver) new ResizeObserver(size).observe(document.querySelector('.app-shell'));
    document.getElementById('moreViews').addEventListener('toggle', () => { resizeShadowRenderer(); size(); });
    size();
  }

  function fitCamera() { playbackFrame = null; cameraIncludesShadow = true; frameKey = ''; document.getElementById('cameraZoom').value = '1'; }

  function samplePath(kind, isoDate, zone, lat, lon, stepMinutes) {
    const points = [];
    for (let minutes = 0; minutes <= 1440; minutes += stepMinutes) {
      const dt = getJSDateForISODateAndMinutes(isoDate, minutes, zone);
      const pos = kind === 'moon' ? getMoonPosition(dt, lat, lon) : getSunPosition(dt, lat, lon);
      points.push({
        time: dt,
        minutes,
        altitudeDeg: pos.altitudeDeg,
        compassDeg: pos.compassDeg,
        visible: pos.altitudeDeg >= 0
      });
    }
    return points;
  }

  function getMoonTimesForLocalDate(isoDate, zone, lat, lon) {
    const stepMinutes = 10;
    let previousMinute = 0;
    let previousAltitude = getMoonHorizonOffset(isoDate, zone, lat, lon, previousMinute);
    let rise = null;
    let set = null;

    for (let minutes = stepMinutes; minutes <= 1440; minutes += stepMinutes) {
      const altitude = getMoonHorizonOffset(isoDate, zone, lat, lon, minutes);

      if (!rise && previousAltitude < 0 && altitude >= 0) {
        rise = refineMoonCrossing(isoDate, zone, lat, lon, previousMinute, minutes, true);
      }

      if (!set && previousAltitude >= 0 && altitude < 0) {
        set = refineMoonCrossing(isoDate, zone, lat, lon, previousMinute, minutes, false);
      }

      previousMinute = minutes;
      previousAltitude = altitude;
    }

    const noonAltitude = getMoonHorizonOffset(isoDate, zone, lat, lon, 720);

    return {
      rise,
      set,
      alwaysUp: !rise && !set && noonAltitude > 0,
      alwaysDown: !rise && !set && noonAltitude <= 0
    };
  }

  function refineMoonCrossing(isoDate, zone, lat, lon, startMinute, endMinute, rising) {
    let low = startMinute;
    let high = endMinute;

    for (let i = 0; i < 12; i += 1) {
      const middle = (low + high) / 2;
      const altitude = getMoonHorizonOffset(isoDate, zone, lat, lon, middle);

      if (rising ? altitude >= 0 : altitude < 0) {
        high = middle;
      } else {
        low = middle;
      }
    }

    return getJSDateForISODateAndMinutes(isoDate, (low + high) / 2, zone);
  }

  function getMoonHorizonOffset(isoDate, zone, lat, lon, minutes) {
    const date = getJSDateForISODateAndMinutes(isoDate, minutes, zone);
    return getMoonPosition(date, lat, lon).altitudeDeg - 0.133;
  }

  function splitWrappedPath(path) {
    const segments = [[]];
    for (let i = 0; i < path.length; i += 1) {
      const point = path[i];
      const previous = path[i - 1];
      if (previous && Math.abs(point.compassDeg - previous.compassDeg) > 180) {
        segments.push([]);
      }
      segments[segments.length - 1].push(point);
    }
    return segments;
  }

  function getSunPosition(dateTime, lat, lon) {
    const pos = SunCalc.getPosition(dateTime, lat, lon);
    return {
      altitudeDeg: radToDeg(pos.altitude),
      compassDeg: suncalcAzimuthToCompass(pos.azimuth)
    };
  }

  function getMoonPosition(dateTime, lat, lon) {
    const pos = SunCalc.getMoonPosition(dateTime, lat, lon);
    return {
      altitudeDeg: radToDeg(pos.altitude),
      compassDeg: suncalcAzimuthToCompass(pos.azimuth),
      distance: pos.distance
    };
  }

  function skyToCanvas(compassDeg, altitudeDeg, w, horizonY, skyTop, skyHeight) {
    const x = (compassDeg / 360) * w;
    const clampedAltitude = clamp(altitudeDeg, -18, 90);
    let y;

    if (clampedAltitude >= 0) {
      y = horizonY - (clampedAltitude / 90) * skyHeight;
    } else {
      y = horizonY + Math.abs(clampedAltitude / 18) * (skyHeight * 0.18);
    }

    return { x, y };
  }

  function resizeCanvases() {
    resizeCanvasToDisplaySize(els.horizonCanvas);
    resizeCanvasToDisplaySize(els.shadowCanvas);
  }

  function resizeCanvasToDisplaySize(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function resizeShadowRenderer() {
    if (!shadow.renderer || !shadow.camera) return;
    const rect = els.shadowCanvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    shadow.renderer.setSize(width, height, false);
    shadow.camera.aspect = width / height;
    updateMonumentCamera();
  }

  function resizeGlobe() {
    if (!globe) return;
    const rect = els.globeContainer.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      globe.width(rect.width).height(rect.height);
    }
  }

  function getZoneForLocation(lat, lon) {
    try {
      return tzLookup(lat, lon);
    } catch (error) {
      const browserZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return browserZone || 'UTC';
    }
  }

  function getSelectedLocalDateTime(minutes = state.minutes) {
    return getLocalDateTimeForISODateAndMinutes(state.localDateISO, minutes, state.selectedZone);
  }

  function getSelectedJSDate(minutes = state.minutes) {
    return getSelectedLocalDateTime(minutes).toJSDate();
  }

  function getLocalDateTimeAtMinutes(date, minutes, zone) {
    const whole = Math.floor(minutes), offset = Math.floor(whole / 1440), within = whole - offset * 1440;
    return DateTime.fromObject({ year: date.year, month: date.month, day: date.day }, { zone })
      .plus({ days: offset }).set({ hour: Math.floor(within / 60), minute: within % 60 })
      .plus({ milliseconds: (minutes - whole) * 60000 });
  }

  function getJSDateAtMinutes(date, minutes) {
    return getLocalDateTimeAtMinutes(date, minutes, state.selectedZone).toJSDate();
  }

  function getJSDateForISODateAndMinutes(isoDate, minutes, zone) {
    return getLocalDateTimeForISODateAndMinutes(isoDate, minutes, zone).toJSDate();
  }

  function getLocalDateTimeForISODateAndMinutes(isoDate, minutes, zone) {
    return getLocalDateTimeAtMinutes(parseISODateParts(isoDate), minutes, zone);
  }

  function parseISODateParts(isoDate) {
    const [year, month, day] = isoDate.split('-').map(Number);
    return { year, month, day };
  }

  function getSelectedYear() {
    return parseISODateParts(state.localDateISO).year;
  }

  function seasonISO(season, year) {
    const instant = window.SOLAR_SEASONS?.[year]?.[season.month];
    if (instant) return DateTime.fromISO(instant, { zone: 'utc' }).setZone(state.selectedZone).toISODate();
    const month = String(season.month + 1).padStart(2, '0');
    const day = String(season.day).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function normalizeDateInput(value, fallback) {
    if (!value) return fallback;
    const parts = value.split('-').map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN) || parts[0] < 2025 || parts[0] > 2030) return fallback;

    const candidate = DateTime.fromObject({
      year: parts[0],
      month: parts[1],
      day: parts[2]
    }, { zone: state.selectedZone });

    return candidate.isValid ? candidate.toISODate() : fallback;
  }

  function formatTime(date) {
    if (!validDate(date)) return '--';
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: state.selectedZone
    });
  }

  function formatDateShortISO(isoDate) {
    const localDate = DateTime.fromISO(isoDate, { zone: state.selectedZone });
    return localDate.toLocaleString({ month: 'short', day: 'numeric', year: 'numeric' });
  }

  function msToHoursMinutes(ms) {
    const total = Math.round(ms / 60000);
    const h = Math.floor(total / 60);
    const m = total % 60;
    return `${h}h ${m}m`;
  }

  function formatShadowLength(length) {
    if (!Number.isFinite(length)) return 'No direct sunlight';
    if (length > 100) return '> 100 m';
    return `${length.toFixed(2)} m`;
  }

  function phaseName(phase) {
    if (phase < 0.03 || phase > 0.97) return 'New Moon';
    if (phase < 0.22) return 'Waxing Crescent';
    if (phase < 0.28) return 'First Quarter';
    if (phase < 0.47) return 'Waxing Gibbous';
    if (phase < 0.53) return 'Full Moon';
    if (phase < 0.72) return 'Waning Gibbous';
    if (phase < 0.78) return 'Last Quarter';
    return 'Waning Crescent';
  }

  function suncalcAzimuthToCompass(azimuthRad) {
    return (radToDeg(azimuthRad) + 180 + 360) % 360;
  }

  function radToDeg(rad) {
    return rad * 180 / Math.PI;
  }

  function degToRad(deg) {
    return deg * Math.PI / 180;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function normalizeLon(lon) {
    return ((((lon + 180) % 360) + 360) % 360) - 180;
  }

  function validDate(date) {
    return date instanceof Date && !Number.isNaN(date.getTime());
  }

  function disposeGroup(group) {
    if (!group) return;
    shadow.scene.remove(group);
    group.traverse((object) => {
      object.geometry?.dispose();
      if (object.material) { object.material.map?.dispose(); object.material.dispose(); }
    });
  }

  function rebuildMonument() {
    if (!shadow.scene) return;
    frameKey = '';
    solarOptics.setDesign(monumentDesign);
    disposeGroup(shadow.objectGroup);
    shadow.objectGroup = new THREE.Group();
    for (const block of monumentDesign.blocks) {
      const mesh = new THREE.Mesh(solarOptics.blockGeometry(block), solarOptics.stoneMaterial(block));
      mesh.name = `design-block:${block.id}`;
      mesh.position.set(block.x, block.y + block.height / 2, block.z);
      mesh.rotation.y = degToRad(block.rotation);
      mesh.castShadow = true;
      mesh.receiveShadow = false;
      const insert = solarOptics.insertMesh(block);
      if (insert) mesh.add(insert);
      shadow.objectGroup.add(mesh);
    }
    if (monumentDesign.displayObject) shadow.objectGroup.add(solarOptics.objectMesh(monumentDesign.displayObject));
    document.getElementById('sculptureView').disabled = !monumentDesign.displayObject;
    shadow.scene.add(shadow.objectGroup);
    state.objectHeight = Math.max(monumentDesign.displayObject ? monumentDesign.displayObject.y + monumentDesign.displayObject.height : 0, ...monumentDesign.blocks.map((b) => b.y + b.height));
    const camera = shadow.sunLight.shadow.camera;
    camera.left = camera.bottom = -24;
    camera.right = camera.top = 24;
    camera.updateProjectionMatrix();
    disposeGroup(targetMarkers);
    targetMarkers = new THREE.Group();
    for (const [index, target] of monumentDesign.targets.entries()) {
      if (!isSundial()) {
        targetMarkers.add(window.CalendarMarkers.stone(THREE, target, index));
        const label = makeTextSprite(String(index + 1), true); label.position.set(target.x, .17, target.z); label.scale.set(.26, .13, 1); targetMarkers.add(label);
        continue;
      }
      const color = { march: 0x75c79a, june: 0xf7cc61, sept: 0xf79664, dec: 0x83bced }[target.settings?.markerKind] ?? 0xffd469;
      const ring = new THREE.Mesh(new THREE.RingGeometry(.025, .04, 32), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(target.x, .005, target.z);
      targetMarkers.add(ring);
      const label = makeTextSprite(target.settings?.markerKind ? String(index + 1) : target.label, !!target.settings?.markerKind);
      const neighbours = monumentDesign.targets.slice(0, index).filter(t => Math.hypot(t.x - target.x, t.z - target.z) < .2).length;
      label.position.set(target.x, .13 + neighbours * .18, target.z);
      label.scale.set(.65, .325, 1);
      if (target.settings?.markerKind) label.scale.set(.42, .21, 1);
      targetMarkers.add(label);
    }
    shadow.scene.add(targetMarkers);
    const list = document.getElementById('dialMarks'), legend = document.getElementById('dialLegend'); list.replaceChildren(); legend.replaceChildren();
    monumentDesign.targets.forEach((target, index) => {
      const chip = document.createElement('span'); chip.textContent = `${index + 1} · ${target.label}`; legend.append(chip);
      const item = document.createElement('li'); item.textContent = `${index + 1} · ${target.label} · ${target.settings?.localDate ?? ''} · x ${target.x.toFixed(2)}, z ${target.z.toFixed(2)} m`;
      list.append(item);
    });
    document.getElementById('dialMarkSummary').textContent = `My fixed marks · ${monumentDesign.targets.length}`;
    const post = window.SundialLab.post(monumentDesign);
    if (post) document.getElementById('postHeight').value = String(Math.round(post.height * 100));
    const choices = document.getElementById('rayTarget');
    choices.replaceChildren();
    for (const [value, label] of [['auto', 'Through the model'], ...monumentDesign.blocks.map((b, i) => ['block:' + b.id, `Stone ${i + 1}${b.aperture ? ' · opening' : ''}`]), ...monumentDesign.targets.map(t => ['target:' + t.id, t.label])]) {
      const option = document.createElement('option'); option.value = value; option.textContent = label; choices.append(option);
    }
    if (![...choices.options].some(option => option.value === rayChoice)) rayChoice = 'auto';
    choices.value = rayChoice;
    if (!monumentDesign.displayObject && cameraMode === 'sculpture') setCameraMode('angle');
  }

  function renderMonumentShadows(sun) {
    const direction = window.SolarGeometry.sunDirection(sun.altitudeDeg, sun.compassDeg);
    solarOptics.setSun(direction);
    const readings = document.getElementById('opticsReadout');
    if (readings) readings.textContent = [
      ...monumentDesign.targets.map(t => `${t.label}: ${window.SolarOptics.trace(monumentDesign, t, direction).value}`),
      ...(monumentDesign.displayObject ? [window.SolarOptics.objectReadings(monumentDesign, direction)] : []),
    ].join(' · ');
  }

  function updateMonumentCamera() {
    if (!shadow.camera) return;
    sceneDirty = true;
    const bearing = Number(document.getElementById('cameraBearing').value);
    const elevation = Number(document.getElementById('cameraElevation').value);
    const zoom = Number(document.getElementById('cameraZoom').value);
    const o = monumentDesign.displayObject;
    targetMarkers?.children.forEach(marker => { if (marker.isSprite) marker.visible = cameraMode !== 'sculpture'; });
    const sun = getSunPosition(getSelectedJSDate(), state.lat, state.lon);
    const direction = window.SolarGeometry.sunDirection(sun.altitudeDeg, sun.compassDeg);
    shadow.camera.up.set(0, 1, 0);
    if (cameraMode === 'sky') {
      const view = window.SolarGeometry.sunDirection(elevation, bearing);
      const distance = skyRadius() * 3.1 / Math.min(1, shadow.camera.aspect) / zoom;
      const frame = window.MonumentCamera.bounds(monumentDesign, direction, false);
      shadow.camera.position.set(frame.centre.x + view.x * distance, frame.centre.y + view.y * distance, frame.centre.z + view.z * distance);
      shadow.camera.lookAt(frame.centre.x, frame.centre.y, frame.centre.z);
    } else {
      const design = cameraMode === 'sculpture' && o ? { blocks: [], targets: [], displayObject: o } : monumentDesign;
      const key = [cameraMode, state.localDateISO, state.minutes, sunMode, cameraIncludesShadow].join('|');
      if (key !== frameKey) {
        frameKey = key;
        cameraFrame = (reviewingCamera && cameraIncludesShadow && reviewFrame && cameraMode !== 'sculpture' ? reviewFrame : pausedDay === dayKey && playbackFrame ? playbackFrame : null) || window.MonumentCamera.bounds(design, direction, cameraMode !== 'sculpture' && cameraIncludesShadow && sunMode);
      }
      const fitted = window.MonumentCamera.fit(THREE, cameraFrame, cameraMode === 'top' ? 0 : bearing, cameraMode === 'top' ? 89.999 : elevation, shadow.camera.aspect, zoom);
      shadow.camera.position.copy(fitted.position);
      if (cameraMode === 'top') shadow.camera.up.set(0, 0, -1);
      shadow.camera.lookAt(fitted.centre);
      document.getElementById('frameNotice').textContent = (cameraFrame.clipped || (state.playing && sun.altitudeDeg > 0 && sun.altitudeDeg < 12)) && sunMode ? 'Low Sun: shadows may continue beyond this view. Use Fit or zoom out.' : reviewingCamera && !cameraIncludesShadow && cameraMode !== 'sculpture' ? 'Fit all includes the longer shadows.' : '';
    }
    document.getElementById('cameraBearingLabel').textContent = `${bearing.toFixed(0)}°`;
    document.getElementById('cameraElevationLabel').textContent = `${elevation.toFixed(0)}°`;
    shadow.camera.updateProjectionMatrix();
  }
  function skyRadius() {
    return Math.max(3, ...monumentDesign.blocks.map(b => 1.35 * Math.hypot(Math.abs(b.x) + b.width / 2 + b.depth / 2, b.y + b.height, Math.abs(b.z) + b.width / 2 + b.depth / 2)), ...monumentDesign.targets.map(t => Math.hypot(t.x, t.z) * 1.2));
  }

  function updateSolarSky(sun) {
    if (!solarSky) return;
    solarSky.setVisible(cameraMode === 'sky');
    if (cameraMode !== 'sky') return;
    const key = [state.lat, state.lon, state.localDateISO, state.selectedZone, state.showMoon, state.compareSeasons, state.showLabels, skyRadius()].join('|');
    if (key !== skyPathKey) {
      skyPathKey = key;
      skyTracks = [{ label: 'Selected day · Sun', color: '#ffe28a', points: samplePath('sun', state.localDateISO, state.selectedZone, state.lat, state.lon, 10) }];
      if (state.showMoon) skyTracks.push({ label: 'Selected day · Moon', color: '#dbe9ff', points: samplePath('moon', state.localDateISO, state.selectedZone, state.lat, state.lon, 10) });
      if (state.compareSeasons) for (const season of Object.values(seasons)) {
        skyTracks.push({ label: season.name, color: season.color, points: samplePath('sun', seasonISO(season, getSelectedYear()), state.selectedZone, state.lat, state.lon, 10) });
      }
      const legend = document.getElementById('skyLegend');
      legend.replaceChildren(...skyTracks.map(track => {
        const item = document.createElement('span');
        const dot = document.createElement('i');
        dot.style.background = track.color;
        item.append(dot, document.createTextNode(track.label));
        return item;
      }));
    }
    solarSky.update({ radius: skyRadius(), key, tracks: skyTracks, sunPosition: sun, moonPosition: getMoonPosition(getSelectedJSDate(), state.lat, state.lon), showMoon: state.showMoon, showLabels: state.showLabels });
  }

  function setCameraMode(mode) {
    cameraMode = mode;
    shadow.compass.visible = mode !== 'sky';
    els.horizonView.classList.toggle('sky-mode', mode === 'sky');
    for (const [id, value] of [['skyView', 'sky'], ['angleView', 'angle'], ['topView', 'top'], ['sculptureView', 'sculpture']]) {
      document.getElementById(id).setAttribute('aria-pressed', String(mode === value));
    }
    document.getElementById('orbitControls').hidden = mode === 'top';
    document.getElementById('zoomControl').hidden = false;
    document.getElementById('skyLegend').hidden = mode !== 'sky';
    document.getElementById('skyDescription').hidden = mode !== 'sky';
    updateSceneLabel();
    resizeCanvases(); resizeShadowRenderer(); updateAll();
  }

  function updateSceneLabel() {
    document.getElementById('sceneLabel').textContent = cameraMode === 'sky'
      ? 'Your local sky · north stays fixed'
      : document.getElementById('gridToggle').getAttribute('aria-pressed') === 'true'
        ? 'Measurement grid · 1 square = 1 metre' : 'Carved stone court · true north';
  }

  function validMonument(design) {
    return window.SolarOptics.validDesign(design);
  }

  function captureMonument(id) {
    const date = getSelectedJSDate();
    const sun = getSunPosition(date, state.lat, state.lon);
    const moon = getMoonPosition(date, state.lat, state.lon);
    const illumination = SunCalc.getMoonIllumination(date);
    const direction = window.SolarGeometry.sunDirection(sun.altitudeDeg, sun.compassDeg);
    return {
      id, pluginId: 'simulation.solar-monument', capturedAt: new Date().toISOString(), design: structuredClone(monumentDesign),
      settings: { latitude: state.lat, longitude: state.lon, localDate: state.localDateISO, minutes: state.minutes, zone: state.selectedZone, utcInstant: date.toISOString(), modelVersion: 'solar-optics-2.0', observationRule },
      measurements: [
        { label: 'Local observation', value: `${getSelectedLocalDateTime().toISODate()} ${formatTime(date)} (${state.selectedZone})` },
        { label: 'Location', value: `${state.lat.toFixed(4)}, ${state.lon.toFixed(4)}` },
        { label: 'Sun altitude', value: `${sun.altitudeDeg.toFixed(2)}°` },
        { label: 'Sun direction', value: `${sun.compassDeg.toFixed(2)}° clockwise from north` },
        { label: 'Shadow bearing', value: sun.altitudeDeg > 0 ? `${((sun.compassDeg + 180) % 360).toFixed(2)}°` : 'No direct sunlight' },
        { label: 'Height-only shadow reference', value: sun.altitudeDeg > 0 ? `${(state.objectHeight / Math.tan(degToRad(sun.altitudeDeg))).toFixed(3)} m` : 'No direct sunlight' },
        { label: 'Moon', value: `${phaseName(illumination.phase)} · ${Math.round(illumination.fraction * 100)}% illuminated · altitude ${moon.altitudeDeg.toFixed(1)}° · direction ${moon.compassDeg.toFixed(1)}°` },
        { label: 'Sculpture surface samples', value: window.SolarOptics.objectReadings(monumentDesign, direction) },
        ...monumentDesign.targets.map((target, i) => ({ label: `Target ${i + 1}: ${target.label}`, value: isSundial()
          ? (() => { const tip = window.SundialLab.tip(monumentDesign, direction); return tip ? `${(Math.hypot(target.x - tip.x, target.z - tip.z) * 100).toFixed(1)} cm from the shadow tip` : 'No direct Sun'; })()
          : window.SolarOptics.trace(monumentDesign, target, direction).value })),
      ],
    };
  }

  function bindMonumentBridge() {
    bindSundial();
    const send = (payload) => window.parent.postMessage({ channel: 'forge.design-simulation.v1', ...payload }, window.location.origin);
    const toggleControls = (open, returnFocus = false) => {
      document.getElementById('labControls').hidden = !open;
      document.getElementById('controlsToggle').setAttribute('aria-expanded', String(open));
      if (!open && returnFocus) document.getElementById('controlsToggle').focus();
    };
    document.getElementById('controlsToggle').addEventListener('click', () => toggleControls(document.getElementById('labControls').hidden));
    document.getElementById('closeControls').addEventListener('click', () => toggleControls(false, true));
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !document.getElementById('labControls').hidden) toggleControls(false, true); });
    document.getElementById('chartToggle').addEventListener('click', event => {
      const open = els.horizonView.classList.toggle('show-chart');
      event.currentTarget.setAttribute('aria-pressed', String(open));
      switchView('horizon');
    });
    document.getElementById('topView').addEventListener('click', () => setCameraMode('top'));
    document.getElementById('angleView').addEventListener('click', () => setCameraMode('angle'));
    document.getElementById('sculptureView').addEventListener('click', () => setCameraMode('sculpture'));
    document.getElementById('skyView').addEventListener('click', () => setCameraMode('sky'));
    document.getElementById('cameraBearing').addEventListener('input', updateMonumentCamera);
    document.getElementById('cameraElevation').addEventListener('input', updateMonumentCamera);
    document.getElementById('cameraZoom').addEventListener('input', updateMonumentCamera);
    setCameraMode(cameraMode);
    window.addEventListener('message', (event) => {
      if (event.origin !== window.location.origin || event.source !== window.parent || event.data?.channel !== 'forge.design-simulation.v1') return;
      const data = event.data;
      // A fresh iframe renegotiates its host-owned controls; the parent retains saved designs.
      if (data.type === 'hosted-chrome' && data.active === true) {
        hostedChrome = true; document.body.classList.add('hosted-chrome');
        els.shadowCanvas.parentElement.append(document.getElementById('dialLegend'));
        document.getElementById('earthGuide').hidden = true; document.getElementById('earthToggle').setAttribute('aria-expanded', 'false');
        resizeCanvases(); resizeShadowRenderer(); updateAll(); return;
      }
      if (data.type === 'marker-start') { startMarkerPlacement(data); return; }
      if (data.type === 'marker-cancel') { cancelMarkerPlacement(); return; }
      if (data.type === 'marker-focus') { focusMarker(data.targetId); return; }
      if (data.type === 'marker-revisit') { revisitMarker(data.targetId); return; }
      if (data.type === 'toolbar-action') { toolbarAction(data.action, data.value); return; }
      if (data.type === 'connect') { send({ type: 'ready' }); publishContext(true); return; }
      if (data.type === 'lesson') { applyLesson(data.activity); return; }
      if (data.type === 'view-policy') { dialReadOnly = data.readOnly === true; if (dialReadOnly) cancelMarkerPlacement(true); document.getElementById('buildSundial').disabled = dialReadOnly; document.getElementById('buildMode').disabled = dialReadOnly; if (data.readOnly) { setSunMode(true); } updateAll(); return; }
      if (data.type === 'build-view') { setSunMode(data.building !== true); frameKey = ''; updateAll(); return; }
      if (data.type === 'presentation') {
        if (data.active) cancelMarkerPlacement(true);
        if (data.active === true && !reviewingCamera) { cameraIncludesShadow = false; frameKey = ''; }
        if (data.active !== true && reviewingCamera) { cameraIncludesShadow = true; frameKey = ''; }
        reviewingCamera = data.active === true;
        if (!reviewingCamera) reviewFrame = null;
        document.body.classList.toggle('presenting', data.active === true);
        document.getElementById('controlsToggle').textContent = data.active ? 'Location' : 'Place & date';
        if (data.active && state.playing) togglePlay();
        if (data.active) { setSunMode(true); toggleControls(false); switchView('horizon'); if (cameraMode === 'sky') setCameraMode('angle'); }
        updateDayControls();
        return;
      }
      if (data.type === 'review' && typeof data.id === 'string' && data.id.length <= 80 && validMonument(data.design) && Array.isArray(data.checks) && data.checks.length <= 20) {
        try {
          const captures = window.SolarReview.evaluate({ design: data.design, checks: data.checks, settings: observationSettings(), id: data.id });
          const frames = captures.map(c => {
            const p = SunCalc.getPosition(new Date(c.settings.utcInstant), c.settings.latitude, c.settings.longitude);
            return window.MonumentCamera.bounds(data.design, window.SolarGeometry.sunDirection(radToDeg(p.altitude), radToDeg(p.azimuth) + 180), true);
          });
          reviewFrame = { ...frames[0], points: frames.flatMap(f => f.points), clipped: frames.some(f => f.clipped) };
          reviewFrame.centre = Object.fromEntries(['x','y','z'].map(k => [k, (Math.min(...reviewFrame.points.map(p => p[k])) + Math.max(...reviewFrame.points.map(p => p[k]))) / 2]));
          frameKey = '';
          send({ type: 'review', id: data.id, captures });
        } catch { send({ type: 'review-error', id: data.id }); }
        return;
      }
      if (data.type === 'visibility') {
        hostActive = data.active === true;
        if (!hostActive) cancelMarkerPlacement(true);
        if (!hostActive && state.playing) togglePlay();
        if (hostActive) { globe.resumeAnimation?.(); resizeCanvases(); resizeShadowRenderer(); resizeGlobe(); updateAll(); }
        else globe.pauseAnimation?.();
        return;
      }
      if (data.type === 'nearby' && [-7, 7].includes(data.offset) && validMonument(data.capture?.design)) {
        const settings = data.capture.settings;
        if (!settings || typeof settings.localDate !== 'string') return;
        const localDate = DateTime.fromISO(settings.localDate, { zone: settings.zone }).plus({ days: data.offset }).toISODate();
        const observation = window.SolarDay.observe({ ...settings, localDate }, settings.observationRule ?? 'noon', settings.clockMinutes ?? 720);
        if (!observation) { document.getElementById('sunBadge').textContent = 'No observation at this time rule on the nearby date.'; return; }
        data.type = 'restore'; data.capture = { ...data.capture, settings: { ...settings, localDate, minutes: observation.minutes } };
      }
      const design = data.type === 'restore' ? data.capture?.design : data.design;
      if (!validMonument(design)) return;
      if (data.type === 'capture') { stopDay(); setSunMode(true); }
      monumentDesign = structuredClone(design);
      if (data.type === 'restore') {
        setSunMode(true);
        const settings = data.capture.settings;
        if (!settings || !Number.isFinite(settings.latitude) || !Number.isFinite(settings.longitude) || !Number.isFinite(settings.minutes) || typeof settings.localDate !== 'string') return;
        state.lat = clamp(settings.latitude, -89.9, 89.9); state.lon = normalizeLon(settings.longitude);
        state.selectedZone = getZoneForLocation(state.lat, state.lon);
        state.localDateISO = normalizeDateInput(settings.localDate, state.localDateISO);
        state.minutes = clamp(settings.minutes, -1440, 2879.999);
        observationRule = settings.observationRule === 'noon' ? 'noon' : 'clock';
        pausedDay = '';
        if (state.playing) togglePlay();
        syncLocationInputs(); els.dateInput.value = state.localDateISO; els.timeSlider.value = state.minutes;
      }
      rebuildMonument(); updateAll();
      if (data.type === 'capture' && typeof data.id === 'string' && data.id.length <= 200) send({ type: 'capture', capture: captureMonument(data.id) });
    });
    send({ type: 'ready' });
  }
})();

