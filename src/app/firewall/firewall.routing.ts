import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard }    from '../core/guards';
import {FirewallComponent} from './firewall.component';

const appRoutes: Routes = [
 //  {path: '**', component: PageNotFoundComponent}
    { path: 'firewall', component: FirewallComponent, canActivate: [AuthGuard] },
    
    
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
export class FirewallRoutingModule { }
