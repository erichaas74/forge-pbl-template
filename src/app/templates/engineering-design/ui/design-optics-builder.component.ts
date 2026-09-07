import { Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type {
  BlockDesign,
  DesignAperture,
  DesignDisplayObject,
} from '../../../shared/engineering/block-design';

@Component({
  selector: 'app-design-optics-builder',
  imports: [FormsModule],
  template: `
    <section aria-label="Light windows and sculpture">
      <h3>Shape the light</h3>
      <p>A deep hole admits a narrow range of Sun angles. A thin window admits a wider range.</p>
      <button (click)="addWindow()" [disabled]="design().blocks.length > 97">
        Add a supported light window
      </button>
      <p>
        This adds three measured blocks in a free space. Select its upper block to change the
        insert.
      </p>
      <details>
        <summary>Cylindrical hole &amp; colored insert</summary>
        @if (selectedId()) {
          <label
            >Opening<select [(ngModel)]="axis">
              <option value="none">Solid block</option>
              <option value="z">Front to back (local Z)</option>
              <option value="x">Side to side (local X)</option>
              <option value="y">Top to bottom (Y)</option>
            </select></label
          >
          @if (axis !== 'none') {
            <div class="fields">
              <label
                >Hole diameter (cm)<input type="number" min="0.5" step="0.5" [(ngModel)]="diameter"
              /></label>
              <label
                >Insert<select [(ngModel)]="insert">
                  <option value="open">Empty hole</option>
                  <option value="glass">Flat glass lens / filter</option>
                  <option value="jewel">Jewel window</option>
                </select></label
              >
              @if (insert !== 'open') {
                <label
                  >Color<select [(ngModel)]="color">
                    <option value="clear">Clear</option>
                    <option value="red">Ruby red</option>
                    <option value="amber">Amber</option>
                    <option value="green">Emerald green</option>
                    <option value="blue">Sapphire blue</option>
                    <option value="violet">Amethyst violet</option>
                  </select></label
                >
              }
            </div>
            <p>
              The centered hole must be smaller than 90% of both face dimensions. Turn the block to
              aim it.
            </p>
          }
          <button (click)="saveHole()">Apply opening to selected block</button>
        } @else {
          <p>Select a block above to cut its hole and choose an insert.</p>
        }
        <p class="note">
          Inserts filter straight sunlight. Lens focusing, refraction and prism rainbows are not
          simulated.
        </p>
      </details>
      <details>
        <summary>Central 3D sculpture</summary>
        <p>
          Build around a sculpture. Compare its lit faces, cast shadow and colored light at each
          special date.
        </p>
        <div class="fields">
          <label
            >Model<select [(ngModel)]="model">
              <option value="crystal">Faceted crystal sculpture</option>
              <option value="sphere">Round sculpture</option>
              <option value="obelisk">Obelisk</option>
            </select></label
          >
          <label
            >Surface<select [(ngModel)]="material">
              <option value="limestone">Pale limestone</option>
              <option value="porcelain">White porcelain</option>
              <option value="bronze">Bronze</option>
            </select></label
          >
          <label
            >Width (cm)<input type="number" min="5" max="500" [(ngModel)]="objectWidth"
          /></label>
          <label
            >Height (cm)<input type="number" min="5" max="500" [(ngModel)]="objectHeight"
          /></label>
          <label
            >East X (m)<input type="number" min="-12" max="12" step="0.05" [(ngModel)]="objectX"
          /></label>
          <label
            >South Z (m)<input type="number" min="-12" max="12" step="0.05" [(ngModel)]="objectZ"
          /></label>
          <label
            >Base Y (m)<input type="number" min="0" max="10" step="0.05" [(ngModel)]="objectY"
          /></label>
          <label
            >Rotation (°)<input type="number" min="0" max="359" [(ngModel)]="objectRotation"
          /></label>
        </div>
        <div class="actions">
          <button (click)="saveObject()">
            {{ design().displayObject ? 'Update sculpture' : 'Add sculpture' }}
          </button>
          @if (design().displayObject) {
            <button (click)="removeObject()">Remove sculpture</button>
          }
        </div>
        <p>
          Place it behind a colored window, with space for the light to reach it. Pale surfaces show
          colors most clearly.
        </p>
      </details>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        margin: 18px 0;
        padding: 16px;
        background: #f2ede5;
        border: 1px solid #d5c5ad;
        border-radius: 12px;
      }
      h3 {
        margin: 0 0 8px;
        color: #503b21;
      }
      p {
        font-size: 13px;
        line-height: 1.5;
        color: #5d594d;
      }
      .fields {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: 10px;
      }
      label {
        display: grid;
        gap: 5px;
        font-size: 13px;
        margin: 8px 0;
      }
      input,
      select,
      button {
        box-sizing: border-box;
        width: 100%;
        min-height: 42px;
        padding: 8px;
        border: 1px solid #b7a68d;
        border-radius: 7px;
        background: #fffdfa;
        color: #3c362d;
        font: inherit;
      }
      button {
        cursor: pointer;
      }
      button:disabled {
        opacity: 0.45;
      }
      summary {
        cursor: pointer;
        padding: 14px 0;
        font-weight: 650;
        font-size: 14px;
      }
      .actions {
        display: flex;
        gap: 8px;
        margin-top: 10px;
      }
      .note {
        font-size: 12px;
      }
      *:focus-visible {
        outline: 3px solid #bd7317;
        outline-offset: 2px;
      }
    `,
  ],
})
export class DesignOpticsBuilderComponent {
  readonly design = input.required<BlockDesign>();
  readonly selectedId = input('');
  readonly changed = output<BlockDesign>();
  readonly selected = output<string>();
  axis: DesignAperture['axis'] | 'none' = 'none';
  diameter = 5;
  insert: DesignAperture['insert'] = 'open';
  color: DesignAperture['color'] = 'red';
  model: DesignDisplayObject['model'] = 'crystal';
  material: DesignDisplayObject['material'] = 'limestone';
  objectWidth = 40;
  objectHeight = 65;
  objectX = 1.2;
  objectY = 0;
  objectZ = -0.7;
  objectRotation = 0;
  constructor() {
    effect(() => {
      const b = this.design().blocks.find((b) => b.id === this.selectedId());
      const a = b?.aperture;
      this.axis = a?.axis || 'none';
      this.diameter = a ? a.diameter * 100 : b ? Math.min(b.width, b.height) * 50 : 5;
      this.insert = a?.insert || 'open';
      this.color = a?.color || 'red';
      const o = this.design().displayObject;
      if (o) {
        this.model = o.model;
        this.material = o.material;
        this.objectWidth = o.width * 100;
        this.objectHeight = o.height * 100;
        this.objectX = o.x;
        this.objectY = o.y;
        this.objectZ = o.z;
        this.objectRotation = o.rotation;
      }
    });
  }
  saveHole(): void {
    const aperture: DesignAperture | undefined =
      this.axis === 'none'
        ? undefined
        : {
            axis: this.axis,
            diameter: this.diameter / 100,
            insert: this.insert,
            color: this.color,
          };
    this.changed.emit({
      ...this.design(),
      blocks: this.design().blocks.map((b) =>
        b.id === this.selectedId() ? { ...b, aperture } : b,
      ),
    });
  }
  saveObject(): void {
    this.changed.emit({
      ...this.design(),
      displayObject: {
        model: this.model,
        material: this.material,
        width: this.objectWidth / 100,
        height: this.objectHeight / 100,
        x: this.objectX,
        y: this.objectY,
        z: this.objectZ,
        rotation: this.objectRotation,
      },
    });
  }
  removeObject(): void {
    const { displayObject: _, ...rest } = this.design();
    this.changed.emit(rest);
  }
  addWindow(): void {
    // Try bounded grid positions; the parent runs the full solid-overlap validator.
    const positions = [
      1.2, -1.2, 2.4, -2.4, 3.6, -3.6, 4.8, -4.8, 6, -6, 7.2, -7.2, 8.4, -8.4, 9.6, -9.6, 10.8,
      -10.8,
    ];
    const x =
      positions.find(
        (x) =>
          !this.design().blocks.some(
            (b) =>
              Math.abs(b.x - x) < 0.5 + Math.hypot(b.width, b.depth) / 2 &&
              Math.abs(b.z) < 0.1 + Math.hypot(b.width, b.depth) / 2,
          ),
      ) ?? 1.2;
    const id = crypto.randomUUID();
    this.changed.emit({
      ...this.design(),
      blocks: [
        ...this.design().blocks,
        ...[-0.34, 0.34].map((dx) => ({
          id: crypto.randomUUID(),
          x: x + dx,
          y: 0,
          z: 0,
          width: 0.12,
          height: 0.6,
          depth: 0.12,
          rotation: 0,
        })),
        {
          id,
          x,
          y: 0.6,
          z: 0,
          width: 0.8,
          height: 0.8,
          depth: 0.06,
          rotation: 0,
          aperture: { axis: 'z', diameter: 0.48, insert: 'glass', color: 'red' },
        },
      ],
    });
    this.objectX = x;
    this.selected.emit(id);
  }
}
