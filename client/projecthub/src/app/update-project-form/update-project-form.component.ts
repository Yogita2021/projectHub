import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamServiceService } from '../services/team-service.service';

@Component({
  selector: 'app-update-project-form',
  templateUrl: './update-project-form.component.html',
  styleUrls: ['./update-project-form.component.css'],
})
export class UpdateProjectFormComponent implements OnInit {
  updateProjectForm!: FormGroup;
  projectId: string = '';
  projectData: any;

  constructor(
    private fb: FormBuilder,
    private projectService: TeamServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateProjectForm = this.fb.group({
      name: [''],
      description: [''],
      startDate: [''],
      endDate: [''],
    });

    this.projectId = this.route.snapshot.params['id']; // Get the project ID from the route

    // Fetch the project details based on the project ID
    this.projectService.getProject(this.projectId).subscribe((data) => {
      this.projectData = data; // Assign project details to this.projectData
      this.updateProjectForm.patchValue(this.projectData); // Populate the form with project data
    });
  }

  onSubmit(): void {
    const updatedProjectData = this.updateProjectForm.value;

    // Send the updated project data to your service for the update operation
    this.projectService
      .updateProject(this.projectId, updatedProjectData)
      .subscribe((data) => {
        console.log(data);
        alert(data.message);

        // After a successful update, navigate back to the project details page
        this.router.navigate(['homepage']);
      });
  }
}
