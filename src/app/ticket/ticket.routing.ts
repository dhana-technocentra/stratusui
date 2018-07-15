import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { TicketComponent } from './ticket.component';

import { AuthGuard }    from '../core/guards';

const appRoutes: Routes = [
 //  {path: '**', component: PageNotFoundComponent}
    { path: 'ticket', component: TicketComponent, canActivate: [AuthGuard] }   
    
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
