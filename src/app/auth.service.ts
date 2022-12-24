import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(){}

    estaLogado() {
        return !!localStorage.getItem('accessToken');
    }

}