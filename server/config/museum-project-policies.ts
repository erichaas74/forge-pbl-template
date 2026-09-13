import { studentMuseumConfig } from '../../src/app/projects/class-exhibit-hall/student-museum.config';
import type { AssignedMuseumConfig } from '../../src/app/templates/exhibit-hall/rooms/museum-room';

/** Versioned, trusted curriculum. HTTP handlers contain no curriculum-specific branches. */
export const museumProjectPolicies: ReadonlyMap<string, AssignedMuseumConfig> = new Map([
  [
    JSON.stringify([studentMuseumConfig.projectId, studentMuseumConfig.projectVersion]),
    studentMuseumConfig.museum!,
  ],
]);
