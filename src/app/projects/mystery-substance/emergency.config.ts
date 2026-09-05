/**
 * The Fifth Vial — Bay 3 incident.
 *
 * A drum of acidic descaler has split open in the school's boiler room. The
 * crew cannot enter until the floor is neutralised, and the only sodium
 * bicarbonate within reach arrived from another school in a tub whose shipping
 * label got soaked through. Nobody will authorise pouring an unidentified white
 * powder onto an acid spill, so a fifth-grade lab bench has to identify it.
 *
 * Everything here is deliberately built from the four substances the students
 * already know. Bicarbonate genuinely neutralises acid; cornstarch genuinely
 * does not. The specimen is one of the two, it is never revealed in advance,
 * and the pair is the hardest in the whole investigation to tell apart by eye.
 *
 * The clock is a budget, not a stopwatch. It prices tests so the student has to
 * choose which evidence is worth buying — which is the skill four weeks of
 * controlled trials was for — rather than rewarding whoever clicks fastest.
 */

/** What is actually in the tub. Teacher-set; the student cannot see it. */
export type TubIdentity = 'bicarbonate' | 'cornstarch';

/** What the team files with the fire marshal. */
export type EmergencyCall = TubIdentity | 'contain';

export type EmergencyTestId =
  | 'appearance'
  | 'solubility'
  | 'calibration'
  | 'conductivity'
  | 'acid'
  | 'indicator'
  | 'conservation';

export interface EmergencyTestDefinition {
  id: EmergencyTestId;
  title: string;
  instrument: string;
  /** Minutes off the crew's clock. */
  cost: number;
  prompt: string;
  /** A test that must have been run first — the bench's own protocol. */
  requires?: EmergencyTestId;
  /**
   * Whether the result can separate bicarbonate from cornstarch on its own.
   * Used to score whether a correct call was actually earned.
   */
  decisive: boolean;
}

/** Minutes of bench time the crew can wait before the first call. */
export const emergencyBudgetMinutes = 25;

/** What is left on the clock after a wrong call sends the crew back outside. */
export const emergencyRetryMinutes = 12;

/**
 * Which substance is in the tub. Flip this to run the other version — two
 * classes should not be able to tell each other the answer.
 */
export const defaultTubIdentity: TubIdentity = 'bicarbonate';

export const emergencyBriefing = {
  time: '08:40',
  location: 'Bay 3 · boiler room',
  headline: 'A drum of acidic descaler has split open.',
  situation:
    'Nobody is hurt — the room was sealed and empty. The crew cannot go in and the building stays cold until the floor is neutralised. The fire marshal needs sodium bicarbonate.',
  shipment:
    'Harbor Ridge Elementary sent their spare stock. The shipping label soaked through in transit; the seal is intact. Their office will not confirm what is inside it.',
  quote:
    'We think it is the bicarb. We are not certain. Please check it before you put it on anything.',
  attribution: 'Harbor Ridge Elementary · front office, 08:37',
  constraint:
    'The marshal will not authorise pouring an unidentified white powder onto an acid spill.',
} as const;

export const emergencyTests: readonly EmergencyTestDefinition[] = [
  {
    id: 'appearance',
    title: 'Optical scan',
    instrument: '6× magnifier',
    cost: 2,
    prompt: 'Cheap and quick. Ask yourself first whether it can settle anything.',
    decisive: false,
  },
  {
    id: 'solubility',
    title: 'Water trial',
    instrument: '50 mL water cup',
    cost: 6,
    prompt: 'Same mass, same water, same mixing time as the shelf trials.',
    decisive: true,
  },
  {
    id: 'calibration',
    title: 'Probe calibration',
    instrument: 'Reference solution',
    cost: 3,
    prompt: 'The probe reads nothing you can defend until it is calibrated.',
    decisive: false,
  },
  {
    id: 'conductivity',
    title: 'Probe trial',
    instrument: 'Calibrated probe',
    cost: 4,
    prompt: 'Needs a calibrated probe and a solution to dip it in.',
    requires: 'calibration',
    decisive: true,
  },
  {
    id: 'acid',
    title: 'Acid screen · Solution A',
    instrument: 'Sealed vessel',
    cost: 5,
    prompt: 'Add 5 mL to a 2 g sample in a closed vessel. Watch for gas.',
    decisive: true,
  },
  {
    id: 'indicator',
    title: 'Indicator B',
    instrument: 'Three drops, equal light',
    cost: 4,
    prompt: 'Three drops under equal lighting. Watch the colour.',
    decisive: true,
  },
  {
    id: 'conservation',
    title: 'Sealed and open mass run',
    instrument: 'Balance and particle counter',
    cost: 8,
    prompt: 'Confirms where gas went. It corroborates an answer; it does not find one.',
    decisive: false,
  },
];

