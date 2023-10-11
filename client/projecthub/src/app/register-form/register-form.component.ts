import { Component, OnInit } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { signUp } from '../data.type';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  // Add other properties from your API response if necessary

  constructor(private signup: SignupService) {}
  ngOnInit(): void {}
  signUp(data: signUp): void {
    // console.warn(data);
    this.signup.userSignUp(data);
  }
}
