import type { ExhibitRenderer, ExhibitTemplateDefinition } from '../domain/exhibit-types';

export type ExhibitRegistryResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly code: string; readonly message: string };

export class ExhibitTemplateRegistry {
  private readonly templates = new Map<string, ExhibitTemplateDefinition>();

  register(template: ExhibitTemplateDefinition): ExhibitRegistryResult<ExhibitTemplateDefinition> {
    const key = `${template.templateId}@${template.version}`;
    if (this.templates.has(key)) {
      return {
        ok: false,
        code: 'DUPLICATE_TEMPLATE_REGISTRATION',
        message: `Exhibit template ${key} is already registered.`,
      };
    }
    const stored = Object.freeze(structuredClone(template));
    this.templates.set(key, stored);
    return { ok: true, value: stored };
  }

  resolve(templateId: string, version: number): ExhibitRegistryResult<ExhibitTemplateDefinition> {
    const value = this.templates.get(`${templateId}@${version}`);
    return value === undefined
      ? {
          ok: false,
          code: 'CAPABILITY_NOT_INSTALLED',
          message: `Exhibit template ${templateId}@${version} is not registered.`,
        }
      : { ok: true, value };
  }

  list(): readonly ExhibitTemplateDefinition[] {
    return [...this.templates.values()];
  }
}

export class ExhibitRendererRegistry {
  private readonly renderers = new Map<string, ExhibitRenderer>();

  register(renderer: ExhibitRenderer): ExhibitRegistryResult<ExhibitRenderer> {
    if (this.renderers.has(renderer.type)) {
      return {
        ok: false,
        code: 'DUPLICATE_RENDERER_REGISTRATION',
        message: `Exhibit renderer ${renderer.type} is already registered.`,
      };
    }
    this.renderers.set(renderer.type, renderer);
    return { ok: true, value: renderer };
  }

  resolve(type: string): ExhibitRegistryResult<ExhibitRenderer> {
    const value = this.renderers.get(type);
    return value === undefined
      ? {
          ok: false,
          code: 'CAPABILITY_NOT_INSTALLED',
          message: `Exhibit renderer ${type} is not registered.`,
        }
      : { ok: true, value };
  }
}
