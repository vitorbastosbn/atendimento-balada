import { HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap } from 'rxjs';
import { LoginService } from './../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = localStorage.getItem('accessToken');

    if (token !== null) {
      return next.handle(this.addTokenHeader(req, token)).pipe(
        catchError(error => {
          if (error.status === HttpStatusCode.Unauthorized) {
            return this.handleRefreshToken(req, next);
          }
          return new Error(error);
        })
      );
    }

    return next.handle(req);
  }

  handleRefreshToken(req: HttpRequest<any>, next: HttpHandler): any {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken !== null) {
      return this.loginService.atualizarToken(localStorage.getItem('username')!).pipe(
        switchMap(() => {
          return next.handle(this.addTokenHeader(req, refreshToken))
        })
      )
    }
  }

  addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({ setHeaders: { 'Authorization': `Bearer ${token}` } })
  }

}
