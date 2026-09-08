import { calendarMonumentSample } from '../../projects/calendar-monument/calendar-monument.sample';
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
    title: 'The Jewel Circle Solar Calendar',
    subtitle: 'A carved stone circle, bronze crystal and jeweled windows with four tested seasonal alignments.',
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
        text: 'Arrange eight gates, four pierced standing stones and a bronze crystal on a stepped base. Three roof jewels align with measured seasonal sunstones; the outer windows add new light patterns.',
      },
      {
        label: 'Revision',
        title: 'Question the precision',
        text: 'Narrow the blue opening to distinguish nearby equinox dates. The solstice markers still match nearby days, showing the calendar’s limits.',
      },
    ],
    review: {
      strength:
        'All four tests connect the same stonework and jeweled openings to measured seasonal light targets.',
      question: 'How many nearby dates reach each target?',
      revision:
        'Compare a wide and narrow equinox opening, then explain why the solstice markers still match a week before and after.',
      assessment:
        'Assess science, reproducibility, evidence, and revision. This is a fictional sample, not a verified physical test.',
    },
    component: EngineeringFinalDemoComponent,
    providers: [{ provide: DESIGN_SIMULATIONS, useValue: registry }],
    inputs: {
      projectId: 'calendar-monument',
      title: 'The Jewel Circle Solar Calendar',
      snapshot: structuredClone(calendarMonumentSample),
      simulationId: 'simulation.solar-monument',
    },
  };
}
