import type { EngineeringPreviewWeek } from '../../templates/engineering-design/domain/engineering-preview.models';
import { calendarMonumentLearning } from './calendar-monument.learning';
import { calendarMonumentDesignSamples } from './calendar-monument.design-samples';
import { solsticeGatesStarter } from './calendar-monument.solstice-gates';
import { solarCalendarStarter } from './calendar-monument.solar-calendar';
import { calendarMonumentQuests as quests } from './calendar-monument.quests';

const site = { latitude: 38.83, longitude: -104.82, zone: 'America/Denver' };
const settings = (localDate: string, observationRule = 'noon') => ({
  ...site,
  localDate,
  observationRule,
});
export const calendarMonumentWeeks: readonly EngineeringPreviewWeek[] = [
  {
    id: 'daily-sundial',
    title: 'Follow a moving shadow',
    buildType: 'Daily sundial',
    starter: calendarMonumentLearning.practiceDesign,
    sessions: [
      {
        title: 'Build a shadow clock',
        instruction:
          'Change the post height, play the Sun’s day, then pause and mark the shadow tip.',
        activity: 'sundial-build',
        settings: settings('2026-06-21'),
        quest: quests.animalClock,
      },
      {
        title: 'Calibrate the dial',
        instruction:
          'Use the same sundial. Mark 9 AM, solar noon and 3 PM, then change the season and compare the fixed marks.',
        activity: 'sundial-build',
        settings: settings('2026-06-21', 'morning'),
        quest: quests.seasonLine,
      },
    ],
    products: ['A sundial with a measured post', 'Fixed morning, noon and afternoon marks'],
    questions: [
      'Why does the shadow point away from the Sun?',
      'What changes when the post doubles in height?',
      'Why might the same clock time miss an old mark in another season?',
    ],
    evidence: [
      'Post height and fixed shadow-tip marks',
      'Saved date, time, Sun altitude and shadow measurements',
    ],
    controls: [
      'Post height; date and location',
      'Time, playback speed, camera and Earth rotation view',
    ],
  },
  {
    id: 'solstice-windows',
    title: 'Catch the solstice light',
    buildType: 'Solstice windows',
    starter: solsticeGatesStarter,
    sessions: [
      {
        title: 'Align the summer window',
        instruction:
          'At Colorado Springs, test June morning light. Move the summer window until light reaches the fixed summer carving on the pillar.',
        activity: 'monument',
        settings: settings('2026-06-21', 'morning'),
        quest: quests.summerBeam,
      },
      {
        title: 'Compare the two windows',
        instruction:
          'Keep the pillar fixed. Compare June and December morning light, then nearby dates. Use From center to watch the Sun cross the openings.',
        activity: 'monument',
        settings: settings('2026-12-21', 'morning'),
        quest: quests.winterWindow,
      },
    ],
    products: ['A revised two-window alignment', 'Saved summer and winter light tests'],
    questions: [
      'How does the sunrise direction change with the season?',
      'Why can a deeper opening block the same ray?',
      'Does an alignment identify one day or a range of days?',
    ],
    evidence: [
      'Window position, rotation and opening dimensions',
      'Light at the fixed pillar marks on each date',
    ],
    controls: [
      'Stone position, bore diameter and depth; ray guide',
      'Morning light, seasonal and nearby dates, site and observer camera',
    ],
  },
  {
    id: 'colored-sculpture',
    title: 'Sculpt with colored sunlight',
    buildType: 'Colored-light sculpture',
    starter: calendarMonumentDesignSamples.find((s) => s.id === 'color-windows')!.design,
    sessions: [
      {
        title: 'Aim a colored window',
        instruction:
          'Edit a window’s color or opening. Move the sculpture into the light and play the day to follow the moving patch.',
        activity: 'monument',
        settings: settings('2026-03-20'),
        quest: quests.rainbowPetals,
      },
      {
        title: 'Compare colors and faces',
        instruction:
          'Keep one change at a time: compare clear, glass and jewel inserts, then follow the sculpture’s faces through a winter day.',
        activity: 'monument',
        settings: settings('2026-12-21'),
        quest: quests.winterGallery,
      },
    ],
    products: [
      'A colored-window installation and sculpture',
      'A collection of light and color trials',
    ],
    questions: [
      'Which light does a colored filter transmit?',
      'Why do different faces catch light at different times?',
      'Which comparison isolates color from geometry?',
    ],
    evidence: [
      'Insert colors, opening sizes and sculpture geometry',
      'Target light colors and saved Sun directions',
    ],
    controls: [
      'Window inserts, colors, opening size and depth',
      'Sculpture shape, position and material; time, date and camera',
    ],
  },
  {
    id: 'stone-calendar',
    title: 'Build a calendar in stone',
    buildType: 'Stone-circle calendar',
    starter: solarCalendarStarter,
    sessions: [
      {
        title: 'Arrange the calendar gates',
        instruction:
          'Arrange the stone gates and carve markers where light or shadow lands. Compare the equinoxes and solstices.',
        activity: 'monument',
        settings: settings('2026-03-20'),
        quest: quests.calendarStones,
      },
      {
        title: 'Play the final solar calendar',
        instruction:
          'Test your circle on all four seasonal dates. Play full days in the model, Sun path and center views; save and replay useful observations.',
        activity: 'monument',
        settings: settings('2026-06-21'),
        quest: quests.yearOfLight,
      },
    ],
    products: [
      'An editable stone-circle solar calendar',
      'Four seasonal observations with replayable designs',
    ],
    questions: [
      'Which features mark a season and which mark a time of day?',
      'Why do both equinoxes produce similar paths?',
      'What would terrain, clouds or an outdoor build change?',
    ],
    evidence: [
      'Gate geometry and calendar markers',
      'Four seasonal trials, nearby-date checks and revisions',
    ],
    controls: [
      'Gate layout, opening geometry, marker placement and Sun views',
      'All dates, location, observation time and day playback settings',
    ],
  },
];
