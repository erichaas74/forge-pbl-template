import type { EngineeringDesignConfig } from '../../templates/engineering-design/domain/engineering-design.models';

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
      title: 'Build a sundial',
      workspace: 'practice',
      activity: 'sundial-build',
      showGuides: false,
      introduction: 'Can a shadow tell the time? Start with a vertical post on a level stone dial.',
      instructions: [
        'Choose your place in Events & time. Open Build, set the post height to match your classroom model, and build your sundial.',
        'Press Play day. Pause in the morning, near noon, and in the afternoon. Use Mark time to leave a mark at the shadow tip.',
        'Play the same day again. Watch the shadow revisit your marks. Save a test when you are ready.',
      ],
      question: {
        researchId: 'daily-sun',
        prompt: 'What pattern did you notice as your sundial’s shadow moved through one day?',
      },
    },
    {
      id: 'season-surprise',
      title: 'A seasonal surprise',
      workspace: 'practice',
      activity: 'sundial-seasons',
      showGuides: false,
      introduction:
        'Keep the same sundial and its original marks. Now change the season. Why do you think the shadow tip misses the old marks?',
      instructions: [
        'The canvas starts on a different seasonal date. Your post and old marks stay in place.',
        'Use Events & time to compare June and December at Solar noon. Then Play day on each date and watch where the shadow tip travels.',
        'Notice the height of the Sun, shadow length, and daylight hours. Write your idea before continuing.',
      ],
      question: {
        researchId: 'season-noticing',
        prompt:
          'The sundial did not move. Why do you think its shadow tip misses some old marks now? What did you observe?',
      },
    },
    {
      id: 'explain-the-tilt',
      title: 'Why the shadows change',
      workspace: 'practice',
      activity: 'sundial-tilt',
      introduction: 'Connect your sundial observations to a turning, tilted Earth.',
      instructions: [
        'In this Guide, choose Earth’s tilt. Find your site and the tilted axis. Play day to see Earth turn.',
        'Change between June and December. The axis keeps pointing the same way as Earth travels around the Sun.',
        'At Solar noon, compare the Sun’s height and your post’s shadow. How does the new model help explain your first idea?',
      ],
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
      title: 'Make a Sun calendar',
      workspace: 'practice',
      activity: 'sundial-calendar',
      introduction: 'First challenge: make your sundial mark the equinoxes and solstices.',
      instructions: [
        'Choose each special date from Events & time. At Solar noon, use Mark date to place its shadow-tip marker.',
        'Compare all four marks. Which are closest together? Which dates have the shortest and longest noon shadows at your site?',
        'Try a week before and after a special date. Does one marker identify an exact day or a range of days?',
      ],
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
      title: 'Build a Sun monument',
      workspace: 'project',
      activity: 'monument',
      introduction:
        'Now use what you discovered to design a monument to the Sun. Make something beautiful that also marks time.',
      instructions: [
        'Find Sample models in the ••• menu, or use Build to create your own monument. Your practice sundial stays saved in the earlier steps.',
        'Use stone shapes, holes, colored glass, and a central sculpture to create a special shadow or light display.',
        'Choose the date, observation time, target and effect you want. Open Final demonstration from the ••• menu to compare all four special dates and nearby days, then explain your evidence.',
      ],
    },
  ],
};