/**
 * What the bench shows for the tub. The student sees only the row for whichever
 * substance the teacher loaded — never both.
 */
export const emergencyOutcomes: Readonly<
  Record<TubIdentity, Readonly<Record<EmergencyTestId, Readonly<Record<string, string>>>>>
> = {
  bicarbonate: {
    appearance: {
      reading: 'Fine white powder, no clear crystal faces',
      magnification: '6×',
      separates: 'no — both candidates look like this',
    },
    solubility: {
      reading: 'Cloudy at first, then mostly clear',
      elapsedSeconds: '11 s',
      settledLayer: 'none at 60 s',
    },
    calibration: {
      reading: 'Probe reads 0.0 mS in the reference',
      status: 'passed',
      separates: 'no — this only makes the next reading defensible',
    },
    conductivity: {
      reading: 'Probe bar rises and the lamp glows',
      millisiemens: '6.2',
      calibration: 'passed',
    },
    acid: {
      reading: 'Rapid bubbles for 18 s',
      gas: 'produced',
      temperature: '22 °C → 19 °C',
    },
    indicator: {
      reading: 'Amber turns light tan',
      colorBefore: 'amber',
      colorAfter: 'light tan',
    },
    conservation: {
      reading: 'Open chamber loses mass, sealed chamber holds',
      particles: '24 → 19 in the open chamber',
      mass: '124.8 g → 123.5 g',
    },
  },
  cornstarch: {
    appearance: {
      reading: 'Very fine white powder, clings in clumps',
      magnification: '6×',
      separates: 'no — both candidates look like this',
    },
    solubility: {
      reading: 'Cloudy suspension remains',
      elapsedSeconds: '60 s',
      settledLayer: 'thin layer begins',
    },
    calibration: {
      reading: 'Probe reads 0.0 mS in the reference',
      status: 'passed',
      separates: 'no — this only makes the next reading defensible',
    },
    conductivity: {
      reading: 'Probe bar stays near baseline',
      millisiemens: '0.1',
      calibration: 'passed',
    },
    acid: {
      reading: 'No gas visible for the full 60 s',
      gas: 'none',
      temperature: '22 °C → 22 °C',
    },
    indicator: {
      reading: 'Amber turns dark blue-black',
      colorBefore: 'amber',
      colorAfter: 'dark blue-black',
    },
    conservation: {
      reading: 'Both chambers hold their mass',
      particles: '24 → 24 in both chambers',
      mass: '126.4 g → 126.4 g',
    },
  },
};

/**
 * The rows from the shelf investigation the team can hold the tub against. This
 * is the case file becoming a tool rather than a hand-in: Vial C is the one
 * that fizzed, Vial D is the one that went blue-black.
 */
export const priorRecords: readonly {
  testId: EmergencyTestId;
  label: string;
  vialC: string;
  vialD: string;
}[] = [
  {
    testId: 'appearance',
    label: 'Optical scan',
    vialC: 'Fine white powder',
    vialD: 'Very fine white powder',
  },
  {
    testId: 'solubility',
    label: 'Water trial',
    vialC: 'Cloudy at first; mostly clear',
    vialD: 'Cloudy suspension remains',
  },
  {
    testId: 'conductivity',
    label: 'Probe trial',
    vialC: '6.4 mS · lamp glows',
    vialD: '0.1 mS · near baseline',
  },
  {
    testId: 'acid',
    label: 'Solution A',
    vialC: 'Rapid bubbles for 18 s',
    vialD: 'No gas visible',
  },
  {
    testId: 'indicator',
    label: 'Indicator B',
    vialC: 'Amber → light tan',
    vialD: 'Amber → dark blue-black',
  },
];

