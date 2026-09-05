import { InjectionToken, type Type } from '@angular/core';

import type { ExhibitProjectConfig } from '../domain/exhibit-types';
import type { ExhibitPersistenceAdapter } from '../persistence/exhibit-persistence';

export interface ExhibitRendererComponentInputs {
  data: unknown;
  mode: 'thumbnail' | 'walkup' | 'preview';
}

export interface ExhibitRendererComponentRegistration {
  readonly rendererType: string;
  readonly component: Type<ExhibitRendererComponentInputs>;
}

export const EXHIBIT_HALL_CONFIG = new InjectionToken<ExhibitProjectConfig>('EXHIBIT_HALL_CONFIG');
export const EXHIBIT_HALL_PERSISTENCE = new InjectionToken<ExhibitPersistenceAdapter>(
  'EXHIBIT_HALL_PERSISTENCE',
);
export const EXHIBIT_RENDERER_COMPONENTS = new InjectionToken<
  readonly ExhibitRendererComponentRegistration[]
>('EXHIBIT_RENDERER_COMPONENTS');
