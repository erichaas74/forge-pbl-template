const fs = require('node:fs');
const path = 'src/app/projects/project-lesson-plans.json';
const raw = fs.readFileSync(path, 'utf8');
const end = raw.indexOf('\n  },\n  {') + '\n  }'.length;
const start = raw.indexOf('  {');
const before = raw.slice(start, end);
const plan = JSON.parse(before);
if (plan.projectId !== 'mystery-substance') throw Error('Assigned project entry moved; stop.');
fs.writeFileSync('output/mystery-week/baseline-lesson.json', before);
plan.planVersion = '1.1.0';
plan.finalProduct = 'editable shelf plan and incident test record.';
plan.grouping = 'Two sessions per week: individual learning, then a group activity plan. Shared work is deferred.';
plan.availability = 'Local authoring preview: all eight lab sessions open directly. Trials and shelf edits are local drafts; tutor questions are planning content, with no checkpoint or completion workflow.';
const updates = [
 ['Observe through the lens', 'A set of optical comparisons across the four vials.', 'Optical magnifier, light and zoom', 'scanner'],
 ['Compare water trials', 'A water-trial log comparing dissolved material and suspension.', 'Properties Lab: water trial', 'properties'],
 ['Probe the solutions', 'A conductivity comparison across the four solutions.', 'Properties Lab: conductivity probe', 'properties'],
 ['Run the reaction protocol', 'A reaction profile with measured quantities and both reagent stages.', 'Reaction Bench: volume, mass and indicator', 'reaction'],
 ['Run a sealed chamber', 'A sealed-system particle and mass trial.', 'Matter Tracker: sealed chamber', 'conservation'],
 ['Open the boundary', 'An open/closed comparison of particles and measured mass.', 'Matter Tracker: open chamber', 'conservation'],
 ['Respond to Bay 3', 'An incident test log and a simulated response decision.', 'Bay 3: diagnostic test budget', 'emergency'],
 ['Assemble the final shelf', 'A shelf plan with editable labels, positions and handling choices.', 'Shelf Restoration: editable final product', 'restoration'],
];
plan.lessons = plan.lessons.map((lesson, i) => ({ ...lesson, title: updates[i][0], output: updates[i][1], workspace: updates[i][2], focusTarget: updates[i][3] }));
plan.lessons[4].checkpoint = 'What does the sealed-system balance measure, and why does the particle count stay constant?';
plan.lessons[5].checkpoint = 'Where do particles go when the chamber is open, and what would a larger measured boundary change?';
plan.lessons[5].criteria = [plan.evidenceCriteria[1]];
const replacement = JSON.stringify(plan, null, 2).split('\n').map(line => '  ' + line).join('\n');
fs.writeFileSync(path, raw.slice(0, start) + replacement + raw.slice(end));
