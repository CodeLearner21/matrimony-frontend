import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../_auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  hasRegiterError = false;
  registerErrorMsg = '';
  showSubmitSpinner = false;


  constructor(private auth: AuthService,
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit() {
    // Register form initialise
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
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

  get password() {
    return this.registerForm.get('password');
  }

  onRegister() {
    this.showSubmitSpinner = true;
    const controls = this.registerForm.controls;
    if (this.registerForm.invalid) {
      Object.keys(controls).forEach(controlName => 
          controls[controlName].markAsTouched()
        );
      this.registerErrorMsg = 'Please enter valid details';
      this.showSubmitSpinner = false;
      return false;
    }

    const data = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value
    };

    this.auth.register(data).subscribe((result) => {
      this.showSubmitSpinner = false;
      if (result) {
        this.router.navigate(['user/login'], { queryParams : { registerSuccess: true }});
      }
      this.hasRegiterError = true;
      this.registerErrorMsg = 'Registration failed! Please enter valid details and try again.';
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registerForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}
