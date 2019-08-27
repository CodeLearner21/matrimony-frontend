import { BeforeLoginGuard } from './guards/before-login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {
    path: 'user/register', component: RegisterComponent
  },
  {
    path: 'user/login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [BeforeLoginGuard]
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
