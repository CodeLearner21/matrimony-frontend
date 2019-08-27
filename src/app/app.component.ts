import { Component } from '@angular/core';
import { InputControlService } from './_services/input-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'matrimony-frontend';
  inputTextbox: any[];
  constructor(private inputConrol: InputControlService) {
    this.inputTextbox = inputConrol.getInputFromFeilds();
  }
}
