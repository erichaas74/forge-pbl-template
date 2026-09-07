import type { WorkbenchEvidenceLink } from '../../templates/investigation/ui/workbench-evidence.models';

/** Full text of the ten public/evidence source files, displayed without leaving the bench. */
export const mysteryEvidenceRecords: Readonly<
  Record<string, WorkbenchEvidenceLink['sourceRecord']>
> = {
  'evidence-inventory': {
    text: 'THE UNLABELED SHELF\nEVIDENCE FILE E-01: FOUR-VIAL INVENTORY\n\nVial A — sealed; blue cap; small white cubic crystals visible\nVial B — sealed; yellow cap; shiny white crystals visible\nVial C — sealed; violet cap; fine white powder visible\nVial D — sealed; teal cap; very fine white powder visible\n\nAll four original product labels are missing. Temporary vial codes A–D were\nadded without opening the containers.\n\nInventory questions:\n1. Which vials can be grouped by appearance?\n2. Why can two materials look similar but have different properties?\n3. Which test should be run on all four vials under the same conditions?',
  },
  'evidence-shelf-scene': {
    text: 'THE UNLABELED SHELF\nEVIDENCE FILE E-02: SHELF SCENE RECORD\n\n- Four sealed vials were found on the dry-materials shelf.\n- Four empty label clips were attached to the shelf edge.\n- No spill, broken container, or open lid was found.\n- A conductivity probe, water station, Solution A, and Indicator B were in the\n  nearby virtual test kit.\n- A product inventory listed four materials: table salt, sugar, baking soda,\n  and cornstarch.\n\nThe scene record documents where objects were found. It does not identify any\nvial. Students must use multiple repeatable tests before restoring labels.',
  },
  'evidence-temperature-log': {
    columns: ['case id', 'vial id', 'time minutes', 'temperature celsius', 'observer note'],
    rows: [
      ['SHELF-4', 'C', '0', '22', 'Starting temperature'],
      ['SHELF-4', 'C', '1', '21', 'Small bubbles begin'],
      ['SHELF-4', 'C', '2', '20', 'Steady bubbles'],
      ['SHELF-4', 'C', '3', '19', 'Strong bubbling; temperature lower'],
      ['SHELF-4', 'C', '4', '19', 'Bubbling slows'],
      ['SHELF-4', 'C', '5', '19', 'Final temperature'],
    ],
  },
  'evidence-label-list': {
    text: 'THE UNLABELED SHELF\nEVIDENCE FILE E-04: RECOVERED LABEL LIST\n\nThe four missing shelf labels are:\n\n- TABLE SALT\n- SUGAR\n- BAKING SODA\n- CORNSTARCH\n\nAll four are dry white materials stored in sealed containers. This list does\nnot show which label belongs to Vial A, B, C, or D.\n\nDo not assign a label using appearance alone. Use the property matrix,\nchemical screening results, and evidence files together.',
  },
  'evidence-witness-note': {
    text: 'THE UNLABELED SHELF\nEVIDENCE FILE E-05: SHELF MONITOR STATEMENT\n\n"I remember two vials having crystals and two looking like powders. During an\nearlier virtual test, only one vial bubbled strongly with Solution A. Another\npowder made Indicator B turn dark blue-black. I do not remember the vial\nletters, so the tests should be repeated."\n\nReliability questions:\n1. Which claims can be checked with the test matrix?\n2. Which details are incomplete?\n3. Why should repeatable measurements outweigh memory alone?',
  },
  'evidence-test-kit': {
    text: 'THE UNLABELED SHELF\nEVIDENCE FILE E-06: VIRTUAL TEST KIT SAFETY CARD\n\nAvailable simulation tools:\n- Water solubility station\n- Conductivity probe\n- Test Solution A reaction screen\n- Indicator B color-change screen\n- Digital temperature sensor\n\nFair-test controls:\n- Use the same virtual amount of each material.\n- Use the same amount of test solution.\n- Use the same container and starting temperature.\n- Change only the vial being tested.\n\nThis is a simulation, not a real-world mixing guide. Never open, touch, smell,\ntaste, or mix unknown real substances.',
  },
  'evidence-probe-calibration': {
    columns: [
      'control sample',
      'expected result',
      'probe light',
      'reading quality',
      'technician note',
    ],
    rows: [
      ['Distilled water', 'Does not conduct', 'Off', 'Pass', 'No false positive observed'],
      ['Salt solution', 'Conducts', 'Strong on', 'Pass', 'Probe responds immediately'],
      ['Sugar solution', 'Does not conduct', 'Off', 'Pass', 'Control remains dark'],
      [
        'Repeat salt solution',
        'Conducts',
        'Strong on',
        'Pass',
        'Response repeated under same conditions',
      ],
    ],
  },
  'evidence-water-reference': {
    columns: [
      'known material',
      'starting appearance',
      'water test observation',
      'final appearance',
      'reference use',
    ],
    rows: [
      [
        'Table salt',
        'Cubic crystals',
        'Dissolves steadily',
        'Clear solution',
        'Compare dissolving pattern only',
      ],
      [
        'Sugar',
        'Shiny crystals',
        'Dissolves steadily',
        'Clear solution',
        'Compare dissolving pattern only',
      ],
      [
        'Baking soda',
        'Fine powder',
        'Dissolves after a cloudy start',
        'Mostly clear solution',
        'Compare dissolving pattern only',
      ],
      [
        'Cornstarch',
        'Very fine powder',
        'Does not fully dissolve',
        'Cloudy suspension',
        'Compare suspension pattern only',
      ],
    ],
  },
  'evidence-indicator-key': {
    text: 'INDICATOR B COLOR KEY\nCase: SHELF-4\n\nAMBER OR TAN\nNo starch response observed. Salt, sugar, and baking soda reference samples remain\nin this color range during the virtual test.\n\nDARK BLUE-BLACK\nStarch response observed. The cornstarch reference sample changes to this color.\n\nFAIR-TEST REMINDER\nUse equal virtual sample amounts, equal drops, equal timing, and the same display\nconditions. Describe the visible color before naming a material.',
  },
  'evidence-shelf-audit': {
    text: 'SHELF POSITION AUDIT\nCase: SHELF-4\n\nPOSITION 1 - Upper left:  Vial A, blue cap, sealed\nPOSITION 2 - Upper right: Vial B, gold cap, sealed\nPOSITION 3 - Lower left:  Vial C, violet cap, sealed\nPOSITION 4 - Lower right: Vial D, teal cap, sealed\n\nRECOVERED SCENE DETAILS\n- Four empty label clips were attached to the shelf edge.\n- No loose label remained beside a specific vial.\n- No container was broken and no substance was spilled.\n- Vial position documents the scene; it does not identify the contents.\n\nCHAIN-OF-EVIDENCE NOTE\nUse this record to reconstruct where each vial was found. Use repeatable property\nand reaction evidence to decide which product label belongs on each vial.',
  },
};
