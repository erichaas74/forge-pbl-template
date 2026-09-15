import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const previous = resolve(root, 'public/projects/exploration-time-repair/versions/2.1.0');
const directory = resolve(root, 'public/projects/exploration-time-repair/versions/2.2.0');
const project = JSON.parse(await readFile(resolve(previous, 'project.json'), 'utf8'));
project.projectVersion = '2.2.0';
project.title = 'Time Repair: The Missing Reformation';
project.subtitle = 'Luther · 95 Theses · Ideas That Changed the World';
const content = project.inventionRescue;
content.fiction =
  'Alternate-history mission: the Protestant Reformation is missing from the time archive. Luther still writes his Ninety-five Theses in 1517, but the printed controversy does not spread as it did in real history. In our invented timeline, an unresolved ink failure in Gutenberg’s workshop around 1454 prevented this European printing system from developing. Travel back to help his team. This lasting failure and the missing Reformation are story premises, not historical facts or inevitable consequences of one broken press.';
content.modelNote =
  'The workshop models and circulation table are simplified experiments. Four quill strokes, three-copy print batches, six-slot racks, and discussion tables are model units, not measured historical speeds, quantities, or routes. Handwriting, speech, travel, and other printing traditions still exist. Receiving a copy means an opportunity to discuss, not conversion to a religion. The archive comparison is a test with working presses, not a completed repair. Five-letter specimens, geometry, gears, readers, and apprentice cases remain fictional teaching props, not Luther or Gutenberg publications.';
content.sources.push(
  {
    id: 'theses',
    title: 'Luther’s Ninety-five Theses · 1517 printed edition',
    detail:
      'The Library of Congress describes Luther’s Latin propositions for debate about indulgences and the part printing played in their wider circulation. This surviving Nuremberg edition is evidence of a real printed document; our workshop models are reconstructions.',
    url: 'https://www.loc.gov/resource/gdcwdl.wdl_07497/',
  },
  {
    id: 'basel-theses',
    title: 'A surviving Basel printing of the theses',
    detail:
      'The Gruber Rare Books Collection identifies Adam Petri’s Basel edition of 1517 and explains the dispute over indulgences. Luther was a Catholic monk and theology professor seeking debate; the later Reformation was not already a completed plan in the document.',
    url: 'https://gruber.lstc.edu/luthers_works/1517.php',
  },
  {
    id: 'print-circulation',
    title: 'Printing and the circulation of ideas',
    detail:
      'IEEE’s historical inquiry unit identifies editions printed in Leipzig, Nuremberg, and Basel in late 1517. The three model workshops represent printing centers, not a documented route taken by a single messenger.',
    url: 'https://reach.ieee.org/wp-content/uploads/2016/11/IEEE-REACH-Printing-Press-Inquiry-Unit-.pdf',
  },
);
content.weeks[0] = {
  title: 'Why is the Reformation missing?',
  goal: 'Connect Luther’s 1517 Ninety-five Theses, print circulation, and the beginnings of the Protestant Reformation; investigate the earlier invention on which this network depended.',
  evidence: [
    'A surviving manuscript and successful deliveries in the broken timeline',
    'Contrasting failed and working print batches, with copy inventories preserved',
    'Discussion tables reached by handwriting and printing',
    'A paper-versus-metal ink clue traced back to Gutenberg’s workshop',
    'An assembled press showing the contributions of several crafts',
  ],
};
Object.assign(content.sessions[0], {
  id: 'missing-reformation-1',
  title: 'The debate that disappeared',
  location: 'Time archive · Wittenberg and European print workshops',
  date: '1517–1518',
  task: 'The Protestant Reformation is missing from the time archive. Luther’s 95 Theses still exist, but the wider printed debate has disappeared. Send manuscripts to the three workshops, operate their presses, and share available copies with discussion tables. Use the quill when the dispatch tray is empty. Compare the same actions in the working archive. Inspect the ink to trace the failure back to Mainz, around 1454.',
  goal: 'Distinguish an idea being written from its circulation and public influence; use observed copying failures to identify the fictional historical break.',
  product:
    'A tested account of what still works, what fails, and how print multiplication changes the reach of Luther’s ideas.',
  historicalNote:
    'In 1517 Martin Luther, a Catholic monk and theology professor in Wittenberg, wrote 95 propositions for academic debate about indulgences. Indulgences concerned remission of temporal punishment for sin; Luther challenged claims and practices around their sale. Printers reproduced the Latin theses. The growing controversy helped begin the Protestant Reformation, a movement that changed Western Christianity and led to distinct Protestant churches. Printing helped ideas circulate; religious disputes, rulers, institutions, and people’s choices also shaped events. Our opening imagines this printed controversy missing in 1517–1518. It does not claim that all later outcomes followed automatically from one document.',
  question:
    'Luther has written the theses and manuscripts can travel. What is actually missing? Use your trials to explain how printing could widen a dispute about indulgences. Why is our missing Reformation a fictional possibility rather than a proven prediction?',
  sourceIds: ['theses', 'basel-theses', 'print-circulation', 'printing'],
  knowledge: {
    version: '1.0',
    kind: 'circulation',
    circulation: {
      document: 'Ninety-five Theses',
      mark: '95',
      author: 'Martin Luther',
      origin: 'Wittenberg',
      date: '1517',
      trace: 'Mainz · c. 1454',
      destinations: [
        { id: 'nuremberg', name: 'Nuremberg' },
        { id: 'leipzig', name: 'Leipzig' },
        { id: 'basel', name: 'Basel' },
      ],
    },
  },
});
Object.assign(content.sessions[1], {
  title: 'Before Luther: rebuild the invention',
  task: 'Follow the ink clue back about sixty years to Gutenberg’s team in Mainz. Fit the frame, mold, ink ball, and screw into their press system. Cast four pieces, hold them steady, coat them, and bring the platen into contact. Compare failed and successful impressions. Discover which contributions the future printers of Luther’s theses will need.',
  goal: 'Explain how several crafts work together in movable-type printing and place Gutenberg’s workshop before Luther’s 1517 controversy.',
  historicalNote:
    'Gutenberg and collaborators produced their Bible in Mainz in the mid-1450s, roughly sixty years before Luther’s theses. Gutenberg did not print the theses or meet Luther in this story. Students repair the earlier printing system, then consider its later influence. This cutaway is a teaching reconstruction rather than Gutenberg’s exact equipment. Printing and movable type already had histories in East Asia.',
  question:
    'Why did the investigation take us back before Luther was born? Which parts turn a handwritten idea into repeatable copies, and why can no single part do the whole job?',
  sourceIds: ['printing', 'bible', 'jikji', 'theses'],
});
content.sessions[2].task =
  'Rescue the earlier workshop that future printers depend on. The team suspects low pressure. Pull a proof, try another pressure setting, then test the numbered inks on paper and metal. Compare one change at a time and restore two clean impressions.';
