export interface AudienceAssignment {
  visibility: 'student' | 'team' | 'class' | 'role' | 'teacher';
  targetIds?: string[];
}

export interface TeamRole {
  id: string;
  title: string;
  responsibilities?: string[];
}

export interface EvidenceDistributionRule {
  evidenceIds: string[];
  audienceType: 'all' | 'role' | 'team' | 'student' | 'random';
  targetIds?: string[];
}

export interface InvestigationTeamSettings {
  mode: 'individual' | 'team' | 'mixed';
  roles?: TeamRole[];
  boardMode?: 'individual' | 'shared' | 'sharedWithPrivateLayer';
  evidenceDistribution?: EvidenceDistributionRule[];
}

