import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/infrastructure/storage/indexeddb-asset-storage.adapter.ts
var IndexedDbAssetStorageAdapter = class {
  constructor(scope) {
    this.scope = scope;
  }
  scope;
  open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("forge-media", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("assets");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  async upload(input) {
    if (input.file.size > 100 * 1024 * 1024)
      throw new Error("ASSET_TOO_LARGE: Maximum recording size is 100 MB.");
    if (!/^(video|audio)\//.test(input.contentType)) throw new Error("ASSET_TYPE_UNSUPPORTED");
    const id = crypto.randomUUID();
    const asset = {
      id,
      reference: `indexeddb:${id}`,
      fileName: input.fileName,
      contentType: input.contentType,
      size: input.file.size,
      metadata: input.metadata
    };
    const db = await this.open();
    try {
      await new Promise((resolve, reject) => {
        const transaction = db.transaction("assets", "readwrite");
        transaction.objectStore("assets").put({ asset, blob: input.file }, `${this.scope}:${id}`);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error ?? new Error("ASSET_WRITE_ABORTED"));
      });
    } finally {
      db.close();
    }
    return asset;
  }
  async getReference(assetId) {
    const db = await this.open();
    try {
      return await new Promise((resolve, reject) => {
        const request = db.transaction("assets", "readonly").objectStore("assets").get(`${this.scope}:${assetId}`);
        request.onsuccess = () => {
          const value = request.result;
          if (!value) {
            reject(new Error("ASSET_NOT_FOUND"));
            return;
          }
          resolve(__spreadProps(__spreadValues({}, value.asset), { reference: URL.createObjectURL(value.blob) }));
        };
        request.onerror = () => reject(request.error);
      });
    } finally {
      db.close();
    }
  }
};

export {
  IndexedDbAssetStorageAdapter
};
//# debugId=6c24e367-4e4c-5fd1-a146-50cf116e6fdc
//# sourceMappingURL=chunk-UMZJFDZE.js.map
