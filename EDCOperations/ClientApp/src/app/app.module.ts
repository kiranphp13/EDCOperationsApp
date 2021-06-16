import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {NavMenuComponent} from './modules/navigation/nav-menu/nav-menu.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ProfileComponent} from './modules/profile/profile.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {NotauthorizedComponent} from './pages/notauthorized/notauthorized.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {AgGridModule} from 'ag-grid-angular';
import {ModalModule} from './_modal';
import {DataTablesModule} from 'angular-datatables';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CommonModule} from '@angular/common';
import {SharedModule} from './shared/shared.module';
import {AdministrationModule} from './modules/administration/administration.module';
import {TrainingModule} from './modules/training/training.module';

import {MarketingModule} from './modules/marketing/marketing.module';
import {OrderProcessingModule} from './modules/order-processing/order-processing.module';
import {ContactsModule} from './modules/contacts/contacts.module';


import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    NotauthorizedComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    ModalModule, DataTablesModule, NgxDatatableModule,
    AdministrationModule,
    TrainingModule,
    MarketingModule,
    OrderProcessingModule,
    ContactsModule,

    SharedModule,
    // TODO : Move below components to Feature Module (PagesModule)
    RouterModule.forRoot([
      // {path: '', component: LoginComponent, pathMatch: 'full'},

      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'notauthorized', component: NotauthorizedComponent},
      {path: 'forgotpassword', component: ForgotPasswordComponent},
      {path: 'resetpassword', component: ResetPasswordComponent},
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router, private authService: AuthService) {
  }

  get isAuthorized() {
    return this.authService.isAuthorized();
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }
}
