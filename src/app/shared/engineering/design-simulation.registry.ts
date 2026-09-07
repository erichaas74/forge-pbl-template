import { InjectionToken, type Type, type TemplateRef } from '@angular/core';

/** Platform-owned renderers. Curriculum can select an ID, never an executable URL. */
export class DesignSimulationRegistry {
  private readonly entries = new Map<string, Type<unknown>>();
  register(id: string, component: Type<unknown>): void {
    if (this.entries.has(id)) throw new Error(`DUPLICATE_REGISTRATION: ${id}`);
    this.entries.set(id, component);
  }
  require(id: string): Type<unknown> {
    const component = this.entries.get(id);
    if (!component) throw new Error(`CAPABILITY_NOT_INSTALLED: ${id}`);
    return component;
  }
}
export const DESIGN_SIMULATIONS = new InjectionToken<DesignSimulationRegistry>(
  'DESIGN_SIMULATIONS',
);
export const DESIGN_CAPTURE = new InjectionToken<
  (capture: import('./block-design').DesignCapture) => void
>('DESIGN_CAPTURE');
export const DESIGN_CAPTURE_BATCH = new InjectionToken<
  (captures: readonly import('./block-design').DesignCapture[]) => void
>('DESIGN_CAPTURE_BATCH');
export const DESIGN_CHECKS_CHANGE = new InjectionToken<
  (checks: readonly import('./block-design').DesignCheck[]) => void
>('DESIGN_CHECKS_CHANGE');
/** Local navigation only; this callback never changes saved learner work. */
export const DESIGN_VIEW_REQUEST = new InjectionToken<(view: 'build' | 'observe') => void>(
  'DESIGN_VIEW_REQUEST',
);
/** Validated design changes requested by an installed simulation, saved by the runtime. */
export const DESIGN_CHANGE = new InjectionToken<
  (design: import('./block-design').BlockDesign) => void
>('DESIGN_CHANGE');

/** Optional local composition: installed renderers contribute controls to one workspace header. */
export interface DesignChrome {
  readonly toolbar: TemplateRef<unknown>;
  readonly guide: TemplateRef<unknown>;
}
export const DESIGN_CHROME = new InjectionToken<(chrome: DesignChrome | undefined) => void>(
  'DESIGN_CHROME',
);
