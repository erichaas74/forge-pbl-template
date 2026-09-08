import type { EngineeringDesignConfig } from '../../templates/engineering-design/domain/engineering-design.models';
import { calendarMonumentDesignSamples } from './calendar-monument.design-samples';
import { calendarMonumentLearning } from './calendar-monument.learning';
import { solarCalendarStarter } from './calendar-monument.solar-calendar';
export const calendarMonumentConfig: EngineeringDesignConfig = {
  schemaVersion: '1.0',
  projectId: 'calendar-monument',
  version: '1.0.0',
  template: { id: 'engineering-design', version: '1.0' },
  title: 'From Sundial to Sun Monument',
  mission:
    'Build a sundial, investigate its seasonal shadows, and explain Earth’s tilt. Your final project is a solar calendar: a stone monument with openings and colored jewels that marks the equinoxes and solstices.',
  simulationId: 'simulation.solar-monument',
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
    'Build a solar calendar inspired by Stonehenge. Arrange standing stones and lintels into your own monument, then use cylindrical openings and colored jewels or glass to send light onto seasonal markers. Include a plan for June, December, and the shared equinox alignment. The stone-circle starter has openings but no markers: locating and testing them is your challenge. Match your classroom model’s dimensions, level base and true-north orientation.',
  testInstructions: [
    'Choose your actual location on the globe or enter its latitude and longitude. Keep this location fixed for your first comparison.',
    'Build your monument, make a prediction, then choose Show Sun. Use See shadows to look behind the stones. Play day follows this date from sunrise to sunset; pause when a pattern appears.',
    'Choose March equinox, then Solar Noon. Solar noon is not always 12:00 on a clock. Predict the result, then save a trial.',
    'Repeat for June solstice, September equinox, and December solstice. Select Solar Noon again after changing the date.',
    'Open Markers → Place on the floor. Click a patch of light or shadow, name the sunstone, then Carve marker. The saved record includes the ground point, date, time, place, Sun height and compass direction, and light at its centre. Place by measurements provides an alternative using centimetres.',
    'Try Shape the light in Build: add a supported light window, choose a colored glass or jewel insert, and place a sculpture behind it. Use Inspect sculpture and turn the camera to see the face catching the light.',
    'Measure the opening diameter, its axis, and the block depth. Rotate the block to aim the tunnel. Change the date and time to find when colored light reaches a ground target or sculpture face. Colored filters in this model do not focus light like a curved lens.',
    'Choose Solar noon, then compare June and December. Open Guide → Earth’s tilt to connect the changing shadow to Earth’s fixed tilt and orbit. In Final demonstration → Compare, choose a target, expectation and time for each date. Test a week before and after: does the marker identify one day or a range? Shadows change slowly near a solstice.',
    'Revise the design and record another trial. Earlier designs remain in the evidence notebook.',
    'Open Final demonstration. Choose a target and expected sunlight, shadow, or colored light for each equinox and solstice. Walk through all four dates on the same 3D model, compare the target outcomes and sculpture surface samples, then record the final comparison.',
    'Check the physical model outdoors today at the matching time. Measure its shadow, compare with the simulation, and record differences. Observe shadows; never look directly at the Sun.',
  ],
  exhibitPrompts: [
    'Introduce your solar calendar. Show how its stone openings and colored jewels or glass create repeatable seasonal alignments.',
    'Explain Earth’s tilt, the changing Sun angle, and why your monument’s shadows change.',
    'Describe the block dimensions, location, true-north orientation, target positions, and observation times needed to reproduce your design.',
    'Use evidence from all four seasonal dates. Explain why the two equinoxes share an approximate alignment.',
    'Describe a revision and what your nearby-date and outdoor tests taught you. Explain the limits of your model.',
    'Compare the Moon’s monthly pattern with the Sun’s yearly pattern and credit your research sources.',
  ],
  starterDesign: solarCalendarStarter,
};
