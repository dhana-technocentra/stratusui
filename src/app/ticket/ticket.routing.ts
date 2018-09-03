import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { TicketComponent } from './ticket.component';

import { AuthGuard }    from '../core/guards';
import { NewTicketComponent } from './new-ticket/new-ticket.component';

const appRoutes: Routes = [
 //  {path: '**', component: PageNotFoundComponent}
    { path: 'ticket/getticketnotes', component: TicketComponent, canActivate: [AuthGuard] },
    { path: 'ticket/createnewticket', component: NewTicketComponent, canActivate: [AuthGuard] }      
    
];

@NgModule({
  imports: [
    RouterModule.forChild(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class TicketRoutingModule {}
