import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const directory = resolve(root, 'public/projects/exploration-time-repair/versions/2.0.0');
await mkdir(directory, { recursive: true });
const sources = [
  {
    id: 'printing',
    title: 'The problem of printing',
    detail:
      'Manuscript ink did not adhere adequately to metal type. Printing required suitable ink and consistent pressure. Gutenberg’s precise equipment is not completely known.',
    url: 'https://www.themorgan.org/collections/works/gutenberg/invention-of-printing',
  },
  {
    id: 'bible',
    title: 'A book made by many hands',
    detail:
      'Gutenberg and collaborators produced their Bible in Mainz in the mid-1450s. Printed copies still involved hand finishing. A working press depended on skilled people, supplies, and financial support.',
    url: 'https://guides.loc.gov/gutenberg',
  },
  {
    id: 'jikji',
    title: 'Printing before Gutenberg',
    detail:
      'Jikji was printed with movable metal type in Korea in 1377. This mission concerns a European workshop, not the first printing anywhere in the world.',
    url: 'https://www.unesco.org/en/memory-world/baegun-hwasang-chorok-buljo-jikji-simche-yojeol-volii-second-volume-anthology-great-buddhist-priests?hub=915',
  },
];
const settings = (
  target = 'LIBER',
  ink = 'press',
  pressure = 1,
  packing = [1, 1, 1],
  type = [...target].reverse(),
) => ({ type, ink, pressure, packing });
const session = (
  number,
  mode,
  title,
  task,
  goal,
  product,
  historicalNote,
  question,
  initial,
  target = 'LIBER',
  batchSize = 1,
) => ({
  id: `press-${number}`,
  number,
  mode,
  title,
  task,
  goal,
  product,
  historicalNote,
  question,
  initial,
  target,
  batchSize,
  location:
    number === 1
      ? 'Mainz · bookseller’s courtyard'
      : number === 2
        ? 'Reference workshop · reconstructed'
        : 'Mainz · printing workshop',
  date: number === 1 ? 'c. 1460' : 'c. 1454',
  sourceIds:
    number < 3
      ? ['bible', 'jikji']
      : number < 7
        ? ['printing', 'bible']
        : ['printing', 'bible', 'jikji'],
});
const sessions = [
  session(
    1,
    'courtyard',
    'The book that never arrived',
    'Follow a commission from the scribe to the binder and messenger. Operate the workstations. Find the missing supply that keeps two workers waiting.',
    'Trace a production bottleneck through people and materials.',
    'One delivered manuscript sample and a visible chain of waiting work.',
    'In our invented 1460, the press workshop closed after its ink failed. Manuscripts and other printing traditions still exist. Three copying actions represent a longer process, not measured minutes.',
    'What caused the delay? Which parts of this courtyard are imagined, and which historical processes support the story?',
    settings(),
  ),
  session(
    2,
    'reference',
    'Discover the machine',
    'Ink the raised metal type, place a sheet over it, and pull the press. Prepare each new impression and produce three clean copies from the same reusable forme.',
    'Explain how reusable type makes repeated impressions possible.',
    'Three impressions made without rebuilding the type.',
    'This working reference lets you study the invention before entering its failed workshop. Gutenberg worked with collaborators; movable metal type already existed in East Asia.',
    'What stays in the press, and what leaves it? Why would that distinction matter to the waiting workers?',
    settings(),
    'LIBER',
    3,
  ),
  session(
    3,
    'compose',
    'A page written backward',
    'Pull a proof of the jumbled type. Lift two blocks to exchange them. Keep comparing your printed proof with the specimen until the word matches.',
    'Use an impression to reason about the relationship between type and printed page.',
    'An ordered forme and the failed proofs that led to it.',
    'Type faces carry reversed letters. Our five-block specimen isolates that relationship; a historical page contained far more type. LIBER is Latin for book.',
    'Why must the arrangement on the forme differ from the order on the page? What does the proof reveal that the metal does not?',
    settings('LIBER', 'press', 1, [1, 1, 1], ['L', 'B', 'R', 'E', 'I']),
  ),
  session(
    4,
    'recompose',
    'A second page, the same tools',
    'Recompose the specimen LUMEN. Swap the loose metal blocks, pull a proof, and make two matching impressions. The blocks can be reused after printing.',
    'Explain recomposition and the labor that remains in repeat production.',
    'A second correctly composed specimen and two matching impressions.',
    'LUMEN means light. These short specimens are teaching models, not facsimiles of a Gutenberg Bible page. Reusable type still had to be cast, sorted, composed, inked, and operated by skilled workers.',
    'Which work can be reused? Which work must happen again when the text changes?',
    settings('LUMEN', 'press', 1, [1, 1, 1], ['L', 'M', 'E', 'N', 'U']),
    'LUMEN',
    2,
  ),
  session(
    5,
    'ink',
    'The ink that would not hold',
    'The team suspects low pressure. Pull a proof, try another pressure setting, then test the numbered inks on paper and metal. Compare one change at a time and restore two clean impressions.',
    'Diagnose a material failure using controlled comparisons.',
    'Paired material tests and proofs showing why the first attempted fix failed.',
    'Our fictional spoiled batch was replaced with manuscript ink. The real historical challenge is that such ink did not adhere properly to metal type. These virtual samples represent behaviors, not historical recipes.',
    'What observation rules out pressure as the only cause? Which paper-and-metal comparison supports your repair?',
    settings('LIBER', 'manuscript'),
    'LIBER',
    2,
  ),
  session(
    6,
    'packing',
    'A different kind of failure',
    'The ink now works, but one part of every sheet is faint. Compare the proof’s left, middle, and right regions. Adjust the packing beneath the forme and test two clean impressions.',
    'Distinguish a local contact problem from an ink problem.',
    'Regional proof comparisons and two evenly printed sheets.',
    'Consistent pressure was essential to printing. Our three adjustable packing regions simplify contact under a forme. The particular uneven setup is invented for this investigation.',
    'Why would repeating the ink repair fail here? What changed when you adjusted support beneath the faint region?',
    settings('LIBER', 'press', 1, [0, 1, 1]),
    'LIBER',
    2,
  ),
  session(
    7,
    'production',
    'Make it work every time',
    'Inspect a fresh setup with more than one fault. Reorder type, test ink, adjust pressure and packing as needed. Produce three clean impressions in a row.',
    'Apply the diagnostic method to a new combination of failures.',
    'A reliable batch and a trial notebook showing the route to it.',
    'A working invention is a system. Correct type cannot compensate for bad contact, and a clean impression is not yet a reliable printing operation. Financing and labor remain part of the historical explanation.',
    'Which symptom led you to each change? Why does a sequence of clean sheets support a stronger claim than one lucky proof?',
    settings('LIBER', 'press', 2, [1, 1, 0], ['E', 'R', 'B', 'I', 'L']),
    'LIBER',
    3,
  ),
  session(
    8,
    'return',
    'The messenger returns',
    'Help the team recover a fresh failed ink setup and make three clean impressions. Return to 1460 from this task box, finish and deliver the printed copies, and inspect who still cannot obtain one.',
    'Connect a repair to a bounded historical consequence and recognize limits.',
    'A rescued workshop, delivered printed samples, and a comparison with the first courtyard.',
    'The accident, closure, and alternative future are authored fiction. This scene models possible local effects over a few years. It does not predict the loss of all books or instant universal literacy.',
    'What changed for the binder and messenger? What did your repair leave unresolved? Use a real source to distinguish the invention’s history from our scenario.',
    settings('LIBER', 'manuscript'),
    'LIBER',
    3,
  ),
];
const project = {
  schemaVersion: '1.0',
  projectId: 'exploration-time-repair',
  projectVersion: '2.0.0',
  template: { id: 'time-repair', version: '1.1' },
  title: 'Time Repair: The Press That Never Printed',
  subtitle: 'Ideas That Changed the World · Mainz, c. 1454–1460',
  inventionRescue: {
    version: '1.0',
    capability: 'invention-repair.printing-press',
    fiction:
      'Alternate-history mission: a spoiled ink batch leads to failed demonstrations and a closed workshop. Students help Gutenberg’s team repair it. The accident and the later courtyard are invented; the historical sources are identified separately.',
    modelNote:
      'This is a qualitative reconstruction. Five-letter specimens, three packing regions, numbered ink samples, and sample-copy tokens make the mechanism observable. A token represents a sample commission, not a full Bible. Copying turns are not historical timings. No model result is a historical forecast.',
    inks: [
      {
        id: 'manuscript',
        mark: 'I',
        name: 'Manuscript ink',
        color: '#312d31',
        adhesion: 0.28,
        spread: 0.03,
        paperAdhesion: 0.96,
      },
      {
        id: 'loose',
        mark: 'II',
        name: 'Loose trial mixture',
        color: '#403b34',
        adhesion: 0.9,
        spread: 0.48,
        paperAdhesion: 0.85,
      },
      {
        id: 'press',
        mark: 'III',
        name: 'Tacky trial mixture',
        color: '#211f24',
        adhesion: 0.98,
        spread: 0.04,
        paperAdhesion: 0.98,
      },
    ],
    sources,
    weeks: [
      {
        title: 'A world waiting for pages',
        goal: 'Investigate the missing invention and learn what it makes possible.',
        evidence: [
          'The sequence of workstation actions',
          'Three impressions from one forme',
          'The distinction between historical sources and the invented future',
        ],
      },
      {
        title: 'The secret of reusable type',
        goal: 'Discover how reversed metal type creates readable, repeatable pages.',
        evidence: [
          'Earlier and revised arrangements',
          'Impressions compared with the specimen',
          'A recomposed second page',
        ],
      },
      {
        title: 'Help the inventor find the fault',
        goal: 'Use visible evidence to distinguish ink failure from uneven pressure.',
        evidence: [
          'Paired paper and metal ink tests',
          'Settings saved with each proof',
          'Two clean impressions after each repair',
        ],
      },
      {
        title: 'Change the next few years',
        goal: 'Prove a reliable process, then trace its local consequences.',
        evidence: [
          'Three consecutive usable proofs',
          'Finished and delivered copies in the courtyard',
          'An access barrier that remains after the repair',
        ],
      },
    ],
    sessions,
  },
};
await writeFile(resolve(directory, 'project.json'), JSON.stringify(project, null, 2) + '\n');
const planPath = resolve(root, 'src/app/projects/project-lesson-plans.json');
const plans = JSON.parse(await readFile(planPath, 'utf8'));
const index = plans.findIndex((p) => p.projectId === project.projectId);
if (plans[index].projectVersion === '1.0.0') {
  const previous = resolve(root, 'public/projects/exploration-time-repair/versions/1.0.0');
  await mkdir(previous, { recursive: true });
  await writeFile(
    resolve(previous, 'lesson-plan.json'),
    JSON.stringify(plans[index], null, 2) + '\n',
  );
}
plans[index] = {
  schemaVersion: '1.0',
  planVersion: '2.0.0',
  projectId: project.projectId,
  projectVersion: project.projectVersion,
  finalProduct:
    'A working printing press, a proof notebook, and a restored local production chain.',
  grouping:
    'Individual investigation followed by a group repair each week. Group work runs on one device; shared editing is not connected.',
  availability:
    'Eight directly accessible investigations. Mechanical progress saves on this device. AI tutoring, assessment, and shared sessions are not connected.',
  evidenceCriteria: [
    'Use physical and historical evidence to explain an invention.',
    'Trace causes and consequences while distinguishing history from authored fiction.',
  ],
  workspaceView: 'experience',
  presentation: {
    layout: 'activity-first',
    title: project.title,
    identifier: 'TR · 02',
    grade: 'Grade 7',
    alignmentStatus: 'pending',
    alignmentNote:
      'Ideas That Changed the World is the selected Grade 7 curriculum direction. The supplied standards framework covers Grades 4–6; a Grade 7 crosswalk has not been supplied. The learning goals below are project goals, not verified standards.',
  },
  lessons: sessions.map((s) => ({
    number: s.number,
    title: s.title,
    output: s.product,
    workspace: s.task,
    checkpoint: s.question,
    criteria: [s.goal],
    focusTarget: 'invention-workspace',
  })),
};
await writeFile(planPath, JSON.stringify(plans, null, 2) + '\n');
console.log('Configured invention rescue v2 and its eight-lesson plan.');
