import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.scss']
})
export class MaincontentComponent implements OnInit {

  @Input() collapsed: any;
  @Output() menu = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
