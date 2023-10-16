import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { projectData } from '../data.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AddProjectService {
  constructor(private http: HttpClient, private router: Router) {}

  addProject(data: projectData) {
    const userStore = localStorage.getItem('user');
    const userData = userStore && JSON.parse(userStore);
    const token = userData.token;

    const headers = new HttpHeaders().set('Authorization', `${token}`);

    this.http
      .post('https://projecthub-m5jg.onrender.com/projects/create', data, {
        observe: 'response',
        headers: headers,
      })
      .subscribe((result) => {
        console.log(result.body);
        console.log(result.status);
        if (result.status === 200) {
          alert('Project created successfully');
          this.router.navigate(['homepage']);
        } else if (result.status === 400) {
          alert('Please select different projectName');
        } else {
          alert('Failed to create project');
        }
      });
  }
}
