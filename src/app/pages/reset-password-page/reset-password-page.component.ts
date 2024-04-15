import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {
  PasswordValidatorConfirmNew,
  PasswordValidatorOldConfirm,
  PasswordValidatorOldNew
} from 'src/app/shared/password.validator';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css'],
})
export class ResetPasswordPageComponent {
  alertClass = '';
  message = '';
  resetPasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.resetPasswordForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.resetPasswordForm.setValidators([
      PasswordValidatorConfirmNew,
      PasswordValidatorOldConfirm,
      PasswordValidatorOldNew
    ]);
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  onResetPasswordHandler() {
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe(
      (response: any) => {
        this.message = response.message;
        this.alertClass = 'alert alert-success';
        console.log(response);
        this.userService.setUser(response.user);
        this.router.navigateByUrl('home');
      },
      (error: any) => {
        this.message = 'Reset password failed, please try again.';
        this.alertClass = 'alert alert-danger';
        console.log(error);
      }
    );
  }
}
