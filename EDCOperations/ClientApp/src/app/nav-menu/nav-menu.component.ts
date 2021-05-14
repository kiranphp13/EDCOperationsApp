import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service'
import { AuthService } from '../auth.service';


document.addEventListener("DOMContentLoaded", function () {
  // make it as accordion for smaller screens
  if (window.innerWidth < 992) {

    // close all inner dropdowns when parent is closed
    document.querySelectorAll('.navbar .dropdown').forEach(function (everydropdown) {
      everydropdown.addEventListener('hidden.bs.dropdown', function () {
        // after dropdown is hidden, then find all submenus
        this.querySelectorAll('.submenu').forEach(function (everysubmenu) {
          // hide every submenu as well
          everysubmenu.style.display = 'none';
        });
      })
    });

    document.querySelectorAll('.dropdown-menu a').forEach(function (element) {
      element.addEventListener('click', function (e) {
        let nextEl = this.nextElementSibling;
        if (nextEl && nextEl.classList.contains('submenu')) {
          // prevent opening link if link needs to open dropdown
          e.preventDefault();
          if (nextEl.style.display == 'block') {
            nextEl.style.display = 'none';
          } else {
            nextEl.style.display = 'block';
          }

        }
      });
    })
  }
  // end if innerWidth
});
// DOMContentLoaded  end

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
