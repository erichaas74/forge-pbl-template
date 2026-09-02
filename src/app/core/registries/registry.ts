import type {
  MutableRegistry,
  RegistryEntry,
  RegistryError,
  RegistryResult,
} from './registry-contracts';

export class Registry<T extends RegistryEntry> implements MutableRegistry<T> {
  private readonly entries = new Map<string, Readonly<T>>();

  constructor(readonly name: string) {}

  register(entry: T): RegistryResult<T> {
    if (entry.id.length === 0 || entry.id.trim() !== entry.id) {
      return this.failure(
        'INVALID_REGISTRATION_ID',
        entry.id,
        `Registry "${this.name}" requires a non-empty ID without surrounding whitespace.`,
      );
    }

    if (this.entries.has(entry.id)) {
      return this.failure(
        'DUPLICATE_REGISTRATION',
        entry.id,
        `Registration "${entry.id}" already exists in registry "${this.name}".`,
      );
    }

    const storedEntry = Object.freeze({ ...entry }) as Readonly<T>;
    this.entries.set(entry.id, storedEntry);

    return { ok: true, value: storedEntry };
  }

  registerAll(entries: readonly T[]): readonly RegistryResult<T>[] {
    return entries.map((entry) => this.register(entry));
  }

  has(id: string): boolean {
    return this.entries.has(id);
  }

  get(id: string): Readonly<T> | undefined {
    return this.entries.get(id);
  }

  resolve(id: string): RegistryResult<T> {
    const entry = this.entries.get(id);

    if (entry === undefined) {
      return this.failure(
        'REGISTRATION_NOT_FOUND',
        id,
        `Registration "${id}" was not found in registry "${this.name}".`,
      );
    }

    return { ok: true, value: entry };
  }

  list(): readonly Readonly<T>[] {
    return Object.freeze(
      [...this.entries.values()].sort((left, right) =>
        left.id.localeCompare(right.id),
      ),
    );
  }

  private failure(
    code: RegistryError['code'],
    id: string,
    message: string,
  ): RegistryResult<T> {
    return {
      ok: false,
      error: Object.freeze({ code, registry: this.name, id, message }),
    };
  }
}

