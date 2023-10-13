import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { AddTeamMemberComponent } from './add-team-member/add-team-member.component';
import { FormAddTakComponent } from './form-add-tak/form-add-tak.component';
import { UpdateProjectFormComponent } from './update-project-form/update-project-form.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
// import { UpdatetaskComponent } from './updatetask/updatetask.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: RegisterFormComponent,
  },
  { path: 'update-task/:taskId', component: UpdateTaskComponent },
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

  {
    path: 'addtask',
    component: FormAddTakComponent,
  },
  { path: 'update-project/:id', component: UpdateProjectFormComponent },
  // {
  //   path: 'updatetask',
  //   component: UpdatetaskComponent,
  // },
  // {
  //   path: 'updatetask/:taskId',
  //   component: UpdatetaskComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
