export type DraftSaveStatus = 'saved' | 'saving' | 'pending' | 'error';

/** Framework-neutral debounce/flush behavior shared by every project editor. */
export class DraftAutosaveController<TDraft> {
  private timer?: ReturnType<typeof setTimeout>;
  private pending?: TDraft;

  constructor(
    private readonly save: (draft: TDraft) => void | Promise<void>,
    private readonly delayMs = 700,
  ) {}

  schedule(draft: TDraft): void {
    this.pending = draft;
    if (this.timer !== undefined) clearTimeout(this.timer);
    this.timer = setTimeout(() => void this.flush(), this.delayMs);
  }

  async flush(): Promise<void> {
    if (this.timer !== undefined) clearTimeout(this.timer);
    this.timer = undefined;
    const draft = this.pending;
    this.pending = undefined;
    if (draft !== undefined) await this.save(draft);
  }

  cancel(): void {
    if (this.timer !== undefined) clearTimeout(this.timer);
    this.timer = undefined;
    this.pending = undefined;
  }
}
