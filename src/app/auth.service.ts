import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private router: Router
  ) { }

  estaLogado() {
    return localStorage.getItem('accessToken') !== null ? !this.tokenExpired(localStorage.getItem('accessToken')!) : false;
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
