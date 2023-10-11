import { Component, OnInit } from '@angular/core';
import { AddProjectService } from '../services/add-project.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css'],
})
export class FormModalComponent implements OnInit {
  constructor(private AddProjectService: AddProjectService) {}
  ngOnInit(): void {}
  addproject(data: any): void {
    console.warn(data);
    this.AddProjectService.addProject(data);
  }
}
