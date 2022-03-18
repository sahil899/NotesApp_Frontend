import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
const BREAK_POINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  smallSize: boolean = false;
  constructor(private breakpoint: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpoint.observe([`(max-width:${BREAK_POINT}px)`]).subscribe((state: BreakpointState) => {
      console.log(state);
      if (state.matches == true) {
        this.smallSize = true;
      } else {
        this.smallSize = false;
      }
    })
  }

}
