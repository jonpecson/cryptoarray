import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit{
    form: FormGroup;

    constructor(
        public fb: FormBuilder
    ) {}

    ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      streetAddress: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  save(form) {
    const payload = {
      name: form.value.name,
      birthdate: form.value.birthdate,
      gender: form.value.gender,
      phoneNumber: form.value.phoneNumber,
      streetAddress: form.value.streetAddress,
      state: form.value.state,
      city: form.value.city,
      zipcode: form.value.zipcode,
      email: form.value.email,
      password: form.value.password,
    }
  }

    //  On submit click, reset field value
    // onSubmit() {
    //     this.registerForm.reset();
    // }
}