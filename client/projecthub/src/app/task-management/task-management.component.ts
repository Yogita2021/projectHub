import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css'],
})
export class TaskManagementComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({}); // Initialize taskForm here
  teams: any[] = [];
  assignedUsers: any[] = [];
  schemaKeys = [
    'title',
    'description',
    'dueDate',
    'priority',
    'status',
    'assignedUser',
    'Add Task',
  ];

  userList = ['user1', 'user2'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const formControls: any = {};
    this.schemaKeys.forEach((key) => {
      formControls[key] = [''];
    });
    this.taskForm = this.fb.group(formControls);
  }

  onSubmit(): void {}
  onTeamChange(): void {}

  selectedTeam() {}
}
