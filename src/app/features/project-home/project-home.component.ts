import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { projectCatalog } from '../../projects/project-catalog';

@Component({
  selector: 'app-project-home',
  imports: [RouterLink],
  templateUrl: './project-home.component.html',
  styleUrl: './project-home.component.scss',
})
export class ProjectHomeComponent {
  readonly projects = projectCatalog;
}
