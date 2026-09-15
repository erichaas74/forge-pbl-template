import { InjectionToken } from '@angular/core';
import { matchTopic } from './panorama.engine';
import type { PanoramaDefinition, PanoramaMessage, PanoramaPerson } from './panorama.models';

export interface PanoramaInterviewAdapter {
  readonly mode: 'scripted' | 'ai';
  answer(scene: PanoramaDefinition, person: PanoramaPerson, question: string, history: readonly PanoramaMessage[], signal: AbortSignal): Promise<PanoramaMessage>;
}
export class ScriptedPanoramaInterview implements PanoramaInterviewAdapter {
  readonly mode = 'scripted' as const;
  async answer(_scene: PanoramaDefinition, person: PanoramaPerson, question: string): Promise<PanoramaMessage> {
    const topic = matchTopic(person, question);
    return { role: 'character', text: topic?.reply ?? 'I do not have a prepared answer to that question in this preview. Try asking one of the questions below about my work.', sourceIds: topic?.sourceIds ?? [] };
  }
}
/** A host can provide an authenticated server adapter. No provider or credentials belong in the component. */
export const PANORAMA_INTERVIEW = new InjectionToken<PanoramaInterviewAdapter>('PANORAMA_INTERVIEW', { providedIn: 'root', factory: () => new ScriptedPanoramaInterview() });
