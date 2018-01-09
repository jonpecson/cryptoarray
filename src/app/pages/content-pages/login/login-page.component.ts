import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

    form: FormGroup;

    constructor(
        public fb: FormBuilder
     ) { }

    ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  save(form) {
    const payload = {
      email: form.value.email,
      password: form.value.password
    }
  }
}