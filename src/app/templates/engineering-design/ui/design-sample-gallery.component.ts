import { Component, input, output } from '@angular/core';
import type { EngineeringDesignSample } from '../domain/engineering-design.models';
import { DesignThumbnailComponent } from './design-thumbnail.component';

@Component({
  selector: 'app-design-sample-gallery',
  imports: [DesignThumbnailComponent],
  template: `<section aria-label="Sample monument models">
    <div class="heading">
      <h2>Try a sample monument</h2>
      <p>Pick a shape. Explore its shadow. Your own design stays saved.</p>
    </div>
    <div class="samples">
      @for (sample of samples(); track sample.id) {
        <button
          [attr.aria-label]="'Preview ' + sample.title"
          [attr.aria-pressed]="selectedId() === sample.id"
          (click)="preview.emit(sample.id)"
        >
          <app-design-thumbnail [design]="sample.design" /><span>{{ sample.title }}</span>
        </button>
      }
    </div>
  </section>`,
  styles: [
    `
      section {
        margin: 8px 0 16px;
        padding: 14px;
        background: linear-gradient(110deg, #e9e3d3, #f1eadc);
        border: 1px solid #c7b795;
        border-radius: 12px;
      }
      .heading {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 18px;
        align-items: baseline;
        margin-bottom: 10px;
      }
      h2 {
        font:
          700 19px Georgia,
          serif;
        margin: 0;
      }
      p {
        font-size: 13px;
        margin: 0;
        color: #655e4e;
      }
      .samples {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 9px;
      }
      button {
        min-width: 0;
        padding: 8px;
        background: radial-gradient(ellipse at 50% 67%, #dcd3be 0, #f8f3e8 60%);
        border: 1px solid #cbbd9d;
        border-radius: 9px;
        cursor: pointer;
        color: #494738;
        font: 600 13px/1.35 system-ui;
      }
      button:hover {
        background: #f7edd1;
        border-color: #a97b2c;
      }
      button[aria-pressed='true'] {
        background: #f4e5ba;
        border: 2px solid #966f24;
        padding: 7px;
      }
      button:focus-visible {
        outline: 3px solid #ad6b14;
        outline-offset: 2px;
      }
      span {
        display: block;
        margin-top: 4px;
      }
      @media (max-width: 700px) {
        .samples {
          display: flex;
          overflow-x: auto;
          padding: 3px 3px 10px;
          scroll-snap-type: x proximity;
        }
        button {
          flex: 0 0 144px;
          scroll-snap-align: start;
        }
      }
    `,
  ],
})
export class DesignSampleGalleryComponent {
  readonly samples = input.required<readonly EngineeringDesignSample[]>();
  readonly selectedId = input('');
  readonly preview = output<string>();
}
