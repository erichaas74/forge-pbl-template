import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InquiryWorkspaceComponent } from '../../../shared/inquiry/inquiry-workspace.component';
import { INQUIRY_WORKSPACE } from '../../../shared/inquiry/inquiry-workspace.port';
import { DebateStudioRuntimeService } from '../runtime/debate-studio-runtime.service';
import { InquiryExampleComponent } from '../../../shared/inquiry/inquiry-example.component';
/** Existing debate API backed by the shared, template-neutral workspace. */
@Component({
  selector: 'app-debate-inquiry',
  imports: [FormsModule, InquiryExampleComponent],
  providers: [{ provide: INQUIRY_WORKSPACE, useExisting: DebateStudioRuntimeService }],
  templateUrl: '../../../shared/inquiry/inquiry-workspace.component.html',
  styleUrl: '../../../shared/inquiry/inquiry-workspace.component.scss',
})
export class DebateInquiryComponent extends InquiryWorkspaceComponent {}
