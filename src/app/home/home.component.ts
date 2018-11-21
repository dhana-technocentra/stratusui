import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppComponent } from './../../app/app.component';
import { UserService } from './../core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private appComponent: AppComponent, private userService: UserService) { }

  ngOnInit() {
    this.appComponent.title = "Companion Portal";
  }
 
}
