import { Component } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent {
  projects = [
    { id: 1, name: 'E-commerse website', description: 'user can buy products' },
    {
      id: 2,
      name: 'chat application',
      description: 'user can chat with friends',
    },
  ];

  deleteProject(project: any) {
    this.projects = this.projects.filter((el: any) => el.id !== project.id);
  }
}
