import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';
  showNavBar = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }

  ngOnInit() {
    console.log("12357890", this.authenticationService.isAuthenticated());
    if (!this.authenticationService.isAuthenticated()) {
      this.showNavBar = true;
    } else {
      this.showNavBar = false;
    }
  }
  logOut() {
    this.authenticationService.logout();
    this.showNavBar = true;
    this.router.navigate(['/user/login'], {});
  }
  
}
