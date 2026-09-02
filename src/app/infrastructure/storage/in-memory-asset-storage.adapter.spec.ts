import { InMemoryAssetStorageAdapter } from './in-memory-asset-storage.adapter';

describe('InMemoryAssetStorageAdapter', () => {
  it('stores a bounded asset reference instead of embedding file data in runtime', async () => {
    const adapter = new InMemoryAssetStorageAdapter();

    const stored = await adapter.upload({
      file: new Blob(['fixture'], { type: 'text/plain' }),
      fileName: 'fixture.txt',
      contentType: 'text/plain',
    });

    expect(stored).toMatchObject({
      id: 'asset-local-1',
      reference: 'memory://asset-local-1',
      contentType: 'text/plain',
      size: 7,
    });
    await expect(adapter.getReference(stored.id)).resolves.toEqual(stored);
  });
});

