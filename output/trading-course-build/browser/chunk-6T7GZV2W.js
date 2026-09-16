// src/app/templates/simulation-decision/ui/map/route-canvas.models.ts
function clampProgress(value) {
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
}
function pointOnTrail(points, progress) {
  if (!points.length) return { x: 0, y: 0 };
  const position = clampProgress(progress) * (points.length - 1);
  const index = Math.floor(position);
  const from = points[index];
  const to = points[Math.min(points.length - 1, index + 1)];
  const fraction = position - index;
  return { x: from.x + (to.x - from.x) * fraction, y: from.y + (to.y - from.y) * fraction };
}
function canvasCamera(viewport) {
  const width = Math.max(1, viewport.width);
  const height = Math.max(1, viewport.height);
  const baseX = width / 1e3;
  const baseY = height / 800;
  const zoomX = (viewport.stretch ? baseX : Math.min(baseX, baseY)) * viewport.view.zoom;
  const zoomY = (viewport.stretch ? baseY : Math.min(baseX, baseY)) * viewport.view.zoom;
  return { width, height, zoomX, zoomY, x: viewport.view.x * 10, y: viewport.view.y * 10 };
}
function routeDrawingChanged(previous, next) {
  return !previous || previous.selectedRouteId !== next.selectedRouteId || previous.travel?.routeId !== next.travel?.routeId || previous.travel?.progress !== next.travel?.progress || previous.trails.length !== next.trails.length || next.trails.some((trail, index) => {
    const before = previous.trails[index];
    return trail.id !== before.id || trail.state !== before.state || trail.compared !== before.compared || trail.days !== before.days || trail.points !== before.points;
  });
}
function confirmedTravelSegment(previous, next) {
  const travel = previous?.travel;
  if (!travel || !next.motion) return void 0;
  if (previous?.cue && next.cue && previous.cue.journeyId !== next.cue.journeyId) return void 0;
  const trail = next.trails.find((item) => item.id === travel.routeId);
  if (!trail || trail.points.length < 2) return void 0;
  const from = clampProgress(travel.progress);
  const to = next.travel?.routeId === travel.routeId ? clampProgress(next.travel.progress) : !next.travel && next.currentLocationId === trail.toLocationId && trail.state === "completed" ? 1 : from;
  return to > from ? { routeId: travel.routeId, from, to } : void 0;
}

export {
  clampProgress,
  pointOnTrail,
  canvasCamera,
  routeDrawingChanged,
  confirmedTravelSegment
};
//# debugId=191011f1-f2a2-5897-9793-2333367f6b17
//# sourceMappingURL=chunk-6T7GZV2W.js.map
