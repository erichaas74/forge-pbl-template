import { InjectionToken, type Type } from '@angular/core';

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
