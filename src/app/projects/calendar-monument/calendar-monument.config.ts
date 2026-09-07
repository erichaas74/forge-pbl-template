import type { EngineeringDesignConfig } from '../../templates/engineering-design/domain/engineering-design.models';
export const calendarMonumentConfig: EngineeringDesignConfig = {
  schemaVersion: '1.0',
  projectId: 'calendar-monument',
  version: '1.0.0',
  template: { id: 'engineering-design', version: '1.0' },
  title: 'Build a Calendar Monument',
  mission:
    'How can a monument use sunlight and shadows to mark an equinox or solstice? Research the sky, build with measured blocks, and test your evidence.',
  simulationId: 'simulation.solar-monument',
  research: [
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
        url: 'https://www.english-heritage.org.uk/visit/places/stonehenge/history-and-stories/stonehenge-and-solstice/',
      },
    },
  ],
  designBrief:
    'Start with the ten-block tower, or change it to match your classroom blocks. Add ground markers for the two solstices and the shared equinox alignment. Build the same design on a level physical base, with matching dimensions and true-north orientation. An advanced design can use two pillars and a lintel to frame a patch of sunlight.',
  testInstructions: [
    'Choose your actual location on the globe or enter its latitude and longitude. Keep this location fixed for your first comparison.',
    'Choose March equinox, then Solar Noon. Solar noon is not always 12:00 on a clock. Predict the result, then save a trial.',
    'Repeat for June solstice, September equinox, and December solstice. Select Solar Noon again after changing the date.',
    'Place target rings using measured coordinates. The trial records whether the centre of each ring receives sunlight or is shaded by your blocks.',
    'Test a week before and after an event. Does your marker identify one day or a range of days? Shadows change slowly near a solstice.',
    'Revise the design and record another trial. Earlier designs remain in the evidence notebook.',
    'Check the physical model outdoors today at the matching time. Measure its shadow, compare with the simulation, and record differences. Observe shadows; never look directly at the Sun.',
  ],
  exhibitPrompts: [
    'Explain Earth’s tilt, the changing Sun angle, and why your monument’s shadows change.',
    'Describe the block dimensions, location, true-north orientation, target positions, and observation times needed to reproduce your design.',
    'Use evidence from all four seasonal dates. Explain why the two equinoxes share an approximate alignment.',
    'Describe a revision and what your nearby-date and outdoor tests taught you. Explain the limits of your model.',
    'Compare the Moon’s monthly pattern with the Sun’s yearly pattern and credit your research sources.',
  ],
  starterDesign: {
    blocks: Array.from({ length: 10 }, (_, i) => ({
      id: `starter-${i + 1}`,
      width: 0.1,
      height: 0.1,
      depth: 0.1,
      x: 0,
      y: i / 10,
      z: 0,
      rotation: 0,
    })),
    targets: [],
  },
};
