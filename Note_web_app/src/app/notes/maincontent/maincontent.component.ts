import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { NotesService } from 'src/app/core/services/notes.service';

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.scss']
})
export class MaincontentComponent implements OnInit, OnChanges {

  // variable declaration
  noteData: any = {}
  editOn = false;
  singleNoteData: any;
  title: string;
  content: string;
  modifyCheck: boolean



  constructor(private notesService: NotesService, private activateRoutes: ActivatedRoute) {
    console.log("checking the in constructor")


  }



  ngOnInit(): void {

    // break the 2 subscibers later on 
    this.activateRoutes.params.subscribe((param: any) => {
      const objId = param['id'];

      this.notesService.getNotes().subscribe((res: any) => {
        this.noteData = res.Notes;

        this.singleNoteData = objId ? this.noteData.filter((x: any) => {
          return x._id == objId
        })[0] : this.noteData[0]
        this.editOn = false;
        // let id = x ? 0 : x['id'];
        console.log(":note id ::::::::;", this.noteData);
        // id = !id ? this.noteData._id : id;
        console.log("checking;:::::::::::::::::;" + this.editOn);
      })
    })
  }




  ngOnChanges(changes: SimpleChanges): void {
    console.table(changes);
    console.log("checking the changes:::::::::::::::::::");
  }

  editNotes() {
    this.editOn = true;
    this.title = this.singleNoteData.title,
      this.content = this.singleNoteData.content

  }
  notesModify(form: any) {

    let editNoteObjId = this.singleNoteData._id;
    let body: any = {
      title: form.value.title,
      content: form.value.content,
      date: new Date()
    }
    this.notesService.modifyNotes(body, editNoteObjId).subscribe((response: any) => {
      if (response.status == 200) {
        this.editOn = false;
        for (let obj in response.body.Note) {
          this.singleNoteData[obj] = response.body.Note[obj]
        }
        console.log(this.singleNoteData);
        this.notesService.notesSubject.next(this.singleNoteData)

      }

    })

  }

}
