import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data.type';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient, private router: Router) {}
  loginData(data: login) {
    this.http
      .post('http://localhost:3000/user/login', data, {
        observe: 'response',
      })
      .subscribe((result) => {
        console.warn(result);
        let resultboody = JSON.stringify(result.body);

        if (result.status == 200) {
          localStorage.setItem('user', JSON.stringify(result.body));

          alert('user login successfully');
          this.router.navigate(['']);
        } else {
          alert('please register first !');
          this.router.navigate(['signup']);
        }
      });
  }
  userSignUp(data: signUp) {
    this.http
      .post('http://localhost:3000/user/signup', data, {
        observe: 'response',
      })
      .subscribe((result) => {
        console.warn(result);
        let resultboody = JSON.stringify(result.body);

        if (result.status == 200) {
          // localStorage.setItem('user', JSON.stringify(result.body));
          alert('user registered successfully');
          this.router.navigate(['/login']);
        } else {
          alert('User already exist!');
        }
      });
  }
}
