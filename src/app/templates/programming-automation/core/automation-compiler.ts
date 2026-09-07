import type {
  CompiledCommand,
  MathEvidence,
  MathUnit,
  ProgramIssue,
  RobotChallenge,
  RobotCommand,
  RobotConfig,
  RobotProgram,
} from '../domain/automation.models';
import { calculate, evidenceIsCorrect } from './automation-math';
export function allCommands(commands: readonly RobotCommand[], depth = 0): readonly RobotCommand[] {
  return depth > 4
    ? []
    : commands.flatMap((command) => [command, ...allCommands(command.commands ?? [], depth + 1)]);
}
export function compileProgram(
  program: RobotProgram,
  robot: RobotConfig,
  challenge: RobotChallenge,
  math: readonly MathEvidence[],
  requireMath = false,
): { commands: readonly CompiledCommand[]; issues: readonly ProgramIssue[] } {
  const issues: ProgramIssue[] = [],
    compiled: CompiledCommand[] = [],
    variables: Record<string, number> = {};
  const issue = (
    code: string,
    message: string,
    commandId?: string,
    severity: 'error' | 'warning' = 'error',
  ) => issues.push({ code, message, commandId, severity });
  const ids = new Set<string>();
  let usesVariable = false,
    usesLoop = false;
  for (const variable of program.variables) {
    try {
      if (!/^[A-Z][A-Z0-9_]{0,24}$/.test(variable.name) || Object.hasOwn(variables, variable.name))
        throw new Error('Use a unique variable name such as SIDE.');
      variables[variable.name] = calculate(variable.value, variables);
    } catch (error) {
      issue('VARIABLE_INVALID', error instanceof Error ? error.message : 'Invalid variable.');
    }
  }
  const check = (commands: readonly RobotCommand[], depth: number): void => {
    if (depth > 4) {
      issue('LOOP_DEPTH', 'Use at most four nested loops.');
      return;
    }
    for (const command of commands) {
      if (ids.has(command.id))
        issue('COMMAND_ID_DUPLICATE', 'Each command needs a unique identifier.', command.id);
      ids.add(command.id);
      if (command.type === 'repeat') check(command.commands ?? [], depth + 1);
    }
  };
  check(program.commands, 0);
  if (ids.size > 100) issue('PROGRAM_LIMIT', 'Keep your program within 100 blocks.');
  const expand = (commands: readonly RobotCommand[], depth: number): void => {
    if (depth > 4 || compiled.length > 500) return;
    for (const command of commands) {
      if (command.disabled) continue;
      if (!challenge.allowedCommands.includes(command.type)) {
        issue('COMMAND_NOT_ALLOWED', 'This command is not available in this mission.', command.id);
        continue;
      }
      try {
        const value =
          command.type === 'pick-up' || command.type === 'drop-off'
            ? 0
            : calculate(command.value, variables);
        if (command.type === 'repeat') {
          if (!Number.isInteger(value) || value < 1 || value > 20 || !command.commands?.length)
            throw new Error('A loop needs 1–20 repeats and at least one command.');
          const before = compiled.length;
          for (let iteration = 0; iteration < value && compiled.length <= 500; iteration++)
            expand(command.commands, depth + 1);
          if (compiled.length > before) {
            usesLoop ||= value > 1;
            usesVariable ||= (command.value.match(/[A-Z][A-Z0-9_]*/g) ?? []).some((name) =>
              Object.hasOwn(variables, name),
            );
          }
          continue;
        }
        if (
          value < 0 ||
          value >
            (command.type.startsWith('turn')
              ? command.type === 'turn-fraction'
                ? 2
                : 720
              : command.type === 'wait'
                ? 120
                : 2000)
        )
          throw new Error('Command value is outside this lab’s range.');
        const turn = command.type.startsWith('turn');
        const rate = command.rate?.trim()
          ? calculate(command.rate, variables)
          : turn
            ? robot.turnRate
            : robot.moveSpeed;
        if (rate <= 0 || rate > (turn ? 180 : 100))
          throw new Error('Use a positive rate up to 100 cm/s or 180 degrees/s.');
        const units: Partial<Record<RobotCommand['type'], MathUnit>> = {
          'move-distance': 'cm',
          'move-rotations': 'rotations',
          'turn-degrees': 'degrees',
          'turn-fraction': 'turns',
          wait: 'seconds',
        };
        const unit = units[command.type];
        if (unit) {
          const evidence = math.find((item) => item.id === command.mathEvidenceId);
          if (
            !evidence ||
            !evidenceIsCorrect(evidence) ||
            evidence.unit !== unit ||
            Math.abs(evidence.answer - value) > 0.01
          )
            issue(
              'MATH_EVIDENCE',
              'Link a checked calculation matching this command’s value and unit.',
              command.id,
              requireMath ? 'error' : 'warning',
            );
        }
        compiled.push({
          id: command.id,
          type: command.type,
          value,
          rate,
          direction: command.direction ?? 'right',
          packageId: command.packageId,
        });
        usesVariable ||= (command.value.match(/[A-Z][A-Z0-9_]*/g) ?? []).some((name) =>
          Object.hasOwn(variables, name),
        );
        if (compiled.length > 500) {
          issue('EXECUTION_LIMIT', 'Expanded program exceeds 500 commands.');
          return;
        }
      } catch (error) {
        issue(
          'COMMAND_INVALID',
          error instanceof Error ? error.message : 'Invalid command.',
          command.id,
        );
      }
    }
  };
  expand(program.commands, 0);
  if (!compiled.length) issue('PROGRAM_EMPTY', 'Add a movement command to start.');
  if (requireMath) {
    for (const tool of challenge.requiredMath)
      if (!math.some((item) => item.tool === tool && evidenceIsCorrect(item)))
        issue('REQUIRED_MATH', `Complete the ${tool.replaceAll('-', ' ')} calculation.`);
    if (challenge.requiresVariable && !usesVariable)
      issue('VARIABLE_REQUIRED', 'Use a variable in an executed command value.');
    if (challenge.requiresLoop && !usesLoop)
      issue('LOOP_REQUIRED', 'Use a repeat block that runs a pattern at least twice.');
  }
  if (challenge.maximumCommands && ids.size > challenge.maximumCommands)
    issue('COMMAND_COUNT', `Use at most ${challenge.maximumCommands} blocks.`);
  return {
    commands: compiled,
    issues: issues.filter(
      (item, index, list) =>
        list.findIndex(
          (other) =>
            other.code === item.code &&
            other.commandId === item.commandId &&
            other.message === item.message,
        ) === index,
    ),
  };
}
