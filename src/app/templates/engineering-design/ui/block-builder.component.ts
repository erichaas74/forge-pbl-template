import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  isBlockDesign,
  type BlockDesign,
  type DesignBlock,
} from '../../../shared/engineering/block-design';

@Component({
  selector: 'app-block-builder',
  imports: [FormsModule],
  template: ` <section aria-label="Measured block builder">
    <h3>Build with your classroom blocks</h3>
    <p>
      Measure one block. All dimensions below are centimetres. Position is in metres: east +X, south
      +Z, height above the ground +Y.
    </p>
    <div class="fields">
      <label>Width (cm)<input type="number" min="1" max="500" [(ngModel)]="width" /></label>
      <label>Height (cm)<input type="number" min="1" max="500" [(ngModel)]="height" /></label>
      <label>Depth (cm)<input type="number" min="1" max="500" [(ngModel)]="depth" /></label>
      <label
        >East X (m)<input type="number" min="-12" max="12" step="0.05" [(ngModel)]="x"
      /></label>
      <label
        >South Z (m)<input type="number" min="-12" max="12" step="0.05" [(ngModel)]="z"
      /></label>
      <label>Base Y (m)<input type="number" min="0" max="10" step="0.05" [(ngModel)]="y" /></label>
      <label
        >Rotation<select [(ngModel)]="rotation">
          <option [ngValue]="0">0°</option>
          <option [ngValue]="90">90°</option>
          <option [ngValue]="180">180°</option>
          <option [ngValue]="270">270°</option>
        </select></label
      >
    </div>
    <div class="actions">
      <button (click)="add()" [disabled]="design().blocks.length >= 100">Add block</button
      ><button (click)="update()" [disabled]="!selected()">Update selected</button
      ><button (click)="stack()" [disabled]="!selected() || design().blocks.length >= 100">
        Stack a copy</button
      ><button (click)="remove()" [disabled]="!selected()">Remove selected</button
      ><button (click)="undo()" [disabled]="!previous()">Undo</button>
    </div>
    <label
      >Select a block<select [ngModel]="selected()" (ngModelChange)="select($event)">
        <option value="">Choose a block</option>
        @for (block of design().blocks; track block.id; let i = $index) {
          <option [value]="block.id">Block {{ i + 1 }} · base {{ block.y }} m</option>
        }
      </select></label
    >
    <p>
      {{ design().blocks.length }} / 100 blocks. Check that every block is supported when you build
      the physical model.
    </p>
    <details>
      <summary>Place ground targets</summary>
      <p>Each small ring marks a point to test for sunlight or shadow.</p>
      <div class="fields">
        <label>Target label<input maxlength="80" [(ngModel)]="targetLabel" /></label
        ><label
          >East X (m)<input
            type="number"
            min="-12"
            max="12"
            step="0.05"
            [(ngModel)]="targetX" /></label
        ><label
          >South Z (m)<input type="number" min="-12" max="12" step="0.05" [(ngModel)]="targetZ"
        /></label>
      </div>
      <button (click)="addTarget()" [disabled]="design().targets.length >= 12">Add target</button>
      @for (target of design().targets; track target.id) {
        <p>
          {{ target.label }} · X {{ target.x }}, Z {{ target.z }} m
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
  targetLabel = 'Season marker';
  targetX = 0;
  targetZ = -1;
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
    };
  }
  private change(next: BlockDesign): void {
    if (!isBlockDesign(next)) {
      this.error.set(
        'Check the dimensions and positions. Blocks must not overlap; move the new block or stack it above an existing block. Targets need a label.',
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
      blocks: this.design().blocks.map((b) => (b.id === this.selected() ? this.block(b.id) : b)),
    });
  }
  select(id: string): void {
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
    }
  }
  stack(): void {
    const b = this.design().blocks.find((b) => b.id === this.selected());
    if (b)
      this.change({
        ...this.design(),
        blocks: [
          ...this.design().blocks,
          { ...b, id: crypto.randomUUID(), y: Math.round((b.y + b.height) * 10000) / 10000 },
        ],
      });
  }
  remove(): void {
    this.change({
      ...this.design(),
      blocks: this.design().blocks.filter((b) => b.id !== this.selected()),
    });
    this.selected.set('');
  }
  undo(): void {
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
        },
      ],
    });
  }
  removeTarget(id: string): void {
    this.change({ ...this.design(), targets: this.design().targets.filter((t) => t.id !== id) });
  }
}
