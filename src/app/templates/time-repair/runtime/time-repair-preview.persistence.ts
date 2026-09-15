import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import { safeBrowserStorage, ScopedBrowserStore } from '../../../shared/persistence';
import type { TimeRepairConfig } from '../domain/time-repair.models';
import type { RepairPreviewDraft } from '../domain/time-repair-preview.models';
import { validRepairPreviewDraft } from '../domain/time-repair-preview.validation';

export interface RepairPreviewPersistence {
  readonly available: boolean;
  load(id: string): RepairPreviewDraft | undefined;
  save(id: string, draft: RepairPreviewDraft): void;
}
/** Separate session keys protect the assessed record and drafts from other sessions. */
export class BrowserRepairPreviewPersistence implements RepairPreviewPersistence {
  readonly available: boolean;
  constructor(
    private readonly config: TimeRepairConfig,
    private readonly session: ProjectSessionContext,
    private readonly storage = safeBrowserStorage(),
  ) {
    this.available = !!storage;
  }
  private store(id: string): ScopedBrowserStore<RepairPreviewDraft> {
    return new ScopedBrowserStore(
      'time-repair.weeks.v1',
      this.storage,
      (value): value is RepairPreviewDraft => validRepairPreviewDraft(value, this.config, id),
    );
  }
  load(id: string): RepairPreviewDraft | undefined {
    return this.store(id).load({ ...this.session, sessionId: id });
  }
  save(id: string, draft: RepairPreviewDraft): void {
    this.store(id).save({ ...this.session, sessionId: id }, draft);
  }
}
