import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from '../../_auth/auth.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  User: User;
  show: boolean = false;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.currentUser().subscribe((user) => {
      this.User = user;
    });
  }

  nameInitials(firstName: string, lastName: string): string {
    if(firstName && lastName)
      return firstName.charAt(0).toUpperCase() + '' + lastName.charAt(0).toUpperCase();
    
    if(firstName)
      return firstName.charAt(0).toUpperCase();

    if(lastName)
      lastName.charAt(0).toUpperCase();
  }

  toggleDropdown() {
    this.show = !this.show;
  }

  logout() {
    this.auth.logout();
  }

}
