import type {
  AssetStorageAdapter,
  AssetUploadInput,
  StoredAsset,
} from '../../core/state/persistence-contracts';

/** Device-local durable object storage. Consumers revoke returned object URLs. */
export class IndexedDbAssetStorageAdapter implements AssetStorageAdapter {
  constructor(private readonly scope: string) {}
  private open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('forge-media', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('assets');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async upload(input: AssetUploadInput): Promise<StoredAsset> {
    if (input.file.size > 100 * 1024 * 1024)
      throw new Error('ASSET_TOO_LARGE: Maximum recording size is 100 MB.');
    if (!/^(video|audio)\//.test(input.contentType)) throw new Error('ASSET_TYPE_UNSUPPORTED');
    const id = crypto.randomUUID();
    const asset: StoredAsset = {
      id,
      reference: `indexeddb:${id}`,
      fileName: input.fileName,
      contentType: input.contentType,
      size: input.file.size,
      metadata: input.metadata,
    };
    const db = await this.open();
    try {
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction('assets', 'readwrite');
        transaction.objectStore('assets').put({ asset, blob: input.file }, `${this.scope}:${id}`);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error ?? new Error('ASSET_WRITE_ABORTED'));
      });
    } finally {
      db.close();
    }
    return asset;
  }
  async getReference(assetId: string): Promise<StoredAsset> {
    const db = await this.open();
    try {
      return await new Promise<StoredAsset>((resolve, reject) => {
        const request = db
          .transaction('assets', 'readonly')
          .objectStore('assets')
          .get(`${this.scope}:${assetId}`);
        request.onsuccess = () => {
          const value = request.result as { asset: StoredAsset; blob: Blob } | undefined;
          if (!value) {
            reject(new Error('ASSET_NOT_FOUND'));
            return;
          }
          resolve({ ...value.asset, reference: URL.createObjectURL(value.blob) });
        };
        request.onerror = () => reject(request.error);
      });
    } finally {
      db.close();
    }
  }
}
