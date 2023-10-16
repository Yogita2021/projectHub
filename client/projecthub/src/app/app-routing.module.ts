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
import { AuthGuard } from './auth.guard';
import { UserProjectlistComponent } from './user-projectlist/user-projectlist.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ProjectListComponent } from './project-list/project-list.component';
// import { UpdatetaskComponent } from './updatetask/updatetask.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'register' }, // Redirect to the registration page
  { path: 'register', component: RegisterFormComponent },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  {
    path: 'userdashbord',
    component: UserhomeComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: RegisterFormComponent,
  },
  {
    path: 'homepage',
    component: ProjectListComponent,
  },
  { path: 'update-task/:id', component: UpdateTaskComponent },
  {
    path: 'register/login',
    component: LoginFormComponent,
  },
  {
    path: 'register/login/signup',
    component: RegisterFormComponent,
  },
  {
    path: 'homepage/addproject',
    component: FormModalComponent,
  },
  {
    path: 'home/addproject',
    component: FormModalComponent,
  },

  {
    path: 'homepage/addteam',
    component: AddTeamMemberComponent,
  },
  {
    path: 'home/addteam',
    component: AddTeamMemberComponent,
  },
  {
    path: 'homepage/addtask',
    component: FormAddTakComponent,
  },
  {
    path: 'homepage/addtask',
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
  providers: [
    AuthGuard, // Add AuthGuard to the providers array
    // Other services and providers
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
