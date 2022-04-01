import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject: any;
  private keepAfterRouteChange = false;
  constructor(private router: Router) {
    this.alertSubject = new Subject();
    this.router.events.subscribe((event) => {
      // console.log(":$$$$$$$$$$$$$$$$$$$$$$ alert event  ", event);

      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {

          this.clear()
        }
      }

    })
  }

  getAlert() {
    return this.alertSubject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    console.log("@@@@@@@@@@@@@ success", message);
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertSubject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterRouteChange = false) {

    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertSubject.next({ type: 'error', text: message });
  }

  clear() {
    this.alertSubject.next()
  }
}
