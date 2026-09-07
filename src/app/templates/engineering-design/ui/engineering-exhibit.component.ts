import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BlockPlanComponent } from './block-plan.component';
import type { EngineeringSnapshot } from '../domain/engineering-design.models';
@Component({
  selector: 'app-engineering-exhibit',
  imports: [DecimalPipe, BlockPlanComponent],
  template: ` <article>
    <p class="eyebrow">DESIGN EXHIBIT</p>
    <h2>{{ title() }}</h2>
    <p class="explanation">
      {{ snapshot().exhibit || 'Write your explanation to introduce this design.' }}
    </p>
    <h3>Construction plan</h3>
    <p>
      Dimensions are metres. X = east, Y = base height, Z = south. Orient the physical base to true
      north.
    </p>
    <app-block-plan [design]="snapshot().design" />
    <div class="table-scroll">
      <table>
        <caption>
          {{
            snapshot().design.blocks.length
          }}
          measured blocks
        </caption>
        <thead>
          <tr>
            <th>Block</th>
            <th>Width × height × depth</th>
            <th>X / Y / Z</th>
            <th>Rotation</th>
          </tr>
        </thead>
        <tbody>
          @for (b of snapshot().design.blocks; track b.id; let i = $index) {
            <tr>
              <td>{{ i + 1 }}</td>
              <td>
                {{ b.width | number: '1.0-3' }} × {{ b.height | number: '1.0-3' }} ×
                {{ b.depth | number: '1.0-3' }}
              </td>
              <td>
                {{ b.x | number: '1.0-3' }} / {{ b.y | number: '1.0-3' }} /
                {{ b.z | number: '1.0-3' }}
              </td>
              <td>{{ b.rotation }}°</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    @for (target of snapshot().design.targets; track target.id) {
      <p>
        <strong>{{ target.label }}</strong
        >: X {{ target.x }} m, Z {{ target.z }} m.
      </p>
    }
    <h3>Testing evidence</h3>
    <div class="trials">
      @for (trial of snapshot().trials; track trial.id; let i = $index) {
        <section>
          <h4>Trial {{ i + 1 }}</h4>
          <p>Prediction: {{ trial.prediction || 'No prediction recorded.' }}</p>
          <dl>
            @for (m of trial.measurements; track m.label) {
              <dt>{{ m.label }}</dt>
              <dd>{{ m.value }}</dd>
            }
          </dl>
          <small>{{ trial.design.blocks.length }} blocks in this saved design</small>
        </section>
      } @empty {
        <p>No trials recorded yet.</p>
      }
    </div>
  </article>`,
  styles: [
    `
      article {
        padding: 24px;
        background: #fffdf7;
        border: 1px solid #d8dbcb;
        border-radius: 14px;
        color: #173c36;
      }
      .eyebrow {
        letter-spacing: 0.15em;
        font-size: 12px;
      }
      .explanation {
        white-space: pre-wrap;
        line-height: 1.7;
      }
      .table-scroll {
        overflow: auto;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        text-align: left;
      }
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #d8dbcb;
        font-size: 13px;
      }
      caption {
        text-align: left;
        margin: 10px 0;
      }
      .trials {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        gap: 12px;
      }
      .trials section {
        background: #edf3ed;
        padding: 16px;
        border-radius: 10px;
      }
      dl {
        font-size: 13px;
      }
      dt {
        font-weight: 700;
      }
      dd {
        margin: 2px 0 10px;
      }
      h4 {
        margin-top: 0;
      }
    `,
  ],
})
export class EngineeringExhibitComponent {
  readonly title = input.required<string>();
  readonly snapshot = input.required<EngineeringSnapshot>();
}
