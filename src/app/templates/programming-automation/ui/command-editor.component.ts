import { Component, computed, inject, input, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import type { CommandType, RobotCommand, RobotProgram } from '../domain/automation.models';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import { transformCommands } from '../core/automation-state';
import { evidenceIsCorrect } from '../core/automation-math';
import { compileProgram } from '../core/automation-compiler';
import { CommandGraphicComponent } from './command-graphic.component';
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
export const commandDescriptions: Record<CommandType, string> = {
  'move-distance': 'Drive forward a distance in centimeters.',
  'move-rotations': 'Drive forward by spinning the wheels.',
  'turn-degrees': 'Turn left or right by an angle.',
  'turn-fraction': 'Turn left or right by part of a full circle.',
  wait: 'Pause before the next block.',
  'pick-up': 'Collect a package at the robot’s position.',
  'drop-off': 'Deliver a package to its matching zone.',
  repeat: 'Run the blocks inside a set number of times.',
};
@Component({
  selector: 'app-command-editor',
  imports: [NgTemplateOutlet, CommandGraphicComponent],
  templateUrl: './command-editor.component.html',
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
  readonly verbs: Record<CommandType, string> = {
    'move-distance': 'Move',
    'move-rotations': 'Move',
    'turn-degrees': 'Turn',
    'turn-fraction': 'Turn',
    wait: 'Wait',
    'pick-up': 'Pick up',
    'drop-off': 'Drop off',
    repeat: 'Repeat',
  };
  readonly motionUnits: readonly { type: CommandType; label: string }[] = [
    { type: 'move-distance', label: 'cm' },
    { type: 'move-rotations', label: 'rotations' },
  ];
  readonly turnUnits: readonly { type: CommandType; label: string }[] = [
    { type: 'turn-degrees', label: 'degrees' },
    { type: 'turn-fraction', label: 'turns' },
  ];
  readonly descriptions = commandDescriptions;
  readonly collapsed = signal(new Set<string>());
  dragged = '';
  readonly program = computed(() => this.snapshot() ?? this.runtime.draft().program);
  readonly readOnly = computed(() => !!this.snapshot() || !this.runtime.canEdit());
  label(type: CommandType): string {
    return commandLabels[type];
  }
  verb(type: CommandType): string {
    return this.verbs[type];
  }
  description(type: CommandType): string {
    return this.descriptions[type];
  }
  valueWidth(value: string): number {
    return Math.min(18, Math.max(5, value.length + 2));
  }
  unitOptions(type: CommandType): readonly { type: CommandType; label: string }[] {
    return (type.startsWith('move') ? this.motionUnits : this.turnUnits).filter(
      (choice) =>
        choice.type === type || this.runtime.challenge().allowedCommands.includes(choice.type),
    );
  }
  changeUnit(command: RobotCommand, type: CommandType): void {
    if (
      type !== command.type &&
      this.unitOptions(command.type).some((choice) => choice.type === type)
    )
      this.edit(command.id, { type, mathEvidenceId: undefined });
  }
  startDrag(id: string, event: DragEvent): void {
    event.stopPropagation();
    if (this.readOnly()) {
      event.preventDefault();
      return;
    }
    this.dragged = id;
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
