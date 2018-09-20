import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from './../../app/app.component';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.css']
})
export class VoiceComponent implements OnInit {

  constructor(private router: Router, private appComponent: AppComponent) { }

  ngOnInit() {
    this.appComponent.title = "Voice Services Management";
  }

}
