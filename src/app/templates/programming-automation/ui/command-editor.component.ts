import { Component, computed, inject, input, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import type { CommandType, RobotCommand, RobotProgram } from '../domain/automation.models';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import { transformCommands } from '../core/automation-state';
import { evidenceIsCorrect } from '../core/automation-math';
import { compileProgram } from '../core/automation-compiler';
export const commandLabels: Record<CommandType, string> = {
  'move-distance': 'Move distance',
  'move-rotations': 'Move rotations',
  'turn-degrees': 'Turn degrees',
  'turn-fraction': 'Turn fraction',
  wait: 'Wait',
  'pick-up': 'Pick up',
  'drop-off': 'Drop off',
  repeat: 'Repeat',
};
@Component({
  selector: 'app-command-editor',
  imports: [NgTemplateOutlet],
  template: `
    <div class="section-top">
      <div>
        <small>BUILD</small>
        <h2>Your program</h2>
      </div>
      <span class="tag">v{{ program().version }}</span>
    </div>
    @if (!runtime.sample && !runtime.reasoningOpened()) {
      <div class="guess-guide">
        <strong>{{
          runtime.challenge().discovery ? 'Start with a guess' : 'Build it yourself'
        }}</strong>
        <p>
          {{
            runtime.challenge().discovery?.instructions ??
              'Use the command instructions to build your route. Enter a number as your first guess, run your code, then use the result to improve it.'
          }}
        </p>
      </div>
    }
    <details class="command-reference">
      <summary>Command instructions</summary>
      <p>The robot follows blocks from top to bottom. Enter a number in each movement block.</p>
      @for (type of runtime.challenge().allowedCommands; track type) {
        <p>
          <code>{{ instructions[type] }}</code>
        </p>
      }
    </details>
    @if (readOnly()) {
      <p class="notice">
        {{ snapshot() ? 'Recorded program · replay only' : 'This program is locked.' }}
      </p>
    }
    @if (runtime.challenge().requiresVariable || program().variables.length) {
      <details class="variables" open>
        <summary>Variables · named values</summary>
        @for (variable of program().variables; track variable.id; let i = $index) {
          <div class="variable">
            <input
              aria-label="Variable name"
              placeholder="DISTANCE"
              [value]="variable.name"
              [disabled]="readOnly()"
              (change)="updateVariable(i, 'name', $any($event.target).value)"
            /><span>=</span
            ><input
              aria-label="Variable value"
              placeholder="100"
              [value]="variable.value"
              [disabled]="readOnly()"
              (change)="updateVariable(i, 'value', $any($event.target).value)"
            /><input
              aria-label="Variable unit"
              placeholder="cm"
              [value]="variable.unit"
              [disabled]="readOnly()"
              (change)="updateVariable(i, 'unit', $any($event.target).value)"
            /><button
              aria-label="Remove variable"
              [disabled]="readOnly()"
              (click)="removeVariable(i)"
            >
              ×
            </button>
          </div>
        }
        <button [disabled]="readOnly()" (click)="addVariable()">+ Variable</button>
        <p>Use a name in a command, such as DISTANCE / 2.</p>
      </details>
    }
    @if (!snapshot()) {
      @for (issue of runtime.compiled().issues; track $index) {
        @if (
          !issue.commandId &&
          issue.code !== 'PROGRAM_EMPTY' &&
          (runtime.reasoningOpened() || issue.code !== 'MATH_EVIDENCE')
        ) {
          <p class="issue" [class.error]="issue.severity === 'error'">{{ issue.message }}</p>
        }
      }
    }
    <ng-container *ngTemplateOutlet="list; context: { $implicit: program().commands }" />
    <ng-template #list let-commands>
      <ol class="commands">
        @for (command of commands; track command.id; let i = $index) {
          <li
            class="command"
            [class.selected]="runtime.selectedCommandId() === command.id"
            [class.active]="activeId() === command.id"
            [class.disabled]="command.disabled"
            [class.guess-command]="
              !runtime.reasoningOpened() &&
              command.id === runtime.challenge().discovery?.focusCommandId
            "
            [draggable]="!readOnly()"
            (dragstart)="dragged = command.id"
            (dragover)="$event.preventDefault()"
            (drop)="drop(command.id, $event)"
          >
            <div class="command-heading">
              <button
                class="choose"
                (click)="runtime.selectCommand(command.id)"
                [attr.aria-pressed]="runtime.selectedCommandId() === command.id"
              >
                <b>{{ i + 1 }}</b
                >{{ label(command.type) }}
              </button>
              <div class="tools">
                <button
                  [disabled]="readOnly() || i === 0"
                  aria-label="Move command up"
                  (click)="move(command.id, -1)"
                >
                  ↑</button
                ><button
                  [disabled]="readOnly() || i === commands.length - 1"
                  aria-label="Move command down"
                  (click)="move(command.id, 1)"
                >
                  ↓</button
                ><button
                  [disabled]="readOnly()"
                  aria-label="Duplicate command"
                  (click)="duplicate(command.id)"
                >
                  ⧉</button
                ><button
                  [disabled]="readOnly()"
                  aria-label="Remove command"
                  (click)="remove(command.id)"
                >
                  ×
                </button>
              </div>
            </div>
            @if (
              !runtime.reasoningOpened() &&
              command.id === runtime.challenge().discovery?.focusCommandId
            ) {
              <p class="guess-label">YOUR GUESS · Change this number, then run</p>
            }
            <div class="fields">
              @if (command.type === 'pick-up' || command.type === 'drop-off') {
                <label
                  >Package<select
                    [value]="command.packageId ?? ''"
                    [disabled]="readOnly()"
                    (change)="edit(command.id, { packageId: $any($event.target).value })"
                  >
                    @for (pkg of runtime.course().packages; track pkg.id) {
                      <option [value]="pkg.id" [selected]="pkg.id === command.packageId">
                        {{ pkg.label }}
                      </option>
                    }
                  </select></label
                >
              } @else {
                <label
                  >{{ unit(command.type)
                  }}<input
                    [attr.aria-label]="label(command.type) + ' value'"
                    placeholder="Enter value or fraction"
                    [value]="command.value"
                    [disabled]="readOnly()"
                    (focus)="runtime.selectCommand(command.id)"
                    (input)="edit(command.id, { value: $any($event.target).value })"
                /></label>
              }
              @if (command.type.startsWith('turn')) {
                <label
                  >Direction<select
                    [value]="command.direction ?? 'right'"
                    [disabled]="readOnly()"
                    (change)="edit(command.id, { direction: $any($event.target).value })"
                  >
                    <option value="right" [selected]="command.direction !== 'left'">Right ↻</option>
                    <option value="left" [selected]="command.direction === 'left'">Left ↺</option>
                  </select></label
                >
              }
              @if (command.type.startsWith('move') || command.type.startsWith('turn')) {
                <label
                  >{{ command.type.startsWith('turn') ? '° / second' : 'cm / second'
                  }}<input
                    [attr.aria-label]="label(command.type) + ' speed'"
                    [placeholder]="command.type.startsWith('turn') ? '45' : '20'"
                    [value]="command.rate ?? ''"
                    [disabled]="readOnly()"
                    (input)="edit(command.id, { rate: $any($event.target).value })"
                /></label>
              }
            </div>
            <div class="command-bottom">
              <label class="check"
                ><input
                  type="checkbox"
                  [checked]="!command.disabled"
                  [disabled]="readOnly()"
                  (change)="edit(command.id, { disabled: !$any($event.target).checked })"
                />Enabled</label
              >
              @if (
                runtime.reasoningOpened() &&
                command.type !== 'repeat' &&
                command.type !== 'pick-up' &&
                command.type !== 'drop-off'
              ) {
                <button class="math-link" (click)="runtime.selectCommand(command.id)">
                  {{ mathLabel(command) }}
                </button>
              }
            </div>
            @for (issue of runtime.compiled().issues; track $index) {
              @if (
                !snapshot() &&
                issue.commandId === command.id &&
                (runtime.reasoningOpened() || issue.code !== 'MATH_EVIDENCE')
              ) {
                <p class="issue" [class.error]="issue.severity === 'error'">{{ issue.message }}</p>
              }
            }
            @if (command.type === 'repeat') {
              <button class="collapse" (click)="toggle(command.id)">
                {{ collapsed().has(command.id) ? '▸ Show loop commands' : '▾ Loop commands' }}
              </button>
              @if (!collapsed().has(command.id)) {
                <ng-container
                  *ngTemplateOutlet="list; context: { $implicit: command.commands ?? [] }"
                />
                @if (!readOnly()) {
                  <label class="add"
                    >Add inside loop<select
                      aria-label="Add command inside loop"
                      value=""
                      (change)="add($any($event.target), command.id)"
                    >
                      <option value="">Choose a command…</option>
                      @for (type of runtime.challenge().allowedCommands; track type) {
                        <option [value]="type">{{ labels[type] }}</option>
                      }
                    </select></label
                  >
                }
              }
            }
          </li>
        } @empty {
          <li class="empty">
            <strong>Every delivery starts with a command.</strong>
            <p>
              Choose a command below and enter your first number guess. Add the next steps and test
              your program.
            </p>
          </li>
        }
      </ol></ng-template
    >
    @if (!readOnly()) {
      <label class="add"
        >+ Add command<select aria-label="Add command" value="" (change)="add($any($event.target))">
          <option value="">Choose a command…</option>
          @for (type of runtime.challenge().allowedCommands; track type) {
            <option [value]="type">{{ labels[type] }}</option>
          }
        </select></label
      >
      @if (!runtime.challenge().requiresVariable) {
        <button class="secondary" (click)="addVariable()">+ Named variable</button>
      }
    }
  `,
  styleUrl: './command-editor.component.css',
})
export class CommandEditorComponent {
  readonly shownIssues = computed(
    () =>
      compileProgram(
        this.program(),
        this.runtime.config.robot,
        this.runtime.challenge(),
        this.runtime.state().math,
      ).issues,
  );
  readonly runtime = inject(AutomationRuntimeService);
  readonly snapshot = input<RobotProgram>();
  readonly activeId = input('');
  readonly labels = commandLabels;
  readonly instructions: Record<CommandType, string> = {
    'move-distance': 'MOVE_DISTANCE(cm) — drive forward that many centimeters.',
    'move-rotations': 'MOVE_ROTATIONS(rotations) — spin the wheels that many times.',
    'turn-degrees': 'TURN_DEGREES(angle) — turn left or right in degrees.',
    'turn-fraction': 'TURN_FRACTION(fraction) — turn part of a full circle.',
    wait: 'WAIT(seconds) — pause before the next command.',
    'pick-up': 'PICK_UP(package) — collect a package at your position.',
    'drop-off': 'DROP_OFF(package) — deliver a package at its matching zone.',
    repeat: 'REPEAT(times) — run the blocks inside this loop again.',
  };
  readonly collapsed = signal(new Set<string>());
  dragged = '';
  readonly program = computed(() => this.snapshot() ?? this.runtime.draft().program);
  readonly readOnly = computed(() => !!this.snapshot() || !this.runtime.canEdit());
  label(type: CommandType): string {
    return commandLabels[type];
  }
  unit(type: CommandType): string {
    return (
      (
        {
          'move-distance': 'Distance (cm)',
          'move-rotations': 'Wheel rotations',
          'turn-degrees': 'Angle (°)',
          'turn-fraction': 'Fraction of a turn',
          wait: 'Seconds',
          repeat: 'Repetitions',
        } as Partial<Record<CommandType, string>>
      )[type] ?? 'Value'
    );
  }
  edit(id: string, patch: Partial<RobotCommand>): void {
    if (!this.readOnly()) this.runtime.editCommand(id, patch);
  }
  add(select: HTMLSelectElement, parentId?: string): void {
    if (select.value && !this.readOnly())
      this.runtime.addCommand(select.value as CommandType, parentId);
    select.value = '';
  }
  remove(id: string): void {
    this.runtime.setCommands(transformCommands(this.program().commands, id, () => []));
  }
  duplicate(id: string): void {
    const copy = (cmd: RobotCommand): RobotCommand => ({
      ...cmd,
      id: crypto.randomUUID(),
      commands: cmd.commands?.map(copy),
    });
    this.runtime.setCommands(transformCommands(this.program().commands, id, (c) => [c, copy(c)]));
  }
  move(id: string, direction: number): void {
    const walk = (commands: readonly RobotCommand[]): readonly RobotCommand[] => {
      const index = commands.findIndex((c) => c.id === id);
      if (index >= 0) {
        const result = [...commands];
        const next = index + direction;
        if (next >= 0 && next < result.length)
          [result[index], result[next]] = [result[next], result[index]];
        return result;
      }
      return commands.map((c) => (c.commands ? { ...c, commands: walk(c.commands) } : c));
    };
    this.runtime.setCommands(walk(this.program().commands));
  }
  drop(target: string, event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.readOnly()) return;
    const walk = (commands: readonly RobotCommand[]): readonly RobotCommand[] => {
      const from = commands.findIndex((c) => c.id === this.dragged),
        to = commands.findIndex((c) => c.id === target);
      if (from >= 0 && to >= 0) {
        const result = [...commands];
        result.splice(to, 0, result.splice(from, 1)[0]);
        return result;
      }
      return commands.map((c) => (c.commands ? { ...c, commands: walk(c.commands) } : c));
    };
    this.runtime.setCommands(walk(this.program().commands));
    this.dragged = '';
  }
  toggle(id: string): void {
    this.collapsed.update((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  mathLabel(command: RobotCommand): string {
    const evidence = this.runtime.state().math.find((item) => item.id === command.mathEvidenceId);
    return evidence
      ? evidenceIsCorrect(evidence) &&
        !this.shownIssues().some(
          (issue) => issue.commandId === command.id && issue.code === 'MATH_EVIDENCE',
        )
        ? '✓ Math linked'
        : '△ Check math'
      : '↗ Link a calculation';
  }
  addVariable(): void {
    this.runtime.updateVariables([
      ...this.program().variables,
      { id: crypto.randomUUID(), name: '', value: '', unit: 'cm' },
    ]);
  }
  updateVariable(index: number, key: 'name' | 'value' | 'unit', value: string): void {
    this.runtime.updateVariables(
      this.program().variables.map((v, i) => (i === index ? { ...v, [key]: value } : v)),
    );
  }
  removeVariable(index: number): void {
    this.runtime.updateVariables(this.program().variables.filter((_, i) => i !== index));
  }
}
