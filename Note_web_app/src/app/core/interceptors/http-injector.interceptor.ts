import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInjectorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = JSON.parse(localStorage.getItem('userData') || '{}').token
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.token}`,
        'text': 'comming with this value'
      }
    })
    console.log(currentUser);
    console.log("inside interceptors")
    console.log(request);
    return next.handle(request);
  }
}
