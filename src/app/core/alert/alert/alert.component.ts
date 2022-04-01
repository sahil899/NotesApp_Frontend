import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  subscription: Subscription
  message: any

  constructor(private alertService: AlertService) { }
  ngOnInit(): void {
    this.subscription = this.alertService.getAlert()
      .subscribe((message: any) => {
        switch (message && message.type) {
          case 'success':
            message.bgColor = { 'background-color': '#03bd03b5', 'color': 'black', 'display': 'block' }
            setTimeout(() => {
              this.message = {}
            }, 3000);
            console.log("message in scusess", message);

            break;
          case 'error':
            message.bgColor = { 'background-color': '#ff00008a', 'color': 'white' };
            setTimeout(() => {
              this.message = {}
            }, 3000);
            break;
        }

        this.message = message;
        console.log("::::::::this message", this.message);

      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
