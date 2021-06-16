import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/role';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  loggedUserRole = null;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    this.loggedUserRole = this.userService.getloggedUserRole();
  }
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
