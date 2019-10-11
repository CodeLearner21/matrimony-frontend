import { AuthService } from './../../_services/auth.service';
import { MatrimonyService } from './../../_services/matrimony.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  portfolioTypes:  any[];
  userIdtoken = sessionStorage.getItem('userId');
  profileForm = new FormGroup({
    fullName: new FormControl(''),
    gender: new FormControl(''),
    birthdate: new FormControl(''),
    userId: new FormControl(''),
    portfolioTypeId: new FormControl('')
  });
  constructor(private matrimony: MatrimonyService, private auth: AuthService, private formbuilder: FormBuilder) {
  }
  ngOnInit() {
    this.profileForm = this.formbuilder.group({
      fullName: [''],
      gender: [''],
      birthdate: [''],
      userId: [this.getUserId()],
      portfolioTypeId: ['']
    });

    this.matrimony.getPortfolioTypes().subscribe((data) => {
      this.portfolioTypes = data;
      console.log('types:', this.portfolioTypes[0].name);
    });
  }
  addProfile(form) {
    const profileFormValue = form.value;
    console.log(profileFormValue);
    this.matrimony.addProfile(profileFormValue).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }

  getUserId() {
    return sessionStorage.getItem('id');
  }


}
