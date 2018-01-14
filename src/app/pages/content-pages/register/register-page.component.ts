import { RequestMethod } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHandlerService } from 'app/shared/providers/api-handler.service';

import * as swal from 'sweetalert2';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
    form: FormGroup;

    constructor(
        public fb: FormBuilder,
        public router: Router,
        public api: ApiHandlerService
    ) {}

    ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['Gender', Validators.required],
      phone_number: ['', Validators.required],
      street_address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  save(form) {
    const payload = form.value;
    console.log(payload);

    this.api.callService(
      'register/customer',
      RequestMethod.Post,
      payload
    )
    .map(res => <string>res.json())
    .subscribe((data) => {
      console.log(data);
      swal(
        'You are now registered!',
        '',
        'success'
      );
      this.router.navigate(['dashboard']);
    });
  }
}