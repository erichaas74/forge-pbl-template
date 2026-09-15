import { Component, InjectionToken, inject } from '@angular/core';
import { InquiryExampleComponent } from './inquiry-example.component';
import type { InquiryExample } from './inquiry-example.models';

export const INQUIRY_EXAMPLE_PRESENTATION = new InjectionToken<{
  readonly projectTitle: string;
  readonly example: InquiryExample;
  readonly sources: readonly { id: string; title: string; citation: string; sourceUrl?: string }[];
}>('INQUIRY_EXAMPLE_PRESENTATION');

/** Standalone presentation of configured model work, with no learner runtime or persistence. */
@Component({
  selector: 'app-inquiry-example-page',
  imports: [InquiryExampleComponent],
  template: `
    <main>
      <h1>{{ presentation.projectTitle }} · Final example</h1>
      <app-inquiry-example [example]="presentation.example" [sources]="presentation.sources" />
    </main>
  `,
  styles: `
    :host {
      display: block;
      background: #f4f5ef;
      min-height: 100vh;
    }
    main {
      max-width: 1240px;
      margin: 0 auto;
      padding: clamp(16px, 3vw, 40px);
    }
    h1 {
      color: #153b43;
      font:
        600 clamp(24px, 3vw, 36px)/1.3 Georgia,
        serif;
      margin: 0;
    }
  `,
})
export class InquiryExamplePageComponent {
  readonly presentation = inject(INQUIRY_EXAMPLE_PRESENTATION);
}
