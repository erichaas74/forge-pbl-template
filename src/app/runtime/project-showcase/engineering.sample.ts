import { calendarMonumentSample } from '../../projects/calendar-monument/calendar-monument.sample';
import { EngineeringExhibitComponent } from '../../templates/engineering-design/ui/engineering-exhibit.component';
import type { CompletedSample } from './completed-sample';
export function loadSample(): CompletedSample {
  return {
    title: 'The Three-Marker Tower',
    subtitle:
      'A fictional, measured calendar-monument exhibit with rounded reference calculations.',
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
    component: EngineeringExhibitComponent,
    providers: [],
    inputs: { title: 'The Three-Marker Tower', snapshot: structuredClone(calendarMonumentSample) },
  };
}
