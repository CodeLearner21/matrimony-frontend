import { ProfileComponent } from './user/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuardService } from './_auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'user/register', component: RegisterComponent
  },
  {
    path: 'user/login', component: LoginComponent
  },
  {
    path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuardService]
  },
  {
    path: '', redirectTo: 'user/register', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'user/register', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
