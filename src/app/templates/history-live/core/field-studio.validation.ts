import { validateInquiry } from '../../../shared/inquiry/inquiry.models';
import type { HistoryLiveProjectConfig } from '../domain/history-live.models';
import { validateHistoryLiveContent } from './history-live-quality';
import { validateHistoryLiveVisualConfig } from './history-live-state';

/** Optional profile is explicit; incomplete profiles fail rather than falling into legacy stages. */
export function validateFieldStudio(config: HistoryLiveProjectConfig): void {
  if (!config.inquiry && !config.fieldStudio) return;
  const inquiry = config.inquiry,
    studio = config.fieldStudio;
  const fail = () => {
    throw new Error(
      'FIELD_STUDIO_INVALID: Inquiry, gates, network, and credited visuals must be configured together.',
    );
  };
  if (!inquiry || !studio) return fail();
  validateInquiry(
    inquiry,
    config.sources.map((s) => s.id),
  );
  if (validateHistoryLiveContent(config).length || validateHistoryLiveVisualConfig(config).length)
    fail();
  if (
    studio.capabilityId !== 'history-live.field-studio' ||
    studio.version !== '1.0' ||
    !inquiry.gates.some((g) => g.id === studio.recordingGateId) ||
    !inquiry.gates.some((g) => g.id === studio.finalGateId) ||
    studio.finalGateId !== inquiry.hearingGateId ||
    !config.networks.some((n) => n.side === studio.networkSide) ||
    !studio.visualSourceIds.length ||
    studio.visualSourceIds.some((id) => !config.sources.some((s) => s.id === id))
  )
    fail();
}
