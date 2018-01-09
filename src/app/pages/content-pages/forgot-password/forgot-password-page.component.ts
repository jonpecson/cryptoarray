import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent implements OnInit {
    forogtPasswordForm: FormGroup;

    constructor(
        public fb: FormBuilder,
         private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    this.forogtPasswordForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  save(forogtPasswordForm) {
    const payload = {
      email: forogtPasswordForm.value.email,
    }
  }

    // On submit click, reset form fields
    onSubmit() {
        this.forogtPasswordForm.reset();
    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}