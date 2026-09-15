const fs = require('node:fs');
const path = 'src/app/projects/project-lesson-plans.json';
// Re-read immediately before replacing only this project's object. Other entries retain exact bytes.
const source = fs.readFileSync(path, 'utf8');
const marker = source.indexOf('"projectId": "survival-island-story-lab"');
if (marker < 0) throw new Error('Assigned project missing');
const start = source.lastIndexOf('  {', marker);
const end = source.indexOf('\n  }', marker) + '\n  }'.length;
const entry = JSON.parse(source.slice(start, end));
entry.finalProduct = 'Proposed individual branching story and a local playable demonstration.';
entry.grouping = 'Individual drafts; group sessions model a writing circle. Shared editing is deferred.';
entry.availability = 'All eight sessions are directly testable with fictional samples. Edits remain temporary in memory and reset when the workspace closes or reloads. No student work or completion is recorded.';
const lessons = [
  ['Write the opening', 'Opening scene with a clear viewpoint and character goal.', 'Shore scene writer', 'Which action reveals the character’s goal?', 'write'],
  ['Let the characters disagree', 'Dialogue scene and two meaningful reader choices.', 'Shelter dialogue and choices', 'What does the dialogue reveal about each character?', 'write'],
  ['Build the consequence map', 'Branching map with distinct costs and consequences.', 'Flooded crossing branch map', 'What does each route protect and risk?', 'map'],
  ['Try the other route', 'Two playable outcomes for a writing circle to compare.', 'Crossing route reader', 'How does the outcome follow from the reader’s decision?', 'playtest'],
  ['Repair the shared scene', 'Revised scene that works after two different routes.', 'Lantern continuity comparison', 'Who has the lantern on each incoming route?', 'write'],
  ['Test every ending', 'Playable continuity repair and alternate endings.', 'Lantern path testing', 'Does the shared scene work after both trails?', 'playtest'],
  ['Shape the final decision', 'Revised climax and endings in an individual story.', 'Signal story climax writer', 'Which early detail earns the ending?', 'write'],
  ['Play the story', 'Local playable story demonstration for a writing circle.', 'Final story reader', 'What changes in the character across each route?', 'playtest'],
];
entry.lessons = entry.lessons.map((lesson, index) => {
  const [title, output, workspace, checkpoint, focusTarget] = lessons[index];
  return { ...lesson, title, output, workspace, checkpoint, focusTarget };
});
const replacement = JSON.stringify(entry, null, 2).split('\n').map((line) => '  ' + line).join('\n');
fs.writeFileSync(path, source.slice(0, start) + replacement + source.slice(end));
