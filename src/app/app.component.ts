import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService } from './core/services/authentication.service';

export declare function check_navigation();
export declare function setup_navigation();

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
    if (this.authenticationService.isAuthenticated()) {
      document.getElementById("navbar").style.display = "block";
    } else {
      document.getElementById("navbar").style.display = "none";
    }
    
    setTimeout(setup_navigation(),0);
    setTimeout(check_navigation(),1);
  }

  checkForAuthentication() {
    if (this.authenticationService.isAuthenticated()) {
      document.getElementById("navbar").style.display = "block";
    } else {
      document.getElementById("navbar").style.display = "none";
    }
  }
  
  logOut() {
    this.authenticationService.logout();
    document.getElementById("navbar").style.display = "none";
    this.router.navigate(['/user/login'], {});
  }
  
}
