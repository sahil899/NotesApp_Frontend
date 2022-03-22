import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotesService } from 'src/app/core/services/notes.service';
const BREAK_POINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  smallSize: boolean = false;
  NotesData: any;
  subcription$1: Subscription;
  constructor(private breakpoint: BreakpointObserver, private noteService: NotesService, private router: Router) { }

  ngOnInit(): void {

    this.breakpoint.observe([`(max-width:${BREAK_POINT}px)`]).subscribe((state: BreakpointState) => {
      if (state.matches == true) {
        this.smallSize = true;
      } else {
        this.smallSize = false;
      }
    })

    this.noteService.notesSubject.subscribe((res: any) => {

      let arrayItr = this.NotesData.map((itr: any) => {

        if (itr._id == res._id) {
          return res;
        }
        return itr;

      })

      // for updating the original variable
      Object.assign(this.NotesData, arrayItr);

    })

    this.subcription$1 = this.noteService.getNotes().subscribe((res: any) => {
      this.NotesData = [];
      res.Notes.map((x: any) => {
        this.NotesData.push(x);

      })


    }, (err) => {
      console.log(err);
      if (err.status == 500) {
        this.router.navigate(["user", "signin"]);

      }
    })


  }

  ngOnDestroy(): void {
    this.subcription$1.unsubscribe();
  }

}
