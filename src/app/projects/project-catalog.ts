export interface ProjectCatalogEntry {
  readonly id: string;
  readonly route: string;
  readonly builderRoute?: string;
  readonly legacyRoutes: readonly string[];
  readonly projectVersion: string;
  readonly template: {
    readonly id: string;
    readonly version: string;
  };
  readonly packageReference: string;
  readonly capabilityIds: readonly string[];
  readonly title: string;
  readonly subtitle: string;
  readonly grade: string;
  readonly subject: string;
  readonly projectType: string;
  readonly description: string;
  readonly learningGoals: readonly string[];
  readonly symbol: string;
  readonly coverImage?: string;
  readonly studentInvitation?: string;
  readonly theme: string;
  /** Release readiness, separate from whether the card is visible in the catalog. */
  readonly status: 'Preview' | 'Pilot' | 'Classroom ready' | 'Updating';
}

export const projectCatalog: readonly ProjectCatalogEntry[] = [
  {
    id: 'robot-delivery-code-lab', route: '/projects/robot-delivery-code-lab', legacyRoutes: [],
    projectVersion: '1.0.0', template: { id: 'programming-automation', version: '1.0' },
    packageReference: 'projects/robot-delivery-code-lab', capabilityIds: ['automation.robot-course', 'automation.program', 'automation.math-evidence', 'automation.replay'],
    title: 'Robot Delivery Code Lab', subtitle: 'Programming & Automation Challenge', grade: 'Grade 5',
    subject: 'Mathematics & Computing', projectType: 'Programming & Automation',
    description: 'Calibrate a delivery robot, turn calculations into code, test eight missions, and defend your final design in a Robot Command Championship.',
    learningGoals: ['Fractions, decimals & measurement', 'Variables & repeat loops', 'Testing & mathematical reasoning'],
    symbol: '⌘', coverImage: '/robot-delivery/arena-launch-v2.png', studentInvitation: 'Code a delivery robot', theme: 'robotics', status: 'Preview',
  },
  {
    id: 'mystery-substance',
    coverImage: '/week1-incident-room-v1.webp',
    studentInvitation: 'Solve a mystery',
    route: '/projects/mystery-substance',
    legacyRoutes: ['/mystery-substance'],
    projectVersion: '1.0.0',
    template: { id: 'investigation', version: '1.0' },
    packageReference: 'projects/mystery-substance',
    capabilityIds: [
      'activity.science-properties',
      'activity.science-reaction',
      'activity.conservation',
    ],
    title: 'The Unlabeled Shelf',
    subtitle: 'Mystery Substance Investigation',
    grade: 'Grade 5',
    subject: 'Science',
    projectType: 'Evidence Investigation',
    description:
      'Examine mystery substances, compare test results, build a working theory, and restore every label using scientific evidence.',
    learningGoals: ['Properties of matter', 'Evidence analysis', 'Scientific argument'],
    symbol: '⌬',
    theme: 'laboratory',
    status: 'Preview',
  },
  {
    id: 'frontier-trading-company',
    coverImage: '/frontier-trading/shop-scenes/town-street.webp',
    studentInvitation: 'Trade with a plan',
    route: '/projects/frontier-trading-company',
    builderRoute: '/projects/frontier-trading-company/builder-info',
    legacyRoutes: ['/frontier-trading', '/frontier-trading/builder-info'],
    projectVersion: '1.13.0',
    template: { id: 'simulation-decision', version: '1.4' },
    packageReference: 'projects/frontier-trading-company',
    capabilityIds: ['simulation.market', 'simulation.route', 'simulation.cargo'],
    title: 'Frontier Trading Company',
    subtitle: 'Trading Season Simulation',
    grade: 'Grade 5',
    subject: 'Mathematics',
    projectType: 'Decision Simulation',
    description:
      'Build a trading company and use money, unit price, cargo capacity, distance, and evidence to defend a profitable strategy.',
    learningGoals: ['Decimal money', 'Multiplicative reasoning', 'Strategic decisions'],
    symbol: '✥',
    theme: 'frontier',
    status: 'Pilot',
  },
  {
    id: 'objects-that-changed-us',
    coverImage: '/exhibit-hall/afterlife-3d.png',
    studentInvitation: 'Make a museum',
    route: '/projects/objects-that-changed-us',
    legacyRoutes: ['/class-exhibit-hall'],
    projectVersion: '2.2.0',
    template: { id: 'exhibit-hall', version: '1.0' },
    packageReference: 'projects/objects-that-changed-us',
    capabilityIds: ['artifact.museum-board', 'artifact.video', 'gallery.immersive'],
    title: 'Objects That Changed Us: Ancient Egypt',
    subtitle: 'Interactive Egyptian Exhibit Hall',
    grade: 'Grade 5',
    subject: 'History',
    projectType: 'Museum Exhibition',
    description:
      'Research an Egyptian artifact group, create a wing in the shared MetaSteps museum, record a curator video, and open the exhibition to students and families.',
    learningGoals: ['Artifact research', 'Digital curation', 'Public presentation'],
    symbol: '◇',
    theme: 'museum',
    status: 'Preview',
  },
  {
    id: 'history-live-revolutionary-war',
    coverImage: '/history-live/broadcast-studio.png',
    studentInvitation: 'Report the story',
    route: '/projects/history-live-revolutionary-war',
    legacyRoutes: ['/history-live'],
    projectVersion: '1.1.0',
    template: { id: 'history-live-broadcast', version: '1.1' },
    packageReference: 'projects/history-live-revolutionary-war',
    capabilityIds: ['history.source-wall', 'media.recording', 'showcase.broadcast'],
    title: 'History Live: The Revolutionary War',
    subtitle: 'Two networks. One historical record.',
    grade: 'Grades 5–8',
    subject: 'History + ELA',
    projectType: 'History Live Broadcast',
    description:
      'Choose a reporting side, claim a developing story, verify the evidence, and take a modern Revolutionary War news package live.',
    learningGoals: ['Historical evidence', 'Source perspective', 'Broadcast writing'],
    symbol: 'LIVE',
    theme: 'broadcast',
    status: 'Pilot',
  },
  {
    id: 'the-fate-of-the-republic',
    coverImage: '/debate-studio/roman-senate-chamber.png',
    studentInvitation: 'Take the floor',
    route: '/projects/the-fate-of-the-republic',
    legacyRoutes: ['/debate-studio'],
    projectVersion: '2.0.0',
    template: { id: 'debate-studio', version: '2.0' },
    packageReference: 'projects/the-fate-of-the-republic',
    capabilityIds: ['debate.rounds', 'media.recording', 'showcase.debate'],
    title: 'The Fate of the Republic',
    subtitle: 'Roman Senate Debate Studio',
    grade: 'Grades 6–8',
    subject: 'History + ELA + Civics',
    projectType: 'Historical Debate',
    description:
      'Enter the Roman Senate, answer an opposing case with historical evidence, record your address, and join a full class proceeding and verdict.',
    learningGoals: ['Historical argument', 'Evidence-based rebuttal', 'Civic discourse'],
    symbol: 'SPQR',
    theme: 'senate',
    status: 'Pilot',
  },
  {
    id: 'race-around-the-world',
    coverImage: '/journey-replay/world-atlas-v1.png',
    studentInvitation: 'Chart a voyage',
    route: '/projects/race-around-the-world',
    legacyRoutes: ['/journey-replay'],
    projectVersion: '1.1.0',
    template: { id: 'journey-replay', version: '1.0' },
    packageReference: 'projects/race-around-the-world',
    capabilityIds: ['journey.route', 'journey.logbook', 'showcase.replay'],
    title: 'Race Around the World',
    subtitle: 'Age of Exploration Journey Replay',
    grade: 'Grades 5–7',
    subject: 'History + Geography + ELA',
    projectType: 'Expedition / Journey Replay',
    description:
      'Choose a mission, provision a ship, navigate the Atlantic, defend each decision with evidence, and replay the voyage your team recorded.',
    learningGoals: ['Geographic reasoning', 'Source perspective', 'Evidence-based decisions'],
    symbol: '✦',
    theme: 'atlas',
    status: 'Updating',
  },
  {
    id: 'survival-island-story-lab',
    coverImage: '/narrative-studio/survival-island-history-launch-v1.jpg',
    studentInvitation: 'Write an adventure',
    route: '/projects/survival-island-story-lab',
    legacyRoutes: [],
    projectVersion: '1.2.0',
    template: { id: 'narrative-studio', version: '1.3' },
    packageReference: 'projects/survival-island-story-lab',
    capabilityIds: [
      'story.bible',
      'story.graph',
      'story.scene-editor',
      'ai.writing-coach',
      'story.playtest',
      'showcase.playable-story',
    ],
    title: 'Survival Island Story Lab',
    subtitle: 'Interactive Individual Narrative Studio',
    grade: 'Grades 5–8',
    subject: 'ELA',
    projectType: 'Branching Narrative Studio',
    description:
      'Create an island survival story, test meaningful reader choices, revise every path, and publish a story someone can play.',
    learningGoals: ['Narrative craft', 'Character and consequence', 'Revision through playtesting'],
    symbol: '✦',
    theme: 'island-story',
    status: 'Preview',
  },
  {
    id: 'calendar-monument',
    coverImage: '/simulations/solar-monument/monument.svg',
    studentInvitation: 'Build with sunlight',
    route: '/projects/calendar-monument',
    legacyRoutes: [],
    projectVersion: '1.0.0',
    template: { id: 'engineering-design', version: '1.0' },
    packageReference: 'projects/calendar-monument',
    capabilityIds: ['simulation.solar-monument', 'design.block-builder', 'engineering.trial-notebook', 'showcase.design-exhibit'],
    title: 'Build a Calendar Monument',
    subtitle: 'Sun, Moon & Seasonal Shadows',
    grade: 'Grade 5',
    subject: 'Science + Mathematics + Engineering',
    projectType: 'Engineering Design',
    description: 'Research the Sun and Moon, build a monument with measured blocks, and test how its shadows mark equinoxes and solstices.',
    learningGoals: ['Earth’s tilt and seasons', 'Sun and Moon patterns', 'Measured design and evidence'],
    symbol: '☀',
    theme: 'observatory',
    status: 'Preview',
  },
] as const;
