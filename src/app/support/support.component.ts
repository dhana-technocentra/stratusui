import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
    this.appComponent.title = "Support";
  }

}
