import { TestBed } from '@angular/core/testing';
import { SolarTimeDialComponent } from './solar-time-dial.component';

describe('solar time dial', () => {
  function setup(disabled = false) {
    const fixture = TestBed.createComponent(SolarTimeDialComponent);
    fixture.componentRef.setInput('start', 360);
    fixture.componentRef.setInput('end', 1200);
    fixture.componentRef.setInput('minutes', 780);
    fixture.componentRef.setInput('clock', '1:00 PM');
    fixture.componentRef.setInput('disabled', disabled);
    fixture.detectChanges();
    const values: number[] = [];
    fixture.componentInstance.changed.subscribe((value) => values.push(value));
    const svg = fixture.nativeElement.querySelector('svg') as SVGSVGElement;
    svg.getBoundingClientRect = () =>
      ({
        left: 0,
        top: 0,
        width: 960,
        height: 160,
        right: 960,
        bottom: 160,
        x: 0,
        y: 0,
      }) as DOMRect;
    const pointer = (type: string, clientX: number, clientY: number) =>
      svg.dispatchEvent(new MouseEvent(type, { clientX, clientY, bubbles: true }));
    const key = (name: string) =>
      svg.dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true }));
    return { fixture, values, svg, pointer, key };
  }

  it('draws a wide sky: the Sun rises in the east, is highest at midday and sets in the west', () => {
    const { fixture, svg } = setup();
    const dial = fixture.componentInstance;
    expect(svg.getAttribute('role')).toBe('slider');
    expect(svg.getAttribute('viewBox')).toBe('0 0 960 160');
    expect(svg.getAttribute('aria-valuetext')).toBe('1:00 PM');
    fixture.componentRef.setInput('minutes', 360);
    fixture.detectChanges();
    expect(dial.sun().x).toBeCloseTo(60);
    expect(dial.sun().y).toBeCloseTo(128);
    fixture.componentRef.setInput('minutes', 780);
    fixture.detectChanges();
    expect(dial.sun().x).toBeCloseTo(480);
    expect(dial.sun().y).toBeCloseTo(20);
    expect(dial.shadowEnd()).toBeCloseTo(480);
    fixture.componentRef.setInput('minutes', 1200);
    fixture.detectChanges();
    expect(dial.sun().x).toBeCloseTo(900);
    expect(svg.getAttribute('aria-valuenow')).toBe('1200');
    fixture.componentRef.setInput('minutes', 500);
    fixture.detectChanges();
    expect(dial.shadowEnd()).toBeGreaterThan(480);
    const morningLand = dial.land().map((blob) => blob.x);
    fixture.componentRef.setInput('minutes', 1000);
    fixture.detectChanges();
    expect(dial.land().map((blob) => blob.x)).not.toEqual(morningLand);
  });

  it('changes the time when the Sun is dragged or moved with the keyboard', () => {
    const { values, pointer, key, fixture } = setup();
    pointer('pointerdown', 20, 150);
    expect(values.at(-1)).toBe(360);
    pointer('pointermove', 900, 128);
    pointer('pointerup', 900, 128);
    expect(values.at(-1)).toBe(1200);
    expect(fixture.componentInstance.dragging()).toBe(false);
    key('ArrowRight');
    expect(values.at(-1)).toBe(785);
    key('PageDown');
    expect(values.at(-1)).toBe(720);
    key('Home');
    expect(values.at(-1)).toBe(360);
    key('End');
    expect(values.at(-1)).toBe(1200);
  });

  it('ignores dragging and keys while disabled', () => {
    const { values, pointer, key } = setup(true);
    pointer('pointerdown', 20, 150);
    key('End');
    expect(values).toEqual([]);
  });
});
