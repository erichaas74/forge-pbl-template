import { afterNextRender, Directive, ElementRef, inject, OnDestroy, output } from '@angular/core';

@Directive({
  selector: '[appReviewDialog]',
  host: { tabindex: '-1', '(keydown)': 'onKey($event)' },
})
export class ReviewDialogDirective implements OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private previous?: HTMLElement;
  readonly dismissReview = output<void>();
  constructor() {
    afterNextRender(() => {
      const active = this.element.nativeElement.ownerDocument.activeElement;
      if (active instanceof HTMLElement) this.previous = active;
      (this.controls()[0] ?? this.element.nativeElement).focus();
    });
  }
  private controls(): HTMLElement[] {
    return Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href], [tabindex="0"]',
      ),
    );
  }
  onKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.dismissReview.emit();
    }
    if (event.key !== 'Tab') return;
    const controls = this.controls();
    const first = controls[0];
    const last = controls.at(-1);
    const active = this.element.nativeElement.ownerDocument.activeElement;
    if (!first || !last) {
      event.preventDefault();
      return;
    }
    if (event.shiftKey && (active === first || active === this.element.nativeElement)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
  ngOnDestroy(): void {
    if (this.previous?.isConnected) this.previous.focus({ preventScroll: true });
  }
}
