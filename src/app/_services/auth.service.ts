import { Register } from './../_models/register.model';
import { Login } from './../_models/login.model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = `${environment.api.matrimony}`;
  constructor(private httpClient: HttpClient) { }

  register(register: Register): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/api/Account/register`, register, httpOptions);
  }

  login(login: Login): Observable<any> {
    const apiUrl = `${environment.api.matrimony}/api/Account/login`;
    console.log('login value', login);
    console.log(`${this.apiUrl}/api/Account/login`);
    return this.httpClient.post<any>(`${this.apiUrl}/api/Account/login`, login, httpOptions);
  }
  isLoggedIn() {
    return !!sessionStorage.getItem('Token');
  }
}

