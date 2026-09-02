import type { BaseEntity } from '../../../core/models/base-entity';

export interface StandardReference {
  id: string;
  framework?: string;
  code?: string;
  label?: string;
  role?: 'primary' | 'supporting';
}

export interface ThemeConfiguration {
  id?: string;
  name?: string;
  extensions?: Record<string, unknown>;
}

export interface ProjectManifest extends BaseEntity {
  template: {
    id: 'investigation';
    version: string;
  };
  projectType: 'investigation';
  gradeLevels: number[];
  subjects: {
    primary: string;
    supporting?: string[];
  };
  duration?: {
    value: number;
    unit: 'days' | 'weeks';
  };
  status: 'draft' | 'review' | 'published' | 'archived';
  investigationConfigRef: string;
  standards?: StandardReference[];
  masterySkills?: string[];
  theme?: ThemeConfiguration;
  capabilities: string[];
}

