import { LoadingService } from './../../_services/loading.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { InputControlService } from 'src/app/_services/input-control.service';
import { RegisterInput } from 'src/app/_models/register-input.model';
import { Observable, of } from 'rxjs';


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
    email: new FormControl(''),
    password: new FormControl('')
  });

  @Input() inputTextbox: RegisterInput<any>;
  form: FormGroup;
  get isValid() {
    console.log(this.form.controls[this.inputTextbox.key]);
    return this.form.controls[this.inputTextbox.key].valid;
  }
  constructor(private httpclient: HttpClient, private auth: AuthService, private fb: FormBuilder
    , private inputControl: InputControlService, private loading: LoadingService) {
    this.inputTextFeilds = inputControl.getInputFromFeilds();
    console.log(this.inputTextFeilds);
  }
  ngOnInit() {
  }
  register(form) {
    const registerfromValues = form.value;
    console.log(registerfromValues);
    // let delayObservable =  Observable.of(registerfromValues).delay(5000);
    this.auth.register(registerfromValues).subscribe(
      (data) => {
        console.log(data);
      }
    );
    }

}
