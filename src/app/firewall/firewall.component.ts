import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from './../../app/app.component';

@Component({
  selector: 'app-firewall',
  templateUrl: './firewall.component.html',
  styleUrls: ['./firewall.component.css']
})
export class FirewallComponent implements OnInit {

  constructor(private router: Router, private appComponent: AppComponent) { }

  ngOnInit() {
    this.appComponent.title = "Firewall Services";
  }

}
