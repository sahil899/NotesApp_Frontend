import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../modals/user';
import { environment as env } from 'src/environments/environment';
import { map } from 'rxjs';
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }


  register(body: User) {
    return this.http.post(`${env.BASE_URL}/user/signup`, body, { observe: 'response' })
  }

  // login(body: any): any {
  //   return this.http.post(`${env.BASE_URL}/user/login`, body, { observe: 'response' }).pipe(map((res) => {
  //     console.log("checking::::::::: response")
  //     let data: any = res.body;
  //     localStorage.setItem('userToken', data['token']);
  //     return res;
  //   }))
  // }
}
