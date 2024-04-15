import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidatorOldConfirm } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  message = '';
  alertClass = '';
  registerForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: PasswordValidatorOldConfirm});
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get contactNumber() {
    return this.registerForm.get('contactNumber');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmitHandler() {
    this.authService.register(this.registerForm.value).subscribe((response: any) => {
      this.message = response.message;
      this.alertClass = 'alert alert-success';
      console.log(response);
      this.router.navigateByUrl('login');
    }, (error: any) => {
      this.message = "Registration failed, please try again.";
      this.alertClass = 'alert alert-danger';
      console.log(error)
    });
  }

}
