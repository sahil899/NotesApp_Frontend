import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable()
export class HttpInjectorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = JSON.parse(localStorage.getItem('userData') || '{}').token;
    const re = new RegExp(`${env.BASE_URL}/notes/*`)
    const output = re.exec(request.url);
    if (output != null || output != undefined) {
      const clonerequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`,
          testtext: "we are all together"
        }
      })
      return next.handle(clonerequest);

    }

    return next.handle(request);
  }
}
