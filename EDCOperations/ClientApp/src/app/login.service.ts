import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Register } from "../app/register";  

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  Url: string;
  token: string;
  header: any;
  constructor(private http: HttpClient) {

    this.Url = 'http://localhost:58639/api/';
   // this.Url = 'http://13.68.254.40/EDCWebAPI/api/';
    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  Login(model: any) {
    debugger;
    var a = this.Url + 'UserLogin';
    return this.http.post<any>(this.Url + 'UserLogin', model, { headers: this.header });
  }
  CreateUser(model:any) {
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.Url + 'User/CreateUser', model, { headers: this.header })
  }

  Reset(model: any) {
    var body = 'UserName='+model.UserName;
   
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
    return this.http.post<any>(this.Url + 'ForgotPassword', model, { headers: this.header })
  }
  Logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserRole");
    localStorage.removeItem("currentUserFullName");
  }
}

