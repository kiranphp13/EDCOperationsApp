import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  errorMessage: string;

  constructor(private router: Router, private loginService: LoginService, private userService: UserService) {
  }

  fieldTextType: boolean;
  repeatFieldTextType: boolean;

  ngOnInit() {
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  login() {
    this.loginService.Login(this.model).subscribe(
      data => {
        if (data.Status === 'Success') {
          this.userService.storeUserData(data);
          // this.router.navigate(['dashboard']);

          this.router.navigate(['dashboard'])
            .then(() => {
              window.location.reload();
            });

        } else {
          this.errorMessage = data.Message;
        }
      },
      error => {
        this.errorMessage = error.message;
      });
  }
}
