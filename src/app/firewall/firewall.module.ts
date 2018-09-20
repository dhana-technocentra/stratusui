import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FirewallRoutingModule } from './firewall.routing';
import { FirewallComponent } from './firewall.component';

@NgModule({
  imports: [
    CommonModule,
    FirewallRoutingModule
  ],
  declarations: [FirewallComponent]
})
export class FirewallModule { }
