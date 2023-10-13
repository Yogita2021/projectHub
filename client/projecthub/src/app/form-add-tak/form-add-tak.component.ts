import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamServiceService } from '../services/team-service.service';
@Component({
  selector: 'app-form-add-tak',
  templateUrl: './form-add-tak.component.html',
  styleUrls: ['./form-add-tak.component.css'],
})
export class FormAddTakComponent implements OnInit {
  taskForm: FormGroup;
  userList: any[] = []; // You should populate this array with user data
  teams: any[] = [];
  selectedTeams: any;
  teamId: any;
  selectedTaskMembers: any;
  constructor(
    private fb: FormBuilder,

    private http: HttpClient,
    private task: TeamServiceService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [''],
      priority: [''],
      status: [''],
      team: [''],
      assignedUser: [''],
    });
  }

  ngOnInit(): void {
    // Populate this.userList with user data from your backend
    this.http.get<any>('http://localhost:3000/team/teams').subscribe((data) => {
      console.log(data.teams);
      this.teams = data.teams;
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      // You can access the form values as this.taskForm.value
      const formData = this.taskForm.value;
      // Make an HTTP POST request to your backend API with formData
      // For example, you can call a service method to post the data.
      this.task.addTask(formData);

      // After submitting the form, you can reset it.
      this.taskForm.reset();
    } else {
      alert('fill all the fields');
    }
  }

  selectTeams(teams: any) {
    console.log('Selected Team:', teams);
    this.selectedTeams = teams;
    // console.log(teams);
    this.selectedTaskMembers = teams._id;
    console.log(this.selectedTeams);
    this.teamId = teams._id;
    console.log(this.teamId);
    // Fetch and update the usernames for assigned users
    this.fetchUsernames(this.selectedTaskMembers);
  }
  onTeamSelect(event: Event): void {
    const teamId = (event.target as HTMLSelectElement).value;
    // Do something with the selected team ID
    // For example, pass it to your service or handle it in your component
    console.log('Selected Team ID:', teamId);
    this.teamId = teamId;
    this.fetchUsernames(this.teamId);
  }

  fetchUsernames(teamId: string[]) {
    // Make an HTTP POST request to your backend API to fetch usernames based on userIds
    // Replace 'http://localhost:3000' with your actual backend API URL
    this.http
      .get<any>(`http://localhost:3000/team/${this.teamId}`)
      .subscribe((data) => {
        // Update the userList with usernames
        // console.warn(data.userids);
        // console.log(data.team.userIds);
        this.userList = data.team.userIds;
        console.log(this.userList);
      });
  }
}
