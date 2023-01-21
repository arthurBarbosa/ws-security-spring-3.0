import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler):
    Observable<HttpEvent<unknown>> {

    let token = localStorage.getItem('token');
    console.log('antes ', token)
    if (!token) {
      this.router.navigate([''])
      console.log('nao tem token')
    }

    request = request.clone({
      setHeaders: { Authorization: `${token}` }
    });

    return next.handle(request);
  }

}
