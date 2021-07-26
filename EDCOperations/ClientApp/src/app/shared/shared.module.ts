import {TestDirective} from './test.directive';
import { NgModule } from '@angular/core';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';


@NgModule({

  declarations: [
    TestDirective,
    PasswordStrengthBarComponent,
  ],
  exports: [
    TestDirective,
    PasswordStrengthBarComponent
  ],
})
export class SharedModule {
}
