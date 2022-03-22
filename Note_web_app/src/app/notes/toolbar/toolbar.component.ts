import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() collapsed: any;
  @Output() menu = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
