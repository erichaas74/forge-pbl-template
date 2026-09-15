import fs from 'node:fs';
const planFile = 'src/app/projects/project-lesson-plans.json';
const raw = fs.readFileSync(planFile, 'utf8');
const plans = JSON.parse(raw);
const titles = ['Choose a side · opening argument', 'Exchange 1 · answer an opponent', 'Source clinic · refine the response', 'Exchange 2 · test the rebuttal', 'Reasoning clinic · strengthen the case', 'Exchange 3 · answer the strongest case', 'Closing clinic · refine and rehearse', 'Final exchange · judge the performers'];
const outputs = ['Individual opening with ordered points and cited evidence.', 'A rebuttal to an opposing opening, submitted by class end.', 'An independent revision and a same-side peer critique.', 'A response to the opponent’s refined argument, submitted by class end.', 'A stronger revision with an explanation of changes and peer feedback used.', 'A response to the strongest opposing case, submitted by class end.', 'A refined closing preparation with source limits and a revision trail.', 'Closing arguments, criterion-based ballots and best individual performer rankings.'];
const checks = ['Explain the link between your claim and a source; distinguish claim from evidence.', 'Represent an opponent fairly and explain how your response addresses their point.', 'Explain the purpose and limits of a source, then show how that changes your argument.', 'Defend a rebuttal with relevant evidence and acknowledge a reasonable objection.', 'Compare old and new reasoning; explain a change made after critique.', 'Answer the strongest objection, cite evidence and state a fair concession.', 'Explain how your closing weighs conflicting evidence and preserves source limits.', 'Defend your own closing and justify performer rankings with observed evidence. Teacher review confirms learning.'];
const projects = [
  { id: 'the-fate-of-the-republic', version: '3.0.0', title: 'The Fate of the Republic', code: 'SPQR', additions: ['Name a Roman republican institution and its function.', 'Connect participation and power to the opposing cases.', 'Compare Cicero’s perspective with evidence about other groups.', 'Explain the tradeoff between reform and concentrated authority.', 'Evaluate a peer’s claim and preserve the earlier version.', 'Practice clear oral delivery during the exchange.', 'Apply the source critique to a fresh detail selected by the teacher.', 'Explain republican institutions, law and participation in the final defense.'] },
  { id: 'hammurabi-on-trial', version: '2.0.0', title: 'Hammurabi on Trial', code: 'LAW', additions: ['Begin context evidence for monarchy, empire and social hierarchy.', 'Explain how one law could promote order and question fairness.', 'Compare royal purpose, polytheism, cuneiform and epic literature.', 'Separate intended legal protections from evidence of practice.', 'Propose a hypothetical law change, predict effects on two groups and examine architecture separately.', 'Answer a competing interpretation using a cited law.', 'Compare unavoidable crop failure with negligent canal damage; revisit all eight civilization concepts.', 'Complete the independent context defense: monarchy, empire, hierarchy, polytheism, cuneiform, architecture, literature and law.'] },
];
for (const project of projects) {
  const plan = plans.find(plan => plan.projectId === project.id);
  Object.assign(plan, {
    projectVersion: project.version, planVersion: '2.0.0', workspaceView: 'experience',
    finalProduct: 'One ongoing debate: opening, three exchanges with individual revisions, same-side critiques, closing and ranked individual performers.',
    grouping: 'Odd sessions: individual instruction and revision. Even sessions: exchange with an opposing group or individual; each performer keeps an individual contribution.',
    availability: 'All eight sessions and authored examples are freely accessible during testing. Local file exchange; live classroom connection unavailable.',
    presentation: { layout: 'activity-first', title: project.title, identifier: project.code, grade: 'Grade 6', alignmentStatus: 'pending', alignmentNote: 'Versioned lesson evidence is mapped in the standards review. Teacher review is required; rankings do not confirm mastery.' },
    evidenceCriteria: ['Cited claims and fair responses to a specific opposing argument.', 'Immutable versions, same-side peer critique and explained revisions.', 'Individual context defense and justified performer rankings; teacher review required.'],
    lessons: titles.map((title, index) => ({ number: index + 1, title, output: outputs[index] + ' ' + project.additions[index], workspace: 'Ongoing debate: argument exchange, source inspection, same-side critique and judging. Manual writing and independent context responses open from the tutor side area.', checkpoint: checks[index] + ' ' + project.additions[index], criteria: ['Cite evidence and explain the reasoning.', index === 7 ? 'Rank observed performances using the rubric.' : 'Preserve individual work and use specific feedback.'], focusTarget: `debate-session-${index + 1}` })),
  });
}
fs.writeFileSync(planFile, (JSON.stringify(plans, null, 2) + '\n').replaceAll('\n', raw.includes('\r\n') ? '\r\n' : '\n'));
let catalog = fs.readFileSync('src/app/projects/project-catalog.ts', 'utf8');
for (const project of projects) {
  const start = catalog.indexOf(`    id: '${project.id}'`); const end = catalog.indexOf('\n  },', start);
  let entry = catalog.slice(start, end).replace(/projectVersion: '[^']+'/, `projectVersion: '${project.version}'`);
  if (!entry.includes("entryMode:")) entry = entry.replace(/(route: '[^']+',)/, "$1\n    entryMode: 'activity', finalExampleMode: 'template',");
  else entry = entry.replace("entryMode: 'activity',", "entryMode: 'activity', finalExampleMode: 'template',");
  entry = entry.replace("capabilityIds: [", "capabilityIds: ['debate.exchange-cycle', ");
  catalog = catalog.slice(0, start) + entry + catalog.slice(end);
}
fs.writeFileSync('src/app/projects/project-catalog.ts', catalog);
const registry = 'src/app/runtime/local-template-registry.ts';
fs.writeFileSync(registry, fs.readFileSync(registry, 'utf8').replace("debateStudioTemplateImplementationVersion = '2.1.0'", "debateStudioTemplateImplementationVersion = '2.2.0'"));
