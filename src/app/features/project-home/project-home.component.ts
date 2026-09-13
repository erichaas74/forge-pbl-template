import { TaskGuideComponent } from '../../shared/learning/task-guide.component';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProjectCatalogService } from '../../runtime/project-launch/project-catalog.service';
import { createProjectHomeCards } from '../../projects/project-home-catalog';

@Component({
  selector: 'app-project-home',
  imports: [RouterLink, TaskGuideComponent],
  templateUrl: './project-home.component.html',
  styleUrl: './project-home.component.scss',
})
export class ProjectHomeComponent {
  readonly projects = inject(ProjectCatalogService).projects;
  readonly cards = computed(() => createProjectHomeCards(this.projects()));
}
