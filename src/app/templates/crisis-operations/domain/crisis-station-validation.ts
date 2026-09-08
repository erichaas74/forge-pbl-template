import type { CrisisConfig } from './crisis.models';

/** Optional station experiences extend the template, without changing saved exercise state. */
export function validateStationExperiences(config: CrisisConfig): void {
  const fail = (message: string): never => {
    throw new Error(`INVALID_CRISIS_PACKAGE: ${message}`);
  };
  const record = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);
  const text = (value: unknown) => typeof value === 'string' && value.trim().length > 0;
  const asset = (value: unknown) =>
    text(value) && typeof value === 'string' && /^\/(?!\/)[^\s\\]+$/.test(value);
  for (const station of config.workstations ?? []) {
    if (station.roomSurface !== undefined) {
      const surface = station.roomSurface;
      if (
        !record(surface) ||
        !Array.isArray(surface.bounds) ||
        surface.bounds.length !== 4 ||
        !surface.bounds.every((value) => typeof value === 'number' && Number.isFinite(value))
      )
        fail('Invalid workstation room bounds.');
      const [x, y, width, height] = surface.bounds;
      if (x < 0 || y < 0 || width <= 0 || height <= 0 || x + width > 100 || y + height > 100)
        fail('Workstation room bounds must fit inside the artwork.');
      if (
        !Array.isArray(surface.screen) ||
        surface.screen.length !== 4 ||
        !surface.screen.every(
          (point) =>
            Array.isArray(point) &&
            point.length === 2 &&
            point.every((value) => typeof value === 'number' && Number.isFinite(value)) &&
            point[0] >= x &&
            point[0] <= x + width &&
            point[1] >= y &&
            point[1] <= y + height,
        )
      )
        fail('Workstation screen must fit inside its room bounds.');
      for (let index = 0; index < 4; index++) {
        const a = surface.screen[index],
          b = surface.screen[(index + 1) % 4],
          c = surface.screen[(index + 2) % 4];
        if ((b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]) <= 0)
          fail('Workstation screen corners must form a clockwise convex surface.');
      }
    }
    if (station.conference !== undefined && station.weather !== undefined)
      fail('A workstation can open only one specialized experience.');
    if (station.conference !== undefined) {
      const call = station.conference;
      if (
        !record(call) ||
        !text(call.title) ||
        !Array.isArray(call.participants) ||
        call.participants.length < 1 ||
        call.participants.length > 6
      )
        fail('Invalid conference definition.');
      const ids = new Set<string>();
      for (const person of call.participants) {
        if (
          !record(person) ||
          !text(person.id) ||
          !text(person.name) ||
          !text(person.role) ||
          !asset(person.portrait) ||
          ids.has(person.id) ||
          !config.locations.some((location) => location.id === person.locationId)
        )
          fail('Invalid conference participant.');
        ids.add(person.id);
        if (
          !Array.isArray(person.evidenceIds) ||
          new Set(person.evidenceIds).size !== person.evidenceIds.length ||
          person.evidenceIds.some(
            (id: unknown) => !config.evidence.some((report) => report.id === id),
          )
        )
          fail('Invalid conference report reference.');
      }
      if (call.meetingUrl !== undefined) {
        try {
          if (typeof call.meetingUrl !== 'string') fail('Invalid meeting URL.');
          const url = new URL(call.meetingUrl);
          if (url.protocol !== 'https:' || url.username || url.password)
            fail('Meeting links must use HTTPS without embedded credentials.');
        } catch {
          fail('Invalid meeting URL.');
        }
      }
    }
    if (station.weather !== undefined) {
      const weather = station.weather;
      if (
        !record(weather) ||
        !text(weather.title) ||
        !text(weather.network) ||
        !asset(weather.satelliteImage) ||
        !Array.isArray(weather.frames) ||
        !weather.frames.length ||
        weather.frames.length > 120
      )
        fail('Invalid weather monitor definition.');
      const previous = new Map<number, number>();
      for (const frame of weather.frames) {
        if (
          !record(frame) ||
          !Number.isInteger(frame.stage) ||
          frame.stage < 0 ||
          frame.stage >= config.bulletins.length ||
          ![frame.minute, frame.x, frame.y, frame.intensity].every(
            (value) => typeof value === 'number' && Number.isFinite(value) && value >= 0,
          ) ||
          frame.x > 1000 ||
          frame.y > 600 ||
          frame.intensity > 1 ||
          frame.minute > config.bulletins[frame.stage].minute ||
          frame.minute <= (previous.get(frame.stage) ?? -1)
        )
          fail('Invalid or future weather frame.');
        previous.set(frame.stage, frame.minute);
      }
      for (let stage = 0; stage < config.bulletins.length; stage++)
        if (!previous.has(stage)) fail('Every bulletin needs a weather sequence.');
    }
  }
}
