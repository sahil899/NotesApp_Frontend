import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() collapsed: any;
  @Output() menu = new EventEmitter();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.authService.logoutUser();
  }

}
