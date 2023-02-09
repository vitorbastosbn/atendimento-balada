import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const ENDPOINT_BASE = 'http://localhost:8080/user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  create(user: User): Observable<any> {
    return this.http.post(ENDPOINT_BASE, user);
  }

  edit(user: User) {
    return this.http.patch(ENDPOINT_BASE, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(ENDPOINT_BASE + id);
  }

  findAll(): Observable<any> {
    return this.http.get<User[]>(ENDPOINT_BASE);
  }

  findByUsername(username: string): Observable<any> {
    return this.http.get<User>(ENDPOINT_BASE + 'username/' + username);
  }

}
