import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { Token } from '../_models/token';
import { Router } from '@angular/router';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  register(registerData): Observable<boolean> {
    const apiUrl = `${environment.api.matrimony}/api/V1/Account/Register`;
    const options = { headers: this.headers };
    return this.httpClient.post<void>(apiUrl, JSON.stringify(registerData), options)
    .pipe(
      map((response: any) => {
        if(response.success && response.id) {
          return true;
        }
        return false;
      })
    );
  }

  login(credentials): Observable<boolean> {
    const apiUrl = `${environment.api.matrimony}/api/V1/Account/Login`;
    const options = { headers: this.headers };
    return this.httpClient.post(apiUrl, JSON.stringify(credentials), options)
      .pipe(
        map((authResult: any) => {
          if(authResult.success && authResult.token) {
            this.storeLocalSession(authResult.token);
            return true;
          }
          return false;
        })
      );
  }

  authenticate(): boolean {
    if (sessionStorage.getItem('isLoggedIn') 
      && (+this.expireTime > new Date().getTime())) {
      return true;
    }
    return false;
  }

  get authToken() {
    return sessionStorage.getItem('token');
  }
  get expireTime() {
    return sessionStorage.getItem('expireAt');
  }

  storeLocalSession(token: Token) {
    const expiresAt = (token.expiresIn * 1000) + new Date().getTime();
    sessionStorage.setItem('expireAt', expiresAt.toString());
    sessionStorage.setItem('token', token.authToken);
    sessionStorage.setItem('isLoggedIn', 'true');
  }

  currentUser(): Observable<User> {
    const options = { headers: this.headers };
    const apiUrl = `${environment.api.matrimony}/api/V1/Account/CurrentUser`;
    return this.httpClient.get(apiUrl, options).pipe(
      map((response: any) => {
        if (response.success && response.user != null) {
          return new User(response.user.id, response.user.firstName, response.user.lastName, response.user.userName, response.user.email);
        }
        return null;
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expireAt');
    this.router.navigate(['user/login']);
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}