content.sessions[2].question =
  'Which paper-and-metal comparison explains the failure you saw in 1517? Separate the physical fault you tested from the invented claim that it prevents the Reformation.';
// This existing courtyard is an earlier checkpoint, not a scene of the Reformation.
content.sessions[7].title = 'Verify that the repair lasts';
content.sessions[7].task =
  'Repair a fresh ink setup and make three usable impressions. Visit the 1460 courtyard at any time during testing, then finish and deliver the samples. This checks the earlier printing system. Revisit session 1 through the week navigation to compare its relevance to Luther’s later printed debate.';
content.sessions[7].product =
  'A repaired printing process, delivered samples, and an evidence-based explanation connecting print circulation with the missing Reformation.';
content.sessions[7].question =
  'How could the repair support the later spread of Luther’s theses? Use a historical source and your observations. Which links are documented, and which belong to our invented timeline?';
content.sessions[7].sourceIds = ['printing', 'bible', 'theses', 'basel-theses'];
await mkdir(directory, { recursive: true });
await writeFile(resolve(directory, 'project.json'), JSON.stringify(project, null, 2) + '\n');
await copyFile(resolve(previous, 'press-cover.svg'), resolve(directory, 'press-cover.svg'));
const planPath = resolve(root, 'src/app/projects/project-lesson-plans.json');
const plans = JSON.parse(await readFile(planPath, 'utf8'));
const index = plans.findIndex((p) => p.projectId === project.projectId);
if (plans[index].projectVersion === '2.1.0')
  await writeFile(
    resolve(previous, 'lesson-plan.json'),
    JSON.stringify(plans[index], null, 2) + '\n',
  );
if (!['2.1.0', '2.2.0'].includes(plans[index].projectVersion))
  throw new Error('Unexpected live plan version');
plans[index] = {
  ...plans[index],
  planVersion: '2.2.0',
  projectVersion: '2.2.0',
  finalProduct:
    'A diagnosed break in print circulation, a repaired invention, and a historical explanation connecting Luther’s 95 Theses with the Protestant Reformation.',
  evidenceCriteria: [
    'Explain Luther’s dispute over indulgences and the role of print circulation.',
    'Use controlled comparisons to diagnose an invention.',
    'Distinguish historical evidence, a simplified model, and a fictional counterfactual.',
  ],
  presentation: { ...plans[index].presentation, title: project.title },
  lessons: content.sessions.map((s) => ({
    number: s.number,
    title: s.title,
    output: s.product,
    workspace: s.task,
    checkpoint: s.question,
    criteria: [s.goal],
    focusTarget: 'invention-workspace',
  })),
};
await writeFile(resolve(directory, 'lesson-plan.json'), JSON.stringify(plans[index], null, 2) + '\n');
await writeFile(planPath, JSON.stringify(plans, null, 2) + '\n');
console.log('Configured the missing Reformation opening in Time Repair 2.2.0.');
