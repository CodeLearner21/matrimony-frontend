import { AuthService } from '../_services/auth.service';
import { environment } from './../../environments/environment';
import { Injectable} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const isApiUrl = request.url.startsWith(`${environment.api.matrimony}`);
    if(this.auth.isLoggedIn && isApiUrl){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
      }
      });
      return next.handle(request);
    }
  }
}
