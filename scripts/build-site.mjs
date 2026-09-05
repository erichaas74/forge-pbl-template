import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { build } from 'esbuild';

const projectRoot = resolve(import.meta.dirname, '..');
const angularCli = join(projectRoot, 'node_modules', '@angular', 'cli', 'bin', 'ng.js');
const angular = spawnSync(process.execPath, [angularCli, 'build'], {
  cwd: projectRoot,
  stdio: 'inherit',
});
if (angular.status !== 0) process.exit(angular.status ?? 1);

const typeScriptCli = join(projectRoot, 'node_modules', 'typescript', 'bin', 'tsc');
const workerTypes = spawnSync(process.execPath, [typeScriptCli, '--project', 'tsconfig.worker.json'], {
  cwd: projectRoot,
  stdio: 'inherit',
});
if (workerTypes.status !== 0) process.exit(workerTypes.status ?? 1);

await build({
  entryPoints: [join(projectRoot, 'server', 'index.ts')],
  outfile: join(projectRoot, 'dist', 'server', 'index.js'),
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  sourcemap: true,
  minify: true,
});

const angularOutput = join(projectRoot, 'dist', 'forge-pbl-template', 'browser');
if (!existsSync(join(angularOutput, 'index.html'))) {
  throw new Error('Angular build did not produce its browser entrypoint.');
}
cpSync(angularOutput, join(projectRoot, 'dist', 'client'), { recursive: true });
rmSync(join(projectRoot, 'dist', 'forge-pbl-template'), { recursive: true, force: true });

const metadataOutput = join(projectRoot, 'dist', '.openai');
mkdirSync(metadataOutput, { recursive: true });
cpSync(join(projectRoot, '.openai', 'hosting.json'), join(metadataOutput, 'hosting.json'));
const migrations = join(projectRoot, 'drizzle');
if (existsSync(migrations)) cpSync(migrations, join(metadataOutput, 'drizzle'), { recursive: true });
