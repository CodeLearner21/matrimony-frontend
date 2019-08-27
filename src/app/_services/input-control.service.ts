import { Textbox } from './../formControl/textbox';
import { Injectable } from '@angular/core';
import { RegisterInput } from '../_models/register-input.model';

@Injectable({
  providedIn: 'root'
})
export class InputControlService {

  constructor() { }

  getInputFromFeilds() {
  const textInputFeilds: RegisterInput<any>[] = [
    new Textbox({
      key: 'lastName',
      label: 'Last name',
      value: '',
      required: true,
      order: 2
    }),
    new Textbox({
      key: 'firstName',
      label: 'First name',
      value: '',
      required: true,
      order: 1
    }),
    new Textbox({
      key: 'email',
      label: 'Email Address',
      value: '',
      required: true,
      order: 3,
      type: 'email'
    }),
    new Textbox({
      key: 'password',
      label: 'Password',
      value: '',
      required: true,
      order: 4,
      type: 'password'
    })
  ];

  return textInputFeilds.sort((a, b) => a.order - b.order);

  }
}