export const emergencyCalls: readonly {
  id: EmergencyCall;
  title: string;
  detail: string;
}[] = [
  {
    id: 'bicarbonate',
    title: 'It is sodium bicarbonate',
    detail: 'Authorise the pour. The crew neutralises Bay 3 with it.',
  },
  {
    id: 'cornstarch',
    title: 'It is cornstarch',
    detail: 'Stop the pour. It will not neutralise anything; the district must source bicarbonate.',
  },
  {
    id: 'contain',
    title: 'Contain for confirmation',
    detail: 'We do not have the evidence to authorise this. Seal it and wait for a lab.',
  },
];

export type EmergencyVerdictId = 'neutralised' | 'unsupported' | 'wrong' | 'held' | 'averted';

export interface EmergencyVerdict {
  id: EmergencyVerdictId;
  tone: 'good' | 'warn' | 'bad';
  label: string;
  headline: string;
  detail: string;
  /** Whether the Bay 3 floor animation should play. */
  neutralises: boolean;
}

/**
 * Grades the call the way the review board will: on the evidence behind it, not
 * only on whether it happened to be right. A correct guess with nothing under
 * it is a worse outcome than an honest refusal to authorise.
 */
export function judgeCall(
  call: EmergencyCall,
  tub: TubIdentity,
  decisiveTestsRun: number,
): EmergencyVerdict {
  if (call === 'contain') {
    return {
      id: 'held',
      tone: 'warn',
      label: 'Held for confirmation',
      headline: 'You refused to authorise it.',
      detail:
        'Bay 3 stays cold and the district sources bicarbonate overnight. Nobody was sent in on evidence you did not have — that is a defensible scientific decision, and the review board will treat it as one.',
      neutralises: false,
    };
  }

  if (call !== tub) {
    return {
      id: 'wrong',
      tone: 'bad',
      label: 'Call rejected',
      headline:
        tub === 'bicarbonate'
          ? 'You stopped a pour that would have worked.'
          : 'It did not neutralise anything.',
      detail:
        tub === 'bicarbonate'
          ? 'The marshal held the crew back on your word. A later screen found bicarbonate in the tub — the acid could have been down hours ago. Look again at what your tests actually showed.'
          : 'The crew poured it onto the spill and nothing happened. The floor is still acidic and they were standing on it. Look again at what your tests actually showed.',
      neutralises: false,
    };
  }

  if (decisiveTestsRun === 0) {
    return {
      id: 'unsupported',
      tone: 'warn',
      label: 'Right answer, no evidence',
      headline: 'You were right. You could not have known that.',
      detail:
        'Not one test you ran can separate bicarbonate from cornstarch. The marshal acted on a guess that happened to land. The review board scores the reasoning, not the luck — run a test that could have told the two apart.',
      neutralises: call === 'bicarbonate',
    };
  }

  if (call === 'bicarbonate') {
    return {
      id: 'neutralised',
      tone: 'good',
      label: 'Authorised',
      headline: 'Bay 3 is neutralising.',
      detail:
        'The crew spread it across the floor and it began to fizz on contact. Every bubble is carbon dioxide leaving the acid — the same gas you counted in the sealed chamber. The heat is back on by lunch.',
      neutralises: true,
    };
  }

  return {
    id: 'averted',
    tone: 'good',
    label: 'Pour stopped',
    headline: 'You stopped the pour, and you were right.',
    detail:
      'The tub was cornstarch. Spread on the spill it would have done nothing at all while the crew believed the floor was safe. The district has real bicarbonate on the way because you said so.',
    neutralises: false,
  };
}
