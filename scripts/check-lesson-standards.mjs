import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

// Small RFC-style CSV reader that preserves commas, quoted newlines and escaped quotes.
function csv(text) {
  const rows = [];
  let row = [], value = '', quoted = false;
  for (let index = 0; index < text.length; index++) {
    const character = text[index];
    if (character === '"') {
      if (quoted && text[index + 1] === '"') { value += '"'; index++; }
      else quoted = !quoted;
    } else if (!quoted && character === ',') {
      row.push(value); value = '';
    } else if (!quoted && (character === '\n' || character === '\r')) {
      if (character === '\r' && text[index + 1] === '\n') index++;
      row.push(value); rows.push(row); row = []; value = '';
    } else value += character;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  assert.equal(quoted, false, 'Unterminated CSV quoted field');
  const headers = rows.shift().map((header) => header.replace(/^\uFEFF/, ''));
  return rows.filter((cells) => cells.length > 1).map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index]])));
}

const root = resolve(import.meta.dirname, '..');
const mappings = readFileSync(resolve(root, 'src/app/projects/project-lesson-standards.ts'), 'utf8');
const used = new Set(mappings.match(/FF\.G[456]\.[A-Z]+\.\d+/g));
const sourceFolder = resolve(root, 'docs/Forge_School_Master_Standards_Frameworks');
const outputPath = resolve(root, 'src/app/projects/forge-review-standards.json');
if (process.argv.includes('--refresh')) {
  const records = [];
  for (const sourceFile of readdirSync(sourceFolder).filter((file) => / - (ELA|Math|Science|Social Studies) 4-6\.csv$/.test(file))) {
    for (const row of csv(readFileSync(resolve(sourceFolder, sourceFile), 'utf8'))) {
      if (used.has(row['Forge Standard ID'])) records.push({
        id: row['Forge Standard ID'], grade: Number(row.Grade), title: row['Forge Standard'], description: row.Description, sourceFile,
      });
    }
  }
  assert.equal(records.length, used.size, 'Missing or duplicate source rows');
  writeFileSync(outputPath, `${JSON.stringify(records, null, 2)}\n`);
}
const standards = JSON.parse(readFileSync(outputPath, 'utf8'));
const cachedSources = new Map();
for (const standard of standards) {
  if (!cachedSources.has(standard.sourceFile)) {
    assert.match(standard.sourceFile, /^Forge_School_Master_Standards_Framework_Grades_4-6\.xlsx - (ELA|Math|Science|Social Studies) 4-6\.csv$/);
    cachedSources.set(standard.sourceFile, csv(readFileSync(resolve(root, 'docs/Forge_School_Master_Standards_Frameworks', standard.sourceFile), 'utf8')));
  }
  const matches = cachedSources.get(standard.sourceFile).filter((row) => row['Forge Standard ID'] === standard.id);
  assert.equal(matches.length, 1, standard.id);
  assert.equal(standard.title, matches[0]['Forge Standard'], standard.id);
  assert.equal(standard.description, matches[0].Description, standard.id);
  assert.equal(standard.grade, Number(matches[0].Grade), standard.id);
}
assert.deepEqual(used, new Set(standards.map((standard) => standard.id)));
console.log(`${standards.length} standard IDs, grades, titles and descriptions match the source CSVs exactly. ${[...mappings.matchAll(/target\('/g)].length} lesson evidence checks.`);
