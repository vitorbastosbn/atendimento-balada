import { Permission } from './../models/permission.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ENDPOINT_BASE = 'http://localhost:8080/permission/';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  create(permission: Permission): Observable<any> {
    return this.http.post(ENDPOINT_BASE, permission);
  }

  edit(permission: Permission): Observable<any> {
    return this.http.patch(ENDPOINT_BASE, permission);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(ENDPOINT_BASE + id);
  }

  findAll(): Observable<any> {
    return this.http.get<Permission[]>(ENDPOINT_BASE);
  }

}
