import { Component, input } from '@angular/core';

/** Optional, keyboard-accessible help. The student's work stays outside this dialog. */
@Component({
  selector: 'app-task-guide',
  template: `
    <button class="guide-trigger" type="button" (click)="guide.showModal()">? Guide</button>
    <dialog #guide aria-label="Task guide" (click)="$event.target === guide && guide.close()">
      <header>
        <h2>{{ title() }}</h2>
        <button type="button" (click)="guide.close()" aria-label="Close guide">×</button>
      </header>
      <div class="guide-content"><ng-content /></div>
      <button class="return-button" type="button" (click)="guide.close()">Back to my work</button>
    </dialog>
  `,
  styles: `
    :host {
      display: inline-block;
    }
    button {
      font: inherit;
      cursor: pointer;
      min-height: 44px;
      border: 1px solid currentColor;
      border-radius: 8px;
      padding: 8px 14px;
      color: inherit;
      background: transparent;
    }
    button:focus-visible {
      outline: 3px solid #1585b5;
      outline-offset: 3px;
    }
    dialog {
      box-sizing: border-box;
      width: min(560px, calc(100vw - 32px));
      max-height: 85dvh;
      padding: 24px;
      border: 1px solid #bac9c7;
      border-radius: 16px;
      color: #193c43;
      background: #fffdf6;
      box-shadow: 0 24px 90px #001a3350;
      font:
        16px/1.6 Arial,
        sans-serif;
    }
    dialog::backdrop {
      background: #071e35a6;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    h2 {
      font-size: 22px;
      margin: 0;
    }
    header button {
      font-size: 24px;
    }
    .guide-content {
      margin: 20px 0;
    }
    .return-button {
      color: white;
      background: #165b60;
      border-color: #165b60;
    }
  `,
})
export class TaskGuideComponent {
  readonly title = input('A little help');
}
