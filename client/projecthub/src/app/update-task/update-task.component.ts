import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamServiceService } from '../services/team-service.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css'],
})
export class UpdateTaskComponent implements OnInit {
  updateTaskForm!: FormGroup;

  taskId: string = '';
  taskData: any;

  constructor(
    private fb: FormBuilder,
    private taskService: TeamServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateTaskForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      dueDate: new FormControl(''), // Initialize it as an empty string
      priority: new FormControl(''),
      status: new FormControl(''),
      assignedUser: new FormControl(''),
      team: new FormControl(''),
      // Add other fields as needed
    });

    this.taskId = this.route.snapshot.params['id'];
    console.log(this.taskId, 'I am taskId');
    // Fetch the task details based on the task ID
    this.taskService.getTask(this.taskId).subscribe((data) => {
      this.taskData = data;

      // Format the dueDate before patching it
      if (this.taskData.dueDate) {
        const formattedDueDate = new Date(this.taskData.dueDate)
          .toISOString()
          .split('T')[0];
        this.taskData.dueDate = formattedDueDate;
      }

      this.updateTaskForm.patchValue(this.taskData);
    });
  }

  onSubmit(): void {
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);

    let user = userData.user;
    let userRole = user.role;
    console.log(userRole, 'I am userData user');
    const updatedTaskData = this.updateTaskForm.value;
    console.log(updatedTaskData, 'update');
    console.log(this.taskId);
    // Send the updated task data to your service for the update operation
    this.taskService
      .updateTask(this.taskId, updatedTaskData)
      .subscribe((data) => {
        console.log(data);
        alert(data.message);
        if (userRole === 'Admin') {
          this.router.navigate(['homepage']);
        } else if (userRole === 'user') {
          this.router.navigate(['userdashbord']);
        }
        // After a successful update, navigate back to the task details page
      });
  }
}
