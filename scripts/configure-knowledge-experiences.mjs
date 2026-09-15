import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const previous = resolve(root, 'public/projects/exploration-time-repair/versions/2.0.0');
const directory = resolve(root, 'public/projects/exploration-time-repair/versions/2.1.0');
await mkdir(directory, { recursive: true });
const project = JSON.parse(await readFile(resolve(previous, 'project.json'), 'utf8'));
project.projectVersion = '2.1.0';
project.inventionRescue.modelNote +=
  ' The restored geometric page, gear diagrams, readers, delivery routes, and apprentice cases are fictional teaching props, not documented Gutenberg publications or measured historical outcomes.';
const old = project.inventionRescue.sessions;
function session(
  number,
  title,
  task,
  goal,
  product,
  historicalNote,
  question,
  knowledge,
  date = 'c. 1454',
) {
  return {
    ...old[1],
    id: `knowledge-${number}`,
    number,
    mode: 'knowledge',
    title,
    task,
    goal,
    product,
    historicalNote,
    question,
    knowledge,
    location:
      date === 'c. 1460'
        ? 'Mainz · imagined town after the failure'
        : 'Mainz · reconstructed workshop',
    date,
    sourceIds: ['printing', 'bible', 'jikji'],
  };
}
project.inventionRescue.sessions = [
  session(
    1,
    'Reconstruct the lost book',
    'Lift surviving fragments from both damaged copies. Turn them and fit them into the missing page. Follow the drawing across its joins, then examine the whole reconstruction.',
    'Explain how separate copies preserve information that a single damaged source can lose.',
    'A reconstructed geometric drawing with the source and orientation of each surviving fragment.',
    'In our fictional failed future, two damaged copies preserve different portions of a geometric page. The drawing is a teaching prop. Manuscript copying and other printing traditions still exist.',
    'Which part could not be recovered from the first copy? How did the second change what could survive?',
    {
      version: '1.0',
      kind: 'reconstruction',
      fragments: [0, 4, 1, 5, 2, 3].map((cell, i) => ({
        id: `fragment-${cell}`,
        cell,
        turn: [1, 3, 2, 1, 2, 3][i],
        copy: i < 3 ? 0 : 1,
      })),
    },
    'c. 1460',
  ),
  session(
    2,
    'Build from other people’s knowledge',
    'Fit the frame, mold, ink ball, and screw into the press system. Operate each fitted mechanism. Cast four pieces, hold them steady, coat them, and bring the platen into contact. Compare failed and successful impressions.',
    'Connect specialized crafts and mechanical functions within an invention.',
    'An assembled and operated printing system, with trial evidence showing what each part contributes.',
    'This cutaway combines casting, holding, coating, and pressure as a teaching reconstruction. It does not claim to reproduce Gutenberg’s exact equipment. The historical invention depended on skilled collaborators and suitable materials.',
    'Which contribution could the other parts not replace? What did your failed impressions reveal?',
    { version: '1.0', kind: 'assembly', parts: ['screw', 'ink', 'frame', 'mold'] },
  ),
  { ...old[4], id: 'repair-3', number: 3, title: 'Rescue the failed demonstration' },
  session(
    4,
    'Which diagram can you trust?',
    'Place a printed diagram on the bench. Lift the wheels onto their matching axles and turn the crank. Compare both diagrams. Move the middle axle to repair the faulty arrangement, test the output, and stamp a revised page.',
    'Distinguish the reproducibility of a printed claim from evidence that it is correct.',
    'Two tested diagrams, a working gear train, and a corrected printed drawing.',
    'The gear diagrams are fictional teaching props, not Gutenberg publications. They make a general problem visible: a printing process can reproduce an incorrect arrangement as consistently as a correct one.',
    'What observation challenged the printed diagram? What evidence supports the revision you printed?',
    { version: '1.0', kind: 'diagram', axles: [360, 472, 584], gearRadii: [64, 48, 64] },
  ),
  session(
    5,
    'Keep the workshop running',
    'Inspect the failed sheet. Arrange a physical teaching example: failed impression, faulty part, replacement, and clean result. Demonstrate it, send the expert away, and let the apprentice try. Test ink, packing, and type failures separately.',
    'Make a repair process explicit enough for another worker to use it.',
    'Three physical demonstrations and independent apprentice repair trials.',
    'The apprentice and demonstration sequences are authored fiction. They model the need to communicate craft knowledge; a clean printed product alone does not explain its production.',
    'What did the apprentice need beyond a finished page? Where did an example fail to explain the cause?',
    { version: '1.0', kind: 'apprentice', cases: ['ink', 'packing', 'type'] },
  ),
  session(
    6,
    'Follow a page through the town',
    'Pack up to two copies at the workshop. Follow the streets and bridge to the bookseller, learning room, and collection. Deliver the copies and look inside each destination. Return for the remaining copies when the bag is empty.',
    'Trace how production, transport, and destinations affect access to information.',
    'A delivery route and three rooms changed by the arrival of usable copies.',
    'This small town and its readers are fictional. Distances, bag capacity, and book demand are model choices. The scene represents local circulation, not a forecast of European literacy or book ownership.',
    'Where did a page start being used? What work had to happen after it left the printing press?',
    {
      version: '1.0',
      kind: 'distribution',
      stock: 4,
      places: [
        {
          id: 'workshop',
          name: 'Printing workshop',
          x: 180,
          y: 210,
          need: 0,
          links: ['bookseller', 'bridge'],
        },
        {
          id: 'bookseller',
          name: 'Bookseller',
          x: 400,
          y: 160,
          need: 1,
          links: ['workshop', 'bridge'],
        },
        {
          id: 'bridge',
          name: 'River bridge',
          x: 500,
          y: 400,
          need: 0,
          links: ['workshop', 'bookseller', 'school', 'collection'],
        },
        {
          id: 'school',
          name: 'Learning room',
          x: 720,
          y: 150,
          need: 1,
          links: ['bridge', 'collection'],
        },
        {
          id: 'collection',
          name: 'Private collection',
          x: 840,
          y: 390,
          need: 1,
          links: ['school', 'bridge'],
        },
      ],
    },
    'c. 1460',
  ),
  session(
    7,
    'More books, different barriers',
    'Offer a copy to each reader and observe what still prevents its use. Try a loan, a translation, or a shared reading. A helper needs the information too. Watch each person’s construction when the support fits the problem.',
    'Distinguish physical availability from affordable and understandable access.',
    'Comparisons of book delivery and three forms of support, with visible participation changes.',
    'These readers and constructions are fictional learning props. Their different obstacles prevent the scene from treating more printed copies as instant universal access.',
    'Why did the same offer have different effects? Which combination made the information usable for each person?',
    {
      version: '1.0',
      kind: 'access',
      readers: [
        { id: 'learner', name: 'Learner with no purchase money', barrier: 'cost' },
        { id: 'traveler', name: 'Reader unfamiliar with this language', barrier: 'language' },
        { id: 'listener', name: 'Listener who needs a spoken explanation', barrier: 'reading' },
      ],
    },
    'c. 1460',
  ),
  {
    ...old[7],
    id: 'return-8',
    number: 8,
    title: 'Return to the repaired future',
    task: 'Repair a fresh ink setup and make three usable impressions. Visit the courtyard at any time during testing. Compare its supply before and after repair, then finish and deliver the printed samples.',
  },
];
project.inventionRescue.weeks = [
  {
    title: 'Recover knowledge. Discover the invention.',
    goal: 'Connect the survival of information with the crafts that make copies possible.',
    evidence: [
      'Fragments recovered from different copies',
      'Operated mechanisms and their contributions',
      'Failed and successful system trials',
    ],
  },
  {
    title: 'Repair the press. Test the knowledge.',
    goal: 'Use evidence to diagnose a failed process and challenge a printed claim.',
    evidence: [
      'Paired ink tests and repaired impressions',
      'Tests of both printed diagrams',
      'A tested and revised construction drawing',
    ],
  },
  {
    title: 'Pass the knowledge on.',
    goal: 'Make craft knowledge teachable and trace the delivery of printed information.',
    evidence: [
      'Physical apprentice demonstrations',
      'Independent repair trials',
      'Copies conserved through a working delivery route',
    ],
  },
  {
    title: 'Who can use the changed world?',
    goal: 'Connect the repaired invention to access, participation, and remaining barriers.',
    evidence: [
      'Different effects of copies and assistance',
      'Visible changes in participation',
      'Before-and-after courtyard supply',
    ],
  },
];
await writeFile(resolve(directory, 'project.json'), JSON.stringify(project, null, 2) + '\n');
await copyFile(resolve(previous, 'press-cover.svg'), resolve(directory, 'press-cover.svg'));
const planPath = resolve(root, 'src/app/projects/project-lesson-plans.json');
const plans = JSON.parse(await readFile(planPath, 'utf8'));
const index = plans.findIndex((p) => p.projectId === project.projectId);
if (plans[index].projectVersion === '2.0.0')
  await writeFile(
    resolve(previous, 'lesson-plan.json'),
    JSON.stringify(plans[index], null, 2) + '\n',
  );
plans[index] = {
  ...plans[index],
  planVersion: '2.1.0',
  projectVersion: '2.1.0',
  finalProduct:
    'A recovered page, an operated printing system, tested information, teachable repairs, and a visible account of circulation and access.',
  presentation: { ...plans[index].presentation, identifier: 'TR · 03' },
  lessons: project.inventionRescue.sessions.map((s) => ({
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
console.log('Configured six knowledge experiences in Time Repair 2.1.0.');
