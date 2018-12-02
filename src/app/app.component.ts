import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './core/services/authentication.service';

export declare function check_navigation();
export declare function setup_navigation();
export declare var Tawk_API: any;
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
      Tawk_API.onLoad = function () {
        Tawk_API.showWidget();
      }
      document.getElementById("navbar").style.display = "block";
    } else {
      Tawk_API.onLoad = function () {
        Tawk_API.hideWidget();
      }
      document.getElementById("navbar").style.display = "none";
    }
  }

  changeOfRoutes() {
    setTimeout(() => {
      setup_navigation();
      check_navigation();
    }, 1500);
  }

  checkForAuthentication() {
    if (this.authenticationService.isAuthenticated()) {
      Tawk_API.onLoad = function () {
        Tawk_API.showWidget();
      }
      Tawk_API.onLoad();
      document.getElementById("navbar").style.display = "block";
    } else {
      Tawk_API.onLoad = function () {
        Tawk_API.hideWidget();
      }
      Tawk_API.onLoad();
      document.getElementById("navbar").style.display = "none";
    }
  }

  logOut() {
    this.authenticationService.logout();
    Tawk_API.onLoad = function () {
      Tawk_API.hideWidget();
    }
    Tawk_API.onLoad();
    document.getElementById("navbar").style.display = "none";
    this.router.navigate(['/user/login'], {});
  }

}
