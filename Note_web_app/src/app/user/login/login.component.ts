import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private authService: AuthService, private alertService: AlertService) { }

  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void { }

  get emailid() {
    if (this.signInForm == undefined) return;
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }
  onSubmit(form: any) {
    let body = {
      email: form.value.email,
      password: form.value.password
    }
    this.authService.login(body).subscribe((response: any) => {
      if (response.status == 200) {
        this.router.navigate(['/notes'])
        this.alertService.success(response.body.message);
      }
    }, (err) => {
      this.alertService.error(err.error.message);

    });



    console.log(form);

  }
  redirect() {
    console.log("checking;::dd::::::::");

    this.router.navigate(['/user/signup']);
  }

}
