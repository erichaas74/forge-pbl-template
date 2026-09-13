/**
 * Uploads the large media files to the Firebase Storage `site-media/` prefix that
 * `hostedMediaUrl()` reads from. Video is deliberately kept out of the App Hosting
 * source bundle, so these files must exist in Storage for the app to play them.
 *
 *   node scripts/upload-site-media.mjs --dry-run   # print the plan, upload nothing
 *   node scripts/upload-site-media.mjs             # upload
 *
 * Requires the Google Cloud SDK on PATH and an authenticated account with write
 * access to the bucket (`gcloud auth login`).
 */
import { spawnSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const BUCKET = 'livelessondemogames.firebasestorage.app';
const PREFIX = 'site-media';

/** Local source -> path under the site-media prefix. Keep in step with hostedMediaUrl() callers. */
const uploads = [
  [
    'public/project-intros/frontier/trading-town-launch.mp4',
    'project-intros/frontier/trading-town-launch.mp4',
  ],
  [
    'public/project-intros/voyage/intro-launch-video.mp4',
    'project-intros/voyage/intro-launch-video.mp4',
  ],
  [
    'public/history-live/final-presentations/newsroom-report.mp4',
    'history-live/final-presentations/newsroom-report.mp4',
  ],
  [
    'public/history-live/final-presentations/competing-correspondents.mp4',
    'history-live/final-presentations/competing-correspondents.mp4',
  ],
  [
    'public/history-live/final-presentations/social-report.mp4',
    'history-live/final-presentations/social-report.mp4',
  ],
  [
    'public/history-live/final-presentations/presentation-reel.webm',
    'history-live/final-presentations/presentation-reel.webm',
  ],
  // The senate openings were never copied into public/; docs/ holds the only source.
  [
    'docs/debate-studio/opening-Senator Lucius.mp4',
    'debate-studio/openings/opening-Senator Lucius.mp4',
  ],
  [
    'docs/debate-studio/opening-Senator Cassius.mp4',
    'debate-studio/openings/opening-Senator Cassius.mp4',
  ],
];

const dryRun = process.argv.includes('--dry-run');

/**
 * Windows ships gcloud only as a .cmd wrapper (there is no gcloud.exe), and Node refuses to
 * spawn .cmd without a shell. A shell re-parses the command line, so on Windows each argument
 * is wrapped in double quotes — two of the media filenames contain spaces. Elsewhere gcloud is
 * a real executable and arguments are passed as argv, needing no quoting at all.
 */
const isWindows = process.platform === 'win32';
function gcloud(args, options = {}) {
  return isWindows
    ? spawnSync(
        'gcloud.cmd',
        args.map((arg) => '"' + arg + '"'),
        { ...options, shell: true },
      )
    : spawnSync('gcloud', args, { ...options, shell: false });
}

const missing = uploads.filter(([from]) => !existsSync(resolve(root, from)));
if (missing.length) {
  console.error('Missing local source files:');
  for (const [from] of missing) console.error('  ' + from);
  process.exit(1);
}

if (!dryRun) {
  const probe = gcloud(['--version'], { encoding: 'utf8' });
  if (probe.status !== 0) {
    console.error(
      'gcloud not found on PATH. Install the Google Cloud SDK, then open a new terminal\n' +
        '(a new tab in an editor started before the install still carries the old PATH).',
    );
    process.exit(1);
  }
}

let failed = 0;
for (const [from, to] of uploads) {
  const src = resolve(root, from);
  const dest = `gs://${BUCKET}/${PREFIX}/${to}`;
  const mb = (statSync(src).size / 1048576).toFixed(2);
  if (dryRun) {
    console.log(`[dry-run] ${mb} MB  ${from}\n            -> ${dest}`);
    continue;
  }
  console.log(`${mb} MB  ${from} -> ${dest}`);
  const run = gcloud(['storage', 'cp', src, dest], { stdio: 'inherit' });
  if (run.status !== 0) {
    console.error(`  FAILED: ${from}`);
    failed++;
  }
}

if (failed) {
  console.error(`\n${failed} of ${uploads.length} uploads failed.`);
  process.exit(1);
}
console.log(dryRun ? `\n${uploads.length} files planned.` : `\n${uploads.length} files uploaded.`);
