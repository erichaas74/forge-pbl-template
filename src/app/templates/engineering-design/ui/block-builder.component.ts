import { Component, effect, input, output, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DesignOpticsBuilderComponent } from './design-optics-builder.component';
import { DesignEditor, makePart } from '../../../shared/engineering/design-editor';
import { BlockPlanComponent } from './block-plan.component';
import {
  isBlockDesign,
  type BlockDesign,
  type DesignBlock,
} from '../../../shared/engineering/block-design';

@Component({
  selector: 'app-block-builder',
  imports: [FormsModule, DesignOpticsBuilderComponent, BlockPlanComponent],
  template: ` <section aria-label="Measured block builder">
    <h3>Shape your monument</h3>
    @if (editor(); as edit) {
      <p>Choose a piece, then drag it in the plan or 3D scene. Shift-click selects more stones.</p>
      <div class="actions parts" aria-label="Construction pieces">
        <button (click)="addPart('pillar')">＋ Pillar</button
        ><button (click)="addPart('lintel')">＋ Lintel</button>
        <button (click)="addPart('gate')">＋ Gate</button
        ><button (click)="addPart('window')">＋ Window stone</button>
      </div>
      <div class="fields">
        <label
          >Snap<select [ngModel]="edit.snap()" (ngModelChange)="edit.snap.set(+$event)">
            <option [value]="0">Free</option>
            <option [value]="0.01">1 cm</option>
            <option [value]="0.05">5 cm</option>
            <option [value]="0.1">10 cm</option>
          </select></label
        >
        <label
          >Select<select
            [ngModel]="edit.assemblies()"
            (ngModelChange)="edit.assemblies.set($event === true || $event === 'true')"
          >
            <option [ngValue]="true">Whole gate</option>
            <option [ngValue]="false">Individual stone</option>
          </select></label
        >
      </div>
      <app-block-plan [design]="design()" [editor]="edit" />
      <div class="actions" aria-label="Selected stone tools">
        <button (click)="edit.transform({ turn: 15 })" [disabled]="!edit.selection().length">
          ↶ 15°
        </button>
        <button (click)="edit.transform({ turn: -15 })" [disabled]="!edit.selection().length">
          ↷ 15°
        </button>
        <button (click)="edit.duplicate()" [disabled]="!edit.selection().length">Duplicate</button>
        <button (click)="edit.group()" [disabled]="edit.selection().length < 2">Group</button>
        <button (click)="edit.ungroup()" [disabled]="!edit.selection().length">Ungroup</button>
        <button (click)="remove()" [disabled]="!edit.selection().length">Remove</button>
        <button (click)="edit.undo()" [disabled]="!edit.canUndo()">Undo</button>
        <button (click)="edit.redo()" [disabled]="!edit.canRedo()">Redo</button>
      </div>
      <p role="status" [class.invalid]="edit.draftError()">
        {{ edit.draftError() || edit.message() }}
      </p>
      <details>
        <summary>Snap to another stone</summary>
        <label
          >Reference stone<select #support>
            <option value="">Choose a stone</option>
            @for (stone of design().blocks; track stone.id; let i = $index) {
              @if (!edit.selection().includes(stone.id)) {
                <option [value]="stone.id">{{ stone.label || 'Block ' + (i + 1) }}</option>
              }
            }
          </select></label
        >
        <div class="actions">
          <button
            (click)="edit.alignTo(support.value, 'top')"
            [disabled]="!edit.selection().length"
          >
            Stack on top</button
          ><button (click)="edit.alignTo(support.value, 'north')">North edge</button
          ><button (click)="edit.alignTo(support.value, 'south')">South edge</button
          ><button (click)="edit.alignTo(support.value, 'east')">East edge</button
          ><button (click)="edit.alignTo(support.value, 'west')">West edge</button>
        </div>
        <p>
          Edges align along the court axes. Top placement centers the selection over the reference
          stone. Check support before building.
        </p>
      </details>
      <details>
        <summary>Piece sizes & classroom kit</summary>
        <div class="fields">
          <label
            >Gate opening (cm)<input
              type="number"
              min="5"
              max="300"
              [(ngModel)]="gateWidth" /></label
          ><label
            >Gate height (cm)<input
              type="number"
              min="5"
              max="300"
              [(ngModel)]="gateHeight" /></label
          ><label
            >Gate depth (cm)<input type="number" min="2" max="100" [(ngModel)]="gateDepth"
          /></label>
        </div>
        <div class="fields">
          <label
            >Pillar width (cm)<input
              type="number"
              min="1"
              max="500"
              [(ngModel)]="pillarWidth" /></label
          ><label
            >Pillar height (cm)<input
              type="number"
              min="1"
              max="500"
              [(ngModel)]="pillarHeight" /></label
          ><label
            >Pillar depth (cm)<input
              type="number"
              min="1"
              max="500"
              [(ngModel)]="pillarDepth" /></label
          ><label
            >Lintel width (cm)<input
              type="number"
              min="1"
              max="500"
              [(ngModel)]="lintelWidth" /></label
          ><label
            >Lintel height (cm)<input
              type="number"
              min="1"
              max="500"
              [(ngModel)]="lintelHeight" /></label
          ><label
            >Lintel depth (cm)<input type="number" min="1" max="500" [(ngModel)]="lintelDepth"
          /></label>
        </div>
        <p>
          Set these sizes to match your classroom blocks. Gate sizes describe the clear opening; two
          pillars and one lintel are added together.
        </p>
      </details>
    }
    <details [open]="!editor()">
      <summary>Exact measurements & openings</summary>
      <p>All measurements are in centimetres. East +X, south +Z, height above the ground +Y.</p>
      <div class="fields">
        <label>Width (cm)<input type="number" min="1" max="500" [(ngModel)]="width" /></label>
        <label>Height (cm)<input type="number" min="1" max="500" [(ngModel)]="height" /></label>
        <label>Depth (cm)<input type="number" min="1" max="500" [(ngModel)]="depth" /></label>
        <label
          >East X (cm)<input
            type="number"
            min="-1200"
            max="1200"
            step="1"
            [ngModel]="x * 100"
            (ngModelChange)="x = $event / 100"
        /></label>
        <label
          >South Z (cm)<input
            type="number"
            min="-1200"
            max="1200"
            step="1"
            [ngModel]="z * 100"
            (ngModelChange)="z = $event / 100"
        /></label>
        <label
          >Base Y (cm)<input
            type="number"
            min="0"
            max="1000"
            step="1"
            [ngModel]="y * 100"
            (ngModelChange)="y = $event / 100"
        /></label>
        <label>Stone name<input maxlength="80" [(ngModel)]="blockName" /></label>
        <label
          >Rotation (°)<input type="number" min="0" max="359" step="1" [(ngModel)]="rotation"
        /></label>
      </div>
      <div class="actions">
        <button (click)="add()" [disabled]="design().blocks.length >= 100">Add block</button
        ><button (click)="update()" [disabled]="!selected()">Update selected</button
        ><button (click)="stack()" [disabled]="!selected() || design().blocks.length >= 100">
          Stack a copy</button
        ><button (click)="remove()" [disabled]="!selected()">Remove selected</button>
        @if (!editor()) {
          <button (click)="undo()" [disabled]="!previous()">Undo</button>
        }
      </div>
      <label
        >Select a block<select [ngModel]="selected()" (ngModelChange)="select($event)">
          <option value="">Choose a block</option>
          @for (block of design().blocks; track block.id; let i = $index) {
            <option [value]="block.id">
              {{ block.label || 'Block ' + (i + 1) }} · base {{ block.y * 100 }} cm
            </option>
          }
        </select></label
      >
      <p>
        {{ design().blocks.length }} / 100 blocks. Check that every block is supported when you
        build the physical model.
      </p>
      <app-design-optics-builder
        [design]="design()"
        [selectedId]="selected()"
        (changed)="change($event)"
        (selected)="select($event)"
      />
    </details>
    <details>
      <summary>Parts list · {{ design().blocks.length }} stones</summary>
      @for (part of partsList(); track part.size) {
        <p>{{ part.count }} × {{ part.size }}</p>
      }
      <p>
        Use these dimensions for the physical model. Support must be checked with your real blocks.
      </p>
    </details>
    <details>
      <summary>Place ground or pillar targets</summary>
      <p>
        Each ring marks a point to test for sunlight or shadow. Put a pillar mark exactly on its
        face.
      </p>
      <div class="fields">
        <label>Target label<input maxlength="80" [(ngModel)]="targetLabel" /></label
        ><label
          >East X (cm)<input
            type="number"
            min="-1200"
            max="1200"
            step="1"
            [ngModel]="targetX * 100"
            (ngModelChange)="targetX = $event / 100" /></label
        ><label
          >South Z (cm)<input
            type="number"
            min="-1200"
            max="1200"
            step="1"
            [ngModel]="targetZ * 100"
            (ngModelChange)="targetZ = $event / 100"
        /></label>
      </div>
      <div class="fields">
        <label
          >Target height Y (cm)<input
            type="number"
            min="0"
            max="1500"
            step="1"
            [ngModel]="targetY * 100"
            (ngModelChange)="targetY = $event / 100"
        /></label>
        <label
          >Face points<select [(ngModel)]="targetFace">
            <option value="up">Up · floor</option>
            <option value="east">East</option>
            <option value="west">West</option>
            <option value="north">North</option>
            <option value="south">South</option>
          </select></label
        >
      </div>
      <button (click)="addTarget()" [disabled]="design().targets.length >= 12">Add target</button>
      @for (target of design().targets; track target.id) {
        <p>
          {{ target.label }} · X {{ target.x * 100 }}, Y {{ (target.y ?? 0) * 100 }}, Z
          {{ target.z * 100 }} cm
          <button
            [attr.aria-label]="'Remove target ' + target.label"
            (click)="removeTarget(target.id)"
          >
            Remove
          </button>
        </p>
      }
    </details>
    @if (error()) {
      <p role="alert">{{ error() }}</p>
    }
  </section>`,
  styles: [
    `
      :host {
        display: block;
      }
      h3 {
        margin-top: 0;
      }
      .fields {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(115px, 1fr));
        gap: 10px;
      }
      label {
        display: grid;
        gap: 5px;
        font-size: 13px;
      }
      input,
      select,
      button {
        font: inherit;
        min-height: 42px;
        border: 1px solid #aabcb4;
        border-radius: 7px;
        padding: 8px;
        background: white;
        color: #173c36;
        width: 100%;
        box-sizing: border-box;
      }
      button {
        width: auto;
        cursor: pointer;
      }
      button:disabled {
        opacity: 0.45;
        cursor: default;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin: 12px 0;
      }
      p {
        font-size: 13px;
        line-height: 1.5;
        color: #49685f;
      }
      summary {
        cursor: pointer;
        padding: 10px 0;
      }
      *:focus-visible {
        outline: 3px solid #bd7317;
        outline-offset: 2px;
      }
    `,
  ],
})
export class BlockBuilderComponent {
  readonly design = input.required<BlockDesign>();
  readonly editor = input<DesignEditor>();
  readonly changed = output<BlockDesign>();
  readonly selected = signal('');
  readonly error = signal('');
  readonly previous = signal<BlockDesign | undefined>(undefined);
  width = 10;
  height = 10;
  depth = 10;
  x = 0.2;
  y = 0;
  z = 0;
  rotation = 0;
  blockName = '';
  gateWidth = 60;
  gateHeight = 80;
  gateDepth = 25;
  pillarWidth = 20;
  pillarHeight = 80;
  pillarDepth = 25;
  lintelWidth = 100;
  lintelHeight = 10;
  lintelDepth = 25;
  targetLabel = 'Season marker';
  targetX = 0;
  targetZ = -1;
  targetY = 0;
  targetFace: 'up' | 'east' | 'west' | 'north' | 'south' = 'up';
  constructor() {
    effect(() => {
      this.design();
      const edit = this.editor();
      const id = edit ? (edit.selection()[0] ?? '') : this.selected();
      untracked(() => this.loadSelection(id));
    });
  }
  partsList(): { size: string; count: number }[] {
    const counts = new Map<string, number>();
    for (const b of this.design().blocks) {
      const key =
        [b.width, b.height, b.depth].map((n) => +(n * 100).toFixed(2)).join(' × ') +
        ' cm' +
        (b.aperture ? ' · opening' : '');
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts].map(([size, count]) => ({ size, count }));
  }
  addPart(kind: 'pillar' | 'lintel' | 'gate' | 'window'): void {
    const gate = kind === 'gate' || kind === 'window';
    const sizes = gate
      ? [this.gateWidth, this.gateHeight, this.gateDepth]
      : kind === 'lintel'
        ? [this.lintelWidth, this.lintelHeight, this.lintelDepth]
        : [this.pillarWidth, this.pillarHeight, this.pillarDepth];
    this.editor()?.place(makePart(kind, sizes[0] / 100, sizes[1] / 100, sizes[2] / 100));
  }
  private block(id: string = crypto.randomUUID()): DesignBlock {
    return {
      id,
      width: this.width / 100,
      height: this.height / 100,
      depth: this.depth / 100,
      x: this.x,
      y: this.y,
      z: this.z,
      rotation: this.rotation,
      ...(this.blockName.trim() ? { label: this.blockName.trim() } : {}),
    };
  }
  change(next: BlockDesign): void {
    if (this.editor()) {
      this.editor()!.commit(next);
      return;
    }
    if (!isBlockDesign(next)) {
      this.error.set(
        'Check the dimensions and positions. Blocks and the sculpture’s reserved space must not overlap. A hole must fit within 90% of its face, leaving an unbroken rim. Targets need a label.',
      );
      return;
    }
    this.error.set('');
    this.previous.set(structuredClone(this.design()));
    this.changed.emit(next);
  }
  add(): void {
    const block = this.block();
    this.change({ ...this.design(), blocks: [...this.design().blocks, block] });
  }
  update(): void {
    this.change({
      ...this.design(),
      blocks: this.design().blocks.map((b) =>
        b.id === this.selected() ? { ...b, ...this.block(b.id) } : b,
      ),
    });
  }
  select(id: string): void {
    if (this.editor() && this.editor()!.selection()[0] !== id) this.editor()!.select(id);
    this.loadSelection(id);
  }
  private loadSelection(id: string): void {
    this.selected.set(id);
    const b = this.design().blocks.find((b) => b.id === id);
    if (b) {
      this.width = b.width * 100;
      this.height = b.height * 100;
      this.depth = b.depth * 100;
      this.x = b.x;
      this.y = b.y;
      this.z = b.z;
      this.rotation = b.rotation;
      this.blockName = b.label ?? '';
    }
  }
  stack(): void {
    const b = this.design().blocks.find((b) => b.id === this.selected());
    if (b)
      this.change({
        ...this.design(),
        blocks: [
          ...this.design().blocks,
          {
            ...b,
            assemblyId: undefined,
            id: crypto.randomUUID(),
            y: Math.round((b.y + b.height) * 10000) / 10000,
          },
        ],
      });
  }
  remove(): void {
    this.change({
      ...this.design(),
      blocks: this.design().blocks.filter(
        (b) => !(this.editor()?.selection() ?? [this.selected()]).includes(b.id),
      ),
    });
    this.selected.set('');
  }
  undo(): void {
    if (this.editor()) {
      this.editor()!.undo();
      return;
    }
    const prev = this.previous();
    if (prev) {
      this.changed.emit(prev);
      this.previous.set(undefined);
      this.selected.set('');
    }
  }
  addTarget(): void {
    this.change({
      ...this.design(),
      targets: [
        ...this.design().targets,
        {
          id: crypto.randomUUID(),
          label: this.targetLabel.trim(),
          x: this.targetX,
          z: this.targetZ,
          y: this.targetY,
          normal: (
            {
              up: [0, 1, 0],
              east: [1, 0, 0],
              west: [-1, 0, 0],
              north: [0, 0, -1],
              south: [0, 0, 1],
            } as const
          )[this.targetFace],
        },
      ],
    });
  }
  removeTarget(id: string): void {
    this.change({ ...this.design(), targets: this.design().targets.filter((t) => t.id !== id) });
  }
}
