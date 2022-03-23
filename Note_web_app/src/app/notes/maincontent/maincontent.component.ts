import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  singleNoteData: any = {};
  title: string;
  content: string;
  modifyCheck: boolean;
  addNewNoteBoolean: boolean = false;
  dataNotLoaded: boolean = false;



  constructor(private notesService: NotesService, private activateRoutes: ActivatedRoute, private router: Router) {
    console.log("checking the in constructor")


  }



  ngOnInit(): void {

    // break the 2 subscibers later on 
    this.activateRoutes.queryParams.subscribe((param: any) => {
      console.table("query param object::::::::::::::::", param);
      const objId = param['obj'];
      if (objId != 'newNote') {
        this.dataNotLoaded = true

        this.notesService.getNotes().subscribe((res: any) => {

          this.noteData = res.Notes;

          this.singleNoteData = objId ? this.noteData.filter((x: any) => {
            return x._id == objId
          })[0] : this.noteData[0]

          console.log("single note data", this.singleNoteData);
          this.editOn = false;
          this.dataNotLoaded = false;

          // let id = x ? 0 : x['id'];
          // console.log(":note id ::::::::;", this.noteData);
          // id = !id ? this.noteData._id : id;
          // console.log("checking;:::::::::::::::::;" + this.editOn);
        })
      } else {
        // adding  new Note
        console.log("else part working;:::::::::::::::::")
        this.singleNoteData = {}
        this.title = ''
        this.content = ''
        this.editOn = true;
        this.addNewNoteBoolean = true;

      }
    })

    // adding new note
    // using routing url and params





  }


  ngOnChanges(changes: SimpleChanges): void {
    console.table(changes);
    // console.log("checking the changes:::::::::::::::::::");
  }

  editNotes() {
    this.editOn = true;
    this.addNewNoteBoolean = false;
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
        this.notesService.notesSubject.next({
          singleNoteData: this.singleNoteData,
          newNote: 0
        })

      }

    })

  }
  newNoteFunction(form: any) {
    let body = {
      title: form.value.title,
      content: form.value.content,
      date: new Date()
    }
    this.notesService.postNotes(body).subscribe((response: any) => {

      if (response.status == 201) {
        this.editOn = false;
        for (let obj in response.body.notes) {
          this.singleNoteData[obj] = response.body.notes[obj]
        }
        console.log("!@@@@@@@@@@@@@@@@@@", this.singleNoteData);

        this.notesService.notesSubject.next({
          singleNoteData: this.singleNoteData,
          newNote: 1
        })
      }

    })
  }



}
