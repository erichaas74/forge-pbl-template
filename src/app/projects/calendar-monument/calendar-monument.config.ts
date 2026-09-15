import type { EngineeringDesignConfig } from '../../templates/engineering-design/domain/engineering-design.models';
import { calendarMonumentDesignSamples } from './calendar-monument.design-samples';
import { calendarMonumentLearning } from './calendar-monument.learning';
import { calendarMonumentWeeks } from './calendar-monument.weeks';
import { solsticeGatesStarter, solsticeGatesChecks } from './calendar-monument.solstice-gates';
export const calendarMonumentConfig: EngineeringDesignConfig = {
  schemaVersion: '1.0',
  projectId: 'calendar-monument',
  version: '1.0.0',
  template: { id: 'engineering-design', version: '1.0' },
  title: 'From Sundial to Sun Monument',
  mission:
    'Build a sundial, investigate its seasonal shadows, and explain Earth’s tilt. Your final project is a solar calendar: a stone monument with openings and colored jewels that marks the equinoxes and solstices.',
  simulationId: 'simulation.solar-monument',
  previewWeeks: calendarMonumentWeeks,
  designSamples: calendarMonumentDesignSamples,
  learningSequence: calendarMonumentLearning,
  research: [
    {
      id: 'season-noticing',
      title: 'The sundial surprise',
      explanation:
        'Keep your first explanation so you can compare it with your thinking after exploring the Earth model.',
      prompt:
        'Your sundial did not move. Why did its shadow tip miss old marks when the season changed?',
      source: {
        label: 'Explore a sundial · NASA',
        url: 'https://pwg.gsfc.nasa.gov/stargaze/Sdial1.htm',
      },
    },
    {
      id: 'dial-calendar',
      title: 'A sundial that marks the year',
      explanation:
        'A shadow tip can show a daily pattern and a yearly pattern. Two dates can have similar shadow positions; a marker alone does not always identify one unique date.',
      prompt:
        'Compare your sundial’s four solar-noon marks and nearby dates. Which dates are hardest to distinguish?',
      source: {
        label: 'How sundials use Earth’s axis · Royal Museums Greenwich',
        url: 'https://www.rmg.co.uk/stories/time/sundials',
      },
    },
    {
      id: 'daily-sun',
      title: 'A shadow moves',
      explanation:
        'Earth rotates. The Sun appears to move across our sky, and a shadow points away from it. Sun altitude means its angle above the horizon; azimuth means its compass direction.',
      prompt:
        'Measure a stick’s shadow at three times. Record the stick height, date, times, lengths, and directions. What changed?',
      source: {
        label: 'Explore Sun angles and solar noon · NOAA',
        url: 'https://www.gml.noaa.gov/grad/solcalc/glossary.html',
      },
    },
    {
      id: 'seasons',
      title: 'The angle of a season',
      explanation:
        'Earth’s axis stays tilted as Earth travels around the Sun. This changes the Sun’s height and daylight duration through the year. The two hemispheres experience opposite seasons.',
      prompt:
        'Draw or describe how Earth’s tilt changes sunlight. At our location, how will solar-noon shadows differ in June and December?',
      source: {
        label: 'What causes the seasons? · NASA',
        url: 'https://spaceplace.nasa.gov/seasons/en/',
      },
    },
    {
      id: 'moon',
      title: 'The Moon keeps a different rhythm',
      explanation:
        'The Moon reflects sunlight. Its phases repeat in about 29.5 days as our view of its sunlit half changes. It can appear during the day. Ordinary Moon phases are not Earth’s shadow.',
      prompt:
        'Compare the Moon on four dates about a week apart. Record phase, illumination, time, and position. Could a Moon calendar work like a solar calendar?',
      source: { label: 'Moon phases · NASA', url: 'https://science.nasa.gov/moon/moon-phases/' },
    },
    {
      id: 'calendar',
      title: 'A building that marks time',
      explanation:
        'A solstice marks an extreme in the Sun’s yearly path. At an equinox the Sun crosses the celestial equator. Equinox daylight is approximately, rather than exactly, twelve hours. Both equinoxes have similar Sun paths.',
      prompt:
        'Research a solar monument such as Stonehenge. What alignment is documented? Sketch your own design and explain what it could tell an observer.',
      source: {
        label: 'Stonehenge and the solstice · English Heritage',
        url: 'https://www.english-heritage.org.uk/visit/places/stonehenge/things-to-do/solstice',
      },
    },
    {
      id: 'colored-light',
      title: 'Build with light and color',
      explanation:
        'A hole is a tunnel: a ray must clear both openings to pass through. A colored transparent material transmits some colors of light and absorbs others. A sculpture’s faces look different as the light direction changes.',
      prompt:
        'Compare an empty hole, a colored window, and a deeper hole at the same Sun angle. Predict which sculpture faces will catch the color in March, June, September, and December. Which prediction does your evidence support?',
      source: {
        label: 'Color filters absorb parts of white light · Exploratorium',
        url: 'https://annex.exploratorium.edu/xref/exhibits/color_removal.html',
      },
    },
  ],
  designBrief:
    'Align a horizontal hole with a fixed mark on a central pillar. The three-stone starter has a misplaced summer window and a working winter window. At Colorado Springs in 2026, test 30 minutes after sunrise and move the summer window until its light patch reaches the summer carving. Keep the pillar and marks fixed. Extend the solved design into your own solar calendar and test all four special dates.',
  testInstructions: [
    'For the starting challenge, use Colorado Springs (38.83, −104.82), 2026. Keep the location, pillar and carved marks fixed.',
    'Choose June solstice → Test sunlight → Morning light. This sets 30 minutes after sunrise. Predict whether the misplaced summer window will light the summer carving; save a trial.',
    'Choose Build, select Summer window and move it north in small steps. Return to Test sunlight. Inspect pillar shows both marks close up; Markers → Summer carving reports sunlight or shadow at the fixed point.',
    'Use Ray guide to follow the actual light path through the hole. Turn the guide off to see the projected patch alone. When it reaches the summer ring, save another trial.',
    'Choose December solstice and Morning light. Check that the winter carving lights and the summer carving is shaded. In Final demonstration → Compare, the starter supplies both solstice expectations and the same morning observation rule.',
    'Compare the equinox dates using sunlight at the open center as a baseline. These records do not claim an equinox alignment through a solstice hole. Later, design a separate equinox feature if you want one.',
    'Seal a hole, turn its bore vertically, or change its depth. Does the mark still receive sunlight? Undo the change and compare. Test a week before and after a solstice to investigate how many nearby dates also align.',
    'After the starting challenge, add your own openings, colored filters, or markers. Build supports ground and pillar targets with explicit height and face direction. Each changed design needs its own predictions and observations.',
    'Use Explore Earth to connect daily rotation and yearly orbit with the changing Sun direction. Record the final seasonal comparison and explain your revision.',
    'For a physical model, scale every dimension and mark together, keep true north and a level base, and test the projected sunlight on an available day. Record differences from the simulation.',
  ],
  exhibitPrompts: [
    'Introduce your solar calendar. Show how its stone openings and colored jewels or glass create repeatable seasonal alignments.',
    'Explain Earth’s tilt, the changing Sun angle, and why your monument’s shadows change.',
    'Describe the block dimensions, location, true-north orientation, target positions, and observation times needed to reproduce your design.',
    'Use evidence from all four seasonal dates. Distinguish the solstice-hole alignments from the equinox baseline, and explain any additional equinox feature you built.',
    'Describe a revision and what your nearby-date and outdoor tests taught you. Explain the limits of your model.',
    'Compare the Moon’s monthly pattern with the Sun’s yearly pattern and credit your research sources.',
  ],
  starterDesign: solsticeGatesStarter,
  starterChecks: solsticeGatesChecks,
};
