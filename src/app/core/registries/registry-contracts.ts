export interface RegistryEntry {
  readonly id: string;
}

export type RegistryErrorCode =
  | 'DUPLICATE_REGISTRATION'
  | 'REGISTRATION_NOT_FOUND'
  | 'INVALID_REGISTRATION_ID';

export interface RegistryError {
  readonly code: RegistryErrorCode;
  readonly registry: string;
  readonly id: string;
  readonly message: string;
}

export type RegistryResult<T> =
  | { readonly ok: true; readonly value: Readonly<T> }
  | { readonly ok: false; readonly error: RegistryError };

export interface RegistryView<T extends RegistryEntry> {
  has(id: string): boolean;
  get(id: string): Readonly<T> | undefined;
  resolve(id: string): RegistryResult<T>;
  list(): readonly Readonly<T>[];
}

export interface MutableRegistry<T extends RegistryEntry>
  extends RegistryView<T> {
  register(entry: T): RegistryResult<T>;
  registerAll(entries: readonly T[]): readonly RegistryResult<T>[];
}

