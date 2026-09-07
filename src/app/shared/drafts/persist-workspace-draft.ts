import { DestroyRef, effect, inject } from '@angular/core';
import { DraftAutosaveController } from './draft-autosave';
import { WORKSPACE_DRAFTS } from './workspace-drafts';
import { DOCUMENT } from '@angular/common';

/** Call in an injection context. Store bounded UI drafts, never animation state. */
export function persistWorkspaceDraft<T>(
  key: string,
  read: () => T,
  restore: (value: T) => void,
): () => void {
  const store = inject(WORKSPACE_DRAFTS, { optional: true });
  const saved = store?.read<T>(key);
  if (saved) restore(saved);
  const controller = new DraftAutosaveController<T>((value) => store?.write(key, value), 500);
  effect(() => controller.schedule(read()));
  const flush = () => {
    controller.schedule(read());
    void controller.flush();
  };
  const document = inject(DOCUMENT);
  const window = document.defaultView;
  const onHidden = () => {
    if (document.visibilityState === 'hidden') flush();
  };
  window?.addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', onHidden);
  inject(DestroyRef).onDestroy(() => {
    flush();
    window?.removeEventListener('pagehide', flush);
    document.removeEventListener('visibilitychange', onHidden);
  });
  return flush;
}
