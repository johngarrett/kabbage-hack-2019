import { Injectable } from '@angular/core';

import { Login } from '../../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor() { }

    private _isLoggedIn: boolean;

    validSession(): boolean {
        return this._isLoggedIn;
    }

    validateSession(login: Login) {
        console.log(this._isLoggedIn, login);
        if (login.password === 'allyourfoodarebelongtous') {
            this._isLoggedIn = true;
        } else {
            this._isLoggedIn = false;
        }
    }

}
