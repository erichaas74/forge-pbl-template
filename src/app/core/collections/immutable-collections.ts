export class ImmutableMap<K, V> implements ReadonlyMap<K, V> {
  private readonly storage: Map<K, V>;

  constructor(entries: Iterable<readonly [K, V]> = []) {
    this.storage = new Map(entries);
  }

  get size(): number {
    return this.storage.size;
  }

  get(key: K): V | undefined {
    return this.storage.get(key);
  }

  has(key: K): boolean {
    return this.storage.has(key);
  }

  entries(): MapIterator<[K, V]> {
    return this.storage.entries();
  }

  keys(): MapIterator<K> {
    return this.storage.keys();
  }

  values(): MapIterator<V> {
    return this.storage.values();
  }

  forEach(
    callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void,
    thisArg?: unknown,
  ): void {
    this.storage.forEach((value, key) => callbackfn.call(thisArg, value, key, this));
  }

  [Symbol.iterator](): MapIterator<[K, V]> {
    return this.entries();
  }

  get [Symbol.toStringTag](): string {
    return 'ImmutableMap';
  }
}

export class ImmutableSet<T> implements ReadonlySet<T> {
  private readonly storage: Set<T>;

  constructor(values: Iterable<T> = []) {
    this.storage = new Set(values);
  }

  get size(): number {
    return this.storage.size;
  }

  has(value: T): boolean {
    return this.storage.has(value);
  }

  entries(): SetIterator<[T, T]> {
    return this.storage.entries();
  }

  keys(): SetIterator<T> {
    return this.storage.keys();
  }

  values(): SetIterator<T> {
    return this.storage.values();
  }

  forEach(
    callbackfn: (value: T, value2: T, set: ReadonlySet<T>) => void,
    thisArg?: unknown,
  ): void {
    this.storage.forEach((value) => callbackfn.call(thisArg, value, value, this));
  }

  [Symbol.iterator](): SetIterator<T> {
    return this.values();
  }

  get [Symbol.toStringTag](): string {
    return 'ImmutableSet';
  }
}
