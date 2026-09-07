import { TestBed } from '@angular/core/testing';
import { InvestigationEvidenceDetailComponent } from './evidence-detail.component';
import type { InvestigationEvidenceItem } from './investigation-ui.models';
import { WORKSPACE_DRAFTS } from '../../../shared/drafts/workspace-drafts';
import { BrowserWorkspaceDrafts } from '../../../infrastructure/persistence/browser-workspace-drafts';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';

describe('Evidence note continuity', () => {
  it('keeps unfinished notes through classification updates, record switches, and reopening', async () => {
    const store = new BrowserWorkspaceDrafts(createLocalPreviewSession('test', '1.0.0'), undefined);
    await TestBed.configureTestingModule({
      imports: [InvestigationEvidenceDetailComponent],
      providers: [{ provide: WORKSPACE_DRAFTS, useValue: store }],
    }).compileComponents();
    const record: InvestigationEvidenceItem = {
      id: 'clue-a',
      title: 'Clue A',
      summary: 'A clue',
      type: 'document',
      source: 'Lab',
      status: 'available',
      notes: [],
      important: false,
      studentCreated: false,
    };
    const fixture = TestBed.createComponent(InvestigationEvidenceDetailComponent);
    fixture.componentRef.setInput('evidence', record);
    fixture.detectChanges();
    fixture.componentInstance.note.set('An unfinished observation.');
    fixture.componentRef.setInput('evidence', { ...record, classification: 'supports' });
    fixture.detectChanges();
    expect(fixture.componentInstance.note()).toBe('An unfinished observation.');
    fixture.componentRef.setInput('evidence', { ...record, id: 'clue-b' });
    fixture.detectChanges();
    fixture.componentInstance.note.set('A separate thought.');
    fixture.destroy();
    const reopened = TestBed.createComponent(InvestigationEvidenceDetailComponent);
    reopened.componentRef.setInput('evidence', record);
    reopened.detectChanges();
    expect(reopened.componentInstance.note()).toBe('An unfinished observation.');
    reopened.componentRef.setInput('evidence', { ...record, id: 'clue-b' });
    reopened.detectChanges();
    expect(reopened.componentInstance.note()).toBe('A separate thought.');
  });
});
