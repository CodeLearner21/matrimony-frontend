import { Injectable } from '@angular/core';
import { Profile } from './../_models/profile.model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MatrimonyService {
  dropdownOptions: any;
  apiUrl = `${environment.api.matrimony}`;
  constructor(private httpClient: HttpClient) { }

  addProfile(profile: Profile): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/api/V1/Porfolios`, profile, httpOptions);
  }

  getPortfolioTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/V1/Resources/PortfolioTypes`, httpOptions);
  }  

}
