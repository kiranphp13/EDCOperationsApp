import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from "src/app/auth.service";
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { User } from "src/app/models/user";
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  model: any = {};
  user: User;
  addForm: FormGroup;
  errorMessage: string;
  constructor(private router: Router, private apiService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    //this.UserForm = this.formbulider.group({
    //  UserName: ['', [Validators.required]],
    //  LoginName: ['', [Validators.required]],
    //  Password: ['', [Validators.required]],
    //  Email: ['', [Validators.required]],
    //  ContactNo: ['', [Validators.required]],
    //  Address: ['', [Validators.required]],
    //}); 
    if (localStorage.getItem("currentUser") === null) {
      this.router.navigate(['login'])
    }
    else if (localStorage.getItem("currentUserRole") !== "Admin") {
      this.router.navigate(['notauthorized'])
    }
    this.addForm = this.formBuilder.group({
      id: ['1'],
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      token: ['', Validators.required]
    });
  }
  onSubmit() {
    this.apiService.createUser(this.addForm.value)

      .subscribe(
        data => {
          if (data.Status === "Success") {
            alert('User created successfully.');
            this.router.navigate(['listuser']);
          } else {
            //alert(data.message);
            this.errorMessage = data.Message;
          }
        },
        error => {
          this.errorMessage = error.Message;
        });
  }
  onCancel() {
    this.router.navigate(['aggriduser']);
  }
  
}    
