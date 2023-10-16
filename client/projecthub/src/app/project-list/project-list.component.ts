import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { tasklist } from '../data.type';
import { TeamServiceService } from '../services/team-service.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  projectId: string = '';
  userList: any[] = [];
  userData: any;
  alltasks: any[] = [];
  getteamId: any;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private task: TeamServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getteamId = '';
    console.log('yugs', this.teamId);
    this.http
      .get<any>('https://projecthub-m5jg.onrender.com/projects/allProjects')
      .subscribe((data) => {
        console.log(data.ProjectListData);
        this.projects = data.ProjectListData;

        // this.projectId = this.projects._id;
        if (this.projects.length > 0) {
          this.selectedProject = this.projects[0]; // Select the first project by default
        }
      });
    // get teams
    this.http
      .get<any>('https://projecthub-m5jg.onrender.com/team/teams')
      .subscribe((data) => {
        console.log(data.teams);
        this.teams = data.teams;
        // this.userData = data.teams.teamName;
        console.log('hiiii', data.teams);
        if (this.teams.length > 0) {
          this.selectedTeams = this.teams[0]; // Select the first project by default
          this.userList = this.teams[0].userIds;
          this.teamId = this.teams[0]._id;
          console.warn('hello', this.userList);
          this.loadTasks(this.teamId);
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
    // this.loadTasks(this.selectedTaskMembers);
  }

  // Show/hide project details
  showProject: boolean = true;
  showTeams: boolean = true;

  toggleProject() {
    this.showProject = !this.showProject;
  }

  selectProject(projects: any) {
    this.selectedProject = projects;
    console.log('select me as a project', projects);
    this.projectId = projects._id;
    // console.log('Hi i am projectid', this.selectedProject._id);
  }

  selectTeams(teams: any) {
    console.log('Selected Team:', teams);
    this.selectedTeams = teams;

    // console.log(teams);
    this.selectedTaskMembers = teams._id;
    console.log('hi I am selected team', this.selectedTeams);
    this.teamId = teams._id;
    console.log('hello I am teamId', this.teamId);
    // Fetch and update the usernames for assigned users
    this.fetchUsernames(this.teamId);
    this.loadTasks(this.teamId);
  }

  fetchUsernames(teamId: string = '') {
    // Make an HTTP POST request to your backend API to fetch usernames based on userIds
    // Replace 'http://localhost:3000' with your actual backend API URL
    this.http
      .get<any>(`https://projecthub-m5jg.onrender.com/team/${this.teamId}`)
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
    formData.project = this.selectedProject._id;
    console.log('Hi i am projectid', this.selectProject);
    // Make an HTTP POST request to your backend API
    this.task.addTask(formData);
    this.taskForm.reset();
    // window.location.reload();
  }
  loadTasks(teamId: string): void {
    this.http
      .get<any>(`https://projecthub-m5jg.onrender.com/task/tasks/${teamId}`)
      .subscribe(
        (data) => {
          this.alltasks = data.taskLists;
          console.log('Loaded data', data);
        },
        (error) => {
          alert('No task assigned to this team Please Add task');
          // this.router.navigate(['addtask']);
          this.alltasks = [];
          console.error('Error loading tasks:', error);
          // Handle the error, e.g., show an error message to the user
        }
      );
  }

  deletetask(taskId: string): void {
    this.http
      .delete<any>(`https://projecthub-m5jg.onrender.com/task/tasks/${taskId}`)
      .subscribe((data) => {
        // Remove the deleted task from alltasks
        this.alltasks = this.alltasks.filter((task) => task._id !== taskId);
      });
  }

  selectedTaskMembers: any[] = [];
  deleteProject(projectId: string): void {
    this.http
      .delete<any>(`https://projecthub-m5jg.onrender.com/projects/${projectId}`)
      .subscribe((data) => {
        // Remove the deleted task from alltasks
        console.log(data);
        alert(data.message);
        this.projects = this.projects.filter(
          (project) => project._id !== projectId
        );
      });
  }
  deleteTeam(teamId: string): void {
    this.http
      .delete<any>(`https://projecthub-m5jg.onrender.com/team/${teamId}`)
      .subscribe((data) => {
        // Remove the deleted task from alltasks
        console.log(data);
        alert(data.message);
        this.teams = this.teams.filter((project) => project._id !== teamId);
      });
  }
  // ...
}
