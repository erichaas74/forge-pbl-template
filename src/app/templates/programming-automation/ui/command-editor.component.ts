import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import type {
  CommandType,
  MoveMathOperation,
  RobotCommand,
  RobotProgram,
} from '../domain/automation.models';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import { transformCommands } from '../core/automation-state';
import { evidenceIsCorrect } from '../core/automation-math';
import { compileProgram } from '../core/automation-compiler';
import { moveMathOperations } from '../core/move-math';
import { CommandGraphicComponent } from './command-graphic.component';
import { CommandPaletteComponent } from './command-palette.component';
import { commandLabels, commandDescriptions } from './command-catalog';
export { commandLabels, commandDescriptions } from './command-catalog';
@Component({
  selector: 'app-command-editor',
  imports: [NgTemplateOutlet, CommandGraphicComponent, CommandPaletteComponent],
  templateUrl: './command-editor.component.html',
  styleUrl: './command-editor.component.css',
})
export class CommandEditorComponent {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly palette = viewChild<ElementRef<HTMLElement>>('paletteHost');
  readonly insertion = signal<{ challengeId: string; parentId: string } | undefined>(undefined);
  readonly addedMessage = signal('');
  readonly paletteOpen = signal(false);
  readonly reasoning = output<void>();
  private paletteTrigger?: HTMLElement;
  readonly insertionParent = computed(() => {
    const insertion = this.insertion();
    if (!insertion || insertion.challengeId !== this.runtime.challenge().id) return undefined;
    const command = this.commandPath(this.program().commands, insertion.parentId).at(-1);
    return command?.type === 'repeat' ? command : undefined;
  });
  readonly insertionLabel = computed(() => {
    const parent = this.insertionParent();
    return parent ? `Inside Repeat (${parent.value || '?'} times)` : 'Program end';
  });
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
  readonly assessmentLinks = input(true);
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
  constructor() {
    effect(() => {
      this.runtime.challenge().id;
      this.snapshot();
      this.insertion.set(undefined);
      this.paletteOpen.set(false);
      this.addedMessage.set('');
    });
  }
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
  mathOperation(operation: MoveMathOperation) {
    return moveMathOperations[operation];
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
  private commandPath(commands: readonly RobotCommand[], id: string): readonly RobotCommand[] {
    for (const command of commands) {
      if (command.id === id) return [command];
      const path = this.commandPath(command.commands ?? [], id);
      if (path.length) return [command, ...path];
    }
    return [];
  }
  focusPalette(parentId?: string): void {
    if (this.readOnly()) return;
    this.paletteTrigger = this.element.nativeElement.ownerDocument.activeElement as HTMLElement;
    this.paletteOpen.set(true);
    this.insertion.set(
      parentId ? { challengeId: this.runtime.challenge().id, parentId } : undefined,
    );
    afterNextRender(
      () => {
        const palette = this.palette()?.nativeElement;
        palette?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        palette?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
  closePalette(): void {
    this.paletteOpen.set(false);
    afterNextRender(() => this.paletteTrigger?.focus(), { injector: this.injector });
  }
  addBlock(type: CommandType): void {
    if (this.readOnly() || !this.runtime.challenge().allowedCommands.includes(type)) return;
    const parent = this.insertionParent();
    this.runtime.addCommand(type, parent?.id);
    const id = this.runtime.selectedCommandId();
    const path = this.commandPath(this.program().commands, id);
    if (!path.length) return;
    this.paletteOpen.set(false);
    this.collapsed.update((collapsed) => {
      const next = new Set(collapsed);
      path.forEach((command) => next.delete(command.id));
      return next;
    });
    this.addedMessage.set(
      `${this.labels[type]} added ${parent ? 'inside Repeat' : 'to your program'}.`,
    );
    afterNextRender(
      () => {
        const block = Array.from(
          this.element.nativeElement.querySelectorAll<HTMLElement>('[data-command-id]'),
        ).find((element) => element.dataset['commandId'] === id);
        block?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        const control =
          block?.querySelector<HTMLElement>('.block-input, .package') ??
          block?.querySelector<HTMLElement>('.choose');
        control?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
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
