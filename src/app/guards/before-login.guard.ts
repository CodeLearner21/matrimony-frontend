import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class BeforeLoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('AuthGuardcanActivate called');
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
      this.router.navigate(['user/login']);
        return false;
      }
  }
}
