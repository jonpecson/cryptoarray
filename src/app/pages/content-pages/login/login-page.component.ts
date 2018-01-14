import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from 'app/shared/providers/auth.service';
import * as swal from 'sweetalert2';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

    form: FormGroup;
    loading: boolean = false;

    constructor(
        public fb: FormBuilder,
        public router: Router,
        public auth: AuthService
     ) { }

    ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  save(form) {
    const payload = form.value;
    console.log(payload);

    this.loading = true;
    this.auth.authenticate(payload.email, payload.password)
      .subscribe(() => {
        this.loading = false; // hide our loading indicator
        // navigate back to our redirect url if empty goto our dashboard
        let to: string = this.auth.getRedirectUrl() || '/dashboard';
        swal(
          'Successfully Login!',
          '',
          'success'
        )
        this.router.navigate([to]);
      }, (error) => {
        // alert('Invalid Username/Password!');
        swal(
          'Invalid Username/Password!',
          '',
          'error'
        )
        this.loading = false;
        console.error('auth error', error);
      });
  }

  onForgotPassword() {
    this.router.navigate([ 'pages/forgotpassword' ]);
  }

  onRegister() {
    this.router.navigate([ 'pages/register' ]);
  }
}
