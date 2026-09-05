import type { ProjectPackageLocation } from '../core/packages/project-package-contracts';
import { ageOfExplorationJourneyConfig as config } from '../projects/age-of-exploration-journey/age-of-exploration-journey.config';

export const simpleJourneyReplayLocation: ProjectPackageLocation = {
  tenantId: 'tenant-one',
  projectId: config.projectId,
  projectVersion: config.projectVersion,
  reference: 'fixture://race-around-the-world',
};

export const simpleJourneyReplayPackage = {
  'project.json': {
    id: config.projectId,
    schemaVersion: config.schemaVersion,
    title: config.title,
    template: config.template,
    projectType: 'journey-replay',
    status: 'published',
    journeyConfigRef: 'journey.json',
    mapConfigRef: 'map.json',
    replayConfigRef: 'replay.json',
    capabilities: [
      'livingJourneyMap',
      'journeyChoices',
      'studentResponses',
      'journeyReplay',
      'classJourneyMap',
      'voyageIntersections',
      'authoritativeJourneyPersistence',
      'journeySubmissionReview',
      'liveClassJourneyProjection',
      'journeyMediaStorage',
    ],
  },
  'journey.json': {
    id: 'journey-main',
    schemaVersion: config.schemaVersion,
    title: config.title,
    subtitle: config.subtitle,
    gradeBand: config.gradeBand,
    subject: config.subject,
    drivingQuestion: config.drivingQuestion,
    team: config.team,
    roles: config.roles,
    steps: config.steps,
    evidence: config.evidence,
    resources: config.resources,
  },
  'map.json': config.map,
  'replay.json': { ...config.replay, classVoyages: config.classVoyages },
} as const;
