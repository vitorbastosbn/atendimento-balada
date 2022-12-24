import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountCredentials } from '../models/account-credentials.model';

const ENPOINT_BASE = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  autenticar(credenciais: AccountCredentials) {
    return this.http.post(ENPOINT_BASE + 'auth/signin', credenciais);
  }
}
