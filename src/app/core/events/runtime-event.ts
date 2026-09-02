export type RuntimeActorType = 'student' | 'team' | 'teacher' | 'system';

export interface RuntimeActor {
  type: RuntimeActorType;
  id?: string;
}

export interface RuntimeEvent {
  id: string;
  eventType: string;
  timestamp: string;
  tenantId: string;
  projectId: string;
  actor: RuntimeActor;
  sourceId?: string;
  payload?: Record<string, unknown>;
  clientEventId?: string;
}
