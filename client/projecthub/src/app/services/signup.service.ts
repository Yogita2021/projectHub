import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data.type';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  isAuthenticated: boolean = false;
  user: any;
  role: string = '';
  getrole: any;
  constructor(private http: HttpClient, private router: Router) {}
  loginData(data: login) {
    this.http
      .post('https://projecthub-m5jg.onrender.com/user/login', data, {
        observe: 'response',
      })
      .subscribe((result) => {
        console.warn(result);
        let resultboody = JSON.stringify(result.body);

        if (result.status == 200) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.isAuthenticated = true;
          this.user = result.body;
          this.getrole = this.user.user;
          this.role = this.getrole.role;

          console.log('I am loged in user', this.role);

          alert('user login successfully');
          if (this.role === 'Admin') {
            this.router.navigate(['home']);
          } else if (this.role === 'user') {
            this.router.navigate(['userdashbord']);
          } else {
            alert('role is not specified correctly');
          }
          // this.router.navigate(['home']);
        } else {
          alert('please register first !');
          this.router.navigate(['register']);
        }
      });
  }
  userSignUp(data: signUp) {
    this.http
      .post('https://projecthub-m5jg.onrender.com/user/signup', data, {
        observe: 'response',
      })
      .subscribe((result) => {
        console.warn(result);
        let resultboody = JSON.stringify(result.body);

        if (result.status == 200) {
          // localStorage.setItem('user', JSON.stringify(result.body));
          alert('user registered successfully');
          this.router.navigate(['register/login']);
        } else {
          alert('User already exist!');
        }
      });
  }
  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  // Check the user's role
  getUserRole() {
    return this.role;
  }
}
