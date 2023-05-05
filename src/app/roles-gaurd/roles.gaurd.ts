import { Component, OnInit, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterModule, Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class RolesGaurd implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //if token is null then redirect user to login
    if (localStorage.getItem('token') == null || localStorage.getItem('token') ==undefined) {
      this.router.navigateByUrl('/login');
      return false;
    }
    //if token is not null then check if isAdmin flag is true or not
    else {
      let data = localStorage.getItem('token')
      let decodedData = jwt_decode(data)
      if (decodedData.role == "True") {
        return true;
      }
      else {
        this.router.navigateByUrl('/dashboard');
        return false;
      }
    }
  }

}
