import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/role';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  public account = {
    password: null
  };
  public barLabel: string = "Password strength:";

  constructor(private router: Router, private authService: AuthService) { }
  //get isAuthorized() {
  //  return this.authService.isAuthorized();
  //}
  //get isAdmin() {
  //  return this.authService.hasRole(Role.Admin);
  //}
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
