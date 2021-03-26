import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/auth.service";
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  errorMessage: string; initPassword: string;

  constructor(private router: Router, private apiService: AuthService, private formBuilder: FormBuilder, private modalService: ModalService) { }

  ngOnInit() {
    if (localStorage.getItem("currentUser") === null) {
      this.router.navigate(['login'])
    }
    else if (localStorage.getItem("currentUserRole") !== "Admin") {
      this.router.navigate(['notauthorized'])
    }
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
      createdDate: ['', Validators.required]
     
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
    if (this.editForm.value.userName === "" || this.editForm.value.fullName === "" || this.editForm.value.password === "" ||
      this.editForm.value.email === "" || this.editForm.value.status === "" || this.editForm.value.role === "" ||
      this.editForm.value.phone === "") {
      this.errorMessage = 'Please fill and validate all required fields.';
      return;
    }
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
