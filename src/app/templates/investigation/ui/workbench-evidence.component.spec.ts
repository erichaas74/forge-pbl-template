import { TestBed } from '@angular/core/testing';
import { WorkbenchEvidenceComponent } from './workbench-evidence.component';
import type { InvestigationEvidenceItem } from './investigation-ui.models';

describe('Workbench evidence dock', () => {
  it('searches across tool contexts, separates guides and does not reveal locked results', async () => {
    await TestBed.configureTestingModule({
      imports: [WorkbenchEvidenceComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(WorkbenchEvidenceComponent);
    const evidence: InvestigationEvidenceItem[] = [
      {
        id: 'water',
        title: 'Water reference',
        type: 'document',
        summary: 'Equal samples',
        source: 'Lab',
        status: 'available',
        notes: [],
        important: false,
        studentCreated: false,
      },
      {
        id: 'result',
        title: 'Reaction results',
        type: 'data',
        summary: 'Secret amber reading',
        source: 'Lab',
        status: 'locked',
        notes: [],
        important: false,
        studentCreated: false,
      },
    ];
    fixture.componentRef.setInput('evidence', evidence);
    fixture.componentRef.setInput('activityId', 'scanner');
    fixture.componentRef.setInput('links', [
      {
        evidenceId: 'water',
        category: 'guide',
        activityIds: ['water-test'],
        keywords: 'dissolve',
        action: { activityId: 'water-test', label: 'Use water test' },
      },
    ]);
    fixture.detectChanges();
    const dock = fixture.componentInstance;
    expect(dock.items()).toHaveLength(0);
    dock.query.set('dissolve');
    expect(dock.items().map((x) => x.id)).toEqual(['water']);
    dock.query.set('secret');
    expect(dock.items()).toHaveLength(0);
    dock.query.set('');
    dock.scope.set('all');
    dock.category.set('guide');
    expect(dock.items().map((x) => x.id)).toEqual(['water']);
    fixture.componentRef.setInput('selectedId', 'water');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Use water test');
    expect(fixture.nativeElement.textContent).not.toContain('Decide what this clue does');
    const use = vi.fn();
    dock.useTool.subscribe(use);
    fixture.nativeElement.querySelector('.tool-action').click();
    expect(use).toHaveBeenCalledWith({ activityId: 'water-test', label: 'Use water test' });
  });
});
