import { Component, ElementRef, HostListener, input, viewChild } from '@angular/core';

/** Secondary navigation stays available without occupying the activity canvas. */
@Component({
  selector: 'app-workspace-tools',
  template: `
    <details #menu (keydown.escape)="onEscape($event)">
      <summary aria-label="Activity tools" title="Activity tools">•••</summary>
      <div class="workspace-tools-panel" (click)="onAction($event)"><ng-content /></div>
    </details>
    @if (error()) {
      <p class="save-error" role="alert">{{ error() }}</p>
    }
  `,
  styles: `
    .save-error {
      max-width: 280px;
      padding: 12px;
      background: #742c24;
      color: #fff;
      border-radius: 8px;
    }
    :host {
      position: fixed;
      top: calc(var(--project-navigation-height, 0px) + 12px);
      right: 12px;
      z-index: 90;
    }
    summary {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border: 1px solid #8aa6af80;
      border-radius: 50%;
      color: #f3f9fa;
      background: #102b35ee;
      cursor: pointer;
      list-style: none;
    }
    summary::-webkit-details-marker {
      display: none;
    }
    summary:focus-visible {
      outline: 3px solid #76e8d5;
      outline-offset: 3px;
    }
    .workspace-tools-panel {
      position: absolute;
      right: 0;
      top: 52px;
      width: min(540px, calc(100vw - 24px));
      max-height: calc(100dvh - var(--project-navigation-height, 0px) - 116px);
      overflow: auto;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #607b86;
      color: #f3f9fa;
      background: #10232cf5;
      box-shadow: 0 12px 50px #0008;
    }
  `,
})
export class WorkspaceToolsComponent {
  readonly error = input<string>();
  private readonly menu = viewChild.required<ElementRef<HTMLDetailsElement>>('menu');
  close(refocus = false): void {
    const menu = this.menu().nativeElement;
    menu.open = false;
    if (refocus) menu.querySelector('summary')?.focus();
  }
  onAction(event: MouseEvent): void {
    // Buttons may reveal settings or a guide inside this menu. Keep those controls available.
    if (event.target instanceof Element && event.target.closest('a')) this.close();
  }
  onEscape(event: Event): void {
    if (event.target instanceof Element && event.target.closest('dialog')) return;
    this.close(true);
  }
  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent): void {
    const menu = this.menu().nativeElement;
    if (
      event.target instanceof Node &&
      !menu.contains(event.target) &&
      !menu.querySelector('dialog[open]')
    )
      this.close();
  }
}
