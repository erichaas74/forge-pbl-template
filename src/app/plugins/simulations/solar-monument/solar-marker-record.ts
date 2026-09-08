import type { DesignTarget } from '../../../shared/engineering/block-design';

export const markerLights = [
  'shadow',
  'sunlight',
  'red light',
  'amber light',
  'green light',
  'blue light',
  'violet light',
  'mixed filters',
];
export interface SolarMarkerRecord {
  markerKind: string;
  utcInstant: string;
  zone: string;
  latitude: number;
  longitude: number;
  sunAltitude: number;
  sunAzimuth: number;
  light: string;
}
export function solarMarkerRecord(target: DesignTarget | undefined): SolarMarkerRecord | undefined {
  const s = target?.settings;
  if (
    !s ||
    ![
      'calendar-observation',
      'calendar-march',
      'calendar-june',
      'calendar-sept',
      'calendar-dec',
    ].includes(String(s['markerKind']))
  )
    return;
  if (
    typeof s['utcInstant'] !== 'string' ||
    !/^20(2[5-9]|30)-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(s['utcInstant']) ||
    !Number.isFinite(Date.parse(s['utcInstant'])) ||
    new Date(s['utcInstant']).toISOString() !== s['utcInstant'] ||
    typeof s['zone'] !== 'string'
  )
    return;
  const bounds = [
    ['latitude', -89.9, 89.9],
    ['longitude', -180, 180],
    ['sunAltitude', 0.000001, 90],
    ['sunAzimuth', 0, 359.999999],
  ] as const;
  if (
    bounds.some(
      ([key, min, max]) =>
        typeof s[key] !== 'number' ||
        !Number.isFinite(s[key]) ||
        Number(s[key]) < min ||
        Number(s[key]) > max,
    ) ||
    !markerLights.includes(String(s['light']))
  )
    return;
  try {
    new Intl.DateTimeFormat('en', { timeZone: s['zone'] }).format(new Date(s['utcInstant']));
  } catch {
    return;
  }
  return s as unknown as SolarMarkerRecord;
}
export function markerClock(record: SolarMarkerRecord): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: record.zone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(record.utcInstant));
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return (
    value('hour') * 60 +
    value('minute') +
    value('second') / 60 +
    new Date(record.utcInstant).getUTCMilliseconds() / 60000
  );
}
