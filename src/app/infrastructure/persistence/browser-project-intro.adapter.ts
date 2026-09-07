import {
  IntroError,
  isIntroSnapshot,
  type IntroPersistenceAdapter,
  type IntroScope,
  type IntroSnapshot,
} from '../../shared/project-intro/project-intro.models';
import { safeBrowserStorage } from '../../shared/persistence/scoped-browser-store';

/** Low-stakes personal drafts only. A school host can supply a cloud adapter. */
export class BrowserProjectIntroAdapter implements IntroPersistenceAdapter {
  readonly saveLocation = 'Saved on this browser';
  constructor(private readonly storage: Storage | undefined = safeBrowserStorage()) {}

  async load(scope: IntroScope): Promise<IntroSnapshot | undefined> {
    return this.read(scope);
  }

  async save(scope: IntroScope, snapshot: IntroSnapshot, expectedRevision: number): Promise<void> {
    if (!this.storage)
      throw new IntroError(
        'SAVE_FAILED',
        'This browser cannot save your response. Enable browser storage and try again.',
      );
    const current = this.read(scope);
    if ((current?.revision ?? 0) !== expectedRevision) {
      throw new IntroError(
        'STATE_CONFLICT',
        'Your opening changed in another tab. Keep a copy of your text, then reload to see the saved version.',
      );
    }
    if (!isIntroSnapshot(snapshot))
      throw new IntroError(
        'STATE_INVALID',
        'Your response could not be saved because its format is invalid.',
      );
    try {
      this.storage.setItem(this.key(scope), JSON.stringify(snapshot));
    } catch {
      throw new IntroError(
        'SAVE_FAILED',
        'Your response is still here, but could not be saved. Check browser storage and try again.',
      );
    }
  }

  private read(scope: IntroScope): IntroSnapshot | undefined {
    if (!this.storage)
      throw new IntroError(
        'SAVE_FAILED',
        'Browser storage is unavailable. Your opening cannot be saved yet.',
      );
    let raw: string | null;
    try {
      raw = this.storage.getItem(this.key(scope));
    } catch {
      throw new IntroError(
        'SAVE_FAILED',
        'Your saved opening could not be read. Check browser storage and reload.',
      );
    }
    if (raw === null) return undefined;
    try {
      const value: unknown = JSON.parse(raw);
      if (isIntroSnapshot(value)) return value;
    } catch {
      /* Preserve unreadable data for recovery; never overwrite it silently. */
    }
    throw new IntroError(
      'STATE_INVALID',
      'Your saved opening could not be read. It has been kept unchanged for recovery.',
    );
  }

  private key({ session: s, introVersion }: IntroScope): string {
    return [
      'forge',
      'project-intro',
      s.tenantId,
      s.classId ?? '',
      s.studentId ?? s.actorId,
      s.teamId ?? '',
      s.attemptId ?? '',
      s.projectId,
      s.projectVersion,
      introVersion,
    ]
      .map(encodeURIComponent)
      .join(':');
  }
}
