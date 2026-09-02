import type {
  AssetStorageAdapter,
  AssetUploadInput,
  StoredAsset,
} from '../../core/state/persistence-contracts';

export class InMemoryAssetStorageAdapter implements AssetStorageAdapter {
  private readonly assets = new Map<string, StoredAsset>();
  private nextId = 1;

  async upload(input: AssetUploadInput): Promise<StoredAsset> {
    const id = `asset-local-${this.nextId}`;
    this.nextId += 1;
    const asset: StoredAsset = {
      id,
      reference: `memory://${id}`,
      fileName: input.fileName,
      contentType: input.contentType,
      size: input.file.size,
      metadata: input.metadata === undefined ? undefined : { ...input.metadata },
    };
    this.assets.set(id, Object.freeze(asset));
    return { ...asset };
  }

  async getReference(assetId: string): Promise<StoredAsset> {
    const asset = this.assets.get(assetId);
    if (asset === undefined) {
      throw new Error(`Asset "${assetId}" was not found.`);
    }
    return { ...asset };
  }
}

