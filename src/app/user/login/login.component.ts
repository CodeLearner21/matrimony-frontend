import { AuthService } from '../../_auth/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hasLoginError = false;
  loginErrorMsg = '';
  redirectUrl: string;
  isLoggedIn = false;
  isRegsiter = false; 

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.redirectUrl = params['returnUrl'] || '/home';
      this.isRegsiter = params['registerSuccess'] || false;
    });
    if (this.auth.authenticate()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      this.initLoginForm();
    }
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSignIn() {
    if (this.email.invalid || this.password.invalid) {
      this.hasLoginError = true;
      this.loginErrorMsg = 'Please enter valid email and password!';
      return false;
    }

    const credentials = { email: this.email.value, password: this.password.value };
    this.auth.login(credentials).subscribe((result) => {
      if(result) {
        this.router.navigate([this.redirectUrl]);
      }
      this.hasLoginError = true;
      this.loginErrorMsg = 'Unable to login! please enter valid email and password';
    });
  }

  onSignOut() {
    this.auth.logout();
  }
}
