import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) { }

    private passwordControl = new FormControl('');

    ngOnInit() {
    }

    update() {
        this._authService.validateSession({
            password: this.passwordControl.value
        });

        if (this._authService.validSession()) {
            this._router.navigate(['admin']);
        }
    }
}
