import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountCredentials } from '../models/account-credentials.model';

const ENPOINT_BASE = 'http://localhost:8080/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  autenticar(credenciais: AccountCredentials) {
    return this.http.post(ENPOINT_BASE + '/signin', credenciais);
  }

  atualizarToken(username: string) {
    return this.http.put(ENPOINT_BASE + '/refresh', username);
  }
}
