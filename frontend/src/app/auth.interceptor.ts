import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getUserData();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError(err => {
        // Якщо сервер повернув відповідь із статусом 401, здійснюємо вихід
        if (err.status === 401) {
          this.authService.logout();
        }
        throw err;
      })
    );
  }
}
