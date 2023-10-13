import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TeamServiceService {
  constructor(private http: HttpClient, private router: Router) {}
  getTeams() {
    return this.http.get<any[]>('http://loacalhost:3000/team/teams');
  }

  getUsers() {
    return this.http.get<any[]>('http://localhost:3000/user/users');
  }

  // addTeamMember(teamId: string, memberName: string) {
  //   // Implement logic to add a team member to the specified team in the backend.
  //   // You may need to send a POST request with the teamId and memberName.
  //   const data = { teamId, memberName };
  //   return this.http.post('http://localhost:3000/teams/addMember', data);
  // }

  addTask(data: any): void {
    console.log('task data from users', data);
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);
    const token = userData.token;

    const headers = new HttpHeaders().set('Authorization', `${token}`);

    this.http
      .post('http://localhost:3000/task/create', data, {
        observe: 'response',
        headers: headers,
      })
      .subscribe((result) => {
        console.log(result);
        console.log(result.status);
        if (result.status === 200) {
          alert('Task added successfully');
          this.router.navigate(['']);
        } else {
          alert('Failed to add task');
        }
      });
  }

  getTask(teamId: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/task/${teamId}`);
  }
  updateTask(taskId: string, updatedTaskData: any): Observable<any> {
    // Send a PUT request to update the task
    const url = `http://localhost:3000/tasks/${taskId}`;
    return this.http.put(url, updatedTaskData);
  }
  getProject(projectId: any) {
    return this.http.get<any[]>(`http://localhost:3000/projects/${projectId}`);
  }
  addTeamMember(teamName: string, selectedUserIds: number[]): void {
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);
    const token = userData.token;

    const data = {
      teamName: teamName,
      userIds: selectedUserIds, // Use the updated array of user IDs
    };

    const headers = new HttpHeaders().set('Authorization', `${token}`);

    this.http
      .post('http://localhost:3000/team/addteam', data, {
        observe: 'response',
        headers: headers,
      })
      .subscribe((result) => {
        console.log(result);
        console.log(result.status);
        if (result.status === 200) {
          alert('Team member added successfully');
          this.router.navigate(['']);
        } else {
          alert('Failed to create project');
        }
      });
  }
  updateProject(projectId: string, updatedProjectData: any): Observable<any> {
    const url = `http://localhost:3000/projects/${projectId}`;
    return this.http.put(url, updatedProjectData);
  }
}
