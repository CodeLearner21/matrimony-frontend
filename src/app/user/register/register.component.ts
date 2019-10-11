import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  inputTextFeilds: any[];
  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailId: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router, http: HttpClient) {
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [ Validators.required, Validators.minLength(8)]]
    })
  }
  register(form) {
    const registerfromValues = form.value;
    console.log(registerfromValues);
    const registerFromValues = form.value;
    this.auth.register(registerfromValues).subscribe(
      (registerData) => {
       this.auth.login(registerFromValues.email, registerFromValues.password).subscribe( login =>{
        console.log("login", login)
        this.router.navigate(['/user/profile']);
       }) 
        console.log(registerData);        
      });
    }

    get form() {
      return this.registerForm.controls;
    }

}
