import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

//const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public authenticationService: AuthenticationService, private router: Router) { }
/*
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }});
        return false;
    } */
/*
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authenticationService.isAuthenticated()) {
            this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
        return true;
      } */

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       
        const expectedRole = route.data.expectedRole;
        const accessToken = localStorage.getItem('access_token');
        
        //const decodedToken = jwtHelper.decodeToken(accessToken);
       // console.log("role : ", tokenPayload.role);
       /* if (
          !this.authenticationService.isAuthenticated() || 
          tokenPayload.role !== expectedRole
        ) {
          this.router.navigate(['login']);
          return false;
        } */

        if (!this.authenticationService.isAuthenticated()) {
            this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url}});
          return false;
        }
        return true;
      }

    }