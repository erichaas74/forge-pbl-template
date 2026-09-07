import { TestBed } from '@angular/core/testing';
import { ageOfExplorationJourneyConfig } from '../../../../projects/age-of-exploration-journey/age-of-exploration-journey.config';
import { LivingJourneyMapComponent } from './living-journey-map.component';

describe('LivingJourneyMapComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [LivingJourneyMapComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(LivingJourneyMapComponent);
    fixture.componentRef.setInput('map', ageOfExplorationJourneyConfig.map);
    fixture.componentRef.setInput('team', ageOfExplorationJourneyConfig.team);
    fixture.detectChanges();
    return fixture;
  }

  it('separates neighboring port labels in both chart views', async () => {
    const fixture = await setup();
    const component = fixture.componentInstance;
    const [west, east] = ageOfExplorationJourneyConfig.map.locations;
    for (const cover of ['regional', 'world'] as const) {
      component.setCover(cover);
      expect(component.labelPlacement(west).anchor).toBe('end');
      expect(component.labelPlacement(east).anchor).toBe('start');
      expect(component.labelPlacement(west).y).toBeLessThan(component.labelPlacement(east).y);
    }
  });

  it('keeps ports keyboard accessible over the illustrated chart', async () => {
    const fixture = await setup();
    const selected: string[] = [];
    fixture.componentInstance.locationInspected.subscribe((location) => selected.push(location.id));
    const port = fixture.nativeElement.querySelector('.location') as SVGGElement;
    port.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(selected).toEqual([ageOfExplorationJourneyConfig.map.locations[0].id]);
    expect(port.getAttribute('tabindex')).toBe('0');
  });

  it('toggles navigation markings without hiding port controls', async () => {
    const fixture = await setup();
    fixture.componentInstance.toggleLens('navigation');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.navigation-layer')).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.location').length).toBe(
      ageOfExplorationJourneyConfig.map.locations.length,
    );
  });

  it('removes its own header and footers in immersive mode', async () => {
    const fixture = await setup();
    fixture.componentRef.setInput('immersive', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.chart-heading')).toBeNull();
    expect(fixture.nativeElement.querySelector('.atlas-tools')).toBeNull();
    expect(fixture.nativeElement.querySelector('.chart-legend')).toBeNull();
    expect(fixture.nativeElement.querySelector('.lens-tray')).toBeNull();
    expect(fixture.nativeElement.querySelector('.map-stage')).not.toBeNull();
  });

  it('turns configured route choices and their destination into keyboard map controls', async () => {
    const fixture = await setup();
    const inspected: string[] = [];
    fixture.componentRef.setInput('candidateRouteIds', ['route-coastal']);
    fixture.componentRef.setInput('candidateRouteLabels', {
      'route-coastal': 'Follow the coast',
    });
    fixture.componentRef.setInput('selectedRouteId', 'route-coastal');
    fixture.componentRef.setInput('activeLocationId', 'lisbon');
    fixture.componentInstance.routeInspected.subscribe((routeId) => inspected.push(routeId));
    fixture.detectChanges();

    const route = fixture.nativeElement.querySelector('.candidate-route') as SVGGElement;
    route.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(inspected).toEqual(['route-coastal']);
    expect(route.classList.contains('selected')).toBe(true);
    expect(route.getAttribute('aria-label')).toContain('Follow the coast');
    const locations = [
      ...(fixture.nativeElement.querySelectorAll('.location') as NodeListOf<SVGGElement>),
    ];
    const destination = locations.find((location) =>
      location.getAttribute('aria-label')?.startsWith('Cape Verde.'),
    );
    expect(destination?.classList.contains('candidate-destination')).toBe(true);
    expect(destination?.classList.contains('selected-destination')).toBe(true);
    expect(
      locations
        .find((location) => location.getAttribute('aria-label')?.startsWith('Lisbon.'))
        ?.classList.contains('active-decision'),
    ).toBe(true);
  });

  it('highlights configured planning locations with goal-specific labels', async () => {
    const fixture = await setup();
    fixture.componentRef.setInput('candidateLocationIds', ['london', 'paris']);
    fixture.componentRef.setInput('candidateLocationLabels', {
      london: 'England',
      paris: 'France',
    });
    fixture.componentRef.setInput('selectedCandidateLocationId', 'london');
    fixture.detectChanges();

    const locations = [
      ...(fixture.nativeElement.querySelectorAll('.location') as NodeListOf<SVGGElement>),
    ];
    const england = locations.find((location) =>
      location.getAttribute('aria-label')?.startsWith('London, England.'),
    );
    expect(england?.classList.contains('candidate-map-option')).toBe(true);
    expect(england?.classList.contains('selected-destination')).toBe(true);
    expect(england?.getAttribute('aria-label')).toContain('Available option: England');
    expect(fixture.nativeElement.querySelectorAll('.map-option-label')).toHaveLength(2);
  });

  it('focuses configured bounds and can return to a fitted chart', async () => {
    const fixture = await setup();
    const map = fixture.componentInstance;

    map.focusArea({
      cover: 'world',
      bounds: { west: -16, east: 8, north: 59, south: 33 },
    });
    expect(map.cover()).toBe('world');
    expect(map.zoom()).toBeGreaterThan(1);
    expect(map.panY()).not.toBe(0);

    map.focusArea({ cover: 'regional' });
    expect(map.cover()).toBe('regional');
    expect(map.zoom()).toBe(1);
    expect(map.panX()).toBe(0);
    expect(map.panY()).toBe(0);
  });
});
