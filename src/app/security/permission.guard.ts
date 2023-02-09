import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserPermission(next);
  }

  private async checkUserPermission(route: ActivatedRouteSnapshot): Promise<boolean> {
    let hasPermission = false;

    await new Promise((resolve, reject) => {
      this.userService.findByUsername(localStorage.getItem('username')!).subscribe(
        (roles: string[]) => {
          if (roles.indexOf(route.data['permission']) !== -1) {
            hasPermission = true;
          }
          resolve(hasPermission);
        }), reject;
    });

    if (!hasPermission) {
      this.router.navigate(['/home']);
    }

    return hasPermission;
  }

}
