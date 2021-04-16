import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/auth.service";
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  errorMessage: string; initPassword: string;
  roles: [];
  status: [];
  constructor(private router: Router, private apiService: AuthService, private formBuilder: FormBuilder, private modalService: ModalService) { }

  ngOnInit() {
    if (localStorage.getItem("currentUser") === null) {
      this.router.navigate(['login'])
    }
    //else if (localStorage.getItem("currentUserRole") !== "Admin") {
    //  this.router.navigate(['notauthorized'])
    //}
    let userId = localStorage.getItem("editUserId");
    if (!userId) {
      alert("Invalid action.")
      this.router.navigate(['aggriduser']);
      return;
    }
    else {
      this.apiService.getUser(userId)
        .subscribe(data => {
          this.user = data;
          this.editForm.setValue(data);

        });
      this.apiService.getRoles()
        .subscribe(data => {
          this.roles = data;
        });
      this.apiService.getStatus()
        .subscribe(data => {
          this.status = data;
        });
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      token: ['', Validators.required],
      statusId: ['', Validators.required],
      roleId: ['', Validators.required],
    });
  }
  openModal(id: string) {

    this.modalService.open(id);
  }

  closeModal(id: string, status: string) {
    if (status === 'Ok') {
      this.modalService.close(id);
      //this.editForm.controls['password'].setValue(selected.id);

    }

    else {
      this.editForm.setValue(this.user);
      this.modalService.close(id);
    }

  }
  onSubmit() {
    this.apiService.updateUser(this.editForm.value)

      .subscribe(
        data => {
          if (data.Status === "Success") {
            alert('User updated successfully.');
            this.router.navigate(['aggriduser']);
          } else {
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
