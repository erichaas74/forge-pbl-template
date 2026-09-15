// Build only browser code: the running Castle preview already has the unchanged local assets.
// This avoids copying other projects' public assets on a disk with limited free space.
const { workspaces, logging } = require('@angular-devkit/core');
const { NodeJsSyncHost } = require('@angular-devkit/core/node');
const { Architect } = require('@angular-devkit/architect');
const { WorkspaceNodeModulesArchitectHost } = require('@angular-devkit/architect/node');
async function main() {
  const { workspace } = await workspaces.readWorkspace('angular.json', workspaces.createWorkspaceHost(new NodeJsSyncHost()));
  const architect = new Architect(new WorkspaceNodeModulesArchitectHost(workspace, process.cwd()));
  const logger = new logging.Logger('castle-minimal-ui');
  logger.subscribe(entry => console.log(entry.message));
  const run = await architect.scheduleTarget({project:'forge-pbl-template',target:'build',configuration:'production'}, {browser:'output/castle-week-bootstrap.ts',tsConfig:'output/castle-week-app-tsconfig.json',outputPath:'output/castle-minimal-ui-code-build',assets:[],deleteOutputPath:true}, {logger});
  try { const result = await run.result; if (!result.success) process.exitCode = 1; }
  finally { await run.stop(); }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
