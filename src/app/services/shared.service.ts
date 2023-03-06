import { Permission } from './../models/permission.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  permissions: string[] = [];

  constructor() {}

  get roles() {
    return this.permissions;
  }

}
