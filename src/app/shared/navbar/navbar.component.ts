import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent{
    constructor(public router: Router, public auth: AuthService) {

    }

    logout() {
        this.auth.logout().subscribe(() => {
            this.router.navigate([ 'pages/login' ]);
        });
    }
}
