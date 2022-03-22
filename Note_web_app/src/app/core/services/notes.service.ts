import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notesSubject: Subject<any>;
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.notesSubject = new Subject();
  }



  getNotes() {
    let headerss = new Headers();
    return this.http.get(`${env.BASE_URL}/notes`, { observe: 'response' }).pipe(map((response: any) => {
      if (response.status == 500) {
        console.log("checking errr:::::::::::::::;")
        this.router.navigate(["user", "signin"]);
      }
      return response.body;
    }))

  }
  modifyNotes(body: any, noteid: string) {
    console.log("!!!!!!!!!!!body!!!!!!!!!!!!!!!!!", body)
    return this.http.patch(`${env.BASE_URL}/notes/${noteid}`, body, { observe: 'response' })
    // .pipe(map((response) => {

    //   console.log(response);
    //   return response
    // }
    // ))
  }

}
