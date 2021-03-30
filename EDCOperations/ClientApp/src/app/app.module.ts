import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {  } from '@angular/forms'
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NotauthorizedComponent } from './notauthorized/notauthorized.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AggridUserComponent } from './user/aggrid-user/aggrid-user.component';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from './_modal';
import { AdUserComponent } from './user/ad-user/ad-user.component';
import { DataTablesModule } from "angular-datatables";
import { NgxUserComponent } from './ngx-user/ngx-user.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ButtonRendererComponent } from './renderer/button-renderer.component';
import { BtnCellRenderer } from './button-cell-renderer.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { CommonModule } from '@angular/common';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,

    LoginComponent,

    RegisterComponent,

    ProfileComponent,

    DashboardComponent,

    NotauthorizedComponent,

    ForgotPasswordComponent,

    ResetPasswordComponent,

    ListUserComponent,

    AddUserComponent,

    EditUserComponent,

    AggridUserComponent,

    AdUserComponent,

    NgxUserComponent,
    ButtonRendererComponent,
    BtnCellRenderer,
    ViewUserComponent,
    PasswordStrengthBarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    AgGridModule.withComponents([BtnCellRenderer]),
    ModalModule, DataTablesModule, NgxDatatableModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'notauthorized', component: NotauthorizedComponent },
      { path: 'forgotpassword', component: ForgotPasswordComponent },
      { path: 'resetpassword', component: ResetPasswordComponent },
      { path: 'listuser', component: ListUserComponent },
      { path: 'adduser', component: AddUserComponent },
      { path: 'edituser', component: EditUserComponent },
      { path: 'aggriduser', component: AggridUserComponent },
      { path: 'aduser', component: AdUserComponent },
      { path: 'ngxuser', component: NgxUserComponent },
      { path: 'viewuser', component: ViewUserComponent },
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router, private authService: AuthService) { }

  get isAuthorized() {
    return this.authService.isAuthorized();
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }
}
