import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  message = "";
  alertClass = "";

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}

  loginForm = this.formBuilder.group({
    usernameOrEmail: [null, Validators.required],
    password: [null, Validators.required],
  });

  get usernameOrEmail() {
    return this.loginForm.get('usernameOrEmail');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLoginHandler() {
    //console.log(this.loginForm.value);
    //console.log(JSON.stringify(this.loginForm.getRawValue()));
    this.authService.login(JSON.stringify(this.loginForm.getRawValue())).subscribe((response: any) => {
      this.message = response.message;
      this.alertClass = 'alert alert-success';
      localStorage.setItem('token', response.token);
      console.log(response)
      this.router.navigateByUrl('home');
    }, (error: any) => {
      this.message = "Login failed, please try again.";
      this.alertClass = 'alert alert-danger';
      console.log(error)
    });
  }
}
