import { Component, computed, input, output, signal } from '@angular/core';
import type { CommandType, MoveMathProblems } from '../domain/automation.models';
import { moveMathOperations } from '../core/move-math';
import { CommandGraphicComponent } from './command-graphic.component';
import { commandDescriptions, commandGroups, commandLabels } from './command-catalog';

@Component({
  selector: 'app-command-palette',
  imports: [CommandGraphicComponent],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.css',
})
export class CommandPaletteComponent {
  readonly allowed = input.required<readonly CommandType[]>();
  readonly readOnly = input(false);
  readonly moveMath = input<MoveMathProblems>();
  mathPreview(type: CommandType): { given: number; symbol: string; unit: string } | undefined {
    if (type !== 'move-distance' && type !== 'move-rotations') return undefined;
    const problem = this.moveMath()?.[type];
    return problem ? { given: problem.given, symbol: moveMathOperations[problem.operation].symbol,
      unit: type === 'move-distance' ? 'cm' : 'rotations' } : undefined;
  }
  readonly destination = input('Program end');
  readonly inLoop = input(false);
  readonly addBlock = output<CommandType>();
  readonly programEnd = output<void>();
  readonly filter = signal('all');
  readonly labels = commandLabels;
  readonly descriptions = commandDescriptions;
  readonly groups = computed(() => commandGroups.map((group) => ({
    ...group, types: group.types.filter((type) => this.allowed().includes(type)),
  })).filter((group) => group.types.length));
  readonly activeFilter = computed(() => this.groups().some((group) => group.id === this.filter()) ? this.filter() : 'all');
  readonly visibleGroups = computed(() => this.groups().filter((group) => this.activeFilter() === 'all' || group.id === this.activeFilter()));
  add(type: CommandType): void {
    if (!this.readOnly() && this.allowed().includes(type)) this.addBlock.emit(type);
  }
}
