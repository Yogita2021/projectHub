import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { AddTeamMemberComponent } from './add-team-member/add-team-member.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: RegisterFormComponent,
  },

  {
    path: 'signup/login',
    component: LoginFormComponent,
  },

  {
    path: 'addproject',
    component: FormModalComponent,
  },
  {
    path: 'addteam',
    component: AddTeamMemberComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
