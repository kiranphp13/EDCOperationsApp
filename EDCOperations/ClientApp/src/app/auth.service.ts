import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Role } from './models/role';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

import { Observable } from "rxjs/index";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';  


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;
  roleAs: string;
  //url: string = 'http://localhost:58639/api/';
  url: string = 'http://13.68.254.40/EDCWebAPI/api/';
  header: any;
  constructor(private router: Router, private LoginService: LoginService, private http: HttpClient) {
    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);}
  

  isAuthorized() {
    if (localStorage.getItem("currentUser") === null) {
      return false;
    }
    else
      return true;
  }
  isAdmin() {
    if (localStorage.getItem("currentUserRole") === "Admin") {
      return true;
    }
    else
      return false;
  }
  isReader() {
    if (localStorage.getItem("currentUserRole") === "Reader") {
      return true;
    }
    else
      return false;
  }
  isEditor() {
    if (localStorage.getItem("currentUserRole") === "Editor") {
      return true;
    }
    else
      return false;
  }
  logout() {
    this.LoginService.Logout();
    this.router.navigate(['/login']);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'User/GetUsers');
  }
  getUser(userId: string): Observable<User> {
    return this.http.get<User>(this.url + 'User/GetUser/' + userId);
  }
  getRoles(): Observable<any> {
    return this.http.get<any>(this.url + 'User/GetRoles');
  }
  getStatus(): Observable<any> {
    return this.http.get<any>(this.url + 'User/GetStatus');
  }
 
  createUser(model: any) {
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.url + 'User/CreateUser', model, { headers: this.header })
  }
  updateUser(model: any) {
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.url + 'User/UpdateUser', model, { headers: this.header })
  }
 
  updateProfile(model: any) {
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.url + 'User/UpdateProfile', model, { headers: this.header })
  }
  deleteUser(userid: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/DeleteUser?id=' + userid, httpOptions);
  }  
}
