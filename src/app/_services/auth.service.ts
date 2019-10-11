import { Register } from './../_models/register.model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = `${environment.api.matrimony}`;
  constructor(private httpClient: HttpClient) { 
    console.log('token', this.getToken());
  }

  register(register: Register): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/api/V1/Account/Register`, register);
  }

  login(email, password): Observable<any> {
    const apiUrl = `${environment.api.matrimony}/api/V1/Account/Login`;
    console.log('login value', email, password);
    console.log(`${this.apiUrl}/api/V1/Account/Login`);
    return this.httpClient.post<any>(apiUrl, {email, password}).
    pipe(map(user => {
      console.log('token values:', user);
      if(user){
        console.log('authToken', user.authToken)
        sessionStorage.setItem('id', user.id);
        sessionStorage.setItem('authToken', user.authToken);
        sessionStorage.setItem('expiresIn', user.expiresIn);
      }
      return user;

    }));
  }

  isLoggedIn() {
      return !!sessionStorage.getItem('authToken');
  }

  getToken() {
    return sessionStorage.getItem('authToken');
  }

  logout() {
    sessionStorage.removeItem('authToken'); 
    sessionStorage.removeItem('expiresIn');
    sessionStorage.removeItem('userId');
  }

}

