import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    let Logintoken:any = localStorage.getItem('accountToken');
    // request.body.email = "Emaild"; // change body 
    
    request = this.addToken(request, Logintoken);
    return next.handle(request)
    .pipe(
      catchError(error => {
          if (error instanceof HttpErrorResponse
              && (error.status === 403 || error.status === 401)) {
              return throwError(error);
          } else {
              return throwError(error);

          }
      })
  )
  
  }

  private addToken(request: HttpRequest<any>, token: string) {

    if (!token) {
        return request;
    }

    return request.clone({
        setHeaders: {
            LoginToken: `${token}`
        }
    });
}
}
