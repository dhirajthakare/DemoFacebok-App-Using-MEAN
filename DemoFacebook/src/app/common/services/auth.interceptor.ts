import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let accountToken: any = localStorage.getItem('accountToken');
    // request.body.email = "Emaild"; // change body
    console.log(accountToken);

    request = this.addToken(request, accountToken);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, token: string) {
    if (!token) {
      return request;
    }
    return request.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
  }
}
