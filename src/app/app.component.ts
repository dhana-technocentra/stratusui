import { Component, OnInit, HostListener } from '@angular/core';
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
  chatstatus = 'Offline';
  showNavBar = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }

  ngOnInit() {
    if (this.authenticationService.isAuthenticated()) {
      
      /*Tawk_API.onStatusChange = (status) => {
        console.log('ddd');
        if(status === 'online'){
            this.chatstatus = 'Online';
        } else if(status === 'away'){
            this.chatstatus = 'Online';
        } else{
            this.chatstatus = 'Offline';
        }
      };*/
      
      if(Tawk_API.getStatus() === 'online'){
          this.chatstatus = 'Online';
      } else if(Tawk_API.getStatus() === 'away'){
          this.chatstatus = 'Online';
      } else{
          this.chatstatus = 'Offline';
      }
      
      if (window.innerWidth > 767) {
        document.getElementById("desktop-chat").style.display = "block";
      }
      document.getElementById("navbar").style.display = "block";
    } else {
      document.getElementById("desktop-chat").style.display = "none";
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
     /*Tawk_API.onStatusChange = (status) => {
        console.log('ddd');
        if(status === 'online'){
            this.chatstatus = 'Online';
        } else if(status === 'away'){
            this.chatstatus = 'Online';
        } else{
            this.chatstatus = 'Offline';
        }
      };*/
      
      if(Tawk_API.getStatus() === 'online'){
          this.chatstatus = 'Online';
      } else if(Tawk_API.getStatus() === 'away'){
          this.chatstatus = 'Online';
      } else{
          this.chatstatus = 'Offline';
      }
     
      if (window.innerWidth > 767) {
        document.getElementById("desktop-chat").style.display = "block";
      }
      document.getElementById("navbar").style.display = "block";
    } else {
      document.getElementById("desktop-chat").style.display = "none";
      document.getElementById("navbar").style.display = "none";
    }
  }

  logOut() {
    this.authenticationService.logout();
    document.getElementById("desktop-chat").style.display = "none";
    document.getElementById("navbar").style.display = "none";
    this.router.navigate(['/user/login'], {});
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 767 && document.getElementById("desktop-chat").style.display == "block") {
      if (this.authenticationService.isAuthenticated()) { 
        document.getElementById("desktop-chat").style.display = "none"; 
      }
    } else if (window.innerWidth > 767 && document.getElementById("desktop-chat").style.display == "none") {
      if (this.authenticationService.isAuthenticated()) { 
        document.getElementById("desktop-chat").style.display = "block"; 
      }
    }
    
  }
  
}
