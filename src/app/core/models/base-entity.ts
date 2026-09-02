export interface BaseEntity {
  id: string;
  schemaVersion: string;
  title?: string;
  description?: string;
  tags?: string[];
  enabled?: boolean;
  extensions?: Record<string, unknown>;
  metadata?: {
    createdBy?: string;
    notes?: string;
  };
}

