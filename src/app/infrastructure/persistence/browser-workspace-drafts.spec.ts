import { BrowserWorkspaceDrafts } from './browser-workspace-drafts';
import { createLocalPreviewSession } from '../../core/context/project-session-context';

describe('Browser workspace drafts', () => {
  it('restores drafts only for the same project and learner, with defensive copies', () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => {
        values.set(key, value);
      },
    };
    const session = createLocalPreviewSession('mystery-substance', '1.0.0');
    new BrowserWorkspaceDrafts(session, storage).write('water', { note: 'Cloudy' });
    const restored = new BrowserWorkspaceDrafts(session, storage);
    expect(restored.read('water')).toEqual({ note: 'Cloudy' });
    expect(
      new BrowserWorkspaceDrafts({ ...session, studentId: 'other' }, storage).read('water'),
    ).toBeUndefined();
    expect(
      new BrowserWorkspaceDrafts({ ...session, projectId: 'other' }, storage).read('water'),
    ).toBeUndefined();
    restored.write('water', { note: 'Clear' });
    restored.read<{ note: string }>('water')!.note = 'Changed outside store';
    expect(restored.read('water')).toEqual({ note: 'Clear' });
  });

  it('keeps the session draft if storage is unavailable and ignores invalid JSON', () => {
    const store = new BrowserWorkspaceDrafts(createLocalPreviewSession('mystery', '1.0.0'), {
      getItem: () => '{',
      setItem: () => {
        throw new Error('Storage unavailable');
      },
    });
    expect(store.read('draft')).toBeUndefined();
    store.write('draft', { observation: 'Saved in this session' });
    expect(store.read('draft')).toEqual({ observation: 'Saved in this session' });
  });
});
