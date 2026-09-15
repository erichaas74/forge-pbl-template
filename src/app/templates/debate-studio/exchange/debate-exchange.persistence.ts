import { InjectionToken } from '@angular/core';
import { ScopedBrowserStore, safeBrowserStorage, type WorkspaceStorageScope } from '../../../shared/persistence/scoped-browser-store';
import type { DebateStudioProjectConfig } from '../domain/debate-studio.models';
import { applyExchangeCommand, emptyExchange, type DebateDraft, type DebateExchangeState, type ExchangeCommand } from './debate-exchange.models';

export interface DebateExchangePort {
  load(practice: boolean): DebateExchangeState;
  save(state: DebateExchangeState, practice: boolean): void;
  loadDrafts(practice: boolean): Readonly<Record<string, DebateDraft>>;
  saveDrafts(drafts: Readonly<Record<string, DebateDraft>>, practice: boolean): void;
  saveMedia(blob: Blob): Promise<string>;
  loadMedia(id: string): Promise<Blob | undefined>;
}
export const DEBATE_EXCHANGE_PORT = new InjectionToken<DebateExchangePort>('DEBATE_EXCHANGE_PORT');
const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);

/** File exchange has no authentication. Imported work is classroom practice, never official grades. */
export function mergeExchange(current: DebateExchangeState, value: unknown, config: DebateStudioProjectConfig): DebateExchangeState {
  if (!record(value) || value['schemaVersion'] !== '1.0' || !['contributions', 'critiques', 'ballots'].every(key => Array.isArray(value[key]) && (value[key] as unknown[]).length <= 1000)) throw new Error('Invalid debate exchange file.');
  const incoming = value as unknown as DebateExchangeState;
  let pending: ExchangeCommand[] = [
    ...incoming.contributions.map(entry => ({ type: 'debate.exchange.submit' as const, value: entry })),
    ...incoming.critiques.map(entry => ({ type: 'debate.exchange.critique' as const, value: entry })),
    ...incoming.ballots.map(entry => ({ type: 'debate.exchange.rank' as const, value: entry })),
  ];
  let next = current;
  while (pending.length) {
    const retry: ExchangeCommand[] = [];
    let reason = 'Missing argument or feedback reference.';
    for (const command of pending) {
      try { next = applyExchangeCommand(next, command, config); }
      catch (error) { retry.push(command); reason = error instanceof Error ? error.message : reason; }
    }
    if (retry.length === pending.length) throw new Error(`Exchange could not be imported: ${reason}`);
    pending = retry;
  }
  return next;
}

export class BrowserDebateExchangeAdapter implements DebateExchangePort {
  private readonly history: ScopedBrowserStore<unknown>;
  private readonly drafts: ScopedBrowserStore<Readonly<Record<string, DebateDraft>>>;
  constructor(private readonly config: DebateStudioProjectConfig, private readonly scope: WorkspaceStorageScope, private readonly storage = safeBrowserStorage()) {
    this.history = new ScopedBrowserStore('debate-exchange-v1', storage, (_value): _value is unknown => true);
    this.drafts = new ScopedBrowserStore('debate-exchange-drafts-v1', storage, (value): value is Readonly<Record<string, DebateDraft>> => record(value) && Object.values(value).every(draft => record(draft) && typeof draft['side'] === 'string' && typeof draft['speech'] === 'string' && Array.isArray(draft['points']) && draft['points'].every(point => typeof point === 'string') && Array.isArray(draft['evidenceIds']) && draft['evidenceIds'].every(id => typeof id === 'string') && Array.isArray(draft['reviewIds']) && typeof draft['group'] === 'string' && typeof draft['changeNote'] === 'string'));
  }
  private scoped(practice: boolean): WorkspaceStorageScope { return { ...this.scope, sessionId: practice ? 'practice' : 'classroom' }; }
  load(practice: boolean): DebateExchangeState {
    const value = this.history.load(this.scoped(practice));
    return value === undefined ? emptyExchange() : mergeExchange(emptyExchange(), value, this.config);
  }
  save(state: DebateExchangeState, practice: boolean): void {
    if (!this.storage) throw new Error('Browser storage is unavailable. Export your debate before leaving.');
    this.history.save(this.scoped(practice), state);
  }
  loadDrafts(practice: boolean): Readonly<Record<string, DebateDraft>> { return this.drafts.load(this.scoped(practice)) ?? {}; }
  saveDrafts(value: Readonly<Record<string, DebateDraft>>, practice: boolean): void {
    if (!this.storage) throw new Error('Draft is in memory only; browser storage is unavailable.');
    this.drafts.save(this.scoped(practice), value);
  }
  private async database(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('forge-debate-recordings-v1', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('recordings');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Recording storage is unavailable. Keep your original media file.'));
    });
  }
  private mediaKey(id: string): string { return [this.scope.tenantId, this.scope.projectId, this.scope.projectVersion, this.scope.classId, this.scope.actorId, this.scope.attemptId, id].map(value => encodeURIComponent(value ?? '')).join(':'); }
  async saveMedia(blob: Blob): Promise<string> {
    const id = crypto.randomUUID();
    const db = await this.database();
    try {
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction('recordings', 'readwrite');
        transaction.objectStore('recordings').put(blob, this.mediaKey(id));
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(new Error('Recording could not be saved. Keep your original file.'));
        transaction.onabort = () => reject(new Error('Recording save was interrupted.'));
      });
      return id;
    } finally { db.close(); }
  }
  async loadMedia(id: string): Promise<Blob | undefined> {
    const db = await this.database();
    try {
      return await new Promise<Blob | undefined>((resolve, reject) => {
        const request = db.transaction('recordings').objectStore('recordings').get(this.mediaKey(id));
        request.onsuccess = () => resolve(request.result instanceof Blob ? request.result : undefined);
        request.onerror = () => reject(new Error('Recording could not be loaded.'));
      });
    } finally { db.close(); }
  }
}

export function exchangeFile(config: DebateStudioProjectConfig, state: DebateExchangeState): string {
  // Drafts and private context answers never leave the local workspace.
  return JSON.stringify({ format: 'forge-debate-exchange', projectId: config.projectId, projectVersion: config.projectVersion, state }, null, 2);
}
export function importExchangeFile(config: DebateStudioProjectConfig, current: DebateExchangeState, raw: string): DebateExchangeState {
  if (raw.length > 4_000_000) throw new Error('Exchange files must be smaller than 4 MB.');
  const packet: unknown = JSON.parse(raw);
  if (!record(packet) || packet['format'] !== 'forge-debate-exchange' || packet['projectId'] !== config.projectId || packet['projectVersion'] !== config.projectVersion) throw new Error('Choose an exchange file for this project and version.');
  return mergeExchange(current, packet['state'], config);
}
