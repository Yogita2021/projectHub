import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { AddTeamMemberComponent } from './add-team-member/add-team-member.component';
import { FormAddteamComponent } from './form-addteam/form-addteam.component';
import { FormAddTakComponent } from './form-add-tak/form-add-tak.component';
import { CommonModule } from '@angular/common';
import { UpdateProjectFormComponent } from './update-project-form/update-project-form.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    TaskListComponent,
    RegisterFormComponent,
    NavbarComponent,
    HomeComponent,
    LoginFormComponent,
    FormModalComponent,
    TaskManagementComponent,
    AddTeamMemberComponent,
    FormAddteamComponent,
    FormAddTakComponent,
    UpdateProjectFormComponent,
    UpdateTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
