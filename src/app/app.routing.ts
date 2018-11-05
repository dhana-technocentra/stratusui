
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuoteComponent} from './quote/quote.component';
import { InventoryComponent } from './inventory/inventory.component';
import { VoiceComponent } from './voice/voice.component';
import { FirewallComponent } from './firewall/firewall.component';
import { NetworkComponent } from './network/network.component';
import {TicketComponent } from './ticket/ticket.component';
const appRoutes: Routes = [
    { path: '', redirectTo: '/user/userprofile', pathMatch: 'full' },
    { path: 'customersupport', redirectTo: '/customersupport', pathMatch: 'full', data: {title: 'Customer Support'} },
    { path: 'ticket/getticketnotes', component: TicketComponent, data: {title: 'Customer Support'}},
    { path: 'quote', component: QuoteComponent, data: {title: 'Request Quote'}},
    { path: 'inventory', component: InventoryComponent, data: {title: 'Inventory Details'}},
    { path: 'voice', component: VoiceComponent },
    { path: 'firewall', component: FirewallComponent },
    { path: 'network', component: NetworkComponent }
    //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
