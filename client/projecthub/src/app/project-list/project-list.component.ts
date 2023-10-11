import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { tasklist } from '../data.type';
import { TeamServiceService } from '../services/team-service.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  selectedProject: any;
  selectedTeams: any;
  teams: any[] = [];
  showTaskForm: boolean = false;
  taskDetails: string = '';
  teamId: string = '';
  userList: any[] = [];
  userData: any;
  alltasks: any[] = [];
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private task: TeamServiceService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.teamId = '';
    this.http
      .get<any>('http://localhost:3000/projects/allProjects')
      .subscribe((data) => {
        console.log(data.ProjectListData);
        this.projects = data.ProjectListData;
        if (this.projects.length > 0) {
          this.selectedProject = this.projects[0]; // Select the first project by default
        }
      });
    // get teams
    this.http.get<any>('http://localhost:3000/team/teams').subscribe((data) => {
      console.log(data.teams);
      this.teams = data.teams;
      // this.userData = data.teams.teamName;
      console.log('hiiii', data.teams);
      if (this.teams.length > 0) {
        this.selectedTeams = this.teams[0]; // Select the first project by default
        this.userList = this.teams[0].userIds;
        console.warn('hello', this.userList);
      }
    });

    const formControls: any = {};
    this.schemaKeys.forEach((key) => {
      formControls[key] = [''];
    });
    this.taskForm = this.fb.group(formControls);

    // Initialize the selectedTaskMembers array with userIds
    // this.selectedTaskMembers = this.selectedTeams.teamName;

    // Fetch and update the usernames for assigned users
    // this.fetchUsernames(this.selectedTaskMembers);
  }

  // Show/hide project details
  showProject: boolean = true;
  showTeams: boolean = true;

  toggleProject() {
    this.showProject = !this.showProject;
  }

  selectProject(projects: any) {
    this.selectedProject = projects;
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
  toggleTaskForm() {
    this.showTaskForm = !this.showTaskForm;
  }

  toggleTeam() {
    this.showTeams = !this.showTeams;
  }
  taskForm: FormGroup = new FormGroup({}); // Initialize taskForm here

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

  // userList = ['user1', 'user2'];

  onSubmit() {
    // Get the form values
    const formData = this.taskForm.value;

    // Make an HTTP POST request to your backend API
    this.task.addTask(formData);
    this.taskForm.reset();
    window.location.reload();
  }
  loadTasks(): void {
    this.task.getTasks().subscribe((data: tasklist) => {
      console.log('hello123', data.taskLists);
      // Now, data.taskLists should contain the array of tasks
      this.alltasks = data.taskLists; // Assuming this.alltasks is where you want to store the tasks
    });
  }

  selectedTaskMembers: any[] = [];

  // ...
}
