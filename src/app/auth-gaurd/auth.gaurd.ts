import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGaurd implements CanActivate {

  constructor(private router: Router) { }

  //checking if user is logged in or not with the help of token
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') == null || localStorage.getItem('token') ==undefined) {
      this.router.navigateByUrl('/login');
      return false;
    }
    else {
      return true;
    }
  }

}
