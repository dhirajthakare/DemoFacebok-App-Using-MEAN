import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let accountToken: any = localStorage.getItem('accountToken');
    request = this.addToken(request, accountToken);
    return next.handle(request).pipe(
      catchError(error => {
          if (error instanceof HttpErrorResponse
              && (error.status === 403 || error.status === 401)) {
                localStorage.removeItem('accountToken');
                localStorage.removeItem('accountHolder');
                window.location.href = '';
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
        authorization: `Bearer ${token}`,
      },
    });
  }
}
