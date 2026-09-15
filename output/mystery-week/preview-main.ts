import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { LabWeekWorkspaceComponent } from '../../src/app/features/mystery-investigation/lab-week-workspace.component';
import { LAB_AUTHORING_PREVIEW, LAB_PREVIEW_WEEKS } from '../../src/app/projects/mystery-substance/lab-week.models';
import { mysterySubstanceWeeks } from '../../src/app/projects/mystery-substance/mystery-substance-weeks';
import { PROJECT_LESSON_FOCUS } from '../../src/app/shared/project-lessons/project-lesson-focus';
import { WORKSPACE_DRAFTS } from '../../src/app/shared/drafts/workspace-drafts';
import { BrowserWorkspaceDrafts } from '../../src/app/infrastructure/persistence/browser-workspace-drafts';
import { createLocalPreviewSession } from '../../src/app/core/context/project-session-context';

const number = Number(new URLSearchParams(location.search).get('lesson') || 1);
const focus = signal({ number: Math.max(1, Math.min(8, number)), title: 'Lab preview', output: '', workspace: 'Lab', checkpoint: '', criteria: [], focusTarget: 'lab' });
@Component({ selector: 'app-root', imports: [LabWeekWorkspaceComponent], template: '<app-lab-week-workspace />' })
class PreviewRoot {}
bootstrapApplication(PreviewRoot, { providers: [
  { provide: LAB_AUTHORING_PREVIEW, useValue: true },
  { provide: LAB_PREVIEW_WEEKS, useValue: mysterySubstanceWeeks },
  { provide: PROJECT_LESSON_FOCUS, useValue: focus },
  { provide: WORKSPACE_DRAFTS, useValue: new BrowserWorkspaceDrafts(createLocalPreviewSession('mystery-substance', '1.0.0')) },
] }).catch(console.error);
