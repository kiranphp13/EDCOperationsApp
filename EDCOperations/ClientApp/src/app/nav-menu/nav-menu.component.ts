import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false; username = ""; 
  constructor(private router: Router, private LoginService: LoginService, private authService:  AuthService) { }
  collapse() {
    this.isExpanded = false;
  }
 

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  get isAuthorized() {
    if (this.authService.isAuthorized()) {
      this.username = localStorage.getItem('currentUserFullName');
    }
    return this.authService.isAuthorized();
  }
  ngOnInit() {
    if (!this.isAuthorized) {
      this.router.navigate(['login']);
    }
   
    }
 

  get isAdmin() {
    return this.authService.isAdmin();
  }

  get isReader() {
    return this.authService.isReader();
  }
  logout() {
    this.LoginService.Logout();
    this.router.navigate(['/login']);
  }
}
