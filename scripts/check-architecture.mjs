import { readdir, readFile } from 'node:fs/promises';
import { extname, relative, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const appRoot = resolve(root, 'src/app');
const violations = [];

const legacyProjectCode = new Set([
  'projects/mystery-substance/conservation-chamber.component.ts',
  'projects/mystery-substance/emergency-response.component.ts',
  'projects/mystery-substance/mystery-investigation.service.ts',
  'projects/mystery-substance/properties-lab.component.ts',
  'projects/mystery-substance/reaction-bench.component.ts',
  'projects/mystery-substance/station-workspaces.ts',
]);

for (const file of await sourceFiles(appRoot)) {
  const path = relative(appRoot, file).split(sep).join('/');
  if (path.endsWith('.spec.ts')) continue;
  const source = await readFile(file, 'utf8');
  const imports = [...source.matchAll(/(?:from\s+|import\s*\()["']([^"']+)["']/g)].map(
    (match) => match[1],
  );

  if (path.startsWith('core/')) {
    rejectImports(path, imports, ['/templates/', '/projects/', '/features/', '/infrastructure/']);
  }
  if (path.startsWith('shared/')) {
    rejectImports(path, imports, ['/templates/', '/projects/', '/features/', '/infrastructure/']);
  }
  if (path.startsWith('templates/')) {
    rejectImports(path, imports, ['/projects/', '/features/']);
  }
  if (
    path.startsWith('projects/') &&
    (/\.component\.ts$/.test(path) || /\.service\.ts$/.test(path)) &&
    !legacyProjectCode.has(path)
  ) {
    violations.push(`${path}: project packages may not add components or services`);
  }
}

if (violations.length > 0) {
  console.error('Architecture boundary violations:\n' + violations.map((item) => `- ${item}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Architecture boundaries are clean.');
}

function rejectImports(path, imports, forbiddenSegments) {
  for (const dependency of imports) {
    const normalized = `/${dependency.replaceAll('\\', '/')}/`;
    if (forbiddenSegments.some((segment) => normalized.includes(segment))) {
      violations.push(`${path}: forbidden dependency ${dependency}`);
    }
  }
}

async function sourceFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await sourceFiles(target)));
    else if (entry.isFile() && extname(entry.name) === '.ts') files.push(target);
  }
  return files;
}
