export interface BuilderPathDefinition {
  readonly label: string;
  readonly path: string;
  readonly purpose: string;
  readonly kind: 'app' | 'source' | 'document';
}

export interface BuilderChangeDefinition {
  readonly version: string;
  readonly date: string;
  readonly title: string;
  readonly changes: readonly string[];
}

export interface BuilderRoadmapPhase {
  readonly phase: string;
  readonly status: 'current' | 'next' | 'planned' | 'blocked';
  readonly outcome: string;
  readonly dependsOn?: string;
}

export interface SimulationDecisionBuilderInfoDefinition {
  readonly projectLabel: string;
  readonly snapshotVersion: string;
  readonly updatedAt: string;
  readonly updatedBy: string;
  readonly currentMode: string;
  readonly statusSummary: string;
  readonly studentPath: readonly string[];
  readonly paths: readonly BuilderPathDefinition[];
  readonly changes: readonly BuilderChangeDefinition[];
  readonly historicalDirection: readonly string[];
  readonly guardrails: readonly string[];
  readonly roadmap: readonly BuilderRoadmapPhase[];
}
