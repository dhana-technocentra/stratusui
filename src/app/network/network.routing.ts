import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard }    from '../core/guards';
import {NetworkComponent} from './network.component';

const appRoutes: Routes = [
 //  {path: '**', component: PageNotFoundComponent}
    { path: 'network', component: NetworkComponent, canActivate: [AuthGuard] },
    
    
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
export class NetworkRoutingModule { }
