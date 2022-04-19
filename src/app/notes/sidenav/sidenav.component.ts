import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { NotesService } from 'src/app/core/services/notes.service';
const BREAK_POINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  // variable declaration and intialization
  smallSize: boolean = false;
  NotesData: any = {}
  subcription$1: Subscription;
  activateSpinner: boolean = false;
  isActive: boolean;

  constructor(private breakpoint: BreakpointObserver, private noteService: NotesService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    //  variable initialization

    this.activateSpinner = true;

    // collapsing the sidenav in mobile view
    this.breakpoint.observe([`(max-width:${BREAK_POINT}px)`]).subscribe((state: BreakpointState) => {
      if (state.matches == true) {
        this.smallSize = true;
        this.isActive = false;
      } else {
        this.smallSize = false;
        this.isActive = true;
      }
    })

    // updating the noteData after editing or creating new notes
    this.noteService.notesSubject.subscribe((res: any) => {
      if (res.newNote == 0) {
        let arrayItr = this.NotesData.map((itr: any) => {

          if (itr._id == res.singleNoteData._id) {
            return res.singleNoteData;
          }
          return itr;

        })
        Object.assign(this.NotesData, arrayItr);
      } else {
        this.NotesData.push({
          _id: res.singleNoteData._id,
          title: res.singleNoteData.title,
          content: res.singleNoteData.content,
          date: res.singleNoteData.date,
          new_note: res.singleNoteData.new_note
        })
      }

      // for updating the original variable


    })

    this.subcription$1 = this.noteService.getNotes().subscribe((response: any) => {
      this.activateSpinner = false;
      console.log(":::::::sidenav", response);
      this.NotesData = [];
      response.Notes.map((x: any) => {
        this.NotesData.push(x);
      })
      this.alertService.success(response.message);

    }, (err) => {
      console.log(err);
      if (err.status == 500) {
        this.alertService.error(err.error.message);
        this.router.navigate(["user", "signin"]);
      }
      if (err.status == 400) {
        this.activateSpinner = false;
        this.alertService.error(err.error.message);
        this.router.navigate(['notes', 'NS'], { queryParams: { 'obj': 'newNote' } });

      }

    })


  }
  // newNote() {
  //   console.log("checking;::::::::::::::: in newNote");

  //   this.router.navigate(['/notes'], { queryParams: { newNote: 1 }, skipLocationChange: true })
  // }

  // delete notes function

  deleteNote(noteid: string) {

    this.noteService.deleteNote(noteid).subscribe((res: any) => {
      console.log("response in delete function::::::::::::::::::::::", res);

      for (let i = 0; i < this.NotesData.length; i++) {

        if (this.NotesData[i]._id == noteid) {
          this.NotesData.splice(i, 1);
        }
      }
      this.alertService.success(res.body.message)
      this.router.navigate(['notes', 'NS'], { queryParams: { 'obj': (this.NotesData.length ? this.NotesData.length[0] : 'newNote') } })

    })


  }

  ngOnDestroy(): void {
    this.subcription$1.unsubscribe();
  }

}
