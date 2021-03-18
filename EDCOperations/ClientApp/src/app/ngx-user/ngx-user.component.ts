import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/auth.service";



@Component({
  selector: 'app-ngx-user',
  templateUrl: './ngx-user.component.html',
  styleUrls: ['./ngx-user.component.css']
})
export class NgxUserComponent implements OnInit {

  users: User[];
  rows = [];

  temp = [];

  columns = [{ prop: 'id' }, { name: 'Full Name' }, { name: 'User Name' }, { name: 'Role' }, { name: 'Email' }, { name: 'Phone' },{ name: 'Address' }, { name: 'Status' }];

  constructor(private router: Router, private apiService: AuthService) { }

  ngOnInit() {
    //if (!window.localStorage.getItem('token')) {
    //  this.router.navigate(['login']);
    //  return;
    //}
    if (localStorage.getItem("currentUser") === null) {
      this.router.navigate(['login'])
    }
    else if (localStorage.getItem("currentUserRole") !== "Admin") {
      this.router.navigate(['notauthorized'])
    }
    this.apiService.getUsers()
      .subscribe(data => {
        this.temp = data;
        this.users = data;
      });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.fullName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }
  addUser(): void {
    this.router.navigate(['adduser']);
  };

}

