import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  message = "";
  alertClass = "";
  user : IUser | null = {}
  email = "";

  constructor(private authService: AuthService, private userService: UserService, private formBuilder: FormBuilder, private router: Router) {}

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
      const token = localStorage.getItem('token');
      if(token) {
        try {
          const decodedToken = jwtDecode(token);
          this.email = decodedToken.sub || '';
          this.authService.getUserByEmail(this.email).subscribe((response: any) => {
            this.userService.setUser(response);
            this.user = this.userService.getUser();
          }, (error: any) => {
            console.log(error);
          });
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
      this.router.navigateByUrl('home');
    }, (error: any) => {
      this.message = "Login failed, please try again.";
      this.alertClass = 'alert alert-danger';
      console.log(error)
    });
  }
}
