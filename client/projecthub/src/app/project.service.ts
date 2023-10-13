import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: any[] = [];
  constructor() {}

  // Method to retrieve a list of projects
  getProjects(): any[] {
    return this.projects;
  }

  // Method to add a new project
  addProject(project: any): void {
    this.projects.push(project);
  }

  // Method to update project details by ID

  // Method to delete a project by ID
  deleteProject(id: number): void {
    this.projects = this.projects.filter((project) => project.id !== id);
  }
}
