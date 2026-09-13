import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { GalleryAudit } from '../domain/gallery-audit';

@Component({
  selector: 'app-gallery-audit', templateUrl: './gallery-audit.component.html',
  styleUrl: './gallery-audit.component.scss', changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryAuditComponent {
  readonly audit = input.required<GalleryAudit>();
  readonly resume = output<void>();
  readonly notebook = output<void>();
  readonly revisit = output<string>();
  jumpTo(section: HTMLElement): void {
    section.scrollIntoView({ block: 'start', behavior: 'instant' });
    section.focus({ preventScroll: true });
  }
}
