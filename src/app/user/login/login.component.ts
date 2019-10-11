import { AuthService } from './../../_services/auth.service';
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
  loginForm = new FormGroup({
    email: new FormControl('', [ Validators.required]),
    password: new FormControl('',  [ Validators.required])
  });
  returnUrl: string;
  submitted = false;
  constructor(private auth: AuthService, private router: Router, private activateRout: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.activateRout.snapshot.queryParams['returnUrl'] === undefined) {
      this.returnUrl = '/home';
      console.log('retureurl value : ', this.returnUrl);
    } else {
      this.returnUrl = this.activateRout.snapshot.queryParams['returnUrl'];
      console.log('retureurl value : ', this.returnUrl);
    }

  }

  login(form) {
    if (this.loginForm.invalid) {
      return;
    }
    const loginFormValues = form.value;
    console.log('form values',loginFormValues);
    this.auth.login(loginFormValues.email, loginFormValues.password).subscribe((res) => {
      console.log('code', HttpResponse);
      this.router.navigateByUrl(this.returnUrl);
     });
  }
}
