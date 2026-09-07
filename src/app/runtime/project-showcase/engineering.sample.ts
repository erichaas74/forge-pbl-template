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
    title: 'The Three-Marker Tower',
    subtitle: 'An interactive seasonal demonstration of a fictional, measured block monument.',
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
        text: 'Use measured blocks, coordinates, and a true-north base.',
      },
      {
        label: 'Revision',
        title: 'Question the precision',
        text: 'The two equinoxes share a marker. Nearby dates can produce nearly the same shadow.',
      },
    ],
    review: {
      strength: 'The design connects seasonal angles with measured targets.',
      question: 'How many nearby dates reach each target?',
      revision: 'Use simulated and outdoor observations to refine the marker positions.',
      assessment:
        'Assess science, reproducibility, evidence, and revision. This is a fictional sample, not a verified physical test.',
    },
    component: EngineeringFinalDemoComponent,
    providers: [{ provide: DESIGN_SIMULATIONS, useValue: registry }],
    inputs: {
      title: 'The Three-Marker Tower',
      snapshot: structuredClone(calendarMonumentSample),
      simulationId: 'simulation.solar-monument',
    },
  };
}
