import type {
  SimulationAdapter,
  SimulationConfig,
  SimulationTrialResult,
} from '../../../shared/activities/activity-contracts';

export interface DeterministicSimulationSettings {
  keyFields: string[];
  outcomeTable: Record<string, Record<string, unknown>>;
}

export class DeterministicSimulationAdapter implements SimulationAdapter {
  private config?: SimulationConfig;
  private settings?: DeterministicSimulationSettings;
  private inputs: Record<string, unknown> = {};
  private running = false;
  private trialNumber = 0;

  initialize(config: SimulationConfig): void {
    const settings = config.settings as Partial<DeterministicSimulationSettings> | undefined;
    if (
      settings === undefined ||
      !Array.isArray(settings.keyFields) ||
      settings.outcomeTable === undefined
    ) {
      throw new Error(`Simulation "${config.id}" requires keyFields and an outcomeTable.`);
    }
    this.config = structuredClone(config);
    this.settings = {
      keyFields: [...settings.keyFields],
      outcomeTable: structuredClone(settings.outcomeTable),
    };
    this.resetTrial();
  }

  setInputs(inputs: Record<string, unknown>): void {
    if (this.running) {
      throw new Error('Simulation inputs cannot change during a running trial.');
    }
    this.inputs = structuredClone(inputs);
  }

  beginTrial(): void {
    if (this.config === undefined || this.settings === undefined) {
      throw new Error('Simulation must be initialized before a trial begins.');
    }
    this.running = true;
  }

  endTrial(): SimulationTrialResult {
    if (!this.running || this.config === undefined || this.settings === undefined) {
      throw new Error('A simulation trial must be running before it can end.');
    }
    const key = this.settings.keyFields.map((field) => String(this.inputs[field] ?? '')).join('::');
    const outputs = this.settings.outcomeTable[key];
    if (outputs === undefined) {
      throw new Error(`Simulation "${this.config.id}" has no outcome for "${key}".`);
    }
    this.running = false;
    this.trialNumber += 1;
    return {
      trialId: `${this.config.id}-trial-${this.trialNumber}`,
      inputs: structuredClone(this.inputs),
      outputs: structuredClone(outputs),
    };
  }

  resetTrial(): void {
    this.inputs = {};
    this.running = false;
  }
}
