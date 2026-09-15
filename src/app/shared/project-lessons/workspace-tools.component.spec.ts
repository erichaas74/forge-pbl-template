import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WorkspaceToolsComponent } from './workspace-tools.component';

@Component({
  imports: [WorkspaceToolsComponent],
  template: `<app-workspace-tools [error]="error()">
      <button (click)="options.set(true)">Settings</button>
      @if (options()) {
        <label>Volume <input type="range" /></label>
      }</app-workspace-tools
    ><button class="outside">Activity</button>`,
})
class ToolsHost {
  readonly options = signal(false);
  readonly error = signal<string | undefined>(undefined);
}

it('keeps settings usable inside the tools menu, closes on Escape/outside clicks, and exposes save errors', () => {
  const fixture = TestBed.createComponent(ToolsHost);
  fixture.detectChanges();
  const root: HTMLElement = fixture.nativeElement;
  const menu = root.querySelector('details')!;
  const trigger = root.querySelector('summary')!;
  expect(menu.open).toBe(false);
  trigger.click();
  root.querySelector<HTMLButtonElement>('app-workspace-tools button')!.click();
  fixture.detectChanges();
  expect(menu.open).toBe(true);
  expect(menu.querySelector('input')).not.toBeNull();
  menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  expect(menu.open).toBe(false);
  expect(document.activeElement).toBe(trigger);
  trigger.click();
  root.querySelector<HTMLButtonElement>('.outside')!.click();
  expect(menu.open).toBe(false);
  fixture.componentInstance.error.set('Could not save');
  fixture.detectChanges();
  expect(root.querySelector('[role="alert"]')?.textContent).toContain('Could not save');
});
