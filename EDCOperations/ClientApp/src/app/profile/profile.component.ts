import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/auth.service";
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  profileForm: FormGroup;
  errorMessage: string;
  userId: number;

  constructor(private router: Router, private apiService: AuthService, private formBuilder: FormBuilder, private modalService: ModalService) { }

  ngOnInit() {
    if (localStorage.getItem("currentUser") === null) {
      this.router.navigate(['login'])
    }
   
    let userId = localStorage.getItem("currentUserId");
    if (!userId) {
      alert("Invalid action.")
      //this.router.navigate(['list-user']);
      return;
    }
    else {
      this.apiService.getUser(userId)
        .subscribe(data => {
          this.user = data;
          this.profileForm.setValue(data);

        });
    }
    this.profileForm = this.formBuilder.group({
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
      this.profileForm.setValue(this.user);
      this.modalService.close(id);
    }

  }

  onSubmit() {
    if (this.profileForm.value.userName === "" || this.profileForm.value.fullName === "" || this.profileForm.value.password === "" ||
      this.profileForm.value.email === "" ||
      this.profileForm.value.phone === "") {
      this.errorMessage = 'Please fill and validate all required fields.';
      return;
    }
    this.apiService.updateProfile(this.profileForm.value)

      .subscribe(
        data => {
          if (data.Status === "Success") {
            alert('Profile updated successfully.');
            //this.router.navigate(['listuser']);
          } else {
            this.errorMessage = data.Message;
          }
        },
        error => {
          this.errorMessage = error.Message;
        });
  }
  onCancel() {
    this.router.navigate(['dashboard']);
  }

}
