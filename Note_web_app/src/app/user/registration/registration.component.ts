import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/modals/user';
import { passwordCheckerValidator } from '../password-checker-directive';
import { UserService } from '../../core/services/user.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  newUser: any;


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private alertService: AlertService) { }


  // excute before pageload
  ngOnInit(): void { }
  signUpForm: any = this.fb.group({
    name: this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    }),
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]],
    confirmPassword: [
      '',
      [
        Validators.required,
        passwordCheckerValidator(),
      ],
    ],
  });

  get email() {
    if (this.signUpForm == undefined) return null;
    return this.signUpForm.get('email');
  }
  get password() {
    if (this.signUpForm == undefined) return null;

    return this.signUpForm.get('password');
  }
  get name() {
    if (this.signUpForm == undefined) return null;
    return this.signUpForm.get('name');
  }
  get confirmPassword() {
    if (this.signUpForm == undefined) return null;
    return this.signUpForm.get('confirmPassword')
  }
  // implementing services
  onSubmit(form: any) {
    this.newUser = {
      name: form.value.name.firstName + " " + form.value.name.lastName,
      email: form.value.email,
      password: form.value.password
    }
    // console.log(this.newUser)
    this.userService.register(this.newUser).subscribe((response: any) => {
      if (response.status == 201) {
        this.alertService.success(response.body.message);
        this.router.navigate(['/user/signin'])

      }
    }, (err) => {
      this.alertService.error(err.error.message);
    })
  }


  redirect() {
    this.router.navigate(['/user/signin'])
  }
}
