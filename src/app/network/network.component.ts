import { Component, OnInit } from '@angular/core';
import { IFrameService } from './../core/services/iframe.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  constructor(private iframeService: IFrameService, public sanitizer: DomSanitizer, private spinnerService: Ng4LoadingSpinnerService, private appComponent: AppComponent) { }
  monitorURL = "";
  urlLoaded = false;
  ngOnInit() {
    this.appComponent.title = "Network Services";
    this.spinnerService.show();
    this.iframeService.getNetworkIframeURL().subscribe(data => {
      this.monitorURL = data["monitorUrl"];
      this.urlLoaded = true;
      this.spinnerService.hide();
    });
  }

}
