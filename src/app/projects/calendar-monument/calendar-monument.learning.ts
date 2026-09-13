import type { EngineeringDesignConfig } from '../../templates/engineering-design/domain/engineering-design.models';
import {
  sundialWalkthrough,
  seasonalWalkthrough,
  tiltWalkthrough,
  calendarWalkthrough,
  monumentWalkthrough,
} from './calendar-monument.walkthrough';

export const calendarMonumentLearning: NonNullable<EngineeringDesignConfig['learningSequence']> = {
  practiceDesign: {
    blocks: [
      { id: 'practice-post', x: 0, y: 0, z: 0, width: 0.08, depth: 0.08, height: 0.6, rotation: 0 },
    ],
    targets: [],
  },
  steps: [
    {
      id: 'make-a-sundial',
      tasks: sundialWalkthrough,
      title: 'Build a sundial',
      workspace: 'practice',
      activity: 'sundial-build',
      showGuides: false,
      introduction: 'Can a shadow tell the time? Start with a vertical post on a level stone dial.',
      instructions: sundialWalkthrough.map((task) => task.instruction),
      question: {
        researchId: 'daily-sun',
        prompt: 'What pattern did you notice as your sundial’s shadow moved through one day?',
      },
    },
    {
      id: 'season-surprise',
      tasks: seasonalWalkthrough,
      title: 'A seasonal surprise',
      workspace: 'practice',
      activity: 'sundial-seasons',
      showGuides: false,
      introduction:
        'Keep the same sundial and its original marks. Now change the season. Why do you think the shadow tip misses the old marks?',
      instructions: seasonalWalkthrough.map((task) => task.instruction),
      question: {
        researchId: 'season-noticing',
        prompt:
          'The sundial did not move. Why do you think its shadow tip misses some old marks now? What did you observe?',
      },
    },
    {
      id: 'explain-the-tilt',
      tasks: tiltWalkthrough,
      title: 'Why the shadows change',
      workspace: 'practice',
      activity: 'sundial-tilt',
      introduction: 'Connect your sundial observations to a turning, tilted Earth.',
      instructions: tiltWalkthrough.map((task) => task.instruction),
      explanation:
        'Earth’s daily turn makes the Sun appear to cross the sky. Earth’s axis is tilted about 23.4° and keeps pointing nearly the same way as Earth orbits the Sun. This changes the Sun’s daily path and daylight duration at your site. A higher Sun gives a shorter shadow; a lower Sun gives a longer one. Northern and southern places have opposite seasons. Our simple dial uses a vertical post and fixed shadow-tip marks. More advanced sundials use a tilted pointer to keep their hour lines useful through the year. Clock time and solar time can also differ, so use solar noon for a fair seasonal comparison.',
      question: {
        researchId: 'seasons',
        prompt:
          'Revise your explanation: how does Earth’s tilt help explain the seasonal change in your sundial’s shadows?',
      },
    },
    {
      id: 'mark-the-year',
      tasks: calendarWalkthrough,
      title: 'Mark the sundial’s year',
      workspace: 'practice',
      activity: 'sundial-calendar',
      introduction: 'First challenge: make your sundial mark the equinoxes and solstices.',
      instructions: calendarWalkthrough.map((task) => task.instruction),
      explanation:
        'At an equinox the Sun crosses the celestial equator. March and September have similar Sun paths, so their noon marks are close. Solstices mark the yearly extremes in the Sun’s path. In the tropics, the highest noon Sun can occur on other dates. A shadow covering a mark is only part of the evidence: compare the tip and nearby dates too.',
      question: {
        researchId: 'dial-calendar',
        prompt:
          'Which marks help your sundial show the time of year? Explain the equinox pair and why a solstice can be hard to identify to one exact day.',
      },
    },
    {
      id: 'sun-monument',
      tasks: monumentWalkthrough,
      title: 'Build a solar calendar',
      workspace: 'project',
      activity: 'monument',
      introduction:
        'Start with one visible alignment: move a window until morning sunlight passes through its horizontal hole and lights a mark on the central pillar. Then compare summer and winter on the same three-stone monument.',
      instructions: monumentWalkthrough.map((task) => task.instruction),
      explanation:
        'This starting challenge uses empty horizontal holes and a fixed receiving pillar. Solstice marks are tested 30 minutes after sunrise at Colorado Springs; equinoxes use the open center as a baseline. Nearby dates can also match. After solving it, add your own openings, colored filters or equinox marks and calibrate them for a chosen place and time.',
    },
  ],
};
