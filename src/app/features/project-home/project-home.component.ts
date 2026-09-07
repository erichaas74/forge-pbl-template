import { TaskGuideComponent } from '../../shared/learning/task-guide.component';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProjectCatalogService } from '../../runtime/project-launch/project-catalog.service';

@Component({
  selector: 'app-project-home',
  imports: [RouterLink, TaskGuideComponent],
  templateUrl: './project-home.component.html',
  styleUrl: './project-home.component.scss',
})
export class ProjectHomeComponent {
  readonly projects = inject(ProjectCatalogService).projects;
}
