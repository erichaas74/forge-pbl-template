import { InjectionToken } from '@angular/core';

import type {
  HistoryLiveProjectConfig,
  HistoryLiveEnrollment,
} from '../domain/history-live.models';
import type { AuthoritativeCommandGateway } from '../../../core/authority/authoritative-command-gateway';
import type { AssetStorageAdapter } from '../../../core/state/persistence-contracts';

export const HISTORY_LIVE_CONFIG = new InjectionToken<HistoryLiveProjectConfig>(
  'HISTORY_LIVE_CONFIG',
);

/** Supplied by the authenticated host in classroom mode, never from URL/form values. */
export const HISTORY_LIVE_ENROLLMENT = new InjectionToken<HistoryLiveEnrollment>(
  'HISTORY_LIVE_ENROLLMENT',
);
export const HISTORY_LIVE_AUTHORITY = new InjectionToken<AuthoritativeCommandGateway>(
  'HISTORY_LIVE_AUTHORITY',
);
export const HISTORY_LIVE_MEDIA = new InjectionToken<AssetStorageAdapter>('HISTORY_LIVE_MEDIA');
