
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuoteComponent} from './quote/quote.component';
import { InventoryComponent } from './inventory/inventory.component';
import { VoiceComponent } from './voice/voice.component';
import { FirewallComponent } from './firewall/firewall.component';
import { NetworkComponent } from './network/network.component';
import {TicketComponent } from './ticket/ticket.component';
import { AuthGuard }    from './core/guards';
const appRoutes: Routes = [
    { path: '', redirectTo: '/inventory', pathMatch: 'full' },
    { path: 'customersupport', redirectTo: '/customersupport', pathMatch: 'full', data: {title: 'Customer Support'}, canActivate: [AuthGuard] },
    { path: 'ticket/getticketnotes', component: TicketComponent, data: {title: 'Customer Support'}, canActivate: [AuthGuard]},
    { path: 'quote', component: QuoteComponent, data: {title: 'Request Quote'}, canActivate: [AuthGuard]},
    { path: 'inventory', component: InventoryComponent, data: {title: 'Inventory Details'}, canActivate: [AuthGuard]},
    { path: 'voice', component: VoiceComponent, canActivate: [AuthGuard] },
    { path: 'firewall', component: FirewallComponent, canActivate: [AuthGuard] },
    { path: 'network', component: NetworkComponent, canActivate: [AuthGuard] }
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
