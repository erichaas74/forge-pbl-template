export interface ProjectCatalogEntry {
  readonly id: string;
  readonly route: string;
  readonly builderRoute?: string;
  readonly title: string;
  readonly subtitle: string;
  readonly grade: string;
  readonly subject: string;
  readonly projectType: string;
  readonly description: string;
  readonly learningGoals: readonly string[];
  readonly symbol: string;
  readonly theme: 'laboratory' | 'frontier' | 'museum' | 'broadcast' | 'senate' | 'atlas';
  readonly status: 'Available';
}

export const projectCatalog: readonly ProjectCatalogEntry[] = [
  {
    id: 'mystery-substance',
    route: '/mystery-substance',
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
    status: 'Available',
  },
  {
    id: 'frontier-trading-company',
    route: '/frontier-trading',
    builderRoute: '/frontier-trading/builder-info',
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
    status: 'Available',
  },
  {
    id: 'objects-that-changed-us',
    route: '/class-exhibit-hall',
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
    status: 'Available',
  },
  {
    id: 'history-live-revolutionary-war',
    route: '/history-live',
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
    status: 'Available',
  },
  {
    id: 'the-fate-of-the-republic',
    route: '/debate-studio',
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
    status: 'Available',
  },
  {
    id: 'race-around-the-world',
    route: '/journey-replay',
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
    status: 'Available',
  },
] as const;
