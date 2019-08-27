import { AuthService } from './../../_services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(form) {
    const loginFormValue = form.value;
    this.auth.login(loginFormValue).subscribe((res) => {
      const token = JSON.stringify(res);
       console.log(res);
      sessionStorage.setItem('Token', token );
     });
  }
}
