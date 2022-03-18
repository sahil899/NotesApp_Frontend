import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from 'src/app/modals/user';
import { environment as env } from 'src/environments/environment';

@Injectable()
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public userObservables: Observable<User>;


  constructor(private http: HttpClient) {

    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userdata') || '{}'));
    this.userObservables = this.userSubject.asObservable();
  }

  get userData() {
    return this.userSubject.value;
  }

  login(body: any) {
    return this.http.post(`${env.BASE_URL}/user/login`, body, { observe: 'response' }).pipe(map((res: any) => {
      console.log(res);
      const userData = res.body.user
      // const userData = data['user']
      localStorage.setItem('userData', JSON.stringify(userData));
      this.userSubject.next(userData);
      return res;
    }))
  }

}

