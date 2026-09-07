export interface WorkbenchEvidenceLink {
  sourceRecord?: {
    text?: string;
    columns?: readonly string[];
    rows?: readonly (readonly string[])[];
  };
  readonly evidenceId: string;
  readonly category: 'clue' | 'guide' | 'result';
  readonly activityIds: readonly string[];
  readonly keywords?: string;
  readonly instruction?: string;
  readonly action?: {
    readonly activityId: string;
    readonly label: string;
    readonly toolId?: string;
  };
}
