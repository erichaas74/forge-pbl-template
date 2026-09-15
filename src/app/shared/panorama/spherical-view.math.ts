export const wrapYaw = (value: number): number => ((value + 180) % 360 + 360) % 360 - 180;
export const clampPitch = (value: number): number => Math.max(-89.9, Math.min(89.9, value));
export function viewDirection(yaw: number, pitch: number): [number, number, number] {
  const longitude = (yaw + 180) * Math.PI / 180, latitude = pitch * Math.PI / 180;
  return [Math.cos(longitude) * Math.cos(latitude), Math.sin(latitude), Math.sin(longitude) * Math.cos(latitude)];
}
