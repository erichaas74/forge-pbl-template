import { TestBed } from '@angular/core/testing';

import { InvestigationEvidenceDetailComponent } from './evidence-detail.component';
import type { InvestigationEvidenceItem } from './investigation-ui.models';

describe('InvestigationEvidenceDetailComponent', () => {
  it('renders every vial result for each test in one evidence matrix', async () => {
    await TestBed.configureTestingModule({
      imports: [InvestigationEvidenceDetailComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(InvestigationEvidenceDetailComponent);
    const evidence: InvestigationEvidenceItem = {
      id: 'evidence-property-trials',
      title: 'Four-vial physical-property trials',
      type: 'measurement set',
      summary: 'Student-captured results.',
      source: 'Investigation workspace',
      status: 'collected',
      notes: [],
      important: false,
      studentCreated: false,
      resultMatrix: {
        title: 'Four-vial physical-property record',
        columnLabels: ['Vial A', 'Vial B', 'Vial C', 'Vial D'],
        rows: [
          {
            id: 'appearance',
            label: 'Optical scan',
            cells: ['Coarse crystals', 'Fine crystals', undefined, 'Fine powder'],
          },
        ],
      },
    };

    fixture.componentRef.setInput('evidence', evidence);
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('table') as HTMLTableElement;
    expect(table.textContent).toContain('Vial A');
    expect(table.textContent).toContain('Vial D');
    expect(table.textContent).toContain('Optical scan');
    expect(table.textContent).toContain('Not tested');
  });
});
