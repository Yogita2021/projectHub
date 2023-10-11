import { Component, OnInit } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { signUp } from '../data.type';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(private signup: SignupService) {}
  ngOnInit(): void {}

  loginfun(data: signUp): void {
    console.warn(data);
    this.signup.loginData(data);
  }
}
