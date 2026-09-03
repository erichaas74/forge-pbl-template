export interface ProjectCatalogEntry {
  readonly id: string;
  readonly route: string;
  readonly title: string;
  readonly subtitle: string;
  readonly grade: string;
  readonly subject: string;
  readonly projectType: string;
  readonly description: string;
  readonly learningGoals: readonly string[];
  readonly symbol: string;
  readonly theme: 'laboratory' | 'frontier';
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
] as const;
