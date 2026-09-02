import type {
  ProjectTemplateRegistration,
  ProjectTemplateRuntime,
  TemplateRegistryError,
  TemplateRegistryErrorCode,
  TemplateRegistryResult,
} from './template-contracts';

interface SemanticVersion {
  major: number;
  minor: number;
  patch: number;
}

export class TemplateRegistry {
  private readonly registrations = new Map<
    string,
    Map<string, Readonly<ProjectTemplateRegistration>>
  >();

  register<TRuntime extends ProjectTemplateRuntime>(
    registration: ProjectTemplateRegistration<TRuntime>,
  ): TemplateRegistryResult<TRuntime> {
    if (registration.id.length === 0 || registration.id.trim() !== registration.id) {
      return this.failure(
        'INVALID_TEMPLATE_ID',
        registration.id,
        undefined,
        'Template IDs must be non-empty and have no surrounding whitespace.',
      );
    }
    const registrationVersion = parseSemanticVersion(registration.version);
    if (registrationVersion === undefined) {
      return this.failure(
        'INVALID_TEMPLATE_VERSION',
        registration.id,
        registration.version,
        `Template registration "${registration.id}" must use a numeric x.y or x.y.z version.`,
      );
    }
    if (
      registration.compatibleTemplateMajorVersions.length === 0 ||
      registration.compatibleTemplateMajorVersions.some(
        (major) => !Number.isSafeInteger(major) || major < 0,
      )
    ) {
      return this.failure(
        'INVALID_TEMPLATE_COMPATIBILITY',
        registration.id,
        registration.version,
        'A template registration requires at least one non-negative compatible major version.',
      );
    }

    let versions = this.registrations.get(registration.id);
    if (versions === undefined) {
      versions = new Map();
      this.registrations.set(registration.id, versions);
    }
    const versionKey = normalizedVersion(registrationVersion);
    if (versions.has(versionKey)) {
      return this.failure(
        'DUPLICATE_TEMPLATE_REGISTRATION',
        registration.id,
        registration.version,
        `Template "${registration.id}" version "${registration.version}" is already registered.`,
      );
    }

    const stored = Object.freeze({
      ...registration,
      compatibleTemplateMajorVersions: Object.freeze([
        ...new Set(registration.compatibleTemplateMajorVersions),
      ]),
      projectTypes: Object.freeze([...registration.projectTypes]),
      packageDescriptor: Object.freeze({
        requiredFiles: Object.freeze([...registration.packageDescriptor.requiredFiles]),
        optionalFiles: Object.freeze([...registration.packageDescriptor.optionalFiles]),
      }),
    }) as Readonly<ProjectTemplateRegistration<TRuntime>>;
    versions.set(versionKey, stored);
    return { ok: true, value: stored };
  }

  resolve<TRuntime extends ProjectTemplateRuntime = ProjectTemplateRuntime>(
    templateId: string,
    requestedVersion: string,
  ): TemplateRegistryResult<TRuntime> {
    const requested = parseSemanticVersion(requestedVersion);
    if (requested === undefined) {
      return this.failure(
        'INVALID_TEMPLATE_VERSION',
        templateId,
        requestedVersion,
        `Requested template version "${requestedVersion}" is not numeric x.y or x.y.z.`,
      );
    }

    const versions = this.registrations.get(templateId);
    if (versions === undefined) {
      return this.failure(
        'TEMPLATE_NOT_FOUND',
        templateId,
        requestedVersion,
        `Template "${templateId}" is not registered.`,
      );
    }

    const compatible = [...versions.values()]
      .filter((registration) =>
        registration.compatibleTemplateMajorVersions.includes(requested.major),
      )
      .sort((left, right) => compareVersions(right.version, left.version));
    const selected = compatible[0];
    if (selected === undefined) {
      return this.failure(
        'TEMPLATE_VERSION_UNSUPPORTED',
        templateId,
        requestedVersion,
        `Template "${templateId}" has no implementation compatible with major version ${requested.major}.`,
      );
    }

    return {
      ok: true,
      value: selected as Readonly<ProjectTemplateRegistration<TRuntime>>,
    };
  }

  list(): readonly Readonly<ProjectTemplateRegistration>[] {
    return Object.freeze(
      [...this.registrations.values()]
        .flatMap((versions) => [...versions.values()])
        .sort(
          (left, right) =>
            left.id.localeCompare(right.id) || compareVersions(left.version, right.version),
        ),
    );
  }

  private failure<TRuntime extends ProjectTemplateRuntime>(
    code: TemplateRegistryErrorCode,
    templateId: string,
    requestedVersion: string | undefined,
    message: string,
  ): TemplateRegistryResult<TRuntime> {
    const error: TemplateRegistryError = Object.freeze({
      code,
      templateId,
      requestedVersion,
      message,
    });
    return { ok: false, error };
  }
}

function parseSemanticVersion(value: string): SemanticVersion | undefined {
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?$/.exec(value);
  if (match === null) {
    return undefined;
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3] ?? 0),
  };
}

function normalizedVersion(version: SemanticVersion): string {
  return `${version.major}.${version.minor}.${version.patch}`;
}

function compareVersions(left: string, right: string): number {
  const leftVersion = parseSemanticVersion(left)!;
  const rightVersion = parseSemanticVersion(right)!;
  return (
    leftVersion.major - rightVersion.major ||
    leftVersion.minor - rightVersion.minor ||
    leftVersion.patch - rightVersion.patch
  );
}
