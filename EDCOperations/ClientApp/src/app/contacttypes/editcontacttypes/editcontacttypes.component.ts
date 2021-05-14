
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
  selector: 'app-editcontacttypes',
  templateUrl: './editcontacttypes.component.html',
  styleUrls: ['./editcontacttypes.component.css']
})
export class EditcontacttypesComponent implements OnInit {

  model: any = {};
  user: User;
  roles: [];
  status: [];
  editForm: FormGroup;
  errorMessage: string;
  public account = {
    password: null
  };
  public barLabel: string = "Password strength: ";
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
    //this.apiService.getRoles()
    //  .subscribe(data => {
    //    this.roles = data;
    //  });
    //this.apiService.getStatus()
    //  .subscribe(data => {
    //    this.status = data;
    //  });
    if (localStorage.getItem("currentUser") === null) {
      this.router.navigate(['login'])
    }
    else if (localStorage.getItem("currentUserRole") !== "Admin") {
      this.router.navigate(['notauthorized'])
    }
    this.editForm = this.formBuilder.group({
      type: [''],
      description: ['', Validators.required],

    });
  }
  onSubmit() {
    if (this.editForm.value.type === "" || this.editForm.value.description === "") {
      this.errorMessage = 'Please fill and validate all required fields.';
      return;
    }
    this.apiService.updateContactType(this.editForm.value)

      .subscribe(
        data => {
          if (data.Status === "Success") {
            alert('Contact Type updated successfully.');
            this.router.navigate(['contacttypes']);
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
    this.router.navigate(['contacttypes']);
  }

}

