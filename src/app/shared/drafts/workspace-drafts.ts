import { InjectionToken } from '@angular/core';

/** Presentation drafts only. Completed work still goes through runtime events. */
export interface WorkspaceDraftStore {
  read<T>(key: string): T | undefined;
  write<T>(key: string, value: T): void;
}

export const WORKSPACE_DRAFTS = new InjectionToken<WorkspaceDraftStore>('WORKSPACE_DRAFTS');
