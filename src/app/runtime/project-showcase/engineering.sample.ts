import { solsticeGatesSample } from '../../projects/calendar-monument/calendar-monument.solstice-sample';
import { EngineeringFinalDemoComponent } from '../../templates/engineering-design/ui/engineering-final-demo.component';
import { SolarMonumentComponent } from '../../plugins/simulations/solar-monument/solar-monument.component';
import {
  DESIGN_SIMULATIONS,
  DesignSimulationRegistry,
} from '../../shared/engineering/design-simulation.registry';
import type { CompletedSample } from './completed-sample';
export function loadSample(): CompletedSample {
  const registry = new DesignSimulationRegistry();
  registry.register('simulation.solar-monument', SolarMonumentComponent);
  return {
    integratedHeader: true,
    title: 'Solstice Windows',
    subtitle:
      'Horizontal holes send summer and winter morning sunlight onto marks on a central pillar.',
    audience: 'Classmates and families',
    duration: '3–5 minute exhibit',
    trail: [
      {
        label: 'Research',
        title: 'Find the cause',
        text: 'Connect Earth’s tilt to Sun altitude and shadow length.',
      },
      {
        label: 'Design',
        title: 'Make it reproducible',
        text: 'Build two upright window stones and one receiving pillar. Aim each horizontal bore at its fixed summer or winter mark, 3 m away.',
      },
      {
        label: 'Revision',
        title: 'Question the precision',
        text: 'The starter’s summer window misses its mark. Move that window until light reaches the fixed carving, then retest December and nearby dates.',
      },
    ],
    review: {
      strength:
        'Verified rays pass through the complete horizontal bores and land on the central pillar’s marks. Each mark misses the opposite solstice.',
      question: 'How many nearby dates reach each target?',
      revision:
        'Seal a hole or shift its window, then compare the mark. Explain why nearby solstice dates can also align.',
      assessment:
        'Assess science, reproducibility, evidence, and revision. This is a fictional sample, not a verified physical test.',
    },
    component: EngineeringFinalDemoComponent,
    providers: [{ provide: DESIGN_SIMULATIONS, useValue: registry }],
    inputs: {
      projectId: 'calendar-monument',
      title: 'Solstice Windows',
      snapshot: structuredClone(solsticeGatesSample),
      simulationId: 'simulation.solar-monument',
    },
  };
}
