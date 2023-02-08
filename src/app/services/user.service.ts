import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const ENPOINT_BASE = 'http://localhost:8080/user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  create(user: User): Observable<any> {
    return this.http.post(ENPOINT_BASE, user);
  }

  edit(user: User) {
    return this.http.patch(ENPOINT_BASE, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(ENPOINT_BASE + id);
  }

  findAll(): Observable<any> {
    return this.http.get<User[]>(ENPOINT_BASE);
  }

}
