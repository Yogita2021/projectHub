import { Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  tasks = [
    { id: 1, name: 'task 1', description: 'create task 1' },
    {
      id: 2,
      name: 'task 2',
      description: 'create task 2',
    },
  ];
  deletebtn(task: any) {
    // console.log('delete');
    this.tasks = this.tasks.filter((el: any) => el.id != task.id);
  }
}
