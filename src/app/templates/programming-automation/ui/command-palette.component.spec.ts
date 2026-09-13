import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { CommandPaletteComponent } from './command-palette.component';
import type { CommandType } from '../domain/automation.models';

describe('command block library', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('groups only allowed blocks and emits a clicked block for the displayed destination', () => {
    const fixture = TestBed.createComponent(CommandPaletteComponent);
    fixture.componentRef.setInput('allowed', ['move-distance', 'turn-degrees', 'repeat']);
    fixture.componentRef.setInput('moveMath', { 'move-distance': { given: 40, operation: 'multiply' } });
    fixture.componentRef.setInput('destination', 'Inside Repeat (2 times)');
    fixture.componentRef.setInput('inLoop', true);
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(Array.from(root.querySelectorAll('h4')).map((group) => group.textContent)).toEqual([
      'Motion 1', 'Turning 1', 'Control 1',
    ]);
    expect(root.querySelectorAll('.palette-block')).toHaveLength(3);
    expect(root.querySelector('.math-preview')?.textContent).toContain('40 ×?cm');
    const added: CommandType[] = [];
    fixture.componentInstance.addBlock.subscribe((type) => added.push(type));
    root.querySelector<HTMLButtonElement>('[aria-label="Add Move distance to Inside Repeat (2 times)"]')!.click();
    expect(added).toEqual(['move-distance']);
    fixture.componentInstance.add('pick-up');
    expect(added).toEqual(['move-distance']);
  });

  it('resets an unavailable category across missions and prevents read-only additions', () => {
    const fixture = TestBed.createComponent(CommandPaletteComponent);
    fixture.componentRef.setInput('allowed', ['move-distance', 'pick-up']);
    fixture.componentInstance.filter.set('cargo');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.palette-block')).toHaveLength(1);
    fixture.componentRef.setInput('allowed', ['move-distance']);
    fixture.componentRef.setInput('readOnly', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.activeFilter()).toBe('all');
    const added: CommandType[] = [];
    fixture.componentInstance.addBlock.subscribe((type) => added.push(type));
    fixture.componentInstance.add('move-distance');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.palette-block');
    expect(button.disabled).toBe(true);
    button.click();
    expect(added).toEqual([]);
  });
});
